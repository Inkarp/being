'use client';
import { useEffect, useState, useRef, useCallback } from 'react';
import { FaArrowRight, FaFlask } from 'react-icons/fa';
import Link from 'next/link';

const FULL_LINE1 = 'Welcome to Being India';
const FULL_LINE2 = 'Scientific Solutions';
const SUBTITLE = 'Discover our cutting-edge solutions to accelerate scientific excellence.';
const TYPING_SPEED = 80;

const TRUST_PILLS = [
  { label: 'ISO Certified' },
  { label: '10+ Years' },
  { label: '5,000+ Instruments' },
];

export default function HeroNew() {
  const [animKey, setAnimKey]         = useState(0);
  const [line1, setLine1]             = useState('');
  const [line2, setLine2]             = useState('');
  const [subtitle, setSubtitle]       = useState('');
  const [showCursor1, setShowCursor1] = useState(false);
  const [showCursor2, setShowCursor2] = useState(false);
  const [showCursorSub, setShowCursorSub] = useState(false);
  const [badgeVisible, setBadgeVisible]   = useState(false);
  const [indiaFullyTyped, setIndiaFullyTyped] = useState(false);
  const [ctaVisible, setCtaVisible]   = useState(false);

  const sectionRef   = useRef(null);
  const timeoutsRef  = useRef([]);

  const clearAll = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  };

  const typeText = useCallback((fullText, setter, setCursor, onDone, startDelay = 0) => {
    let i = 0;
    setter('');
    setCursor(true);
    const start = setTimeout(() => {
      const tick = () => {
        i++;
        setter(fullText.slice(0, i));
        if (i < fullText.length) {
          const t = setTimeout(tick, TYPING_SPEED);
          timeoutsRef.current.push(t);
        } else {
          setCursor(false);
          if (onDone) {
            const t = setTimeout(onDone, 200);
            timeoutsRef.current.push(t);
          }
        }
      };
      tick();
    }, startDelay);
    timeoutsRef.current.push(start);
  }, []);

  const startAnimation = useCallback(() => {
    clearAll();
    setLine1(''); setLine2(''); setSubtitle('');
    setShowCursor1(false); setShowCursor2(false); setShowCursorSub(false);
    setBadgeVisible(false); setIndiaFullyTyped(false); setCtaVisible(false);

    const t = setTimeout(() => setBadgeVisible(true), 200);
    timeoutsRef.current.push(t);

    typeText(FULL_LINE1, setLine1, setShowCursor1, () => {
      setIndiaFullyTyped(true);
      typeText(FULL_LINE2, setLine2, setShowCursor2, () => {
        typeText(SUBTITLE, setSubtitle, setShowCursorSub, () => {
          const t2 = setTimeout(() => setCtaVisible(true), 150);
          timeoutsRef.current.push(t2);
        }, 300);
      });
    }, 500);
  }, [typeText]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimKey(k => k + 1); },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (animKey === 0) return;
    startAnimation();
    return clearAll;
  }, [animKey, startAnimation]);

  /* ── Render headline with India slide-in ── */
  const renderLine1 = () => {
    const beingIdx = line1.indexOf('Being');
    if (beingIdx === -1) return (
      <>{line1}{showCursor1 && <span className="typing-cursor" />}</>
    );

    const before    = line1.slice(0, beingIdx);
    const beingPart = line1.slice(beingIdx);
    const indiaIdx  = beingPart.indexOf('India');
    const isIndiaVisible = indiaIdx !== -1;

    return (
      <>
        {before}
        {isIndiaVisible ? beingPart.slice(0, indiaIdx) : beingPart}
        {isIndiaVisible && (
          <span className={`india-wrapper ${indiaFullyTyped ? 'india-revealed' : ''}`}>
            <span className="india-text">{beingPart.slice(indiaIdx)}</span>
            {indiaFullyTyped && <span className="india-underline" />}
          </span>
        )}
        {showCursor1 && <span className="typing-cursor" />}
      </>
    );
  };

  return (
    <>
      <style>{`
        /* ── Keyframes ── */
        @keyframes indiaSlideIn {
          0%   { clip-path: inset(0 100% 0 0); opacity: 0.3; transform: translateX(-10px); }
          65%  { clip-path: inset(0 0%   0 0); opacity: 1;   transform: translateX(3px);  }
          100% { clip-path: inset(0 0%   0 0); opacity: 1;   transform: translateX(0);    }
        }
        @keyframes underlineExpand {
          0%   { width: 0%;   opacity: 0; }
          100% { width: 100%; opacity: 1; }
        }
        @keyframes badgeFadeUp {
          0%   { opacity: 0; transform: translateY(14px); }
          100% { opacity: 1; transform: translateY(0);    }
        }
        @keyframes fadeUpIn {
          0%   { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0);    }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
        @keyframes pillFadeIn {
          from { opacity: 0; transform: translateY(10px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(255,215,0,0); }
          50%       { box-shadow: 0 0 20px 4px rgba(255,215,0,0.18); }
        }
        @keyframes scrollBounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50%       { transform: translateX(-50%) translateY(6px); }
        }

        /* ── India text ── */
        .india-wrapper { position: relative; display: inline-block; }
        .india-text {
          display: inline-block;
          background: linear-gradient(90deg,
            #FF9933 0%, #FF9933 22%,
            #fff    42%, #fff    58%,
            #138808 78%, #138808 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: 900;
          clip-path: inset(0 100% 0 0);
          opacity: 0;
          transform: translateX(-10px);
        }
        .india-wrapper.india-revealed .india-text {
          animation: indiaSlideIn 0.8s cubic-bezier(0.22,1,0.36,1) forwards;
        }
        .india-underline {
          position: absolute;
          bottom: -5px; left: 0;
          height: 3px; border-radius: 2px;
          background: linear-gradient(90deg, #FF9933, #FFD700, #138808);
          animation: underlineExpand 0.7s 0.6s ease-out forwards;
          width: 0%; opacity: 0;
          box-shadow: 0 0 10px rgba(255,180,0,0.6);
        }

        /* ── Typing cursor ── */
        .typing-cursor {
          display: inline-block;
          width: 3px; height: 0.85em;
          background: #FFD700;
          margin-left: 3px;
          vertical-align: middle;
          border-radius: 1px;
          animation: blink 0.75s step-end infinite;
        }

        /* ── Badge ── */
        .made-in-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,215,0,0.5);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          padding: 6px 16px 6px 10px;
          border-radius: 100px;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.12em;
          color: #FFD700;
          text-transform: uppercase;
          opacity: 0;
          animation: glowPulse 3s 1.5s ease-in-out infinite;
        }
        .badge-visible { animation: badgeFadeUp 0.6s ease forwards, glowPulse 3s 1.5s ease-in-out infinite; }

        /* ── Hero sizing ── */
        .hero-new-section {
          height: 88svh;
          min-height: 560px;
          max-height: 900px;
        }
        .hero-bg-media {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center center;
        }
        .hero-content-wrap {
          padding-top: clamp(72px, 10svh, 112px);
          padding-bottom: 96px;
        }

        /* ── Headline ── */
        .hero-h1 { min-height: 8rem; }

        /* ── Subtitle fade ── */
        .hero-subtitle {
          opacity: 0;
          animation: fadeUpIn 0.6s 0.1s ease forwards;
        }

        /* ── Trust pills ── */
        .trust-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 14px;
          border-radius: 100px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          background: rgba(255,255,255,0.10);
          border: 1px solid rgba(255,255,255,0.22);
          color: rgba(255,255,255,0.9);
          backdrop-filter: blur(8px);
          opacity: 0;
        }
        .trust-pill.visible { animation: pillFadeIn 0.45s ease forwards; }

        /* ── CTA button ── */
        .hero-cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 28px;
          border-radius: 100px;
          font-size: 15px;
          font-weight: 700;
          color: #0f1c3f;
          background: linear-gradient(135deg, #FFD700 0%, #FF9933 100%);
          border: none;
          cursor: pointer;
          opacity: 0;
          box-shadow: 0 8px 32px rgba(255,180,0,0.35);
          transition: transform 0.2s, box-shadow 0.2s;
          letter-spacing: 0.01em;
        }
        .hero-cta.visible { animation: fadeUpIn 0.5s ease forwards; }
        .hero-cta:hover   { transform: translateY(-2px); box-shadow: 0 14px 40px rgba(255,180,0,0.45); }

        .hero-cta-outline {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 13px 26px;
          border-radius: 100px;
          font-size: 15px;
          font-weight: 700;
          color: #fff;
          background: transparent;
          border: 1.5px solid rgba(255,255,255,0.4);
          cursor: pointer;
          opacity: 0;
          transition: background 0.2s, border-color 0.2s, transform 0.2s;
          letter-spacing: 0.01em;
          backdrop-filter: blur(8px);
        }
        .hero-cta-outline.visible { animation: fadeUpIn 0.5s 0.1s ease forwards; }
        .hero-cta-outline:hover   { background: rgba(255,255,255,0.12); border-color: rgba(255,255,255,0.65); transform: translateY(-2px); }

        /* ── Scroll indicator ── */
        .scroll-indicator {
          position: absolute;
          bottom: 28px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          opacity: 0.55;
          animation: scrollBounce 2s ease-in-out infinite;
          z-index: 30;
        }
        .scroll-indicator span {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #fff;
        }
        .scroll-dot {
          width: 20px; height: 32px;
          border: 2px solid rgba(255,255,255,0.6);
          border-radius: 12px;
          position: relative;
        }
        .scroll-dot::after {
          content: '';
          position: absolute;
          top: 5px; left: 50%;
          transform: translateX(-50%);
          width: 4px; height: 7px;
          background: #FFD700;
          border-radius: 3px;
          animation: scrollBounce 2s ease-in-out infinite;
        }

        /* ── Video gradient overlays ── */
        .hero-overlay-left {
          background: linear-gradient(to right,
            rgba(15,28,63,0.85) 0%,
            rgba(15,28,63,0.5)  45%,
            transparent         100%
          );
        }
        .hero-overlay-bottom {
          background: linear-gradient(to top,
            rgba(15,28,63,0.7) 0%,
            transparent        40%
          );
        }

        @media (max-width: 767px) {
          .hero-new-section {
            height: 100svh;
            min-height: 620px;
            max-height: none;
          }
          .hero-bg-media {
            object-position: center top;
          }
          .hero-content-wrap {
            align-items: flex-start;
            padding-top: 120px;
            padding-bottom: 108px;
          }
          .hero-h1 {
            min-height: 7.25rem;
          }
        }

        @media (max-width: 380px) {
          .hero-new-section {
            min-height: 660px;
          }
        }

        @media (max-height: 620px) and (orientation: landscape) {
          .hero-new-section {
            height: auto;
            min-height: 620px;
          }
          .hero-content-wrap {
            padding-top: 88px;
          }
        }
      `}</style>

      <section
        ref={sectionRef}
        className="hero-new-section w-full relative overflow-hidden"
      >
        {/* ── Video Background ── */}
        <video
          autoPlay muted loop playsInline
          poster="/HeroImage.webp"
          className="hero-bg-media absolute inset-0 z-0"
        >
          <source src="/bg-video.mov" type="video/mp4" />
          <source src="/bg-video.webm" type="video/webm" />
        </video>

        {/* ── Overlays for depth ── */}
        <div className="absolute inset-0 z-10 hero-overlay-left" />
        <div className="absolute inset-0 z-10 hero-overlay-bottom" />

        {/* ── Main Content ── */}
        <div className="hero-content-wrap relative z-20 h-full flex items-center px-6 md:px-16 lg:px-24">
          <div className="w-full max-w-2xl space-y-6">

            {/* Badge */}
            <div>
              <span className={`made-in-badge ${badgeVisible ? 'badge-visible' : ''}`}>
                <span style={{
                  width: 7, height: 7, borderRadius: '50%',
                  background: '#FFD700', display: 'inline-block', flexShrink: 0,
                  boxShadow: '0 0 8px #FFD700',
                }} />
                Proudly Now in India
              </span>
            </div>

            {/* Typing headline */}
            <h1 className="hero-h1 text-4xl sm:text-5xl md:text-6xl font-black leading-tight text-white"
              style={{ letterSpacing: '-0.5px' }}>
              {renderLine1()}
              {line1 === FULL_LINE1 && (
                <>
                  <br />
                  <span className="text-white">
                    {line2}
                    {showCursor2 && <span className="typing-cursor" />}
                  </span>
                </>
              )}
            </h1>

            {/* Subtitle */}
            {subtitle && (
              <p className="hero-subtitle text-base md:text-lg text-gray-300 max-w-xl leading-relaxed">
                {subtitle}
                {showCursorSub && <span className="typing-cursor" />}
              </p>
            )}

            {/* CTA buttons */}
            {ctaVisible && (
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <Link href="/products">
                  <button className={`hero-cta ${ctaVisible ? 'visible' : ''}`}>
                    Explore Products
                    <FaArrowRight size={14} />
                  </button>
                </Link>
                <Link href="/about-us">
                  <button className={`hero-cta-outline ${ctaVisible ? 'visible' : ''}`}>
                    Learn More
                  </button>
                </Link>
              </div>
            )}

            {/* Trust pills */}
            {ctaVisible && (
              <div className="flex flex-wrap gap-2 pt-1">
                {TRUST_PILLS.map((pill, i) => (
                  <span
                    key={pill.label}
                    className={`trust-pill ${ctaVisible ? 'visible' : ''}`}
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    <span style={{
                      width: 5, height: 5, borderRadius: '50%',
                      background: '#FFD700', display: 'inline-block',
                    }} />
                    {pill.label}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── Scroll indicator ── */}
        <div className="scroll-indicator">
          <div className="scroll-dot" />
          <span>Scroll</span>
        </div>
      </section>
    </>
  );
}
