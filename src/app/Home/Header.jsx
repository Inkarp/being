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
  FaMapMarkerAlt,
  FaEnvelope,
} from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import Search from "./Search";

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
      {/* ================= HEADER ================= */}
      <header className="w-[90%] mx-auto px-4 lg:px-8 py-2 flex items-center justify-between font-[Roboto]">
        {/* LOGO */}
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
        <nav className="hidden lg:flex flex-1 justify-center items-center gap-6 font-semibold text-white text-[15px]">
          {menuItems.map((item) => (
            <Link key={item.name} href={item.href}>
              <span className="px-4 py-2 hover:text-black hover:bg-white rounded transition">
                {item.name}
              </span>
            </Link>
          ))}
        </nav>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3">
          {/* DESKTOP SEARCH */}
          <div className="hidden md:block w-[300px]">
            <Search />
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

      {/* ================= MOBILE SEARCH ================= */}
      {isSearchOpen && (
        <div className="md:hidden bg-[#2B7EC2] px-4 pb-4">
          <div className="bg-white rounded-full px-4 py-3 shadow-md">
            <Search />
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
    </div>
  );
}
