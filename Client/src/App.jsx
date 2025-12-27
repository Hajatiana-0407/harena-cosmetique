import './App.css';
import React, { Suspense, useEffect, useState } from 'react';

// 1. Importer les composants du layout
import Headers from './components/Headers';
import Footer from './components/Footer';

// 2. Importer les pages avec lazy loading
const Home = React.lazy(() => import('./pages/Home'));
const About = React.lazy(() => import('./pages/About'));
const Contact = React.lazy(() => import('./pages/Contact'));
const Blog = React.lazy(() => import('./pages/Blog'));
const Produit = React.lazy(() => import('./pages/Produit'));
const PanierComponent = React.lazy(() => import('./pages/Panier'));
const Catalogue = React.lazy(() => import('./pages/Catalogue'));
const LoginPage = React.lazy(() => import('./pages/Login'));
const SignInPage = React.lazy(() => import('./pages/Signin'));
const FavorisPage = React.lazy(() => import('./pages/Favoris'));

// Nouvelles pages
const Parrainer = React.lazy(() => import('./pages/Parrainer'));
const Personnaliser = React.lazy(() => import('./pages/Personnaliser'));
const Recettes = React.lazy(() => import('./pages/Recettes'));
const Conseils = React.lazy(() => import('./pages/Conseils'));
const ArticleJour = React.lazy(() => import('./pages/ArticleJour'));
const MentionsLegales = React.lazy(() => import('./pages/MentionsLegales'));
const PolitiqueCookies = React.lazy(() => import('./pages/PolitiqueCookies'));
const CGV = React.lazy(() => import('./pages/CGV'));
const PlanSite = React.lazy(() => import('./pages/PlanSite'));
const PlanEditorial = React.lazy(() => import('./pages/PlanEditorial'));
const ProducteursEngages = React.lazy(() => import('./pages/ProducteursEngages'));
const CosmetiqueDurable = React.lazy(() => import('./pages/CosmetiqueDurable'));
const HumainClimat = React.lazy(() => import('./pages/HumainClimat'));
const BoutiquesAteliers = React.lazy(() => import('./pages/BoutiquesAteliers'));

// 3. Importer les outils de routage
import { Routes, Route, useNavigate } from "react-router-dom";
import { FaArrowUp } from 'react-icons/fa';
import Error from './components/Error';
import DetailProduit from './components/DetailProduit';
import Faq from './components/Faq';
import MvolaPaymentForm from './pages/Paiement';
import PaiementList from './components/test';
import ComptePage from './pages/compte';
import MessengerInterface from './components/Messenger';
import DetailBlog from './components/DetailBlogs';
import PapiPayForm from './components/PapiPayForm';
import Success from './pages/Success';
import Failure from './pages/Failure';

// Loading component
const LoadingFallback = () => (
  <div className="flex justify-center items-center min-h-screen">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5C4033] mx-auto"></div>
      <p className="mt-4 text-[#5C4033]">Chargement...</p>
    </div>
  </div>
);

// Layout pour les pages normales
function Layout({ children }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <Headers />
      <main className=''>{children}

      <Footer />
      </main>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-[#5C4033] text-white p-3 rounded-full shadow-lg hover:bg-[#4a3328] transition-all duration-300 ease-in-out transform hover:scale-110 z-50"
          aria-label="Remonter en haut"
        >
          <FaArrowUp className="w-5 h-5" />
        </button>
      )}
    </>
  );
}

