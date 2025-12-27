import React, { useState, useEffect, useCallback } from 'react';
import { Quote, ChevronLeft, ChevronRight, MessageSquare } from 'lucide-react';
import RequestApi from '../API/RequestApi';
import { apiIMG } from '../API/pathPicture';

// --- UTILITAIRE DE NETTOYAGE ---
const stripHtml = (html) => {
  if (!html) return "";
  return html.replace(/<[^>]*>?/gm, '').replace(/&nbsp;/g, ' ').trim();
};

const Temoin = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch et Shuffle
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const api = RequestApi();
        const data = await api.fetchTemoignages();
        // On mélange et on nettoie les données dès la réception
        const cleanedData = data.map(item => ({
          ...item,
          contenu: stripHtml(item.contenu),
          titre: stripHtml(item.titre)
        }));
        const shuffled = cleanedData.sort(() => Math.random() - 0.5);
        setTestimonials(shuffled);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  const nextSlide = useCallback(() => {
    if (testimonials.length === 0) return;
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  }, [testimonials.length]);

  const prevSlide = () => {
    if (testimonials.length === 0) return;
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-slide logic
  useEffect(() => {
    if (testimonials.length > 1) {
      const interval = setInterval(nextSlide, 8000);
      return () => clearInterval(interval);
    }
  }, [testimonials, nextSlide]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 bg-stone-50">
        <div className="w-10 h-10 border-4 border-stone-200 border-t-amber-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (testimonials.length === 0) return null;

  return (
    <section className="relative py-20 sm:py-32 bg-white overflow-hidden">
      {/* Fond décoratif */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-50/40 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-stone-100/50 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Titre de section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 text-amber-700 text-[10px] font-black uppercase tracking-[0.2em] mb-6">
            <MessageSquare className="w-3.5 h-3.5" />
            Paroles de clients
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-stone-900 leading-[1.1]">
            La confiance, <br className="hidden md:block" /> 
            <span className="text-amber-600 font-serif italic font-medium">ça se bâtit ensemble</span>
          </h2>
        </div>

        {/* Carousel principal */}
        <div className="relative max-w-4xl mx-auto">
          <div className="relative z-10 bg-white rounded-[3rem] border border-stone-100 shadow-[0_32px_80px_-20px_rgba(0,0,0,0.08)] overflow-hidden">
            
            <div 
              className="flex transition-transform duration-[1200ms] ease-[cubic-bezier(0.23,1,0.32,1)]" 
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, idx) => (
                <div key={testimonial.id || idx} className="w-full flex-shrink-0 p-10 md:p-24 text-center">
                  <div className="flex flex-col items-center relative">
                    
                    {/* Icône de citation en arrière-plan */}
                    <Quote className="text-amber-50 w-32 h-32 absolute -top-10 -left-10 opacity-60 pointer-events-none" />

                    <blockquote className="relative z-10">
                      <p className="text-xl md:text-2xl font-medium leading-relaxed text-stone-800 italic">
                        “{testimonial.contenu}”
                      </p>
                    </blockquote>

                    {/* Séparateur */}
                    <div className="w-16 h-px bg-stone-200 my-10" />

                    {/* Auteur */}
                    <div className="flex flex-col items-center">
                      <div className="relative mb-6">
                        <img
                          src={testimonial.image ? `${apiIMG}${testimonial.image}` : "https://via.placeholder.com/100"}
                          alt={testimonial.titre}
                          className="w-20 h-20 rounded-2xl object-cover shadow-xl border-2 border-white transform hover:scale-105 transition-transform duration-500"
                          onError={(e) => { e.target.src = "https://via.placeholder.com/100"; }}
                        />
                        <div className="absolute -bottom-2 -right-2 bg-amber-600 rounded-lg p-1.5 shadow-lg">
                          <Quote className="w-3 h-3 text-white fill-current" />
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <h4 className="text-xl font-bold text-stone-900 tracking-tight">
                          {testimonial.titre}
                        </h4>
                        <p className="text-amber-600 text-[10px] font-bold uppercase tracking-[0.2em]">
                          Client Partenaire
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Latérale */}
          <div className="absolute inset-y-0 -left-4 md:-left-12 flex items-center z-20">
            <button
              onClick={prevSlide}
              className="p-4 md:p-5 rounded-full bg-white shadow-xl border border-stone-50 text-stone-400 hover:text-amber-600 transition-all hover:-translate-x-1 active:scale-90"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          </div>

          <div className="absolute inset-y-0 -right-4 md:-right-12 flex items-center z-20">
            <button
              onClick={nextSlide}
              className="p-4 md:p-5 rounded-full bg-white shadow-xl border border-stone-50 text-stone-400 hover:text-amber-600 transition-all hover:translate-x-1 active:scale-90"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Temoin;