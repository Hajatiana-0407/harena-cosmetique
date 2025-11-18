import React, { useState } from "react";

export default function PapiPayForm({ endpoint = "/api/papi/create-payment" }) {
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState(5000);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});

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

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg border border-gray-200">
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
          <input id="amount" type="number" min="300" placeholder="Ex: 5000" value={amount} onChange={(e) => setAmount(e.target.value)} disabled={loading}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b5e3c] text-gray-900 placeholder-gray-400 ${fieldErrors.amount ? "border-red-500" : "border-gray-300"}`} />
          {fieldErrors.amount && <p className="text-red-500 mt-1 text-sm">{fieldErrors.amount}</p>}
        </div>

        <button type="submit" disabled={loading} className="w-full bg-[#8b5e3c] hover:bg-[#a3734f] text-white font-semibold py-2 px-4 rounded-lg">
          {loading ? "En cours..." : "Procéder au paiement"}
        </button>
      </form>

      {message && <div className={`mt-4 p-3 rounded-lg text-center ${message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{message.text}</div>}
    </div>
  );
}
