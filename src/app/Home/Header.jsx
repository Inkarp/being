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
    {
      name: "Insights & Updates",
      children: [
        { name: "Events", href: "/events" },
        { name: "Blogs", href: "/blogs" },
      ],
    },
    { name: "About Us", href: "/about-us" },
    { name: "Contact Us", href: "/contact-us" },
    { name: "Product Profile", href: "/product-profile" },
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
  ];

  return (
    <div className="fixed top-0 left-1/2 -translate-x-1/2 z-50 w-[95%] sm:w-[92%] lg:w-[100%] flex items-center justify-between lg:px-0 sm:px-0 lg:py-0 sm:py-0 px-0 border-b-2 border-[#2F4191]/30 shadow-2xl backdrop-blur-lg bg-white/80 font-raleway">
      <Link href="/" className="flex items-center lg:px-10 hidden lg:block justify-center w-auto lg:w-[15%] mx-auto overflow-hidden">
        <Image
          src="/logo.webp"
          alt="Being Logo"
          width={130}
          height={100}
          // className="rounded-xl object-contain w-[70px] sm:w-[80px] lg:w-[100px] h-auto"
          priority
        />
      </Link>
      <header className="flex-1 rounded-full py-2 px-3 sm:px-4 lg:px-5 flex lg:bg-[#2B7EC2] sm:bg-white items-center justify-between lg:justify-center gap-2 sm:gap-4 lg:gap-0">

        {/* DESKTOP MENU */}
        <nav className="hidden lg:flex flex-1 justify-start items-center gap-2 xl:gap-3 font-bold font-raleway text-white text-[14px] xl:text-[15px]">

          {menuItems.map((item) => (
            <div key={item.name} className="relative group">
              {/* Parent */}
              {item.children ? (
                <span className="px-2 py-2 cursor-pointer hover:text-black hover:bg-white rounded transition block">
                  {item.name}
                </span>
              ) : (
                <Link href={item.href}>
                  <span className="px-2 py-2 hover:text-black hover:bg-white rounded transition block">
                    {item.name}
                  </span>
                </Link>
              )}

              {/* Dropdown */}
              {item.children && (
                <div className="absolute left-0 top-full mt-1 hidden group-hover:block bg-white text-black rounded-md shadow-lg w-44 z-50 overflow-hidden">
                  {item.children.map((child) => (
                    <Link key={child.name} href={child.href}>
                      <span className="block px-4 py-2 text-sm hover:bg-[#2B7EC2] hover:text-white transition">
                        {child.name}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <Link href="/" className="flex items-center lg:hidden  justify-center w-auto lg:w-[10%] overflow-hidden">
          <Image
            src="/logo.webp"
            alt="Being Logo"
            width={100}
            height={100}
            className="rounded-xl object-contain w-[80px] h-auto"
            priority
          />
        </Link>
        <div className="flex gap-3">
          {/* SEARCH TRIGGER */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center gap-2 lg:bg-white bg-black/40 rounded-full px-4 sm:px-4 py-2 h-12 sm:h-11 lg:h-9 text-[#2B7EC2] hover:bg-gray-100 transition"
            aria-label="Search products"
          >
            <FaSearch size={24} />
            <span className="hidden lg:inline text-sm text-gray-800">
              Search for products…
            </span>
          </button>

          {/* HAMBURGER */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="lg:bg-white bg-black/40 w-12 h-12 lg:hidden block rounded-full flex items-center justify-center text-[#2B7EC2] hover:bg-gray-100 transition"
            aria-label="Open menu"
          >
            <RxHamburgerMenu size={26} />
          </button>
          <div className="lg:flex hidden items-center overflow-hidden relative group">
            {socialLinks.map((item, index) => (
              <button
                key={index}
                onClick={() => window.open(item.url, "_blank")}
                className={`relative w-8 h-8 mx-1 p-1.5 rounded-full flex items-center justify-center text-lg transition-all duration-300 ease-out bg-white/80 backdrop-blur-lg border-2 border-white/40  hover:scale-110 hover:rotate-15 hover:border-[#2F4191]/80 hover:before:absolute hover:before:inset-0 hover:before:bg-gradient-to-r hover:before:from-[#2F4191]/20 hover:before:to-transparent hover:before:rounded-full hover:before:animate-ping${item.bg} ${item.textColor} hover:${item.bg} hover:${item.textColor}/90 group-hover:animate-pulse-slow active:scale-95 active:shadow-inner`}
                title={item.name || `Open ${item.platform}`}
              >
                {item.icon}
              </button>
            ))}
          </div>

        </div>
      </header >
      {/* ================= OVERLAY ================= */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
        />
      )}

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`fixed top-0 right-0 h-screen w-[85%] sm:w-[340px] max-w-[360px] bg-white shadow-xl z-50  transform transition-transform duration-300 lg:hidden ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}`}
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
          {menuItems.map((item) => (
            <div key={item.name} className="border-b pb-2">
              {item.children ? (
                <>
                  <p className="font-semibold text-[#2B7EC2]">{item.name}</p>
                  <div className="pl-4 mt-2 space-y-2">
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        href={child.href}
                        onClick={() => setIsSidebarOpen(false)}
                        className="block text-gray-700 hover:text-[#2B7EC2]"
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <Link
                  href={item.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className="block hover:text-[#2B7EC2]"
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}

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
