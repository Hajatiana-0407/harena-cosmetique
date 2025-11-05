
import Heros from '../components/Heros'
import Testmonial from "../components/Testmonial";
import ProductGrid from "../components/ProduitList";
import Bestseller from "../components/BestSeller";
import Banner from "../components/Banner";
import Temoin  from "../components/temoin"

function Home() {
    return (
        <div>
            <Heros />
            <Bestseller/>
            <Testmonial/>
            <ProductGrid/>
            <Banner/>
            <Temoin/>           
        </div>
    )
}

export default Home