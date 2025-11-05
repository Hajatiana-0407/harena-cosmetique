// Bestseller.jsx
import React, { useState } from 'react';

export default function  Bestseller (){
  return (
    <div className="md:p-8 lg:p-12 bg-stone-50 min-h-screen text-stone-900 flex flex-center flex-col items-center">
        <div className='mt-20 text-center bg-stone-900 text-white text-3xl w-70  p-3 rounded-2xl' >Best seller</div>
        <div className='text-center text-4xl font-bold tex m-5'>Chapitre</div>
        <hr className="bg-stone-800 border-2 border-stone-500 w-80 m-5"/>
        <p className='max-w-5xl'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi nemo minima eos consequatur in pariatur obcaecati, blanditiis harum ad mollitia voluptatibus illum distinctio ipsum natus quas similique! Facilis, quis laudantium.
        Ipsa quibusdam soluta similique dolor, culpa in adipisci at? Ea natus pariatur laudantium laboriosam sint harum, corrupti nostrum eum? Similique nulla cumque quasi atque vel nisi voluptas, impedit explicabo ipsum.
        Qui quibusdam labore dicta cum. Veniam sequi error ipsa, maiores sapiente aspernatur tenetur, optio autem modi nulla aut ullam fuga dolor esse ipsum, mollitia sit? Quibusdam officiis aliquam rerum possimus.</p>

        <div className='m-6 flex flex-wrap justify-center gap-8'>
            <div className='w-80 max-h-150 min-w-1xl rounded-2xl bg-white shadow-2xl text-left'>
                <div className='relative'><img src="image/beauty.jpg" alt=""  className='rounded-2xl rounded-b-none'/><button className='btn absolute top-0 m-5 rounded-box'>Best seller</button> </div>
                <div className='p-5 gap-5 flex flex-col'>
                    <div className='text-4xl font-bold'>Titre</div>
                    <div className='flex'> desciption <br /> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Omnis, quas. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate veniam quae molestiae quas facilis nam explicabo ipsum vel expeditasd commodi lorem*52.</div>
                    <a className="btn  mb-5 bg-[#6b4226] p-3 border-0" href="/produit">Decouvrir maintenant</a>
                </div>
            </div>
            <div className='w-80 max-h-150 min-w-1xl rounded-2xl bg-white shadow-2xl text-left'>
                <div className='relative'><img src="image/beauty.jpg" alt=""  className='rounded-2xl rounded-b-none'/><button className='btn absolute top-0 m-5 rounded-box'>Best seller</button> </div>
                <div className='p-5 gap-5 flex flex-col'>
                    <div className='text-4xl font-bold'>Titre</div>
                    <div className='flex'> desciption <br /> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Omnis, quas. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate veniam quae molestiae quas facilis nam explicabo ipsum vel expeditasd commodi lorem*52.</div>
                    <a className="btn  mb-5 bg-[#6b4226] p-3 border-0" href="/produit">Decouvrir maintenant</a>
                </div>
            </div>
            <div className='w-80 max-h-150 min-w-1xl rounded-2xl bg-white shadow-2xl text-left'>
                <div className='relative'><img src="image/beauty.jpg" alt=""  className='rounded-2xl rounded-b-none'/><button className='btn absolute top-0 m-5 rounded-box'>Best seller</button> </div>
                <div className='p-5 gap-5 flex flex-col'>
                    <div className='text-4xl font-bold'>Titre</div>
                    <div className='flex'> desciption <br /> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Omnis, quas. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate veniam quae molestiae quas facilis nam explicabo ipsum vel expeditasd commodi lorem*52.</div>
                    <a className="btn  mb-5 bg-[#6b4226] p-3 border-0" href="/produit">Decouvrir maintenant</a>
                </div>
            </div>
        </div>
    </div>
  );
};
