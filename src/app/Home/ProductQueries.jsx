"use client";

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
    fallbackGradient: "linear-gradient(135deg,#0f2a45 0%,#1a4a70 50%,#0d1f33 100%)",
  },
  {
    id: 2,
    label: "Furnace",
    question: "Need a Furnace?",
    sub: "Discover high-efficiency heating systems built to last.",
    tag: "HEATING",
    accent: "#E8622A",
    img: "/Furnace-Banner.png",
    fallbackGradient: "linear-gradient(135deg,#2d1208 0%,#5c2510 50%,#1a0a04 100%)",
  },
  {
    id: 3,
    label: "AHU",
    question: "Searching for an AHU?",
    sub: "Find the perfect air handling unit for any project scale.",
    tag: "VENTILATION",
    accent: "#2B7EC2",
    img: "/Ovens-Banner.png",
    fallbackGradient: "linear-gradient(135deg,#0d2218 0%,#1a4230 50%,#091810 100%)",
  },
];

export default function ProductQueries() {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef(null);
  const progressRef = useRef(null);

  const slide = SLIDES[active];

  const goTo = useCallback(
    (idx) => {
      if (animating) return;
      setAnimating(true);
      setActive((idx + SLIDES.length) % SLIDES.length);
      setTimeout(() => setAnimating(false), 100);
    },
    [animating]
  );

  const next = useCallback(() => goTo(active + 1), [active, goTo]);
  const prev = useCallback(() => goTo(active - 1), [active, goTo]);

  // Autoplay
  const resetTimer = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(next, 5000);
  }, [next]);

  useEffect(() => {
    resetTimer();
    return () => clearInterval(timerRef.current);
  }, [resetTimer]);

  // Restart progress bar animation on slide change
  useEffect(() => {
    const el = progressRef.current;
    if (!el) return;
    el.style.animation = "none";
    el.offsetWidth; // reflow
    el.style.animation = "progress 5s linear infinite";
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
    <>
      <style>{`
        @keyframes progress {
          from { width: 0% }
          to   { width: 100% }
        }
        @keyframes tagLine {
          from { transform: scaleX(0) }
          to   { transform: scaleX(1) }
        }
      `}</style>

      <section
        className="relative w-full overflow-hidden bg-[#0a0a0a] text-white"
        style={{ height: "520px" }}
        role="region"
        aria-label="Product hero slider"
      >
        <div className="flex h-full">
          {/* ── LEFT SIDEBAR ── */}
          <aside className="hidden md:flex w-16 flex-shrink-0 flex-col items-center justify-between py-8 border-r border-white/10 z-10">
            <span
              className="text-[10px] font-semibold tracking-[0.3em] opacity-50 transition-colors duration-500"
              style={{
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
                color: slide.accent,
              }}
            >
              PRODUCTS
            </span>
            <div className="flex flex-col gap-2.5">
              {SLIDES.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => goTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  aria-current={i === active ? "true" : undefined}
                  className="w-[7px] h-[7px] rounded-full border transition-all duration-300"
                  style={{
                    transform: i === active ? "scale(1.6)" : "scale(1)",
                    background: i === active ? slide.accent : "rgba(255,255,255,0.25)",
                    borderColor: i === active ? slide.accent : "transparent",
                  }}
                />
              ))}
            </div>
          </aside>

          {/* ── IMAGE SECTION (left ~55%) ── */}
          <div className="relative flex-shrink-0 overflow-hidden" style={{ width: "55%" }}>
            {SLIDES.map((s, i) => (
              <div
                key={s.id}
                className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-in-out"
                style={{
                  backgroundImage: `url('${s.img}'), ${s.fallbackGradient}`,
                  opacity: i === active ? 1 : 0,
                  transform: i === active ? "scale(1)" : "scale(1.08)",
                }}
              />
            ))}
            {/* Right-edge fade into text panel */}
            <div
              className="absolute inset-0 pointer-events-none z-10"
              style={{
                background:
                  "linear-gradient(to right, transparent 60%, #0a0a0a 100%)",
              }}
            />
          </div>

          {/* ── TEXT SECTION (right ~45%) ── */}
          <div className="relative flex-1 flex items-center z-10">
            {SLIDES.map((s, i) => {
              const isActive = i === active;
              return (
                <div
                  key={s.id}
                  className="absolute inset-0 flex items-center px-8 md:px-12 transition-opacity duration-200"
                  style={{
                    opacity: isActive ? 1 : 0,
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                >
                  <div className="w-full max-w-sm space-y-5">
                    {/* Tag */}
                    <div
                      className="flex items-center gap-2.5 text-[11px] font-semibold tracking-[0.28em] transition-all duration-700"
                      style={{
                        color: s.accent,
                        opacity: isActive ? 1 : 0,
                        transform: isActive ? "translateY(0)" : "translateY(22px)",
                        transitionDelay: isActive ? "80ms" : "0ms",
                      }}
                    >
                      <span
                        className="h-[2px] w-6 origin-left"
                        style={{
                          background: s.accent,
                          animation: isActive ? "tagLine 500ms ease 260ms both" : "none",
                        }}
                      />
                      {s.tag}
                    </div>

                    {/* Heading */}
                    <h2
                      className="font-extrabold leading-tight transition-all duration-700"
                      style={{
                        fontSize: "clamp(26px, 3.5vw, 48px)",
                        letterSpacing: "-0.01em",
                        opacity: isActive ? 1 : 0,
                        transform: isActive ? "translateY(0)" : "translateY(22px)",
                        transitionDelay: isActive ? "180ms" : "0ms",
                      }}
                    >
                      {s.question}
                    </h2>

                    {/* Sub */}
                    <p
                      className="text-sm leading-relaxed text-white/60 transition-all duration-700"
                      style={{
                        opacity: isActive ? 1 : 0,
                        transform: isActive ? "translateY(0)" : "translateY(22px)",
                        transitionDelay: isActive ? "280ms" : "0ms",
                      }}
                    >
                      {s.sub}
                    </p>

                    {/* Buttons */}
                    <div
                      className="flex gap-3 transition-all duration-700"
                      style={{
                        opacity: isActive ? 1 : 0,
                        transform: isActive ? "translateY(0)" : "translateY(22px)",
                        transitionDelay: isActive ? "380ms" : "0ms",
                      }}
                    >
                      <button
                        className="px-6 py-2.5 text-sm font-semibold text-[#0a0a0a] transition-transform duration-200 hover:scale-105"
                        style={{ background: s.accent }}
                      >
                        Explore
                      </button>
                      <button className="px-6 py-2.5 text-sm font-medium text-white/70 border border-white/20 bg-transparent hover:bg-white/10 transition-all duration-200 hover:scale-105">
                        Learn More
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── PREV / NEXT ARROWS ── */}
        <button
          onClick={prev}
          aria-label="Previous slide"
          className="absolute left-20 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full flex items-center justify-center bg-white/10 border border-white/15 backdrop-blur-sm hover:bg-white/20 hover:scale-110 active:scale-95 transition-all duration-200"
        >
          ←
        </button>
        <button
          onClick={next}
          aria-label="Next slide"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full flex items-center justify-center bg-white/10 border border-white/15 backdrop-blur-sm hover:bg-white/20 hover:scale-110 active:scale-95 transition-all duration-200"
        >
          →
        </button>

        {/* ── PROGRESS BAR ── */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10 z-20">
          <div
            ref={progressRef}
            className="h-full"
            style={{
              background: slide.accent,
              animation: "progress 5s linear infinite",
            }}
          />
        </div>
      </section>
    </>
  );
}