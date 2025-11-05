import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../API/url';

// --- Données Statiques du Produit (fallback) ---
const ProductData = {
  title: "Beurre de soin cheveux Céramide NG & Acide hyaluronique",
  rating: 4.3,
  reviewCount: 64,
  price: 2000,
  volume: 100, // ml
  pricePerLiter: 30000, // €/L
  shortDescription: "Nouveau geste de soin pour cheveux secs à très secs et/ou texturés, ce beurre avec ou sans rinçage démêle, nourrit, prévient la déshydratation, répare et protège. Sa formule 100% d’origine naturelle prend soin des cheveux dès 3 ans.",
  
  // Onglets et leur contenu détaillé
  tabsContent: {
      "Présentation": {
          title: "Propriétés & Labels",
          content: [
              "Formulé pour les cheveux secs à très secs et/ou texturés, ce beurre facilite le démêlage, apporte brillance, souplesse et douceur à la fibre capillaire.",
              "Efficacité cliniquement prouvée : Il nourrit, répare et protège. Il prévient la déshydratation des cheveux.",
              "100% d'origine naturelle. Testé dermatologiquement.",
              "Convient aux enfants dès 3 ans."
          ]
      },
      "Utilisation": {
          title: "Conseils d'Application",
          content: [
              { type: 'step', title: "1. Avec rinçage : Masque ou Après-shampoing", description: "Appliquer sur cheveux lavés, laisser poser 3 à 5 minutes, rincer. (Cheveux secs et fourchus)" },
              { type: 'step', title: "2. Sans rinçage : Crème de jour ou Baumes", description: "Appliquer une noisette sur les longueurs et pointes, sans rincer. (Cheveux très secs ou texturés)" }
          ]
      },
      "Composition": {
          title: "Ingrédients clés & INCI",
          content: [
              { type: 'ingredient', name: "Céramide NG de Riz et Acide Hyaluronique", role: "Complexe réparateur, hydratant et protecteur." },
              { type: 'ingredient', name: "Huile végétale d'Avocat BIO", role: "Riche, gainante, nourrit et fortifie." },
              { type: 'ingredient', name: "Beurre végétal de Karité BIO et de Mangue", role: "Apporte souplesse, douceur et brillance à la chevelure." }
          ]
      }
  },


  // Nouveaux Avis Clients (Exemples)
  reviews: [
    { id: 1, author: "Camille D.", date: "12/09/2024", rating: 5, title: "Incroyable douceur!", content: "Ce beurre a transformé mes pointes sèches dès la première utilisation. L'odeur est agréable et mes cheveux texturés sont beaucoup plus faciles à démêler. Je l'utilise sans rinçage, un vrai miracle." },
    { id: 2, author: "Julien M.", date: "01/08/2024", rating: 4, title: "Bon produit, mais un peu riche", content: "Très nourrissant, c'est indéniable. J'ai les cheveux fins et j'ai dû trouver le bon dosage car il a tendance à alourdir si on en met trop. Idéal en masque hebdomadaire." },
    { id: 3, author: "Amandine L.", date: "05/07/2024", rating: 5, title: "Produit familial", content: "J'apprécie le côté 100% naturel et le fait que ma fille de 5 ans puisse l'utiliser. Nos cheveux bouclés adorent, ils sont hydratés et brillants. Un indispensable dans la salle de bain." },
    { id: 4, author: "Marc P.", date: "18/06/2024", rating: 4, title: "Efficace contre la déshydratation", content: "Je l'ai acheté principalement pour ses céramides. Le résultat est là : mes cheveux sont moins cassants et conservent mieux l'humidité. Seul bémol, le pot est un peu petit." }
  ],
};

// Couleurs (simulées d'après le site Aroma-Zone)
const COLOR_PRIMARY = '#b2895f'; // Beige/Marron clair (Accent)
const COLOR_TEXT = '#4a3428'; // Marron foncé (Texte principal)

// --- Composants Réutilisables ---

