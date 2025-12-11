'use client'

import hero_image from '../../public/image/heros.jpg'

export default function Heros() {
  return (
    <div
      className="hero h-screen relative overflow-hidden"
      style={{
        backgroundImage: `url(${hero_image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Overlay with brown gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-amber-900/80 via-brown-800/70 to-transparent"></div>

      {/* Animated background elements in brown tones */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-amber-600/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-32 right-20 w-48 h-48 bg-brown-500/15 rounded-full blur-2xl animate-bounce"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-yellow-700/10 rounded-full blur-lg animate-ping"></div>
      </div>

      <div className="hero-content text-white text-center relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Main heading with brown gradient - responsive text sizes */}
          <h1 className="mb-4 sm:mb-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight animate-fade-in-up">
            <span className="bg-gradient-to-r from-amber-400 via-brown-400 to-yellow-600 bg-clip-text text-transparent">
              Beauté Naturelle
            </span>
            <br />
            <span className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light">
              Redécouvrez Votre Éclat
            </span>
          </h1>

          {/* Subtitle - responsive text and spacing */}
          <p className="mb-6 sm:mb-8 text-lg sm:text-xl md:text-2xl font-light leading-relaxed animate-fade-in-up animation-delay-200 px-2 sm:px-0">
            Découvrez notre collection exclusive de cosmétiques bio et artisanaux,
            conçus pour sublimer votre beauté naturelle avec des ingrédients purs et respectueux de l'environnement.
          </p>

          {/* Call-to-action buttons in brown theme - responsive sizing */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 animate-fade-in-up animation-delay-400">
            <a
              className="btn bg-gradient-to-r from-amber-600 to-brown-600 hover:from-amber-700 hover:to-brown-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-0 w-full sm:w-auto"
              href="/catalogue"
            >
              Explorer la Collection
            </a>
            <a
              href="/blog"
              className="btn btn-outline btn-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg border-2 border-white text-white hover:bg-white hover:text-amber-900 transition-all duration-300 w-full sm:w-auto"
            >
              En Savoir Plus
            </a>
          </div>

          {/* Additional features highlight with brown accents - responsive grid and spacing */}
          <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 text-center animate-fade-in-up animation-delay-600">
            <div className="bg-amber-900/20 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-amber-600/30">
              <div className="text-2xl sm:text-3xl mb-2">🌿</div>
              <h3 className="font-semibold text-base sm:text-lg text-amber-100">100% Naturel</h3>
              <p className="text-xs sm:text-sm opacity-90 text-amber-200">Ingrédients bio certifiés</p>
            </div>
            <div className="bg-brown-800/20 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-brown-500/30">
              <div className="text-2xl sm:text-3xl mb-2">✨</div>
              <h3 className="font-semibold text-base sm:text-lg text-brown-100">Artisanal</h3>
              <p className="text-xs sm:text-sm opacity-90 text-brown-200">Fabriqué avec soin</p>
            </div>
            <div className="bg-yellow-800/20 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-yellow-600/30 sm:col-span-2 lg:col-span-1">
              <div className="text-2xl sm:text-3xl mb-2">💚</div>
              <h3 className="font-semibold text-base sm:text-lg text-yellow-100">Éco-responsable</h3>
              <p className="text-xs sm:text-sm opacity-90 text-yellow-200">Respectueux de l'environnement</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator in brown - responsive sizing */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-amber-400 rounded-full flex justify-center">
          <div className="w-1 h-2 sm:w-1 sm:h-3 bg-amber-400 rounded-full mt-1 sm:mt-2 animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}
