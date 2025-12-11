// src/pages/About.jsx - Modern Professional Design with Optimized Animations

import React from 'react';

// ====================================================================
// OPTIMIZED SCROLL FADE COMPONENT (Reduced Observers for Performance)
// ====================================================================
const ScrollFadeIn = ({ children, className = '' }) => {
  return (
    <div className={`animate-fade-in-up ${className}`}>
      {children}
    </div>
  );
};

// ====================================================================
// COMPOSANT PRINCIPAL ABOUT - DESIGN MODERNE PROFESSIONNEL
// ====================================================================
function About() {
  const primaryColor = 'text-[#6b4226]';
  const accentColor = 'bg-[#8b5e3c]';
  const lightBg = 'bg-[#fdf6ec]';

  return (
    <div className={`relative ${lightBg} px-6 sm:px-12 py-20 overflow-hidden`}>
      {/* BACKGROUND DECORATION */}
      <div className="absolute top-10 left-1/2 transform -translate-x-1/2 text-center -z-0 pointer-events-none">
        <h1 className={`text-[12rem] sm:text-[20rem] font-light opacity-5 ${primaryColor}`}>
          HARENA
        </h1>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-[#d4bfa4] blur-3xl opacity-30"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">

        {/* HERO SECTION */}
        <ScrollFadeIn className="mb-20 text-center pt-10">
          <h2 className={`text-6xl font-light mb-6 ${primaryColor} tracking-widest`}>
            À PROPOS DE NOUS
          </h2>
          <p className="text-xl text-stone-500 font-light max-w-2xl mx-auto leading-relaxed">
            La beauté authentique, celle qui respecte la nature et votre bien-être. Découvrez notre histoire et nos engagements.
          </p>
        </ScrollFadeIn>

        {/* HISTORY TIMELINE */}
        <ScrollFadeIn className="mb-24">
          <div className="text-center max-w-4xl mx-auto">
            <h3 className={`text-4xl font-light mb-12 ${primaryColor}`}>
              Notre Histoire
            </h3>
            <div className="space-y-12">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/3 text-center md:text-right pr-8">
                  <h4 className={`text-2xl font-medium ${primaryColor} mb-2`}>Naissance de Harèna</h4>
                  <p className="text-stone-600">Inspirée par les richesses de Madagascar, notre aventure commence avec une passion pour les soins naturels.</p>
                </div>
                <div className={`w-4 h-4 rounded-full ${accentColor} mx-auto md:mx-0`}></div>
                <div className="md:w-1/3 pl-8"></div>
              </div>
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/3 pr-8"></div>
                <div className={`w-4 h-4 rounded-full ${accentColor} mx-auto md:mx-0`}></div>
                <div className="md:w-1/3 text-center md:text-left pl-8">
                  <h4 className={`text-2xl font-medium ${primaryColor} mb-2`}>Engagement BIO</h4>
                  <p className="text-stone-600">Nous proposons des produits certifiés BIO, riches en huiles végétales de Jojoba, Ricin et beurre de Karité.</p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/3 text-center md:text-right pr-8">
                  <h4 className={`text-2xl font-medium ${primaryColor} mb-2`}>Vision Durable</h4>
                  <p className="text-stone-600">Promouvoir une beauté éthique et durable, respectueuse de l'environnement et des communautés locales.</p>
                </div>
                <div className={`w-4 h-4 rounded-full ${accentColor} mx-auto md:mx-0`}></div>
                <div className="md:w-1/3 pl-8"></div>
              </div>
            </div>
          </div>
        </ScrollFadeIn>

        {/* MISSION & VISION GRID */}
        <div className="grid md:grid-cols-2 gap-16 mb-24">
          <ScrollFadeIn className="p-8 bg-white rounded-xl shadow-lg border border-stone-200">
            <h3 className={`text-3xl font-light mb-6 ${primaryColor}`}>Notre Mission</h3>
            <p className="text-stone-600 leading-relaxed">
              Promouvoir une beauté authentique et durable en offrant des produits cosmétiques naturels et biologiques, respectueux de l'environnement et des communautés locales de Madagascar.
            </p>
          </ScrollFadeIn>
          <ScrollFadeIn className="p-8 bg-white rounded-xl shadow-lg border border-stone-200">
            <h3 className={`text-3xl font-light mb-6 ${primaryColor}`}>Notre Vision</h3>
            <p className="text-stone-600 leading-relaxed">
              Devenir une référence mondiale dans les soins de beauté éthiques, inspirant un changement positif vers une consommation responsable et valorisant les ingrédients naturels issus du commerce équitable.
            </p>
          </ScrollFadeIn>
        </div>

        {/* VALUES WITH IMAGE */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
          <ScrollFadeIn>
            <div className="w-full h-80 bg-white rounded-xl shadow-2xl overflow-hidden border border-stone-200">
              <img
                src='/image/beauty.jpg'
                alt="Beauté naturelle"
                className="w-full h-full object-cover"
              />
            </div>
          </ScrollFadeIn>
          <ScrollFadeIn>
            <div>
              <h3 className={`text-4xl font-light mb-6 ${primaryColor}`}>Nos Valeurs</h3>
              <ul className="space-y-4 text-stone-600">
                <li><strong className={primaryColor}>Naturalité:</strong> Formules riches et certifiées BIO.</li>
                <li><strong className={primaryColor}>Éthique:</strong> Soutien aux communautés locales et commerce équitable.</li>
                <li><strong className={primaryColor}>Qualité:</strong> Efficacité garantie et traçabilité complète.</li>
              </ul>
              <button className={`mt-8 px-8 py-3 border border-[#d4bfa4] text-sm font-medium ${primaryColor} hover:${accentColor} hover:text-stone-900 transition duration-300 rounded-full`}>
                <a href="/contact">En savoir plus</a>
              </button>
            </div>
          </ScrollFadeIn>
        </div>

        {/* CTA */}
        <ScrollFadeIn className="text-center pt-10 border-t border-stone-300/50">
          <p className="text-lg text-stone-500 font-light">
            Le soin, c'est le partage. Rejoignez-nous dans cette aventure.
          </p>
        </ScrollFadeIn>

      </div>
    </div>
  );
}

export default About;
