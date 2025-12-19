'use client'

import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import Hero from "../three/HeroNew";
import Footer from "../Footer";
import Recent from "../five/Recent";
import FooterTwo from "./FooterTwo";
import Offerings from "../four/Offerings";
import AboutSection from "../Home/About";

export default function HeaderNew() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 80);
        };
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <header
                className={`w-[95%] mx-auto font-[Roboto] transition-all duration-300 z-50 
                ${isScrolled ? "fixed top-0 left-0 right-0 bg-transparent py-2" : "relative bg-white py-3"}
                `}
            >
                <div
                    className={`w-full mx-auto flex items-center transition-all duration-300 
                    ${isScrolled ? "justify-center" : "bg-gray-300 justify-between rounded-2xl"}
                    `}
                >
                    {/* LOGO — now dynamically positioned */}
                    <div
                        className={`transition-all duration-300 
                        ${isScrolled ? "z-100 absolute left-[600] top-3 px-6 py-2 rounded-2xl" : ""}
                        `}
                    >
                        <img
                            src="/logo.webp"
                            alt="TechIn Logo"
                            className={`object-contain transition-all duration-300 bg-white/60
                                ${isScrolled ? "rounded-xl h-[100px] w-[200px]" : "h-[100px] w-[220px]"}
                            `}
                        />
                    </div>

                    {/* MENU + ICONS + CTA — hidden on scroll */}
                    <div
                        className={`flex items-center gap-10 transition-all duration-300 
                        ${isScrolled ? "opacity-0 pointer-events-none scale-90" : "opacity-100 scale-100 px-5"}
                        `}
                    >
                        <nav className="flex items-center gap-10 font-semibold text-[#2B7EC2]">
                            <a className="hover:text-gray-600 cursor-pointer">Home</a>
                            <a className="hover:text-gray-600 cursor-pointer">About</a>
                            <a className="hover:text-gray-600 cursor-pointer">Products</a>
                            <a className="hover:text-gray-600 cursor-pointer">Contact Us</a>
                            <a className="hover:text-gray-600 cursor-pointer">News & Events</a>
                        </nav>

                        <div className="flex items-center gap-5">
                            <div className="bg-white text-[#312CF0] w-12 h-12 rounded-full flex justify-center items-center cursor-pointer shadow">
                                <FaSearch size={18} />
                            </div>

                            <div className="bg-white text-[#312CF0] w-12 h-12 rounded-full flex justify-center items-center cursor-pointer shadow">
                                <RxHamburgerMenu size={20} />
                            </div>

                            <button className="bg-[#00C6F8] text-white font-bold px-8 py-3 rounded-lg text-[18px] shadow hover:bg-[#05d1ff]">
                                Product Profile
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Push content down when header is fixed */}
            <div className={isScrolled ? "pt-[120px]" : ""}>
                <Hero />
                {/* <Recent /> */}
                <Offerings />
                <AboutSection />
            </div>
            <FooterTwo />
        </>
    );
}
