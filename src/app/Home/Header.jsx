"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  FaSearch,
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaYoutube,
  FaLinkedin,
  FaMapMarkerAlt,
  FaEnvelope,
  FaLinkedinIn,
} from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import Search from "./Search";
import SearchOverlay from "./SearchOverlay";

export default function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => (document.body.style.overflow = "");
  }, [isOpen]);


  const menuItems = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Insights & Updates", href: "" },
    // { name: "Events", href: "/events" },
    // { name: "Blogs", href: "/blog" },
    { name: "About Us", href: "/about-us" },
    { name: "Contact Us", href: "/contact-us" },
    { name: "Product Profile", href: "/product-profile" },
    // { name: "Customers", href: "/customers" }
  ];

  const socialLinks = [
    {
      icon: <FaLinkedinIn size={28} />,
      url: "https://www.linkedin.com/company/yourcompany",
      bg: "bg-white",
      textColor: "text-blue-600"
    },
    {
      icon: <FaInstagram size={28} />,
      url: "https://www.instagram.com/yourpage",
      bg: "bg-white",
      textColor: "text-pink-500"
    },
    {
      icon: <FaFacebookF size={28} />,
      url: "https://www.facebook.com/yourpage",
      bg: "bg-white",
      textColor: "text-blue-700"
    },
    {
      icon: <FaWhatsapp size={28} />,
      url: "https://wa.me/919030357676",
      bg: "bg-white",
      textColor: "text-green-500"
    },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-[#2B7EC2] shadow-lg">
      <header className="w-[90%] mx-auto py-2 flex items-center justify-between">
        <Link href="/" className="flex items-center bg-white rounded-r-xl border-r-5 border-[#2F4191]">
          <Image
            src="/logo.webp"
            alt="Being Logo"
            width={100}
            height={100}
            className="rounded-xl object-cover"
            priority
          />
        </Link>
        {/* DESKTOP MENU */}
        <nav className="hidden lg:flex flex-1 justify-center items-center gap-3 font-semibold font-raleway text-white text-[15px]">
          {menuItems.map((item) => (
            <Link key={item.name} href={item.href}>
              <span className="px-4 py-2 hover:text-black hover:bg-white rounded transition">
                {item.name}
              </span>
            </Link>
          ))}
        </nav>
        <div className="flex gap-3">
          {/* SEARCH TRIGGER */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center gap-2 bg-white rounded-full px-2 py-2 lg:h-9 h-12 text-[#2B7EC2] hover:bg-gray-100 transition"
            aria-label="Search products"
          >
            <FaSearch size={20} />
            <span className="hidden lg:inline text-sm text-gray-500">
              Search for products…
            </span>
          </button>

          {/* HAMBURGER */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="bg-white w-12 h-12 lg:hidden block rounded-full flex items-center justify-center text-[#2B7EC2] hover:bg-gray-100 transition"
            aria-label="Open menu"
          >
            <RxHamburgerMenu size={26} />
          </button>
          <div className="lg:flex hidden items-center  overflow-hidden relative group">
            {/* Orbiting Shine Effect */}
            {/* <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 animate-shimmer [animation-duration:20s]" /> */}
            {socialLinks.map((item, index) => (
              <button
                key={index}
                onClick={() => window.open(item.url, "_blank")}
                className={`relative w-10 h-10 mx-1 p-2 rounded-full flex items-center justify-center text-lg transition-all duration-300 ease-out bg-white/80 backdrop-blur-lg border-2 border-white/40 shadow-xl hover:shadow-2xl hover:shadow-[#2F4191]/50 hover:scale-110 hover:-rotate-12 hover:border-[#2F4191]/80 hover:before:absolute hover:before:inset-0 hover:before:bg-gradient-to-r hover:before:from-[#2F4191]/20 hover:before:to-transparent hover:before:rounded-full hover:before:animate-ping${item.bg} ${item.textColor} hover:${item.bg} hover:${item.textColor}/90 group-hover:animate-pulse-slow
        active:scale-95 active:shadow-inner
      `}
                title={item.name || `Open ${item.platform}`}
              >
                {item.icon}
              </button>
            ))}
          </div>

        </div>
      </header >
      {/* ================= OVERLAY ================= */}
      {
        isSidebarOpen && (
          <div
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/30 z-40"
          />
        )
      }
      {/* ================= SIDEBAR ================= */}
      <aside
        className={`fixed top-0 right-0 h-screen w-[340px] bg-white shadow-xl z-50
        transform transition-transform duration-300
        ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* SIDEBAR HEADER */}
        <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-white">
          <Image src="/logo.webp" alt="Logo" width={140} height={40} />
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="bg-[#2B7EC2] text-white px-3 py-1 rounded"
          >
            ✕
          </button>
        </div>
        {/* SIDEBAR CONTENT */}
        <div className="h-[calc(100vh-72px)] overflow-y-auto px-6 py-6 space-y-8">
          {/* MENU */}
          <nav className="space-y-4 font-semibold text-gray-700">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsSidebarOpen(false)}
                className="block border-b pb-2 hover:text-[#2B7EC2]"
              >
                {item.name}
              </Link>
            ))}
          </nav>
          {/* SOCIAL */}
          <div>
            <h3 className="font-bold mb-3 text-gray-700">Follow Us</h3>
            <div className="flex gap-3">
              {[FaFacebookF, FaInstagram, FaWhatsapp, FaYoutube, FaLinkedin].map(
                (Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="bg-[#2B7EC2] p-2 rounded-full text-white"
                  >
                    <Icon />
                  </a>
                )
              )}
            </div>
          </div>
          {/* CONTACT */}
          <div className="space-y-4">
            <h3 className="font-bold text-gray-700">Get in Touch</h3>

            <div className="flex gap-3 items-start">
              <FaMapMarkerAlt className="text-[#2B7EC2] mt-1" />
              <p className="text-sm text-gray-700">
                12th Street, New York, USA
              </p>
            </div>

            <div className="flex gap-3 items-start">
              <FaEnvelope className="text-[#2B7EC2] mt-1" />
              <a
                href="mailto:info@being.com"
                className="text-sm text-gray-700 hover:text-[#2B7EC2]"
              >
                info@being.com
              </a>
            </div>
          </div>
        </div>
      </aside>
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </div >
  );
}
