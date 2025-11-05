import React from 'react';

function ProducteursEngages() {
  const primaryColor = 'text-[#6b4226]';
  const accentColor = 'bg-[#8b5e3c]';
  const lightBg = 'bg-[#fdf6ec]';

  const producteurs = [
    {
      name: "Ferme Bio des Hauts",
      region: "Madagascar",
      specialite: "Huile de Jojoba",
      engagement: "Agriculture biologique certifiée, commerce équitable",
      histoire: "Depuis 15 ans, cette ferme familiale cultive le jojoba selon des méthodes traditionnelles respectueuses de l'environnement."
    },
    {
      name: "Coopérative Karité Pure",
      region: "Afrique de l'Ouest",
      specialite: "Beurre de Karité",
      engagement: "Soutien aux femmes, préservation des savoirs ancestraux",
      histoire: "Plus de 200 femmes travaillent ensemble pour récolter et transformer le karité selon des méthodes artisanales."
    },
    {
      name: "Distillerie Naturelle",
      region: "Provence, France",
      specialite: "Huiles essentielles BIO",
      engagement: "Production locale, zéro déchet, biodiversité",
      histoire: "Spécialisés dans la distillation à vapeur d'eau douce, ils préservent les principes actifs des plantes."
    }
  ];

  return (
    <div className={`relative ${lightBg} px-6 sm:px-12 py-20 overflow-hidden`}>
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h1 className={`text-5xl font-light mb-4 ${primaryColor} tracking-widest`}>
            NOS PRODUCTEURS ENGAGÉS
          </h1>
          <p className="text-xl text-stone-500 font-extralight max-w-lg mx-auto">
            Rencontrez les artisans qui cultivent nos ingrédients avec passion
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className={`text-3xl font-light mb-6 ${primaryColor}`}>
            Notre engagement envers nos producteurs
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className={`mx-auto w-16 h-16 rounded-full ${accentColor} flex items-center justify-center mb-4`}>
                <span className="text-white text-2xl">🤝</span>
              </div>
              <h3 className={`text-lg font-medium mb-2 ${primaryColor}`}>Commerce équitable</h3>
              <p className="text-sm text-stone-600">Prix justes garantis pour valoriser le travail de nos partenaires</p>
            </div>
            <div className="text-center">
              <div className={`mx-auto w-16 h-16 rounded-full ${accentColor} flex items-center justify-center mb-4`}>
                <span className="text-white text-2xl">🌱</span>
              </div>
              <h3 className={`text-lg font-medium mb-2 ${primaryColor}`}>Agriculture durable</h3>
              <p className="text-sm text-stone-600">Pratiques respectueuses de l'environnement et de la biodiversité</p>
            </div>
            <div className="text-center">
              <div className={`mx-auto w-16 h-16 rounded-full ${accentColor} flex items-center justify-center mb-4`}>
                <span className="text-white text-2xl">👥</span>
              </div>
              <h3 className={`text-lg font-medium mb-2 ${primaryColor}`}>Soutien communautaire</h3>
              <p className="text-sm text-stone-600">Accompagnement des communautés locales et préservation des savoirs</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {producteurs.map((producteur, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="h-48 bg-cover bg-center" style={{backgroundImage: 'url(/image/beauty.jpg)'}}></div>
              <div className="p-6">
                <h3 className={`text-xl font-medium mb-2 ${primaryColor}`}>{producteur.name}</h3>
                <p className="text-stone-500 text-sm mb-3">{producteur.region}</p>
                <div className="mb-3">
                  <p className={`font-medium text-sm ${primaryColor}`}>Spécialité :</p>
                  <p className="text-stone-600 text-sm">{producteur.specialite}</p>
                </div>
                <div className="mb-3">
                  <p className={`font-medium text-sm ${primaryColor}`}>Engagement :</p>
                  <p className="text-stone-600 text-sm">{producteur.engagement}</p>
                </div>
                <div>
                  <p className={`font-medium text-sm ${primaryColor}`}>Leur histoire :</p>
                  <p className="text-stone-600 text-sm leading-relaxed">{producteur.histoire}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className={`text-3xl font-light mb-6 ${primaryColor}`}>
            Notre charte de partenariat
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className={`text-xl font-medium mb-4 ${primaryColor}`}>Critères de sélection</h3>
              <ul className="space-y-2 text-stone-600">
                <li>• Certification BIO ou équivalent</li>
                <li>• Pratiques agricoles durables</li>
                <li>• Respect du commerce équitable</li>
                <li>• Traçabilité complète des produits</li>
                <li>• Engagement social et environnemental</li>
              </ul>
            </div>
            <div>
              <h3 className={`text-xl font-medium mb-4 ${primaryColor}`}>Accompagnement</h3>
              <ul className="space-y-2 text-stone-600">
                <li>• Formation continue aux bonnes pratiques</li>
                <li>• Soutien technique et logistique</li>
                <li>• Garantie d'achat à prix fixe</li>
                <li>• Partage des connaissances</li>
                <li>• Visites régulières sur le terrain</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-stone-600 mb-6">
            Chaque produit Harèna raconte l'histoire de ces hommes et femmes passionnés qui cultivent
            la beauté avec respect et authenticité.
          </p>
          <button className={`px-8 py-3 ${accentColor} text-white rounded-full font-medium hover:opacity-90 transition duration-200`}>
            Découvrir nos produits
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProducteursEngages;
