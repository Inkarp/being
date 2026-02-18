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

export default function Footer() {
    return (
        <footer className="bg-[#2B7EC2] text-white font-raleway">
            <div className="w-full mx-auto py-3 px-10 flex flex-col md:flex-row ">

                <div className="md:w-1/4 flex flex-col justify-center ">
                    <div className="p-3 flex items-start gap-4 group border-b border-white">
                        <Image
                            src="/location.svg"
                            alt="Location"
                            width={40}
                            height={40}
                            className="h-10 w-10 transition duration-300 group-hover:rotate-360"
                        />
                        <div>
                            <h4 className="text-black font-bold text-lg mb-1">
                                Office Address
                            </h4>
                            <p className="text-sm font-semibold text-white animate-bounce">
                                Nacharam, Habsiguda, Hyderabad, Telangana
                            </p>
                        </div>
                    </div>
                    {/* Email */}
                    <div className="p-3 flex items-start gap-4 group border-b border-white">
                        <Image
                            src="/mail.svg"
                            alt="Email"
                            width={40}
                            height={40}
                            className="h-10 w-10 group-hover:rotate-360 transition duration-300"
                        />
                        <div>
                            <h4 className="text-black font-bold text-lg mb-1">
                                Email Address
                            </h4>
                            <p className="text-sm font-semibold text-white animate-bounce">
                                support.india@beinglab-usa.com
                            </p>
                        </div>
                    </div>
                    {/* Phone */}
                    <div className="p-3 flex items-start gap-4 group">
                        <Image
                            src="/phone.svg"
                            alt="Phone"
                            width={40}
                            height={40}
                            className="h-10 w-10 group-hover:rotate-360 transition duration-300"
                        />
                        <div className=''>
                            <h4 className="text-black font-bold text-lg mb-1">
                                Call Us For Support
                            </h4>
                            <p className="text-sm font-semibold text-white animate-bounce">
                                +91 9030357676
                            </p>
                        </div>
                    </div>
                </div>

                <div className="md:w-3/4 flex flex-col justify-center items-center gap-10">
                    {/* ================= ROW 1 ================= */}
                    <div className="flex flex-wrap gap-15">
                        {/* Quick Links */}
                        <div>
                            <h3 className="text-xl font-bold border-b-2 border-white inline-block mb-4">
                                Quick Links
                            </h3>
                            <div className='flex gap-5'>
                                <ul className="space-y-2 text-md">
                                    <li>
                                        <Link
                                            href="/"
                                            className="relative inline-block group"
                                        >
                                            Home
                                            <span className="absolute left-1/2 -bottom-1 h-[1px] w-0 bg-white transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
                                        </Link>
                                    </li>
                                    <li>  <Link href="/contact-us" className="relative inline-block group">
                                        Contact Us
                                        <span className="absolute left-1/2 -bottom-1 h-[1px] w-0 bg-white transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
                                    </Link></li>
                                    <li>
                                        <Link href="/about-us" className="relative inline-block group">
                                            About Us
                                            <span className="absolute left-1/2 -bottom-1 h-[1px] w-0 bg-white transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
                                        </Link>
                                    </li>

                                </ul>
                                <ul className="space-y-2 text-md">
                                    <li><Link href="/products" className="relative inline-block group">
                                        Products
                                        <span className="absolute left-1/2 -bottom-1 h-[1px] w-0 bg-white transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
                                    </Link></li>
                                    <li><Link href="/events" className="relative inline-block group">
                                        Events
                                        <span className="absolute left-1/2 -bottom-1 h-[1px] w-0 bg-white transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
                                    </Link></li>
                                    <li>  <Link href="/blogs" className="relative inline-block group">
                                        Blogs
                                        <span className="absolute left-1/2 -bottom-1 h-[1px] w-0 bg-white transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
                                    </Link></li>
                                    <li><Link href="/product-profile" className="relative inline-block group">
                                        Product Profile
                                        <span className="absolute left-1/2 -bottom-1 h-[1px] w-0 bg-white transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
                                    </Link></li>
                                </ul>
                            </div>
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
                </div>
            </div >

            {/* ================= BOTTOM STRIP ================= */}
            < div className="bg-white py-4" >
                <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm text-black">
                    <p>Privacy Policy</p>
                    <p>
                        Copyright © <span className="font-semibold">Inkarp</span>. All rights reserved.
                    </p>
                    <p>Terms and Conditions</p>
                </div>
            </div >

        </footer >
    );
}
