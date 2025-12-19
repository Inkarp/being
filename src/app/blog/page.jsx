import Banner from "../events/Banner";
import Header from "../five/Header";
import Footer from "../Footer";
import HeaderOne from "../Home/Header";
import Blog from "./Blog";


export default function Page() {
    return (
        <div className="bg-gradient-to-r from-[#E0F2FE] via-[#E0F2FE] to-[#E0F2FE]">
            <Banner />
            <Blog />     
        </div>
    );
}
