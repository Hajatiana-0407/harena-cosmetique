import React from 'react';

function CGV() {
  const primaryColor = 'text-[#6b4226]';
  const accentColor = 'bg-[#8b5e3c]';
  const lightBg = 'bg-[#fdf6ec]';

  return (
    <div className={`relative ${lightBg} px-6 sm:px-12 py-20 overflow-hidden`}>
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h1 className={`text-5xl font-light mb-4 ${primaryColor} tracking-widest`}>
            CONDITIONS GÉNÉRALES DE VENTE
          </h1>
          <p className="text-xl text-stone-500 font-extralight max-w-lg mx-auto">
            Conditions applicables à vos achats en ligne
          </p>
        </div>

        <div className="space-y-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className={`text-3xl font-light mb-6 ${primaryColor}`}>
              Article 1 - Objet
            </h2>
            <p className="text-stone-600 leading-relaxed">
              Les présentes conditions générales de vente régissent les relations contractuelles entre Harèna Cosmétique Beauté
              et ses clients dans le cadre de la vente en ligne de produits cosmétiques naturels.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className={`text-3xl font-light mb-6 ${primaryColor}`}>
              Article 2 - Produits
            </h2>
            <div className="space-y-4 text-stone-600">
              <p>
                Tous nos produits sont certifiés BIO et formulés à partir d'ingrédients naturels d'origine végétale.
                Les photographies et descriptions des produits sont données à titre indicatif et n'ont pas de valeur contractuelle.
              </p>
              <p>
                Nous nous réservons le droit de modifier à tout moment la composition de nos produits pour améliorer leur qualité
                ou adapter notre offre aux normes en vigueur.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className={`text-3xl font-light mb-6 ${primaryColor}`}>
              Article 3 - Prix
            </h2>
            <div className="space-y-4 text-stone-600">
              <p>
                Les prix de nos produits sont indiqués en euros TTC (Toutes Taxes Comprises).
                Les frais de port sont calculés selon le poids de la commande et la zone de livraison.
              </p>
              <p>
                Harèna Cosmétique Beauté se réserve le droit de modifier ses prix à tout moment,
                mais les produits seront facturés sur la base des tarifs en vigueur au moment de l'enregistrement de la commande.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className={`text-3xl font-light mb-6 ${primaryColor}`}>
              Article 4 - Commande
            </h2>
            <div className="space-y-4 text-stone-600">
              <p>
                Toute commande implique l'acceptation pleine et entière des présentes conditions générales de vente.
                Le client reconnaît avoir pris connaissance de ces conditions avant la passation de sa commande.
              </p>
              <p>
                Après validation de la commande, un email de confirmation sera envoyé au client.
                Cet email constitue l'acceptation de la commande par Harèna Cosmétique Beauté.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className={`text-3xl font-light mb-6 ${primaryColor}`}>
              Article 5 - Paiement
            </h2>
            <div className="space-y-4 text-stone-600">
              <p>
                Le paiement s'effectue en ligne par carte bancaire ou via les services de paiement sécurisés proposés.
                Le débit de la carte n'est effectué qu'au moment de l'expédition de la commande.
              </p>
              <p>
                En cas de paiement par virement bancaire, la commande ne sera traitée qu'après réception effective des fonds.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className={`text-3xl font-light mb-6 ${primaryColor}`}>
              Article 6 - Livraison
            </h2>
            <div className="space-y-4 text-stone-600">
              <p>
                Les délais de livraison sont donnés à titre indicatif. Harèna Cosmétique Beauté ne peut être tenue responsable
                des retards dus aux services postaux ou aux transporteurs.
              </p>
              <p>
                En cas de dommage pendant le transport, le client doit émettre des réserves précises auprès du transporteur
                dans les 3 jours suivant la réception.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className={`text-3xl font-light mb-6 ${primaryColor}`}>
              Article 7 - Droit de rétractation
            </h2>
            <div className="space-y-4 text-stone-600">
              <p>
                Conformément à l'article L221-18 du Code de la consommation, le client dispose d'un délai de 14 jours
                à compter de la réception de sa commande pour exercer son droit de rétractation.
              </p>
              <p>
                Les produits doivent être retournés dans leur état d'origine et dans leur emballage d'origine.
                Les frais de retour sont à la charge du client.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className={`text-3xl font-light mb-6 ${primaryColor}`}>
              Article 8 - Garantie et responsabilité
            </h2>
            <div className="space-y-4 text-stone-600">
              <p>
                Nos produits bénéficient de la garantie légale contre les vices cachés et les défauts de conformité.
                En cas de problème, contactez notre service client dans les meilleurs délais.
              </p>
              <p>
                Harèna Cosmétique Beauté ne peut être tenue responsable des dommages indirects ou des pertes d'exploitation.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className={`text-3xl font-light mb-6 ${primaryColor}`}>
              Article 9 - Données personnelles
            </h2>
            <div className="space-y-4 text-stone-600">
              <p>
                Les données personnelles collectées lors de la commande sont nécessaires à son traitement.
                Elles sont conservées confidentiellement et ne sont pas transmises à des tiers.
              </p>
              <p>
                Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className={`text-3xl font-light mb-6 ${primaryColor}`}>
              Article 10 - Droit applicable
            </h2>
            <p className="text-stone-600">
              Les présentes conditions générales de vente sont soumises au droit français.
              En cas de litige, les tribunaux français seront seuls compétents.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CGV;
