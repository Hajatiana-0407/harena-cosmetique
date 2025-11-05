import React from 'react';
import { FaQuoteLeft } from 'react-icons/fa'; // N'oubliez pas d'installer react-icons : npm install react-icons

// --- 1. Données de Démonstration ---
const testimonialsData = [
  {
    id: 1,
    quote: "Le produit a dépassé toutes mes attentes. L'interface utilisateur est intuitive et très agréable à utiliser au quotidien. Un must-have !",
    authorName: 'Sophie Dubois',
    authorTitle: 'Chef de Projet chez InnovCorp',
    authorImage: 'public/image/team1-free-img.png', // URL de l'image
  },
  {
    id: 2,
    quote: "Un service client exceptionnel ! J'ai obtenu une réponse rapide et efficace à toutes mes questions. Je recommande vivement.",
    authorName: 'Marc Lefevre',
    authorTitle: 'Développeur Full-Stack Indépendant',
    authorImage: 'public/image/team2-free-img.png', // URL de l'image
  },
  {
    id: 3,
    quote: "Un véritable gain de temps pour mon entreprise. L'intégration a été facile et les résultats sont visibles immédiatement. Fantastique !",
    authorName: 'Julie Bernard',
    authorTitle: 'CEO de Marketing Pro',
    authorImage: 'public/image/team3-free-img.png', // URL de l'image
  },
];

// --- 2. Composant de Section Unique ---
const Temoin = () => {
  // Composant interne pour une seule carte (pour rester dans le même fichier)
  const TestimonialCard = ({ quote, authorName, authorTitle, authorImage }) => (
    <div className="flex flex-col p-6 bg-white rounded-xl shadow-xl border-t-4 border-stone-500 hover:shadow-2xl transition-shadow duration-300 h-full">
      
      {/* Icône de citation */}
      <FaQuoteLeft className="text-stone-500 text-3xl mb-4" />

      {/* Texte du témoignage */}
      <p className="text-gray-700 text-lg italic mb-6 flex-grow">
        "{quote}"
      </p>

      {/* Informations de l'auteur */}
      <div className="flex items-center mt-auto">
        {/* Image de l'auteur (Avatar) */}
        <img
          src={authorImage}
          alt={`Photo de ${authorName}`}
          className="w-12 h-12 rounded-full object-cover mr-4 ring-2 ring-stone-500"
        />
        <div>
          {/* Nom de l'auteur */}
          <p className="text-gray-900 font-bold text-base text-left">{authorName}</p>
          {/* Titre/Poste */}
          <p className="text-stone-900 text-sm text-left">{authorTitle}</p>
        </div>
      </div>
    </div>
  );
  
  // Rendu de la section principale
  return (
    <section className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* En-tête de la section */}
        <div className="text-center mb-16">
          <h2 className="text-base text-stone-600 font-semibold tracking-wide uppercase">
            Ce que disent nos clients
          </h2>
          <p className="mt-2 text-4xl font-extrabold tracking-tight text-stone-900 sm:text-5xl">
            La confiance, ça se bâtit
          </p>
        </div>

        {/* Grille de témoignages réactive */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {testimonialsData.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              quote={testimonial.quote}
              authorName={testimonial.authorName}
              authorTitle={testimonial.authorTitle}
              authorImage={testimonial.authorImage}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Temoin;