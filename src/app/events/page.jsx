import Footer from "../one/Footer";
import HeaderOne from "../one/HeaderOne";
import Banner from "./Banner";
import Events from "./events";

export default function page() {
    return (
        <div className="bg-gradient-to-r from-[#E0F2FE] via-[#E0F2FE] to-[#E0F2FE]">
            <HeaderOne />
            <Banner />
            <Events />
            <Footer />
        </div>
    )
}