// Composant pour simuler les étoiles de notation (Note Moyenne)
const RatingStars = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const partialPercentage = Math.round((rating - fullStars) * 100);
  const stars = [];

  // SVG de l'étoile
  const StarSVG = ({ fillPercentage }) => (
    <svg className="w-5 h-5 transition duration-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 31.575 30.402">
        <defs>
            <linearGradient id={`star-grad-${fillPercentage}`}>
                <stop offset="0%" stopColor={COLOR_PRIMARY}></stop>
                <stop offset={`${fillPercentage}%`} stopColor={COLOR_PRIMARY}></stop>
                <stop offset={`${fillPercentage}%`} stopColor="rgba(178,137,95,0.3)"></stop>
                <stop offset="100%" stopColor="rgba(178,137,95,0.3)"></stop>
            </linearGradient>
        </defs>
        <path d="m977.223 685.241-7.775 7.8 2.031 10.988-9.836-5.168-9.678 5.211 1.7-11-8.012-7.767 10.885-1.628 4.726-10.011 5.031 9.99z" transform="translate(-945.648 -673.671)" 
              fill={`url(#star-grad-${fillPercentage})`}
        />
    </svg>
  );

  for (let i = 0; i < 5; i++) {
    let percentage = 0;
    if (i < fullStars) {
      percentage = 100;
    } else if (i === fullStars) {
      percentage = partialPercentage;
    }
    stars.push(<StarSVG key={i} fillPercentage={percentage} />);
  }
  
  return (
    <div className="flex space-x-0.5 items-center">
      {stars}
      <span className="ml-2 font-bold text-lg" style={{ color: COLOR_TEXT }}>{rating.toFixed(1).replace('.', ',')} / 5</span>
      <span className="text-sm text-gray-500 hover:text-gray-700 transition"> ({ProductData.reviewCount} avis)</span>
    </div>
  );
};

// Fonction pour rendre le contenu de l'onglet actif
const renderTabContent = (activeTab, tabsContent) => {
  const data = tabsContent[activeTab];

  if (!data || !Array.isArray(data.content)) return null;

  if (activeTab === "Utilisation") {
    return (
      <div className="space-y-8 text-left">
        <h3 className="text-2xl font-semibold" style={{ color: COLOR_TEXT }}>{data.title}</h3>
        {data.content.map((item, index) => (
          <div key={index} className="p-4 border-l-4 rounded-md" style={{ borderColor: COLOR_PRIMARY, backgroundColor: 'rgba(178,137,95,0.05)' }}>
            <p className="text-xl font-bold mb-1" style={{ color: COLOR_TEXT }}>{item.title}</p>
            <p className="text-gray-700">{item.description}</p>
          </div>
        ))}
      </div>
    );
  }

  if (activeTab === "Composition") {
      return (
          <div className="space-y-6 text-left">
              <h3 className="text-2xl font-semibold" style={{ color: COLOR_TEXT }}>{data.title}</h3>
              {data.content.map((item, index) => (
                  <div key={index} className="space-y-1 pb-2 border-b border-gray-100 last:border-b-0">
                      <p className="text-lg font-bold" style={{ color: COLOR_TEXT }}>{item.name}</p>
                      <p className="text-gray-600 italic text-sm">{item.role}</p>
                  </div>
              ))}
              <p className="text-sm italic text-gray-500 pt-4 border-t border-gray-200">
                  **99.4%** du total des ingrédients sont d'origine naturelle. **99.4%** du total des ingrédients sont issus de l'Agriculture Biologique.
              </p>
          </div>
      );
  }

  // Onglet "Présentation"
  return (
    <div className="space-y-5 text-left">
        <h3 className="text-2xl font-semibold" style={{ color: COLOR_TEXT }}>{data.title}</h3>
        {data.content.map((text, index) => (
            <div key={index} className="flex items-start">
                <span className="mr-3 text-lg" style={{ color: COLOR_PRIMARY }}>✓</span>
                <p className="text-gray-700 flex-1">{text}</p>
            </div>
        ))}
    </div>
  );
};

// Composant pour afficher une étoile pleine (utilisé pour les notes individuelles)
const FilledStarSVG = ({ filled }) => (
    <svg className="w-4 h-4" fill={filled ? COLOR_PRIMARY : 'rgba(178,137,95,0.3)'} viewBox="0 0 31.575 30.402" xmlns="http://www.w3.org/2000/svg">
        <path d="m977.223 685.241-7.775 7.8 2.031 10.988-9.836-5.168-9.678 5.211 1.7-11-8.012-7.767 10.885-1.628 4.726-10.011 5.031 9.99z" transform="translate(-945.648 -673.671)" />
    </svg>
);

// Composant pour une carte d'avis client
const ReviewCard = ({ review }) => {
    const stars = Array(5).fill(0).map((_, i) => (
        <FilledStarSVG key={i} filled={i < review.note} />
    ));

    return (
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-md transition duration-300 hover:shadow-lg space-y-3 flex flex-col justify-between h-full">
            <div>
                <div className="flex items-center space-x-0.5 mb-2">
                    {stars}
                </div>
                <p className="text-xl font-extrabold mb-1" style={{ color: COLOR_TEXT }}>{review.titre}</p>
                <p className="text-gray-700 italic text-base line-clamp-4">{review.contenu}</p>
            </div>
            <div className="text-xs text-gray-500 pt-3 border-t border-gray-100">
                <p className="font-semibold">{review.auteur}</p>
                <p>Posté le {review.date}</p>
            </div>
        </div>
    );
};

