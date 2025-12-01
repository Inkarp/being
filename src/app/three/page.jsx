'use client'

import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaClock } from "react-icons/fa6";
import { FaFacebookF, FaTwitter, FaInstagram, FaPinterestP } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import Hero from "../one/Hero";
import NewHeader from "./NewHeader";
import Products from "../one/Products";
import { useEffect, useState } from "react";

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
        <>
            <NewHeader />
            <div className={isScrolled ? "pt-[160px]" : "pt-0"}>
            <Hero />
            <Products />
            </div>
        </>
    );
}
