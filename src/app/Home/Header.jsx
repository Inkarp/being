"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
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
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchTimeoutRef = useRef(null);

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Events", href: "/events" },
    { name: "Blogs", href: "/blog" },
    { name: "About Us", href: "/about-us" },
    { name: "Contact Us", href: "/contact-us" },
  ];

  // Debounce search input
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 400);

    return () => clearTimeout(searchTimeoutRef.current);
  }, [searchQuery]);

  // Fetch products when debounced query changes
  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const fetchProducts = async () => {
      setIsSearching(true);
      try {
        const res = await fetch(`/api/products?q=${encodeURIComponent(debouncedQuery)}`);
        const data = await res.json();
        setSearchResults(data.slice(0, 5)); // Show top 5 results
      } catch (error) {
        console.error("Search error:", error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    };

    fetchProducts();
  }, [debouncedQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-[#2B7EC2]/80 shadow-lg">
      <header className="w-[90%] mx-auto px-4 lg:px-8 py-2 flex items-center justify-between font-[Roboto]">
        <Link href="/" className="flex items-center bg-white border-r-6 border-black rounded-r-xl">
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
                <div className="absolute inset-0 bg-white scale-y-0 origin-top group-hover:scale-y-100 group-hover:origin-bottom transition-transform duration-300 delay-[0s] z-0" />
                <div className="absolute inset-0 bg-[#2B7EC2] scale-y-0 origin-top group-hover:scale-y-100 group-hover:origin-bottom transition-transform duration-300 delay-[0.05s] z-0" />
                <div className="absolute inset-0 bg-white scale-y-0 origin-top group-hover:scale-y-100 group-hover:origin-bottom transition-transform duration-300 delay-[0.1s] z-0" />
                <div className="absolute inset-0 bg-white scale-y-0 origin-top group-hover:scale-y-100 group-hover:origin-bottom transition-transform duration-300 delay-[0.15s] z-0" />
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
          <div className="hidden md:flex items-center bg-white rounded-full px-4 py-2 w-[300px] shadow-inner relative group">
            <form onSubmit={handleSearchSubmit} className="w-full flex items-center">
              <input
                type="text"
                placeholder="Search products..."
                className="outline-none text-gray-600 text-sm bg-transparent flex-1 pr-8"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <FaSearch className="text-[#2B7EC2] absolute right-3" />
            </form>
            {/* Search Results Dropdown */}
            {searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-xl border z-50 max-h-60 overflow-auto">
                <div className="p-3 border-b">
                  <p className="text-sm text-gray-500">
                    {isSearching ? "Searching..." : `${searchResults.length} results`}
                  </p>
                </div>
                {searchResults.map((product) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.slug || product.id}`}
                    className="block p-3 hover:bg-gray-50 border-b last:border-b-0"
                    onClick={() => {
                      setSearchQuery("");
                      setSearchResults([]);
                    }}
                  >
                    <div className="font-medium text-gray-900">{product.name}</div>
                    <div className="text-sm text-gray-500 truncate">{product.category}</div>
                  </Link>
                ))}
              </div>
            )}
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

      {/* MOBILE SEARCH BAR */}
      {isSearchOpen && (
        <div className="md:hidden bg-[#2B7EC2] px-4 pb-4">
          <form onSubmit={handleSearchSubmit} className="bg-white rounded-full px-4 py-3 shadow-md">
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Search products..."
                className="outline-none text-gray-600 text-sm bg-transparent flex-1"
                value={searchQuery}
                onChange={handleSearchChange}
                autoFocus
              />
              <FaSearch className="text-[#2B7EC2]" />
            </div>
          </form>
        </div>
      )}

      {/* OVERLAY */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/30 z-40"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed top-0 right-0 h-screen w-[340px] bg-white shadow-xl z-50
  transform transition-transform duration-300
  ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header (fixed) */}
        <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-white z-10">
          <Image src="/logo.webp" alt="Logo" width={160} height={50} />

          <button
            onClick={() => setIsSidebarOpen(false)}
            className="bg-[#2B7EC2] text-white px-3 py-1 rounded"
            aria-label="Close sidebar"
          >
            ✕
          </button>
        </div>

        {/* Scrollable content */}
        <div className="h-[calc(100vh-72px)] overflow-y-auto px-6 py-6 space-y-8">

          {/* Navigation */}
          <nav className="space-y-4 font-semibold text-gray-700">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsSidebarOpen(false)}
                className="block border-b pb-2 hover:text-[#2B7EC2] transition"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Social */}
          <div>
            <h3 className="font-bold mb-3 text-gray-700">Follow Us</h3>
            <div className="flex gap-3">
              {[FaFacebookF, FaInstagram, FaWhatsapp, FaYoutube, FaLinkedin].map(
                (Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="bg-[#2B7EC2] p-2 rounded-full text-white cursor-pointer hover:opacity-90 transition"
                    aria-label="Social link"
                  >
                    <Icon />
                  </a>
                )
              )}
            </div>
          </div>

          {/* Contact */}
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
                href="mailto:info@techin.com"
                className="text-sm text-gray-700 hover:text-[#2B7EC2]"
              >
                info@techin.com
              </a>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
