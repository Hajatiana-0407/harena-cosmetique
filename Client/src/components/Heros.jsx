'use client'

import React from 'react'
import { Leaf, Sparkles, Globe, ChevronDown, ArrowRight } from 'lucide-react'
import hero_image from '../../public/image/heros.jpg'

export default function Heros() {
  return (
    <div className="relative h-screen min-h-screen w-full overflow-hidden bg-[#1a1a1a]">
      {/* Background Image avec Zoom lent (Animation Ken Burns) */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={hero_image}
          alt="Beauté Naturelle"
          className="h-full w-full object-cover object-center animate-slow-zoom"
        />
        {/* Overlay sophistiqué : dégradé radial pour un effet de focus central */}
        <div className="absolute inset-0 bg-gradient-to-tr from-stone-900/80 via-stone-900/20 to-transparent"></div>
      </div>

      {/* Particules animées discrètes (effet de poussière d'or) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-1 h-1 bg-amber-200 rounded-full animate-ping opacity-40"></div>
        <div className="absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-amber-100 rounded-full animate-pulse opacity-30 shadow-[0_0_10px_white]"></div>
        <div className="absolute bottom-1/3 left-1/2 w-1 h-1 bg-white rounded-full animate-bounce opacity-20"></div>
      </div>

      <div className="relative z-10 h-full max-w-7xl mx-auto px-6 lg:px-12 flex flex-col justify-center">
        <div className="max-w-3xl">
          {/* Label Animé */}
          <div className="flex items-center gap-3 mb-6 overflow-hidden">
            <span className="h-[1px] w-8 bg-amber-400 animate-slide-in-left"></span>
            <span className="text-amber-200 tracking-[0.4em] uppercase text-[10px] sm:text-xs font-medium animate-fade-in">
              L'essence de la terre, révélée
            </span>
          </div>

          <h1 className="text-white leading-tight">
            <span className="block text-5xl md:text-7xl lg:text-8xl font-serif italic mb-2 drop-shadow-lg">
              Beauté Naturelle
            </span>
            <span className="block text-2xl md:text-3xl lg:text-4xl font-light tracking-[0.2em] text-stone-200 uppercase font-sans">
              Éclat Durable & Pur
            </span>
          </h1>

          <p className="mt-8 text-stone-200/90 text-lg md:text-xl font-light leading-relaxed max-w-xl animate-fade-in-up">
            Sublimez votre rituel quotidien avec nos soins artisanaux. 
            Une expérience sensorielle où la nature rencontre l'élégance.
          </p>

          {/* Boutons avec interactions */}
          <div className="mt-10 flex flex-col sm:flex-row gap-5">
            <a
              href="/catalogue"
              className="group relative px-10 py-4 bg-amber-700 text-white text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:bg-amber-800 flex items-center justify-center gap-2 overflow-hidden shadow-xl"
            >
              <span className="relative z-10">Explorer la collection</span>
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-2" />
            </a>
            <a
              href="/blog"
              className="px-10 py-4 border border-white/30 text-white text-xs font-bold tracking-[0.2em] uppercase backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-stone-900 flex items-center justify-center"
            >
              Notre Savoir-faire
            </a>
          </div>
        </div>

        {/* Section Valeurs avec Icônes Lucide */}
        <div className="absolute bottom-12 left-6 lg:left-12 right-6 grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-white/10">
          <div className="flex items-center gap-4 group cursor-default">
            <div className="p-2 rounded-full bg-white/5 group-hover:bg-amber-500/20 transition-colors duration-500">
              <Leaf size={22} className="text-amber-400" />
            </div>
            <div>
              <p className="text-white text-xs font-bold tracking-widest uppercase">100% Organique</p>
              <p className="text-stone-400 text-[10px] mt-0.5">Certifié sans additifs</p>
            </div>
          </div>

          <div className="flex items-center gap-4 group cursor-default">
            <div className="p-2 rounded-full bg-white/5 group-hover:bg-amber-500/20 transition-colors duration-500">
              <Sparkles size={22} className="text-amber-400" />
            </div>
            <div>
              <p className="text-white text-xs font-bold tracking-widest uppercase">Fait Main</p>
              <p className="text-stone-400 text-[10px] mt-0.5">Artisanat local & éthique</p>
            </div>
          </div>

          <div className="flex items-center gap-4 group cursor-default">
            <div className="p-2 rounded-full bg-white/5 group-hover:bg-amber-500/20 transition-colors duration-500">
              <Globe size={22} className="text-amber-400" />
            </div>
            <div>
              <p className="text-white text-xs font-bold tracking-widest uppercase">Éco-Engagé</p>
              <p className="text-stone-400 text-[10px] mt-0.5">Packaging biodégradable</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Down Animé */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 opacity-50">
        <span className="text-[9px] uppercase tracking-[0.3em] text-white">Scroll</span>
        <ChevronDown size={20} className="text-white animate-bounce" />
      </div>

      {/* Styles d'animation personnalisés */}
      <style jsx>{`
        @keyframes slow-zoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
        .animate-slow-zoom {
          animation: slow-zoom 20s ease-out forwards;
        }
        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out forwards;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-in-left {
          animation: slideInLeft 0.8s ease-out forwards;
        }
        @keyframes slideInLeft {
          from { width: 0; }
          to { width: 32px; }
        }
      `}</style>
    </div>
  )
}