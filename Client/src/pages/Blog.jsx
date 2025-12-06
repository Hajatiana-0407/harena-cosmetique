import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../components/Pagination";
import api from "../API/url";

const ScrollFadeIn = ({ children, direction = 'up', delay = 0, threshold = 0.1 }) => {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    // Arrêter d'observer une fois l'élément apparu
                    observer.unobserve(entry.target); 
                }
            },
      
            { threshold: threshold } 
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [threshold]);

    // Détermine la classe de translation initiale (invisible)
    const getInitialTranslate = () => {
        switch (direction) {
            case 'left': return 'translate-x-[-50px]';
            case 'right': return 'translate-x-[50px]';
            case 'up':
            default: return 'translate-y-[30px]';
        }
    };
    
    // Classes de transition et d'état
    const classes = `
        transition-all duration-100 ease-out 
        ${isVisible ? 'opacity-100 translate-x-0 translate-y-0' : `opacity-0 ${getInitialTranslate()}`}
    `;

    // Le style 'transition-delay' est appliqué pour stagger les animations
    const style = { transitionDelay: `${delay}ms` };

    return (
        <div ref={ref} className={classes} style={style}>
            {children}
        </div>
    );
};


// ====================================================================
// COMPOSANT PRINCIPAL BLOG
// ====================================================================

const BlogPage = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    let isMounted = true;
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const endpoint = searchTerm ? `/articles?q=${encodeURIComponent(searchTerm)}` : '/articles';
        const { data } = await api.get(endpoint);
        if (!isMounted) return;
        const list = Array.isArray(data) ? data : [];
        // Normaliser les champs attendus par la carte
        const normalized = list.map((a) => ({
          id: a.id,
          titre: a.titre || 'Sans titre',
          note: 5, // Note par défaut
          description: a.contenu || 'Pas de description',
          temps: a.created_At ? new Date(a.created_At).toLocaleDateString('fr-FR') : 'Date inconnue',
          image: a.image || '/image/beauty.jpg',
        }));
        setArticles(normalized);
    
      } catch (err) {
        setError(err?.response?.data || err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
        fetchArticles();
    }, 500);

    return () => { 
        isMounted = false; 
        clearTimeout(timeoutId);
    };
  }, [searchTerm]);


  
  // Couleurs de votre thème pour le style
  const primaryColor = 'text-[#6b4226]'; 
  const accentButton = 'bg-[#8b5e3c] hover:bg-[#6b4226]';
  const lightAccent = 'text-[#8b5e3c]';


  return (
    <div className="p-4 max-w-5xl mx-auto bg-[#fdf6ec]">
      
      {/* Barre de recherche et En-tête (Animation d'apparition globale) */}
      <ScrollFadeIn direction='up' delay={0} threshold={0.1}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <span className={`font-bold text-lg ${primaryColor}`}>BLOG</span>
            <button 
                onClick={() => { setSearchTerm(''); }}
                className={`p-2 border-2 cursor-pointer border-[#8b5e3c] hover:bg-[#8b5e3c]/10 rounded-full`}
                title="Réinitialiser la recherche"
            > 
                <svg
                    className="w-5 h-5 text-[#8b5e3c]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M4 6h16M7 12h10M10 18h4" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>
          </div>
          <div className="flex items-center border border-[#d4bfa4] rounded-full px-4 py-2 w-full md:w-1/3 bg-white shadow-sm">
            <input
              type="text"
              placeholder="RECHERCHER UN ARTICLE"
              className={`flex-grow outline-none text-sm bg-transparent ${primaryColor} placeholder:text-stone-400`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn btn-ghost btn-circle">
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${lightAccent}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /> </svg>
            </button>
          </div>
        </div>
      </ScrollFadeIn>

      {/* Liste des produits (Animation de cascade) */}
      <ScrollFadeIn direction='up' delay={0} threshold={0.1}>
        <h2 className={`font-bold text-left text-lg mb-4 ${primaryColor}`}>Plus récents</h2>
      </ScrollFadeIn>

      {error && (
        <p className="text-red-600 text-sm mb-3">Erreur chargement articles: {typeof error === 'object' ? JSON.stringify(error) : error}</p>
      )}
      <div className="space-y-4">
        {articles.length === 0 && !loading ? (
          <p className="text-center py-10 text-gray-500">Aucun article trouvé</p>
        ) : (
          articles.map((produit, index) => (
            <ScrollFadeIn key={produit.id || index} direction='up' delay={100 * (index + 1)} threshold={0.3}>
              <div className="flex flex-col md:flex-row items-start bg-white shadow-lg rounded-xl p-4 transition-transform hover:scale-[1.005] duration-300 border border-stone-100">
                <img
                  src={produit.image}
                  alt={produit.titre || 'Article'}
                  className="w-full h-48 md:w-56 md:h-32 object-cover rounded-lg mb-3 md:mb-0"
                />
                <div className="flex-1 md:ml-4 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center">
                      <h3 className={`font-semibold ${lightAccent} text-xl`}>{produit.titre}</h3>
                      <span className="text-sm text-stone-500">{produit.temps}</span>
                    </div>
                    <div className="text-amber-500 text-2xl text-left mb-1">
                      {"★".repeat(produit.note) + "☆".repeat(5 - produit.note)}
                    </div>
                    <p className="text-sm text-left text-stone-600 leading-relaxed">{produit.description}</p>
                  </div>
                  <div className="mt-4 flex">
                    <button
                      onClick={() => {
                        // Store article data in localStorage for DetailBlogs
                        localStorage.setItem('selectedArticle', JSON.stringify(produit));
                        navigate('/detail-blog');
                      }}
                      className={`${accentButton} cursor-pointer text-white px-5 py-2 rounded-full text-sm font-semibold transition duration-200`}
                    >
                      Lire l'article
                    </button>
                  </div>
                </div>
              </div>
            </ScrollFadeIn>
          ))
        )}
      </div>
      

      {/* Section Astuces (Animation) */}
      <ScrollFadeIn direction='up' delay={200} threshold={0.1}>
        <div className="mt-12 border-t border-[#d4bfa4] pt-8 mb-10">
          <h2 className={`font-bold text-lg mb-4 ${primaryColor}`}>Astuces & Conseils</h2>
          <p className="text-base text-stone-600 leading-relaxed font-light">
            Véritable baume de soin, cette base masque capillaire neutre, certifiée
            BIO, riche en huiles végétales de Jojoba, Ricin et beurre de Karité,
            protège, lisse et nourrit vos cheveux. Sa texture souple et légère
            permet de l’utiliser comme masque cheveux ou comme après-shampoing,
            pour faciliter le démêlage, apporter brillance, souplesse et douceur à
            votre chevelure. Elle sera également idéale comme soin sans rinçage
            pour gainer, nourrir et sublimer vos longueurs et pointes. Utilisée
            pure ou agrémentée de fragrances, actifs et/ou huiles…
          </p>
        </div>
      </ScrollFadeIn>

      {/* Pagination (Animation)
      <ScrollFadeIn direction='up' delay={300} threshold={0.1}>
          <div className="mt-8">
             <Pagination/>
          </div>
      </ScrollFadeIn> */}
    </div>
  );
};

export default BlogPage;