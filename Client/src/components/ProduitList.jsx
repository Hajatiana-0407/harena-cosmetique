import React, { useEffect, useState } from "react";
import { Leaf, Eye, ShoppingCart } from "lucide-react";
import api from "../API/url";

export default function ProductList() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const { data } = await api.get('/api/categories');
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-stone-900 w-full">
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
                className="group relative rounded-3xl shadow-xl p-8 flex flex-col items-start justify-end h-96 overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:-translate-y-2 bg-gradient-to-br from-stone-100 to-stone-200"
                style={{
                  backgroundImage: "linear-gradient(135deg, rgba(0,0,0,0.3), rgba(0,0,0,0.1)), url(/image/beauty.jpg)",
                  backgroundPosition: "center",
                  backgroundSize: "cover"
                }}
              >
                {/* Overlay avec gradient moderne */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-all duration-500 group-hover:from-black/80 group-hover:via-black/30"></div>

                {/* Icône décorative */}
                <div className="absolute top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Leaf className="text-white w-6 h-6" />
                </div>

                {/* Contenu avec typographie moderne */}
                <div className="relative z-10 text-white w-full">
                  <h3 className="text-4xl font-black text-left mb-3 drop-shadow-2xl group-hover:text-yellow-200 transition-colors duration-300">{name}</h3>
                  <div className="text-white mb-6 text-lg opacity-90 leading-relaxed drop-shadow-lg">{description}</div>
                  <div className="flex w-full gap-3">
                    <a
                      href={`/catalogue?category=${cat.id}`}
                      className="flex-1 py-3 px-6 text-center bg-gradient-to-r from-white to-gray-100 text-stone-900 rounded-full font-bold cursor-pointer hover:from-gray-100 hover:to-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      👁️ Voir produits
                    </a>
                    <a
                      href="/panier"
                      className="flex-1 py-3 px-6 text-center border-2 border-white text-white rounded-full font-bold cursor-pointer hover:bg-white hover:text-stone-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      <ShoppingCart className="inline w-4 h-4 mr-1" /> Acheter
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
