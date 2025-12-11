import React, { useState } from 'react';

// --- Données pour les liens de navigation (Structure fournie par l'utilisateur) ---
const footerLinks = [
  {
    title: "Aide et support",
    links: [
      "Contactez-nous",
      "FAQ",
      "Frais de livraison",
      "Paiement sécurisé",
    ],
  },
  {
    title: "Notre identité",
    links: [
      "Qui sommes-nous ?",
      "Nos producteurs engagés",
      "Une cosmétique 100% durable",
      "L'humain, le climat et la biodiversité",
      "Nos boutiques ateliers",
    ],
  },
  {
    title: "Offres et conseils",
    links: [
      "Parrainer un proche",
      "Personnaliser sa base neutre",
      "Recettes",
      "Conseils",
      "L'article du jour",
    ],
  },
  {
    title: "Informations",
    links: [
      "Mentions légales",
      "Politique cookies",
      "Conditions générales de vente",
      "Plan de site",
      "Plan éditorial",
    ],
  },
];

// --- Couleurs et Styles Modernes avec touches marron ---
const FOOTER_BG_GRADIENT = 'bg-gradient-to-b from-amber-50 to-white';
const TEXT_COLOR = '#4a3428'; // Brown tone
const ACCENT_COLOR = '#b2895f'; // Brown accent
const INPUT_BG = 'bg-amber-100';
const BUTTON_BG = 'bg-amber-600 hover:bg-amber-700';

// --- Composant Principal Exporté ---
export const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Placeholder pour la logique d'inscription à la newsletter
    console.log(`Subscription attempt with: ${email}`);
  };

  return (
    <footer className={`w-full ${FOOTER_BG_GRADIENT} font-sans text-base shadow-lg`}>
      {/* Header Section */}
      <div className="text-center py-8 px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Harena Cosmétiques</h1>
        <p className="text-gray-600 text-sm md:text-base">Votre partenaire pour une beauté naturelle et durable</p>
      </div>

      {/* Newsletter Section */}
      <div className="py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4" style={{ color: TEXT_COLOR }}>
            Inscrivez-vous à la newsletter
          </h2>
          <p className="mb-6 text-gray-700 max-w-2xl mx-auto">
            Restez informé(e) de nos nouveautés et offres spéciales pour passer facilement à un mode de vie au naturel.
          </p>

          {/* Formulaire */}
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Saisissez votre email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`flex-grow py-3 px-4 ${INPUT_BG} text-gray-700 outline-none placeholder-gray-500 rounded-lg border border-gray-300 focus:border-${ACCENT_COLOR} focus:ring-2 focus:ring-${ACCENT_COLOR} transition duration-200`}
              required
            />
            <button
              type="submit"
              className={`px-6 py-3 ${BUTTON_BG} text-white font-medium rounded-lg transition duration-200 transform hover:scale-105 shadow-md`}
              aria-label="S'inscrire à la newsletter"
            >
              S'inscrire
            </button>
          </form>
        </div>
      </div>

      {/* Links Section */}
      <div className="py-8 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {footerLinks.map((section) => (
            <div key={section.title} className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b-2 border-stone-500 pb-2">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-600 hover:text-amber-600 transition duration-200 text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="py-4 px-4 bg-gray-100 text-center">
        <p className="text-gray-500 text-sm">
          © 2023 Harena Cosmétiques. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
