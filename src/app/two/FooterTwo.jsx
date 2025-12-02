import React from "react";
import {
    FaFacebookF,
    FaTwitter,
    FaPinterestP,
    FaGithub,
    FaLinkedinIn,
} from "react-icons/fa";

export default function FooterTwo() {
    return (
        <footer className=" w-[95%] mx-auto bg-[#2F4191] text-white font-[Roboto] rounded-2xl">
            {/* Top newsletter barF */}
            <div className="bg-[#2B7EC2] w-full">
                <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 py-8 gap-6">
                    {/* Left text */}
                    <div className="flex items-center gap-4 space-x-5">
                        <div className="flex items-center gap-3 bg-white rounded-2xl">
                            <img src={'/logo.webp'} className="h-[80px] w-[180px]" />
                            <hr className="h-15 w-2 bg-black" />
                             <p className="text-black">Established in 1985, Inkarp is a trusted name in the scientific instrument industry, offering comprehensive research solutions and exceptional after-sales support. With a robust presence in India, we're a go-to choice for a diverse range of sectors. Our enduring partnerships with major manufacturers globally ensure sustained customer support.</p>
                        </div>
                       
                    </div>
                    
                   
                </div>
            </div>

            {/* Main footer content */}
            <div className="max-w-5xl mx-auto px-6 pt-10 pb-6">
                <div className="grid gap-10 md:grid-cols-4">
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Our Services</h4>
                        <ul className="space-y-2 text-sm text-white/80">
                            <li>Home</li>
                            <li>About</li>
                            <li>Blog</li>
                            <li>Contact Us</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4">Products</h4>
                        <ul className="space-y-2 text-sm text-white/80">
                            <li>Ovens</li>
                            <li>Ovens</li>
                            <li>Ovens</li>
                            <li>Ovens</li>

                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Our Location</h4>
                        <ul className="space-y-2 text-sm text-white/80">
                            <div className="space-y-2 text-sm text-white/80">
                                <div className="flex items-start gap-2">
                                    <span className="text-[#ff3b30] mt-[2px]">📞</span>
                                    <span>+91 458 654 528</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <span className="text-[#ff3b30] mt-[2px]">✉️</span>
                                    <span>info@example.com</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <span className="text-[#ff3b30] mt-[2px]">📍</span>
                                    <span>60 East 65th Street, NY</span>
                                </div>
                            </div>
                        </ul>
                    </div>
                     <div className="flex flex-col">
                        <div className="leading-snug text-left">
                            <p className="text-xl font-semibold">Get latest updates Subscribe</p>
                            <p className="text-xl font-semibold">to Our Newsletter</p>
                        </div>
                        <div className="flex-1 flex items-center gap-4 md:justify-end w-full">
                            <div className="flex-1 border-b border-white/40 pb-1">
                                <input
                                    type="email"
                                    placeholder="Your Mail Address"
                                    className="w-full bg-transparent outline-none text-sm placeholder:text-white/50"
                                />
                            </div>
                            <button className="bg-white hover:bg-[#e43228] text-black text-sm font-semibold px-6 py-3 rounded-sm whitespace-nowrap">
                                Subscribe Now
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-8 border-t border-white/10 pt-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/60">
                    <p>© 2025 Inkarp All rights reserved.</p>
                    <p>Privacy Policy</p>
                    <p>Terms and Conditions</p>
                    <div className="flex items-center gap-4 text-lg">
                        <a href="#" aria-label="Facebook" className="hover:text-white">
                            <FaFacebookF />
                        </a>
                        <a href="#" aria-label="Twitter" className="hover:text-white">
                            <FaTwitter />
                        </a>

                        <a href="#" aria-label="LinkedIn" className="hover:text-white">
                            <FaLinkedinIn />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
