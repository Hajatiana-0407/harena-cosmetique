import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function FavorisPage() {
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const clientData = localStorage.getItem('client');
      const parsedClient = clientData ? JSON.parse(clientData) : null;
      setClient(parsedClient);
      if (!parsedClient) {
        navigate('/login');
        return;
      }
      setLoading(false);
    };

    checkAuth();

    // Load favorites from localStorage
    const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(storedFavorites);
  }, [navigate]);

  const removeFavorite = (id) => {
    const updatedFavorites = favorites.filter(item => item.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <div className="animate-pulse text-gray-700">Chargement des favoris...</div>
        </div>
      </div>
    );
  }

  if (!client) {
    return null; // Redirect handled in useEffect
  }

  return (
    <section className="min-h-screen bg-gray-50 py-10 px-4 text-gray-900">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-[#5C4033] mb-8">Mes Favoris</h1>

        {favorites.length === 0 ? (
          <div className="text-center py-16">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <h2 className="text-xl font-semibold text-gray-600 mb-2">Aucun favori pour le moment</h2>
            <p className="text-gray-500 mb-6">Découvrez nos produits et ajoutez-les à vos favoris !</p>
            <button
              onClick={() => navigate('/catalogue')}
              className="px-6 py-3 bg-[#6b4226] text-white rounded-lg hover:bg-[#8b5e3c] transition-colors"
            >
              Explorer le catalogue
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <img
                  src={item.imageUrl || '/image/beauty.jpg'}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-[#5C4033] mb-2">{item.name}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-[#6b4226]">{item.price} Ar</span>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => navigate(`/produit/${item.id}`)}
                        className="px-3 py-1 bg-[#6b4226] text-white text-sm rounded hover:bg-[#8b5e3c] transition-colors"
                      >
                        Voir
                      </button>
                      <button
                        onClick={() => removeFavorite(item.id)}
                        className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors"
                      >
                        Retirer
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
