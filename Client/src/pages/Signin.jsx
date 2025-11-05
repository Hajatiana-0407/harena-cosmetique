import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../API/url';

// Remplacement des imports externes par des icônes SVG intégrées pour garantir la compilation
// FaGoogle et FaFacebookF sont recréés en tant que composants inline.

const GoogleIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5 mr-3">
        <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 7.917-11.303 7.917-6.764 0-12.26-5.496-12.26-12.26 0-6.764 5.496-12.26 12.26-12.26 3.181 0 6.008 1.145 8.19 3.036l5.7-5.7c-3.467-3.235-7.98-5.205-12.89-5.205C11.458 5.743 3.656 13.546 3.656 23.284c0 9.737 7.802 17.54 17.54 17.54 9.947 0 14.97-7.07 15.658-12.213V20.083z"></path>
        <path fill="#FF3D00" d="M6.364 24H24v8H6.364z" transform="rotate(-45 15.182 28)"></path>
        <path fill="#4CAF50" d="M12.26 35.824c-3.176-2.073-5.204-5.694-5.204-9.54s2.028-7.467 5.204-9.54l-5.228-3.414C3.218 16.516 1.189 21.056 1.189 26.284c0 5.228 2.029 9.768 5.843 12.637l5.228-3.097z"></path>
        <path fill="#1976D2" d="M43.611 20.083h-2.146l-2.106 2.086c1.192 1.954 1.838 4.195 1.838 6.541 0 4.382-2.193 8.241-5.594 10.686L30 36.427V42.08c7.802-4.834 11.611-14.777 11.611-21.997 0-1.859-.28-3.666-.801-5.367z"></path>
    </svg>
);

const FacebookIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 mr-3">
        <path fill="currentColor" d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h3V2h-3c-3.6 0-5 2.1-5 5v2.5H6v4h3V22h5v-8.5z"/>
    </svg>
);

