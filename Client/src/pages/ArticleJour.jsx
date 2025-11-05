import React from 'react';

function ArticleJour() {
  const primaryColor = 'text-[#6b4226]';
  const accentColor = 'bg-[#8b5e3c]';
  const lightBg = 'bg-[#fdf6ec]';

  return (
    <div className={`relative ${lightBg} px-6 sm:px-12 py-20 overflow-hidden`}>
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h1 className={`text-5xl font-light mb-4 ${primaryColor} tracking-widest`}>
            L'ARTICLE DU JOUR
          </h1>
          <p className="text-xl text-stone-500 font-extralight max-w-lg mx-auto">
            Découvrez notre sélection quotidienne d'articles inspirants
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="h-64 bg-cover bg-center" style={{backgroundImage: 'url(/image/beauty.jpg)'}}></div>
          <div className="p-8">
            <div className="flex items-center mb-4">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${accentColor} text-white`}>
                Beauté Naturelle
              </span>
              <span className="ml-4 text-stone-500 text-sm">15 décembre 2024</span>
            </div>
            <h2 className={`text-3xl font-light mb-4 ${primaryColor}`}>
              Les bienfaits du beurre de karité pour la peau
            </h2>
            <p className="text-stone-600 leading-relaxed mb-6">
              Le beurre de karité est un trésor de la nature originaire d'Afrique de l'Ouest. Riche en acides gras essentiels,
              il nourrit intensément la peau et aide à maintenir son hydratation naturelle. Utilisé depuis des siècles par
              les femmes africaines pour ses propriétés protectrices et régénérantes, ce beurre végétal est aujourd'hui
              reconnu mondialement pour ses vertus cosmétiques exceptionnelles.
            </p>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className={`text-xl font-medium mb-3 ${primaryColor}`}>Propriétés nourrissantes</h3>
                <ul className="space-y-2 text-stone-600">
                  <li>• Riche en vitamines A, E et F</li>
                  <li>• Contient des acides gras essentiels</li>
                  <li>• Propriétés anti-inflammatoires</li>
                  <li>• Action protectrice contre les agressions extérieures</li>
                </ul>
              </div>
              <div>
                <h3 className={`text-xl font-medium mb-3 ${primaryColor}`}>Utilisations beauté</h3>
                <ul className="space-y-2 text-stone-600">
                  <li>• Hydratation profonde de la peau</li>
                  <li>• Protection contre le dessèchement</li>
                  <li>• Adoucissement des peaux sèches</li>
                  <li>• Massage relaxant du corps</li>
                </ul>
              </div>
            </div>
            <p className="text-stone-600 leading-relaxed">
              Dans nos produits Harèna, le beurre de karité BIO est un ingrédient star. Il apporte douceur et nutrition
              à votre peau tout en respectant l'environnement. Notre engagement pour des cosmétiques naturels et durables
              passe par le choix d'ingrédients d'exception comme celui-ci.
            </p>
          </div>
        </div>

        <div className="text-center">
          <button className={`px-8 py-3 ${accentColor} text-white rounded-full font-medium hover:opacity-90 transition duration-200 mr-4`}>
            Lire plus d'articles
          </button>
          <button className={`px-8 py-3 border border-[#d4bfa4] ${primaryColor} rounded-full font-medium hover:${accentColor} hover:text-white transition duration-200`}>
            S'abonner à la newsletter
          </button>
        </div>
      </div>
    </div>
  );
}

export default ArticleJour;
