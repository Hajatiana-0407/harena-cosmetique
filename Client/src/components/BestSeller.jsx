import React, { useState, useEffect } from 'react';
import { Star, ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';
import RequestApi from '../API/RequestApi';
import { apiIMG } from '../API/pathPicture';

const SkeletonCard = () => (
  <div className="w-full max-w-sm rounded-3xl bg-white p-4 shadow-sm animate-pulse">
    <div className="w-full h-64 bg-stone-200 rounded-2xl mb-4"></div>
    <div className="h-6 bg-stone-200 rounded w-3/4 mb-3"></div>
    <div className="h-4 bg-stone-200 rounded w-full mb-2"></div>
    <div className="h-4 bg-stone-200 rounded w-5/6 mb-4"></div>
    <div className="flex justify-between items-center">
      <div className="h-8 bg-stone-200 rounded w-1/3"></div>
      <div className="h-10 bg-stone-200 rounded-xl w-1/3"></div>
    </div>
  </div>
);

export default function Bestseller() {
  const [bestSellers, setBestSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        const { fetchProduits } = RequestApi();
        const products = await fetchProduits();
        // Sort by nombreAvisParProduit descending (proxy for popularity)
        const sorted = products.sort((a, b) => b.nombreAvisParProduit - a.nombreAvisParProduit);
        setBestSellers(sorted.slice(0, 3));
      } catch (error) {
        console.error('Error fetching best sellers:', error);
      } finally {
        // Add a slight delay for smoother transition
        setTimeout(() => setLoading(false), 800);
      }
    };
    fetchBestSellers();
  }, []);

  return (
    <section className="py-24 px-6 lg:px-12 bg-linear-to-b from-white to-stone-50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 text-amber-700 text-sm font-bold uppercase tracking-widest mb-6 border border-amber-100 shadow-sm">
            <Sparkles size={16} className="animate-pulse" />
            <span>Incontournables</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-extrabold text-stone-900 mb-6 tracking-tight">
            Nos <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-700 to-amber-500">Produits Phares</span>
          </h2>
          
          <div className="w-24 h-1.5 bg-amber-600 rounded-full mb-8"></div>
          
          <p className="max-w-2xl text-stone-600 text-lg leading-relaxed">
            Découvrez l'excellence de l'artisanat malgache à travers nos produits les plus plébiscités, 
            alliant tradition et bien-être naturel.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {loading ? (
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : (
            bestSellers.map((product) => (
              <div 
                key={product.id} 
                className="group relative bg-white rounded-[2.5rem] p-4 shadow-xl shadow-stone-200/50 border border-stone-100 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-900/10"
              >
                {/* Image Container */}
                <div className="relative h-72 w-full overflow-hidden rounded-4xl mb-6">
                  <img 
                    src={apiIMG +product.image || "image/beauty.jpg"} 
                    alt={product.nom} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-md text-stone-900 px-4 py-1.5 rounded-full text-xs font-bold shadow-lg border border-white/20 flex items-center gap-1.5">
                      <Star size={12} className="fill-amber-500 text-amber-500" />
                      Best Seller
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="px-4 pb-4">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-2xl font-bold text-stone-900 group-hover:text-amber-700 transition-colors duration-300">
                      {product.nom}
                    </h3>
                  </div>
                  
                  <p className="text-stone-500 text-sm line-clamp-2 mb-6 leading-relaxed">
                    {product.definition}
                  </p>

                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex flex-col">
                      <span className="text-xs text-stone-400 font-medium uppercase tracking-wider">Prix</span>
                      <span className="text-2xl font-black text-stone-900">
                        {new Intl.NumberFormat('fr-FR').format(product.prix)} <span className="text-sm font-bold text-amber-600">Ar</span>
                      </span>
                    </div>

                    <a 
                      href={`/produit/${product.id}`}
                      className="inline-flex items-center justify-center gap-2 bg-stone-900 text-white p-4 rounded-2xl transition-all duration-300 hover:bg-amber-700 hover:gap-4 shadow-lg shadow-stone-900/20"
                    >
                      <span className="font-bold text-sm">Découvrir</span>
                      <ArrowRight size={18} />
                    </a>
                  </div>
                  
                  {/* Reviews Info */}
                  <div className="mt-6 pt-4 border-t border-stone-50 flex items-center gap-2 text-stone-400 text-xs font-medium">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} className={i < 4 ? "fill-current" : ""} />
                      ))}
                    </div>
                    <span>({product.nombreAvisParProduit} avis vérifiés)</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Bottom Action */}
        <div className="mt-20 text-center">
          <a 
            href="/produit" 
            className="inline-flex items-center gap-3 text-stone-900 font-bold hover:text-amber-700 transition-colors group"
          >
            <span>Voir toute la collection</span>
            <div className="w-10 h-10 rounded-full border-2 border-stone-200 flex items-center justify-center group-hover:border-amber-700 transition-all">
              <ShoppingBag size={18} />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}

