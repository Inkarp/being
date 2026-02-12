'use client';

import Image from 'next/image';
import { FaPaperPlane, FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaInstagram, FaYoutube, FaLinkedin, FaDownload } from 'react-icons/fa';
import { FaFacebookF, FaTwitter, FaPinterestP } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="text-white space-y-3 w-full bg-[#2B7EC2] font-raleway shadow-2xl">
            {/* Top Grid Section */}
            <div className="w-[90%] mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-10">
                {/* Column 1 - Logo and Description */}
                <div className='text-white p-2'>
                    <div className="flex items-center gap-2 mb-4 ">
                        <Image src="/logo.webp" alt="Logo" width={180} height={100} className='bg-white' />
                    </div>
                    <p className="text-lg mb-6">
                        At Techin, we deliver innovative IT solutions to help businesses thrive, offering customized strategies,
                        robust support, and cutting-edge technology for efficiency, security, and reliability.
                    </p>
                </div>

                {/* Column 2 - Quick Links */}
                <div className='pt-10'>
                    <h3 className="text-xl font-bold mb-4 relative pb-1 inline-block border-b-2 [#2B7EC2]">
                        Quick Links
                    </h3>
                    <ul className="text-md space-y-2">
                        <li>About Us</li>
                        <li>Our Services</li>
                        <li>Our Project</li>
                        <li>Team</li>
                        <li>Blogs</li>
                        <li>Contact</li>
                    </ul>
                </div>

                {/* Column 3 - Explore */}
                <div className='pt-10'>
                    <h3 className="text-xl font-bold mb-4 relative pb-1 inline-block border-b-2 [#2B7EC2]">
                        Explore Products
                    </h3>
                    <ul className="text-md space-y-2">
                        <li>Ovens</li>
                        <li> Incubators</li>
                        <li> Shakers</li>
                        <li> Stirrers</li>
                        <li> Waterbaths</li>
                        <li> Chillers</li>
                    </ul>
                </div>

                {/* Column 4 - Instagram */}
                <div className='py-10 space-y-5'>
                    <h3 className="text-xl border-b-2 border-white font-bold mb-4 relative pb-1 inline-block border-b-2 border-[#2B7EC2] ">
                        Social Media
                    </h3>
                    <div className='flex flex-col gap-5 '>
                        <div className="flex items-start mt-5 justify-start gap-4 mt-2 md:mt-0 transform " >
                            <div className="bg-white p-2 text-xl rounded-full text-[#2B7EC2] cursor-pointer ">
                                <FaFacebookF />
                            </div>
                            <div className="bg-white p-2 text-xl rounded-full text-[#2B7EC2] cursor-pointer ">
                                <FaInstagram />
                            </div>
                            <div className="bg-white p-2 text-xl rounded-full text-[#2B7EC2] cursor-pointer ">
                                <FaYoutube />
                            </div>
                            <div className="bg-white p-2 text-xl rounded-full text-[#2B7EC2] cursor-pointer ">
                                <FaLinkedin />
                            </div>
                        </div>
                        <div className="flex">
                            <input
                                type="email"
                                placeholder="Your Email Address"
                                className="py-3 px-4 rounded-l-md bg-white text-black w-full outline-none"
                            />
                            <button className="bg-black px-6 rounded-r-md flex items-center gap-2 font-bold group">
                                Subscribe
                                <FaPaperPlane className="transition-transform duration-300 group-hover:rotate-45 " />
                            </button>

                        </div>

                        {/* <button className="animate-bounce mt-4 bg-white text-[#2B7EC2] px-6 py-2 rounded-md font-bold hover:bg-gray-800 transition">
                            <FaDownload className="inline mr-2" /> Download Product Profile
                        </button> */}
                    </div>
                 
                </div>
            </div>

            {/* Contact Strip */}
            <div className="py-3">
                <div className="w-[90%] mx-auto bg-white text-white mx-auto py-3 px-5 flex flex-col lg:flex-row justify-between items-center gap-6 text-black font-bold text-sm md:text-base rounded-xl">
                    <div className="flex items-center gap-5 group">                      
                        <Image alt='' width={500} height={500} src="/map.svg" className='h-10 w-10 group-hover:rotate-360 transition duration-300'/>
                        <div className=''>
                            <p className="text-xl font-semibold text-[#2B7EC2]">Office Address</p>
                            <p className="text-md font-bold text-black">Nacharam, Habsiguda , Hyderabad, Telangana</p>
                        </div>
                       
                    </div>
                    <div className="flex items-center gap-5">
                        <div className='h-20 bg-black w-px'></div>
                        <div className='flex items-center justify-center group'>
                            <div>
                                <Image alt='' width={500} height={500} src="/email.svg" className='h-10 w-10 group-hover:rotate-360 transition duration-500' />
                            </div>
                            <div className='flex flex-col gap-1 p-5'>
                                <p className="text-xl font-semibold text-[#2B7EC2]">Email Address</p>
                                <p className="text-md font-bold text-black ">support.india@beinglab-usa.com</p>
                            </div>
                        </div>

                    </div>

                    <div className="flex items-center gap-5">
                        <div className='h-20 bg-black w-px'></div>
                        <div className='flex items-center justify-center group'>
                            <div>
                                <Image alt='' width={500} height={500} src="/contact.svg" className='h-10 w-10 group-hover:rotate-360 transition duration-300' />
                            </div>
                            <div className='flex flex-col gap-1 p-5 animate-bounce'>
                                <p className="text-xl font-semibold text-[#2B7EC2]">Call Us For Support</p>
                                <p className="text-md font-bold text-black">+91 9030357676</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className="bg-white py-4">
                <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm text-black">
                    <p>Privacy Policy</p>
                    <p>
                        Copyright © <span className=" font-semibold">Inkarp</span>. All rights reserved by{' '}

                    </p>
                    <p>Terms and Conditions</p>
                </div>
            </div>
        </footer>
    );
}
