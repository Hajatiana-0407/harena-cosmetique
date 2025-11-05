// src/pages/About.jsx - Design inspiré par 'About 10.8' avec animations de défilement

import React, { useRef, useEffect, useState } from 'react';

// ====================================================================
// COMPOSANT RÉUTILISABLE POUR L'ANIMATION (Intersection Observer)
// ====================================================================
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
            // Le seuil à 0.1 signifie que 10% de l'élément doit être visible pour déclencher
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
            case 'left': return 'translate-x-[-100px]';
            case 'right': return 'translate-x-[100px]';
            case 'up':
            default: return 'translate-y-[50px]';
        }
    };
    
    // Classes de transition et d'état
    const classes = `
        transition-all duration-1000 ease-out 
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
// COMPOSANT PRINCIPAL ABOUT
// ====================================================================
function About() {
  const primaryColor = 'text-[#6b4226]'; 
  const accentColor = 'bg-[#8b5e3c]';
  const lightBg = 'bg-[#fdf6ec]'; 

  return (
    <div className={`relative ${lightBg} px-6 sm:px-12 py-20 overflow-hidden`}>
      
      {/* EFFET DE FOND DÉCORATIF - GRAND NOMBRE ET CERLES (Ne bouge pas au scroll) */}
      <div className="absolute top-10 left-1/2 transform -translate-x-1/2 text-center -z-0 pointer-events-none">
        <h1 className={`text-[12rem] sm:text-[20rem] font-light opacity-5 ${primaryColor}`}>
          HARENA
        </h1>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-[#d4bfa4] blur-3xl opacity-30"></div>
      </div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* EN-TÊTE MINIMALISTE - Apparaît immédiatement */}
        <ScrollFadeIn direction='up' delay={0} threshold={0.05}>
            <div className="mb-20 text-center pt-10">
                <h2 className={`text-5xl font-light mb-4 ${primaryColor} tracking-widest`}>
                    À PROPOS DE NOUS
                </h2>
                <p className="text-xl text-stone-500 font-extralight max-w-lg mx-auto">
                    La beauté authentique, celle qui respecte la nature et votre bien-être.
                </p>
            </div>
        </ScrollFadeIn>


        {/* SECTION 1: Notre Histoire */}
        <ScrollFadeIn direction='up' delay={200}>
            <div className="mb-24 text-center max-w-3xl mx-auto">
                <h3 className={`text-4xl font-light mb-6 ${primaryColor}`}>
                    Un peu d'histoire
                </h3>
                <p className="text-lg text-stone-600 leading-loose font-light">
                    Harèna Cosmétique Beauté est née de la passion pour les soins naturels, inspirée par les **richesses de Madagascar**. Notre mission est de vous offrir des produits certifiés **BIO**, comme notre baume capillaire neutre riche en huiles végétales de Jojoba, Ricin et beurre de Karité. Nous simplifions les rituels de soin avec des produits polyvalents et efficaces.
                </p>
            </div>
        </ScrollFadeIn>


        {/* SECTION 2: Nos Valeurs - Mise en page Aérée avec Image */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
            
            {/* IMAGE / BLOC - Animation de gauche */}
            <ScrollFadeIn direction='left' delay={50} threshold={0.2}>
                <div className="flex justify-center md:order-1">
                    <div 
                        className="w-full h-64 sm:h-80 bg-white rounded-xl shadow-2xl shadow-stone-300/60 overflow-hidden border border-stone-200"
                        style={{
                            backgroundImage: "url('placeholder_image_1.jpg')", 
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    >
                        <div className="flex items-center justify-center h-full text-stone-400 font-light text-sm">
                            <img
                                src='public\image\beauty.jpg'
                                // Ajustement de la taille de l'image
                                className="w-full h-full  object-cover rounded-lg"
                            />
                        </div>
                    </div>
                </div>
            </ScrollFadeIn>
            
            {/* TEXTE - Animation de droite */}
            <ScrollFadeIn direction='right' delay={200} threshold={0.2}>
                <div className="text-left md:order-2">
                    <p className={`text-lg font-bold mb-2 ${primaryColor}`}>
                        Engagement
                    </p>
                    <h3 className={`text-4xl font-light mb-6 ${primaryColor}`}>
                        Le secret du partage et de l'authenticité
                    </h3>
                    <p className="text-stone-600 leading-relaxed font-light">
                        Nous nous engageons pour une beauté **éthique et durable**. Chaque ingrédient est sélectionné avec soin pour ses propriétés bienfaisantes, garantissant une efficacité maximale sans compromis sur la naturalité. Nous privilégions les ingrédients issus du commerce équitable.
                    </p>
                    <button className={`mt-6 px-6 py-2 border border-[#d4bfa4] text-sm font-medium ${primaryColor} hover:${accentColor} hover:text-stone-900 transition duration-200 rounded-full`}>
                        <a href="/contact">En savoir plus</a>
                    </button>
                </div>
            </ScrollFadeIn>
        </div>

        {/* SECTION 3: Nos Piliers - Animation en cascade */}
        <ScrollFadeIn direction='up' delay={100} threshold={0.1}>
            <div className="text-center max-w-3xl mx-auto mb-20">
                <h3 className={`text-4xl font-light mb-12 ${primaryColor}`}>
                    Nos Piliers
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                    {['NATURALITÉ', 'ÉTHIQUE', 'QUALITÉ'].map((title, index) => (
                        // Chaque carte a un délai d'apparition croissant (cascade)
                        <ScrollFadeIn key={index} direction='up' delay={200 * index} threshold={0.5}>
                            <div 
                                className="p-8 bg-white rounded-xl shadow-lg shadow-stone-200 border border-stone-200 transition-transform duration-300 hover:shadow-xl hover:scale-[1.02]"
                            >
                                <div className={`mx-auto w-16 h-16 rounded-full ${accentColor} flex items-center justify-center mb-4 opacity-80`}>
                                    <span className="text-white text-xl">★</span>
                                </div>
                                <p className={`text-lg font-medium ${primaryColor}`}>{title}</p>
                                <p className="text-xs text-stone-500 mt-2">
                                    {title === 'NATURALITÉ' ? "Formules riches et certifiées BIO." : 
                                    title === 'ÉTHIQUE' ? "Soutien aux communautés locales." : 
                                    "Efficacité garantie et traçabilité."}
                                </p>
                            </div>
                        </ScrollFadeIn>
                    ))}
                </div>
            </div>
        </ScrollFadeIn>
        
        {/* CTA FINAL (Bas de page aéré) */}
        <ScrollFadeIn direction='up' delay={100}>
            <div className="text-center pt-10 border-t border-stone-300/50">
                <p className="text-base text-stone-500 font-light">
                    Le soin, c'est le partage.
                </p>
            </div>
        </ScrollFadeIn>
        
      </div>
    </div>
  );
}

export default About;