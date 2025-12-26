import React, { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { Star, Eye, ShoppingCart } from 'lucide-react';
import { toast } from 'react-toastify';
import RequestApi from '../API/RequestApi';
import api from '../API/url';
import { apiIMG } from '../API/pathPicture';



// ====================================================================
// Pagination Component
// ====================================================================
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center mt-8 space-x-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Précédent
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 rounded-md transition-colors ${
            page === currentPage
              ? 'bg-orange-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Suivant
      </button>
    </div>
  );
};

// ====================================================================
// I. COMPOSANT ProductCard (Présentation seulement)
// ====================================================================
const ProductCard = ({ product }) => {
  if (!product) return null;

  // Helper to add product to cart stored in localStorage
  const addToCart = (product) => {
    let cart = [];
    if (localStorage.getItem('cart')) {
      try {
        cart = JSON.parse(localStorage.getItem('cart'));
      } catch {
        cart = [];
      }
    }
    // Check if product already in cart
    const existingIndex = cart.findIndex(item => item.id === product.id);
    if (existingIndex >= 0) {
      cart[existingIndex].quantity = (cart[existingIndex].quantity || 1) + 1;
    } else {
      // Standardize fields for cart
      const cartItem = {
        id: product.id,
        name: product.name || product.nom || 'Produit',
        price: parseFloat(product.price || product.prix || 0) || 0, // Ensure price is a number
        categorie: product.id_categorie?.nom || product.NomCategorie || 'Catégorie',
        stock: product.stock || 0,
        imageUrl: product.image ? `${api.defaults.baseURL}${product.image}` : '/image/beauty.jpg', // Full server URL
        quantity: 1,
        description: product.definition || 'Description non disponible',
        rating: product.rating || 0,
        deliveryTime: 'Maintenant',
        isSelected: true,
      };
      cart.push(cartItem);
    }
    localStorage.setItem('cart', JSON.stringify(cart));

    const clientData = localStorage.getItem('client');
    if (clientData) {
      try {
        const client = JSON.parse(clientData);
        const clientKey = (client.nom || '') + (client.prenom || '') + (client.id || '');
        localStorage.setItem(clientKey, localStorage.getItem('cart'));
      } catch (e) {
        console.error("Error saving client cart", e);
      }
    }
    toast.success(`${product.name || product.nom} ajouté au panier`);
  };

  // Check if product is on promotion
  const isOnPromo = product.promo_active && (!product.promo_expiration || new Date(product.promo_expiration) > new Date());
  const originalPrice = parseFloat(product.price || product.prix || 0);
  const discountPercent = isOnPromo && product.promo_price !== null && parseFloat(product.promo_price) < originalPrice ? Math.round(((originalPrice - parseFloat(product.promo_price)) / originalPrice) * 100) : 0;

  // Price formatter for API price
  const formatPriceApi = (price) => {
    if (typeof price === 'number') {
      return price.toFixed(2).replace('.', ',') + ' Ar';
    }
    return price;
  };

  // Handle image source with fallbacks
  const imageSrc = product.image || product.Image || product.Image || "/images/Card.jpg";
  const productName = product.name || product.nom || "Produit";
  const productDesc = product.definition || "";

  return (
    <div className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden h-90">
      {/* Image Area */}
      <div className="relative aspect-4/5 overflow-hidden bg-gray-50">
        <img
          src={apiIMG + imageSrc}
          alt={productName}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
            {isOnPromo && (
             <span className="bg-rose-500 text-white text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full shadow-sm">
                Promo -{discountPercent}%
             </span>
            )}
        </div>

        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
             <Link 
                to={`/produit/${product.id}`}
                className="transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75 bg-white text-gray-900 p-3 rounded-full hover:bg-orange-500 hover:text-white shadow-lg"
                title="Voir détails"
            >
                <Eye size={20} />
            </Link>
            <button
                onClick={() => addToCart(product)}
                className="transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-100 bg-white text-gray-900 p-3 rounded-full hover:bg-orange-500 hover:text-white shadow-lg"
                title="Ajouter au panier"
            >
                <ShoppingCart size={20} />
            </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-5 flex flex-col grow">
        <div className="mb-3">
            <h3 className="text-lg font-bold text-gray-900 line-clamp-1 group-hover:text-orange-600 transition-colors">
                {productName}
            </h3>
            <p className="text-sm text-gray-500 line-clamp-2 mt-1 h-10 leading-relaxed">
                {productDesc}
            </p>
        </div>

        <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-50">
            <div className="flex flex-col">
                 {/* <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">Prix</span> */}
                 <span className="text-xl font-bold text-gray-900">
                    {formatPriceApi(originalPrice)}
                 </span>
            </div>
             <div className="flex items-center text-yellow-400 gap-1 text-sm">
                <Star size={16} fill="currentColor" />
                <span className="text-gray-600 font-medium">{product.rating || 4.5}</span>
                <span className="text-gray-400 text-xs">({product.nombreAvisParProduit || 0})</span>
            </div>
        </div>
      </div>
    </div>
  );
};

