import React, { useState, useEffect } from 'react';
// Les imports 'axios' et 'url' ont été commentés/retirés.
// Nous utilisons l'API native 'fetch' pour un exemple autonome et la structure est corrigée.

// --- CORRECTION APPLIQUÉE ICI ---
// Si votre React et Symfony sont sur des ports différents (ex: React 3000, Symfony 8000), 
// il faut utiliser l'URL ABSOLUE pour éviter l'erreur "Unexpected token <".
// ASSUREZ-VOUS que l'URL ci-dessous correspond au port réel de votre serveur Symfony.
const API_ENDPOINT = 'https://127.0.0.1:8000/client'; 
// --- FIN DE CORRECTION ---

function PaiementList() {
  const [clients, setClients] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Le hook useEffect est essentiel pour lancer la requête API au montage du composant.
  useEffect(() => {
    // 1. Définir la fonction de récupération comme asynchrone
    const fetchClients = async () => {
      try {
        // La structure incorrecte a été remplacée par une gestion de Promesse correcte:
        
        // 2. Utiliser 'await' pour attendre la réponse HTTP
        // Utilise maintenant l'URL absolue : 'http://localhost:8000/client'
        const response = await fetch(API_ENDPOINT);
        
        if (!response.ok) {
            // L'erreur sera déclenchée si le statut est 404, 500, etc.
            throw new Error(`Erreur HTTP: ${response.status}. Vérifiez que votre serveur Symfony est actif et que l'URL (${API_ENDPOINT}) est correcte.`);
        }
        
        // 3. Utiliser 'await' pour attendre le parsing du corps en JSON
        const data = await response.json();

        setClients(data);

      } catch (err) {
        // Cette section capture l'erreur "Unexpected token <" ou d'autres erreurs réseau.
        console.error("❌ Erreur lors de la récupération des clients:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []); // Le tableau vide [] s'assure que cela s'exécute uniquement au montage.

  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen font-sans text-gray-800 text-left">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6 sm:p-8">
        <h1 className="text-3xl font-extrabold text-indigo-700 mb-4 border-b pb-2">
          Composant Client List (Débogage API)
        </h1>

        <div className="mt-6">
          {loading && (
            <div className="flex items-center space-x-2 text-indigo-500 font-medium">
                <svg className="animate-spin h-5 w-5 mr-3 text-indigo-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Chargement des données...</span>
            </div>
          )}

          {error && (
            <div className="p-3 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-md shadow-sm">
                <p className="font-bold">Erreur de connexion</p>
                <p className="text-sm">{error}</p>
            </div>
          )}

          {!loading && !error && (
            <div className="mt-4">
              <h2 className="text-xl font-semibold text-gray-800">Aperçu des Données (max 3) :</h2>
              <p className="mt-2 text-gray-700">
                {clients && clients.length > 0
                    ? `Données de ${clients.length} clients chargées.`
                    : "Aucune donnée client n'a été reçue ou les données sont vides."}
              </p>
              
              {/* Affichage d'un aperçu pour confirmer le format JSON */}
              {clients && clients.slice(0, 3).map((client, index) => (
                <pre key={index} className="mt-3 p-3 bg-gray-100 border border-gray-300 rounded text-sm overflow-x-auto whitespace-pre-wrap font-mono">
                  {JSON.stringify(client, null, 2)}
                </pre>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Composant principal à exporter
export default function App() {
    return <PaiementList />;
}
