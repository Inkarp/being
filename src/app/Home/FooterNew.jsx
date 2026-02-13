'use client';

import Image from 'next/image';
import { FaPaperPlane, FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaInstagram, FaYoutube, FaLinkedin, FaDownload } from 'react-icons/fa';
import { FaFacebookF, FaTwitter, FaPinterestP } from 'react-icons/fa';

export default function FooterNew() {
    return (
        <footer className="text-white">
            <div className='text-black bg-white mt-2 mx-auto rounded-xl text-center'>
                <div className="flex  items-center gap-5 ">
                    <Image src="/logo.webp" alt="Logo" width={180} height={100} className='bg-white' />
                    <p className="text-lg border-x-3 border-[#2B7EC2] bg-white shadow-2xl p-5 rounded-lg">
                       At Being, we deliver advanced laboratory and scientific solutions designed to empower research institutions, pharmaceutical companies, and industrial laboratories. We provide precision-engineered instruments, dependable technical support, and application-focused expertise to ensure accuracy, reliability, and long-term performance across every stage of scientific work.
                    </p>
                </div>
            </div>
            <div className='flex w-full mx-auto gap-10 flex-col md:flex-row bg-[#2B7EC2] p-5'>
                <div className="w-full mx-auto px-8 py-5 flex gap-5 bg-[#2B7EC2]">
                    <div className='w-full'>
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
                    <div className='w-full'>
                        <h3 className="text-xl font-bold mb-4 relative pb-1 inline-block border-b-2 [#2B7EC2]">
                            Explore Products
                        </h3>
                        <div className='flex gap-10'>
                            <ul className="text-md space-y-2">
                                <li>Ovens</li>
                                <li>Incubators</li>
                                <li>Shakers</li>
                                <li>Stirrers</li>
                                <li>Waterbaths</li>
                                <li>Chillers</li>
                            </ul>
                            <ul className="text-md space-y-2">
                                <li>Ovens</li>
                                <li>Incubators</li>
                                <li>Shakers</li>
                                <li>Stirrers</li>
                                <li>Waterbaths</li>
                                <li>Chillers</li>
                            </ul>
                        </div>
                    </div>
                    <div className="w-full flex flex-col gap-6">

                        {/* Contact Card (Phone + Email) */}
                        <div className="bg-white rounded-2xl p-6 flex flex-col gap-6 shadow-md">

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
                        <div className="bg-white rounded-2xl p-6 flex items-start gap-4 shadow-md group">
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

                </div>
                <div className=" text-white mx-auto py-3 px-5 flex flex-col justify-between items-center gap-6 text-black font-bold text-sm md:text-base rounded-xl border border-[#2B7EC2]">
                    <div className=''>
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
