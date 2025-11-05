import React from 'react';

function PolitiqueCookies() {
  const primaryColor = 'text-[#6b4226]';
  const accentColor = 'bg-[#8b5e3c]';
  const lightBg = 'bg-[#fdf6ec]';

  return (
    <div className={`relative ${lightBg} px-6 sm:px-12 py-20 overflow-hidden`}>
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h1 className={`text-5xl font-light mb-4 ${primaryColor} tracking-widest`}>
            POLITIQUE COOKIES
          </h1>
          <p className="text-xl text-stone-500 font-extralight max-w-lg mx-auto">
            Gestion des cookies et confidentialité
          </p>
        </div>

        <div className="space-y-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className={`text-3xl font-light mb-6 ${primaryColor}`}>
              Qu'est-ce qu'un cookie ?
            </h2>
            <p className="text-stone-600 leading-relaxed">
              Un cookie est un petit fichier texte déposé sur votre ordinateur, tablette ou smartphone lors de votre
              visite sur notre site. Il permet à notre site de se souvenir de vos actions et préférences pendant un
              certain temps, afin de vous éviter de les saisir à nouveau lors de votre prochaine visite.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className={`text-3xl font-light mb-6 ${primaryColor}`}>
              Les cookies utilisés sur notre site
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className={`text-xl font-medium mb-3 ${primaryColor}`}>Cookies essentiels</h3>
                <p className="text-stone-600 mb-2">
                  Ces cookies sont nécessaires au fonctionnement du site et ne peuvent pas être désactivés.
                </p>
                <ul className="list-disc list-inside text-stone-600 space-y-1">
                  <li>Cookies de session pour la navigation</li>
                  <li>Cookies de sécurité pour la protection des données</li>
                  <li>Cookies de panier d'achat</li>
                </ul>
              </div>

              <div>
                <h3 className={`text-xl font-medium mb-3 ${primaryColor}`}>Cookies analytiques</h3>
                <p className="text-stone-600 mb-2">
                  Ces cookies nous aident à comprendre comment les visiteurs utilisent notre site.
                </p>
                <ul className="list-disc list-inside text-stone-600 space-y-1">
                  <li>Google Analytics (anonymisé)</li>
                  <li>Statistiques de fréquentation</li>
                  <li>Amélioration de l'expérience utilisateur</li>
                </ul>
              </div>

              <div>
                <h3 className={`text-xl font-medium mb-3 ${primaryColor}`}>Cookies marketing</h3>
                <p className="text-stone-600 mb-2">
                  Ces cookies sont utilisés pour vous proposer des publicités pertinentes.
                </p>
                <ul className="list-disc list-inside text-stone-600 space-y-1">
                  <li>Cookies de réseaux sociaux</li>
                  <li>Cookies de remarketing</li>
                  <li>Cookies de personnalisation</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className={`text-3xl font-light mb-6 ${primaryColor}`}>
              Gestion de vos cookies
            </h2>
            <div className="space-y-4">
              <p className="text-stone-600">
                Vous pouvez à tout moment choisir de désactiver certains cookies via les paramètres de votre navigateur :
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 border border-stone-200 rounded-lg">
                  <h4 className="font-medium text-stone-800 mb-2">Chrome</h4>
                  <p className="text-sm text-stone-600">Paramètres → Confidentialité → Cookies</p>
                </div>
                <div className="p-4 border border-stone-200 rounded-lg">
                  <h4 className="font-medium text-stone-800 mb-2">Firefox</h4>
                  <p className="text-sm text-stone-600">Préférences → Vie privée → Cookies</p>
                </div>
                <div className="p-4 border border-stone-200 rounded-lg">
                  <h4 className="font-medium text-stone-800 mb-2">Safari</h4>
                  <p className="text-sm text-stone-600">Préférences → Confidentialité → Cookies</p>
                </div>
                <div className="p-4 border border-stone-200 rounded-lg">
                  <h4 className="font-medium text-stone-800 mb-2">Edge</h4>
                  <p className="text-sm text-stone-600">Paramètres → Cookies et autorisations</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className={`text-3xl font-light mb-6 ${primaryColor}`}>
              Consentement et droits
            </h2>
            <div className="space-y-4 text-stone-600">
              <p>
                En continuant à naviguer sur notre site, vous acceptez l'utilisation des cookies selon cette politique.
                Vous pouvez retirer votre consentement à tout moment.
              </p>
              <p>
                Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données.
                Pour exercer ces droits, contactez-nous à : contact@harena-cosmetique.com
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className={`text-3xl font-light mb-6 ${primaryColor}`}>
              Mise à jour de cette politique
            </h2>
            <p className="text-stone-600">
              Cette politique peut être mise à jour à tout moment. Nous vous invitons à la consulter régulièrement
              pour rester informé des changements.
            </p>
            <p className="text-stone-500 text-sm mt-4">
              Dernière mise à jour : Décembre 2024
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PolitiqueCookies;
