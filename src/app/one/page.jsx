"use client"

import { useEffect, useState } from "react";
import { FaPhoneAlt, FaClock, FaWhatsapp, FaFacebookF, FaInstagram, FaSearch } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import Hero from "./Hero";
import Products from "./Products";
import Services from "./Services";
import AboutSection from "./about";
import Footer from "./Footer";
import HeaderOne from "./HeaderOne";



export default function Layout() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="bg-[#2B7EC2]">
     <HeaderOne />  
      <div className={isScrolled ? "pt-[160px]" : "pt-0"}>
        <Hero />
        <Products />
        <Services />
        <AboutSection />
        <Footer />
      </div>
    </div>
  );
}
