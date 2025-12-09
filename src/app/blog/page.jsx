import Banner from "../events/Banner";
import Header from "../five/Header";
import Footer from "../Footer";
import HeaderOne from "../one/HeaderOne";
import Blog from "./Blog";


export default function Page() {
    return (
        <div className="bg-gradient-to-r from-[#E0F2FE] via-[#E0F2FE] to-[#E0F2FE]">
            <HeaderOne />
            <Banner />
            <Blog />
            <Footer />
        </div>
    );
}
