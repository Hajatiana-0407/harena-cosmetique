import React, { useState, useEffect } from 'react';
import { FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import RequestApi from '../API/RequestApi';

const Temoin = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const api = RequestApi();
        const data = await api.fetchTemoignages();
        // Shuffle the testimonials randomly
        const shuffled = data.sort(() => Math.random() - 0.5);
        setTestimonials(shuffled);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  useEffect(() => {
    if (testimonials.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      }, 6000); // Auto-slide every 6 seconds
      return () => clearInterval(interval);
    }
  }, [testimonials]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  if (loading) {
    return <div className="text-center py-20 bg-gray-50">Chargement des témoignages...</div>;
  }

  if (testimonials.length === 0) {
    return <div className="text-center py-20 bg-gray-50">Aucun témoignage disponible.</div>;
  }

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-br from-gray-50 to-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête de la section */}
        <div className="text-center mb-16">
          <h2 className="text-base text-stone-600 font-semibold tracking-wide uppercase">
            Ce que disent nos clients
          </h2>
          <p className="mt-2 text-4xl font-extrabold tracking-tight text-stone-900 sm:text-5xl">
            La confiance, ça se bâtit
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 p-8 md:p-12 text-center">
                  <div className="flex flex-col items-center">
                    {/* Icône de citation */}
                    <FaQuoteLeft className="text-stone-500 text-4xl mb-6" />

                    {/* Image de l'auteur */}
                    <img
                      src={testimonial.image || "image/beauty.jpg"}
                      alt={testimonial.titre}
                      className="w-20 h-20 rounded-full object-cover mb-6 border-4 border-stone-200 shadow-lg"
                    />

                    {/* Texte du témoignage */}
                    <blockquote className="text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9 mb-6">
                      <p>"{testimonial.contenu}"</p>
                    </blockquote>

                    {/* Informations de l'auteur */}
                    <figcaption className="mt-4">
                      <div className="text-lg font-bold text-gray-900">{testimonial.titre}</div>
                      <div className="text-sm text-stone-600">Client satisfait</div>
                    </figcaption>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-colors duration-200"
          >
            <FaChevronLeft className="text-stone-600 text-xl" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-colors duration-200"
          >
            <FaChevronRight className="text-stone-600 text-xl" />
          </button>

        </div>
      </div>
    </section>
  );
};

export default Temoin;
