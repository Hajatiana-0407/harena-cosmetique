import React from 'react';

function Parrainer() {
  const primaryColor = 'text-[#6b4226]';
  const accentColor = 'bg-[#8b5e3c]';
  const lightBg = 'bg-[#fdf6ec]';

  return (
    <div className={`relative ${lightBg} px-6 sm:px-12 py-20 overflow-hidden`}>
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h1 className={`text-5xl font-light mb-4 ${primaryColor} tracking-widest`}>
            PARRAINER UN PROCHE
          </h1>
          <p className="text-xl text-stone-500 font-extralight max-w-lg mx-auto">
            Partagez les bienfaits de nos soins naturels avec vos proches
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className={`text-3xl font-light mb-6 ${primaryColor}`}>
            Comment ça marche ?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className={`mx-auto w-16 h-16 rounded-full ${accentColor} flex items-center justify-center mb-4`}>
                <span className="text-white text-2xl">1</span>
              </div>
              <h3 className={`text-xl font-medium mb-2 ${primaryColor}`}>Partagez votre code</h3>
              <p className="text-stone-600">Recevez votre code de parrainage personnel</p>
            </div>
            <div className="text-center">
              <div className={`mx-auto w-16 h-16 rounded-full ${accentColor} flex items-center justify-center mb-4`}>
                <span className="text-white text-2xl">2</span>
              </div>
              <h3 className={`text-xl font-medium mb-2 ${primaryColor}`}>Votre proche s'inscrit</h3>
              <p className="text-stone-600">Il utilise votre code lors de son inscription</p>
            </div>
            <div className="text-center">
              <div className={`mx-auto w-16 h-16 rounded-full ${accentColor} flex items-center justify-center mb-4`}>
                <span className="text-white text-2xl">3</span>
              </div>
              <h3 className={`text-xl font-medium mb-2 ${primaryColor}`}>Vous êtes récompensés</h3>
              <p className="text-stone-600">Recevez des avantages exclusifs</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className={`text-3xl font-light mb-6 ${primaryColor}`}>
            Avantages du parrainage
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className={`text-xl font-medium mb-3 ${primaryColor}`}>Pour vous :</h3>
              <ul className="space-y-2 text-stone-600">
                <li>• Remise de 10% sur votre prochaine commande</li>
                <li>• Produits d'échantillon gratuits</li>
                <li>• Accès prioritaire aux nouvelles collections</li>
              </ul>
            </div>
            <div>
              <h3 className={`text-xl font-medium mb-3 ${primaryColor}`}>Pour votre filleul :</h3>
              <ul className="space-y-2 text-stone-600">
                <li>• Remise de 15% sur sa première commande</li>
                <li>• Livraison offerte</li>
                <li>• Conseils personnalisés gratuits</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Parrainer;
