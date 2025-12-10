import React, { useState } from 'react';
import { Mail, Send } from 'lucide-react';
import api from '../API/url';

const NewsletterSubscription = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setSuccess(false);

    try {
      const response = await api.post('/newsletter/subscribe', { email });
      if (response.data.success) {
        setSuccess(true);
        setMessage(response.data.message);
        setEmail('');
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      const errMsg = error.response?.data?.message || 'Erreur lors de l\'inscription';
      setMessage(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
      <h3 className="text-lg font-semibold text-[#5C4033] mb-4 flex items-center gap-2">
        <Mail size={20} />
        Abonnez-vous à notre newsletter
      </h3>
      <p className="text-gray-600 mb-4 text-sm">
        Recevez nos dernières offres et nouveautés directement dans votre boîte mail.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Votre adresse email"
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C4033] focus:border-transparent outline-none transition-all duration-200"
            required
          />
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>
        <button
          type="submit"
          disabled={loading || success}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#5C4033] to-[#8B5E3C] text-white py-3 rounded-lg font-semibold hover:from-[#8B5E3C] hover:to-[#5C4033] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Inscription...' : (
            <>
              <Send size={18} />
              S'abonner
            </>
          )}
        </button>
      </form>
      {message && (
        <div className={`mt-4 p-3 rounded-lg text-sm ${
          success ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-red-100 text-red-700 border border-red-200'
        }`}>
          {message}
        </div>
      )}
    </div>
  );
};

export default NewsletterSubscription;
