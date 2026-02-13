'use client';

import Image from 'next/image';
import { FaPaperPlane, FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaInstagram, FaYoutube, FaLinkedin, FaDownload } from 'react-icons/fa';
import { FaFacebookF, FaTwitter, FaPinterestP } from 'react-icons/fa';

export default function FooterNew() {
    return (
        <footer className="text-white">
            {/* <div className='text-black bg-white mt-2 mx-auto rounded-xl text-center'>
                <div className="flex  items-center gap-5 ">
                    <Image src="/logo.webp" alt="Logo" width={180} height={100} className='bg-white' />
                    <p className="text-lg border-x-3 border-[#2B7EC2] bg-white shadow-2xl p-5 rounded-lg">
                        At Techin, we deliver innovative IT solutions to help businesses thrive, offering customized strategies,
                        robust support, and cutting-edge technology for efficiency, security, and reliability.
                    </p>
                </div>
            </div> */}
            <div className="w-full bg-[#2B7EC2] py-12 px-6">
                <div className=" mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
                    <div className='text-black bg-white mt-2 mx-auto rounded-xl text-center'>
                        <div className="flex flex-col  items-center gap-5 ">
                            <Image src="/logo.webp" alt="Logo" width={180} height={100} className='bg-white' />
                            <p className="text-lg bg-white p-2 rounded-lg">
                                At Techin, we deliver innovative IT solutions to help businesses thrive, offering customized strategies,
                                robust support, and cutting-edge technology for efficiency, security, and reliability.
                            </p>
                        </div>
                    </div>
                    {/* Quick Links */}
                    <div className='flex items-start gap-10'>
                        <div>
                        <h3 className="text-xl font-bold mb-6 border-b-2 border-white inline-block pb-1 text-white">
                            Quick Links
                        </h3>
                        <ul className="space-y-3 text-white">
                            <li>About Us</li>
                            <li>Our Services</li>
                            <li>Our Project</li>
                            <li>Team</li>
                            <li>Blogs</li>
                            <li>Contact</li>
                        </ul>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-6 border-b-2 border-white inline-block pb-1 text-white">
                                Explore Products
                            </h3>

                            <div className="grid grid-cols-2 gap-6 text-white">
                                <ul className="space-y-3">
                                    <li>Ovens</li>
                                    <li>Incubators</li>
                                    <li>Shakers</li>
                                    <li>Stirrers</li>
                                    <li>Waterbaths</li>
                                    <li>Chillers</li>
                                </ul>
                                <ul className="space-y-3">
                                    <li>Ovens</li>
                                    <li>Incubators</li>
                                    <li>Shakers</li>
                                    <li>Stirrers</li>
                                    <li>Waterbaths</li>
                                    <li>Chillers</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Explore Products */}


                    {/* Contact + Address */}
                    <div className="flex flex-col gap-6">

                        {/* Contact Card */}
                        <div className="bg-white rounded-2xl p-6 shadow-md flex flex-col gap-6">

                            {/* Phone */}
                            <div className="flex items-start gap-4 group">
                                <Image
                                    alt=""
                                    width={40}
                                    height={40}
                                    src="/contact.svg"
                                    className="h-10 w-10 transition duration-300 group-hover:rotate-12"
                                />
                                <div>
                                    <p className="text-lg font-semibold text-[#2B7EC2]">
                                        Call Us For Support
                                    </p>
                                    <p className="font-bold text-black">
                                        +91 9030357676
                                    </p>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="flex items-start gap-4 group">
                                <Image
                                    alt=""
                                    width={40}
                                    height={40}
                                    src="/email.svg"
                                    className="h-10 w-10 transition duration-300 group-hover:rotate-12"
                                />
                                <div>
                                    <p className="text-lg font-semibold text-[#2B7EC2]">
                                        Email Address
                                    </p>
                                    <p className="font-bold text-black">
                                        support.india@beinglab-usa.com
                                    </p>
                                </div>
                            </div>

                        </div>

                        {/* Address Card */}
                        <div className="bg-white rounded-2xl p-6 shadow-md flex items-start gap-4 group">
                            <Image
                                alt=""
                                width={40}
                                height={40}
                                src="/map.svg"
                                className="h-10 w-10 transition duration-300 group-hover:rotate-12"
                            />
                            <div>
                                <p className="text-lg font-semibold text-[#2B7EC2]">
                                    Office Address
                                </p>
                                <p className="font-bold text-black">
                                    Nacharam, Habsiguda, Hyderabad, Telangana
                                </p>
                            </div>
                        </div>

                    </div>

                    {/* Social Media */}
                    <div className="bg-white rounded-2xl p-6 shadow-md flex flex-col justify-between">

                        <h3 className="text-xl font-bold mb-6 border-b-2 border-[#2B7EC2] inline-block pb-1 text-black">
                            Social Media
                        </h3>

                        <div className="flex gap-4 mb-6">
                            <div className="bg-[#2B7EC2] p-3 text-white rounded-full cursor-pointer">
                                <FaFacebookF />
                            </div>
                            <div className="bg-[#2B7EC2] p-3 text-white rounded-full cursor-pointer">
                                <FaInstagram />
                            </div>
                            <div className="bg-[#2B7EC2] p-3 text-white rounded-full cursor-pointer">
                                <FaYoutube />
                            </div>
                            <div className="bg-[#2B7EC2] p-3 text-white rounded-full cursor-pointer">
                                <FaLinkedin />
                            </div>
                        </div>

                        <div className="flex">
                            <input
                                type="email"
                                placeholder="Your Email Address"
                                className="py-3 px-4 rounded-l-md bg-gray-100 text-black w-full outline-none"
                            />
                            <button className="bg-black px-6 rounded-r-md flex items-center gap-2 font-bold text-white group">
                                Subscribe
                                <FaPaperPlane className="transition-transform duration-300 group-hover:rotate-45" />
                            </button>
                        </div>

                    </div>

                </div>
            </div>

            {/* Privacy Strip */}
            <div className="bg-gray-200 py-4">
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
