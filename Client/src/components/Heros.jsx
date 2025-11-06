'use client'

// import { Dialog, DialogPanel } from '@headlessui/react'
// import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import heroImage from '../assets/image/heros.jpg'

export default function Heros() {
  return (
<div
  className="hero h-screen"
  style={{
    backgroundImage:
      `url(${heroImage})`,
  }}
>
  <div className="hero-overlay"></div>
  <div className="hero-content text-neutral-content text-center">
    <div className="max-w-md">
      <h1 className="mb-5 text-5xl font-bold text-left">La beauté</h1>
      <p className="mb-5 text-left">
        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
        quasi. In deleniti eaque aut repudiandae et a id nisi.
      </p>
      <div className="flex justify-start items-center">
        <a className="btn bg-[#6b4226] p-3 border-0" href="/catalogue">Decouvrir maintenant</a>
        <a href="/blog" className=" ml-3 border-1 p-2 rounded-sm"> En savoir plus</a>
      </div>
    </div>
  </div>
</div>
  )
}
