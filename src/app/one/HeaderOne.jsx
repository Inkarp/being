"use client"

import { useEffect, useState } from "react";
import { FaPhoneAlt, FaClock, FaWhatsapp, FaFacebookF, FaInstagram, FaSearch } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";


export default function HeaderOne() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setIsScrolled(window.scrollY > 80);
        };
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (

        <div
            className={`transition-all duration-300 ${isScrolled ? "fixed top-0 left-0 right-0 z-50 py-2" : "py-5"
                }`}
        >
            <header className={` ${isScrolled ? "p-0 w-[90%] flex mx-auto font-[Roboto] overflow-hidden gap-5" : "w-[95%] flex mx-auto font-[Roboto] rounded-2xl overflow-hidden bg-[#2B7EC2]/30 gap-5 p-3"}`}>
                {/* Logo block – stays left, just shrinks on scroll */}
                <div className="flex items-stretch ">
                    <div className="flex items-center bg-white shadow-xl border-r-5 border-[#2F4191] rounded-[30px] px-5 ">
                        <img
                            src="/logo.webp"
                            alt="TechIn Logo"
                            className={` object-contain transition-all duration-300
                  ${isScrolled ? "rounded-xl h-[70px] w-[200px]" : "rounded-full h-[120px] w-[250px]"}`}
                        />
                    </div>
                </div>

                {/* Right side content */}
                <div className="flex flex-col w-full">
                    {/* TOP INFO BAR – visible only when NOT scrolled (layout 1) */}
                    {!isScrolled && (
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

                            <div className="flex items-center gap-4 text-[#2B7EC2]">
                                <FaWhatsapp className="cursor-pointer hover:opacity-80" size={20} />
                                <FaFacebookF className="cursor-pointer hover:opacity-80" size={20} />
                                <FaInstagram className="cursor-pointer hover:opacity-80" size={20} />
                            </div>
                        </div>
                    )}

                    {/* MAIN NAV BAR – same layout, just slightly tighter + fully dark on scroll (layout 2) */}
                    <div
                        className={`w-full px-5 flex justify-between items-center text-white transition-all duration-300
              ${isScrolled
                                ? "py-3 bg-black/60 rounded-full border-x-5 border-white "
                                : "py-3 bg-[#2B7EC2] rounded-full border-x-5 border-[#2F4191]"
                            }`}
                    >
                        {/* Menu links */}
                        <nav className="flex items-center gap-10 font-semibold">
                            <a className="hover:text-gray-200 cursor-pointer">Demo</a>
                            <a className="hover:text-gray-200 cursor-pointer">Pages</a>
                            <a className="hover:text-gray-200 cursor-pointer">Service</a>
                            <a className="hover:text-gray-200 cursor-pointer">Blog</a>
                            <a className="hover:text-gray-200 cursor-pointer">Contact Us</a>
                        </nav>

                        {/* Right icons + CTA */}
                        <div className="flex items-center gap-5">
                            <div className="bg-white text-[#312CF0] w-12 h-12 rounded-full flex justify-center items-center cursor-pointer">
                                <FaSearch size={18} />
                            </div>

                            <div className="bg-white text-[#312CF0] w-12 h-12 rounded-full flex justify-center items-center cursor-pointer">
                                <RxHamburgerMenu size={20} />
                            </div>

                            {/* <button className="bg-[#00C6F8] text-white font-bold px-8 py-3 rounded-lg text-[18px] shadow-md hover:bg-[#05d1ff]">
                                Get A Quote
                            </button> */}
                        </div>
                    </div>
                </div>
            </header>

        </div>

    );
}