// ====================================================================
// II. COMPOSANT FilterSidebar
// ====================================================================

const FilterSidebar = ({
  categories,
  selectedCategories,
  toggleCategory,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  searchTerm,
  setSearchTerm,
  sortOption,
  setSortOption
}) => {
  return (
    <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-8 sticky top-24">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-bold text-slate-900">Filtres</h3>
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Options</span>
      </div>

      {/* Recherche */}
      <div className="mb-10">
        <label className="text-sm font-semibold text-slate-600 uppercase tracking-wide mb-4 block">Recherche</label>
        <div className="relative group">
          <input
            type="text"
            placeholder="Rechercher un produit..."
            className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute left-4 top-4 text-slate-400 group-focus-within:text-blue-500 transition-colors w-5 h-5" />
        </div>
      </div>

      {/* Tri */}
      <div className="mb-10">
        <label className="text-sm font-semibold text-slate-600 uppercase tracking-wide mb-4 block">Trier par</label>
        <div className="relative">
            <select
            className="w-full px-4 py-4 bg-slate-50 border border-slate-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm appearance-none cursor-pointer font-medium"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            >
            <option value="default">Pertinence</option>
            <option value="price-asc">Prix croissant</option>
            <option value="price-desc">Prix décroissant</option>
            <option value="name-asc">Nom (A-Z)</option>
            <option value="name-desc">Nom (Z-A)</option>
            </select>
            <div className="absolute right-4 top-4 pointer-events-none text-slate-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
        </div>
      </div>

      {/* Catégories */}
      <div className="mb-10">
        <label className="text-sm font-semibold text-slate-600 uppercase tracking-wide mb-4 block">Catégories</label>
        <div className="space-y-3 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
          {categories.map((cat, index) => (
            <label key={index} className="flex items-center p-3 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors group">
              <div className="relative flex items-center">
                <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat.nom || cat.Nom)}
                    onChange={() => toggleCategory(cat.nom || cat.Nom)}
                    className="peer h-6 w-6 text-blue-500 border-2 border-slate-300 rounded focus:ring-blue-500 cursor-pointer transition-all checked:border-blue-500"
                />
                <svg className="absolute left-1.5 top-1.5 w-3 h-3 text-white hidden peer-checked:block pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <span className="ml-4 text-sm text-slate-700 group-hover:text-slate-900 transition-colors font-medium">
                {cat.nom || cat.Nom}
              </span>
            </label>
          ))}
          {categories.length === 0 && <p className="text-sm text-slate-400 italic">Aucune catégorie disponible</p>}
        </div>
      </div>

      {/* Prix */}
      <div>
        <label className="text-sm font-semibold text-slate-600 uppercase tracking-wide mb-4 block">Budget (Ar)</label>
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <span className="absolute left-4 top-3 text-slate-400 text-xs font-medium">Min</span>
            <input
                type="number"
                className="w-full pl-12 pr-3 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm font-medium"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
            />
          </div>
          <div className="w-3 h-0.5 bg-slate-300"></div>
          <div className="relative flex-1">
            <span className="absolute left-4 top-3 text-slate-400 text-xs font-medium">Max</span>
            <input
                type="number"
                className="w-full pl-12 pr-3 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm font-medium"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// ====================================================================
// III. COMPOSANT ProduitsPage (Principal)
// ====================================================================

