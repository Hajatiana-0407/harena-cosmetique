import React, { useEffect, useState } from 'react';

export default function ComptePage() {
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    try {
      const raw = localStorage.getItem('client');
      const parsed = raw ? JSON.parse(raw) : null;
      setClient(parsed);
    } catch (e) {
      console.error('Invalid client data in storage', e);
      setError("Impossible de charger les informations du client.");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleLogout = () => {
    try {
      localStorage.removeItem('client');
      localStorage.removeItem('token');
    } catch (_) {}
    window.dispatchEvent(new Event('authChange'));
    window.location.href = '/';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <div className="animate-pulse text-gray-700">Chargement du compte...</div>
        </div>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Accès refusé</h2>
        <p className="text-gray-600 mb-6">Vous devez être connecté pour accéder à cette page.</p>
        <a href="/login" className="px-5 py-2 rounded bg-[#5C4033] text-white hover:bg-[#7B4B3A] transition-colors">Se connecter</a>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 py-10 px-4 text-gray-900">
      <div className="max-w-5xl mx-auto bg-white shadow rounded-2xl p-6 sm:p-8 md:p-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <img
            src="https://127.0.0.1:8000/image/beauty.jpg"
            alt="Photo de profil"
            className="w-28 h-28 rounded-full object-cover ring-2 ring-[#5C4033]"
          />
          <div className="flex-1 w-full">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-[#5C4033]">
                  {client?.prenom} {client?.nom}
                </h1>
                <p className="text-gray-600 break-all">{client?.email}</p>
              </div>
              <div className="flex gap-2 sm:gap-3">
                <a
                  href="/catalogue"
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-800 hover:bg-gray-50 transition-colors"
                >
                  Continuer mes achats
                </a>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
                >
                  Déconnexion
                </button>
              </div>
            </div>

            {error && (
              <div className="mt-4 p-3 rounded bg-red-50 text-red-700 text-sm border border-red-200">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              {/* Informations personnelles */}
              <div className="rounded-xl border border-gray-200 p-5">
                <h2 className="text-lg font-semibold text-[#5C4033] mb-4">Mes informations</h2>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between gap-4">
                    <span className="text-gray-500">Nom</span>
                    <span className="font-medium">{client?.nom || '—'}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-gray-500">Prénom</span>
                    <span className="font-medium">{client?.prenom || '—'}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-gray-500">Email</span>
                    <span className="font-medium break-all">{client?.email || '—'}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-gray-500">Téléphone</span>
                    <span className="font-medium">{client?.telephone || '—'}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-gray-500">Adresse</span>
                    <span className="font-medium text-right">{client?.adresse || '—'}</span>
                  </div>
                </div>
              </div>

              {/* Activité / Raccourcis */}
              <div className="rounded-xl border border-gray-200 p-5">
                <h2 className="text-lg font-semibold text-[#5C4033] mb-4">Mes activités</h2>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center justify-between">
                    <span className="text-gray-600">Historique des commandes</span>
                    <a href="#historique" className="text-[#5C4033] hover:underline">Voir</a>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-gray-600">Mes avis</span>
                    <a href="/" className="text-[#5C4033] hover:underline">Gérer</a>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-gray-600">Mes favoris</span>
                    <a href="/" className="text-[#5C4033] hover:underline">Voir</a>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-gray-600">Messages</span>
                    <a href="/messenger" className="text-[#5C4033] hover:underline">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Historique des commandes */}
            <div id="historique" className="mt-8 rounded-xl border border-gray-200 p-5">
              <h2 className="text-lg font-semibold text-[#5C4033] mb-4">Historique des commandes</h2>
              <div className="space-y-4">
                {/* Exemple de commande - À remplacer par données réelles */}
                <div className="border border-gray-100 rounded-lg p-4 bg-gray-50">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium text-gray-900">Commande #12345</p>
                      <p className="text-sm text-gray-600">Date: 15/12/2024</p>
                    </div>
                    <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Livrée</span>
                  </div>
                  <div className="text-sm text-gray-700">
                    <p>Beurre de soin cheveux Céramide NG - 2 unités</p>
                    <p className="font-medium">Total: 4.000 Ar</p>
                  </div>
                </div>
                <div className="border border-gray-100 rounded-lg p-4 bg-gray-50">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium text-gray-900">Commande #12344</p>
                      <p className="text-sm text-gray-600">Date: 10/12/2024</p>
                    </div>
                    <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">En cours</span>
                  </div>
                  <div className="text-sm text-gray-700">
                    <p>Huile essentielle Lavande - 1 unité</p>
                    <p className="font-medium">Total: 15.000 Ar</p>
                  </div>
                </div>
              </div>
            </div>

            {/* A propos / description optionnelle */}
            <div className="mt-8 rounded-xl border border-gray-200 p-5">
              <h2 className="text-lg font-semibold text-[#5C4033] mb-3">À propos</h2>
              <p className="text-gray-700 text-sm">
                Bienvenue dans votre espace client. Retrouvez vos informations personnelles, vos commandes, vos avis et vos favoris.
                Cette section pourra afficher des recommandations et des informations personnalisées ultérieurement.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
