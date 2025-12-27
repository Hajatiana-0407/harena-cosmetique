import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Search, User, ShoppingBag, Heart, Menu, X, ArrowRight } from "lucide-react";
import api from '../API/url';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [client, setClient] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const checkAuth = () => {
      const clientData = localStorage.getItem('client');
      const parsedClient = clientData ? JSON.parse(clientData) : null;
      setIsLoggedIn(!!parsedClient);
      setClient(parsedClient);
    };
    checkAuth();
    window.addEventListener('authChange', checkAuth);
    return () => window.removeEventListener('authChange', checkAuth);
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    try {
      const response = await api.get(`/search?q=${encodeURIComponent(searchQuery)}`);
      localStorage.setItem('searchResults', JSON.stringify(response.data));
      localStorage.setItem('searchQuery', searchQuery);
      navigate('/catalogue');
    } catch (error) {
      navigate('/catalogue');
    }
  };

  const navLinks = [
    { name: "ACCUEIL", path: "/" },
    { name: "CATALOGUE", path: "/catalogue" },
    { name: "PRODUITS", path: "/produit" },
    { name: "BLOG", path: "/blog" },
    { name: "FAQ", path: "/faq" },
    { name: "A PROPOS", path: "/a-propos" },
    { name: "CONTACT", path: "/contact" },
  ];

  return (
    <>
      {/* ESPACEUR RÉACTIF : 
          - h-[70px] sur mobile (correspond au header compact)
          - lg:h-[130px] sur desktop (quand le menu de navigation apparaît)
          - Si scrollé sur desktop, on réduit un peu la place
      */}
      <div className={`transition-all duration-300 ${scrolled ? "h-17.5 lg:h-25" : "h-17.5 lg:h-32.5"}`} />

      <header 
        className={`fixed top-0 w-full z-100 transition-all duration-500 border-b ${
          scrolled 
            ? "bg-white/95 backdrop-blur-md border-stone-200/50 py-2 shadow-sm" 
            : "bg-white border-transparent py-4"
        }`}
      >
        <div className="container mx-auto px-4 md:px-10">
          <div className="flex items-center justify-between">
            
            {/* LOGO */}
            <Link to="/" className="flex items-center group flex-shrink-0">
              <img
                src="/image/MonLogo.png"
                alt="Logo"
                className="h-8 md:h-10 w-auto object-contain mr-2 transition-transform duration-500 group-hover:scale-105"
              />
              <span className="text-stone-900 font-serif text-xl md:text-2xl tracking-tighter uppercase italic">
                Harena<span className="text-[#8b5e3c]">.</span>
              </span>
            </Link>

            {/* RECHERCHE - Visible uniquement à partir de MD */}
            <div className="hidden md:flex flex-1 max-w-md mx-10">
              <div className="relative w-full group">
                <input
                  type="text"
                  placeholder="Rechercher une essence..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  className="w-full bg-stone-50 border border-stone-100 rounded-full py-2.5 pl-11 pr-4 text-xs tracking-wide focus:bg-white focus:ring-4 focus:ring-stone-100 focus:border-stone-200 transition-all outline-none"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-[#8b5e3c] w-4 h-4 transition-colors" />
              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex items-center space-x-1 md:space-x-4">
              <Link to="/favoris" className="hidden sm:flex p-2.5 text-stone-600 hover:text-[#8b5e3c] hover:bg-stone-50 rounded-full transition-all">
                <Heart size={20} strokeWidth={1.5} />
              </Link>

              {isLoggedIn ? (
                <div className="flex items-center space-x-3 md:space-x-5">
                  <Link to="/panier" className="p-2.5 text-stone-600 hover:text-[#8b5e3c] relative">
                    <ShoppingBag size={20} strokeWidth={1.5} />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-[#8b5e3c] rounded-full ring-2 ring-white"></span>
                  </Link>
                  <Link to="/compte" className="group">
                    <div className="w-8 h-8 rounded-full border border-stone-200 group-hover:border-[#8b5e3c] transition-all overflow-hidden p-0.5">
                      <img
                        src="https://127.0.0.1:8000/image/beauty.jpg"
                        alt="Profil"
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                  </Link>
                </div>
              ) : (
                <Link to="/login" className="p-2.5 text-stone-600 hover:text-[#8b5e3c] hover:bg-stone-50 rounded-full transition-all">
                  <User size={20} strokeWidth={1.5} />
                </Link>
              )}

              {/* BURGER MOBILE - Caché sur Desktop (lg) */}
              <button 
                onClick={() => setIsOpen(true)}
                className="lg:hidden p-2.5 text-stone-900 bg-stone-50 rounded-full ml-2"
              >
                <Menu size={20} />
              </button>
            </div>
          </div>

          {/* NAVIGATION DESKTOP - STRICTEMENT CACHÉE SUR MOBILE */}
          <nav className="hidden lg:flex justify-center mt-4 border-t border-stone-50">
            <div className="flex space-x-10 py-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-[10px] font-extrabold tracking-[0.25em] transition-all duration-300 relative group py-1 ${
                    location.pathname === link.path ? "text-[#8b5e3c]" : "text-stone-400 hover:text-stone-900"
                  }`}
                >
                  {link.name}
                  <span className={`absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-[2px] bg-[#8b5e3c] transition-all duration-500 rounded-full ${
                    location.pathname === link.path ? "w-full" : "w-0 group-hover:w-full"
                  }`}></span>
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </header>

      {/* SIDEBAR MOBILE */}
      <div className={`fixed inset-0 z-[110] lg:hidden transition-all duration-500 ${isOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}>
        <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm" onClick={() => setIsOpen(false)}></div>
        <div className={`absolute right-0 top-0 h-full w-[85%] max-w-sm bg-white shadow-2xl transform transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-6 border-b border-stone-50">
              <span className="font-serif italic font-bold text-2xl tracking-tighter">Harena<span className="text-[#8b5e3c]">.</span></span>
              <button onClick={() => setIsOpen(false)} className="p-2 text-stone-400 hover:text-stone-900 transition-colors bg-stone-50 rounded-full">
                <X size={24} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto py-10 px-8">
              <div className="space-y-8">
                {navLinks.map((link, index) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center justify-between group text-xl font-light tracking-wide transition-all ${
                      location.pathname === link.path ? "text-[#8b5e3c]" : "text-stone-700"
                    }`}
                  >
                    <span>{link.name}</span>
                    <ArrowRight size={18} className="opacity-40 group-hover:opacity-100 transition-opacity" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="p-8 bg-stone-50">
              <div className="relative w-full mb-8">
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="w-full bg-white border-transparent rounded-xl py-4 pl-12 pr-4 text-sm outline-none shadow-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (handleSearch(), setIsOpen(false))}
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 w-5 h-5" />
              </div>
              <p className="text-[10px] text-stone-400 text-center uppercase tracking-[0.3em] font-bold">Pureté & Élégance Artisanale</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}