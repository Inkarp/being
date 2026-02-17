'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
    FaPaperPlane,
    FaFacebookF,
    FaInstagram,
    FaYoutube,
    FaLinkedin
} from 'react-icons/fa';

export default function FooterNew() {
    return (
        <footer className="bg-[#2B7EC2] text-white font-raleway">

            {/* ================= MAIN SECTION ================= */}
            <div className="w-[90%] mx-auto py-14 flex flex-col md:flex-row gap-14">

                {/* ================= LEFT SIDE (1/3 FULL HEIGHT) ================= */}
                <div className="md:w-1/3 flex flex-col justify-between space-y-6">

                    <div>
                        <Image
                            src="/logo.webp"
                            alt="Being Logo"
                            width={220}
                            height={120}
                            className="bg-white p-3 rounded-lg"
                        />

                        <p className="mt-6 text-lg leading-relaxed">
                            At Being, we deliver advanced laboratory and scientific solutions designed to empower research institutions, pharmaceutical companies, and industrial laboratories.
                            We provide precision-engineered instruments, dependable technical support, and application-focused expertise to ensure accuracy, reliability, and long-term performance across every stage of scientific work.
                        </p>
                    </div>

                </div>

                {/* ================= RIGHT SIDE (2/3 WITH 2 ROWS INSIDE) ================= */}
                <div className="md:w-2/3 flex flex-col justify-between">

                    {/* ================= ROW 1 ================= */}
                    <div className="flex flex-wrap gap-8">
                        {/* Quick Links */}
                        <div>
                            <h3 className="text-xl font-bold border-b-2 border-white inline-block mb-4">
                                Quick Links
                            </h3>
                            <ul className="space-y-2 text-md">
                                <li>About Us</li>
                                <li>Our Services</li>
                                <li>Our Projects</li>
                                <li>Team</li>
                                <li>Blogs</li>
                                <li>Contact</li>
                            </ul>
                        </div>

                        {/* Explore Products */}
                        <div>
                            <h3 className="text-xl font-bold border-b-2 border-white inline-block mb-4">
                                Explore Products
                            </h3>
                            <div className='flex gap-5'>
                                <ul className="space-y-2 text-md">

                                    <li>
                                        <Link
                                            href="/products/laboratory-ovens"
                                            className="relative inline-block group"
                                        >
                                            Ovens
                                            <span className="absolute left-1/2 -bottom-1 h-[1px] w-0 bg-white transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
                                        </Link>
                                    </li>

                                    <li>
                                        <Link
                                            href="/products/incubators"
                                            className="relative inline-block group"
                                        >
                                            Incubators
                                            <span className="absolute left-1/2 -bottom-1 h-[1px] w-0 bg-white transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
                                        </Link>
                                    </li>

                                    <li>
                                        <Link
                                            href="/products/chillers"
                                            className="relative inline-block group"
                                        >
                                            Chillers
                                            <span className="absolute left-1/2 -bottom-1 h-[1px] w-0 bg-white transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
                                        </Link>
                                    </li>

                                    <li>
                                        <Link
                                            href="/products/rotary-evaporators"
                                            className="relative inline-block group"
                                        >
                                            Rotary Evaporators
                                            <span className="absolute left-1/2 -bottom-1 h-[1px] w-0 bg-white transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
                                        </Link>
                                    </li>

                                    <li>
                                        <Link
                                            href="/products/waterbaths"
                                            className="relative inline-block group"
                                        >
                                            Waterbaths
                                            <span className="absolute left-1/2 -bottom-1 h-[1px] w-0 bg-white transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
                                        </Link>
                                    </li>

                                </ul>

                                <ul className="space-y-2 text-md">

                                    <li>
                                        <Link
                                            href="/products/pumps"
                                            className="relative inline-block group"
                                        >
                                            Pumps
                                            <span className="absolute left-1/2 -bottom-1 h-[1px] w-0 bg-white transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
                                        </Link>
                                    </li>

                                    <li>
                                        <Link
                                            href="/products/cabinets"
                                            className="relative inline-block group"
                                        >
                                            Cabinets
                                            <span className="absolute left-1/2 -bottom-1 h-[1px] w-0 bg-white transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
                                        </Link>
                                    </li>

                                    <li>
                                        <Link
                                            href="/products/freezers"
                                            className="relative inline-block group"
                                        >
                                            Freezers
                                            <span className="absolute left-1/2 -bottom-1 h-[1px] w-0 bg-white transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
                                        </Link>
                                    </li>

                                    <li>
                                        <Link
                                            href="/products/digital-viscometers"
                                            className="relative inline-block group"
                                        >
                                            Digital Viscometers
                                            <span className="absolute left-1/2 -bottom-1 h-[1px] w-0 bg-white transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
                                        </Link>
                                    </li>

                                    <li>
                                        <Link
                                            href="/products/muffle-furnace"
                                            className="relative inline-block group"
                                        >
                                            Muffle Furnace
                                            <span className="absolute left-1/2 -bottom-1 h-[1px] w-0 bg-white transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
                                        </Link>
                                    </li>

                                </ul>

                            </div>
                        </div>

                        {/* Social + Subscribe */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-bold border-b-2 border-white inline-block mb-4">
                                Stay Connected
                            </h3>

                            {/* Social Icons */}
                            <div className="flex gap-4">
                                <div className="bg-white p-3 rounded-full hover:text-white hover:bg-black transition-all duration-300 text-[#2B7EC2] cursor-pointer hover:scale-110 transition">
                                    <FaFacebookF />
                                </div>
                                <div className="bg-white p-3 rounded-full hover:text-white hover:bg-black transition-all duration-300 text-[#2B7EC2] cursor-pointer hover:scale-110 transition">
                                    <FaInstagram />
                                </div>
                                <div className="bg-white p-3 rounded-full hover:text-white hover:bg-black transition-all duration-300 text-[#2B7EC2] cursor-pointer hover:scale-110 transition">
                                    <FaYoutube />
                                </div>
                                <div className="bg-white p-3 rounded-full hover:text-white hover:bg-black transition-all duration-300 text-[#2B7EC2] cursor-pointer hover:scale-110 transition">
                                    <FaLinkedin />
                                </div>
                            </div>

                            {/* Subscription */}
                            <div className="flex w-full max-w-md bg-gray-300 rounded-full overflow-hidden">
                                <input
                                    type="email"
                                    placeholder="Your Email Address"
                                    className="py-3 px-4 rounded-l-md bg-white text-black w-full outline-none"
                                />
                                <button className="bg-black px-6 rounded-r-md flex items-center gap-2 font-bold group">
                                    Subscribe
                                    <FaPaperPlane className="transition-transform duration-300 group-hover:rotate-45" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* ================= ROW 2 ================= */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-white">
                        {/* Location */}
                        <div className="bg-white rounded-2xl text-black p-6 flex items-start gap-4 group border-r-2 border-gray-300">
                            <Image
                                src="/map.svg"
                                alt="Location"
                                width={40}
                                height={40}
                                className="h-10 w-10 transition duration-300 group-hover:rotate-360"
                            />
                            <div>
                                <h4 className="text-[#2B7EC2] font-bold text-lg mb-1">
                                    Office Address
                                </h4>
                                <p className="text-sm font-semibold">
                                    Nacharam, Habsiguda, Hyderabad, Telangana
                                </p>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="bg-white text-black p-6 flex items-start gap-4 group border-r-2 border-gray-300">
                            <Image
                                src="/email.svg"
                                alt="Email"
                                width={40}
                                height={40}
                                className="h-10 w-10 group-hover:rotate-360 transition duration-300"
                            />
                            <div>
                                <h4 className="text-[#2B7EC2] font-bold text-lg mb-1">
                                    Email Address
                                </h4>
                                <p className="text-sm font-semibold">
                                    support.india@beinglab-usa.com
                                </p>
                            </div>
                        </div>

                        {/* Phone */}
                        <div className="bg-white text-black p-6 rounded-xl flex items-start gap-4 group border-gray-300">
                            <Image
                                src="/contact.svg"
                                alt="Phone"
                                width={40}
                                height={40}
                                className="h-10 w-10 group-hover:rotate-360 transition duration-300"
                            />
                            <div className='animate-bounce'>
                                <h4 className="text-[#2B7EC2] font-bold text-lg mb-1">
                                    Call Us For Support
                                </h4>
                                <p className="text-sm font-semibold">
                                    +91 9030357676
                                </p>
                            </div>
                        </div>

                    </div>

                </div>
            </div>

            {/* ================= BOTTOM STRIP ================= */}
            <div className="bg-white py-4">
                <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm text-black">
                    <p>Privacy Policy</p>
                    <p>
                        Copyright © <span className="font-semibold">Inkarp</span>. All rights reserved.
                    </p>
                    <p>Terms and Conditions</p>
                </div>
            </div>

        </footer>
    );
}
