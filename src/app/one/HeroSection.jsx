'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { FaArrowCircleRight, FaArrowRight } from 'react-icons/fa';

export default function HeroSection() {
  const typeRef = useRef(null);
  const [typing, setTyping] = useState(false);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTyping(true);
          setFinished(false);

          // typing duration must match CSS
          setTimeout(() => {
            setTyping(false);
            setFinished(true);
          }, 3500);
        } else {
          // reset on leaving
          setTyping(false);
          setFinished(false);
        }
      },
      { threshold: 0.4 }
    );

    if (typeRef.current) observer.observe(typeRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative w-[90%] mx-auto rounded-[35px] bg-gradient-to-r from-[#0a0a8f] via-[#2b44c2] to-[#0a0a8f] h-[600px] text-white py-20 overflow-hidden">
      
      {/* BG image */}
      <div className="absolute inset-0 bg-[url('/about.jpg')] bg-cover bg-center opacity-30 z-0" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 flex flex-col items-center text-center">

        {/* Tagline BOUNCE */}
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

        {/* ⭐ TYPEWRITER HEADING ⭐ */}
        <h1
          ref={typeRef}
          className={`
            text-4xl md:text-5xl font-bold leading-tight
            ${typing ? "typewriter-active" : ""}
            ${finished ? "typewriter-done" : ""}
          `}
        >
          Advancing Precision in  Laboratory Technology
        </h1>

        {/* Main Image */}
        <div className="relative mt-12">
          <img
            src="/about.jpg"
            alt="Team Working"
            className="rounded-xl w-full max-w-4xl shadow-lg z-50"
          />

          {/* Rotating Badge */}
          <div className="absolute left-1/2 -top-10 transform -translate-x-1/2">
            <div className="group relative p-2 bg-[#2B7EC2] rounded-full w-fit flex items-center justify-center">
              <img
                src="/Circle-Button.svg"
                className="w-20 h-20 transition-transform duration-500 spin-slow"
                alt="Spinning Image"
              />
              <FaArrowCircleRight
                size={24}
                className="absolute text-white transition-transform duration-500 bounce-right"
              />
            </div>

            {/* Outer Spinning Badge */}
            <div className="w-fit">
              <div className="relative group w-[120px] h-[120px] text-black">
                <svg
                  viewBox="0 0 30 30"
                  className="w-full h-full fill-white spin-slow transition duration-500"
                >
                  <path d="M14.2257 0.947522C..." />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-2">
                  <span className="text-black font-medium leading-5 text-[14px]">
                    Our <br /> Offerings
                  </span>
                  <FaArrowRight className="text-black mt-1 bounce-right" size={14} />
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