// Composant pour gérer l'authentification
function AppContent() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const client = localStorage.getItem('client');
      const currentPath = window.location.pathname;

      // Define protected routes that require login
      const protectedRoutes = ['/panier', '/compte', '/paiement', '/messenger'];

      // Check if current path is protected
      const isProtectedRoute = protectedRoutes.some(route =>
        currentPath === route || currentPath.startsWith(route + '/')
      );

      // If not logged in and on a protected route, redirect to login
      if (!client && isProtectedRoute) {
        navigate('/login');
      } else if (client && (currentPath === '/login' || currentPath === '/signup')) {
        // If logged in and on login/signup, redirect to home
        navigate('/');
      }
    };

    checkAuth();

    // Écouter les changements d'authentification
    window.addEventListener('authChange', checkAuth);

    return () => {
      window.removeEventListener('authChange', checkAuth);
    };
  }, [navigate]);

  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        {/* Routes avec Layout */}
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/a-propos"
          element={
            <Layout>
              <About />
            </Layout>
          }
        />
        <Route
          path="/contact"
          element={
            <Layout>
              <Contact />
            </Layout>
          }
        />
        <Route
          path="/blog"
          element={
            <Layout>
              <Blog />
            </Layout>
          }
        />
        <Route
          path="/produit"
          element={
            <Layout>
              <Produit />
            </Layout>
          }
        />
        <Route
          path="/produit/:id"
          element={
            <Layout>
              <DetailProduit />
            </Layout>
          }
        />
        {/* <Route
          path="/payer"
          element={
            <Layout>
              <PapiPayForm />
            </Layout>
          }
        /> */}
        <Route
          path="/success"
          element={
            <Success />
          }
        />
        <Route
          path="/failure"
          element={
            <Failure />
          }
        />
        <Route
          path="/catalogue"
          element={
            <Layout>
              <Catalogue />
            </Layout>
          }
        />
        <Route
          path="/panier"
          element={
            <Layout>
              <PanierComponent />
            </Layout>
          }
        />
        <Route
          path="/details-produit"
          element={
            <Layout>
              <DetailProduit />
            </Layout>
          }
        />
        <Route
          path="/faq"
          element={
            <Layout>
              <Faq />
            </Layout>
          }
        />
        <Route
          path="/favoris"
          element={
            <Layout>
              <FavorisPage />
            </Layout>
          }
        />

        {/* Nouvelles routes avec Layout */}
        <Route
          path="/parrainer"
          element={
            <Layout>
              <Parrainer />
            </Layout>
          }
        />
        <Route
          path="/personnaliser"
          element={
            <Layout>
              <Personnaliser />
            </Layout>
          }
        />
        <Route
          path="/recettes"
          element={
            <Layout>
              <Recettes />
            </Layout>
          }
        />
        <Route
          path="/conseils"
          element={
            <Layout>
              <Conseils />
            </Layout>
          }
        />
        <Route
          path="/article-jour"
          element={
            <Layout>
              <ArticleJour />
            </Layout>
          }
        />
        <Route
          path="/mentions-legales"
          element={
            <Layout>
              <MentionsLegales />
            </Layout>
          }
        />
        <Route
          path="/politique-cookies"
          element={
            <Layout>
              <PolitiqueCookies />
            </Layout>
          }
        />
        <Route
          path="/cgv"
          element={
            <Layout>
              <CGV />
            </Layout>
          }
        />
        <Route
          path="/plan-site"
          element={
            <Layout>
              <PlanSite />
            </Layout>
          }
        />
        <Route
          path="/plan-editorial"
          element={
            <Layout>
              <PlanEditorial />
            </Layout>
          }
        />
        <Route
          path="/producteurs-engages"
          element={
            <Layout>
              <ProducteursEngages />
            </Layout>
          }
        />
        <Route
          path="/cosmetique-durable"
          element={
            <Layout>
              <CosmetiqueDurable />
            </Layout>
          }
        />
        <Route
          path="/humain-climat-biodiversite"
          element={
            <Layout>
              <HumainClimat />
            </Layout>
          }
        />
        <Route
          path="/boutiques-ateliers"
          element={
            <Layout>
              <BoutiquesAteliers />
            </Layout>
          }
        />

        {/* Routes spéciales sans Layout */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignInPage />} />
        <Route path="/error" element={<Error />} />
        <Route path="*" element={<Error />} />
        <Route path="/compte" element={<ComptePage />} />
        <Route path="/messenger" element={<MessengerInterface />} />
        <Route path="/detail-blog" element={<DetailBlog />} />
        <Route path="/test" element={<PaiementList />} />
        <Route path="/paiement" element={<PapiPayForm />} />


      </Routes>
    </Suspense>
  );
}

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
      <AppContent />
    </>
  );
}

export default App;
