import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FaRegStar, FaStar, FaSearch } from 'react-icons/fa';
import { Star, Eye, ShoppingCart } from 'lucide-react';
import { toast } from 'react-toastify';
import RequestApi from '../API/RequestApi';

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
      cart.push({ ...product, quantity: 1 });
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

  const starCount = 4;
  const maxStars = 5; // Standard is usually 5

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
    <div className='group relative hover:shadow-2xl hover:scale-105 hover:cursor-pointer cursor-pointer max-w-2xs rounded-3xl bg-white shadow-lg border border-gray-200 text-left flex flex-col transition-all duration-500 hover:-translate-y-2 overflow-hidden'>
      {/* Image container with modern styling */}
      <div className='relative overflow-hidden rounded-t-3xl bg-gradient-to-br from-stone-50 to-stone-100'>
        <img
          src={imageSrc}
          alt={productName}
          className='w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500'
        />
        {/* Overlay gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Content with modern padding and layout */}
      <div className='p-6 flex flex-col grow justify-between'>
        <div>
          <h3 className='text-2xl font-black mb-2 text-stone-800 group-hover:text-stone-900 transition-colors duration-300'>{productName}</h3>
          <p className='text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed'>{productDesc}</p>
        </div>

        {/* Rating and price section */}
        <div className='flex justify-between items-end mb-4'>
          <div>
            <div className='flex mb-2'>
              {[...Array(maxStars)].map((_, index) =>
                index < starCount ? (
                  <FaStar key={index} className="text-yellow-400 w-5 h-5" />
                ) : (
                  <FaRegStar key={index} className="text-gray-300 w-5 h-5" />
                )
              )}
            </div>
            <div className='font-black text-3xl text-stone-800 bg-gradient-to-r from-stone-800 to-stone-600 bg-clip-text text-transparent'>{formatPriceApi(product.price || product.prix)}</div>
          </div>
        </div>

        {/* Buttons with modern design */}
        <div className='flex gap-3'>
          <Link
            to={"/produit/" + product.id}
            className="flex-1 py-3 px-4 text-center bg-gradient-to-r from-stone-800 to-stone-900 text-white rounded-full font-bold hover:from-stone-900 hover:to-stone-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm"
          >
            <Eye className="inline w-4 h-4 mr-1" /> Voir détails
          </Link>
          <button
            className="flex-1 py-3 px-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full font-bold hover:from-orange-500 hover:to-amber-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm"
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

  const toggleCategory = (categoryName) => {
    setSelectedCategories(prev =>
      prev.includes(categoryName)
        ? prev.filter(c => c !== categoryName)
        : [...prev, categoryName]
    );
  };

  // Filter and Sort Logic
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // 1. Search
    if (searchTerm) {
      const lowerTerm = searchTerm.toLowerCase();
      result = result.filter(p =>
        (p.name && p.name.toLowerCase().includes(lowerTerm)) ||
        (p.nom && p.nom.toLowerCase().includes(lowerTerm)) ||
        (p.description && p.description.toLowerCase().includes(lowerTerm)) ||
        (p.Definition && p.Definition.toLowerCase().includes(lowerTerm))
      );
    }

    // 2. Categories
    if (selectedCategories.length > 0) {
      result = result.filter(p => {
          const catName = p.categorie?.nom || p.NomCategorie;
          return selectedCategories.includes(catName);
      });
    }

    // 3. Price
    if (minPrice) {
      result = result.filter(p => (p.price || p.prix) >= parseFloat(minPrice));
    }
    if (maxPrice) {
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
  }, [products, searchTerm, selectedCategories, minPrice, maxPrice, sortOption]);


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
          {/* Section: NOUVEAU PRODUIT */}
          {productINV.length > 0 && (
            <>
              <h2 className="text-xl font-bold tracking-tight text-gray-900 mb-6 border-b pb-2">NOUVEAU PRODUIT</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                {productINV.map((p, idx) => (
                  <div key={idx} className='rounded-2xl hover:scale-102 hover:shadow-2xl hover:cursor-pointer bg-amber-100 shadow-md border border-gray-100 text-left flex flex-col transition-all duration-300'>
                    <div className='relative'>
                      <div className='absolute top-2 -right-2 bg-yellow-300 rotate-12 p-1 px-3 rounded-md shadow-sm text-xs font-bold animate-pulse'>
                        Nouveau
                      </div>
                      <img src={p.image || p.Image || p.Imagee || "images/Card.jpg"} alt={p.name || p.nom} className='w-full h-48 rounded-t-2xl object-cover' />
                    </div>
                    <div className='p-4 flex flex-col gap-3 grow'>
                      <div>
                        <div className='text-xl font-bold'>{p.name || p.nom}</div>
                        <div className='text-sm font-light text-gray-700 line-clamp-2'>{p.description || p.Presentation}</div>
                      </div>
                      <div className='mt-auto flex justify-between items-end'>
                        <div>
                          <div className="flex mb-1">
                            {[...Array(5)].map((_, i) => (
                              <FaStar key={i} className="text-yellow-400 w-3 h-3" />
                            ))}
                          </div>
                          <div className='font-semibold text-xl'>{p.price || p.prix} Ar</div>
                        </div>
                        <div className='flex flex-col gap-2'>
                          <Link className="btn bg-stone-900 p-2 px-4 border-0 rounded-full text-white text-xs text-center" to={"/produit/" + p.id}>Voir</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}


          {/* Section: TOUS LES PRODUITS */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold tracking-tight text-gray-900">TOUS LES PRODUITS</h2>
            <span className="text-sm text-gray-500">{filteredProducts.length} produits trouvés</span>
          </div>
          <hr className="border-stone-500 h-1 mb-6 opacity-20" />

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
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

          {filteredProducts.length > 0 && (
            <div className="mt-12 text-center">
              <button className="bg-gray-100 text-gray-800 py-2 px-6 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">
                Charger plus de produits
              </button>
            </div>
          )}

          <hr className="my-10 border-gray-300" />
        </main>
      </div>
    </div>
  );
};

export default ProduitsPage;