const SignUpPage = () => {
    const navigate = useNavigate();
    // État pour gérer les données du formulaire
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    // État pour gérer les messages d'erreur de validation
    const [errors, setErrors] = useState({});

    // Fonction de validation côté client
    const validate = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // Le mot de passe doit contenir au moins 8 caractères, une majuscule et un chiffre.
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

        if (!formData.name) newErrors.name = 'Le nom complet est requis.';
        
        if (!formData.email || !emailRegex.test(formData.email)) {
            newErrors.email = 'Veuillez entrer une adresse e-mail valide.';
        }

        if (!formData.password || !passwordRegex.test(formData.password)) {
            newErrors.password = 'Le mot de passe doit contenir au moins 8 caractères, dont une majuscule et un chiffre.';
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Les mots de passe ne correspondent pas.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Gestion de la mise à jour des champs
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
        // Effacer l'erreur dès que l'utilisateur commence à taper (meilleure UX)
        if (errors[e.target.id]) {
            setErrors({ ...errors, [e.target.id]: '' });
        }
    };

    // Gestion de la soumission du formulaire
    const handleSignUp = (e) => {
        e.preventDefault();

        if (validate()) {
            (async () => {
                try {
                    const { data } = await api.post('/auth/register', {
                        nom: formData.name,
                        prenom: formData.name, // Assuming name is full name, you might want to split it
                        email: formData.email,
                        password: formData.password,
                        adresse: '', // Add address field if needed
                        telephone: '' // Add phone field if needed
                    });
                    if (data?.success) {
                        // Store client info and redirect to homepage
                        localStorage.setItem('client', JSON.stringify(data.client));
                        navigate('/');
                    } else {
                        // Handle registration failure, e.g., display an error message
                        setErrors({ form: data?.message || 'Échec de l\'inscription' });
                    }
                } catch (err) {
                    setErrors({ form: err?.response?.data?.message || err.message || 'Erreur lors de l\'inscription' });
                }
            })();
        } else {
            console.log('Erreurs de validation, soumission bloquée.');
        }
    };

    // Logique pour la connexion sociale - Rendre le design plus efficace
    const handleSocialLogin = (provider) => {
        console.log(`Démarrage de l'inscription via ${provider}...`);
        // Ici, vous lanceriez la fenêtre pop-up ou la redirection OAuth
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-stone-100 p-4"> {/* Arrière-plan beige clair */}
            <div className="max-w-md w-full bg-white rounded-xl shadow-2xl overflow-hidden p-8 space-y-8 border border-stone-200">
                <h2 className="text-3xl font-extrabold text-stone-800 text-center"> {/* Titre marron foncé */}
                    Créez votre compte
                </h2>

                {/* --- Formulaire d'Inscription Traditionnel --- */}
                <form className="space-y-6" onSubmit={handleSignUp}>
                    
                    {/* Champ Nom Complet */}
                    <div>
                        <label htmlFor="name" className="block text-left text-sm font-medium text-stone-700">
                            Nom Complet
                        </label>
                        <div className="mt-1">
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className={`appearance-none text-stone-700 block w-full px-4 py-2 border ${errors.name ? 'border-red-500' : 'border-stone-300'} rounded-md shadow-sm placeholder-stone-400 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm`}
                                placeholder="John Doe"
                            />
                        </div>
                        {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                    </div>

                    {/* Champ Adresse E-mail */}
                    <div>
                        <label htmlFor="email" className="block text-left text-sm font-medium text-stone-700">
                            Adresse E-mail
                        </label>
                        <div className="mt-1">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className={`appearance-none text-stone-700 block w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-stone-300'} rounded-md shadow-sm placeholder-stone-400 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm`}
                                placeholder="votre@email.com"
                            />
                        </div>
                        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                    </div>

                    {/* Champ Mot de Passe */}
                    <div>
                        <label htmlFor="password" className="block  text-left text-sm font-medium text-stone-700">
                            Mot de Passe
                        </label>
                        <div className="mt-1">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className={`appearance-none text-stone-700 block w-full px-4 py-2 border ${errors.password ? 'border-red-500' : 'border-stone-300'} rounded-md shadow-sm placeholder-stone-400 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm`}
                                placeholder="Minimum 8 caractères, Majuscule, Chiffre"
                            />
                        </div>
                        {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
                    </div>

                    {/* Champ Confirmation Mot de Passe */}
                    <div>
                        <label htmlFor="confirmPassword" className="block  text-left text-sm font-medium text-stone-700">
                            Confirmer le Mot de Passe
                        </label>
                        <div className="mt-1">
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                required
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className={`appearance-non text-stone-700 block w-full px-4 py-2 border ${errors.confirmPassword ? 'border-red-500' : 'border-stone-300'} rounded-md shadow-sm placeholder-stone-400 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm`}
                                placeholder="Retapez le mot de passe"
                            />
                        </div>
                        {errors.confirmPassword && <p className="mt-1 text-xs text-red-500">{errors.confirmPassword}</p>}
                    </div>
                    
                    {/* Checkbox pour les conditions générales */}
                    <div className="flex items-start">
                        <div className="flex items-center h-5">
                            <input
                                id="terms"
                                name="terms"
                                type="checkbox"
                                required
                                className="focus:ring-amber-500 h-4 w-4 text-amber-700 border-stone-300 rounded"
                            />
                        </div>
                        <div className="ml-3 text-sm">
                            <label htmlFor="terms" className="font-medium text-stone-700">
                                J'accepte les <a href="#" className="text-amber-700 hover:text-amber-800 transition duration-150 ease-in-out">Conditions Générales</a> et la <a href="#" className="text-amber-700 hover:text-amber-800 transition duration-150 ease-in-out">Politique de Confidentialité</a>.
                            </label>
                        </div>
                    </div>


                    {/* Bouton de Soumission */}
                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 border border-transparent cursor-pointer rounded-lg shadow-sm text-sm font-medium text-white  bg-[#6b4226] hover:bg-amber-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition duration-150 ease-in-out"
                        >
                            Créer mon Compte
                        </button>
                    </div>
                </form>

                {/* --- Lien de Connexion --- */}
                <div className="text-center text-sm text-stone-600">
                    Vous avez déjà un compte ?
                    <a href="/login" className="font-medium text-[#6b4226] hover:text-amber-800 ml-1 transition duration-150 ease-in-out">
                        Connectez-vous ici
                    </a>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;
