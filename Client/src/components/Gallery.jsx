import React, { useEffect, useState } from "react";
import { Heart, Eye, Grid, List } from "lucide-react"; // icônes
import api from "../API/url";

// Carte produit
function ProductCard({ product, viewMode, onAddToCart, onToggleFavorite }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product);
    } else {
      // Fallback to localStorage cart
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const existing = cart.find(item => item.id === product.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1,
          description: product.description || product.name
        });
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      // Show success message or redirect
      alert('Produit ajouté au panier!');
    }
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    if (onToggleFavorite) {
      onToggleFavorite(product.id, !isFavorite);
    }
  };

  if (viewMode === "list") {
    return (
      <div className="group flex items-center bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-2xl hover:border-[#5C4033]/20 transition-all duration-300 mb-4 transform hover:-translate-y-1">
        {/* Image with modern styling */}
        <div className="w-28 h-28 flex-shrink-0 mr-6 relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#5C4033]/5 to-[#8B5E3C]/5">
          <img
            className="w-full h-full object-contain rounded-2xl group-hover:scale-110 transition-transform duration-300"
            src={product.image || "/image/heros.jpg"}
            alt={product.name}
          />
          {product.discount && (
            <div className="absolute top-2 left-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
              -{product.discount}%
            </div>
          )}
        </div>

        {/* Infos with modern typography */}
        <div className="flex-1">
          <h3 className="text-xl font-bold text-[#5C4033] hover:text-[#8B5E3C] transition-colors duration-200 cursor-pointer group-hover:underline">
            {product.name}
          </h3>
          <div className="flex items-center gap-3 mt-2">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={i < Math.round(product.rating) ? 'text-yellow-400' : 'text-gray-300'}>
                  ★
                </span>
              ))}
            </div>
            <p className="text-sm font-semibold text-orange-600">{product.rating}</p>
            <p className="text-sm text-gray-500">({product.reviews} avis)</p>
          </div>
          <p className="text-3xl font-black text-[#5C4033] mt-3 bg-gradient-to-r from-[#5C4033] to-[#8B5E3C] bg-clip-text">
            {product.price} Ar
          </p>
        </div>

        {/* Actions with modern buttons */}
        <div className="flex flex-col gap-3 ml-6">
          <button
            onClick={handleToggleFavorite}
            className={`p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 ${
              isFavorite
                ? 'bg-red-500 text-white shadow-red-200'
                : 'bg-white text-[#5C4033] hover:bg-red-50 hover:shadow-red-200'
            }`}
          >
            <Heart size={20} className={isFavorite ? 'fill-current' : ''} />
          </button>
          <button className="p-3 bg-white rounded-full shadow-lg hover:bg-blue-50 hover:shadow-blue-200 transition-all duration-300 transform hover:scale-110">
            <Eye size={20} className="text-[#5C4033]" />
          </button>
          <a
            href={`/produit/${product.id}`}
            className="rounded-xl bg-gradient-to-r from-[#5C4033] to-[#8B5E3C] px-6 py-3 text-sm font-bold text-white hover:from-[#8B5E3C] hover:to-[#5C4033] text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Voir détails
          </a>
          <button
            onClick={handleAddToCart}
            className="rounded-xl bg-gradient-to-r from-orange-500 to-red-500 px-6 py-3 text-sm font-bold text-white hover:from-red-500 hover:to-orange-500 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            🛒 Ajouter
          </button>
        </div>
      </div>
    );
  }

  // Vue grille (par défaut) - Modern design
  return (
    <div className="group relative rounded-2xl border border-gray-200 bg-white p-6 shadow-lg h-[480px] flex flex-col justify-between hover:shadow-2xl hover:border-[#5C4033]/30 transition-all duration-500 transform hover:-translate-y-2 hover:rotate-1">
      {/* Icônes favoris et voir - Modern floating buttons */}
      <div className="absolute top-4 right-4 flex gap-2 z-10">
        <button
          onClick={handleToggleFavorite}
          className={`p-3 rounded-full shadow-xl transition-all duration-300 transform hover:scale-110 ${
            isFavorite
              ? 'bg-red-500 text-white shadow-red-300'
              : 'bg-white/90 backdrop-blur-sm text-[#5C4033] hover:bg-red-50 hover:shadow-red-300'
          }`}
        >
          <Heart size={20} className={isFavorite ? 'fill-current' : ''} />
        </button>
        <button className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-xl hover:bg-blue-50 hover:shadow-blue-300 transition-all duration-300 transform hover:scale-110">
          <Eye size={20} className="text-[#5C4033]" />
        </button>
      </div>

      {/* Image with modern container */}
      <div className="h-48 w-full flex items-center justify-center relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#5C4033]/5 to-[#8B5E3C]/5">
        <img
          className="h-full object-contain rounded-2xl group-hover:scale-110 transition-transform duration-500"
          src={product.image || "/image/heros.jpg"}
          alt={product.name}
        />
        {product.discount && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-pulse">
            -{product.discount}%
          </div>
        )}
      </div>

      {/* Infos with modern spacing and typography */}
      <div className="pt-6 flex flex-col flex-1 justify-between">
        {/* Category badge */}
        <div className="flex justify-between items-start mb-3">
          <span className="px-3 py-1 rounded-full bg-gradient-to-r from-[#5C4033]/10 to-[#8B5E3C]/10 text-xs font-bold text-[#5C4033] uppercase tracking-wide">
            {product.category}
          </span>
        </div>

        {/* Product name with modern font */}
        <h3 className="text-xl font-bold text-[#5C4033] hover:text-[#8B5E3C] transition-colors duration-200 cursor-pointer group-hover:underline line-clamp-2 leading-tight">
          {product.name}
        </h3>

        {/* Rating with modern stars */}
        <div className="mt-3 flex items-center gap-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={`text-lg ${i < Math.round(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
                ★
              </span>
            ))}
          </div>
          <p className="text-sm font-semibold text-orange-600">{product.rating}</p>
          <p className="text-sm text-gray-500">({product.reviews} avis)</p>
        </div>

        {/* Prix + boutons with modern design */}
        <div className="mt-6 flex flex-col gap-3">
          <p className="text-3xl font-black text-[#5C4033] bg-gradient-to-r from-[#5C4033] to-[#8B5E3C] bg-clip-text ">
            {product.price} Ar
          </p>
          <div className="flex gap-3">
            <a
              href={`/produit/${product.id}`}
              className="flex-1 rounded-xl bg-gradient-to-r from-[#5C4033] to-[#8B5E3C] py-3 text-sm font-bold text-white hover:from-[#8B5E3C] hover:to-[#5C4033] text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              👁️ Voir
            </a>
            <button
              onClick={handleAddToCart}
              className="flex-1 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 py-3 text-sm font-bold text-white hover:from-red-500 hover:to-orange-500 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              🛒 Ajouter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Carrousel
