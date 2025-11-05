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

// --- Couleurs et Styles Tailwind (Basés sur l'image fournie) ---
const FOOTER_BG_COLOR = 'rgb(250, 246, 241)';
const TEXT_COLOR = '#4a3428';
const INPUT_BORDER_COLOR = '#b2895f';

// --- Composant Principal Exporté ---
export const Footer = () => {
  const [email, setEmail] = useState('');
  
  const handleSubscribe = (e) => {
      e.preventDefault();
      // Placeholder pour la logique d'inscription à la newsletter
      console.log(`Subscription attempt with: ${email}`);
  };

  return (
    <footer className="w-full bg-white font-sans text-base">
        <div className='text-left text-4xl font-bold tex text-stone-900 p-5 pt-10'>Harena Cosmétiques </div>

        {/* 1. Bloc Newsletter (Responsive) */}
        <div 
          className="py-5 md:py-3 px-4"
        >
            <div className="max-w-7xl mx-auto">
                <h2 
                    className="text-2xl md:text-3xl font-bold mb-4 text-left" 
                    style={{ color: TEXT_COLOR }}
                >
                    Inscrivez-vous à la newsletter
                </h2>
                
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                    {/* Texte et Formulaire */}
                    <div className="md:w-1/2">
                        <p className="mb-4 text-gray-700 text-left">
                            Restez informé(e) de nos nouveautés et offres spéciales pour passer facilement à un mode de vie au naturel.
                        </p>
                        
                        {/* Formulaire */}
                        <form onSubmit={handleSubscribe} className="flex max-w-xs sm:max-w-sm w-full">
                            <input
                                type="email"
                                placeholder="Saisissez votre email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                // Classes pour assurer l'alignement à gauche et la flexibilité
                                className={`flex-grow py-3 px-3 bg-stone-200 text-gray-700 outline-none placeholder-gray-500 text-left`}
                                style={{ borderBottomColor: INPUT_BORDER_COLOR }}
                                required
                            />
                            <button 
                                type="submit" 
                                className="w-12 h-12 flex items-center justify-center text-white transition duration-200 shrink-0 hover:opacity-90 rounded-none"
                                style={{ backgroundColor: TEXT_COLOR }}
                                aria-label="S'inscrire à la newsletter"
                            >
                                &rarr;
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        {/* 2. Bloc de Liens (Responsive: 2 colonnes par défaut, 4 sur desktop) */}
        <div className="py-8 md:py-12 px-4 bg-white">
            <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-y-8 md:gap-x-8">
                {footerLinks.map((section) => (
                    <div key={section.title} className="space-y-3">
                        <h3 
                            className="text-base font-bold mb-3 text-left" // Titre aligné à gauche
                            style={{ color: TEXT_COLOR }}
                        >
                            {section.title}
                        </h3>
                        <ul className="space-y-2">
                            {section.links.map((link) => (
                                <li key={link} className="text-left">
                                    <a 
                                        href="#" 
                                        className="text-sm text-gray-700 hover:underline transition duration-150"
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
        
        {/* Ligne de fond */}
        <div className="h-4" style={{ backgroundColor: FOOTER_BG_COLOR }}></div>
    </footer>
  );
};


export default Footer