const ProduitsPage = () => {
  const [searchParams] = useSearchParams();

  // 1. État des produits et des filtres
  const [products, setProducts] = useState([]);
  const [productINV, setProductINV] = useState([]);
  const [categories, setCategories] = useState([]);

  // Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortOption, setSortOption] = useState('default');

  // Pagination States
  const [currentTab, setCurrentTab] = useState('all'); // 'new', 'all'
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // 3x3 grid

  // Fetch Data
  useEffect(() => {
    let mounted = true;
    const api = RequestApi();

    (async () => {
      try {
        const [prodData, invData, catData] = await Promise.all([
          api.fetchProduits(),
          api.fetchProduitsInv(),
          api.fetchCategories()
        ]);

        if (mounted) {
          setProducts(Array.isArray(prodData) ? prodData : []);
          setProductINV(Array.isArray(invData) ? invData : []);
          setCategories(Array.isArray(catData) ? catData : []);
        }
      } catch (err) {
        console.error('Error fetching data', err);
      }
    })();

    return () => { mounted = false; };
  }, []);

  // Handle category query parameter
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam && categoryParam !== 'undefined') {
      setSelectedCategories([categoryParam]);
      setCurrentTab('all');
    }
  }, [searchParams]);

  const toggleCategory = (categoryName) => {
    setSelectedCategories(prev =>
      prev.includes(categoryName)
        ? prev.filter(c => c !== categoryName)
        : [...prev, categoryName]
    );
  };

  // Helper function to apply filters and sort
  const applyFilters = (productList) => {
    let result = [...productList];

    // 1. Search
    if (searchTerm) {
      const lowerTerm = searchTerm.toLowerCase();
      const beforeSearch = result.length;
      result = result.filter(p =>
        (p.name && p.name.toLowerCase().includes(lowerTerm)) ||
        (p.nom && p.nom.toLowerCase().includes(lowerTerm)) ||
        (p.description && p.description.toLowerCase().includes(lowerTerm)) ||
        (p.Definition && p.Definition.toLowerCase().includes(lowerTerm))
      );
    }

    // 2. Categories
    if (selectedCategories.length > 0) {
      const beforeCategory = result.length;
      result = result.filter(p => {
        let catName = '';
        let catId = null;
        let matchingCat = null;

        // Handle if id_categorie is full object (from serialization)
        if (p.id_categorie && typeof p.id_categorie === 'object') {
          catId = p.id_categorie.id;
          catName = p.id_categorie.nom || p.id_categorie.Nom || '';
        } else {
          catId = p.id_categorie || p.categorie_id || p.categorie?.id;
          if (catId) {
            matchingCat = categories.find(cat => cat.id == catId);
            catName = matchingCat ? (matchingCat.nom || matchingCat.Nom || '') : '';
          } else {
            catName = p.categorie?.nom || p.NomCategorie || '';
          }
        }

        return selectedCategories.includes(catName);
      });
    }

    // 3. Price
    if (minPrice) {
      const beforeMin = result.length;
      result = result.filter(p => (p.price || p.prix) >= parseFloat(minPrice));
    }
    if (maxPrice) {
      const beforeMax = result.length;
      result = result.filter(p => (p.price || p.prix) <= parseFloat(maxPrice));
    }

    // 4. Sort
    switch (sortOption) {
      case 'price-asc':
        result.sort((a, b) => (a.price || a.prix) - (b.price || b.prix));
        break;
      case 'price-desc':
        result.sort((a, b) => (b.price || b.prix) - (a.price || a.prix));
        break;
      case 'name-asc':
        result.sort((a, b) => (a.name || a.nom || '').localeCompare(b.name || b.nom || ''));
        break;
      case 'name-desc':
        result.sort((a, b) => (b.name || b.nom || '').localeCompare(a.name || a.nom || ''));
        break;
      default:
        break;
    }

    return result;
  };

  // Filter and Sort Logic for all products
  const filteredProducts = useMemo(() => applyFilters(products), [products, searchTerm, selectedCategories, minPrice, maxPrice, sortOption]);

  // Tab-based filtering
  const tabFilteredProducts = useMemo(() => {
    if (currentTab === 'new') {
      return applyFilters(productINV);
    } else {
      // All products
      return filteredProducts;
    }
  }, [currentTab, filteredProducts, productINV, searchTerm, selectedCategories, minPrice, maxPrice, sortOption]);

  // Pagination logic
  const totalPages = Math.ceil(tabFilteredProducts.length / itemsPerPage);
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return tabFilteredProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [tabFilteredProducts, currentPage, itemsPerPage]);

  // Reset page when tab or filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [currentTab, searchTerm, selectedCategories, minPrice, maxPrice, sortOption]);


  return (
    <div className="min-h-screen bg-slate-50 pt-5 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header Section */}
        <div className="mb-5 text-center">
            <h1 className="text-5xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight">
                Notre Collection
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                Découvrez nos produits cosmétiques naturels, conçus pour sublimer votre beauté authentique.
            </p>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-10">

          {/* ➡️ Barre Latérale des Filtres */}
          <aside className="lg:col-span-3 mb-8 lg:mb-0">
            <FilterSidebar
              categories={categories}
              selectedCategories={selectedCategories}
              toggleCategory={toggleCategory}
              minPrice={minPrice}
              setMinPrice={setMinPrice}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              sortOption={sortOption}
              setSortOption={setSortOption}
            />
          </aside>

          {/* ➡️ Contenu Principal */}
          <main className="lg:col-span-9">
            {/* Tabs for New and All Products */}
            <div className="flex justify-center mb-10">
              <div className="bg-white rounded-full p-1.5 shadow-sm border border-gray-100 inline-flex">
                <button
                  onClick={() => setCurrentTab('new')}
                  className={`px-8 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                    currentTab === 'new'
                      ? 'bg-orange-500 text-white shadow-md'
                      : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  Nouveautés
                </button>
                <button
                  onClick={() => setCurrentTab('all')}
                  className={`px-8 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                    currentTab === 'all'
                      ? 'bg-orange-500 text-white shadow-md'
                      : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  Tout le catalogue
                </button>
              </div>
            </div>

            {/* Section: NOUVEAU PRODUIT (only show when new tab is selected) */}
            {currentTab === 'new' && productINV.length > 0 && (
              <div className="animate-fade-in-up">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-gray-900">Derniers Arrivages</h2>
                    <div className="h-px flex-grow bg-gray-200 ml-6"></div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {paginatedProducts.map((p, idx) => {
                    // Reuse ProductCard logic for consistent design, but we can highlight them if needed
                    // For now, let's use the same ProductCard component for consistency, 
                    // but we can pass a 'isNew' prop if we want specific styling.
                    // However, the previous code had a completely different inline design.
                    // To keep it "Modern & Professional", consistency is key. 
                    // I will use the ProductCard but maybe wrap it or add a badge.
                    
                    // Actually, let's just use ProductCard directly. It handles "Promo" badges.
                    // We can add a "New" badge logic inside ProductCard if we want, but the user didn't ask for logic changes.
                    // The previous code had a "Nouveau" badge. Let's stick to using ProductCard for a cleaner look.
                    
                    return <ProductCard key={idx} product={p} />;
                  })}
                </div>
              </div>
            )}

            {/* Section: ANCIENS PRODUITS or TOUS LES PRODUITS */}
            {(currentTab === 'old' || currentTab === 'all') && (
              <div className="animate-fade-in-up">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {currentTab === 'old' ? 'Anciens Produits' : 'Catalogue Complet'}
                  </h2>
                  <span className="text-sm font-medium text-gray-500 bg-white px-3 py-1 rounded-full border border-gray-100 shadow-sm">
                    {tabFilteredProducts.length} résultats
                  </span>
                </div>

                {paginatedProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {paginatedProducts.map(product => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-24 bg-white rounded-3xl border border-dashed border-gray-300">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                        <FaSearch className="text-gray-300 text-2xl" />
                    </div>
                    <p className="text-gray-900 font-medium text-lg mb-2">Aucun produit trouvé</p>
                    <p className="text-gray-500 text-sm mb-6">Essayez de modifier vos filtres ou votre recherche.</p>
                    <button
                      onClick={() => {
                        setSearchTerm('');
                        setSelectedCategories([]);
                        setMinPrice('');
                        setMaxPrice('');
                      }}
                      className="px-6 py-2 bg-orange-50 text-orange-600 font-bold rounded-full hover:bg-orange-100 transition-colors text-sm"
                    >
                      Réinitialiser les filtres
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-16">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProduitsPage;
