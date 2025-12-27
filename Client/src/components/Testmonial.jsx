// src/pages/AboutPage.jsx

import React from 'react';
// Assurez-vous d'avoir installé: npm install lucide-react framer-motion
import { Leaf, ShieldCheck, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const AboutPage = () => {
  // Palette de couleurs
  const colors = {
    primary: 'text-[#4a3728]', 
    accent: 'bg-[#c5a059]',   
    accentGradient: 'from-[#c5a059] to-[#e6c68b]', // Nouveau dégradé doré
    lightBg: 'bg-[#faf9f6]',  
  };

  // --- Configurations des Animations (Variants) ---

  // Animation simple de bas en haut
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } // Easing doux
    }
  };

  // Animation pour les éléments qui viennent des côtés
  const slideInLeft = {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } }
  };
  const slideInRight = {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } }
  };

  // Conteneur pour afficher les éléments les uns après les autres
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.2 }
    }
  };

  return (
    // Ajout d'un overflow-hidden global pour éviter les scrollbars horizontales pendant les anims
    <div className={`${colors.lightBg} min-h-screen font-sans text-stone-800 overflow-hidden relative`}>
      
      {/* --- DÉCORATION D'ARRIÈRE-PLAN ANIMÉE (Subtil) --- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
         <motion.div 
           animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
           transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
           className="absolute top-[20%] left-[10%] w-96 h-96 bg-[#c5a059]/5 rounded-full blur-3xl mix-blend-multiply" 
         />
         <motion.div 
           animate={{ x: [0, -80, 0], y: [0, 60, 0] }}
           transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
           className="absolute bottom-[30%] right-[5%] w-[30rem] h-[30rem] bg-[#c5a059]/10 rounded-full blur-3xl mix-blend-multiply" 
         />
      </div>

      {/* --- HERO SECTION PARALLAX & ANIMÉE --- */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Image de fond avec léger effet de zoom au chargement */}
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 bg-cover bg-center bg-fixed z-0"
          style={{ backgroundImage: 'url(/image/beauty.jpg)' }} // Assurez-vous que ce chemin est correct
        >
           {/* Overlay effet "particules/poussière d'or" subtil (CSS pur) */}
           <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0idHJhbnNwYXJlbnQiLz48Y2lyY2xlIGN4PSIxMDAiIGN5PSIxMDAiIHI9IjEiIGZpbGw9InJnYmEoMjU1LCAyNTUsIDI1NSwgMC4zKSIvPjxjaXJjbGUgY3g9IjMwMCIgY3k9IjMwMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjMpIi8+PC9zdmc+')] opacity-50 animate-pulse-slow"></div>
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-[#faf9f6]/10 z-10"></div>
        
        {/* Contenu Hero animé en séquence */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="relative z-20 text-center px-4"
        >
          <motion.span variants={fadeInUpVariants} className="inline-block px-4 py-1 mb-6 text-xs font-medium tracking-[0.3em] uppercase text-white/90 border-b border-white/30">
            Depuis l'île rouge
          </motion.span>
          <motion.h1 variants={fadeInUpVariants} className="text-6xl md:text-8xl font-serif text-white mb-8 italic drop-shadow-lg">
            L'Essence de Harèna
          </motion.h1>
          {/* Ligne séparatrice animée */}
          <motion.div variants={{ hidden: { width: 0 }, visible: { width: 80, transition: { duration: 1, delay: 0.5 } } }} className={`h-1 ${colors.accent} mx-auto mb-8`}></motion.div>
          
          <motion.p variants={fadeInUpVariants} className="text-lg md:text-xl text-stone-100 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-md">
            Une quête de beauté authentique, puisant sa force brute dans la biodiversité exceptionnelle de Madagascar.
          </motion.p>
        </motion.div>
        
        {/* Indicateur de scroll */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 z-20 animate-bounce text-white/70"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
        </motion.div>
      </section>

      {/* --- NOTRE HISTOIRE (Timeline Animée au Scroll) --- */}
      <section className="max-w-6xl mx-auto px-6 py-32 relative z-10">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUpVariants}
          className="text-center mb-20"
        >
          <h2 className={`text-4xl md:text-6xl font-serif ${colors.primary} mb-4`}>Notre Voyage</h2>
          <p className="text-[#c5a059] uppercase tracking-widest text-sm font-medium">L'évolution d'un engagement</p>
        </motion.div>

        <div className="relative">
          {/* Ligne centrale */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gradient-to-b from-transparent via-[#c5a059]/30 to-transparent hidden md:block"></div>

          <div className="space-y-32">
            {/* Étape 1 : Naissance (Vient de la gauche) */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-150px" }} // Déclenche l'anim un peu avant que l'élément soit au centre
              className="relative flex flex-col md:flex-row items-center justify-between group"
            >
              <motion.div variants={slideInLeft} className="md:w-[45%] mb-10 md:mb-0 text-right md:pr-12">
                <h3 className={`text-3xl font-serif ${colors.primary} mb-4`}>Naissance</h3>
                <p className="text-stone-600 leading-relaxed text-lg font-light">
                  Tout commence par une passion profonde pour les rituels de soins ancestraux malgaches et la volonté de partager ces trésors botaniques avec le monde.
                </p>
              </motion.div>
              
              {/* Point central */}
              <motion.div 
                initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
                className={`absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-r ${colors.accentGradient} border-4 border-[#faf9f6] shadow-xl z-10 hidden md:block`}
              ></motion.div>

              {/* Image Container Animé (Remplacement Gif moderne) */}
              <motion.div variants={slideInRight} className="md:w-[45%] md:pl-12">
                {/* Le conteneur a une bordure animée grâce au dégradé en arrière-plan qui tourne */}
                <div className="relative p-[3px] rounded-3xl overflow-hidden bg-gradient-to-r from-[#c5a059] via-[#e6c68b] to-[#c5a059] animate-spin-slow shadow-lg">
                  <div className="relative h-64 rounded-[22px] overflow-hidden bg-white">
                    <img src="./image/miniIMG.jpeg" alt="Inspiration Nature" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    {/* Effet de brillance sur l'image */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#c5a059]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Étape 2 : Engagement BIO (Vient de la droite) */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-150px" }}
              className="relative flex flex-col md:flex-row-reverse items-center justify-between group"
            >
              <motion.div variants={slideInRight} className="md:w-[45%] mb-10 md:mb-0 text-left md:pl-12">
                <h3 className={`text-3xl font-serif ${colors.primary} mb-4`}>Engagement BIO</h3>
                <p className="text-stone-600 leading-relaxed text-lg font-light">
                  Nous avons scellé notre promesse : des produits certifiés, utilisant uniquement des huiles végétales pures, sauvages et des ingrédients éthiques.
                </p>
              </motion.div>
              
               {/* Point central */}
              <motion.div 
                 initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
                className={`absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-r ${colors.accentGradient} border-4 border-[#faf9f6] shadow-xl z-10 hidden md:block`}
              ></motion.div>

               {/* Image Container Animé */}
              <motion.div variants={slideInLeft} className="md:w-[45%] md:pr-12">
                 {/* Bordure animée inversée */}
                 <div className="relative p-[3px] rounded-3xl overflow-hidden bg-gradient-to-l from-[#c5a059] via-[#e6c68b] to-[#c5a059] animate-spin-slow-reverse shadow-lg">
                  <div className="relative h-64 rounded-[22px] overflow-hidden bg-white">
                    <img src="./image/miniIMG.jpeg" alt="Certification Bio" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                     <div className="absolute inset-0 bg-gradient-to-tl from-[#c5a059]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- VALEURS (Apparition en cascade) --- */}
      <section className="max-w-6xl mx-auto px-6 py-32 text-center relative z-10 bg-white/50 backdrop-blur-md rounded-[3rem] my-12 shadow-sm border border-white/40">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`text-4xl font-serif mb-20 ${colors.primary}`}
        >
          Nos Valeurs Fondamentales
        </motion.h2>
        
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-16"
        >
          {[
            { icon: <Leaf />, title: "Naturalité Absolue", desc: "100% Ingrédients d'origine naturelle, puisés au cœur de Madagascar." },
            { icon: <ShieldCheck />, title: "Éthique & Respect", desc: "Partenariats durables et commerce équitable avec nos producteurs locaux." },
            { icon: <Sparkles />, title: "Qualité Précieuse", desc: "L'excellence sans compromis, pour une efficacité pure et prouvée." }
          ].map((valeur, idx) => (
            <motion.div key={idx} variants={fadeInUpVariants} className="group cursor-default relative">
              {/* Cercle d'icône avec effet de pulsation au survol */}
              <div className={`relative w-28 h-28 rounded-full bg-gradient-to-br ${colors.accentGradient} text-white flex items-center justify-center mx-auto mb-8 transition-all duration-500 group-hover:scale-110 shadow-xl group-hover:shadow-2xl group-hover:shadow-[#c5a059]/30`}>
                 {/* Petit anneau animé autour de l'icône */}
                 <div className="absolute inset-0 rounded-full border-2 border-white/50 scale-110 opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-700 ease-out"></div>
                {React.cloneElement(valeur.icon, { size: 40, strokeWidth: 1.5, className: "relative z-10" })}
              </div>
              <h4 className={`text-2xl font-serif ${colors.primary} mb-3`}>{valeur.title}</h4>
              <p className="text-stone-500 font-light leading-relaxed px-4">{valeur.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* --- FOOTER CTA (Avec effet de survol) --- */}
      <footer className="relative bg-[#4a3728] text-white py-24 text-center overflow-hidden">
        {/* Décoration de fond du footer */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#c5a059] to-transparent"></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <p className="text-[#c5a059] mb-6 tracking-[0.2em] uppercase text-sm font-medium">Prêt à sublimer votre peau ?</p>
          <h2 className="text-4xl md:text-5xl font-serif mb-10 italic">Rejoignez l'expérience Harèna</h2>
          
          {/* Bouton moderne avec effet de brillance au survol */}
          <button className="group relative px-10 py-4 bg-gradient-to-r from-[#c5a059] to-[#d4b070] text-[#4a3728] font-medium rounded-full overflow-hidden transition-all hover:shadow-[0_0_30px_-5px_rgba(197,160,89,0.7)] hover:scale-105 active:scale-95">
            <span className="relative z-10 flex items-center">
              Découvrir nos produits
              <Sparkles size={18} className="ml-2 group-hover:rotate-12 transition-transform" />
            </span>
            {/* Effet de reflet qui passe sur le bouton */}
            <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent transform -skew-x-12 transition-all duration-700 group-hover:left-[100%]"></div>
          </button>
        </motion.div>
      </footer>
    </div>
  );
}

export default AboutPage;