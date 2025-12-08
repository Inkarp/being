'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';

const sliderImages = ['/about.jpg', '/about-us.png', '/about.jpg'];

export default function HeroVideo() {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="w-[90%] mx-auto rounded-[50px] h-[90vh] flex overflow-hidden">
            {/* Left: Video + text */}
            <div className="relative w-3/5 h-full">
                {/* Video */}
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover z-0"
                >
                    <source src="/bg-video.mov" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/30 z-10" />
                <div className="absolute top-50 left-0 z-20 bg-white flex flex-col gap-5 rounded-r-xl flex justify-center items-center px-2 py-5 shadow-lg">
                    <div className='rounded-full p-1 bg-black text-white shadow-2xl'>
                        <MdNavigateNext className='h-5 w-5' />

                    </div>
                    <div className='rounded-full p-1 bg-black text-white shadow-2xl '>
                        <MdNavigateBefore className='h-5 w-5' />
                    </div>
                </div>

                {/* Top-right floating vertical button with animated letters */}
                <div className="absolute top-30 right-0 z-20 bg-white rounded-l-2xl flex justify-center items-center px-3 py-5 shadow-lg">
                    <button className="text-lg text-black uppercase flex flex-col items-center font-semibold tracking-wider">
                        {"EXPLORE".split("").map((char, index) => (
                            <span
                                key={`explore-${index}`}
                                className="inline-block animate-bounce"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                {char}
                            </span>
                        ))}

                        {/* ✅ SPACE BETWEEN WORDS */}
                        <span className="h-4"></span>

                        {/* NOW */}
                        {"NOW".split("").map((char, index) => (
                            <span
                                key={`now-${index}`}
                                className="inline-block animate-bounce"
                                style={{ animationDelay: `${(index + 8) * 0.1}s` }}
                            >
                                {char}
                            </span>
                        ))}
                    </button>
                </div>



                {/* Main Text Content over video */}
                <div className="relative z-20 h-full flex items-center px-6 md:px-16 text-white">
                    <div className="max-w-xl space-y-6">
                        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                            Empowering Your Lab Innovation
                        </h1>
                        <p className="text-lg md:text-xl text-gray-200">
                            Discover our cutting-edge solutions to accelerate scientific excellence.
                        </p>
                        <div className="flex bg-white text-black w-fit p-2 rounded-2xl">
                            <span className="inline-block animate-bounce text-xl" style={{ animationDelay: '0s' }}>L</span>
                            <span className="inline-block animate-bounce text-xl" style={{ animationDelay: '0.1s' }}>E</span>
                            <span className="inline-block animate-bounce text-xl" style={{ animationDelay: '0.2s' }}>A</span>
                            <span className="inline-block animate-bounce text-xl" style={{ animationDelay: '0.3s' }}>R</span>
                            <span className="inline-block animate-bounce text-xl" style={{ animationDelay: '0.4s' }}>N</span>

                            {/* Gap after "ABOUT" */}
                            <span className="inline-block w-2"></span> {/* adds fixed space */}

                            <span className="inline-block animate-bounce text-xl" style={{ animationDelay: '0.6s' }}>M</span>
                            <span className="inline-block animate-bounce text-xl" style={{ animationDelay: '0.7s' }}>O</span>
                            <span className="inline-block animate-bounce text-xl" style={{ animationDelay: '0.8s' }}>R</span>
                            <span className="inline-block animate-bounce text-xl" style={{ animationDelay: '0.9s' }}>E</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right: Auto-sliding image */}
            <div className="w-2/5 h-full relative bg-white">
                <div className="absolute top-50 left-0 z-20 bg-white flex flex-col gap-5 rounded-r-xl flex justify-center items-center px-2 py-5 shadow-lg">
                    <div className='rounded-full p-1 bg-black text-white shadow-2xl'>
                        <MdNavigateNext className='h-5 w-5' />

                    </div>
                    <div className='rounded-full p-1 bg-black text-white shadow-2xl '>
                        <MdNavigateBefore className='h-5 w-5' />
                    </div>
                </div>

                 <div className="absolute top-50 right-0 z-20 bg-white flex flex-col gap-5 rounded-l-xl flex justify-center items-center px-2 py-5 shadow-lg">
                    <div className='rounded-full p-1 bg-[#2B7EC2] text-white shadow-2xl'>
                        <MdNavigateNext className='h-5 w-5' />

                    </div>
                    <div className='rounded-full p-1 bg-[#2B7EC2] text-white shadow-2xl '>
                        <MdNavigateBefore className='h-5 w-5' />
                    </div>
                </div>
                <Image
                    src={sliderImages[currentSlide]}
                    alt="Auto slider"
                    fill
                    className="object-cover transition-all duration-700"
                />
            </div>
        </section>
    );
}
