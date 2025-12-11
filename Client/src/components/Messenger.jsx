import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../API/url';

// --- Fonction pour formater le temps comme Facebook ---
const formatMessageTime = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now - date;
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) {
    // Aujourd'hui
    return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  } else if (diffInDays === 1) {
    // Hier
    return `Hier à ${date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`;
  } else if (diffInDays < 7) {
    // Jour de la semaine
    const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    return `${days[date.getDay()]} à ${date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`;
  } else {
    // Date complète
    return date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' }) + ` à ${date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`;
  }
};

// --- Données d'exemple (à remplacer par votre API ou state global) ---
const initialMessages = [
  { id: 1, text: "Bonjour, comment ça va ?", isUser: false, time: "2023-10-01T10:00:00", date: "2023-10-01" },
  { id: 2, text: "Ça va très bien, merci ! Et toi ?", isUser: true, time: "2023-10-01T10:05:00", date: "2023-10-01" },
  { id: 3, text: "Juste un test de message plus long pour l'affichage dynamique.", isUser: false, time: "2023-10-02T14:30:00", date: "2023-10-02" },
  { id: 4, text: "Ceci est un message de l'utilisateur.", isUser: true, time: "2023-10-02T14:35:00", date: "2023-10-02" },
];

// --- Composant pour séparateur de date ---
const DateSeparator = ({ date }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return "Aujourd'hui";
    if (diffInDays === 1) return "Hier";
    return date.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
  };

  return (
    <div className="flex justify-center my-4">
      <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
        {formatDate(date)}
      </span>
    </div>
  );
};

// --- 2. Composant Isolé : Message (Bulb) ---
const Message = ({ text, isUser, time, client, onEdit }) => {
  const formattedTime = formatMessageTime(time);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);

  const handleEdit = () => {
    if (isEditing && editText.trim() !== text) {
      onEdit(editText.trim());
    }
    setIsEditing(!isEditing);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleEdit();
    } else if (e.key === 'Escape') {
      setEditText(text);
      setIsEditing(false);
    }
  };

  return (
    <div className={`flex w-full mb-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="w-8 h-8 bg-gray-400 rounded-full mr-2 flex-shrink-0 flex items-center justify-center text-white text-xs font-bold">
          <img src="/image/admin-avatar.jpg" alt="Admin" className="w-full h-full object-cover rounded-full" onError={(e) => e.target.style.display = 'none'} />
          {!client?.image && 'A'}
        </div>
      )}
      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl shadow-sm relative group ${isUser
        ? 'bg-blue-500 text-white rounded-br-md'
        : 'bg-white text-gray-800 rounded-bl-md border'}`}>
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyPress={handleKeyPress}
            onBlur={handleEdit}
            className="w-full bg-transparent border-none outline-none text-sm"
            autoFocus
          />
        ) : (
          <p className="text-sm leading-relaxed">{text}</p>
        )}
        <p className={`text-xs mt-1 ${isUser ? 'text-blue-200 text-right' : 'text-gray-500 text-left'}`}>
          {formattedTime}
        </p>
        {isUser && (
          <button
            onClick={() => setIsEditing(true)}
            className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity text-blue-200 hover:text-blue-100"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
        )}
      </div>
      {isUser && (
        <div className="w-8 h-8 bg-blue-500 rounded-full ml-2 flex-shrink-0 flex items-center justify-center text-white text-xs font-bold">
          {client?.image ? (
            <img src={client.image} alt={client.prenom} className="w-full h-full object-cover rounded-full" onError={(e) => e.target.innerText = client.prenom?.charAt(0) || 'U'} />
          ) : (
            client?.prenom?.charAt(0) || 'U'
          )}
        </div>
      )}
    </div>
  );
};

