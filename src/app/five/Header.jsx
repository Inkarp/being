'use client'

'use client'

import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { RxHamburgerMenu } from 'react-icons/rx';
import Image from 'next/image';

// Font Awesome 5 Icons
import {
  FaPaperPlane,
  FaMapMarkerAlt,
  FaEnvelope,

  FaInstagram,
  FaYoutube,
  FaLinkedin,
  FaFacebookF     // <-- ADDED
} from 'react-icons/fa';




export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed z-50 transition-all duration-300 ease-in-out ${isScrolled ? 'top-0 w-[90%] mx-auto left-20' : 'top-12 w-[95%] mx-auto left-10'
        } py-1 font-[Roboto] flex gap-5 rounded-full`}
    >
      {/* Logo Section */}
      <div className="w-[15%] flex items-center justify-between px-6 rounded-full bg-gray-200 border-x-4 border-[#2F4191]">
        <div className="flex justify-center items-center w-full px-5">
          <Image
            src="/logo.webp"
            alt="TechIn Logo"
            width={120}
            height={120}
            className="object-contain"
          />
        </div>
      </div>

      {/* Navigation + Search */}
      <div className="w-[85%] flex justify-between bg-[#2B7EC2] rounded-full py-3 px-3 border-x-4 border-[#2F4191]">
        <nav className="flex items-center gap-8 text-white font-semibold text-[18px] px-5">
          <span className="cursor-pointer group-hover:text-cyan-300">Home</span>
          <span className="cursor-pointer group-hover:text-cyan-300">About Us</span>
          <span className="cursor-pointer group-hover:text-cyan-300">Products</span>
          <span className="cursor-pointer group-hover:text-cyan-300">Blog</span>
          <span className="cursor-pointer group-hover:text-cyan-300">Contact Us</span>
        </nav>

        <div className="flex items-center gap-4">
          {/* Search bar */}
          <div className="flex items-center bg-white rounded-full px-4 py-2 shadow-inner w-[250px]">
            <input
              type="text"
              placeholder="Search Here..."
              className="outline-none text-gray-600 text-sm bg-transparent flex-1"
            />
            <div className="bg-[#2B7EC2] p-2 rounded-full text-white cursor-pointer">
              <FaSearch size={14} />
            </div>
          </div>

          {/* Hamburger */}
          <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center text-[#2B7EC2] cursor-pointer">
            <button onClick={() => setIsSidebarOpen(true)}>
              <RxHamburgerMenu size={24} />
            </button>
          </div>
        </div>
      </div>
      {isSidebarOpen && (
        <>
          {/* Overlay */}
          <div
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/20 z-40"
          />

          {/* Sidebar */}
          <div className="fixed top-0 right-0 h-full w-[340px] bg-white shadow-lg z-50 overflow-y-auto transition-transform duration-300 transform translate-x-0">
            {/* Close button */}
            <div className="flex justify-end p-4">
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="text-white bg-blue-700 px-3 py-1 rounded"
              >
                ✕
              </button>
            </div>

            <div className="px-5 space-y-5">
              {/* Logo and Text */}
              <div>
                <Image src="/logo.webp" alt="Logo" width={160} height={60} />
                <p className="text-sm text-gray-700 mt-4 leading-relaxed">
                  At <span className="font-bold text-blue-700">Techin</span>, we deliver innovative IT solutions to help
                  businesses thrive, offering customized strategies, robust support, and cutting-edge technology for
                  efficiency, security, and reliability.
                </p>
              </div>

              {/* Social Icons */}
              <div>
                <h3 className="text-lg font-bold mb-4 text-gray-700">Social Media</h3>
                <div className="flex gap-4">
                  <div className="bg-cyan-400 p-2 text-xl rounded-full text-white cursor-pointer">
                    <FaFacebookF />
                  </div>
                  <div className="bg-cyan-400 p-2 text-xl rounded-full text-white cursor-pointer">
                    <FaInstagram />
                  </div>
                  <div className="bg-cyan-400 p-2 text-xl rounded-full text-white cursor-pointer">
                    <FaYoutube />
                  </div>
                  <div className="bg-cyan-400 p-2 text-xl rounded-full text-white cursor-pointer">
                    <FaLinkedin />
                  </div>
                </div>
              </div>

              {/* Contact Section */}
              <div className="space-y-6">
                {/* Address */}
                <h3 className="text-lg font-bold mb-4 text-gray-700">Get in Touch</h3>
                <div className="flex items-start gap-4">
                  <FaMapMarkerAlt size={24} className="text-blue-700 mt-1" />
                  <div>
                    <p className="text-sm font-semibold text-gray-600">Office Address</p>
                    <p className="text-base font-bold">12th Street, New York, USA</p>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="flex items-start gap-4">
                  <FaEnvelope size={24} className="text-blue-700 mt-1" />
                  <div>
                    <p className="text-sm font-semibold text-gray-600">Contact</p>
                    <p className="text-base font-bold">info@techin.com</p>
                    <p className="text-base font-bold">+(009) 1888 000 2222</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

    </header>
  );
}
