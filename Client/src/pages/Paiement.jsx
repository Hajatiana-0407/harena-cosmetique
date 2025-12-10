import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// Icônes from lucide-react
import { ArrowLeft, Smartphone, CreditCard, Shield, User, Tag, DollarSign, Lock } from 'lucide-react';
import PapiPayForm from '../components/PapiPayForm.jsx';


// Définition des méthodes de paiement et de leurs couleurs
const PAYMENT_METHODS = {
  MVOLA: { name: 'Mvola', mainColor: 'green-600', accentColor: 'amber-400', icon: Smartphone },
  ORANGE: { name: 'Orange', mainColor: 'orange-600', accentColor: 'orange-300', icon: Smartphone },
  AIRTEL: { name: 'Airtel', mainColor: 'red-600', accentColor: 'red-300', icon: Smartphone },
  CARD: { name: 'Carte', mainColor: 'blue-600', accentColor: 'blue-300', icon: CreditCard },
};

// Thème principal de la carte : Marron/Beige (stone)
const THEME_COLOR = "stone";

const ModernPaymentForm = ({
    // CORRECTION APPORTÉE ICI : La fonction par défaut redirige maintenant vers '/panier'
    onBack = () => {
        // ATTENTION : Dans une application réelle (avec React Router, Next.js, etc.),
        // vous devez passer la fonction de routage appropriée.
        // Exemple pour React Router: navigate('/panier')
        // Exemple pour Next.js: router.push('/panier')
        console.log("REDIRECTION VERS /panier SIMULÉE. Utilisez votre router pour l'action réelle.");
        // Si vous n'utilisez PAS de routeur:
        window.location.href = "/panier";
    },
    orderId = 'CMD-2025-001',
    defaultAmount = 50000,
    productName = 'Produit Écologique'
}) => {

  const navigate = useNavigate();
  const [selectedMethodKey, setSelectedMethodKey] = useState('MVOLA');
  const selectedMethod = PAYMENT_METHODS[selectedMethodKey];

  const [formData, setFormData] = useState({
    amount: defaultAmount.toString(),
    phoneNumber: '', 
    cardNumber: '', 
    expiryDate: '', 
    cvv: '',         
    firstName: '',
    lastName: '',
    orderReference: orderId,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // --- Logique de l'Input (stabilité maintenue) ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'amount') {
        const cleanValue = value.replace(/[^0-9.]/g, ''); 
        setFormData(prevData => ({ ...prevData, [name]: cleanValue }));
    } else {
        setFormData(prevData => ({ ...prevData, [name]: value }));
    }
    
    setError(null);
    setSuccess(null);
  };
  
  // --- Fonction de Soumission (Simulation API) ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    const { amount, phoneNumber, cardNumber, firstName, lastName } = formData;
    const paymentAmount = parseFloat(amount);
    
    if (paymentAmount <= 0 || !firstName || !lastName) {
        setError("Veuillez vérifier vos informations et le montant.");
        setLoading(false);
        return;
    }
    
    let transactionMessage = '';
    
    if (selectedMethodKey !== 'CARD' && !phoneNumber) {
        setError(`Veuillez entrer votre numéro ${selectedMethod.name} Money.`);
        setLoading(false);
        return;
    }
    if (selectedMethodKey === 'CARD' && (!cardNumber || !formData.expiryDate || !formData.cvv)) {
        setError("Veuillez remplir toutes les informations de votre carte bancaire.");
        setLoading(false);
        return;
    }

    try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        switch (selectedMethodKey) {
            case 'MVOLA': transactionMessage = `Paiement Mvola de ${paymentAmount.toLocaleString()} MGA initié. Confirmez sur votre mobile.`; break;
            case 'ORANGE': transactionMessage = `Paiement Orange Money de ${paymentAmount.toLocaleString()} MGA initié. Confirmez la notification.`; break;
            case 'AIRTEL': transactionMessage = `Paiement Airtel Money de ${paymentAmount.toLocaleString()} MGA initié. Confirmez la demande USSD.`; break;
            case 'CARD': transactionMessage = `Paiement par Carte Bancaire de ${paymentAmount.toLocaleString()} MGA réussi (Simulé).`; break;
            default: throw new Error("Méthode de paiement non reconnue.");
        }
        
        setSuccess(`✅ ${transactionMessage}`);
        setFormData(prev => ({ ...prev, phoneNumber: '', cardNumber: '', expiryDate: '', cvv: '' })); 

    } catch (err) {
        setError(`❌ Erreur de transaction : ${err.message || 'Problème de communication.'}`);
    } finally {
      setLoading(false);
    }
  };
  // --- Fin Logique ---

  const formattedAmount = parseFloat(formData.amount) > 0 
    ? parseFloat(formData.amount).toLocaleString('fr-MG', { minimumFractionDigits: 0 }) 
    : '...';

  const PaymentCard = () => (
    <div className="max-w-xl w-full p-4 sm:p-6 bg-white rounded-xl shadow-2xl border border-stone-100 transition-all duration-500">
      
      {/* En-tête de la carte */}
      <div className="flex justify-between items-start mb-6 border-b pb-4 border-stone-100">
        <button
          onClick={() => navigate('/panier')} // Fonction de redirection appelée ici
          className="flex items-center text-stone-700 hover:text-stone-900 transition duration-200 text-sm focus:outline-none"
          aria-label="Retourner au panier"
        >
          <FaArrowLeft className="h-3 w-3 mr-2" />
          <span className="font-semibold">Retour au Panier</span>
        </button>
        
        <h2 className="text-xl font-extrabold text-stone-900">
            Paiement Sécurisé
        </h2>
        <FaShieldAlt className="h-6 w-6 text-stone-700" title="Transaction Sécurisée" />
      </div>

      {/* Récapitulatif du Montant */}
      <div className="bg-stone-50 p-4 rounded-lg mb-6 flex flex-col items-center border border-stone-200">
          <p className="text-sm text-stone-800 font-medium">Vous payez pour : {productName}</p>
          <p className="text-4xl font-extrabold text-stone-700 mt-2">
            {formattedAmount} Ar
          </p>
      </div>

      {/* SÉLECTEUR DE MÉTHODE DE PAIEMENT */}
      <p className="text-sm font-semibold text-gray-700 mb-3">
        1. Choisissez votre mode de paiement
      </p>
      <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8">
        {Object.entries(PAYMENT_METHODS).map(([key, method]) => (
          <PaymentTab
            key={key}
            methodKey={key}
            methodName={method.name}
            methodMainColor={method.mainColor}
            methodAccentColor={method.accentColor}
            selected={selectedMethodKey === key}
            onSelect={() => {
              setSelectedMethodKey(key);
              setError(null);
            }}
          />
        ))}
      </div>


      <form onSubmit={handleSubmit} className="space-y-5">
        
        <p className="text-sm font-semibold text-gray-700 mb-3 pt-2 border-t border-stone-100">
          2. Vos informations de paiement
        </p>

        {/* CHAMPS DYNAMIQUES */}
        {selectedMethodKey !== 'CARD' ? (
            <FormInputField 
                id="phoneNumber" 
                label={`Numéro ${selectedMethod.name} Money`} 
                value={formData.phoneNumber} 
                onChange={handleChange}
                icon={<selectedMethod.icon className={`h-5 w-5 text-${selectedMethod.mainColor}`} />}
                placeholder="Ex: 34xxxxxxx ou 33xxxxxxx"
                pattern="\d{8,10}"
                themeColor={selectedMethod.mainColor.split('-')[0]} 
            />
        ) : (
            <>
                <FormInputField id="cardNumber" label="Numéro de Carte" value={formData.cardNumber} onChange={handleChange} icon={<selectedMethod.icon className={`h-5 w-5 text-${selectedMethod.mainColor}`} />} placeholder="XXXX XXXX XXXX XXXX" themeColor={selectedMethod.mainColor.split('-')[0]} />
                <div className="grid grid-cols-2 gap-4">
                    <FormInputField id="expiryDate" label="Date d'Expiration (MM/AA)" value={formData.expiryDate} onChange={handleChange} placeholder="MM/AA" themeColor={selectedMethod.mainColor.split('-')[0]} />
                    <FormInputField id="cvv" label="CVV (3 chiffres au dos)" value={formData.cvv} onChange={handleChange} placeholder="123" themeColor={selectedMethod.mainColor.split('-')[0]} />
                </div>
            </>
        )}

        {/* Autres informations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-stone-100">
            <FormInputField id="firstName" label="Prénom" value={formData.firstName} onChange={handleChange} icon={<FaUser className="h-4 w-4 text-stone-600" />} placeholder="Votre prénom" themeColor={THEME_COLOR} />
            <FormInputField id="lastName" label="Nom" value={formData.lastName} onChange={handleChange} placeholder="Votre nom de famille" themeColor={THEME_COLOR} />
            <FormInputField id="orderReference" label="Référence de Commande (R/O)" value={formData.orderReference} onChange={handleChange} icon={<FaTag className="h-4 w-4 text-stone-600" />} readOnly={true} themeColor={THEME_COLOR} />
            <FormInputField id="amount" label="Montant à Payer (MGA) R/O" value={formData.amount} onChange={handleChange} icon={<FaMoneyBillWave className="h-5 w-5 text-stone-600" />} type="text" inputMode="numeric" pattern="[0-9]*" readOnly={true} themeColor={THEME_COLOR} />

        </div>

        
        {/* Messages d'état */}
        {error && (<div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg font-medium">⚠️ **Erreur :** {error}</div>)}
        {success && (<div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg font-medium">✅ **Succès :** {success}</div>)}

        {/* Bouton de Soumission */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full flex justify-center py-4 px-4 rounded-lg shadow-xl text-white font-extrabold tracking-widest uppercase transition duration-300 ${
            loading
              ? 'bg-stone-600/70 cursor-not-allowed'
              : 'bg-stone-700 hover:bg-stone-800 focus:outline-none focus:ring-4 focus:ring-stone-500 focus:ring-opacity-70'
          }`}
        >
          {loading ? (
            <div className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                Initiation {selectedMethod.name}...
            </div>
          ) : (
            `PAYER AVEC ${selectedMethod.name.toUpperCase()}`
          )}
        </button>
      </form>
      
      {/* Bas de page Sécurité */}
      <div className="mt-4 pt-4 border-t border-stone-100 text-xs text-center text-gray-400 flex justify-center items-center space-x-2">
        <FaLock className="w-3 h-3 text-stone-500" />
        <span>Paiement 100% sécurisé et confidentiel</span>
      </div>
    </div>
  );
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-stone-50">
        <PaymentCard />
    </div>
  );
};

export default ModernPaymentForm;


// --- Composant pour le sélecteur d'onglet (avec couleurs de marque) ---
const PaymentTab = ({ methodKey, methodName, methodMainColor, methodAccentColor, selected, onSelect }) => {
    
    const getClasses = () => {
        let base = "flex items-center px-3 sm:px-4 py-2 rounded-full font-semibold transition duration-200 border-2 text-sm sm:text-base ";
        
        if (selected) {
            base += `text-white shadow-md border-${methodMainColor}`;
            if (methodKey === 'MVOLA') base += ' bg-green-600 border-green-600';
            else if (methodKey === 'ORANGE') base += ' bg-orange-600 border-orange-600';
            else if (methodKey === 'AIRTEL') base += ' bg-red-600 border-red-600';
            else if (methodKey === 'CARD') base += ' bg-blue-600 border-blue-600';
        } else {
            base += ' bg-white text-stone-700 border-stone-300 hover:bg-stone-100';
            if (methodKey === 'MVOLA') base += ' hover:border-green-600 hover:text-green-600';
            else if (methodKey === 'ORANGE') base += ' hover:border-orange-600 hover:text-orange-600';
            else if (methodKey === 'AIRTEL') base += ' hover:border-red-600 hover:text-red-600';
            else if (methodKey === 'CARD') base += ' hover:border-blue-600 hover:text-blue-600';
        }
        return base;
    };
    
    const IconComponent = PAYMENT_METHODS[methodKey].icon;

    return (
        <button
            onClick={onSelect}
            className={getClasses()}
        >
            <IconComponent className={`mr-2 ${selected && methodKey === 'MVOLA' ? 'text-amber-400' : ''}`} />
            <span className="">{methodName}</span>
        </button>
    );
};

// --- Composant d'aide pour le FormInputField ---
const FormInputField = ({ id, label, value, onChange, icon, type = 'text', inputMode, pattern, readOnly = false, placeholder = '', themeColor }) => {
    
    const isGrayed = readOnly;
    
    const inputClasses = `block w-full py-3 border rounded-lg transition duration-150 text-gray-900 shadow-sm placeholder-gray-400
        ${icon ? 'pl-10 pr-4' : 'pl-4 pr-4'} 
        ${isGrayed 
            ? 'border-stone-200 bg-stone-50 cursor-default font-semibold' 
            : `border-gray-300 focus:ring-${themeColor}-500 focus:border-${themeColor}-500`
        }`;

    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            <div className="relative rounded-lg">
                {icon && (
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        {icon}
                    </div>
                )}
                <input
                    type={type} 
                    name={id}
                    id={id}
                    value={value}
                    onChange={onChange}
                    readOnly={readOnly} 
                    placeholder={placeholder}
                    required={!readOnly}
                    pattern={pattern}
                    inputMode={inputMode} 
                    className={inputClasses}
                />
            </div>
        </div>
    );
};