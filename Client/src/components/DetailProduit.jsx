import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../API/url';
import { RatingStars } from './Avis';
import ReviewForm from './ReviewForm';

// Composant pour afficher une étoile remplie ou vide
const FilledStarSVG = ({ filled }) => (
  <svg
    className={`w-4 h-4 ${filled ? 'text-yellow-400' : 'text-gray-300'}`}
    fill={filled ? 'currentColor' : 'none'}
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
    />
  </svg>
);

// Constants
const COLOR_TEXT = '#5C4033';
const COLOR_PRIMARY = '#7B4B3A';

// Fonction pour rendre le contenu des onglets
const renderTabContent = (activeTab, tabsContent) => {
  const tab = tabsContent[activeTab];
  if (!tab) return <p>Contenu non disponible.</p>;
  return (
    <div>
      <h3 className="text-2xl font-bold mb-4" style={{ color: COLOR_TEXT }}>{tab.title}</h3>
      <ul className="list-disc list-inside space-y-2 text-gray-700">
        {tab.content.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

// Composant pour afficher une carte d'avis
const ReviewCard = ({ review }) => (
  <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-md transition duration-300 hover:shadow-lg space-y-3 flex flex-col justify-between h-full">
    <div>
      <div className="flex items-center space-x-0.5 mb-2">
        {Array(5).fill(0).map((_, i) => (
          <FilledStarSVG key={i} filled={i < review.rating} />
        ))}
      </div>
      <p className="text-xl font-extrabold mb-1" style={{ color: COLOR_TEXT }}>{review.title}</p>
      <p className="text-gray-700 italic text-base line-clamp-4">{review.content}</p>
    </div>
    <div className="text-xs text-gray-500 pt-3 border-t border-gray-100">
      <p className="font-semibold">{review.author}</p>
      <p>Posté le {review.date}</p>
    </div>
  </div>
);

// Défauts pour les onglets si non fournis par l'API
const defaultTabsContent = {
  "Présentation": {
    title: "Propriétés & Labels",
    content: [
      "Produit 100% naturel",
      "Certifié bio",
      "Sans parabènes",
      "Vegan friendly"
    ]
  },
  "Utilisation": {
    title: "Conseils d'Application",
    content: [
      "Appliquer matin et soir sur peau propre",
      "Massage circulaire pour une meilleure absorption",
      "Éviter le contour des yeux"
    ]
  },
  "Composition": {
    title: "Ingrédients clés & INCI",
    content: [
      "Aqua (Eau)",
      "Glycerin",
      "Aloe Vera",
      "Vitamine E"
    ]
  }
};

// --- Composant Principal de la Fiche Technique ---
const DetailProduit = ({ id: propId }) => {
  const { id: paramId } = useParams();
  const id = propId || paramId;

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('Présentation');
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (!product) return;
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFavorite(favorites.some(item => item.id === product.id));
  }, [product]);

  const toggleFavorite = () => {
    if (!product) return;
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    let newFavorites;

    if (isFavorite) {
      newFavorites = favorites.filter(item => item.id !== product.id);
      toast.info("Retiré des favoris");
    } else {
      newFavorites = [...favorites, {
        id: product.id,
        name: dataTitle,
        price: parseFloat(dataPrice) || 0,
        imageUrl: mainImage,
        description: product?.description || 'Description non disponible',
      }];
      toast.success("Ajouté aux favoris !");
    }

    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);
  };

  // Contenu des onglets dynamique basé sur le produit
  const tabsContent = product ? {
    "Présentation": (product.presentation && Array.isArray(product.presentation)) ? { title: "Propriétés & Labels", content: product.presentation } : defaultTabsContent["Présentation"],
    "Utilisation": (product.utilisation && Array.isArray(product.utilisation)) ? { title: "Conseils d'Application", content: product.utilisation } : defaultTabsContent["Utilisation"],
    "Composition": (product.composition && Array.isArray(product.composition)) ? { title: "Ingrédients clés & INCI", content: product.composition } : defaultTabsContent["Composition"],
  } : defaultTabsContent;

  const tabs = Object.keys(tabsContent);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        if (id) {
          const { data } = await api.get(`/api/produits/${id}`);
          if (!isMounted) return;
          setProduct(data);
        } else {
          const { data } = await api.get('/api/produits');
          if (!isMounted) return;
          const first = Array.isArray(data) ? data[0] : null;
          setProduct(first || null);
        }
      } catch (err) {
        setError(err?.response?.data || err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    })();
    return () => { isMounted = false; };
  }, [id]);

  useEffect(() => {
    if (!product?.id) return;
    (async () => {
      try {
        const { data } = await api.get(`/avis/produit/${product.id}`);
        setReviews(data);
      } catch (err) {
        // Optionally handle error, e.g., setReviews([])
        console.log('Erreur chargement avis:', err);
      }
    })();
  }, [product?.id]);

  const handleQuantityChange = (delta) => {
    setQuantity(prev => Math.max(1, prev + delta));
  };

  const addToCart = () => {
    if (!product) return;
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      existing.quantity += quantity;
      toast.info("Quantité mise à jour dans le panier !");
    } else {
      cart.push({
        id: product.id,
        name: dataTitle,
        price: parseFloat(dataPrice) || 0,
        categorie: dataCategorie,
        stock: dataStock,
        imageUrl: mainImage,
        quantity: quantity,
        description: product?.description || 'Description non disponible',
        rating: product?.rating || 0,
        deliveryTime: 'Maintenant',
        isSelected: true,
      });
      toast.success("Produit ajouté au panier !");
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    navigate('/panier');
  };

  const dataTitle = product?.nom || product?.name || 'Titre non disponible';
  const dataPrice = product?.prix || product?.price || 0;
  const dataCategorie = product?.id_categorie?.nom || product?.Categorie || 'Catégorie non disponible';
  const dataStock = product?.stock || product?.Stock || 0;
  const mainImage = product?.image ? `${api.defaults.baseURL}${product.image}` : '/image/beauty.jpg';
  const image_mini1 = product?.image_mini1 ? `${api.defaults.baseURL}${product.image_mini1}` : '/image/beauty.jpg';
  const image_mini2 = product?.image_mini2 ? `${api.defaults.baseURL}${product.image_mini2}` : '/image/beauty.jpg';
  const image_mini3 = product?.image_mini3 ? `${api.defaults.baseURL}${product.image_mini3}` : '/image/beauty.jpg';

  return (
    <div className="max-w-7xl mx-auto bg-white font-sans shadow-2xl rounded-xl overflow-hidden">
      {error && (
        <div className="p-4 bg-red-100 text-red-700">Erreur chargement produits: {typeof error === 'object' ? JSON.stringify(error) : error}</div>
      )}
      {loading && (
        <div className="p-4">Chargement...</div>
      )}
      {/* SECTION HAUTE : Image et Informations d'Achat (Grille 2 colonnes) */}
      <div className="grid lg:grid-cols-2 gap-8 p-4 md:p-8 border-b border-gray-100">

        {/* Colonne 1: Galerie d'images */}
        <div className="flex flex-col items-center">
            {/* Image Principale */}
            <div className="w-full max-w-lg mb-6">
                <img
                    src={mainImage}
                    alt={dataTitle}
                    className="w-full h-96 object-cover rounded-lg shadow-xl hover:shadow-2xl transition duration-300"
                />
            </div>

            {/* Miniatures (Navigation) - Simulation */}
            <div className="flex space-x-3">
                <div className={`w-16 h-16 flex justify-center items-center border-2 rounded-lg cursor-pointer border-gray-200 hover:border-gray-400`}>
                    <img
                        src={image_mini1}
                        alt={dataTitle}
                        className="w-15 h-15 object-cover rounded shadow-xl hover:shadow-2xl transition duration-300"
                    />
                </div>
                <div className={`w-16 h-16 flex justify-center items-center border-2 rounded-lg cursor-pointer border-gray-200 hover:border-gray-400`}>
                      <img
                        src={image_mini2}
                        alt={dataTitle}
                        className="w-15 h-15 object-cover rounded shadow-xl hover:shadow-2xl transition duration-300"
                    />
                </div>
                <div className={`w-16 h-16 border-2 flex justify-center items-center rounded-lg cursor-pointer border-gray-200 hover:border-gray-400`}>
                    <img
                        src={image_mini3}
                        alt={dataTitle}
                        className="w-15 h-15 object-cover rounded shadow-xl hover:shadow-2xl transition duration-300"
                    />
                </div>
            </div>
        </div>

        {/* Colonne 2: Informations Produit & CTA */}
        <div className="space-y-4 text-left">

          <h1 className="text-4xl font-extrabold leading-snug" style={{ color: COLOR_TEXT }}>
            {dataTitle}
          </h1>
          <p className="text-gray-900 font-bold text-2xl">Categorie: {dataCategorie}</p>

          {/* Évaluation */}
          <div className="flex items-center space-x-4 pb-4 border-b border-gray-100">
            <RatingStars rating={product?.rating || 0} />
          </div>

          {/* Description courte */}
          <p className="text-lg text-gray-700 leading-relaxed">
            {product?.description || 'Description non disponible'}
          </p>

          {/* Bloc Prix et CTA */}
          <div className="pt-6 space-y-4">
              <div className="flex items-end justify-between">
                <div className="flex items-baseline" style={{ color: COLOR_TEXT }}>
                    <span className="text-6xl font-black">
                        {Number(dataPrice).toFixed(2).replace('.', ',')}
                    </span>
                    <span className="text-4xl font-black">Ar</span>
                </div>
                <div className="text-sm text-gray-500 text-right">
                    <p className="font-semibold">{product?.volume || 'N/A'} ml</p>
                    <p className="text-xs">En stock : <span className="font-bold">{Number(dataStock)} pcs</span></p>
                </div>
              </div>

              {/* Quantité & Bouton Ajouter au panier */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-gray-300 rounded-full overflow-hidden shadow-sm">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                      className=" flex justify-center items-center  cursor-pointer p-3 w-12 h-12 text-gray-600 hover:bg-gray-100 disabled:opacity-30 transition text-xl font-bold"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      readOnly
                      className="w-10 flex justify-center items-center text-stone-900 text-center py-2.5 text-xl font-semibold outline-none bg-white"
                    />
                    <button
                      onClick={() => handleQuantityChange(1)}
                      className=" flex justify-center items-center cursor-pointer p-3 w-12 h-12 text-gray-600 hover:bg-gray-100 transition text-xl font-bold"
                    >
                      +
                    </button>
                </div>

                <button
                    onClick={toggleFavorite}
                    className={`p-3 rounded-full shadow-md transition duration-300 transform hover:scale-105 border ${isFavorite ? 'bg-red-50 border-red-200 text-red-500' : 'bg-white border-gray-200 text-gray-400 hover:text-red-500'}`}
                    aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill={isFavorite ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                </button>

                <button
                    onClick={addToCart}
                    className={`flex-1 py-4 px-4 text-white font-bold rounded-full shadow-lg transition duration-300 transform hover:scale-[1.01] cursor-pointer`}
                    style={{ backgroundColor: COLOR_PRIMARY }}
                    aria-label="Ajouter au panier"
                >
                    <span className="text-xl">+</span> <span className="ml-2 uppercase tracking-wide">Ajouter au panier</span>

                </button>
              </div>
              <p className="text-sm text-gray-500 pt-2">Livraison offerte dès 20.000 Ar d'achat.</p>
          </div>
        </div>
      </div>

      {/* SECTION BASSE : Contenu Détaillé et Onglets */}
      <div className="p-6 md:p-12">

        {/* Barre d'Onglets */}
        <div className="flex border-b-2 border-gray-100 mb-8 space-x-8 overflow-x-auto whitespace-nowrap">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 text-xl font-bold transition duration-200 ${
                activeTab === tab
                  ? `border-b-4 text-gray-900`
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              style={activeTab === tab ? { borderColor: COLOR_PRIMARY } : {}}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Contenu de l'Onglet */}
        <div className="py-6">
          {renderTabContent(activeTab, tabsContent)}
        </div>

      </div>

      {/* SECTION AVIS CLIENTS */}
      <div className="p-4 md:p-8 border-t border-gray-100">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4" style={{ color: COLOR_TEXT }}>
            Avis clients ({reviews.length > 0 ? reviews.length : 0})
          </h2>
          <div className="flex items-center space-x-4 mb-6">
            <RatingStars rating={product?.rating || 0} />
            <span className="text-gray-600">Basé sur {reviews.length > 0 ? reviews.length : 0} avis</span>
          </div>
        </div>

        {/* Formulaire d'avis */}
        <ReviewForm productId={product?.id} onReviewSubmitted={() => {
          // Recharger les avis après soumission
          if (product?.id) {
            (async () => {
              try {
                const { data } = await api.get(`/avis/produit/${product.id}`);
                setReviews(data);
              } catch (err) {
                console.log('Erreur chargement avis:', err);
              }
            })();
          }
        }} />

        {/* Grille des avis */}
        {reviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-8">
            Aucun avis disponible pour ce produit.
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailProduit;
