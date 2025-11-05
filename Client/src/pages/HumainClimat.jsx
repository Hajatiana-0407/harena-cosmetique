import React from 'react';

function HumainClimat() {
  const primaryColor = 'text-[#6b4226]';
  const accentColor = 'bg-[#8b5e3c]';
  const lightBg = 'bg-[#fdf6ec]';

  return (
    <div className={`relative ${lightBg} px-6 sm:px-12 py-20 overflow-hidden`}>
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h1 className={`text-5xl font-light mb-4 ${primaryColor} tracking-widest`}>
            L'HUMAIN, LE CLIMAT ET LA BIODIVERSITÉ
          </h1>
          <p className="text-xl text-stone-500 font-extralight max-w-lg mx-auto">
            Notre responsabilité envers les générations futures
          </p>
        </div>

        <div className="space-y-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className={`text-3xl font-light mb-6 ${primaryColor}`}>
              Trois piliers pour un avenir durable
            </h2>
            <p className="text-stone-600 leading-relaxed mb-6">
              Chez Harèna, nous plaçons l'humain, le climat et la biodiversité au cœur de notre modèle économique.
              Ces trois dimensions sont indissociables et guident chacune de nos décisions.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className={`mx-auto w-16 h-16 rounded-full ${accentColor} flex items-center justify-center mb-4`}>
                  <span className="text-white text-2xl">👥</span>
                </div>
                <h3 className={`text-lg font-medium mb-2 ${primaryColor}`}>L'humain d'abord</h3>
                <p className="text-sm text-stone-600">Respect des droits, conditions de travail dignes, inclusion sociale</p>
              </div>
              <div className="text-center">
                <div className={`mx-auto w-16 h-16 rounded-full ${accentColor} flex items-center justify-center mb-4`}>
                  <span className="text-white text-2xl">🌡️</span>
                </div>
                <h3 className={`text-lg font-medium mb-2 ${primaryColor}`}>Le climat protégé</h3>
                <p className="text-sm text-stone-600">Réduction des émissions, adaptation aux changements climatiques</p>
              </div>
              <div className="text-center">
                <div className={`mx-auto w-16 h-16 rounded-full ${accentColor} flex items-center justify-center mb-4`}>
                  <span className="text-white text-2xl">🦋</span>
                </div>
                <h3 className={`text-lg font-medium mb-2 ${primaryColor}`}>La biodiversité préservée</h3>
                <p className="text-sm text-stone-600">Protection des écosystèmes, agriculture régénératrice</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className={`text-3xl font-light mb-6 ${primaryColor}`}>
              Actions concrètes pour l'humain
            </h2>
            <div className="space-y-6">
              <div className="border-l-4 border-[#8b5e3c] pl-6">
                <h3 className={`text-xl font-medium mb-2 ${primaryColor}`}>Commerce équitable certifié</h3>
                <p className="text-stone-600">
                  Tous nos ingrédients sont sourcés auprès de coopératives paysannes avec qui nous établissons
                  des partenariats de long terme garantissant des revenus décents.
                </p>
              </div>
              <div className="border-l-4 border-[#8b5e3c] pl-6">
                <h3 className={`text-xl font-medium mb-2 ${primaryColor}`}>Éducation et formation</h3>
                <p className="text-stone-600">
                  Nous finançons des programmes d'éducation pour les enfants de nos partenaires et proposons
                  des formations continues aux agriculteurs.
                </p>
              </div>
              <div className="border-l-4 border-[#8b5e3c] pl-6">
                <h3 className={`text-xl font-medium mb-2 ${primaryColor}`}>Santé et sécurité</h3>
                <p className="text-stone-600">
                  Nous veillons à ce que tous nos partenaires bénéficient d'une couverture santé et de conditions
                  de travail sécurisantes.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className={`text-3xl font-light mb-6 ${primaryColor}`}>
              Protection du climat
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className={`text-xl font-medium mb-4 ${primaryColor}`}>Réduction carbone</h3>
                <ul className="space-y-2 text-stone-600">
                  <li>• Énergie 100% renouvelable dans nos locaux</li>
                  <li>• Optimisation des transports (regroupement des livraisons)</li>
                  <li>• Compensation des émissions inévitables</li>
                  <li>• Objectif zéro carbone d'ici 2025</li>
                </ul>
              </div>
              <div>
                <h3 className={`text-xl font-medium mb-4 ${primaryColor}`}>Adaptation aux changements</h3>
                <ul className="space-y-2 text-stone-600">
                  <li>• Sélection de plantes résistantes au changement climatique</li>
                  <li>• Techniques d'agriculture régénératrice</li>
                  <li>• Gestion durable de l'eau</li>
                  <li>• Protection des sols</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className={`text-3xl font-light mb-6 ${primaryColor}`}>
              Préservation de la biodiversité
            </h2>
            <div className="space-y-6">
              <div className="border-l-4 border-[#8b5e3c] pl-6">
                <h3 className={`text-xl font-medium mb-2 ${primaryColor}`}>Agriculture régénératrice</h3>
                <p className="text-stone-600">
                  Nos partenaires pratiquent l'agroforesterie, associant arbres fruitiers et cultures,
                  ce qui favorise la biodiversité et améliore la qualité des sols.
                </p>
              </div>
              <div className="border-l-4 border-[#8b5e3c] pl-6">
                <h3 className={`text-xl font-medium mb-2 ${primaryColor}`}>Protection des pollinisateurs</h3>
                <p className="text-stone-600">
                  Nous préservons les habitats des abeilles et autres pollinisateurs essentiels à l'agriculture
                  en maintenant des zones de biodiversité dans nos exploitations partenaires.
                </p>
              </div>
              <div className="border-l-4 border-[#8b5e3c] pl-6">
                <h3 className={`text-xl font-medium mb-2 ${primaryColor}`}>Gestion durable des ressources</h3>
                <p className="text-stone-600">
                  Nos pratiques respectent les cycles naturels et préservent les écosystèmes locaux,
                  assurant la pérennité des ressources pour les générations futures.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className={`text-3xl font-light mb-6 ${primaryColor}`}>
              Transparence et mesure d'impact
            </h2>
            <p className="text-stone-600 mb-6">
              Nous mesurons et publions annuellement l'impact de nos actions sur ces trois piliers.
              Notre bilan est audité par un organisme indépendant pour garantir sa fiabilité.
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-[#8b5e3c] mb-2">500+</div>
                <p className="text-stone-600">Familles soutenues</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#8b5e3c] mb-2">70%</div>
                <p className="text-stone-600">Réduction CO2</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#8b5e3c] mb-2">15ha</div>
                <p className="text-stone-600">Forêts préservées</p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-stone-600 mb-6">
              Chaque produit Harèna est le fruit d'un engagement profond pour l'humain,
              le climat et la biodiversité. Merci de nous accompagner dans cette démarche.
            </p>
            <button className={`px-8 py-3 ${accentColor} text-white rounded-full font-medium hover:opacity-90 transition duration-200`}>
              Agir avec nous
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HumainClimat;
