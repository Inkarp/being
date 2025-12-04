'use client';

import Image from 'next/image';
import { FaArrowCircleRight } from 'react-icons/fa';

export default function HeroSection() {
  return (
    <section className="relative w-[95%] mx-auto rounded-[35px] bg-gradient-to-r from-[#0a0a8f] via-[#2b44c2] to-[#0a0a8f] h-[600px] text-white py-20 overflow-hidden">
      {/* Background abstract lines - you can replace with actual SVG if you have */}
      <div className="absolute inset-0  bg-[url('/about.jpg')] bg-cover bg-center opacity-30 z-0" />

      {/* Main content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 flex flex-col items-center text-center">
        {/* Tagline */}
        <p className="bg-white text-black text-sm font-semibold px-4 py-1 rounded-full mb-4 flex justify-center gap-[2px]">
          {"Best Laboratory Solution".split("").map((char, index) => (
            <span
              key={index}
              className="inline-block animate-bounce"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </p>


        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          Advancing Precision in<br /> Laboratory Technology
        </h1>

        {/* Main Image with circular badge */}
        <div className="relative  mt-30">
          {/* Main Image */}
          <img
            src="/about.jpg" // Replace later
            alt="Team Working"
            className="rounded-xl w-full max-w-4xl shadow-lg z-50"
          />

          {/* Rotating circle badge (absolute center top) */}
          <div className="absolute left-1/2 -top-10 transform -translate-x-1/2">
            {/* <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center spin-slow shadow-md"> */}
            {/* <span className="text-xs text-[#2B7EC2] font-bold text-center">
                LEARN MORE <br /> SCROLL
              </span> */}
            <div className="group relative p-2 bg-[#2B7EC2] rounded-full w-fit flex items-center justify-center">
              <img
                src="/Circle-Button.svg"
                className="w-20 h-20 transition-transform duration-500 spin-slow "
                alt="Spinning Image"
              />
              <FaArrowCircleRight
                size={24}
                className="absolute text-white transition-transform duration-500 bounce-right"
              />
            </div>

            {/* </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}
