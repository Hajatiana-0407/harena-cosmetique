import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    FiFilter,
    FiSearch,
    FiCheckSquare,
    FiTrash2,
    FiStar,
    FiTruck
} from 'react-icons/fi';
import RequestApi from '../API/RequestApi';

const formatCurrency = (amount) => `${Math.max(0, amount).toLocaleString('fr-MG', { minimumFractionDigits: 0 })} Ar`;

// --- Composant Taux d'Étoiles (inchangé) ---
const StarRating = ({ rating }) => (
  <div className="flex text-sm text-[#a27c56]"> 
    {[...Array(5)].map((_, i) => (
      <FiStar 
        key={i} 
        className={i < rating ? 'fill-current text-[#a27c56]' : 'text-stone-300'} 
      />
    ))}
  </div>
);

// --- Composant pour l'Item de Liste (inchangé) ---
const ThemedCartItem = React.memo(({ item, onSelect, onRemove }) => (
    <div className="flex p-3 bg-white border border-stone-200 rounded-lg shadow-md w-full mb-3"> 
        
        <div className="flex flex-grow min-w-0 pr-4">
            <img 
                src={item.imageUrl} 
                alt={item.name} 
                className="w-16 h-16 mr-3 rounded-lg flex-shrink-0 object-cover border border-stone-200" 
            />
            
            <div className="text-left">
                <p className="font-bold text-sm text-[#6b4226] line-clamp-1">{item.name}</p>
                <p className="text-xs text-stone-500 mt-1">{formatCurrency(item.price)} x {item.quantity}</p>
                <p className="text-[10px] text-stone-500 mt-1 line-clamp-2">{item.description}</p>
            </div>
        </div>
        
        <div className="flex items-center space-x-4 pl-4 text-center text-xs flex-shrink-0">
            
            {/* Prix Total Item */}
            <div className="w-16">
                <p className="text-stone-500 font-medium uppercase text-[10px]">Total</p>
                <p className="font-medium text-[#6b4226] mt-0.5 text-sm">{formatCurrency(item.price * item.quantity)}</p>
            </div>

            {/* Actions (Sélectionner/Supprimer) */}
            <div className="w-10">
                <p className="text-stone-500 font-medium uppercase text-[10px]">Actions</p>
                <div className="flex space-x-2 justify-center mt-1">
                    <FiCheckSquare 
                        className={`w-4 h-4 cursor-pointer transition-colors ${item.isSelected ? 'text-green-600' : 'text-[#6b4226]'}`}
                        onClick={() => onSelect(item.id)}
                    />
                    <FiTrash2 
                        className="text-[#6b4226] hover:text-red-500 w-4 h-4 cursor-pointer transition-colors"
                        onClick={() => onRemove(item.id)}
                    />
                </div>
            </div>
        </div>
    </div>
));

// --- Composant Résumé de la Commande (corrigé) ---
const OrderSummary = ({ summary, onCheckout, selectedItems, totalAmount, onApplyPromo, promoInput, setPromoInput, discount, promoError }) => {
    
    const isCheckoutDisabled = selectedItems.length === 0 || totalAmount <= 0;

    const handleCheckoutClick = () => {
        if (!isCheckoutDisabled) {
            onCheckout(selectedItems, totalAmount);
        }
    };
    
    // Pour l'affichage des économies
    const currentSummary = {
        ...summary,
        'Économies': discount, 
        'Total': summary['Total'],
    };

    return (
        <div className="bg-white p-6 space-y-4 text-sm font-light shadow-xl shadow-stone-200 rounded-lg">
            <h3 className="text-lg font-bold text-[#6b4226] border-b pb-2 mb-4">RÉSUMÉ DE LA COMMANDE</h3>

            {/* Détails du Résumé */}
            {Object.entries(currentSummary).map(([key, value]) => {
                const isTotal = key === 'Total';
                const isSavings = key === 'Économies'; 
                
                if (isSavings && value <= 0) return null;

                return (
                    <div 
                        key={key} 
                        className={`flex justify-between ${isTotal ? 'border-t border-stone-300 pt-4 text-xl font-medium' : 'text-stone-500'}`}
                    >
                        <span className={isTotal ? 'text-[#6b4226]' : 'text-stone-600'}>{key}</span>
                        <span className={
                        isTotal 
                            ? 'text-[#6b4226] font-semibold' 
                            : isSavings
                            ? 'text-green-600' 
                            : 'text-[#6b4226]' 
                        }>
                        {isSavings ? `- ${formatCurrency(value)}` : formatCurrency(value)}
                        </span>
                    </div>
                );
            })}

            {/* Bouton Passer à la Caisse */}
            <button 
                onClick={handleCheckoutClick}
                disabled={isCheckoutDisabled}
                className={`w-full font-medium py-3 rounded-md transition duration-200 mt-4 shadow-md shadow-stone-300 ${
                    isCheckoutDisabled
                    ? 'bg-stone-400 text-stone-100 cursor-not-allowed'
                    : 'bg-[#8b5e3c] hover:bg-[#6b4226] text-white'
                }`}
            >
                PASSER À LA CAISSE ({selectedItems.length} Articles)
            </button>
            {isCheckoutDisabled && (
                 <p className="text-xs text-center text-red-500">Veuillez sélectionner au moins un article pour payer.</p>
            )}

            {/* Code Promo (corrigé) */}
            <div className="pt-4 border-t border-stone-300">
                <p className="text-stone-600 mb-2">Avez-vous un code promo ?</p>
                <div className="flex space-x-2">
                <input 
                    type="text" 
                    placeholder="Entrez le code" 
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                    className="flex-grow bg-[#fffaf5] text-[#6b4226] border border-[#d4bfa4] rounded-md py-2 px-3 focus:ring-[#8b5e3c] focus:border-[#8b5e3c] uppercase" 
                />
                <button 
                    onClick={onApplyPromo}
                    className="bg-[#d4bfa4] hover:bg-[#a27c56] text-stone-800 font-medium px-4 rounded-md transition duration-200 text-sm shadow-sm"
                >
                    {discount > 0 ? 'Changer' : 'Appliquer'}
                </button>
                </div>
                 {discount > 0 && (
                    <p className="text-xs text-green-600 mt-2 font-medium">✅ Code **{promoInput}** appliqué. Économies : {formatCurrency(discount)}.</p>
                )}
                 {promoError && (
                    <p className="text-xs text-red-500 mt-2 font-medium">❌ {promoError}</p>
                )}
            </div>
        </div>
    );
};


