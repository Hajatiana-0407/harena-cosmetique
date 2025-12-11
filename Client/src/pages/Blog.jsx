import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Filter } from "lucide-react";
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
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [authors, setAuthors] = useState([]);
  const [filterTitre, setFilterTitre] = useState('');
  const [filterDateFrom, setFilterDateFrom] = useState('');
  const [filterDateTo, setFilterDateTo] = useState('');
  const [filterStars, setFilterStars] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchArticles = async () => {
      try {
        setLoading(true);
        let endpoint = 'api/articles';
        const params = new URLSearchParams();
        if (searchTerm) params.append('q', searchTerm);
        
        if (selectedAuthor) params.append('auteur', selectedAuthor);
        if (filterTitre) params.append('titre', filterTitre);
        if (filterDateFrom) params.append('date_from', filterDateFrom);
        if (filterDateTo) params.append('date_to', filterDateTo);
        if (filterStars) params.append('stars', filterStars);
        if (params.toString()) endpoint += '?' + params.toString();

        const { data } = await api.get(endpoint);
        if (!isMounted) return;
        const list = Array.isArray(data) ? data : [];
        // Normaliser les champs attendus par la carte
        const normalized = list.map((a) => ({
          id: a.id,
          titre: a.titre || 'Sans titre',
          auteur: a.auteur || 'Auteur inconnu',
          note: 5, // Note par défaut
          description: a.contenu || 'Pas de description',
          temps: a.created_At ? new Date(a.created_At).toLocaleDateString('fr-FR') : 'Date inconnue',
          image: a.image || '/image/beauty.jpg',
        }));
        setArticles(normalized);

        // Extract unique authors
        const uniqueAuthors = [...new Set(list.map(a => a.auteur).filter(Boolean))];
        setAuthors(uniqueAuthors);

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
  }, [searchTerm, selectedAuthor]);

  
  // Couleurs de votre thème pour le style
  const primaryColor = 'text-[#6b4226]'; 
  const accentButton = 'bg-[#8b5e3c] hover:bg-[#6b4226]';
  const lightAccent = 'text-[#8b5e3c]';


  return (
    <div className="p-4 max-w-5xl mx-auto bg-[#fdf6ec]">
      
      {/* Barre de recherche et En-tête (Animation d'apparition globale) */}
      <ScrollFadeIn direction='up' delay={0} threshold={0.1}>
        <div className="flex flex-col gap-6 mb-8">
          {/* Header avec titre et bouton toggle filtres */}
          <div className="flex items-center justify-between">
            <span className={`font-bold text-2xl ${primaryColor}`}>BLOG</span>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full ${accentButton} text-white font-medium transition-all duration-300 hover:shadow-lg`}
            >
              <Filter className="w-4 h-4" />
              {showFilters ? 'Masquer les filtres' : 'Afficher les filtres'}
            </button>
          </div>

          {/* Barre de recherche principale */}
          <div className="flex items-center border border-[#d4bfa4] rounded-full px-6 py-3 w-full bg-white shadow-lg">
            <input
              type="text"
              placeholder="RECHERCHER UN ARTICLE..."
              className={`flex-grow outline-none text-base bg-transparent ${primaryColor} placeholder:text-stone-400`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn btn-ghost btn-circle">
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${lightAccent}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>

          {/* Panel des filtres avancés (collapsible) */}
          <div className={`transition-all duration-500 ease-in-out overflow-hidden ${showFilters ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="bg-white rounded-2xl shadow-xl border border-stone-100 p-6">
              <h3 className={`font-semibold text-lg mb-4 ${primaryColor}`}>Filtres avancés</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {/* Filtre Auteur */}
                <div className="space-y-2">
                  <label className={`text-sm font-medium ${primaryColor}`}>Auteur</label>
                  <select
                    value={selectedAuthor}
                    onChange={(e) => setSelectedAuthor(e.target.value)}
                    className={`w-full p-3 border border-[#d4bfa4] rounded-xl bg-stone-50 shadow-sm text-sm ${primaryColor} outline-none focus:ring-2 focus:ring-[#8b5e3c]/20 focus:border-[#8b5e3c] transition-all`}
                  >
                    <option value="">Tous les auteurs</option>
                    {authors.map((author) => (
                      <option key={author} value={author}>{author}</option>
                    ))}
                  </select>
                </div>

                {/* Filtre Titre */}
                <div className="space-y-2">
                  <label className={`text-sm font-medium ${primaryColor}`}>Titre</label>
                  <input
                    type="text"
                    placeholder="Rechercher par titre..."
                    className={`w-full p-3 border border-[#d4bfa4] rounded-xl bg-stone-50 shadow-sm text-sm ${primaryColor} outline-none focus:ring-2 focus:ring-[#8b5e3c]/20 focus:border-[#8b5e3c] transition-all`}
                    value={filterTitre}
                    onChange={(e) => setFilterTitre(e.target.value)}
                  />
                </div>

                {/* Filtre Date de début */}
                <div className="space-y-2">
                  <label className={`text-sm font-medium ${primaryColor}`}>Date de début</label>
                  <input
                    type="date"
                    className={`w-full p-3 border border-[#d4bfa4] rounded-xl bg-stone-50 shadow-sm text-sm ${primaryColor} outline-none focus:ring-2 focus:ring-[#8b5e3c]/20 focus:border-[#8b5e3c] transition-all`}
                    value={filterDateFrom}
                    onChange={(e) => setFilterDateFrom(e.target.value)}
                  />
                </div>

                {/* Filtre Date de fin */}
                <div className="space-y-2">
                  <label className={`text-sm font-medium ${primaryColor}`}>Date de fin</label>
                  <input
                    type="date"
                    className={`w-full p-3 border border-[#d4bfa4] rounded-xl bg-stone-50 shadow-sm text-sm ${primaryColor} outline-none focus:ring-2 focus:ring-[#8b5e3c]/20 focus:border-[#8b5e3c] transition-all`}
                    value={filterDateTo}
                    onChange={(e) => setFilterDateTo(e.target.value)}
                  />
                </div>

                {/* Filtre Étoiles */}
                <div className="space-y-2">
                  <label className={`text-sm font-medium ${primaryColor}`}>Évaluation</label>
                  <select
                    value={filterStars}
                    onChange={(e) => setFilterStars(e.target.value)}
                    className={`w-full p-3 border border-[#d4bfa4] rounded-xl bg-stone-50 shadow-sm text-sm ${primaryColor} outline-none focus:ring-2 focus:ring-[#8b5e3c]/20 focus:border-[#8b5e3c] transition-all`}
                  >
                    <option value="">Toutes les étoiles</option>
                    <option value="5">⭐⭐⭐⭐⭐ 5 étoiles</option>
                    <option value="4">⭐⭐⭐⭐ 4 étoiles</option>
                    <option value="3">⭐⭐⭐ 3 étoiles</option>
                    <option value="2">⭐⭐ 2 étoiles</option>
                    <option value="1">⭐ 1 étoile</option>
                  </select>
                </div>
              </div>

              {/* Bouton de réinitialisation */}
              <div className="flex justify-end mt-6">
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedAuthor('');
                    setFilterTitre('');
                    setFilterDateFrom('');
                    setFilterDateTo('');
                    setFilterStars('');
                  }}
                  className={`flex items-center gap-2 px-6 py-2 rounded-full border-2 border-[#8b5e3c] text-[#8b5e3c] hover:bg-[#8b5e3c] hover:text-white transition-all duration-300 font-medium`}
                >
                  <Filter className="w-4 h-4" />
                  Réinitialiser les filtres
                </button>
              </div>
            </div>
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