export default function Gallery() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState("grid"); // "grid" ou "list"

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        // Check for stored search results first
        const storedResults = localStorage.getItem('searchResults');
        const storedQuery = localStorage.getItem('searchQuery');

        if (storedResults && storedQuery) {
          // Display search results
          const searchData = JSON.parse(storedResults);
          const list = Array.isArray(searchData) ? searchData : [];
          const normalized = list.map((p) => ({
            id: p.id,
            name: p.nom || p.name || `Produit ${p.id}`,
            image: p.image || p.photo || "/image/heros.jpg",
            discount: p.remise || p.discount || "",
            rating: p.note || p.rating || 5,
            reviews: p.reviews || 0,
            price: p.prix || p.price || 0,
            category: p.categorie?.nom || p.category || "autres",
          }));
          setProducts(normalized);
          setSearch(storedQuery); // Set the search input to show the query
          // Clear stored results after displaying
          localStorage.removeItem('searchResults');
          localStorage.removeItem('searchQuery');
        } else {
          // Load all products normally
          const { data } = await api.get('/produits');
          if (!isMounted) return;
          const list = Array.isArray(data) ? data : [];
          const normalized = list.map((p) => ({
            id: p.id,
            name: p.nom || p.name || `Produit ${p.id}`,
            image: p.image || p.photo || "/image/heros.jpg",
            discount: p.remise || p.discount || "",
            rating: p.note || p.rating || 5,
            reviews: p.reviews || 0,
            price: p.prix || p.price || 0,
            category: p.categorie?.nom || p.category || "autres",
          }));
          setProducts(normalized);
        }
      } catch (err) {
        setError(err?.response?.data || err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    })();
    return () => { isMounted = false; };
  }, []);





  // Filtrage pour produits cheveux
  const filteredProductsCheveux = products.filter(
    (p) =>
      (filter === "all" || p.category === filter) &&
      p.name.toLowerCase().includes(search.toLowerCase()) &&
      (p.category === "cheveux" || p.category === "soin" || filter === "all")
  );
  // Composants flèches personnalisées
  const CustomNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} slick-next`}
        style={{
          ...style,
          display: 'block',
          background: '#5C4033',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          right: '-50px',
          zIndex: 1,
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
        }}
        onClick={onClick}
      >
        <svg
          className="w-6 h-6 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    );
  };

  const CustomPrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} slick-prev`}
        style={{
          ...style,
          display: 'block',
          background: '#5C4033',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          left: '-50px',
          zIndex: 1,
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
        }}
        onClick={onClick}
      >
        <svg
          className="w-6 h-6 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </div>
    );
  };

  // Paramètres carrousel pour cheveux
  const settingsCheveux = {
    dots: true,
    infinite: filteredProductsCheveux.length > 1,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          infinite: filteredProductsCheveux.length > 1,
          autoplay: true,
          autoplaySpeed: 3000,
          nextArrow: <CustomNextArrow />,
          prevArrow: <CustomPrevArrow />
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          infinite: filteredProductsCheveux.length > 1,
          autoplay: true,
          autoplaySpeed: 3000,
          nextArrow: <CustomNextArrow />,
          prevArrow: <CustomPrevArrow />
        }
      },
    ],
  };
  // Filtrage pour produits visage
  const filteredProductsVisage = products.filter(
    (p) =>
      (filter === "all" || p.category === filter) &&
      p.name.toLowerCase().includes(search.toLowerCase()) &&
      (p.category === "visage" || p.category === "soin" || filter === "all")
  );
  // Paramètres carrousel pour visage
  const settingsVisage = {
    dots: true,
    infinite: filteredProductsVisage.length > 1,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          infinite: filteredProductsVisage.length > 1,
          autoplay: true,
          autoplaySpeed: 3000,
          nextArrow: <CustomNextArrow />,
          prevArrow: <CustomPrevArrow />
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          infinite: filteredProductsVisage.length > 1,
          autoplay: true,
          autoplaySpeed: 3000,
          nextArrow: <CustomNextArrow />,
          prevArrow: <CustomPrevArrow />
        }
      },
    ],
  };
  return (
    <section className="bg-gray-50 p-10 py-8 pt-20">
      <div className="mx-auto max-w-screen-xl px-4 ">
        {/* Header */}
        <div className="mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
          {error && (
            <p className="text-red-600 text-sm">Erreur chargement produits: {typeof error === 'object' ? JSON.stringify(error) : error}</p>
          )}
          <h2 className="text-2xl font-bold text-[#5C4033]">
            Tous nos produits
          </h2>

          <div className="flex gap-3 items-center">
            {/* Boutons de vue */}
            <div className="flex border rounded">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 ${viewMode === "grid" ? "bg-[#5C4033] text-white" : "text-[#5C4033]"}`}
              >
                <Grid size={18} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 ${viewMode === "list" ? "bg-[#5C4033] text-white" : "text-[#5C4033]"}`}
              >
                <List size={18} />
              </button>
            </div>

            <select
              className="border rounded px-2 py-1 text-[#5C4033]"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">Tous</option>
              <option value="soin">Soins</option>
              <option value="cheveux">Cheveux</option>
              <option value="savon">Savons</option>
            </select>

            <input
              type="text"
              placeholder="Rechercher un produit..."
              className="border rounded px-3 py-1 w-64 text-[#5C4033]"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="text-left text-stone-800 mb-5 mt-5 pl-5 min-h-[3rem]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo neque id nobis fugiat. Perspiciatis dignissimos eos officia atque hic, expedita quis? Nihil iusto ad placeat maiores odio architecto optio quidem?
          Cupiditate fugit vitae voluptatem numquam magni, sunt quis t
        </div>


        {/* Affichage des produits cheveux */}
        <div className="rounded-lg border bg-white p-4 shadow-md">
          {loading ? (
            <div className="text-center py-10">Chargement des produits...</div>
          ) : filteredProductsCheveux.length === 0 ? (
            <div className="text-center py-10 text-gray-500">Aucun produit pour cheveux trouvé</div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProductsCheveux.map((product) => (
                <ProductCard key={product.id} product={product} viewMode={viewMode} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredProductsCheveux.map((product) => (
                <ProductCard key={product.id} product={product} viewMode={viewMode} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
