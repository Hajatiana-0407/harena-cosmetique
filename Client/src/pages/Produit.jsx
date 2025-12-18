import React, { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { Star, Eye, ShoppingCart } from 'lucide-react';
import { toast } from 'react-toastify';
import RequestApi from '../API/RequestApi';
import api from '../API/url';

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
        description: product.description || product.definition || 'Description non disponible',
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
  const imageSrc = product.image || product.Image || product.Imagee || "/images/Card.jpg";
  const productName = product.name || product.nom || "Produit";
  const productDesc = product.description || product.Definition || "";

  return (
    <div className='group relative hover:shadow-2xl hover:scale-105 hover:cursor-pointer cursor-pointer max-w-2xs rounded-3xl bg-gradient-to-br from-white via-gray-50 to-stone-100 shadow-xl border border-gray-300 text-left flex flex-col transition-all duration-700 hover:-translate-y-3 overflow-hidden backdrop-blur-sm'>
      {/* Image container with modern styling */}
      <div className='relative overflow-hidden rounded-t-3xl bg-gradient-to-br from-stone-100 to-stone-200'>
        <img
          src={imageSrc}
          alt={productName}
          className='w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700'
        />
        {/* Promo Badge */}
        {isOnPromo && discountPercent > 0 && (
          <div className="absolute top-2 left-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse">
            -{discountPercent}%
          </div>
        )}
        {/* Promo Text */}
        {isOnPromo && (
          <div className="absolute bottom-2 left-2 bg-gradient-to-r from-orange-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
            En Promotion
          </div>
        )}
        {/* Overlay gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>

      {/* Content with modern padding and layout */}
      <div className='p-6 flex flex-col grow justify-between bg-white/80 backdrop-blur-sm'>
        <div>
          <h3 className='text-2xl font-black mb-2 text-stone-800 group-hover:text-stone-900 transition-colors duration-300 bg-gradient-to-r from-stone-800 to-stone-600 bg-clip-text text-transparent'>{productName}</h3>
          <p className='text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed'>{productDesc}</p>
        </div>

        {/* Reviews and price section */}
        <div className='flex justify-between items-end mb-4'>
          <div>
            <div className='text-sm text-gray-600 mb-2'>
              Avis: {product.nombreAvisParProduit || 0}
            </div>
            <div className='font-black text-3xl text-stone-800 bg-gradient-to-r from-stone-800 to-stone-600 bg-clip-text text-transparent'>
              {formatPriceApi(originalPrice)}
            </div>
          </div>
        </div>

        {/* Buttons with modern design */}
        <div className='flex gap-3'>
          <Link
            to={`/produit/${product.id}`}
            className="flex-1 py-3 px-4 text-center bg-gradient-to-r from-stone-800 to-stone-900 text-white rounded-full font-bold hover:from-stone-900 hover:to-stone-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm backdrop-blur-sm"
          >
            <Eye className="inline w-4 h-4 mr-1" /> Voir détails
          </Link>
          <button
            className="flex-1 py-3 px-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full font-bold hover:from-orange-500 hover:to-amber-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm backdrop-blur-sm"
            onClick={() => addToCart(product)}
          >
            <ShoppingCart className="inline w-4 h-4 mr-1" /> Acheter
          </button>
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
    <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm sticky top-24">
      <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">FILTRES</h3>

      {/* Recherche */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-2 uppercase">Recherche</h3>
        <div className="relative">
          <input
            type="text"
            placeholder="Nom du produit..."
            className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute left-2.5 top-3 text-gray-400 w-4 h-4" />
        </div>
      </div>

      {/* Tri */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-2 uppercase">Trier par</h3>
        <select
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="default">Par défaut</option>
          <option value="price-asc">Prix croissant</option>
          <option value="price-desc">Prix décroissant</option>
          <option value="name-asc">Nom (A-Z)</option>
          <option value="name-desc">Nom (Z-A)</option>
        </select>
      </div>

      {/* Catégories */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-2 uppercase">Catégories</h3>
        <ul className="space-y-2 max-h-60 overflow-y-auto">
          {categories.map((cat, index) => (
            <li key={index} className="flex items-center">
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat.nom || cat.Nom)}
                onChange={() => toggleCategory(cat.nom || cat.Nom)}
                className="h-4 w-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500 cursor-pointer"
              />
              <label className="ml-2 text-sm text-gray-600 cursor-pointer" onClick={() => toggleCategory(cat.nom || cat.Nom)}>
                {cat.nom || cat.Nom}
              </label>
            </li>
          ))}
          {categories.length === 0 && <li className="text-sm text-gray-400">Aucune catégorie</li>}
        </ul>
      </div>

      {/* Prix */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-2 uppercase">Prix (Ar)</h3>
        <div className="flex items-center space-x-2">
          <input
            type="number"
            placeholder="Min"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 text-sm"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <span className="text-gray-400">-</span>
          <input
            type="number"
            placeholder="Max"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 text-sm"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
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
    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-gray-50 mt-19">
      <div className="lg:grid lg:grid-cols-4 lg:gap-8">

        {/* ➡️ Barre Latérale des Filtres */}
        <aside className="lg:col-span-1 mb-8 lg:mb-0">
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
        <main className="lg:col-span-3">
          {/* Tabs for New and All Products */}
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-full p-1 shadow-md border">
              <button
                onClick={() => setCurrentTab('new')}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  currentTab === 'new'
                    ? 'bg-orange-500 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Nouveaux Produits
              </button>
              <button
                onClick={() => setCurrentTab('all')}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  currentTab === 'all'
                    ? 'bg-orange-500 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Tous les Produits
              </button>
            </div>
          </div>

          {/* Section: NOUVEAU PRODUIT (only show when new tab is selected) */}
          {currentTab === 'new' && productINV.length > 0 && (
            <>
              <h2 className="text-xl font-bold tracking-tight text-gray-900 mb-6 border-b pb-2">NOUVEAUX PRODUITS</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                {paginatedProducts.map((p, idx) => {
                  // Price formatter for new products
                  const formatPriceApiNew = (price) => {
                    if (typeof price === 'number') {
                      return price.toFixed(2).replace('.', ',') + ' Ar';
                    }
                    return price;
                  };
                  const isOnPromoNew = p.promo_active && (!p.promo_expiration || new Date(p.promo_expiration) > new Date());
                  const originalPriceNew = parseFloat(p.price || p.prix || 0);
                  const discountPercentNew = isOnPromoNew && p.promo_price !== null && parseFloat(p.promo_price) < originalPriceNew ? Math.round(((originalPriceNew - parseFloat(p.promo_price)) / originalPriceNew) * 100) : 0;
                  return (
                    <div key={idx} className='group relative hover:shadow-2xl hover:scale-105 hover:cursor-pointer cursor-pointer max-w-2xs rounded-3xl bg-gradient-to-br from-amber-50 via-amber-100 to-orange-100 shadow-xl border border-amber-200 text-left flex flex-col transition-all duration-700 hover:-translate-y-3 overflow-hidden backdrop-blur-sm'>
                      <div className='relative overflow-hidden rounded-t-3xl bg-gradient-to-br from-amber-200 to-orange-200'>
                        <div className='absolute top-2 -right-2 bg-gradient-to-r from-yellow-300 to-yellow-400 rotate-12 p-1 px-3 rounded-md shadow-sm text-xs font-bold animate-pulse'>
                          Nouveau
                        </div>
                        {isOnPromoNew && discountPercentNew > 0 && (
                          <div className="absolute top-2 left-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse">
                            -{discountPercentNew}%
                          </div>
                        )}
                        {isOnPromoNew && (
                          <div className="absolute bottom-2 left-2 bg-gradient-to-r from-orange-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                            En Promotion
                          </div>
                        )}
                        <img src={p.image ? `${api.defaults.baseURL}${p.image}` : "images/Card.jpg"} alt={p.name || p.nom} className='w-full h-48 rounded-t-2xl object-cover group-hover:scale-110 transition-transform duration-700' />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      </div>
                      <div className='p-4 flex flex-col gap-3 grow bg-amber-50/80 backdrop-blur-sm'>
                        <div>
                          <div className='text-xl font-bold bg-gradient-to-r from-amber-800 to-orange-600 bg-clip-text text-transparent'>{p.name || p.nom}</div>
                          <div className='text-sm font-light text-gray-700 line-clamp-2'>{p.description || p.Presentation}</div>
                        </div>
                        <div className='mt-auto flex justify-between items-end'>
                          <div>
                            <div className='text-sm text-gray-600 mb-2'>
                              Avis: {p.nombreAvisParProduit || 0}
                            </div>
                            <div className='font-semibold text-xl bg-gradient-to-r from-amber-800 to-orange-600 bg-clip-text text-transparent'>
                              {formatPriceApiNew(originalPriceNew)}
                            </div>
                          </div>
                          <div className='flex flex-col gap-2'>
                            <Link className="btn bg-gradient-to-r from-stone-800 to-stone-900 p-2 px-4 border-0 rounded-full text-white text-xs text-center hover:from-stone-900 hover:to-stone-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 backdrop-blur-sm" to={`/produit/${p.id}`}>Voir</Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {/* Section: ANCIENS PRODUITS or TOUS LES PRODUITS */}
          {(currentTab === 'old' || currentTab === 'all') && (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold tracking-tight text-gray-900">
                  {currentTab === 'old' ? 'ANCIENS PRODUITS' : 'TOUS LES PRODUITS'}
                </h2>
                <span className="text-sm text-gray-500">{tabFilteredProducts.length} produits trouvés</span>
              </div>
              <hr className="border-stone-500 h-1 mb-6 opacity-20" />

              {paginatedProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {paginatedProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <p className="text-gray-500 text-lg">Aucun produit ne correspond à vos critères.</p>
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategories([]);
                      setMinPrice('');
                      setMaxPrice('');
                    }}
                    className="mt-4 text-orange-600 hover:text-orange-800 font-medium"
                  >
                    Réinitialiser les filtres
                  </button>
                </div>
              )}
            </>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}

          <hr className="my-10 border-gray-300" />
        </main>
      </div>
    </div>
  );
};

export default ProduitsPage;
