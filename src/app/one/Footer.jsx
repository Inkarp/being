'use client';

import Image from 'next/image';
import { FaPaperPlane, FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaInstagram, FaYoutube, FaLinkedin } from 'react-icons/fa';
import { FaFacebookF, FaTwitter, FaPinterestP } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="text-white pt-5 w-[95%] mx-auto rounded-t-[50px]">
            {/* Top Grid Section */}
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-10">
                {/* Column 1 - Logo and Description */}
                <div className=''>
                    <div className="flex items-center gap-2 mb-4">
                        <Image src="/logo.webp" alt="Logo" width={180} height={100} />
                    </div>
                    <p className="text-lg text-black mb-6">
                        At Techin, we deliver innovative IT solutions to help businesses thrive, offering customized strategies,
                        robust support, and cutting-edge technology for efficiency, security, and reliability.
                    </p>
                </div>

                {/* Column 2 - Quick Links */}
                <div className='pt-10'>
                    <h3 className="text-xl text-black font-bold mb-4 relative pb-1 inline-block border-b-2 border-cyan-400">
                        Quick Links
                    </h3>
                    <ul className="text-md space-y-2 text-black">
                        <li>› About Us</li>
                        <li>› Our Services</li>
                        <li>› Our Project</li>
                        <li>› Team</li>
                        <li>› Blog Us</li>
                        <li>› Contact</li>
                    </ul>
                </div>

                {/* Column 3 - Explore */}
                <div className='pt-10'>
                    <h3 className="text-xl text-black font-bold mb-4 relative pb-1 inline-block border-b-2 border-cyan-400">
                        Explore Products
                    </h3>
                    <ul className="text-md space-y-2 text-black">
                        <li>Ovens</li>
                        <li> Incubators</li>
                        <li> Shakers</li>
                        <li> Stirrers</li>
                        <li> Waterbaths</li>
                        <li> Chillers</li>
                        {/* <li> Rotary Evaporators</li>
            <li> Pumps</li> */}
                    </ul>
                </div>

                {/* Column 4 - Instagram */}
                <div className='py-10 space-y-5'>
                    <h3 className="text-xl text-black font-bold mb-4 relative pb-1 inline-block border-b-2 border-cyan-400 ">
                        Social Media
                    </h3>
                    <div className='flex flex-col gap-5 '>
                        <div className="flex items-start mt-5 justify-start gap-4 mt-2 md:mt-0 transform " >
                            <div className="bg-[#2B7EC2] p-2 text-xl rounded-full text-white cursor-pointer ">
                                <FaFacebookF />
                            </div>
                            <div className="bg-[#2B7EC2] p-2 text-xl rounded-full text-white cursor-pointer ">
                                <FaInstagram />
                            </div>
                            <div className="bg-[#2B7EC2] p-2 text-xl rounded-full text-white cursor-pointer ">
                                <FaYoutube />
                            </div>
                            <div className="bg-[#2B7EC2] p-2 text-xl rounded-full text-white cursor-pointer ">
                                <FaLinkedin />
                            </div>
                        </div>
                        <div className="flex group border">
                            <input
                                type="email"
                                placeholder="Your Email Address"
                                className="py-3 px-4 rounded-l-md bg-white text-black w-full outline-none"
                            />
                            <button className="bg-[#2B7EC2] px-6 rounded-r-md flex items-center gap-2 font-bold group">
                                Subscribe
                                <FaPaperPlane className="transition-transform duration-300 group-hover:rotate-45 " />
                            </button>

                        </div>
                    </div>
                    {/* <div className="grid grid-cols-3 gap-2">
            {[...Array(6)].map((_, i) => (
              <Image
                key={i}
                // src={`/insta${i + 1}.jpg`} 
                src={"/about-us.png"}
                alt={`Instagram ${i + 1}`}
                width={100}
                height={100}
                className="rounded-md object-cover w-full h-[70px]"
              />
            ))}
          </div> */}
                </div>
            </div>

            {/* Contact Strip */}
            <div className="py-5 px-15">
                <div className="max-w-7xl bg-[#2B7EC2] text-white mx-auto py-3 px-5 flex flex-col lg:flex-row justify-between items-center gap-6 text-black font-bold text-sm md:text-base rounded-xl">
                    <div className="flex items-center gap-10">
                        {/* <FaMapMarkerAlt size={32} /> */}
                        <img src="/White_3.svg" className='h-10 w-10' />
                        <div className='  '>
                            <p className="text-sm font-semibold">Office Address</p>
                            <p className="text-xl font-bold">Nacharam, Habsiguda , Hyderabad, Telangana</p>
                        </div>
                        <div className='h-20 bg-white w-px'></div>
                    </div>
                    <div className="flex items-center gap-10">
                        {/* <FaEnvelope size={32} /> */}
                        <img src="/White_1.svg" className='h-10 w-10' />
                        <div>
                            <p className="text-sm font-semibold">Email Address</p>
                            <p className="text-xl font-bold">info@being.com</p>
                        </div>
                        <div className='h-20 bg-white w-px'></div>
                    </div>
                    <div className="flex items-center gap-10">
                        {/* <FaPhoneAlt size={32} /> */}
                        <img src="/White_2.svg" className='h-10 w-10' />
                        <div>
                            <p className="text-sm font-semibold">Call Us For Support</p>
                            <p className="text-xl font-bold">+91 9030357676</p>
                        </div>

                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            {/* <div className="bg-white py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm text-black">
          <p>
            Copyright © <span className=" font-semibold">Inkarp</span>. All rights reserved by{' '}
           
          </p>
          
        </div>
      </div> */}
        </footer>
    );
}
