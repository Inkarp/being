import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaClock } from "react-icons/fa6";
import { FaFacebookF, FaTwitter, FaInstagram, FaPinterestP } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import Hero from "./Hero";
import Products from "./Products";
import Services from "./Services";
import AboutSection from "./about";

export default function One() {
    return (
        <div className="bg-[#2B7EC2] p-5">
            <header className="w-[95%] flex mx-auto  bg-gray-200 font-[Roboto] rounded-2xl p-2">
                <div className="flex ">
                    <img src="/logo.webp" alt="TechIn Logo" className="h-[120px] w-[250px]" />
                </div>
                <div className="flex flex-col w-full">
                    <div className="w-full flex justify-between items-center px-5 py-3 text-gray-700 text-[14px]">
                        <div className="flex items-center gap-10">
                            <div className="flex items-center gap-2">
                                <FaPhoneAlt className="text-[#00C6F8]" />
                                <span>+91 9030357676</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <MdEmail className="text-[#00C6F8]" />
                                <span>info@inkarp.co.in</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <FaClock className="text-[#00C6F8]" />
                                <span>Mon–Fri: 09:30AM–5:30PM</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 text-[#00C6F8]">
                            <FaWhatsapp className="cursor-pointer hover:opacity-80" size={20} />
                            <FaFacebookF className="cursor-pointer hover:opacity-80" size={20} />
                            <FaInstagram className="cursor-pointer hover:opacity-80" size={20} />
                        </div>
                    </div>

                    <div className="w-full px-5 py-3 bg-[#2B7EC2] rounded-2xl flex justify-between items-center text-white">
                        <div className="flex items-center gap-14">
                            <nav className="flex items-center gap-10 font-semibold">
                                <a className="hover:text-gray-200 cursor-pointer">Home</a>
                                <a className="hover:text-gray-200 cursor-pointer">About</a>
                                <a className="hover:text-gray-200 cursor-pointer">Products</a>
                                <a className="hover:text-gray-200 cursor-pointer">Contact Us</a>
                                <a className="hover:text-gray-200 cursor-pointer">News and Events</a>
                            </nav>
                        </div>

                        <div className="flex items-center gap-5">
                            <div className="bg-white text-[#312CF0] w-12 h-12 rounded-full flex justify-center items-center cursor-pointer">
                                <FaSearch size={18} />
                            </div>

                            {/* <div className="bg-white text-[#312CF0] w-12 h-12 rounded-full flex justify-center items-center cursor-pointer">
                            <RxHamburgerMenu size={20} />
                        </div> */}

                            <button className="bg-[#00C6F8] text-white font-bold px-8 py-3 rounded-lg text-[18px] shadow-md hover:bg-[#05d1ff]">
                                Product Profile
                            </button>

                        </div>
                    </div>
                </div>
            </header>
            <Hero />
            <Products />
            <Services />
            <AboutSection />
        </div>
    );
}
