import React, { useEffect, useState } from "react";
import { Heart, Eye, Grid, List, Search, ChevronLeft, ChevronRight, Filter, X } from "lucide-react"; // icônes
import api from "../API/url";
import { apiIMG } from "../API/pathPicture";

// Carte produit
function ProductCard({ product, viewMode, onAddToCart, onToggleFavorite }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFavorite(favorites.some(item => item.id === product.id));
  }, [product.id]);

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
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    let newFavorites;
    
    if (isFavorite) {
      newFavorites = favorites.filter(item => item.id !== product.id);
    } else {
      newFavorites = [...favorites, {
        id: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.image,
        description: product.description || product.name
      }];
    }
    
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);
    
    if (onToggleFavorite) {
      onToggleFavorite(product.id, !isFavorite);
    }
  };

  if (viewMode === "list") {
    return (
      <div className="group flex items-center bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-2xl hover:border-[#5C4033]/20 transition-all duration-300 mb-4 transform hover:-translate-y-1">
        {/* Image with modern styling */}
        <div className="w-28 h-28 shrink-0 mr-6 relative overflow-hidden rounded-2xl bg-linear-to-br from-[#5C4033]/5 to-[#8B5E3C]/5">
          <img
            className="w-full h-full object-contain rounded-2xl group-hover:scale-110 transition-transform duration-300"
            src={apiIMG + product.image || "/image/heros.jpg"}
            alt={product.name}
          />
          {product.discount && (
            <div className="absolute top-2 left-2 bg-linear-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
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
          <p className="text-3xl font-black text-[#5C4033] mt-3 bg-linear-to-r from-[#5C4033] to-[#8B5E3C] bg-clip-text">
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
            href={`/produit?id=${product.id}`}
            className="rounded-xl bg-linear-to-r from-[#5C4033] to-[#8B5E3C] px-6 py-3 text-sm font-bold text-white hover:from-[#8B5E3C] hover:to-[#5C4033] text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Voir détails
          </a>
          <button
            onClick={handleAddToCart}
            className="rounded-xl bg-linear-to-r from-orange-500 to-red-500 px-6 py-3 text-sm font-bold text-white hover:from-red-500 hover:to-orange-500 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            🛒 Ajouter
          </button>
        </div>
      </div>
    );
  }

  // Vue grille (par défaut) - Modern design
  return (
    <div className="group relative rounded-2xl border border-gray-200 bg-white p-6 shadow-lg h-120 flex flex-col justify-between hover:shadow-2xl hover:border-[#5C4033]/30 transition-all duration-500 transform hover:-translate-y-2 ">
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
      <div className="h-48 w-full flex items-center justify-center relative overflow-hidden rounded-2xl bg-linear-to-br from-[#5C4033]/5 to-[#8B5E3C]/5">
        <img
          className="h-full object-contain rounded-2xl group-hover:scale-110 transition-transform duration-500"
          src={apiIMG + product.image || "/image/heros.jpg"}
          alt={product.name}
        />
        {product.discount && (
          <div className="absolute top-3 left-3 bg-linear-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-pulse">
            -{product.discount}%
          </div>
        )}
      </div>

      {/* Infos with modern spacing and typography */}
      <div className="pt-6 flex flex-col flex-1 justify-between">
        {/* Category badge */}
        <div className="flex justify-between items-start mb-3">
          <span className="px-3 py-1 rounded-full bg-linear-to-r from-[#5C4033]/10 to-[#8B5E3C]/10 text-xs font-bold text-[#5C4033] uppercase tracking-wide">
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
          <p className="text-3xl font-black text-[#5C4033] bg-linear-to-r from-[#5C4033] to-[#8B5E3C] bg-clip-text ">
            {product.price} Ar
          </p>
          <div className="flex gap-3">
            <a
              href={`/produit?id=${product.id}`}
              className="flex-1 rounded-xl bg-linear-to-r from-[#5C4033] to-[#8B5E3C] py-3 text-sm font-bold text-white hover:from-[#8B5E3C] hover:to-[#5C4033] text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              👁️ Voir
            </a>
            <button
              onClick={handleAddToCart}
              className="flex-1 rounded-xl bg-linear-to-r from-orange-500 to-red-500 py-3 text-sm font-bold text-white hover:from-red-500 hover:to-orange-500 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
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
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState("grid"); // "grid" ou "list"
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        // Fetch categories
        const catRes = await api.get('/api/categories');
        if (isMounted && Array.isArray(catRes.data)) {
            setCategories(catRes.data);
        }

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
            category: p.categorie?.nom || p.category ,
            categoryId: p.categorie?.id
          }));
          setProducts(normalized);
          setSearch(storedQuery); // Set the search input to show the query
          // Clear stored results after displaying
          localStorage.removeItem('searchResults');
          localStorage.removeItem('searchQuery');
        } else {
          // Load all products normally
          const { data } = await api.get('/api/produits');
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
            category: p.categorie?.nom || p.category ,
            categoryId: p.categorie?.id
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

  // Toggle category function
  const toggleCategory = (catName) => {
    setSelectedCategories(prev =>
      prev.includes(catName)
        ? prev.filter(c => c !== catName)
        : [...prev, catName]
    );
  };

  // Clear all categories
  const clearCategories = () => {
    setSelectedCategories([]);
  };

  // Unified filtering logic for multi-select
  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = selectedCategories.length === 0 || selectedCategories.includes(p.category);
    return matchesSearch && matchesFilter;
  });

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <section className="bg-gray-50 p-10 py-8">
      <div className="mx-auto max-w-7xl px-4 ">
        {/* Header */}
        <div className="mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
          {error && (
            <p className="text-red-600 text-sm">Erreur chargement produits: {typeof error === 'object' ? JSON.stringify(error) : error}</p>
          )}
          <h2 className="text-2xl font-bold text-[#5C4033]">
            Tous nos produits
          </h2>

          <div className="flex gap-3 items-center">
            {/* Filter Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="p-2 bg-white border border-gray-300 rounded-lg hover:shadow-md transition-shadow duration-200 flex items-center gap-1"
            >
              <Filter size={18} />
              Filtres
            </button>

            {/* Boutons de vue - Modern */}
            <div className="flex bg-white border border-gray-300 rounded-lg overflow-hidden shadow-sm">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-3 transition-colors duration-200 ${
                  viewMode === "grid" 
                    ? "bg-[#5C4033] text-white" 
                    : "text-gray-600 hover:text-[#5C4033] hover:bg-gray-50"
                }`}
              >
                <Grid size={20} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-3 transition-colors duration-200 ${
                  viewMode === "list" 
                    ? "bg-[#5C4033] text-white" 
                    : "text-gray-600 hover:text-[#5C4033] hover:bg-gray-50"
                }`}
              >
                <List size={20} />
              </button>
            </div>

            {/* Modern Search Field */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher un produit..."
                className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C4033] focus:border-transparent outline-none transition-all duration-200 bg-white shadow-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="mb-6 bg-white border border-gray-200 rounded-lg p-4 shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-[#5C4033]">Filtres par catégorie</h3>
              <button onClick={() => setShowFilters(false)} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => toggleCategory(cat.nom)}
                  className={`px-3 py-2 rounded-lg text-sm transition-colors duration-200 ${
                    selectedCategories.includes(cat.nom)
                      ? 'bg-[#5C4033] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cat.nom}
                </button>
              ))}
            </div>
            {selectedCategories.length > 0 && (
              <button
                onClick={clearCategories}
                className="mt-3 text-sm text-red-600 hover:underline"
              >
                Effacer les filtres
              </button>
            )}
          </div>
        )}

        <div className="text-left text-stone-800 mb-5 mt-5 pl-5 min-h-12">
          Découvrez notre gamme complète de produits naturels, conçus pour votre bien-être et celui de la planète.
        </div>

        {/* Affichage des produits filtrés */}
        <div className="rounded-lg bg-white p-4 ">
          {loading ? (
            <div className="text-center py-10">Chargement des produits...</div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-10 text-gray-500">Aucun produit trouvé</div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} viewMode={viewMode} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} viewMode={viewMode} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-2">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="p-2 rounded-full bg-white border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-md transition-shadow duration-200 flex items-center justify-center"
              >
                <ChevronLeft size={20} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    currentPage === page
                      ? 'bg-[#5C4033] text-white'
                      : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="p-2 rounded-full bg-white border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-md transition-shadow duration-200 flex items-center justify-center"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
