"use client";

import Image from "next/image";
import { useState, useEffect, useCallback, useRef } from "react";

const SLIDES = [
  {
    id: 1,
    label: "Chiller",
    question: "Looking for a Chiller?",
    sub: "Explore the finest cooling units tailored for your space.",
    tag: "COOLING",
    accent: "#2B7EC2",
    img: "/Chiller-Banner.png",
  },
  {
    id: 2,
    label: "Furnace",
    question: "Need a Furnace?",
    sub: "Discover high-efficiency heating systems built to last.",
    tag: "HEATING",
    accent: "#2F4191",
    img: "/Furnace-Banner.png",
  },
  {
    id: 3,
    label: "AHU",
    question: "Searching for an AHU?",
    sub: "Find the perfect air handling unit for any project scale.",
    tag: "VENTILATION",
    accent: "#2B7EC2",
    img: "/Ovens-Banner.png",
  },
];

export default function ProductQueries() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const intervalRef = useRef(null);
  const slideTimeoutRef = useRef(null);

  const selectedSlide = SLIDES[active];

  const next = useCallback(() => {
    const dir = 1;
    setDirection(dir);
    setActive((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const prev = useCallback(() => {
    const dir = -1;
    setDirection(dir);
    setActive((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  // Autoplay
  useEffect(() => {
    if (!isAutoPlay) return;
    intervalRef.current = setInterval(next, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [next, isAutoPlay]);

  // Clear slide timeout on unmount/change
  useEffect(() => {
    if (slideTimeoutRef.current) clearTimeout(slideTimeoutRef.current);
    return () => {
      if (slideTimeoutRef.current) clearTimeout(slideTimeoutRef.current);
    };
  }, [active]);

  // Keyboard support
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [next, prev]);

  return (
    <section
      className="relative w-full h-screen bg-black text-balck overflow-hidden group"
      role="region"
      aria-label="Product hero slider"
    >
      {/* Multiple background layers for crossfade */}
      {SLIDES.map((slide, i) => (
        <div
          key={slide.id}
          className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out ${
            i === active
              ? "z-10 opacity-100 scale-105"
              : "z-0 opacity-0 scale-100"
          }`}
          style={{ backgroundImage: `url(${slide.img})` }}
        />
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20 z-20" />

      {/* Content */}
      <div className="relative z-30 flex">
        {/* Left Bar */}
        <aside className="hidden md:flex w-[80px] flex-col items-center justify-between py-10 border-r border-white/10 opacity-0 md:opacity-100 transition-opacity duration-700 group-hover:opacity-100">
          <div className="rotate-90 writing-mode-vertical text-xs font-bold tracking-[0.3em] transition-opacity duration-500" style={{ color: selectedSlide.accent }}>
            Products to explore<span style={{ color: selectedSlide.accent }}>.</span>
          </div>

          <div className="flex flex-col gap-3">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setActive(i);
                  setDirection(i > active ? 1 : -1);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ease-in-out border ${
                  i === active
                    ? "scale-150 bg-current shadow-lg shadow-[var(--accent)]"
                    : "bg-white/30 hover:bg-white/50 hover:scale-125"
                }`}
                style={{ 
                  '--accent': selectedSlide.accent,
                  borderColor: i === active ? selectedSlide.accent : 'transparent'
                }}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === active ? "true" : undefined}
              />
            ))}
          </div>
        </aside>

        {/* Text Section - Staggered with data-active */}
        <div className="flex-1 flex items-center justify-end px-6 md:px-16 py-20">
          <div className="max-w-[500px] space-y-6 relative">
            {/* Tag */}
            <div
              className="flex items-center gap-2 text-xs tracking-[0.3em] font-bold opacity-0 translate-y-4 transition-all duration-700 ease-out data-[active=true]:opacity-100 data-[active=true]:translate-y-0"
              style={{ color: selectedSlide.accent }}
              data-active={active === SLIDES.findIndex(s => s.id === selectedSlide.id)}
            >
              <span
                className="w-6 h-[2px] scale-x-0 transition-all duration-700 ease-out origin-left data-[active=true]:scale-x-100"
                style={{ background: selectedSlide.accent }}
                data-active
              />
              {selectedSlide.tag}
            </div>

            {/* Heading */}
            <h2 
              className="text-[clamp(32px,5vw,64px)] font-black leading-tight opacity-0 translate-y-6 transition-all duration-700 ease-out data-[active=true]:opacity-100 data-[active=true]:translate-y-0"
              data-active
            >
              {selectedSlide.question}
            </h2>

            {/* Sub */}
            <p 
              className="text-white/70 text-sm leading-relaxed opacity-0 translate-y-4 transition-all duration-700 ease-out data-[active=true]:opacity-100 data-[active=true]:translate-y-0"
              data-active
            >
              {selectedSlide.sub}
            </p>

            {/* Buttons */}
            <div className="flex gap-4">
              <button
                className="px-6 py-3 font-semibold text-black hover:scale-105 hover:shadow-2xl hover:shadow-[0_0_20px_var(--accent)] transition-all duration-300"
                style={{ 
                  background: selectedSlide.accent,
                  '--accent': selectedSlide.accent
                }}
              >
                Explore
              </button>

              <button className="px-6 py-3 border border-white/30 text-white/70 hover:bg-white/10 hover:scale-105 transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Thumbnails */}
      {/* <div className="relative z-30 flex h-[80px] mt-6">
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            onClick={() => {
              setActive(i);
              setDirection(i > active ? 1 : -1);
            }}
            className="flex-1 relative overflow-hidden hover:scale-[1.02] transition-transform duration-300 group/thumb"
          >
            <Image
              src={s.img}
              alt={s.label}
              height={500}
              width={500}
              className="w-full h-full object-cover brightness-50 group-hover/thumb:brightness-75 transition-all duration-500"
              priority={i < 2} // Preload first 2
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltMtY5c1X9q2t9uY9T2hQJ8kQ4kJ9AkhE2qT0///Z"
            />

            <div
              className="absolute top-0 left-0 w-full h-[2px] transition-all duration-500 scale-x-0 group-hover/thumb:scale-x-100"
              style={{ background: i === active ? selectedSlide.accent : selectedSlide.accent }}
            />

            <span
              className={`absolute bottom-2 left-3 text-xs tracking-widest transition-all duration-300 ${
                i === active ? "text-current opacity-100 scale-110" : "text-white/50 opacity-70 hover:opacity-100 hover:scale-105"
              }`}
              style={{ color: i === active ? selectedSlide.accent : undefined }}
            >
              {s.label}
            </span>
          </button>
        ))}
      </div> */}

      {/* Arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm p-3 rounded-full hover:bg-white/20 hover:scale-110 active:scale-95 transition-all duration-300 z-40"
        aria-label="Previous slide"
      >
        ←
      </button>

      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm p-3 rounded-full hover:bg-white/20 hover:scale-110 active:scale-95 transition-all duration-300 z-40"
        aria-label="Next slide"
      >
        →
      </button>

      {/* Pause indicator */}
      <button
        onClick={() => setIsAutoPlay(!isAutoPlay)}
        className="absolute top-4 right-4 text-xs bg-white/10 backdrop-blur-sm p-2 rounded-full hover:bg-white/20 transition-all duration-300 opacity-70 hover:opacity-100 z-40"
        aria-label="Toggle autoplay"
        title="Toggle autoplay"
      >
        {isAutoPlay ? '⏸️' : '▶️'}
      </button>
    </section>
  );
}
