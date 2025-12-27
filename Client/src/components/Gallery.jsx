import React, { useEffect, useMemo, useState } from 'react'
import { Eye, Search } from 'lucide-react'
import api from '../API/url'
import { apiIMG } from '../API/pathPicture'

function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-2xl overflow-hidden bg-white shadow-sm">
      <div className="h-44 bg-gray-100" />
      <div className="p-4">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
        <div className="h-3 bg-gray-200 rounded w-1/2" />
      </div>
    </div>
  )
}

function stripHtmlTags(html) {
  const tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
}

export default function Gallery({ mode = 'categories' }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [query, setQuery] = useState('')

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const { data } = await api.get('/api/categories')
        if (!mounted) return
        setItems(Array.isArray(data) ? data : [])
      } catch (err) {
        setError(err?.response?.data || err?.message || 'Erreur réseau')
      } finally {
        if (mounted) setLoading(false)
      }
    })()
    return () => { mounted = false }
  }, [mode])

  const filtered = useMemo(() => {
    if (!query) return items
    const q = query.trim().toLowerCase()
    return items.filter((c) => (c.nom || c.name || '').toLowerCase().includes(q) || (c.description || '').toLowerCase().includes(q))
  }, [items, query])

  return (
    <section className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between mb-8">
          <div>
            <h2 className="text-3xl font-extrabold text-stone-900">Nos catégories</h2>
            <p className="mt-1 text-sm text-stone-600 max-w-xl">Collections organisées pour vous aider à trouver facilement les meilleurs produits naturels.</p>
          </div>

          <div className="mt-4 sm:mt-0">
            <label htmlFor="search" className="sr-only">Rechercher</label>
            <div className="relative text-stone-400 focus-within:text-stone-600">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="w-4 h-4" />
              </div>
              <input
                id="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher une catégorie..."
                className="block w-full sm:w-72 pl-10 pr-3 py-2 rounded-md border border-stone-200 bg-white text-sm placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-200"
                aria-label="Rechercher des catégories"
              />
            </div>
          </div>
        </div>

        {error && (
          <div role="alert" className="mb-6 rounded-md bg-red-50 p-4">
            <p className="text-sm text-red-700">Erreur lors du chargement: {typeof error === 'object' ? JSON.stringify(error) : error}</p>
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-lg text-stone-700">Aucune catégorie trouvée</p>
            <p className="mt-2 text-sm text-stone-500">Essayez une autre recherche ou revenez plus tard.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((cat) => {
              const name = cat.nom || cat.name || `Catégorie ${cat.id}`
              const desc = stripHtmlTags(cat.description || '')
              const image = cat.image || '/image/beauty.jpg'

              return (
                <article key={cat.id} className="group relative rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-shadow duration-300">
                  <div className="relative h-48 bg-gray-50">
                    <img src={apiIMG + image} alt={name} className="w-full h-full object-cover" />
                    <span className="absolute left-3 top-3 inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">Catégorie</span>
                  </div>

                  <div className="p-5 flex flex-col h-44">
                    <h3 className="text-lg font-semibold text-stone-900 truncate">{name}</h3>
                    <p className="text-sm text-stone-500 mt-2 line-clamp-3 flex-1">{desc}</p>

                    <div className="mt-4 flex items-center justify-between">
                      <a
                        href={`/catalogue?category=${cat.id}`}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-[#5C4033] to-[#8B5E3C] text-white rounded-full text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-amber-300"
                        aria-label={`Voir les produits pour ${name}`}
                      >
                        <Eye className="w-4 h-4" /> Voir produits
                      </a>

                      <span className="text-xs text-stone-400">{cat.produits ? `${cat.produits.length} produits` : ''}</span>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
