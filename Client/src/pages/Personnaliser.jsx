import React from 'react';

function Personnaliser() {
  const primaryColor = 'text-[#6b4226]';
  const accentColor = 'bg-[#8b5e3c]';
  const lightBg = 'bg-[#fdf6ec]';

  return (
    <div className={`relative ${lightBg} px-6 sm:px-12 py-20 overflow-hidden`}>
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h1 className={`text-5xl font-light mb-4 ${primaryColor} tracking-widest`}>
            PERSONNALISER SA BASE NEUTRE
          </h1>
          <p className="text-xl text-stone-500 font-extralight max-w-lg mx-auto">
            Créez votre soin unique adapté à vos besoins
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className={`text-3xl font-light mb-6 ${primaryColor}`}>
            Notre base neutre
          </h2>
          <p className="text-stone-600 mb-6 leading-relaxed">
            Notre base neutre est une formule 100% naturelle, enrichie en huiles végétales BIO de Jojoba, Ricin et beurre de Karité.
            Cette base polyvalente peut être utilisée comme :
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 border border-stone-200 rounded-lg">
              <h3 className={`font-medium mb-2 ${primaryColor}`}>Baume capillaire</h3>
              <p className="text-sm text-stone-600">Pour nourrir et protéger les cheveux</p>
            </div>
            <div className="text-center p-4 border border-stone-200 rounded-lg">
              <h3 className={`font-medium mb-2 ${primaryColor}`}>Crème de jour</h3>
              <p className="text-sm text-stone-600">Pour hydrater la peau du visage</p>
            </div>
            <div className="text-center p-4 border border-stone-200 rounded-lg">
              <h3 className={`font-medium mb-2 ${primaryColor}`}>Baume corporel</h3>
              <p className="text-sm text-stone-600">Pour nourrir la peau du corps</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className={`text-3xl font-light mb-6 ${primaryColor}`}>
            Personnalisez votre soin
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className={`text-xl font-medium mb-3 ${primaryColor}`}>Choisissez vos huiles essentielles</h3>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="p-3 border border-stone-200 rounded-lg text-center">
                  <p className="font-medium text-stone-800">Lavande</p>
                  <p className="text-sm text-stone-600">Apaisante</p>
                </div>
                <div className="p-3 border border-stone-200 rounded-lg text-center">
                  <p className="font-medium text-stone-800">Tea Tree</p>
                  <p className="text-sm text-stone-600">Purifiante</p>
                </div>
                <div className="p-3 border border-stone-200 rounded-lg text-center">
                  <p className="font-medium text-stone-800">Ylang Ylang</p>
                  <p className="text-sm text-stone-600">Équilibrante</p>
                </div>
                <div className="p-3 border border-stone-200 rounded-lg text-center">
                  <p className="font-medium text-stone-800">Citron</p>
                  <p className="text-sm text-stone-600">Tonifiante</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className={`text-xl font-medium mb-3 ${primaryColor}`}>Ajoutez des actifs naturels</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-3 border border-stone-200 rounded-lg text-center">
                  <p className="font-medium text-stone-800">Vitamine E</p>
                  <p className="text-sm text-stone-600">Antioxydante</p>
                </div>
                <div className="p-3 border border-stone-200 rounded-lg text-center">
                  <p className="font-medium text-stone-800">Aloe Vera</p>
                  <p className="text-sm text-stone-600">Apaisante</p>
                </div>
                <div className="p-3 border border-stone-200 rounded-lg text-center">
                  <p className="font-medium text-stone-800">Huile d'Argan</p>
                  <p className="text-sm text-stone-600">Nourrissante</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button className={`px-8 py-3 ${accentColor} text-white rounded-full font-medium hover:opacity-90 transition duration-200`}>
            Commander ma base personnalisée
          </button>
        </div>
      </div>
    </div>
  );
}

export default Personnaliser;
