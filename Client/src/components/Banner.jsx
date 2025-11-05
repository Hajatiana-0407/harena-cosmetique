export default function Banner(){
    return(
      <section className="relative isolate overflow-hidden bg-stone-900" >
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,var(--color-indigo-500),transparent)] opacity-10" />
        <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-45deg] bg-stone-900 shadow-xl ring-1 shadow-indigo-500/5 ring-white/5 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
        <div className="flex items-center">
            <div className="w-2xl ">
                <img src="public/image/beauty.jpg" className="h-150 w-fit object-cover " alt="" />
            </div>
            <div className="w-2xl text-left p-5 flex-none">
                <h2 className="text-2xl font-bold mb-5">Creme Coiffante</h2>
                <hr className="bg-stone-800 border-2 border-stone-500 w-80"/>
                <h3 className="mt-5">
                   Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, impedit ipsa. Necessitatibus blanditiis rem voluptatibus veniam id animi assumenda repellendus harum voluptate iure! Reprehenderit in repellat commodi, velit cum perspiciatis! 
                </h3>
                <button className="btn bg-stone-800 mt-10">En savoir plus</button>                
            </div>
        </div>
      </section>
    )
}