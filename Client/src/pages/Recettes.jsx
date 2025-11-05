import React from 'react';

function Recettes() {
  const primaryColor = 'text-[#6b4226]';
  const accentColor = 'bg-[#8b5e3c]';
  const lightBg = 'bg-[#fdf6ec]';

  const recipes = [
    {
      title: "Masque capillaire nourrissant",
      ingredients: ["2 cuillères de base neutre", "1 cuillère d'huile d'avocat", "5 gouttes d'huile essentielle de lavande"],
      instructions: "Mélangez tous les ingrédients. Appliquez sur cheveux propres et laissez poser 30 minutes. Rincez abondamment.",
      time: "45 min",
      difficulty: "Facile"
    },
    {
      title: "Crème hydratante maison",
      ingredients: ["3 cuillères de base neutre", "1 cuillère d'aloe vera", "3 gouttes de vitamine E"],
      instructions: "Fouettez la base neutre avec l'aloe vera. Ajoutez la vitamine E. Appliquez sur peau propre matin et soir.",
      time: "15 min",
      difficulty: "Facile"
    },
    {
      title: "Baume réparateur pour pointes",
      ingredients: ["1 cuillère de base neutre", "5 gouttes d'huile d'argan", "3 gouttes d'huile essentielle d'ylang ylang"],
      instructions: "Mélangez délicatement. Appliquez uniquement sur les pointes. Laissez agir sans rincer.",
      time: "10 min",
      difficulty: "Très facile"
    }
  ];

  return (
    <div className={`relative ${lightBg} px-6 sm:px-12 py-20 overflow-hidden`}>
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h1 className={`text-5xl font-light mb-4 ${primaryColor} tracking-widest`}>
            RECETTES
          </h1>
          <p className="text-xl text-stone-500 font-extralight max-w-lg mx-auto">
            Créez vos soins naturels avec notre base neutre
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recipes.map((recipe, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className={`text-xl font-medium ${primaryColor}`}>{recipe.title}</h3>
                  <div className="text-right">
                    <p className="text-sm text-stone-500">{recipe.time}</p>
                    <p className="text-xs text-stone-400">{recipe.difficulty}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className={`font-medium mb-2 ${primaryColor}`}>Ingrédients :</h4>
                  <ul className="text-sm text-stone-600 space-y-1">
                    {recipe.ingredients.map((ingredient, i) => (
                      <li key={i}>• {ingredient}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className={`font-medium mb-2 ${primaryColor}`}>Préparation :</h4>
                  <p className="text-sm text-stone-600">{recipe.instructions}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h2 className={`text-3xl font-light mb-6 ${primaryColor}`}>
            Conseils pour réussir vos recettes
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className={`text-xl font-medium mb-3 ${primaryColor}`}>Conservation</h3>
              <ul className="space-y-2 text-stone-600">
                <li>• Conservez vos préparations à l'abri de la lumière</li>
                <li>• Utilisez des contenants stériles</li>
                <li>• Préparez de petites quantités pour une utilisation fraîche</li>
                <li>• Durée de conservation : 3-6 mois selon les ingrédients</li>
              </ul>
            </div>
            <div>
              <h3 className={`text-xl font-medium mb-3 ${primaryColor}`}>Précautions</h3>
              <ul className="space-y-2 text-stone-600">
                <li>• Testez toujours sur une petite zone de peau</li>
                <li>• Respectez les dosages recommandés</li>
                <li>• Consultez un professionnel pour les huiles essentielles</li>
                <li>• Évitez le contact avec les yeux</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Recettes;
