import React, { useState } from "react";
import Slider from "react-slick";

// Produits cosmétiques (remplace les produits Apple)
const products = [
  {
    id: 1,
    name: "Crème Hydratante Aloe Vera",
    image:
      "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?w=500",
    discount: "Jusqu'à -20%",
    rating: 5.0,
    reviews: 320,
    price: 25,
    category: "soin",
  },
  {
    id: 2,
    name: "Shampoing Naturel Argan",
    image:
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=500",
    discount: "Promo -15%",
    rating: 4.8,
    reviews: 210,
    price: 18,
    category: "cheveux",
  },
  {
    id: 3,
    name: "Savon Artisanal Bio",
    image:
      "https://images.unsplash.com/photo-1617957741649-8c5ff1a8f5ca?w=500",
    discount: "Lot spécial",
    rating: 4.7,
    reviews: 150,
    price: 6,
    category: "savon",
  },
  {
    id: 4,
    name: "Huile de Massage Relaxante",
    image:
      "https://images.unsplash.com/photo-1611926653458-09294f96f83b?w=500",
    discount: "Jusqu'à -10%",
    rating: 4.9,
    reviews: 98,
    price: 30,
    category: "soin",
  },
];

// Composant carte produit
function ProductCard({ product }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm h-[420px] flex flex-col justify-between">
      {/* Image */}
      <div className="h-44 w-full flex items-center justify-center">
        <img
          className="h-full object-contain rounded-2xl"
          src={product.image}
          alt={product.name}
        />
      </div>

      {/* Infos */}
      <div className="pt-4 flex flex-col flex-1 justify-between">
        <span className="me-2 rounded bg-orange-100 px-2.5 py-0.5 text-xs font-medium text-[#5C4033]">
          {product.discount}
        </span>

        {/* Nom en chocolat */}
        <h3 className="mt-2 text-lg font-semibold text-[#5C4033] hover:underline line-clamp-2">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="mt-2 flex items-center gap-2">
          <div className="flex text-yellow-400">
            {"★".repeat(Math.round(product.rating))}
          </div>
          <p className="text-sm font-medium text-orange-700">
            {product.rating}
          </p>
          <p className="text-sm text-gray-500">({product.reviews} avis)</p>
        </div>

        {/* Prix + bouton */}
        <div className="mt-4 flex items-center justify-between gap-4">
          <p className="text-2xl font-extrabold text-[#5C4033]">
            {product.price} €
          </p>
          <button className="rounded-lg bg-[#5C4033] px-5 py-2 text-sm font-medium text-white hover:bg-[#7B4B3A]">
            Ajouter
          </button>
        </div>
      </div>
    </div>
  );
}

// Composant carrousel
export default function Gallery() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  // ⚙️ Paramètres du carrousel
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  // Filtrage produits
  const filteredProducts = products.filter(
    (p) =>
      (filter === "all" || p.category === filter) &&
      p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="bg-gray-50 py-8">
      <div className="mx-auto max-w-screen-xl px-4">
        {/* Header avec recherche et filtre */}
        <div className="mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <h2 className="text-2xl font-bold text-[#5C4033]">
            Produits Cosmétiques
          </h2>

          <div className="flex gap-3">
            <select
              className="border rounded px-2 py-1 text-[#5C4033]"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">Tous</option>
              <option value="soin">Soins</option>
              <option value="cheveux">Cheveux</option>
              <option value="savon">Savons</option>
            </select>

            <input
              type="text"
              placeholder="Rechercher un produit..."
              className="border rounded px-3 py-1 w-64 text-[#5C4033]"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Carrousel */}
        <Slider {...settings}>
          {filteredProducts.map((product) => (
            <div key={product.id} className="px-2">
              <ProductCard product={product} />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
