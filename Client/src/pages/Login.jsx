import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../API/url";

// --- Icône SVG pour le bouton Google ---
const GoogleIcon = () => (
  <svg className="w-5 h-5 mr-3" viewBox="0 0 48 48">
    <path
      fill="#FFC107"
      d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039L38.802 9.92C34.553 6.101 29.61 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
    ></path>
    <path
      fill="#FF3D00"
      d="M6.306 14.691c-1.645 3.119-2.606 6.691-2.606 10.539c0 1.282.106 2.533.295 3.764l7.616-5.886C11.313 21.96 11 20.503 11 19c0-1.831.421-3.558 1.158-5.119L6.306 14.691z"
    ></path>
    <path
      fill="#4CAF50"
      d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-7.617 5.887C8.049 39.51 15.424 44 24 44z"
    ></path>
    <path
      fill="#1976D2"
      d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C39.71 36.641 44 31.125 44 24c0-1.341-.138-2.65-.389-3.917z"
    ></path>
  </svg>
);

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    // Sanitize inputs
    const sanitizedEmail = email.trim();
    const sanitizedPassword = password;

    // Client-side validation
    if (!sanitizedEmail || !sanitizedPassword) {
      setMessage("Veuillez remplir tous les champs");
      setLoading(false);
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(sanitizedEmail)) {
      setMessage("Format d'email invalide");
      setLoading(false);
      return;
    }

    // Validate password length
    if (sanitizedPassword.length < 6) {
      setMessage("Le mot de passe doit contenir au moins 6 caractères");
      setLoading(false);
      return;
    }

    try {
      const { data } = await api.post("/login", {
        email: sanitizedEmail,
        password: sanitizedPassword,
      });

      if (data?.success) {
        setMessage("Connexion réussie");
        // Use sessionStorage instead of localStorage for better security
        sessionStorage.setItem("client", JSON.stringify(data.client));
        window.dispatchEvent(new Event("authChange"));
        navigate("/");
      } else {
        setMessage(data?.message || "Échec de la connexion");
      }
    } catch (err) {
      setMessage(
        err?.response?.data?.message || err.message || "Erreur de connexion"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        {/* --- Titre --- */}
        <h1 className="text-3xl font-bold text-center text-[#6b4226] mb-2">
          Content de vous revoir !
        </h1>
        <p className="text-center text-gray-500 mb-8">
          Connectez-vous à votre compte
        </p>

        <form onSubmit={handleSubmit}>
          {/* --- Champ Email --- */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm text-left font-semibold mb-2"
              htmlFor="email"
            >
              Adresse Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus: #6b4226"
              placeholder="votre.email@exemple.com"
              required
            />
          </div>

          {/* --- Champ Mot de passe --- */}
          <div className="mb-6">
            <label
              className="block text-left text-gray-700 text-sm font-semibold mb-2"
              htmlFor="password"
            >
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:#6b4226"
              placeholder="••••••••"
              required
            />
          </div>

          {/* --- Bouton de connexion --- */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full  text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 cursor-pointer ${
              loading ? "bg-[#6b4226]/60" : "bg-[#6b4226] hover:bg-[#975e38]"
            }`}
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>
          {message && <p className="mt-3 text-center text-sm">{message}</p>}
        </form>

        {/* --- Diviseur "OU" --- */}
        <div className="relative my-6 flex items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="flex-shrink mx-4 text-sm text-gray-500">
            ou se connecter avec
          </span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* --- Bouton de connexion Google --- */}
        <button className="w-full flex items-center justify-center py-2.5 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-300">
          <GoogleIcon />
          <span className="font-semibold text-gray-700">Google</span>
        </button>

        {/* --- Lien vers l'inscription --- */}
        <p className="text-center text-sm text-gray-600 mt-8">
          Vous n'avez pas de compte ?
          <a
            href="/signup"
            className="ml-1 font-semibold text-[#6b4226] hover:underline"
          >
            Inscrivez-vous
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
