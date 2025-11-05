import React, { useEffect, useState } from "react";
import api from "../API/url";

export default function ProductList() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const { data } = await api.get('/categories');
        if (!isMounted) return;
        setCategories(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err?.response?.data || err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    })();
    return () => { isMounted = false; };
  }, []);

  return (
    <div className="min-h-screen bg-white text-white p-10 px-5 flex flex-col items-center">
      <div className="text-4xl text-stone-700 font-bold mb-8">Nos catégories du moment</div>
      <hr className="bg-stone-800 border-2 border-stone-500 w-80 flex justify-center mb-8"/>
      {error && (
        <p className="text-red-600 text-sm mb-4">Erreur de chargement des catégories: {typeof error === 'object' ? JSON.stringify(error) : error}</p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-stone-900 w-full">
        {loading ? (
          <div className="col-span-full text-stone-700 text-center py-8">Chargement des catégories...</div>
        ) : categories.length === 0 ? (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-600 mb-4">Aucune catégorie disponible pour le moment.</p>
            <p className="text-sm text-gray-500">Veuillez vérifier votre connexion ou réessayer plus tard.</p>
          </div>
        ) : (
          categories.map((cat) => {
            const name = cat.nom || cat.name || cat.titre || `Catégorie ${cat.id}`;
            const description = cat.description || "Découvrez nos produits de qualité.";
            return (
              <div
                key={cat.id}
                className="rounded-xl shadow-lg p-6 flex flex-col items-start justify-end h-80 relative overflow-hidden transition-transform hover:scale-105"
                style={{
                  backgroundImage: "url(/image/beauty.jpg)",
                  backgroundPosition: "center",
                  backgroundSize: "cover"
                }}
              >
                {/* Overlay pour améliorer la lisibilité */}
                <div className="absolute inset-0 bg-opacity-40 transition-opacity hover:bg-opacity-30"></div>
                
                {/* Contenu */}
                <div className="relative z-10 text-white">
                  <h3 className="text-3xl font-bold text-left mb-2 drop-shadow-lg">{name}</h3>
                  <div className="text-white mb-4 text-lg opacity-90">{description}</div>
                  <div className="flex w-full gap-2">
                    <a 
                      href={`/catalogue?category=${cat.id}`} 
                      className="flex-1 py-2 px-4 text-center bg-white text-stone-900 rounded font-bold cursor-pointer hover:bg-stone-200 transition-colors"
                    >
                      Voir produits
                    </a>
                    <a 
                      href="/panier" 
                      className="flex-1 py-2 px-4 text-center border-2 border-white text-white rounded font-bold cursor-pointer hover:bg-white hover:text-stone-900 transition-colors"
                    >
                      Acheter
                    </a>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
