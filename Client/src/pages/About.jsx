import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// ====================================================================
// ANIMATION REUSABLE - EFFET DE RÉVÉLATION DOUCE
// ====================================================================
const Reveal = ({ children, delay = 0, direction = 'up' }) => {
  const directions = {
    up: { y: 50, x: 0 },
    down: { y: -50, x: 0 },
    left: { x: 50, y: 0 },
    right: { x: -50, y: 0 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};

function About() {
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -150]);

  const primaryColor = 'text-[#6b4226]';
  const accentColor = 'bg-[#8b5e3c]';

  return (
    <div className="relative bg-[#fdfcf9] overflow-hidden text-[#4a3a2e] font-sans">
      
      {/* --- BACKGROUND DECORATIVE ELEMENTS --- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        <motion.div style={{ y: yParallax }} className="absolute top-[10%] -left-20 opacity-[0.03] text-[25vw] font-serif font-black leading-none">
          SOINS
        </motion.div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#f3e9dc] rounded-full blur-[120px] opacity-40 -translate-y-1/2 translate-x-1/2" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-32 relative z-10">
        
        {/* --- HERO SECTION - FOCUS COSMÉTIQUE --- */}
        <section className="mb-40 grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8">
            <Reveal direction="left">
              <span className={`uppercase tracking-[0.5em] text-xs font-bold ${primaryColor} opacity-60 mb-6 block`}>
                L'Alchimie du Visage
              </span>
              <h1 className={`text-6xl md:text-[7rem] font-serif leading-[0.9] ${primaryColor} tracking-tighter mb-10`}>
                Science <br /> 
                <span className="italic font-light text-stone-400">Dermique.</span>
              </h1>
            </Reveal>
          </div>
          <div className="lg:col-span-4 lg:pt-20">
            <Reveal delay={0.3}>
              <p className="text-xl text-stone-500 font-light leading-relaxed border-l-2 border-[#d4bfa4] pl-8 italic">
                "De la poudre de perle végétale aux crèmes onctueuses de nuit, nous formulons le futur de votre épiderme avec la précision du vivant."
              </p>
            </Reveal>
          </div>
        </section>

        {/* --- HISTOIRE & FORMULATIONS --- */}
        <section className="mb-40">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <Reveal direction="right" className="relative group">
              <div className="absolute -inset-6 border border-[#d4bfa4] rounded-sm transition-transform duration-700 group-hover:rotate-2" />
              <div className="relative overflow-hidden shadow-2xl bg-stone-100">
                <img 
                  src="https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=1000" 
                  alt="Texture de crème" 
                  className="w-full h-[600px] object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-1000"
                />
              </div>
              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-10 -right-10 bg-[#6b4226] text-white p-10 hidden md:block"
              >
                <p className="text-4xl font-serif">PH 5.5</p>
                <p className="text-[10px] uppercase tracking-widest opacity-70">Équilibre Cutané</p>
              </motion.div>
            </Reveal>

            <div className="space-y-16">
              {[
                { title: "Crèmes Onctueuses", desc: "Des émulsions riches en beurre de karité et huiles essentielles précieuses pour une hydratation cellulaire profonde.", num: "01" },
                { title: "Poudres de Visage", desc: "Une micronisation fine de plantes endémiques pour purifier et matifier le teint sans obstruer les pores.", num: "02" },
                { title: "Sérums Soignants", desc: "Concentrés actifs ciblant les rides, les taches et l'éclat pour une régénération visible nuit après nuit.", num: "03" }
              ].map((item, index) => (
                <Reveal key={index} delay={index * 0.2} direction="left">
                  <div className="flex gap-8 group">
                    <span className="text-sm font-bold text-[#d4bfa4] mt-1">{item.num}</span>
                    <div>
                      <h4 className={`text-2xl font-serif ${primaryColor} mb-4 group-hover:pl-4 transition-all duration-500`}>
                        {item.title}
                      </h4>
                      <p className="text-stone-500 font-light leading-relaxed max-w-sm">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* --- MISSION & VISION (BENTO COSMÉTIQUE) --- */}
        <div className="grid md:grid-cols-2 gap-6 mb-40">
          <Reveal direction="up">
            <div className="group h-full p-12 bg-white border border-[#d4bfa4]/20 hover:border-[#6b4226]/30 transition-all duration-500 flex flex-col justify-between min-h-[400px]">
              <div className="w-12 h-12 bg-[#6b4226]/5 flex items-center justify-center rounded-full mb-8 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-[#6b4226]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/></svg>
              </div>
              <div>
                <h3 className={`text-4xl font-serif mb-6 ${primaryColor}`}>Notre Laboratoire</h3>
                <p className="text-stone-500 leading-relaxed font-light text-lg italic">
                  Fusionner l'herboristerie ancestrale de Madagascar avec les standards de la dermatologie moderne pour des crèmes haute performance.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.2}>
            <div className={`h-full p-12 ${accentColor} text-[#fdf6ec] flex flex-col justify-between min-h-[400px] relative overflow-hidden`}>
              <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center text-[15rem] font-serif italic select-none">P</div>
              <div className="relative z-10">
                <h3 className="text-4xl font-serif mb-6">Engagement Peau</h3>
                <p className="text-[#fdf6ec]/80 leading-relaxed font-light text-lg">
                  Garantir des soins sans silicones, sans parabènes et sans agents comédogènes. Une beauté saine pour une peau qui respire vraiment.
                </p>
              </div>
              <div className="relative z-10 w-full h-[1px] bg-[#fdf6ec]/20 mt-8" />
            </div>
          </Reveal>
        </div>

        {/* --- VALEURS SENSORIELLES --- */}
        <section className="py-24 border-y border-stone-200">
           <div className="text-center mb-16">
              <h2 className={`text-xs uppercase tracking-[0.4em] font-bold ${primaryColor}`}>Nos Standards de Formulation</h2>
           </div>
           <div className="grid lg:grid-cols-3 gap-16">
              {[
                { title: "Textures Aériennes", text: "Des poudres et des crèmes conçues pour une absorption immédiate, sans fini gras." },
                { title: "Phyto-Actifs", text: "Utilisation exclusive de plantes bio-sourcées à haute concentration dermatologique." },
                { title: "Soin Global", text: "Une approche qui soigne l'épiderme tout en apaisant l'esprit par des parfums naturels." }
              ].map((val, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="text-center group">
                    <h5 className={`text-xl font-serif mb-4 ${primaryColor} group-hover:italic transition-all`}>{val.title}</h5>
                    <p className="text-stone-400 text-sm font-light leading-relaxed">{val.text}</p>
                  </div>
                </Reveal>
              ))}
           </div>
        </section>

        {/* --- CTA FINAL --- */}
        <section className="mt-40 text-center relative py-20">
          <Reveal>
            <h2 className={`text-4xl md:text-6xl font-serif ${primaryColor} mb-10`}>
              Révélez votre <br /> éclat naturel.
            </h2>
            <div className="flex flex-col md:flex-row justify-center items-center gap-6">
              <a 
                href="/blog" 
                className="px-10 py-5 bg-[#6b4226] text-[#fdf6ec] text-xs font-bold uppercase tracking-widest hover:bg-[#4a2d1a] transition-all duration-500 shadow-xl"
              >
                Diagnostic de peau
              </a>
              <a 
                href="/produit" 
                className="px-10 py-5 border border-[#6b4226] text-[#6b4226] text-xs font-bold uppercase tracking-widest hover:bg-[#6b4226] hover:text-white transition-all duration-500"
              >
                Découvrir les soins
              </a>
            </div>
          </Reveal>
        </section>

      </div>
    </div>
  );
}

export default About;