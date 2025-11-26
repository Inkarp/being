'use client';

import { FaSearch } from 'react-icons/fa';
import { RxHamburgerMenu } from 'react-icons/rx';
import Image from 'next/image';

export default function Header() {
    return (
        <>
        <header className="w-[95%] mx-auto py-3 font-[Roboto] flex gap-5">
            <div className="w-[30%] mx-auto flex items-center justify-between px-6 rounded-full bg-gray-200 border-r-5 border-[#2F4191] ">
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

            <div className='w-[70%] flex justify-between bg-[#2B7EC2] rounded-full py-3 px-3 border-l-5 border-[#2F4191]'>
                <nav className="flex items-center gap-8 text-white font-semibold text-[18px] px-5">
                    <div className="relative group">
                        <span className="cursor-pointer group-hover:text-cyan-300">Home </span>
                    </div>
                    <div className="relative group">
                        <span className="cursor-pointer group-hover:text-cyan-300">About Us</span>
                    </div>
                    <div className="relative group">
                        <span className="cursor-pointer group-hover:text-cyan-300">Products</span>
                    </div>
                    <div className="relative group">
                        <span className="cursor-pointer group-hover:text-cyan-300">Blog </span>
                    </div>
                    <span className="cursor-pointer group-hover:text-cyan-300">Contact Us</span>
                </nav>

                {/* Right - Search & Menu */}
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
                    <div className="bg-white  w-12 h-12 rounded-full flex items-center justify-center text-[#2B7EC2] cursor-pointer">
                        <RxHamburgerMenu size={24} />
                    </div>
                </div>
            </div>

        </header>
        </>
    );
}
