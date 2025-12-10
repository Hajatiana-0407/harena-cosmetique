import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from '../API/url';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const [client, setClient] = useState(null);

  useEffect(() => {
    const checkAuth = () => {
      const clientData = localStorage.getItem('client');
      const parsedClient = clientData ? JSON.parse(clientData) : null;
      setIsLoggedIn(!!parsedClient);
      setClient(parsedClient);
    };

    checkAuth();

    window.addEventListener('authChange', checkAuth);

    return () => {
      window.removeEventListener('authChange', checkAuth);
    };
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    try {
      const response = await api.get(`/search?q=${encodeURIComponent(searchQuery)}`);
      // Store search results in localStorage or state for catalogue page
      localStorage.setItem('searchResults', JSON.stringify(response.data));
      localStorage.setItem('searchQuery', searchQuery);
      navigate('/catalogue');
    } catch (error) {
      console.error('Search error:', error);
      // Navigate to catalogue anyway, maybe show empty results
      navigate('/catalogue');
    }
  };

  return (
    <header className="w-full bg-[#fdf6ec] shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between h-20">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link to="/" className="flex items-center">
            <img
              src="/image/MonLogo.png"
              alt="Harena Cosmetique Beauté"
              className="h-12 w-auto"
            />
            <div className="text-stone-900 font-bold text-3xl sm:text-2xl">Harena Cosmetique</div>
          </Link>
        </div>

        {/* Recherche + icônes */}
        <div className="flex items-center space-x-4">
          {/* Recherche */}
          <div className="relative hidden sm:block">
            <input
              type="search"
              placeholder="Rechercher..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
              className="border border-[#d4bfa4] rounded-full py-1 px-3 pl-9 text-sm w-44 focus:outline-none focus:ring-2 focus:ring-[#8b5e3c] bg-[#fffaf5]"
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a27c56]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Icônes */}
          {isLoggedIn ? (
            <Link to="/compte" className="text-[#6b4226] hover:text-[#8b5e3c] transition">
              <img
                src="https://127.0.0.1:8000/image/beauty.jpg"
                alt="Photo de profil"
                className="w-8 h-8 rounded-full object-cover border-2 border-[#6b4226]"
              />
            </Link>
          ) : (
            <Link to="/login" className="text-[#6b4226] hover:text-[#8b5e3c] transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A9.97 9.97 0 0112 15c2.21 0 4.236.72 5.879 1.929M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </Link>
          )}

          {isLoggedIn && (
            <Link to="/panier" className="text-[#6b4226] hover:text-[#8b5e3c] transition relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.293 2.293A1 1 0 007 17h12m-9 4a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z" />
              </svg>
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </Link>
          )}

          <Link to="/favoris" className="text-[#6b4226] hover:text-[#8b5e3c] transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </Link>

          {/* Burger menu mobile */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-[#6b4226] hover:text-[#8b5e3c] transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      <div className="h-16 hidden lg:flex justify-center border-t-1 border-b-1 border-amber-700  pt-5">
        {/* Menu desktop */}
        <nav className="hidden lg:flex space-x-8 text-sm font-semibold text-[#6b4226]">
          <Link to="/" className="hover:text-[#8b5e3c] transition">ACCUEIL</Link>
          <Link to="/catalogue" className="hover:text-[#8b5e3c] transition">CATALOGUE</Link>
          <Link to="/produit" className="hover:text-[#8b5e3c] transition">PRODUITS</Link>
          <Link to="/blog" className="hover:text-[#8b5e3c] transition">BLOG</Link>
          <Link to="/faq" className="hover:text-[#8b5e3c] transition">FAQ</Link>
          {/* <Link to="/panier" className="hover:text-[#8b5e3c] transition">PANIER</Link> */}
          <Link to="/a-propos" className="hover:text-[#8b5e3c] transition">A PROPOS</Link>
          <Link to="/contact" className="hover:text-[#8b5e3c] transition">CONTACT</Link>
        </nav>
      </div>

      {/* Menu mobile */}
      {isOpen && (
        <div className="lg:hidden bg-[#fdf6ec] shadow-md border-t border-[#d4bfa4]">
          <nav className="flex flex-col space-y-2 p-4 text-[#6b4226] font-medium text-left">
            <Link to="/" className="hover:text-[#8b5e3c]">ACCUEIL</Link>
            <Link to="/catalogue" className="hover:text-[#8b5e3c]">CATALOGUE</Link>
            <Link to="/produit" className="hover:text-[#8b5e3c]">PRODUITS</Link>
            <Link to="/blog" className="hover:text-[#8b5e3c]">BLOG</Link>
            <Link to="/faq" className="hover:text-[#8b5e3c]">FAQ</Link>
            {/* <Link to="/panier" className="hover:text-[#8b5e3c]">PANIER</Link> */}
            <Link to="/a-propos" className="hover:text-[#8b5e3c]">A PROPOS</Link>
            <Link to="/contact" className="hover:text-[#8b5e3c]">CONTACT</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
