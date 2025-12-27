
import Heros from '../components/Heros'
import AboutPage from "../components/Testmonial";
import Bestseller from "../components/BestSeller";
// import Banner from "../components/Banner";
import Temoin  from "../components/temoin"

function Home() {
    return (
        <div>
            <Heros />
            <Bestseller/>
            <AboutPage/>
            {/* <Banner/> */}
            <Temoin/>           
        </div>
    )
}

export default Home