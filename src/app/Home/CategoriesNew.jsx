"use client";

import { useState, useRef, useEffect, Fragment } from "react";
import Link from "next/link";

const categories = [
  { name: "Ovens", link: "/products/laboratory-ovens" },
  { name: "Cabinets", link: "/products/cabinet" },
  { name: "Incubators", link: "/products/incubators" },
  { name: "Chillers", link: "/products/chillers" },
  { name: "Water Baths", link: "/products/water-baths" },
  { name: "Rotary Evaporators", link: "/products/rotary-evaporators" },
  { name: "Pumps", link: "/products/pumps" },
  { name: "Cabinet", link: "/products/cabinet" },
  { name: "Freezers", link: "/products/freezers" },
  { name: "Digital Viscometers", link: "/products/digital-viscometers" },
  { name: "Muffle Furnace", link: "/products/muffle-furnace" },
];

export default function CategoriesNew() {
  const [active, setActive] = useState("Ovens");
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  return (
    <>
      <style>{`
        .cat-root {
          position: relative;
          overflow: hidden;
          border-block: 1px solid rgba(255, 255, 255, 0.5);
          background:
            radial-gradient(circle at 10% 30%, rgba(43, 126, 194, 0.18), transparent 28%),
            linear-gradient(100deg, rgba(255, 255, 255, 0.96), rgba(240, 247, 255, 0.92) 48%, rgba(255, 255, 255, 0.98));
          box-shadow: 0 18px 48px rgba(20, 55, 94, 0.16);
        }

        .cat-root::before {
          content: '';
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(120deg, transparent 0%, rgba(255, 255, 255, 0.5) 32%, transparent 58%);
          transform: translateX(-100%);
          animation: cat-sheen 1.35s 0.45s ease-out forwards;
        }

        .cat-root::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(43, 126, 194, 0.75), rgba(19, 157, 134, 0.65), transparent);
        }

        .cat-inner {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: stretch;
          min-height: 86px;
        }

        .cat-label {
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          min-width: 230px;
          padding: 18px 32px 18px 36px;
          border-right: 1px solid rgba(47, 65, 145, 0.13);
          gap: 4px;
        }

        .cat-kicker {
          width: max-content;
          overflow: hidden;
          color: #2B7EC2;
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          line-height: 1;
          text-transform: uppercase;
          opacity: 0;
          transform: translateY(10px);
          animation: cat-text-in 0.6s 0.12s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .cat-label h2 {
          margin: 0;
          color: #13243f;
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.1rem, 1.8vw, 1.45rem);
          font-weight: 700;
          line-height: 1.12;
        }

        .cat-title-line {
          display: inline-block;
          opacity: 0;
          transform: translateY(18px) rotateX(16deg);
          transform-origin: left bottom;
          animation: cat-title-in 0.75s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .cat-title-line:nth-child(2) {
          animation-delay: 0.13s;
        }

        .cat-label p {
          margin: 0;
          color: #506071;
          font-size: 0.78rem;
          font-weight: 600;
          line-height: 1.35;
          opacity: 0;
          transform: translateY(10px);
          animation: cat-text-in 0.62s 0.42s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .cat-scroll-wrap {
          flex: 1;
          position: relative;
          min-width: 0;
        }

        .cat-scroll-fade-left,
        .cat-scroll-fade-right {
          position: absolute;
          top: 0;
          bottom: 0;
          z-index: 2;
          width: 64px;
          pointer-events: none;
          transition: opacity 0.25s;
        }

        .cat-scroll-fade-left {
          left: 0;
          background: linear-gradient(to right, rgba(244, 249, 255, 0.98), transparent);
        }

        .cat-scroll-fade-right {
          right: 0;
          background: linear-gradient(to left, rgba(255, 255, 255, 0.98), transparent);
        }

        .cat-scroll {
          display: flex;
          align-items: center;
          gap: 10px;
          height: 100%;
          padding: 0 28px;
          overflow-x: auto;
          scroll-behavior: smooth;
          scrollbar-width: none;
        }

        .cat-scroll::-webkit-scrollbar {
          display: none;
        }

        .cat-tab {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          display: inline-flex;
          flex-shrink: 0;
          align-items: center;
          justify-content: center;
          min-height: 46px;
          padding: 13px 18px;
          border: 1px solid rgba(47, 65, 145, 0.12);
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.58);
          box-shadow: 0 8px 22px rgba(19, 36, 63, 0.06);
          color: #596779;
          font-size: clamp(0.8rem, 1vw, 0.94rem);
          font-weight: 700;
          letter-spacing: 0;
          text-decoration: none;
          white-space: nowrap;
          cursor: pointer;
          opacity: 0;
          transform: translateY(16px);
          transition:
            background 0.28s ease,
            border-color 0.28s ease,
            box-shadow 0.28s ease,
            color 0.2s ease,
            transform 0.28s cubic-bezier(0.22, 1, 0.36, 1);
          animation: cat-chip-in 0.58s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .cat-tab::before {
          content: '';
          position: absolute;
          inset: 0;
          z-index: -1;
          background: linear-gradient(135deg, rgba(47, 65, 145, 0.1), rgba(43, 126, 194, 0.15), rgba(19, 157, 134, 0.12));
          opacity: 0;
          transition: opacity 0.28s ease;
        }

        .cat-tab::after {
          content: '';
          position: absolute;
          right: 14px;
          bottom: 8px;
          left: 14px;
          height: 2px;
          border-radius: 999px;
          background: linear-gradient(90deg, #2F4191, #2B7EC2, #139D86);
          transform: scaleX(0);
          transform-origin: center;
          transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .cat-tab:hover {
          color: #13243f;
          border-color: rgba(43, 126, 194, 0.38);
          background: rgba(255, 255, 255, 0.94);
          box-shadow: 0 16px 34px rgba(20, 55, 94, 0.16);
          transform: translateY(-5px);
        }

        .cat-tab:hover::before {
          opacity: 1;
        }

        .cat-tab:hover::after {
          transform: scaleX(0.68);
        }

        .cat-tab.active {
          color: #ffffff;
          border-color: transparent;
          background: linear-gradient(135deg, #2F4191, #2B7EC2 58%, #139D86);
          box-shadow: 0 16px 36px rgba(47, 65, 145, 0.28);
        }

        .cat-tab.active::before {
          opacity: 0;
        }

        .cat-tab.active::after {
          transform: scaleX(1);
          background: rgba(255, 255, 255, 0.88);
        }

        .cat-tab-dot {
          display: inline-block;
          flex-shrink: 0;
          width: 5px;
          height: 5px;
          margin-left: 7px;
          border-radius: 50%;
          background: #2B7EC2;
          opacity: 0;
          transform: scale(0);
          transition: opacity 0.2s, transform 0.2s, background 0.2s, box-shadow 0.2s;
        }

        .cat-tab.active .cat-tab-dot {
          opacity: 1;
          transform: scale(1);
          background: #ffffff;
          box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.22);
        }

        .cat-divider {
          display: none;
        }

        @keyframes cat-sheen {
          to {
            transform: translateX(100%);
          }
        }

        @keyframes cat-title-in {
          to {
            opacity: 1;
            transform: translateY(0) rotateX(0);
          }
        }

        @keyframes cat-text-in {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes cat-chip-in {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .cat-root::before,
          .cat-kicker,
          .cat-title-line,
          .cat-label p,
          .cat-tab {
            animation: none;
            opacity: 1;
            transform: none;
          }

          .cat-tab,
          .cat-tab::before,
          .cat-tab::after {
            transition: none;
          }
        }

        @media (max-width: 639px) {
          .cat-inner {
            flex-direction: column;
            min-height: unset;
          }

          .cat-label {
            min-width: 0;
            padding: 16px 20px;
            border-right: none;
            border-bottom: 1px solid rgba(47, 65, 145, 0.12);
          }

          .cat-label h2 {
            font-size: 1.15rem;
          }

          .cat-label p {
            font-size: 0.74rem;
          }

          .cat-scroll {
            gap: 8px;
            min-height: 74px;
            padding: 0 16px;
          }

          .cat-tab {
            min-height: 42px;
            padding: 11px 14px;
            font-size: 0.82rem;
          }
        }

        @media (min-width: 640px) and (max-width: 1023px) {
          .cat-label {
            min-width: 205px;
            padding: 18px 22px 18px 24px;
          }

          .cat-label h2 {
            font-size: 1.16rem;
          }

          .cat-scroll {
            gap: 8px;
            padding: 0 22px;
          }

          .cat-tab {
            padding: 12px 15px;
            font-size: 0.85rem;
          }
        }
      `}</style>

      <div className="cat-root w-full">
        <div className="cat-inner">
          <div className="cat-label">
            <span className="cat-kicker">Explore range</span>
            <h2 aria-label="Our Products">
              <span className="cat-title-line">Our</span>{" "}
              <span className="cat-title-line">Products</span>
            </h2>
            <p>Precision lab equipment for every workflow</p>
          </div>

          <div className="cat-scroll-wrap">
            <div className="cat-scroll-fade-left" style={{ opacity: canScrollLeft ? 1 : 0 }} />
            <div className="cat-scroll-fade-right" style={{ opacity: canScrollRight ? 1 : 0 }} />

            <div className="cat-scroll" ref={scrollRef}>
              {categories.map((item, idx) => (
                <Fragment key={item.name}>
                  <Link
                    href={item.link}
                    onClick={() => setActive(item.name)}
                    className={`cat-tab${active === item.name ? " active" : ""}`}
                    style={{ animationDelay: `${0.12 + idx * 0.055}s` }}
                  >
                    {item.name}
                    <span className="cat-tab-dot" />
                  </Link>
                  {idx < categories.length - 1 && (
                    <span key={`div-${idx}`} className="cat-divider" />
                  )}
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
