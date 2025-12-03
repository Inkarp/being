"use client"

import { useEffect, useState } from "react";
import { FaPhoneAlt, FaClock, FaWhatsapp, FaFacebookF, FaInstagram, FaSearch } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";

import Products from "./Products";
import Services from "./Services";
import AboutSection from "./AboutOne";
import Footer from "./Footer";
import HeaderOne from "./HeaderOne";

import HeroOne from "./HeroOne";
import AboutOne from "./AboutOne";
import OfferingsSection from "./Offerings";


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
    <div className="bg-gradient-to-r from-[#E0F2FE] via-[#E0F2FE] to-[#E0F2FE]">
     {/* <div className=""> */}
     <HeaderOne />  
      <div className={isScrolled ? "pt-[0px]" : "pt-0"}>
        <HeroOne />
        {/* <Products /> */}
        {/* <Services /> */}
        {/* <AboutSection /> */}
        <AboutOne />
        <OfferingsSection />
        <Footer />
      </div>
    </div>
  );
}
