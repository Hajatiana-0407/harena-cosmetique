import React from 'react';

function BoutiquesAteliers() {
  const primaryColor = 'text-[#6b4226]';
  const accentColor = 'bg-[#8b5e3c]';
  const lightBg = 'bg-[#fdf6ec]';

  const boutiques = [
    {
      ville: "Paris",
      adresse: "15 rue des Cosmétiques, 75001 Paris",
      horaires: "Lundi au Samedi : 10h-19h",
      telephone: "01 42 33 44 55",
      services: ["Conseils personnalisés", "Ateliers DIY", "Dégustation produits"],
      image: "/image/beauty.jpg"
    },
    {
      ville: "Lyon",
      adresse: "8 place Bellecour, 69002 Lyon",
      horaires: "Lundi au Samedi : 10h-19h",
      telephone: "04 78 12 34 56",
      services: ["Spa beauté naturelle", "Formations", "Événements"],
      image: "/image/beauty.jpg"
    },
    {
      ville: "Marseille",
      adresse: "25 cours Julien, 13006 Marseille",
      horaires: "Lundi au Samedi : 10h-19h",
      telephone: "04 91 23 45 67",
      services: ["Ateliers enfants", "Consultations", "Vente en ligne"],
      image: "/image/beauty.jpg"
    }
  ];

  return (
    <div className={`relative ${lightBg} px-6 sm:px-12 py-20 overflow-hidden`}>
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h1 className={`text-5xl font-light mb-4 ${primaryColor} tracking-widest`}>
            NOS BOUTIQUES ATELIERS
          </h1>
          <p className="text-xl text-stone-500 font-extralight max-w-lg mx-auto">
            Des lieux de rencontre où la beauté naturelle prend vie
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className={`text-3xl font-light mb-6 ${primaryColor}`}>
            L'esprit de nos boutiques
          </h2>
          <p className="text-stone-600 leading-relaxed mb-6">
            Nos boutiques ateliers ne sont pas de simples points de vente. Ce sont des lieux de vie où
            vous pouvez découvrir, apprendre et partager votre passion pour les soins naturels.
            Chaque espace est conçu comme un laboratoire vivant de la beauté authentique.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className={`mx-auto w-16 h-16 rounded-full ${accentColor} flex items-center justify-center mb-4`}>
                <span className="text-white text-2xl">🧪</span>
              </div>
              <h3 className={`text-lg font-medium mb-2 ${primaryColor}`}>Laboratoire vivant</h3>
              <p className="text-sm text-stone-600">Testez et créez vos propres mélanges</p>
            </div>
            <div className="text-center">
              <div className={`mx-auto w-16 h-16 rounded-full ${accentColor} flex items-center justify-center mb-4`}>
                <span className="text-white text-2xl">👥</span>
              </div>
              <h3 className={`text-lg font-medium mb-2 ${primaryColor}`}>Communauté</h3>
              <p className="text-sm text-stone-600">Échangez avec des passionnés</p>
            </div>
            <div className="text-center">
              <div className={`mx-auto w-16 h-16 rounded-full ${accentColor} flex items-center justify-center mb-4`}>
                <span className="text-white text-2xl">🎨</span>
              </div>
              <h3 className={`text-lg font-medium mb-2 ${primaryColor}`}>Créativité</h3>
              <p className="text-sm text-stone-600">Libérez votre imagination beauté</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {boutiques.map((boutique, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="h-48 bg-cover bg-center" style={{backgroundImage: `url(${boutique.image})`}}></div>
              <div className="p-6">
                <h3 className={`text-xl font-medium mb-2 ${primaryColor}`}>{boutique.ville}</h3>
                <p className="text-stone-600 text-sm mb-3">{boutique.adresse}</p>
                <p className="text-stone-600 text-sm mb-3">{boutique.horaires}</p>
                <p className="text-stone-600 text-sm mb-4">{boutique.telephone}</p>
                <div>
                  <p className={`font-medium text-sm mb-2 ${primaryColor}`}>Services :</p>
                  <ul className="text-stone-600 text-sm space-y-1">
                    {boutique.services.map((service, i) => (
                      <li key={i}>• {service}</li>
                    ))}
                  </ul>
                </div>
                <button className={`mt-4 w-full py-2 ${accentColor} text-white rounded-full font-medium hover:opacity-90 transition duration-200 text-sm`}>
                  Réserver un atelier
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className={`text-3xl font-light mb-6 ${primaryColor}`}>
            Nos ateliers thématiques
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className={`text-xl font-medium mb-4 ${primaryColor}`}>Ateliers découverte</h3>
              <ul className="space-y-3 text-stone-600">
                <li><strong>Initiation aux huiles essentielles :</strong> Apprenez à reconnaître et utiliser les huiles essentielles BIO</li>
                <li><strong>Création de soins maison :</strong> Formulez votre propre crème hydratante</li>
                <li><strong>Lecture d'étiquettes :</strong> Comprendre la composition des cosmétiques</li>
              </ul>
            </div>
            <div>
              <h3 className={`text-xl font-medium mb-4 ${primaryColor}`}>Ateliers spécialisés</h3>
              <ul className="space-y-3 text-stone-600">
                <li><strong>Soins du visage personnalisés :</strong> Analysez votre type de peau et créez votre routine</li>
                <li><strong>Cheveux naturels :</strong> Techniques de soin et masquage pour cheveux texturés</li>
                <li><strong>Parfum d'intérieur naturel :</strong> Créez vos propres diffuseurs d'huiles essentielles</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className={`text-3xl font-light mb-6 ${primaryColor}`}>
            Événements et rencontres
          </h2>
          <div className="space-y-6">
            <div className="border-l-4 border-[#8b5e3c] pl-6">
              <h3 className={`text-xl font-medium mb-2 ${primaryColor}`}>Soirées découverte</h3>
              <p className="text-stone-600">
                Une fois par mois, nous organisons des soirées thématiques avec des experts en cosmétique naturelle.
                Dégustation de produits, échanges et démonstrations pratiques.
              </p>
            </div>
            <div className="border-l-4 border-[#8b5e3c] pl-6">
              <h3 className={`text-xl font-medium mb-2 ${primaryColor}`}>Rencontres avec nos producteurs</h3>
              <p className="text-stone-600">
                Découvrez les hommes et femmes qui cultivent nos ingrédients. Échanges directs sur leurs pratiques
                et l'impact de leur travail sur l'environnement.
              </p>
            </div>
            <div className="border-l-4 border-[#8b5e3c] pl-6">
              <h3 className={`text-xl font-medium mb-2 ${primaryColor}`}>Club des passionnés</h3>
              <p className="text-stone-600">
                Rejoignez notre communauté de passionnés. Partagez vos expériences, recevez des conseils personnalisés
                et participez à des événements exclusifs.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-stone-600 mb-6">
            Nos boutiques ateliers sont des lieux où la beauté naturelle s'expérimente,
            s'apprend et se partage. Venez vivre cette expérience unique !
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className={`px-8 py-3 ${accentColor} text-white rounded-full font-medium hover:opacity-90 transition duration-200`}>
              Trouver une boutique
            </button>
            <button className={`px-8 py-3 border border-[#d4bfa4] ${primaryColor} rounded-full font-medium hover:${accentColor} hover:text-white transition duration-200`}>
              Réserver un atelier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BoutiquesAteliers;