// --- Composant Principal du Panier (CORRIGÉ) ---
export const PanierComponent = ({
    onCheckout
}) => {
    const navigate = useNavigate();
    const { validatePromoCode } = RequestApi();

    const handleCheckout = (items, total) => {
        // Redirect to payment page with cart data
        localStorage.setItem('checkoutItems', JSON.stringify(items));
        localStorage.setItem('checkoutTotal', total);
        navigate('/paiement');
    };

    const [items, setItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterActive, setFilterActive] = useState(false);
    const [promoInput, setPromoInput] = useState('');
    const [discount, setDiscount] = useState(0);
    const [promoError, setPromoError] = useState(null); // NOUVEL ÉTAT POUR L'ERREUR

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        setItems(cart.map(item => ({ ...item, price: parseFloat(item.price) || 0 })));
    }, []);

    // Réinitialiser la promo lors des changements importants
    const resetPromo = () => {
        setDiscount(0);
        setPromoInput('');
        setPromoError(null);
    };

    // --- LOGIQUE DU PANIER ---
    const handleRemove = (idToRemove) => {
        const updatedItems = items.filter(item => item.id !== idToRemove);
        setItems(updatedItems);
        localStorage.setItem('cart', JSON.stringify(updatedItems));
        resetPromo();
    };

    const handleSelect = (idToSelect) => {
        const updatedItems = items.map(item =>
            item.id === idToSelect ? { ...item, isSelected: !item.isSelected } : item
        );
        setItems(updatedItems);
        localStorage.setItem('cart', JSON.stringify(updatedItems));
        resetPromo();
    };

    const filteredItems = items.filter(item => {
        const matchesSearch = (item.name || '').toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterActive ? item.rating > 3 : true;
        return matchesSearch && matchesFilter;
    });

    const selectedItems = items.filter(item => item.isSelected);

    // Calcul dynamique du total (useMemo sans effet secondaire)
    const { subTotal, deliveryFee, taxes, totalAmount, cartSummary } = useMemo(() => {
        const currentSubTotal = selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const currentDeliveryFee = selectedItems.length > 0 ? 99 : 0;
        const currentTaxes = currentSubTotal > 0 ? currentSubTotal * 0.02 : 0;

        // Le calcul applique directement l'état `discount` qui est contrôlé par `handleApplyPromo`
        let finalDeliveryFee = currentDeliveryFee;
        let effectiveDiscount = discount;

        // Si le code FREE99 a été appliqué, ajuster la valeur de la livraison dans le résumé
        if (promoInput === 'FREE99' && effectiveDiscount === currentDeliveryFee) {
             finalDeliveryFee = 0;
        }

        let currentTotal = currentSubTotal + finalDeliveryFee + currentTaxes - effectiveDiscount;
        currentTotal = Math.max(0, currentTotal);

        const summary = {
            'Sous-total': currentSubTotal,
            'Frais de livraison': finalDeliveryFee, // Peut être 0 si la promo est appliquée
            'Taxes': currentTaxes,
            'Total': currentTotal,
        };

        return {
            subTotal: currentSubTotal,
            deliveryFee: finalDeliveryFee,
            taxes: currentTaxes,
            totalAmount: currentTotal,
            cartSummary: summary
        };
    }, [selectedItems, discount, promoInput]);

    // Logique de validation et d'application du code promo (HORS useMemo)
    const handleApplyPromo = async () => {
        setPromoError(null);
        const code = promoInput.toUpperCase();

        // First, try to validate via API
        const apiResponse = await validatePromoCode(code);

        if (apiResponse.success) {
            let newDiscount = 0;
            const { type, valeur } = apiResponse;

            if (type === 'pourcentage') {
                newDiscount = Math.round(subTotal * (valeur / 100));
            } else if (type === 'montant_fixe') {
                newDiscount = valeur;
            }

            if (newDiscount > 0) {
                setDiscount(newDiscount);
                setPromoInput(code);
                return;
            }
        }

        // Fallback to local codes if API fails or code not found
        // Note: PROMO_CODES removed as codes are now dynamic from API

        // If neither API nor local codes work
        setDiscount(0);
        setPromoError(apiResponse.message || `Code promo '${code}' non valide ou aucun article sélectionné.`);
    };
    // --- FIN LOGIQUE DU PANIER ---

    return (
        <div className="min-h-screen bg-[#fdf6ec] text-stone-800 p-4 sm:p-8 lg:p-12">
            <div className="max-w-7xl mx-auto">

                <div className="flex flex-col lg:flex-row lg:space-x-8">

                    <div className="flex-grow lg:w-3/5 bg-white p-4 sm:p-6 rounded-lg shadow-lg shadow-stone-200">

                        {/* Barre de recherche et filtres */}
                        <div className="pb-4 border-b border-stone-200 mb-4">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-bold text-[#6b4226]">PANIER ({filteredItems.length})</h2>
                                <div className="flex items-center space-x-3 text-stone-500">
                                    <FiFilter
                                        className={`w-5 h-5 cursor-pointer transition-colors ${filterActive ? 'text-blue-500' : 'text-[#6b4226]'}`}
                                        onClick={() => setFilterActive(!filterActive)}
                                        title={filterActive ? "Désactiver le filtre" : "Activer le filtre"}
                                    />
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="RECHERCHER UNE COMMANDE"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="pl-3 pr-10 py-1.5 text-xs border border-[#d4bfa4] rounded-lg focus:ring-[#8b5e3c] focus:border-[#8b5e3c] w-full md:w-64 bg-[#fffaf5] text-[#6b4226]"
                                        />
                                        <button className="absolute right-0 top-0 h-full px-3 bg-[#8b5e3c] rounded-r-lg hover:bg-[#6b4226] transition duration-150">
                                            <FiSearch className="text-white w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-between items-center mt-4">
                                <p className="text-sm font-medium text-[#6b4226]">
                                    {filterActive ? `Filtré par Appréciations > 3` : `Plus récents`}
                                </p>
                                <button onClick={() => navigate('/produit')} className="px-4 py-2 text-xs font-semibold text-white bg-[#8b5e3c] rounded-md shadow hover:bg-[#6b4226] transition duration-150">
                                    AJOUTER UN PANIER
                                </button>
                            </div>
                        </div>

                        {/* Liste des Items Filtrés/Dynamiques */}
                        <div>
                            {filteredItems.map((item) => (
                                <ThemedCartItem
                                    key={item.id}
                                    item={item}
                                    onRemove={handleRemove}
                                    onSelect={handleSelect}
                                />
                            ))}
                        </div>
                        {filteredItems.length === 0 && (
                            <p className="text-center text-stone-500 mt-8">Aucun article ne correspond à votre recherche ou à vos filtres.</p>
                        )}

                        {/* Section Historique des Commandes (si connecté) */}
                        {localStorage.getItem('client') && (
                            <div className="mt-8 pt-6 border-t border-stone-200">
                                <h3 className="text-lg font-bold text-[#6b4226] mb-4">Historique des commandes</h3>
                                <div className="space-y-3">
                                    {/* Exemple d'historique - À remplacer par données réelles */}
                                    <div className="bg-stone-50 p-4 rounded-lg border border-stone-200">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <p className="font-medium text-stone-900">Commande #12345</p>
                                                <p className="text-sm text-stone-600">15/12/2024 - Livrée</p>
                                            </div>
                                            <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Livrée</span>
                                        </div>
                                        <p className="text-sm text-stone-700">Beurre de soin cheveux Céramide NG - 2 unités</p>
                                        <p className="text-sm font-medium text-[#6b4226]">Total: 4.000 Ar</p>
                                    </div>
                                    <div className="bg-stone-50 p-4 rounded-lg border border-stone-200">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <p className="font-medium text-stone-900">Commande #12344</p>
                                                <p className="text-sm text-stone-600">10/12/2024 - En cours</p>
                                            </div>
                                            <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">En cours</span>
                                        </div>
                                        <p className="text-sm text-stone-700">Huile essentielle Lavande - 1 unité</p>
                                        <p className="text-sm font-medium text-[#6b4226]">Total: 15.000 Ar</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="lg:w-2/5 mt-8 lg:mt-0 sticky top-4 self-start">
                        {/* Composant de Résumé de la commande */}
                        <OrderSummary
                            summary={cartSummary}
                            onCheckout={handleCheckout}
                            selectedItems={selectedItems}
                            totalAmount={totalAmount}
                            onApplyPromo={handleApplyPromo}
                            promoInput={promoInput}
                            setPromoInput={setPromoInput}
                            discount={discount}
                            promoError={promoError}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PanierComponent;