// --- Composant Principal de la Fiche Technique ---
const DetailProduit = ({ id }) => {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('Présentation');
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Contenu des onglets dynamique basé sur le produit
  const tabsContent = product ? {
    "Présentation": (product.presentation && Array.isArray(product.presentation)) ? { title: "Propriétés & Labels", content: product.presentation } : ProductData.tabsContent["Présentation"],
    "Utilisation": (product.utilisation && Array.isArray(product.utilisation)) ? { title: "Conseils d'Application", content: product.utilisation } : ProductData.tabsContent["Utilisation"],
    "Composition": (product.composition && Array.isArray(product.composition)) ? { title: "Ingrédients clés & INCI", content: product.composition } : ProductData.tabsContent["Composition"],
  } : ProductData.tabsContent;

  const tabs = Object.keys(tabsContent);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        if (id) {
          const { data } = await api.get(`/produits/${id}`);
          if (!isMounted) return;
          setProduct(data);
        } else {
          const { data } = await api.get('/produits');
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
    } else {
      cart.push({
        id: product.id,
        name: dataTitle,
        price: dataPrice,
        categorie: dataCategorie,
        stock: dataStock,
        imageUrl: mainImage,
        quantity: quantity,
        description: ProductData.shortDescription,
        rating: ProductData.rating,
        deliveryTime: 'Maintenant',
        isSelected: true,
      });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    navigate('/panier');
  };

  const dataTitle = product?.nom || product?.name || ProductData.title;
  const dataPrice = product?.prix || product?.price || ProductData.price;
  const dataCategorie = product?.id_categorie.nom || product?.Categorie || ProductData.Categorie;
  const dataStock = product?.stock || product?.Stock || ProductData.Stock;
  const mainImage = product?.image || product?.photo || 'image/heros.jpg';
  const image_mini1 = product?.image_mini1 || product?.photo || 'image/beauty.jpg';
  const image_mini2 = product?.image_mini2 || product?.photo || 'image/beauty.jpg';
  const image_mini3 = product?.image_mini3 || product?.photo || 'image/beauty.jpg';

  return (
    <div className="max-w-7xl mx-auto bg-white font-sans shadow-2xl rounded-xl overflow-hidden">
      {error && (
        <div className="p-4 bg-red-100 text-red-700">Erreur chargement produits: {typeof error === 'object' ? JSON.stringify(error) : error}</div>
      )}
      {loading && (
        <div className="p-4">Chargement...</div>
      )}
      {/* SECTION HAUTE : Image et Informations d'Achat (Grille 2 colonnes) */}
      <div className="grid lg:grid-cols-2 gap-12 p-6 md:p-12 border-b border-gray-100">

        {/* Colonne 1: Galerie d'images */}
        <div className="flex flex-col items-center">
            {/* Image Principale */}
            <div className="w-full max-w-lg mb-6">
                <img 
                    src={mainImage}
                    alt={dataTitle} 
                    className="w-full h-100 object-cover rounded-lg shadow-xl hover:shadow-2xl transition duration-300"
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
        <div className="space-y-6 text-left">
          
          <h1 className="text-4xl font-extrabold leading-snug" style={{ color: COLOR_TEXT }}>
            {dataTitle}
          </h1>
          <p className="text-gray-900 font-bold text-2xl">Categorie: {dataCategorie}</p>

          {/* Évaluation */}
          <div className="flex items-center space-x-4 pb-4 border-b border-gray-100">
            <RatingStars rating={ProductData.rating} />
          </div>

          {/* Description courte */}
          <p className="text-lg text-gray-700 leading-relaxed">
            {ProductData.shortDescription}
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
                    <p className="font-semibold">{ProductData.volume} ml</p>
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
      <div className="p-6 md:p-12 border-t border-gray-100">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4" style={{ color: COLOR_TEXT }}>
            Avis clients ({reviews.length > 0 ? reviews.length : ProductData.reviewCount})
          </h2>
          <div className="flex items-center space-x-4 mb-6">
            <RatingStars rating={ProductData.rating} />
            <span className="text-gray-600">Basé sur {reviews.length > 0 ? reviews.length : ProductData.reviewCount} avis</span>
          </div>
        </div>

        {/* Grille des avis */}
        {reviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ProductData.reviews.map((review) => (
              <div key={review.id} className="bg-white p-5 rounded-xl border border-gray-100 shadow-md transition duration-300 hover:shadow-lg space-y-3 flex flex-col justify-between h-full">
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
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailProduit;
