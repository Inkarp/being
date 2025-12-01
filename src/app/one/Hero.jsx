import React from 'react';
import { FaFlask, FaLeaf } from 'react-icons/fa';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

const Hero = () => {
    return (
        <section className="relative mt-25 w-[95%] mx-auto rounded-2xl my-3 min-h-screen overflow-hidden">
            <div className="absolute inset-0">
                <img
                    src="/about-us.png"
                    alt="Lab Background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#003863]/90 to-transparent" />
            </div>

            {/* Content */}
            {/* <div className="relative z-10 flex flex-col justify-center h-full px-6 sm:px-12 lg:px-24 text-white">
                <p className="text-sm sm:text-base font-light mb-2">
                    Affordable Diagnostic services
                </p>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 max-w-3xl">
                    Diagnostic Laboratory strives for excellence
                </h1>

          
                <div className="flex gap-10 mb-8">
                    <div className="flex items-center gap-3">
                        <FaFlask size={28} className="text-white" />
                        <div>
                            <p className="text-sm font-semibold">General Lab Instrumets</p>
                            <p className="text-sm font-semibold">Lets make the difference</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <FaLeaf size={28} className="text-white" />
                        <div>
                            <p className="text-sm font-semibold">Naturopathic</p>
                            <p className="text-sm font-semibold">customer service</p>
                        </div>
                    </div>
                    <button className="bg-[#FFA500] text-white px-6 py-3 rounded font-semibold hover:bg-[#ff9900] transition">
                        Our Products
                    </button>
                </div>
            </div> */}
            
            <button className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full">
                <IoIosArrowBack size={24} />
            </button>
            <button className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full">
                <IoIosArrowForward size={24} />
            </button>
        </section>
    );
};

export default Hero;
