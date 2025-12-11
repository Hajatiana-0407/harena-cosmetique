import React, { useState, useEffect, useRef } from 'react';
import api from '../API/url.jsx';
import '../assets/Messenger.css'; // We'll create this CSS file

const Messenger = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const messagesEndRef = useRef(null);

    // Get client from localStorage (assuming it's stored there)
    const client = JSON.parse(localStorage.getItem('client') || '{}');

    useEffect(() => {
        fetchMessages();
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const fetchMessages = async () => {
        try {
            const response = await api.get('/messages');
            const data = Array.isArray(response.data) ? response.data : [];
            setMessages(data);
        } catch (err) {
            console.error('Error fetching messages:', err);
            setError('Erreur lors du chargement des messages');
        } finally {
            setLoading(false);
        }
    };

    const sendMessage = async () => {
        if (!newMessage.trim()) return;

        try {
            const response = await api.post('/messages', {
                objet: newMessage,
                destinateur: 'Client', // Or get from somewhere
                id_client: client.id
            });

            if (response.data.success) {
                setNewMessage('');
                fetchMessages(); // Refresh messages
            }
        } catch (err) {
            console.error('Error sending message:', err);
            setError('Erreur lors de l\'envoi du message');
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    if (loading) return <div className="messenger-loading">Chargement...</div>;
    if (error) return <div className="messenger-error">{error}</div>;

    return (
        <div className="messenger-container">
            <div className="messenger-sidebar">
                <h3>Messages</h3>
                <div className="conversation-list">
                    {/* Since API is flat, show all messages as one conversation */}
                    <div className="conversation-item active">
                        <div className="conversation-avatar">💬</div>
                        <div className="conversation-info">
                            <div className="conversation-name">Support</div>
                            <div className="conversation-last-message">
                                {messages.length > 0 ? messages[messages.length - 1].objet : 'Aucun message'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="messenger-chat">
                <div className="chat-header">
                    <h4>Support Client</h4>
                </div>

                <div className="chat-messages">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`message ${msg.client.id === client.id ? 'own' : 'other'}`}
                        >
                            <div className="message-content">
                                <p>{msg.objet}</p>
                                <span className="message-time">{msg.created_at}</span>
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                <div className="chat-input">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Tapez votre message..."
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    />
                    <button onClick={sendMessage}>Envoyer</button>
                </div>
            </div>
        </div>
    );
};

export default Messenger;
