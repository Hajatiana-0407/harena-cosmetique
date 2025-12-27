import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Filter, Search, X, Calendar, User, Star } from "lucide-react";
import api from "../API/url";
import { apiIMG } from "../API/pathPicture";

// --- UTILITAIRE DE NETTOYAGE HTML ---
const stripHtml = (html) => {
  if (!html) return "";
  return html.replace(/<[^>]*>?/gm, '').replace(/&nbsp;/g, ' ').trim();
};

// --- COMPOSANT D'ANIMATION ---
const ScrollFadeIn = ({ children, direction = 'up', delay = 0, threshold = 0.1 }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, [threshold]);

  const getInitialTranslate = () => {
    switch (direction) {
      case 'left': return 'translate-x-[-30px]';
      case 'right': return 'translate-x-[30px]';
      default: return 'translate-y-[20px]';
    }
  };

  return (
    <div 
      ref={ref} 
      className={`transition-all duration-700 ease-out h-full ${isVisible ? 'opacity-100 translate-x-0 translate-y-0' : `opacity-0 ${getInitialTranslate()}`}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const BlogPage = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [authors, setAuthors] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  const theme = {
    bg: 'bg-[#FAF9F6]',
    textPrimary: 'text-[#4A3728]',
    textMuted: 'text-[#8C7E6A]',
    accent: 'bg-[#C5A059]',
    accentText: 'text-[#C5A059]',
    card: 'bg-white'
  };

  useEffect(() => {
    let isMounted = true;
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        if (searchTerm) params.append('q', searchTerm);
        if (selectedAuthor) params.append('auteur', selectedAuthor);
        
        const { data } = await api.get(`api/articles?${params.toString()}`);
        if (!isMounted) return;

        const list = Array.isArray(data) ? data : [];
        const normalized = list.map((a) => ({
          ...a,
          titre: stripHtml(a.titre || 'Sans titre'),
          description: stripHtml(a.contenu || 'Pas de description'),
          temps: a.created_At ? new Date(a.created_At).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Date inconnue',
          image: a.image,
          note: 5
        }));
        
        setArticles(normalized);
        setAuthors([...new Set(list.map(a => a.auteur).filter(Boolean))]);
      } catch (err) {
        console.error(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    const timer = setTimeout(fetchArticles, 400);
    return () => { isMounted = false; clearTimeout(timer); };
  }, [searchTerm, selectedAuthor]);

  return (
    <div className={`min-h-screen ${theme.bg} pt-12 pb-24 font-sans`}>
      <div className="max-w-6xl mx-auto px-6">
        
        {/* EN-TÊTE */}
        <ScrollFadeIn>
          <div className="text-center mb-12">
            <span className={`text-[11px] font-bold uppercase tracking-[0.3em] ${theme.accentText} mb-4 block`}>
              Le Journal d'Harèna
            </span>
            <h1 className={`text-4xl md:text-6xl font-serif ${theme.textPrimary} italic mb-10`}>
              Conseils & rituels de beauté
            </h1>

            <div className="relative max-w-2xl mx-auto">
              <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                <Search className={`w-5 h-5 ${theme.textMuted}`} />
              </div>
              <input
                type="text"
                placeholder="Rechercher..."
                className="w-full pl-14 pr-32 py-5 bg-white border border-stone-200 rounded-2xl shadow-sm outline-none focus:ring-4 focus:ring-[#C5A059]/10 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className={`absolute right-3 top-3 bottom-3 px-5 rounded-xl ${theme.accent} text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2`}
              >
                <Filter size={14} /> Filtres
              </button>
            </div>
          </div>
        </ScrollFadeIn>

        {/* LISTE DES ARTICLES */}
        <div className="grid grid-cols-1 gap-10">
          {loading ? (
             <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-[#C5A059] border-t-transparent rounded-full animate-spin"></div></div>
          ) : (
            articles.map((article, index) => (
              <ScrollFadeIn key={article.id} delay={index * 50}>
                <div className="group bg-white rounded-[2rem] overflow-hidden border border-stone-100 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col md:flex-row min-h-[320px]">
                  
                  {/* IMAGE SECTION - Fixée pour mobile et desktop */}
                  <div className="w-full md:w-1/3 relative aspect-video md:aspect-auto overflow-hidden">
                    <img
                      src={article.image ? apiIMG + article.image : "/image/beauty.jpg"}
                      alt={article.titre}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-4 py-1.5 bg-white/90 backdrop-blur rounded-full text-[10px] font-bold uppercase tracking-widest text-[#4A3728]">
                        Conseils
                      </span>
                    </div>
                  </div>

                  {/* CONTENT SECTION */}
                  <div className="w-full md:w-2/3 p-6 md:p-10 flex flex-col">
                    <div className="flex-grow">
                      <div className="flex flex-wrap items-center gap-3 mb-4 text-[10px] font-medium text-[#8C7E6A] uppercase tracking-wider">
                        <span className="flex items-center gap-1.5"><Calendar size={14}/> {article.temps}</span>
                        <span className="hidden sm:block w-1 h-1 bg-stone-300 rounded-full"></span>
                        <span className="flex items-center gap-1.5"><User size={14}/> {article.auteur}</span>
                      </div>
                      
                      <h3 className={`text-xl md:text-3xl font-serif ${theme.textPrimary} mb-4 group-hover:text-[#C5A059] transition-colors line-clamp-2`}>
                        {article.titre}
                      </h3>

                      <div className="flex gap-0.5 mb-4">
                        {[...Array(5)].map((_, i) => <Star key={i} size={14} className="fill-[#C5A059] text-[#C5A059]" />)}
                      </div>

                      <p className={`${theme.textMuted} leading-relaxed text-sm md:text-base line-clamp-3 mb-6 font-light`}>
                        {article.description}
                      </p>
                    </div>

                    <div className="pt-6 border-t border-stone-50 mt-auto flex justify-start">
                      <button
                        onClick={() => {
                          localStorage.setItem('selectedArticle', JSON.stringify(article));
                          navigate('/detail-blog');
                        }}
                        className={`text-[12px] font-bold uppercase tracking-[0.2em] ${theme.textPrimary} flex items-center gap-3 group/btn`}
                      >
                        Lire l'article
                        <span className={`w-8 h-px ${theme.accent} transition-all duration-300 group-hover/btn:w-12`}></span>
                      </button>
                    </div>
                  </div>
                </div>
              </ScrollFadeIn>
            ))
          )}
        </div>

        {/* FOOTER ASTUCE */}
        <ScrollFadeIn delay={200}>
          <div className="mt-20 p-10 rounded-[2.5rem] bg-[#4A3728] text-white relative overflow-hidden">
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-2xl font-serif italic mb-4">Le saviez-vous ?</h2>
              <p className="text-stone-300 text-sm md:text-base leading-relaxed opacity-90 font-light">
                Le secret d'une peau éclatante réside dans la régularité de vos rituels. Nos produits sont conçus pour agir en harmonie avec le cycle naturel de votre peau.
              </p>
            </div>
          </div>
        </ScrollFadeIn>
      </div>
    </div>
  );
};

export default BlogPage;