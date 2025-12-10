// Bestseller.jsx
import React, { useState, useEffect } from 'react';
import RequestApi from '../API/RequestApi';

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
        setLoading(false);
      }
    };
    fetchBestSellers();
  }, []);

  if (loading) {
    return <div className="text-center py-20">Chargement des best-sellers...</div>;
  }

  return (
    <div className="md:p-8 lg:p-12 bg-stone-50 min-h-screen text-stone-900 flex flex-center flex-col items-center">
      <div className='mt-20 text-center bg-stone-900 text-white text-3xl w-70 p-3 rounded-2xl'>Best seller</div>
      <div className='text-center text-4xl font-bold m-5'>Nos Produits Phares</div>
      <hr className="bg-stone-800 border-2 border-stone-500 w-80 m-5"/>
      <p className='max-w-5xl text-center'>Découvrez nos produits les plus appréciés par nos clients, sélectionnés pour leur qualité et leur popularité.</p>

      <div className='m-6 flex flex-wrap justify-center gap-8'>
        {bestSellers.map((product) => (
          <div key={product.id} className='w-80 max-h-150 min-w-1xl rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300 text-left overflow-hidden'>
            <div className='relative'>
              <img src={product.image || "image/beauty.jpg"} alt={product.nom} className='w-full h-48 object-cover'/>
              <button className='absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md'>Best Seller</button>
            </div>
            <div className='p-6 flex flex-col gap-4'>
              <h3 className='text-xl font-bold text-gray-800 leading-tight'>{product.nom}</h3>
              <div className='flex flex-col gap-2'>
                <span className='text-sm font-medium text-gray-600 uppercase tracking-wide'>Description</span>
                <p className='text-gray-700 text-sm leading-relaxed'>{product.definition}</p>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-2xl font-bold text-green-600'>{product.prix} Ar</span>
                <div className='flex items-center'>
                  <span className='text-yellow-400 text-lg'>★</span>
                  <span className='ml-1 text-sm text-gray-600'>({product.nombreAvisParProduit} avis)</span>
                </div>
              </div>
              <a className="btn bg-[#6b4226] hover:bg-[#5a3520] text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200 text-center" href={`/produit/${product.id}`}>Découvrir maintenant</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
