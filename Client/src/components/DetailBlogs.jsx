import React, { useEffect, useState } from 'react';
import { apiIMG } from '../API/pathPicture';
import Header from './Headers';
import Footer from './Footer';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Star, 
  Share2, 
  ChevronLeft, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Clock,
  Link2
} from 'lucide-react';

export default function DetailBlog() {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const selectedArticle = localStorage.getItem('selectedArticle');
    if (selectedArticle) {
      try {
        setArticle(JSON.parse(selectedArticle));
      } catch (error) {
        console.error('Error parsing article data:', error);
      }
    }
    setLoading(false);
    // On s'assure que le navigateur est en haut au chargement
    window.scrollTo(0, 0);
  }, []);

  if (loading) return <div className="h-screen flex items-center justify-center bg-white text-gray-400 font-medium">Chargement...</div>;

  if (!article) return (
    <div className="h-screen flex flex-col items-center justify-center space-y-4">
      <p className="text-xl font-semibold">Article introuvable</p>
      <a href="/blog" className="text-blue-600 underline">Retour au blog</a>
    </div>
  );

  return (
    <div className="w-full h-screen bg-white text-gray-900 pb-20">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-10 pb-20">
        
        {/* Bouton Retour */}
        <a href="/blog" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors mb-10 group">
          <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Retour aux articles
        </a>

        {/* Header de l'article */}
        <header className="mb-10 text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
            {article.titre}
          </h1>
          
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span>{article.temps}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>5 min de lecture</span>
            </div>
            <div className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full text-gray-700">
              <Star size={14} className="fill-amber-400 text-amber-400" />
              <span className="font-bold">{article.note}/5</span>
            </div>
          </div>
        </header>

        {/* IMAGE : Taille équilibrée (Hauteur max 400px) */}
        <div className="w-full mb-12 rounded-3xl overflow-hidden shadow-xl border border-gray-100">
          <img
            src={apiIMG + article.image}
            alt={article.titre}
            className="w-full h-62.5 md:h-100 object-cover"
          />
        </div>

        {/* CONTENU : Zone de texte épurée */}
        <article className="max-w-3xl mx-auto">
          <div 
            className="prose prose-lg max-w-none text-gray-700 leading-relaxed 
                       [&>p]:mb-6 [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:mt-8
                       whitespace-pre-wrap wrap-break-word"
            dangerouslySetInnerHTML={{ __html: article.description }} 
          />

          {/* SECTION PARTAGE MODERNE */}
          <div className="mt-20 p-8 bg-gray-50 rounded-4xl border border-gray-100">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h3 className="font-bold text-lg text-gray-900">Avez-vous aimé cette lecture ?</h3>
                <p className="text-sm text-gray-500">Partagez ce contenu avec votre réseau.</p>
              </div>
              
              <div className="flex gap-3">
                <button className="w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-sm hover:bg-black hover:text-white transition-all">
                  <Facebook size={20} />
                </button>
                <button className="w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-sm hover:bg-black hover:text-white transition-all">
                  <Twitter size={20} />
                </button>
                <button className="w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-sm hover:bg-black hover:text-white transition-all">
                  <Linkedin size={20} />
                </button>
                <button className="w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-sm hover:bg-black hover:text-white transition-all">
                  <Link2 size={20} />
                </button>
              </div>
            </div>
          </div>
        </article>
      </main>

      
    </div>
  );
}