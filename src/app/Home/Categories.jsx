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

export default function Categories() {
  const [active, setActive] = useState("Ovens");
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  /* ── shadow fade indicators ── */
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

        .cat-inner {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: stretch;
          min-height: 72px;
        }

        /* ── left label panel ── */
        .cat-label {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          padding: 18px 28px 18px 32px;
          border-right: 1.5px solid rgba(0,0,0,0.08);
          gap: 10px;
        }

        .cat-label-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #2F4191;
          flex-shrink: 0;
        }

        .cat-label h2 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(0.95rem, 1.5vw, 1.2rem);
          font-weight: 700;
          color: #1a1a1a;
          white-space: nowrap;
          line-height: 1.25;
          letter-spacing: -0.01em;
        }

        /* ── scroll container ── */
        .cat-scroll-wrap {
          flex: 1;
          position: relative;
          min-width: 0;
        }

        .cat-scroll-fade-left,
        .cat-scroll-fade-right {
          position: absolute;
          top: 0; bottom: 0;
          width: 48px;
          pointer-events: none;
          z-index: 2;
          transition: opacity 0.25s;
        }
        .cat-scroll-fade-left  { left:  0; background: linear-gradient(to right, #F0ECE4, transparent); }
        .cat-scroll-fade-right { right: 0; background: linear-gradient(to left,  #F0ECE4, transparent); }

        .cat-scroll {
          display: flex;
          align-items: center;
          gap: 0;
          overflow-x: auto;
          scroll-behavior: smooth;
          padding: 0 24px;
          height: 100%;
          scrollbar-width: none;
        }
        .cat-scroll::-webkit-scrollbar { display: none; }

        /* ── individual tab ── */
        .cat-tab {
          position: relative;
          display: inline-flex;
          align-items: center;
          padding: 22px 20px;
          font-size: clamp(0.8rem, 1.1vw, 0.92rem);
          font-weight: 500;
          color: #6b6456;
          white-space: nowrap;
          text-decoration: none;
          transition: color 0.2s;
          cursor: pointer;
          letter-spacing: 0.01em;
          flex-shrink: 0;
        }

        .cat-tab::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 20px;
          right: 20px;
          height: 2.5px;
          border-radius: 2px 2px 0 0;
          background: #2F4191;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.28s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .cat-tab:hover {
          color: #1a1a1a;
        }

        .cat-tab:hover::after {
          transform: scaleX(0.4);
        }

        .cat-tab.active {
          color: #1a1a1a;
          font-weight: 600;
        }

        .cat-tab.active::after {
          transform: scaleX(1);
          background: linear-gradient(90deg, #2F4191, #2B7EC2);
        }

        /* pill count badge on active */
        .cat-tab.active .cat-tab-dot {
          opacity: 1;
          transform: scale(1);
        }

        .cat-tab-dot {
          display: inline-block;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #2B7EC2;
          margin-left: 6px;
          opacity: 0;
          transform: scale(0);
          transition: opacity 0.2s, transform 0.2s;
          flex-shrink: 0;
        }

        /* ── divider between tabs ── */
        .cat-divider {
          width: 1px;
          height: 16px;
          background: rgba(0,0,0,0.1);
          flex-shrink: 0;
          margin: 0 2px;
        }

        /* ── mobile: stack vertically ── */
        @media (max-width: 639px) {
          .cat-inner {
            flex-direction: column;
            min-height: unset;
          }
          .cat-label {
            border-right: none;
            border-bottom: 1.5px solid rgba(0,0,0,0.08);
            padding: 14px 20px;
          }
          .cat-label h2 { font-size: 1rem; }
          .cat-scroll { padding: 0 16px; }
          .cat-tab { padding: 18px 14px; font-size: 0.82rem; }
          .cat-tab::after { left: 14px; right: 14px; }
        }

        @media (min-width: 640px) and (max-width: 1023px) {
          .cat-label { padding: 18px 20px 18px 24px; }
          .cat-label h2 { font-size: 1rem; }
          .cat-tab { padding: 22px 15px; font-size: 0.85rem; }
          .cat-tab::after { left: 15px; right: 15px; }
        }
      `}</style>

      <div className="cat-root w-full bg-white">
        <div className="cat-inner">

          {/* ── Left label ── */}
          <div className="cat-label">
            <h2>Our Products</h2>
          </div>

          {/* ── Scrollable tabs ── */}
          <div className="cat-scroll-wrap">
            {/* fade-out edges */}
            <div className="cat-scroll-fade-left" style={{ opacity: canScrollLeft ? 1 : 0 }} />
            <div className="cat-scroll-fade-right" style={{ opacity: canScrollRight ? 1 : 0 }} />

            <div className="cat-scroll" ref={scrollRef}>
              {categories.map((item, idx) => (
                <Fragment key={item.name}>
                  <Link
                    href={item.link}
                    onClick={() => setActive(item.name)}
                    className={`cat-tab${active === item.name ? " active" : ""}`}
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
