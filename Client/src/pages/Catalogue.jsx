import Gallery from "../components/Gallery";

export default function Catalogue(){
    return(
        <div className="min-h-screen bg-slate-50 pt-10 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="mb-5 text-center">
                    <h1 className="text-5xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight">
                        Catalogue Complet
                    </h1>
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                        Explorez notre collection complète de produits cosmétiques naturels et découvrez des trésors pour votre beauté.
                    </p>
                </div>

                {/* Gallery Component */}
                <Gallery/>
            </div>
        </div>
    )
}
