import React, { useEffect, useState } from 'react'
import { ShoppingCart, Eye } from 'lucide-react'
import api from '../API/url'
import { apiIMG } from '../API/pathPicture'

export default function ProduitList() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const { data } = await api.get('/api/categories')
        if (!mounted) return
        setCategories(Array.isArray(data) ? data : [])
      } catch (err) {
        setError(err?.response?.data || err?.message || 'Erreur réseau')
      } finally {
        if (mounted) setLoading(false)
      }
    })()
    return () => { mounted = false }
  }, [])

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-stone-800">Nos catégories</h1>
          <p className="mt-3 text-lg text-stone-600 max-w-2xl mx-auto">Explorez nos collections de produits naturels, sélectionnées pour leur qualité et leur efficacité.</p>
        </header>

        {error && (
          <div role="alert" className="mb-6 rounded-md bg-red-50 p-4">
            <p className="text-sm text-red-700">Erreur: {typeof error === 'object' ? JSON.stringify(error) : error}</p>
          </div>
        )}

        <section aria-labelledby="categories-heading">
          <h2 id="categories-heading" className="sr-only">Liste des catégories</h2>

          {loading ? (
            <div className="py-20 text-center text-stone-500">Chargement des catégories…</div>
          ) : categories.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-xl text-stone-700">Aucune catégorie disponible</p>
              <p className="mt-2 text-sm text-stone-500">Réessayez plus tard ou contactez l'administrateur.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((cat) => {
                const name = cat.nom || cat.name || `Catégorie ${cat.id}`
                const description = cat.description || 'Découvrez nos meilleurs produits.'
                const image = cat.image || '/image/beauty.jpg'

                return (
                  <article key={cat.id} className="group relative rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-shadow duration-300">
                    <div className="aspect-w-16 aspect-h-9 bg-gray-100">
                      <img src={apiIMG + image} alt={name} className="object-cover w-full h-full"/>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-stone-800 mb-2">{name}</h3>
                      <p className="text-sm text-stone-500 mb-4 line-clamp-3">{description}</p>
                      <div className="flex gap-3">
                        <a href={`/catalogue?category=${cat.id}`} className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-[#5C4033] to-[#8B5E3C] text-white rounded-full text-sm font-semibold hover:opacity-95">
                          <Eye className="w-4 h-4"/> Voir produits
                        </a>
                        <a href="/panier" className="inline-flex items-center gap-2 px-4 py-2 border border-stone-200 rounded-full text-sm text-stone-700 hover:bg-stone-50">
                          <ShoppingCart className="w-4 h-4"/> Acheter
                        </a>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          )}
        </section>
      </div>
    </main>
  )
}
