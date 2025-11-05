import React from "react";

export default function ConditionsVente() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-10 text-gray-800">
      <h1 className="text-3xl font-bold text-brown-700 mb-6">
        Conditions Générales de Vente
      </h1>
 
      <section className="mb-8 text-left">
        <h2 className="text-2xl font-semibold text-brown-600 mb-2">
          Produits cosmétiques naturels
        </h2>
        <p className="text-gray-700">
          Nos cosmétiques naturels sont élaborés avec des ingrédients
          respectueux de la peau et de l’environnement. Vous y trouverez des
          huiles, crèmes et soins adaptés à tous les types de peau pour une
          routine beauté saine et efficace.
        </p>
      </section>

      <section className="mb-8 text-left">
        <h2 className="text-2xl font-semibold text-brown-600 mb-2">
          Huiles essentielles
        </h2>
        <p className="text-gray-700">
          Une large gamme d’huiles essentielles pures et de qualité, idéales
          pour l’aromathérapie, la relaxation, et le soin quotidien. Chaque
          produit est rigoureusement sélectionné pour garantir authenticité et
          efficacité.
        </p>
      </section>

      <section className="mb-8 text-left">
        <h2 className="text-2xl font-semibold text-brown-600 mb-2">
          Produits capillaires
        </h2>
        <p className="text-gray-700">
          Des shampooings, masques, huiles et sérums capillaires pour nourrir,
          fortifier et embellir vos cheveux naturellement. Adaptés aux cheveux
          secs, gras, frisés ou lisses.
        </p>
      </section>

      <section className="mb-8 text-left">
        <h2 className="text-2xl font-semibold text-brown-600 mb-2">
          Accessoires & matériel DIY
        </h2>
        <p className="text-gray-700">
          Nous proposons également des contenants, ustensiles, et kits pour la
          fabrication maison de vos cosmétiques. Idéal pour les passionnés de
          DIY souhaitant créer leurs propres soins personnalisés.
        </p>
      </section>
    </div>
  );
}