// --- 3. Composant Isolé : Input d'Envoi ---
const MessageInput = ({ onSend }) => {
  const [input, setInput] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const fileInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() !== '') {
      onSend(input); // Appel de la fonction d'envoi passée par le parent
      setInput('');
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Handle file upload - for now, send file object directly
      // TODO: Implement backend upload endpoint
      onSend({ type: 'file', file });
    }
  };

  const handleEmojiSelect = (emoji) => {
    setInput(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  const emojis = ['😀', '😂', '😊', '😍', '🥰', '😘', '😉', '😎', '🤔', '😮', '😢', '😭', '😤', '😡', '🥺', '😴', '🤤', '😵', '🤐', '🤗', '🤔', '🤭', '🤫', '🤥', '😶', '😐', '😑', '😬', '🙄', '😯', '😦', '😧', '😮', '😲', '🥱', '😴', '🤤', '😪', '😵', '🤐', '🥴', '🤢', '🤮', '🤧', '😷', '🤒', '🤕', '🤑', '🤠', '😈', '👿', '👹', '👺', '🤡', '💩', '👻', '💀', '☠️', '👽', '👾', '🤖', '🎃', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '😿', '😾'];

  return (
    <div className="p-4 border-t border-gray-200 bg-gray-50">
      {showEmojiPicker && (
        <div className="mb-2 p-2 bg-white border border-gray-200 rounded-lg shadow-lg">
          <div className="grid grid-cols-8 gap-1 max-h-32 overflow-y-auto">
            {emojis.map((emoji, index) => (
              <button
                key={index}
                onClick={() => handleEmojiSelect(emoji)}
                className="text-lg hover:bg-gray-100 p-1 rounded"
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <button
          type="button"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
          </svg>
        </button>
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileSelect}
          className="hidden"
          accept="image/*,video/*,audio/*,application/*"
        />
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Écrivez votre message..."
          className="flex-1 py-2 px-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 disabled:bg-blue-300"
          disabled={input.trim() === ''}
        >
          <svg className="h-6 w-6 transform rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </form>
    </div>
  );
};


// --- 4. Composant Principal : Interface (Le Controller) ---
const MessengerInterface = ({ messages: initialMessagesProp }) => {
  // Utilisation de la prop 'initialMessagesProp' si fournie, sinon les données d'exemple locales
  const navigate = useNavigate();
  const [messages, setMessages] = useState(initialMessagesProp || initialMessages);
  const [client, setClient] = useState(null);

  useEffect(() => {
    // Check if client is logged in
    const storedClient = localStorage.getItem('client');
    if (!storedClient) {
      navigate('/');
      return;
    }
    setClient(JSON.parse(storedClient));

    // Fetch messages from API
    const fetchMessages = async () => {
      try {
        const response = await api.get('/messages');
        const data = Array.isArray(response.data) ? response.data : [];
        if (data.length > 0) {
          // Grouper les messages par date
          const groupedMessages = data.reduce((groups, msg) => {
            const date = new Date(msg.created_at).toISOString().split('T')[0];
            if (!groups[date]) groups[date] = [];
            groups[date].push({
              id: msg.id,
              text: msg.objet || msg.message,
              isUser: msg.destinateur === 'client',
              time: msg.created_at,
              date: date
            });
            return groups;
          }, {});

          // Convertir en tableau plat avec séparateurs de date
          const formattedMessages = [];
          Object.keys(groupedMessages).sort().forEach(date => {
            formattedMessages.push({ type: 'date', date });
            formattedMessages.push(...groupedMessages[date]);
          });

          setMessages(formattedMessages);
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, []);

  // Fonction centrale pour gérer l'envoi d'un nouveau message
  const handleNewMessage = async (content) => {
    if (!client) return;

    const now = new Date();
    let newMessage;

    if (typeof content === 'string') {
      // Text message
      newMessage = {
        id: Date.now(),
        text: content,
        isUser: true,
        time: now.toISOString(),
        date: now.toISOString().split('T')[0]
      };

      // Send to API
      try {
        await api.post('/messages', {
          objet: content,
          destinateur: 'client',
          id_client: client.id
        });
      } catch (error) {
        console.error('Error sending message:', error);
        // Remove optimistic message on error
        setMessages((prevMessages) => prevMessages.filter(msg => msg.id !== newMessage.id));
        return;
      }
    } else if (content.type === 'file') {
      // File message
      newMessage = {
        id: Date.now(),
        text: `📎 ${content.file.name}`,
        isUser: true,
        time: now.toISOString(),
        date: now.toISOString().split('T')[0],
        file: content.file
      };

      // TODO: Implement file upload to backend
      // For now, just add to local state
    }

    // Mise à jour de l'état optimiste
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  return (
    <div className="flex flex-col h-screen w-full max-w-lg mx-auto bg-gray-50 border border-gray-300 rounded-lg shadow-xl overflow-hidden">

      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
            H
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Harena Cosmetic</h3>
            <p className="text-xs text-gray-500">Support en ligne</p>
          </div>
        </div>
      </div>

      {/* Zone d'affichage des messages (Scrolling) */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        {messages.map((item) => {
          if (item.type === 'date') {
            return <DateSeparator key={`date-${item.date}`} date={item.date} />;
          }
          return (
            <Message
              key={item.id}
              text={item.text}
              isUser={item.isUser}
              time={item.time}
              client={client}
              onEdit={(newText) => {
                // Handle message edit
                setMessages(prev => prev.map(msg =>
                  msg.id === item.id ? { ...msg, text: newText } : msg
                ));
              }}
            />
          );
        })}
      </div>

      {/* Zone de saisie */}
      <MessageInput onSend={handleNewMessage} />
    </div>
  );
};

export default MessengerInterface;