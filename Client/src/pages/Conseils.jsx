import React from 'react';

function Conseils() {
  const primaryColor = 'text-[#6b4226]';
  const accentColor = 'bg-[#8b5e3c]';
  const lightBg = 'bg-[#fdf6ec]';

  const tips = [
    {
      category: "Cheveux",
      title: "Comment bien appliquer votre baume capillaire",
      content: "Appliquez le baume sur cheveux humides, en insistant sur les pointes. Laissez poser 5-10 minutes avant de rincer. Pour un résultat optimal, utilisez une serviette chaude autour de votre tête.",
      image: "/image/beauty.jpg"
    },
    {
      category: "Peau",
      title: "Routine de soin quotidienne",
      content: "Le matin : nettoyez votre peau avec un produit doux, appliquez une crème hydratante. Le soir : démaquillez-vous, appliquez un soin nourrissant. N'oubliez pas la protection solaire !",
      image: "/image/beauty.jpg"
    },
    {
      category: "Bien-être",
      title: "Les bienfaits des huiles essentielles",
      content: "L'huile essentielle de lavande apaise les tensions. Le tea tree purifie la peau. L'ylang ylang équilibre les émotions. Utilisez-les toujours diluées dans une huile végétale.",
      image: "/image/beauty.jpg"
    },
    {
      category: "Naturel",
      title: "Choisir des ingrédients BIO",
      content: "Les ingrédients BIO garantissent l'absence de pesticides et de produits chimiques. Ils respectent l'environnement et offrent une meilleure qualité pour votre peau et vos cheveux.",
      image: "/image/beauty.jpg"
    }
  ];

  return (
    <div className={`relative ${lightBg} px-6 sm:px-12 py-20 overflow-hidden`}>
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h1 className={`text-5xl font-light mb-4 ${primaryColor} tracking-widest`}>
            CONSEILS
          </h1>
          <p className="text-xl text-stone-500 font-extralight max-w-lg mx-auto">
            Découvrez nos astuces pour des soins naturels efficaces
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {tips.map((tip, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="h-48 bg-cover bg-center" style={{backgroundImage: `url(${tip.image})`}}></div>
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${accentColor} text-white`}>
                    {tip.category}
                  </span>
                </div>
                <h3 className={`text-xl font-medium mb-3 ${primaryColor}`}>{tip.title}</h3>
                <p className="text-stone-600 leading-relaxed">{tip.content}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className={`text-3xl font-light mb-6 ${primaryColor}`}>
            Questions fréquentes
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className={`text-lg font-medium mb-2 ${primaryColor}`}>Puis-je utiliser les produits sur les enfants ?</h3>
              <p className="text-stone-600">Oui, nos produits sont adaptés aux enfants dès 3 ans. Cependant, évitez les huiles essentielles pures sur la peau des bébés.</p>
            </div>
            <div>
              <h3 className={`text-lg font-medium mb-2 ${primaryColor}`}>Comment conserver mes préparations maison ?</h3>
              <p className="text-stone-600">Conservez vos mélanges à l'abri de la lumière et de la chaleur. Utilisez des contenants stériles et consommez dans les 3-6 mois.</p>
            </div>
            <div>
              <h3 className={`text-lg font-medium mb-2 ${primaryColor}`}>Les produits sont-ils testés sur les animaux ?</h3>
              <p className="text-stone-600">Non, nous nous engageons contre les tests sur animaux. Tous nos produits sont cruelty-free et respectent l'éthique animale.</p>
            </div>
            <div>
              <h3 className={`text-lg font-medium mb-2 ${primaryColor}`}>Puis-je mélanger différents produits ?</h3>
              <p className="text-stone-600">Oui, notre base neutre est conçue pour être mélangée avec d'autres ingrédients naturels. Testez toujours sur une petite zone d'abord.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Conseils;
