import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Filter, Search, X, Calendar, User, Star, ArrowRight } from "lucide-react";
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
  const [sortBy, setSortBy] = useState('recent'); // 'recent' ou 'popular'

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
        }));
        
        // Tri manuel si nécessaire
        if (sortBy === 'recent') {
          normalized.sort((a, b) => new Date(b.created_At) - new Date(a.created_At));
        }

        setArticles(normalized);
        if (authors.length === 0) {
            setAuthors([...new Set(list.map(a => a.auteur).filter(Boolean))]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    const timer = setTimeout(fetchArticles, 400);
    return () => { isMounted = false; clearTimeout(timer); };
  }, [searchTerm, selectedAuthor, sortBy]);

  return (
    <div className={`min-h-screen ${theme.bg} pt-12 pb-24 font-sans`}>
      <div className="max-w-6xl mx-auto px-6">
        
        {/* EN-TÊTE & RECHERCHE */}
        <ScrollFadeIn>
          <div className="text-center mb-12">
            <span className={`text-[11px] font-bold uppercase tracking-[0.3em] ${theme.accentText} mb-4 block`}>
              Le Journal d'Harèna
            </span>
            <h1 className={`text-4xl md:text-6xl font-serif ${theme.textPrimary} italic mb-10`}>
              Conseils & rituels
            </h1>

            <div className="relative max-w-2xl mx-auto">
              <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                <Search className={`w-5 h-5 ${theme.textMuted}`} />
              </div>
              <input
                type="text"
                placeholder="Rechercher une astuce..."
                className="w-full pl-14 pr-32 py-5 bg-white border border-stone-200 rounded-2xl shadow-sm outline-none focus:ring-4 focus:ring-[#C5A059]/10 transition-all text-[#4A3728]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className={`absolute right-3 top-3 bottom-3 px-6 rounded-xl ${theme.accent} text-white text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 hover:scale-105 active:scale-95 transition-all duration-300 shadow-md`}
              >
                <Filter size={14} /> Filtres
              </button>
            </div>
          </div>
        </ScrollFadeIn>

        {/* PANNEAU FILTRES ACTIF */}
        {showFilters && (
          <ScrollFadeIn>
            <div className="bg-white border border-stone-100 rounded-3xl p-8 mb-12 shadow-xl grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              <button onClick={() => setShowFilters(false)} className="absolute top-4 right-4 p-2 text-stone-300 hover:text-stone-600 transition-colors">
                <X size={20} />
              </button>
              
              <div className="space-y-3">
                <label className={`text-[10px] font-bold uppercase tracking-widest ${theme.textPrimary}`}>Par Expert</label>
                <select 
                  value={selectedAuthor}
                  onChange={(e) => setSelectedAuthor(e.target.value)}
                  className="w-full p-3 bg-stone-50 border border-stone-100 rounded-xl outline-none focus:border-[#C5A059] text-sm"
                >
                  <option value="">Tous les auteurs</option>
                  {authors.map(a => <option key={a} value={a}>{a}</option>)}
                </select>
              </div>

              <div className="space-y-3">
                <label className={`text-[10px] font-bold uppercase tracking-widest ${theme.textPrimary}`}>Trier par</label>
                <div className="flex gap-2">
                   {['recent', 'popular'].map(t => (
                     <button 
                        key={t} 
                        onClick={() => setSortBy(t)}
                        className={`px-4 py-2 border rounded-lg text-xs uppercase tracking-tight transition-all w-full ${sortBy === t ? 'bg-[#4A3728] text-white border-[#4A3728]' : 'bg-stone-50 border-stone-100 text-stone-500 hover:border-[#C5A059]'}`}
                     >
                        {t === 'recent' ? 'Récent' : 'Populaire'}
                     </button>
                   ))}
                </div>
              </div>

              <div className="flex items-end">
                <button 
                   onClick={() => {setSearchTerm(''); setSelectedAuthor(''); setSortBy('recent');}}
                   className="w-full py-3 text-[10px] font-bold uppercase tracking-widest text-[#8C7E6A] underline underline-offset-4 hover:text-[#C5A059] transition-colors"
                >
                  Réinitialiser
                </button>
              </div>
            </div>
          </ScrollFadeIn>
        )}

        {/* LISTE DES ARTICLES */}
        <div className="grid grid-cols-1 gap-8">
          {loading ? (
             <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-[#C5A059] border-t-transparent rounded-full animate-spin"></div></div>
          ) : articles.length === 0 ? (
            <div className="text-center py-24 bg-white rounded-[3rem] border border-dashed border-stone-200">
               <p className="text-stone-400 font-serif italic text-lg">Aucun secret de beauté trouvé pour cette recherche...</p>
            </div>
          ) : (
            articles.map((article, index) => (
              <ScrollFadeIn key={article.id || index} delay={index * 50}>
                <div className="group bg-white rounded-[2rem] overflow-hidden border border-stone-100 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col md:flex-row md:h-[320px]">
                  
                  <div className="w-full md:w-5/12 relative h-56 md:h-full overflow-hidden bg-stone-50">
                    <img
                      src={article.image ? apiIMG + article.image : "/image/beauty.jpg"}
                      alt={article.titre}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/95 backdrop-blur rounded-full text-[9px] font-bold uppercase tracking-widest text-[#4A3728]">
                        Rituel
                      </span>
                    </div>
                  </div>

                  <div className="w-full md:w-7/12 p-6 md:p-10 flex flex-col">
                    <div className="flex-grow">
                      <div className="flex items-center gap-3 mb-3 text-[9px] font-medium text-[#8C7E6A] uppercase tracking-[0.2em]">
                        <span className="flex items-center gap-1.5"><Calendar size={12}/> {article.temps}</span>
                        <span className="w-1 h-1 bg-stone-300 rounded-full"></span>
                        <span className="flex items-center gap-1.5"><User size={12}/> {article.auteur || "Expert"}</span>
                      </div>
                      
                      <h3 className={`text-xl md:text-2xl font-serif ${theme.textPrimary} mb-3 group-hover:text-[#C5A059] transition-colors line-clamp-2 leading-snug`}>
                        {article.titre}
                      </h3>

                      <div className="flex gap-0.5 mb-4">
                        {[...Array(5)].map((_, i) => <Star key={i} size={12} className="fill-[#C5A059] text-[#C5A059]" />)}
                      </div>

                      <p className={`${theme.textMuted} leading-relaxed text-sm line-clamp-2 md:line-clamp-3 mb-6 font-light`}>
                        {article.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-stone-50 mt-auto">
                      <button
                        onClick={() => {
                          localStorage.setItem('selectedArticle', JSON.stringify(article));
                          navigate('/detail-blog');
                        }}
                        className={`text-[10px] font-bold uppercase tracking-[0.2em] ${theme.textPrimary} flex items-center gap-3 group/btn w-fit`}
                      >
                        <span className="relative">
                          Découvrir
                          <span className={`absolute -bottom-1 left-0 w-0 h-px ${theme.accent} transition-all duration-300 group-hover/btn:w-full`}></span>
                        </span>
                        <div className="flex items-center transition-all duration-300 group-hover/btn:translate-x-2">
                          <span className={`w-8 h-px ${theme.accent} transition-all duration-300 group-hover/btn:w-4`}></span>
                          <ArrowRight size={14} className={`opacity-0 -translate-x-2 transition-all duration-300 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 ${theme.accentText}`} />
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </ScrollFadeIn>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;