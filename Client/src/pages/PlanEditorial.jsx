import React from 'react';

function PlanEditorial() {
  const primaryColor = 'text-[#6b4226]';
  const accentColor = 'bg-[#8b5e3c]';
  const lightBg = 'bg-[#fdf6ec]';

  return (
    <div className={`relative ${lightBg} px-6 sm:px-12 py-20 overflow-hidden`}>
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h1 className={`text-5xl font-light mb-4 ${primaryColor} tracking-widest`}>
            PLAN ÉDITORIAL
          </h1>
          <p className="text-xl text-stone-500 font-extralight max-w-lg mx-auto">
            Notre vision éditoriale pour une beauté authentique
          </p>
        </div>

        <div className="space-y-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className={`text-3xl font-light mb-6 ${primaryColor}`}>
              Notre mission éditoriale
            </h2>
            <p className="text-stone-600 leading-relaxed mb-4">
              Chez Harèna, nous croyons que la beauté véritable vient de l'intérieur et respecte la nature.
              Notre ligne éditoriale s'articule autour de trois piliers fondamentaux qui guident chacune de nos publications.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className={`mx-auto w-16 h-16 rounded-full ${accentColor} flex items-center justify-center mb-4`}>
                  <span className="text-white text-2xl">🌿</span>
                </div>
                <h3 className={`text-lg font-medium mb-2 ${primaryColor}`}>Naturalité</h3>
                <p className="text-sm text-stone-600">Célébrer les ingrédients naturels et leur pouvoir bienfaisant</p>
              </div>
              <div className="text-center">
                <div className={`mx-auto w-16 h-16 rounded-full ${accentColor} flex items-center justify-center mb-4`}>
                  <span className="text-white text-2xl">🤝</span>
                </div>
                <h3 className={`text-lg font-medium mb-2 ${primaryColor}`}>Partage</h3>
                <p className="text-sm text-stone-600">Transmettre connaissances et expériences beauté</p>
              </div>
              <div className="text-center">
                <div className={`mx-auto w-16 h-16 rounded-full ${accentColor} flex items-center justify-center mb-4`}>
                  <span className="text-white text-2xl">🌍</span>
                </div>
                <h3 className={`text-lg font-medium mb-2 ${primaryColor}`}>Durabilité</h3>
                <p className="text-sm text-stone-600">Promouvoir une beauté respectueuse de l'environnement</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className={`text-3xl font-light mb-6 ${primaryColor}`}>
              Thématiques abordées
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className={`text-xl font-medium mb-4 ${primaryColor}`}>Beauté & Nature</h3>
                <ul className="space-y-2 text-stone-600">
                  <li>• Propriétés des ingrédients naturels</li>
                  <li>• Recettes de soins maison</li>
                  <li>• Bienfaits des huiles essentielles</li>
                  <li>• Cosmétique BIO et clean</li>
                </ul>
              </div>
              <div>
                <h3 className={`text-xl font-medium mb-4 ${primaryColor}`}>Bien-être & Lifestyle</h3>
                <ul className="space-y-2 text-stone-600">
                  <li>• Routines de soin personnalisées</li>
                  <li>• Méditation et relaxation</li>
                  <li>• Alimentation et beauté intérieure</li>
                  <li>• Écologie et consommation responsable</li>
                </ul>
              </div>
              <div>
                <h3 className={`text-xl font-medium mb-4 ${primaryColor}`}>Innovation & Science</h3>
                <ul className="space-y-2 text-stone-600">
                  <li>• Avancées en cosmétique naturelle</li>
                  <li>• Études scientifiques sur les plantes</li>
                  <li>• Nouvelles formulations BIO</li>
                  <li>• Recherche et développement durable</li>
                </ul>
              </div>
              <div>
                <h3 className={`text-xl font-medium mb-4 ${primaryColor}`}>Communauté & Partage</h3>
                <ul className="space-y-2 text-stone-600">
                  <li>• Témoignages de nos clientes</li>
                  <li>• Portraits de producteurs engagés</li>
                  <li>• Événements et ateliers</li>
                  <li>• Programme de parrainage</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className={`text-3xl font-light mb-6 ${primaryColor}`}>
              Formats de contenu
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="border border-stone-200 rounded-lg p-6">
                <h3 className={`text-lg font-medium mb-3 ${primaryColor}`}>Articles de blog</h3>
                <p className="text-stone-600 text-sm mb-3">
                  Contenus approfondis sur des thématiques beauté et bien-être
                </p>
                <ul className="text-xs text-stone-500 space-y-1">
                  <li>• Guides complets</li>
                  <li>• Études de cas</li>
                  <li>• Interviews experts</li>
                </ul>
              </div>
              <div className="border border-stone-200 rounded-lg p-6">
                <h3 className={`text-lg font-medium mb-3 ${primaryColor}`}>Recettes & Tutoriaux</h3>
                <p className="text-stone-600 text-sm mb-3">
                  Guides pratiques pour créer ses propres soins
                </p>
                <ul className="text-xs text-stone-500 space-y-1">
                  <li>• Recettes maison</li>
                  <li>• Tutoriels vidéo</li>
                  <li>• DIY beauté</li>
                </ul>
              </div>
              <div className="border border-stone-200 rounded-lg p-6">
                <h3 className={`text-lg font-medium mb-3 ${primaryColor}`}>Conseils quotidiens</h3>
                <p className="text-stone-600 text-sm mb-3">
                  Astuces rapides et conseils pratiques
                </p>
                <ul className="text-xs text-stone-500 space-y-1">
                  <li>• Tips beauté</li>
                  <li>• Questions fréquentes</li>
                  <li>• Astuces naturelles</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className={`text-3xl font-light mb-6 ${primaryColor}`}>
              Engagement qualité
            </h2>
            <div className="space-y-4 text-stone-600">
              <p>
                <strong>Fiabilité :</strong> Toutes nos informations sont vérifiées et sourcées auprès d'experts
                en cosmétique naturelle et professionnels de santé.
              </p>
              <p>
                <strong>Accessibilité :</strong> Nos contenus sont écrits dans un langage clair et accessible,
                sans jargon technique inutile.
              </p>
              <p>
                <strong>Éthique :</strong> Nous privilégions les sources fiables et rejetons toute forme de greenwashing
                ou de promesses irréalistes.
              </p>
              <p>
                <strong>Inclusivité :</strong> Nos conseils s'adressent à tous les types de peau et respectent
                la diversité de nos lectrices et lecteurs.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className={`text-3xl font-light mb-6 ${primaryColor}`}>
              Contact & Contribution
            </h2>
            <p className="text-stone-600 mb-4">
              Vous souhaitez proposer un sujet d'article, partager votre expérience ou devenir contributeur ?
              N'hésitez pas à nous contacter !
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className={`px-6 py-3 ${accentColor} text-white rounded-full font-medium hover:opacity-90 transition duration-200`}>
                Proposer un sujet
              </button>
              <button className={`px-6 py-3 border border-[#d4bfa4] ${primaryColor} rounded-full font-medium hover:${accentColor} hover:text-white transition duration-200`}>
                Nous contacter
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlanEditorial;
