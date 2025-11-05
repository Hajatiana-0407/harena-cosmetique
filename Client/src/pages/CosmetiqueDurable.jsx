import React from 'react';

function CosmetiqueDurable() {
  const primaryColor = 'text-[#6b4226]';
  const accentColor = 'bg-[#8b5e3c]';
  const lightBg = 'bg-[#fdf6ec]';

  return (
    <div className={`relative ${lightBg} px-6 sm:px-12 py-20 overflow-hidden`}>
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h1 className={`text-5xl font-light mb-4 ${primaryColor} tracking-widest`}>
            UNE COSMÉTIQUE 100% DURABLE
          </h1>
          <p className="text-xl text-stone-500 font-extralight max-w-lg mx-auto">
            Notre engagement pour une beauté respectueuse de la planète
          </p>
        </div>

        <div className="space-y-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className={`text-3xl font-light mb-6 ${primaryColor}`}>
              Notre vision de la durabilité
            </h2>
            <p className="text-stone-600 leading-relaxed mb-6">
              Chez Harèna, nous croyons que la beauté ne doit pas se faire au détriment de notre planète.
              Notre approche 100% durable s'articule autour de trois piliers fondamentaux qui guident chacune
              de nos décisions.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className={`mx-auto w-16 h-16 rounded-full ${accentColor} flex items-center justify-center mb-4`}>
                  <span className="text-white text-2xl">🌱</span>
                </div>
                <h3 className={`text-lg font-medium mb-2 ${primaryColor}`}>Ingrédients naturels</h3>
                <p className="text-sm text-stone-600">100% d'origine végétale, BIO et traçables</p>
              </div>
              <div className="text-center">
                <div className={`mx-auto w-16 h-16 rounded-full ${accentColor} flex items-center justify-center mb-4`}>
                  <span className="text-white text-2xl">♻️</span>
                </div>
                <h3 className={`text-lg font-medium mb-2 ${primaryColor}`}>Emballages recyclables</h3>
                <p className="text-sm text-stone-600">Matériaux éco-responsables et consignes</p>
              </div>
              <div className="text-center">
                <div className={`mx-auto w-16 h-16 rounded-full ${accentColor} flex items-center justify-center mb-4`}>
                  <span className="text-white text-2xl">🤝</span>
                </div>
                <h3 className={`text-lg font-medium mb-2 ${primaryColor}`}>Production locale</h3>
                <p className="text-sm text-stone-600">Fabrication française, circuit court</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className={`text-3xl font-light mb-6 ${primaryColor}`}>
              Nos engagements concrets
            </h2>
            <div className="space-y-6">
              <div className="border-l-4 border-[#8b5e3c] pl-6">
                <h3 className={`text-xl font-medium mb-2 ${primaryColor}`}>Zéro déchet plastique</h3>
                <p className="text-stone-600">
                  Tous nos contenants sont en verre recyclable ou aluminium. Nous avons éliminé
                  tout plastique à usage unique de notre chaîne de production.
                </p>
              </div>
              <div className="border-l-4 border-[#8b5e3c] pl-6">
                <h3 className={`text-xl font-medium mb-2 ${primaryColor}`}>Énergie renouvelable</h3>
                <p className="text-stone-600">
                  Notre laboratoire fonctionne exclusivement à l'énergie solaire. Nous compensons
                  100% de nos émissions de CO2 restantes.
                </p>
              </div>
              <div className="border-l-4 border-[#8b5e3c] pl-6">
                <h3 className={`text-xl font-medium mb-2 ${primaryColor}`}>Consigne solidaire</h3>
                <p className="text-stone-600">
                  Pour chaque pot de crème acheté, nous reversons 0,50€ à des associations
                  environnementales locales.
                </p>
              </div>
              <div className="border-l-4 border-[#8b5e3c] pl-6">
                <h3 className={`text-xl font-medium mb-2 ${primaryColor}`}>Transparence totale</h3>
                <p className="text-stone-600">
                  Nous publions annuellement notre bilan environnemental et social,
                  audité par un organisme indépendant.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className={`text-3xl font-light mb-6 ${primaryColor}`}>
              Impact mesuré, résultats prouvés
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className={`text-xl font-medium mb-4 ${primaryColor}`}>Réduction CO2</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-stone-600">2022</span>
                    <span className="font-medium text-stone-800">-35%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-600">2023</span>
                    <span className="font-medium text-stone-800">-52%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-600">Objectif 2024</span>
                    <span className="font-medium text-stone-800">-70%</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className={`text-xl font-medium mb-4 ${primaryColor}`}>Emballages recyclés</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-stone-600">Verre</span>
                    <span className="font-medium text-stone-800">95%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-600">Aluminium</span>
                    <span className="font-medium text-stone-800">100%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-600">Carton recyclé</span>
                    <span className="font-medium text-stone-800">100%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className={`text-3xl font-light mb-6 ${primaryColor}`}>
              Rejoignez notre mouvement
            </h2>
            <p className="text-stone-600 mb-6">
              Ensemble, créons une industrie cosmétique qui respecte notre planète.
              Chaque achat chez Harèna contribue à un avenir plus durable.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className={`px-8 py-3 ${accentColor} text-white rounded-full font-medium hover:opacity-90 transition duration-200`}>
                Découvrir nos produits
              </button>
              <button className={`px-8 py-3 border border-[#d4bfa4] ${primaryColor} rounded-full font-medium hover:${accentColor} hover:text-white transition duration-200`}>
                Notre bilan environnemental
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CosmetiqueDurable;
