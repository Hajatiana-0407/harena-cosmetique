import React, { useState, useEffect } from 'react';

const phrases = [
  {
    title: "Éclat Naturel",
    description: "Découvrez nos soins cosmétiques naturels qui subliment votre beauté intérieure et extérieure."
  },
  {
    title: "Beauté Authentique",
    description: "Des produits de qualité supérieure pour une peau radieuse et un bien-être durable."
  },
  {
    title: "Soins d'Exception",
    description: "Notre expertise en esthétique vous offre des solutions personnalisées pour votre beauté."
  },
  {
    title: "Élégance Naturelle",
    description: "Alliez nature et sophistication avec notre gamme de produits cosmétiques premium."
  },
  {
    title: "Bien-être Esthétique",
    description: "Prenez soin de vous avec nos traitements et soins qui respectent votre peau."
  }
];

export default function Banner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % phrases.length);
        setIsVisible(true);
      }, 500);
    }, 5000); // Change phrase every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const currentPhrase = phrases[currentIndex];

  return (
    <section className="relative isolate overflow-hidden bg-stone-900 py-24 sm:py-32">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,var(--color-indigo-500),transparent)] opacity-10 animate-pulse" />
      <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-45deg] bg-stone-900 shadow-xl ring-1 shadow-indigo-500/5 ring-white/5 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />

      {/* Floating elements for visual interest */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-stone-400 rounded-full opacity-60 animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}></div>
      <div className="absolute top-32 right-20 w-3 h-3 bg-stone-500 rounded-full opacity-40 animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }}></div>
      <div className="absolute bottom-20 left-20 w-2 h-2 bg-stone-300 rounded-full opacity-50 animate-bounce" style={{ animationDelay: '2s', animationDuration: '5s' }}></div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
            <div className="flex-1 animate-fade-in-up">
              <img
                src="image/beauty.jpg"
                className="w-full max-w-md h-auto object-cover rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-500"
                alt="Beauté et cosmétiques"
              />
            </div>
            <div className="flex-1 text-center lg:text-left animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <div className="min-h-[200px] flex flex-col justify-center">
                <h2 className={`text-4xl font-bold tracking-tight text-white sm:text-6xl transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}>
                  {currentPhrase.title}
                </h2>
                <hr className={`bg-stone-600 border-0 h-1 w-24 my-6 mx-auto lg:mx-0 transition-all duration-700 ${
                  isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
                }`} />
                <p className={`mt-6 text-lg leading-8 text-stone-300 transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`} style={{ transitionDelay: '0.2s' }}>
                  {currentPhrase.description}
                </p>
                <div className={`mt-10 transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`} style={{ transitionDelay: '0.4s' }}>
                  <a
                    href="/produit"
                    className="inline-block rounded-md bg-stone-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-stone-500 hover:scale-105 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-600 transition-all duration-300 animate-pulse-glow"
                  >
                    Découvrir nos produits
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 5px rgba(120, 113, 108, 0.5);
          }
          50% {
            box-shadow: 0 0 20px rgba(120, 113, 108, 0.8);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
        }

        .animate-pulse-glow {
          animation: pulse-glow 2s infinite;
        }
      `}</style>
    </section>
  );
}
