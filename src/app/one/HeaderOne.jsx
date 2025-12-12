"use client"
import Link from 'next/link';

import { useEffect, useState } from "react";
import { FaPhoneAlt, FaClock, FaWhatsapp, FaFacebookF, FaInstagram, FaSearch } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import Image from 'next/image';
import { FaMapMarkerAlt, FaEnvelope, FaYoutube, FaLinkedin } from 'react-icons/fa';


export default function HeaderOne() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (

    <div
      className={`transition-all duration-300 ${isScrolled ? "fixed top-0 left-0 right-0 z-50 py-2 transition-all duration-500" : ""
        }`}
    >
      <header className={` ${isScrolled ? "p-0 w-[90%] flex mx-auto font-[Roboto] overflow-hidden gap-5 transition-all duration-500" : "w-[95%] flex mx-auto font-[Roboto] rounded-2xl overflow-hidden gap-5 p-3"}`}>
        {/* Logo block – stays left, just shrinks on scroll */}
        <div className="flex items-stretch">
          <div
            className={`${isScrolled
              ? "flex items-center border-r-[5px] hidden border-[#2F4191] rounded-[30px] px-5 transition-all duration-500 "
              : ""
              }`}
          >
            <img
              src="/logo.webp"
              alt="TechIn Logo"
              className={`object-contain transition-all duration-300 ${isScrolled
                ? "rounded-xl h-[70px] w-[200px] "
                : "rounded-full h-[120px] w-[250px]"
                }`}
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
            className={`w-full px-5 flex justify-between items-center text-white
              ${isScrolled
                ? "py-1 text-black bg-white rounded-full border-x-5 border-[#2F3F8D] transition-all duration-300 "
                : "py-3 bg-[#2B7EC2] rounded-full border-x-5 border-[#2F3F8D]"
              }`}
          >
            {/* Menu links */}
            <nav
              className={`${isScrolled
                ? "flex items-center gap-6 font-semibold text-black transition-all duration-300"
                : "flex items-center gap-6 font-semibold text-white"
                }`}
            >
              {[
                { name: "Home", href: "/one" },
                { name: "Applications", href: "/applications" },
                { name: "Products", href: "/products" },
                { name: "Events", href: "/events" },
                { name: "Blogs", href: "/blog" },
                { name: "About Us", href: "/about-us" },
                { name: "Contact Us", href: "/contact-us" },
              ].map((item, index) => (
                <Link key={index} href={item.href} passHref>
                  <div className="group relative h-[30px] flex items-center cursor-pointer overflow-hidden px-3">
                    {/* Layered background hover animation */}
                    <div className="absolute top-0 right-0 bottom-0 left-0 bg-white group-hover:scale-y-100 group-hover:origin-bottom scale-y-0 origin-top transition-transform duration-300 delay-[0s] z-0" />
                    <div className="absolute top-0 right-0 bottom-0 left-0 bg-[#2B7EC2] group-hover:scale-y-100 group-hover:origin-bottom scale-y-0 origin-top transition-transform duration-300 delay-[0.05s] z-0" />
                    <div className="absolute top-0 right-0 bottom-0 left-0 bg-white group-hover:scale-y-100 group-hover:origin-bottom scale-y-0 origin-top transition-transform duration-300 delay-[0.1s] z-0" />
                    <div className="absolute top-0 right-0 bottom-0 left-0 bg-white group-hover:scale-y-100 group-hover:origin-bottom scale-y-0 origin-top transition-transform duration-300 delay-[0.15s] z-0" />

                    {/* Text with animated swap */}
                    <div className="relative z-10">
                      <span className="block group-hover:text-black transition-all duration-300">
                        {item.name}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </nav>


            {/* Right icons + CTA */}
            <div className="flex items-center gap-5">
              <div className="bg-white text-[#312CF0] w-12 h-12 rounded-full flex justify-center items-center cursor-pointer">
                <FaSearch size={18} />
              </div>

              <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center text-[#2B7EC2] cursor-pointer">
                <button onClick={() => setIsSidebarOpen(true)}>
                  <RxHamburgerMenu size={24} />
                </button>
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
