import React, { useState, useEffect } from "react";

export default function PapiPayForm({ endpoint = "/api/papi/create-payment" }) {
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [client, setClient] = useState(null);
  const [cartTotal, setCartTotal] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Load client info
    try {
      const storedClient = localStorage.getItem('client');
      if (storedClient) {
        const parsedClient = JSON.parse(storedClient);
        setClient(parsedClient);
        setIsLoggedIn(true);
        // Prefill phone if available
        if (parsedClient.telephone) {
          setPhone(parsedClient.telephone);
        }
      } else {
        setIsLoggedIn(false);
      }
    } catch (err) {
      console.error('Error loading client:', err);
    }

    // Load cart total from checkout
    try {
      const storedTotal = localStorage.getItem('checkoutTotal');
      if (storedTotal) {
        const total = parseFloat(storedTotal) || 0;
        setCartTotal(total);
        setAmount(total);
      }
    } catch (err) {
      console.error('Error loading cart total:', err);
    }
  }, []);

  const isValidPhone = (p) => {
    if (!p) return false;
    const normalized = p.trim().replace(/\s+/g, "");
    const patterns = [/^\+2613\d{7}$/, /^03\d{8}$/];
    return patterns.some((re) => re.test(normalized));
  };

  const isValidAmount = (a) => {
    const n = Number(a);
    return Number.isFinite(n) && n >= 300;
  };

  const validate = () => {
    const errors = {};
    if (!isValidPhone(phone)) errors.phone = "Numéro invalide (ex: 0341234567, 0382128857 ou +261341238567).";
    if (!isValidAmount(amount)) errors.amount = "Montant invalide — minimum 300 MGA.";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    if (!validate()) { setMessage({ type: "error", text: "Veuillez corriger les champs." }); return; }
    setLoading(true);

    try {
      const payload = { phone: phone.trim().replace(/\s+/g, ""), amount: Number(amount) };
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (!res.ok) { setMessage({ type: "error", text: json?.error || "Erreur serveur." }); setLoading(false); return; }

      const transactionId = json.transactionId ?? json.transactionId ?? null;
      const paymentLink = json.paymentLink ?? null;

      let successText = "Transaction envoyée avec succès.";
      if (transactionId) successText += ` ID : ${transactionId}.`;
      setMessage({ type: "success", text: successText });

      if (paymentLink) window.open(paymentLink, "_blank", "noopener,noreferrer");
    } catch (err) {
      setMessage({ type: "error", text: "Impossible de contacter le serveur. Vérifie ta connexion." });
    } finally {
      setLoading(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg border border-gray-200 text-center">
        <h2 className="text-xl font-bold text-red-600 mb-4">Connexion requise</h2>
        <p className="text-gray-600 mb-4">Vous devez être connecté pour procéder au paiement.</p>
        <button
          onClick={() => window.location.href = '/login'}
          className="bg-[#8b5e3c] hover:bg-[#a3734f] text-white font-semibold py-2 px-4 rounded-lg"
        >
          Se connecter
        </button>
      </div>
    );
  }

  const handleSuccess = () => {
    // Clear checkout data after successful payment
    localStorage.removeItem('checkoutItems');
    localStorage.removeItem('checkoutTotal');
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg border border-gray-200">
      {/* Client Info Display */}
      {client && (
        <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="text-lg font-bold text-blue-800 mb-2">Confirmation Client</h3>
          <p className="text-sm text-blue-700"><strong>Nom:</strong> {client.prenom} {client.nom}</p>
          <p className="text-sm text-blue-700"><strong>Email:</strong> {client.email}</p>
          <p className="text-sm text-blue-700"><strong>Téléphone:</strong> {client.telephone || 'Non renseigné'}</p>
          <p className="text-sm text-blue-700 mt-2"><strong>Total Panier:</strong> {cartTotal.toLocaleString()} MGA</p>
        </div>
      )}

      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">💳 Paiement Mobile Money (PAPI)</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="phone" className="block text-gray-700 font-medium mb-1">Numéro Mobile Money</label>
          <input id="phone" type="tel" placeholder="0341234567" value={phone} onChange={(e) => setPhone(e.target.value.replace(/\s+/g, ""))} disabled={loading}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b5e3c] text-gray-900 placeholder-gray-400 ${fieldErrors.phone ? "border-red-500" : "border-gray-300"}`} />
          {fieldErrors.phone && <p className="text-red-500 mt-1 text-sm">{fieldErrors.phone}</p>}
        </div>

        <div>
          <label htmlFor="amount" className="block text-gray-700 font-medium mb-1">Montant (MGA)</label>
          <input id="amount" type="number" min="300" placeholder="Ex: 5000" value={amount} readOnly disabled={loading}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b5e3c] text-gray-900 placeholder-gray-400 bg-gray-100 ${fieldErrors.amount ? "border-red-500" : "border-gray-300"}`} />
          {fieldErrors.amount && <p className="text-red-500 mt-1 text-sm">{fieldErrors.amount}</p>}
          {cartTotal > 0 && <p className="text-xs text-gray-500 mt-1">Montant calculé depuis votre panier</p>}
        </div>

        <button type="submit" disabled={loading} className="w-full bg-[#8b5e3c] hover:bg-[#a3734f] text-white font-semibold py-2 px-4 rounded-lg">
          {loading ? "En cours..." : "Procéder au paiement"}
        </button>
      </form>

      {message && (
        <div className={`mt-4 p-3 rounded-lg text-center ${message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
          {message.text}
          {message.type === "success" && <button onClick={handleSuccess} className="ml-2 text-green-800 underline">Continuer</button>}
        </div>
      )}
    </div>
  );
}
