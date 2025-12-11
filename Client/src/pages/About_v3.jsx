// src/pages/About_v3.jsx - Parallax Scroll Design

import React from 'react';

function About_v3() {
  const primaryColor = 'text-[#6b4226]';
  const accentColor = 'bg-[#8b5e3c]';
  const lightBg = 'bg-[#fdf6ec]';

  return (
    <div className={`${lightBg} overflow-hidden`}>
      {/* HERO PARALLAX */}
      <div className="relative h-screen flex items-center justify-center bg-fixed bg-cover bg-center" style={{backgroundImage: 'url(/image/beauty.jpg)'}}>
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative text-center text-white z-10">
          <h1 className="text-6xl font-light mb-4">À Propos de Harèna</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Beauté authentique inspirée par la nature de Madagascar.
          </p>
        </div>
      </div>

      {/* CONTENT SECTIONS */}
      <div className="max-w-4xl mx-auto px-6 py-20">

        {/* HISTORY */}
        <section className="mb-20">
          <h2 className={`text-4xl font-light mb-8 text-center ${primaryColor}`}>Notre Histoire</h2>
          <div className="space-y-8">
            <div className="flex items-center">
              <div className={`w-4 h-4 rounded-full ${accentColor} mr-6`}></div>
              <div>
                <h3 className={`text-2xl font-medium ${primaryColor} mb-2`}>Naissance</h3>
                <p className="text-stone-600">Passion pour les soins naturels de Madagascar.</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className={`w-4 h-4 rounded-full ${accentColor} mr-6`}></div>
              <div>
                <h3 className={`text-2xl font-medium ${primaryColor} mb-2`}>Engagement BIO</h3>
                <p className="text-stone-600">Produits certifiés avec huiles végétales pures.</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className={`w-4 h-4 rounded-full ${accentColor} mr-6`}></div>
              <div>
                <h3 className={`text-2xl font-medium ${primaryColor} mb-2`}>Vision Durable</h3>
                <p className="text-stone-600">Beauté éthique et respectueuse.</p>
              </div>
            </div>
          </div>
        </section>

        {/* MISSION VISION */}
        <section className="grid md:grid-cols-2 gap-12 mb-20">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className={`text-3xl font-light mb-4 ${primaryColor}`}>Mission</h3>
            <p className="text-stone-600">
              Offrir des cosmétiques naturels et biologiques respectueux de l'environnement.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className={`text-3xl font-light mb-4 ${primaryColor}`}>Vision</h3>
            <p className="text-stone-600">
              Référence mondiale en soins éthiques et durables.
            </p>
          </div>
        </section>

        {/* VALUES */}
        <section className="text-center">
          <h2 className={`text-4xl font-light mb-12 ${primaryColor}`}>Nos Valeurs</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className={`w-20 h-20 rounded-full ${accentColor} flex items-center justify-center mx-auto mb-4`}>
                <span className="text-white text-3xl">🌱</span>
              </div>
              <h4 className={`text-xl font-medium ${primaryColor}`}>Naturalité</h4>
            </div>
            <div>
              <div className={`w-20 h-20 rounded-full ${accentColor} flex items-center justify-center mx-auto mb-4`}>
                <span className="text-white text-3xl">♻️</span>
              </div>
              <h4 className={`text-xl font-medium ${primaryColor}`}>Éthique</h4>
            </div>
            <div>
              <div className={`w-20 h-20 rounded-full ${accentColor} flex items-center justify-center mx-auto mb-4`}>
                <span className="text-white text-3xl">✨</span>
              </div>
              <h4 className={`text-xl font-medium ${primaryColor}`}>Qualité</h4>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

export default About_v3;
