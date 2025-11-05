import React from 'react';

function MentionsLegales() {
  const primaryColor = 'text-[#6b4226]';
  const accentColor = 'bg-[#8b5e3c]';
  const lightBg = 'bg-[#fdf6ec]';

  return (
    <div className={`relative ${lightBg} px-6 sm:px-12 py-20 overflow-hidden`}>
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h1 className={`text-5xl font-light mb-4 ${primaryColor} tracking-widest`}>
            MENTIONS LÉGALES
          </h1>
          <p className="text-xl text-stone-500 font-extralight max-w-lg mx-auto">
            Informations légales et conditions d'utilisation
          </p>
        </div>

        <div className="space-y-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className={`text-3xl font-light mb-6 ${primaryColor}`}>
              Éditeur du site
            </h2>
            <div className="space-y-4 text-stone-600">
              <p><strong>Harèna Cosmétique Beauté</strong></p>
              <p>Société [Type de société] au capital de [montant] €</p>
              <p>RCS [Ville] [numéro]</p>
              <p>Siège social : [Adresse complète]</p>
              <p>Téléphone : [numéro]</p>
              <p>Email : contact@harena-cosmetique.com</p>
              <p>Directeur de la publication : [Nom du responsable]</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className={`text-3xl font-light mb-6 ${primaryColor}`}>
              Hébergement
            </h2>
            <div className="space-y-4 text-stone-600">
              <p><strong>[Nom de l'hébergeur]</strong></p>
              <p>Adresse : [Adresse complète]</p>
              <p>Téléphone : [numéro]</p>
              <p>Site web : [url]</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className={`text-3xl font-light mb-6 ${primaryColor}`}>
              Propriété intellectuelle
            </h2>
            <div className="space-y-4 text-stone-600">
              <p>
                L'ensemble des éléments constituant ce site (textes, images, logos, vidéos, etc.) sont la propriété
                exclusive de Harèna Cosmétique Beauté ou font l'objet d'une autorisation d'utilisation.
              </p>
              <p>
                Toute reproduction, distribution, modification ou exploitation, totale ou partielle, sans autorisation
                préalable et écrite, est strictement interdite.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className={`text-3xl font-light mb-6 ${primaryColor}`}>
              Protection des données personnelles
            </h2>
            <div className="space-y-4 text-stone-600">
              <p>
                Conformément à la loi Informatique et Libertés du 6 janvier 1978 modifiée et au RGPD,
                vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition aux données
                personnelles vous concernant.
              </p>
              <p>
                Pour exercer ces droits, contactez-nous à l'adresse email : contact@harena-cosmetique.com
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className={`text-3xl font-light mb-6 ${primaryColor}`}>
              Cookies
            </h2>
            <div className="space-y-4 text-stone-600">
              <p>
                Ce site utilise des cookies pour améliorer votre expérience utilisateur.
                Vous pouvez gérer vos préférences de cookies dans les paramètres de votre navigateur.
              </p>
              <p>
                Pour en savoir plus, consultez notre <a href="/politique-cookies" className={`${primaryColor} hover:underline`}>Politique Cookies</a>.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className={`text-3xl font-light mb-6 ${primaryColor}`}>
              Responsabilité
            </h2>
            <div className="space-y-4 text-stone-600">
              <p>
                Harèna Cosmétique Beauté s'efforce d'assurer l'exactitude des informations diffusées sur ce site.
                Cependant, nous ne pouvons garantir l'absence d'erreurs ou d'omissions.
              </p>
              <p>
                L'utilisation des informations et produits disponibles sur ce site se fait sous l'entière responsabilité
                de l'utilisateur.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MentionsLegales;
