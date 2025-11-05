import React from 'react';

function PlanSite() {
  const primaryColor = 'text-[#6b4226]';
  const accentColor = 'bg-[#8b5e3c]';
  const lightBg = 'bg-[#fdf6ec]';

  return (
    <div className={`relative ${lightBg} px-6 sm:px-12 py-20 overflow-hidden`}>
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h1 className={`text-5xl font-light mb-4 ${primaryColor} tracking-widest`}>
            PLAN DE SITE
          </h1>
          <p className="text-xl text-stone-500 font-extralight max-w-lg mx-auto">
            Naviguez facilement dans notre site
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className={`text-2xl font-light mb-6 ${primaryColor}`}>
              Boutique
            </h2>
            <ul className="space-y-3">
              <li><a href="/" className="text-stone-600 hover:text-[#8b5e3c] transition-colors">Accueil</a></li>
              <li><a href="/catalogue" className="text-stone-600 hover:text-[#8b5e3c] transition-colors">Catalogue produits</a></li>
              <li><a href="/produit" className="text-stone-600 hover:text-[#8b5e3c] transition-colors">Tous les produits</a></li>
              <li><a href="/panier" className="text-stone-600 hover:text-[#8b5e3c] transition-colors">Panier</a></li>
              <li><a href="/compte" className="text-stone-600 hover:text-[#8b5e3c] transition-colors">Mon compte</a></li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className={`text-2xl font-light mb-6 ${primaryColor}`}>
              Informations
            </h2>
            <ul className="space-y-3">
              <li><a href="/a-propos" className="text-stone-600 hover:text-[#8b5e3c] transition-colors">À propos</a></li>
              <li><a href="/contact" className="text-stone-600 hover:text-[#8b5e3c] transition-colors">Contact</a></li>
              <li><a href="/faq" className="text-stone-600 hover:text-[#8b5e3c] transition-colors">FAQ</a></li>
              <li><a href="/blog" className="text-stone-600 hover:text-[#8b5e3c] transition-colors">Blog</a></li>
              <li><a href="/messenger" className="text-stone-600 hover:text-[#8b5e3c] transition-colors">Messenger</a></li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className={`text-2xl font-light mb-6 ${primaryColor}`}>
              Conseils & Recettes
            </h2>
            <ul className="space-y-3">
              <li><a href="/conseils" className="text-stone-600 hover:text-[#8b5e3c] transition-colors">Conseils beauté</a></li>
              <li><a href="/recettes" className="text-stone-600 hover:text-[#8b5e3c] transition-colors">Recettes maison</a></li>
              <li><a href="/personnaliser" className="text-stone-600 hover:text-[#8b5e3c] transition-colors">Personnaliser sa base</a></li>
              <li><a href="/article-jour" className="text-stone-600 hover:text-[#8b5e3c] transition-colors">Article du jour</a></li>
              <li><a href="/parrainer" className="text-stone-600 hover:text-[#8b5e3c] transition-colors">Parrainer un proche</a></li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className={`text-2xl font-light mb-6 ${primaryColor}`}>
              Engagement
            </h2>
            <ul className="space-y-3">
              <li><a href="/producteurs-engages" className="text-stone-600 hover:text-[#8b5e3c] transition-colors">Nos producteurs engagés</a></li>
              <li><a href="/cosmetique-durable" className="text-stone-600 hover:text-[#8b5e3c] transition-colors">Une cosmétique 100% durable</a></li>
              <li><a href="/humain-climat-biodiversite" className="text-stone-600 hover:text-[#8b5e3c] transition-colors">L'humain, le climat et la biodiversité</a></li>
              <li><a href="/boutiques-ateliers" className="text-stone-600 hover:text-[#8b5e3c] transition-colors">Nos boutiques ateliers</a></li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 md:col-span-2">
            <h2 className={`text-2xl font-light mb-6 ${primaryColor}`}>
              Légal
            </h2>
            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <h3 className={`font-medium mb-3 ${primaryColor}`}>Conditions</h3>
                <ul className="space-y-2">
                  <li><a href="/cgv" className="text-stone-600 hover:text-[#8b5e3c] transition-colors text-sm">CGV</a></li>
                  <li><a href="/mentions-legales" className="text-stone-600 hover:text-[#8b5e3c] transition-colors text-sm">Mentions légales</a></li>
                  <li><a href="/politique-cookies" className="text-stone-600 hover:text-[#8b5e3c] transition-colors text-sm">Politique cookies</a></li>
                </ul>
              </div>
              <div>
                <h3 className={`font-medium mb-3 ${primaryColor}`}>Plan éditorial</h3>
                <ul className="space-y-2">
                  <li><a href="/plan-editorial" className="text-stone-600 hover:text-[#8b5e3c] transition-colors text-sm">Notre ligne éditoriale</a></li>
                  <li><a href="/valeurs" className="text-stone-600 hover:text-[#8b5e3c] transition-colors text-sm">Nos valeurs</a></li>
                  <li><a href="/engagement" className="text-stone-600 hover:text-[#8b5e3c] transition-colors text-sm">Notre engagement</a></li>
                </ul>
              </div>
              <div>
                <h3 className={`font-medium mb-3 ${primaryColor}`}>Navigation</h3>
                <ul className="space-y-2">
                  <li><a href="/plan-site" className="text-stone-600 hover:text-[#8b5e3c] transition-colors text-sm">Plan du site</a></li>
                  <li><a href="/sitemap.xml" className="text-stone-600 hover:text-[#8b5e3c] transition-colors text-sm">Sitemap XML</a></li>
                  <li><a href="/accessibilite" className="text-stone-600 hover:text-[#8b5e3c] transition-colors text-sm">Accessibilité</a></li>
                </ul>
              </div>
              <div>
                <h3 className={`font-medium mb-3 ${primaryColor}`}>Support</h3>
                <ul className="space-y-2">
                  <li><a href="/aide" className="text-stone-600 hover:text-[#8b5e3c] transition-colors text-sm">Centre d'aide</a></li>
                  <li><a href="/contact-support" className="text-stone-600 hover:text-[#8b5e3c] transition-colors text-sm">Support technique</a></li>
                  <li><a href="/retours" className="text-stone-600 hover:text-[#8b5e3c] transition-colors text-sm">Retours & échanges</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-stone-500 mb-4">
            Vous ne trouvez pas ce que vous cherchez ?
          </p>
          <button className={`px-6 py-3 ${accentColor} text-white rounded-full font-medium hover:opacity-90 transition duration-200`}>
            Contactez-nous
          </button>
        </div>
      </div>
    </div>
  );
}

export default PlanSite;
