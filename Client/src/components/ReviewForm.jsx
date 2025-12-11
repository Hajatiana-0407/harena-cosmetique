import React, { useState } from 'react';
import { toast } from 'react-toastify';
import api from '../API/url';

const ReviewForm = ({ productId, onReviewSubmitted }) => {
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get client from localStorage (assuming it's stored after login)
    const client = JSON.parse(localStorage.getItem('client') || '{}');
    if (!client.id) {
      toast.error('Vous devez être connecté pour laisser un avis');
      return;
    }

    if (!title.trim() || !content.trim()) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }

    if (rating < 1 || rating > 5) {
      toast.error('La note doit être entre 1 et 5');
      return;
    }

    setLoading(true);
    try {
      const response = await api.post('/api/avis', {
        id_client: client.id,
        id_produit: productId,
        etoiles: rating,
        titre: title.trim(),
        contenu: content.trim(),
      });

      if (response.data.success) {
        toast.success('Avis ajouté avec succès !');
        setTitle('');
        setContent('');
        setRating(5);
        onReviewSubmitted();
      } else {
        toast.error(response.data.message || 'Erreur lors de l\'ajout de l\'avis');
      }
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Erreur lors de l\'envoi de l\'avis');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#7B4B3A] to-[#5C4033] px-8 py-6">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-4">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Partagez votre expérience</h3>
            <p className="text-white text-opacity-90 text-sm">Votre avis compte pour notre communauté</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-8 space-y-6">
        {/* Rating Section */}
        <div className="bg-gray-50 rounded-xl p-6">
          <label className="block text-lg font-semibold text-gray-900 mb-4">
            Quelle note donnez-vous à ce produit ?
          </label>
          <div className="flex items-center justify-center space-x-2">
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`w-12 h-12 transition-all duration-300 transform hover:scale-110 ${
                    star <= rating ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                >
                  <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </button>
              ))}
            </div>
            <div className="ml-4 text-center">
              <div className="text-2xl font-bold text-[#7B4B3A]">{rating}</div>
              <div className="text-sm text-gray-700">sur 5</div>
            </div>
          </div>
        </div>

        {/* Title Section */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Titre de votre avis *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-[#7B4B3A] focus:ring-2 focus:ring-[#7B4B3A] focus:ring-opacity-20 transition-all duration-200 text-gray-900 placeholder-gray-500"
            placeholder="Ex: Excellent produit, très satisfaite !"
            required
          />
        </div>

        {/* Content Section */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Votre commentaire *
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={6}
            maxLength={500}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-[#7B4B3A] focus:ring-2 focus:ring-[#7B4B3A] focus:ring-opacity-20 transition-all duration-200 resize-none text-gray-900 placeholder-gray-500"
            placeholder="Partagez votre expérience avec ce produit, les points positifs, les points d'amélioration..."
            required
          />
          <div className="flex justify-between items-center mt-2">
            <span className="text-xs text-gray-600">
              Soyez précis et constructif pour aider les autres clients
            </span>
            <span className={`text-xs font-medium ${content.length > 450 ? 'text-red-600' : 'text-gray-600'}`}>
              {content.length}/500
            </span>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 px-6 rounded-xl font-bold text-white text-lg transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
              loading
                ? 'bg-gray-400'
                : 'bg-gradient-to-r from-[#7B4B3A] to-[#5C4033] hover:from-[#5C4033] hover:to-[#4A3328] shadow-lg hover:shadow-xl'
            }`}
            style={{
              background: loading
                ? '#9CA3AF'
                : 'linear-gradient(to right, #7B4B3A, #5C4033)',
              border: 'none',
              outline: 'none',
              color: 'white'
            }}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Publication en cours...
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                Publier mon avis
              </div>
            )}
          </button>
        </div>
      </form>

      {/* Footer Tips */}
      <div className="bg-gray-50 px-8 py-6 border-t border-gray-100">
        <div className="flex items-start">
          <svg className="w-5 h-5 text-[#7B4B3A] mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          <div className="text-sm text-gray-700">
            <p className="font-medium mb-2 text-gray-800">Conseils pour un avis utile :</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-gray-600">
              <span>• Soyez honnête et précis</span>
              <span>• Mentionnez votre type de peau</span>
              <span>• Décrivez les résultats obtenus</span>
              <span>• Précisez la durée d'utilisation</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewForm;
