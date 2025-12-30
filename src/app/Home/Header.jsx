"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  FaSearch,
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaYoutube,
  FaLinkedin,
} from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";

export default function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Events", href: "/events" },
    { name: "Blogs", href: "/blog" },
    { name: "About Us", href: "/about-us" },
    { name: "Contact Us", href: "/contact-us" },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-[#2B7EC2] shadow-lg">
      {/* ================= HEADER BAR ================= */}
      <header className="w-[90%] mx-auto px-4 lg:px-8 py-2 flex items-center justify-between font-[Roboto]">
        {/* LOGO (BIGGER) */}
        <Link href="/" className="flex items-center bg-white">
          <Image
            src="/logo.webp"
            alt="TechIn Logo"
            width={100}
            height={100}
            className="rounded-xl object-cover"
            priority
          />
        </Link>

        <nav className="hidden lg:flex flex-1 justify-center items-center gap-6 font-semibold text-white text-[15px]">
          {menuItems.map((item, index) => (
            <Link key={index} href={item.href} passHref>
              <div className="group relative h-[36px] flex items-center cursor-pointer overflow-hidden px-4">

                {/* Layered background hover animation */}
                <div className="absolute inset-0 bg-white scale-y-0 origin-top group-hover:scale-y-100 group-hover:origin-bottom transition-transform duration-300 delay-[0s] z-0" />
                <div className="absolute inset-0 bg-[#2B7EC2] scale-y-0 origin-top group-hover:scale-y-100 group-hover:origin-bottom transition-transform duration-300 delay-[0.05s] z-0" />
                <div className="absolute inset-0 bg-white scale-y-0 origin-top group-hover:scale-y-100 group-hover:origin-bottom transition-transform duration-300 delay-[0.1s] z-0" />
                <div className="absolute inset-0 bg-white scale-y-0 origin-top group-hover:scale-y-100 group-hover:origin-bottom transition-transform duration-300 delay-[0.15s] z-0" />

                {/* Text */}
                <div className="relative z-10">
                  <span className="block transition-colors duration-300 group-hover:text-black">
                    {item.name}
                  </span>
                </div>

              </div>
            </Link>
          ))}
        </nav>


        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3">

          {/* DESKTOP SEARCH */}
          <div className="hidden md:flex items-center bg-white rounded-full px-4 py-2 w-[240px] shadow-inner">
            <input
              type="text"
              placeholder="Search here..."
              className="outline-none text-gray-600 text-sm bg-transparent flex-1"
            />
            <FaSearch className="text-[#2B7EC2]" />
          </div>

          {/* MOBILE SEARCH ICON */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="md:hidden bg-white w-12 h-12 rounded-full flex items-center justify-center text-[#2B7EC2]"
          >
            <FaSearch size={18} />
          </button>

          {/* HAMBURGER */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="bg-white w-12 h-12 rounded-full flex items-center justify-center text-[#2B7EC2]"
          >
            <RxHamburgerMenu size={26} />
          </button>
        </div>
      </header>

      {/* ================= MOBILE SEARCH BAR ================= */}
      {isSearchOpen && (
        <div className="md:hidden bg-[#2B7EC2] px-4 pb-4">
          <div className="flex items-center bg-white rounded-full px-4 py-3 shadow-md">
            <input
              type="text"
              placeholder="Search products..."
              className="outline-none text-gray-600 text-sm bg-transparent flex-1"
              autoFocus
            />
            <FaSearch className="text-[#2B7EC2]" />
          </div>
        </div>
      )}

      {/* ================= OVERLAY ================= */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/30 z-40"
        />
      )}

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`fixed top-0 right-0 h-full w-[340px] bg-white shadow-xl z-50 transform transition-transform duration-300
        ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* CLOSE */}
        <div className="flex justify-end p-4">
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="bg-[#2B7EC2] text-white px-3 py-1 rounded"
          >
            ✕
          </button>
        </div>

        <div className="px-6 space-y-6">

          {/* SIDEBAR LOGO */}
          <Image src="/logo.webp" alt="Logo" width={200} height={60} />

          {/* MOBILE NAV */}
          <nav className="space-y-4 font-semibold text-gray-700">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsSidebarOpen(false)}
                className="block border-b pb-2"
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
                  <div
                    key={i}
                    className="bg-[#2B7EC2] p-2 rounded-full text-white cursor-pointer"
                  >
                    <Icon />
                  </div>
                )
              )}
            </div>
          </div>

          {/* CONTACT */}
          <div className="space-y-4">
            <h3 className="font-bold text-gray-700">Get in Touch</h3>

            <div className="flex gap-3">
              <FaMapMarkerAlt className="text-[#2B7EC2]" />
              <p className="text-sm text-gray-700">
                12th Street, New York, USA
              </p>
            </div>

            <div className="flex gap-3">
              <FaEnvelope className="text-[#2B7EC2]" />
              <p className="text-sm text-gray-700">
                info@techin.com
              </p>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
