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
            {/* <div className="w-fit">
              <div className="relative group w-[120px] h-[120px] text-black">
                <svg
                  viewBox="0 0 30 30"
                  className="w-full h-full fill-white spin-slow transition duration-500"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M14.2257 0.947522C14.6258 0.457905 15.3742 0.457905 15.7743 0.947522L16.8781 2.29817C17.181 2.66879 17.704 2.77283 18.1256 2.54633L19.6623 1.72088C20.2193 1.42165 20.9107 1.70806 21.093 2.31352L21.5959 3.98376C21.7339 4.44207 22.1773 4.73834 22.6535 4.69044L24.3891 4.51587C25.0182 4.45258 25.5474 4.98179 25.4841 5.61093L25.3096 7.34647C25.2617 7.8227 25.5579 8.2661 26.0162 8.40409L27.6865 8.90697C28.2919 9.08926 28.5783 9.7807 28.2791 10.3377L27.4537 11.8744C27.2272 12.296 27.3312 12.819 27.7018 13.1219L29.0525 14.2257C29.5421 14.6258 29.5421 15.3742 29.0525 15.7743L27.7018 16.8781C27.3312 17.181 27.2272 17.704 27.4537 18.1256L28.2791 19.6623C28.5783 20.2193 28.2919 20.9107 27.6865 21.093L26.0162 21.5959C25.5579 21.7339 25.2617 22.1773 25.3096 22.6535L25.4841 24.3891C25.5474 25.0182 25.0182 25.5474 24.3891 25.4841L22.6535 25.3096C22.1773 25.2617 21.7339 25.5579 21.5959 26.0162L21.093 27.6865C20.9107 28.2919 20.2193 28.5783 19.6623 28.2791L18.1256 27.4537C17.704 27.2272 17.181 27.3312 16.8781 27.7018L15.7743 29.0525C15.3742 29.5421 14.6258 29.5421 14.2257 29.0525L13.1219 27.7018C12.819 27.3312 12.296 27.2272 11.8744 27.4537L10.3377 28.2791C9.7807 28.5783 9.08926 28.2919 8.90697 27.6865L8.40409 26.0162C8.2661 25.5579 7.8227 25.2617 7.34647 25.3096L5.61093 25.4841C4.98179 25.5474 4.45258 25.0182 4.51587 24.3891L4.69044 22.6535C4.73834 22.1773 4.44207 21.7339 3.98376 21.5959L2.31352 21.093C1.70806 20.9107 1.42165 20.2193 1.72088 19.6623L2.54633 18.1256C2.77283 17.704 2.66879 17.181 2.29817 16.8781L0.947522 15.7743C0.457905 15.3742 0.457905 14.6258 0.947522 14.2257L2.29817 13.1219C2.66879 12.819 2.77283 12.296 2.54633 11.8744L1.72088 10.3377C1.42165 9.7807 1.70806 9.08926 2.31352 8.90697L3.98376 8.40409C4.44207 8.2661 4.73834 7.8227 4.69044 7.34647L4.51587 5.61093C4.45258 4.98179 4.98179 4.45258 5.61093 4.51587L7.34647 4.69044C7.8227 4.73834 8.2661 4.44207 8.40409 3.98376L8.90697 2.31352C9.08926 1.70806 9.7807 1.42165 10.3377 1.72088L11.8744 2.54633C12.296 2.77283 12.819 2.66879 13.1219 2.29817L14.2257 0.947522Z" />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-2">
                  <span className="text-black font-medium leading-5 text-[14px]">
                    Our <br /> Offerings
                  </span>
                  <FaArrowRight className="text-black mt-1 bounce-right" size={14} />
                </div>
              </div>
            </div> */}

          </div>
        </div>

      </div>
    </section>
  );
}
