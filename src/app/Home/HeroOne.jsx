'use client';
import { useEffect, useState, useRef, useCallback } from 'react';
import { FaSearch, FaArrowRight } from 'react-icons/fa';
import Link from 'next/link';
import SearchOverlay from './SearchOverlay';
import Image from 'next/image';

// Line1 now just types "India" — the logo is rendered separately
const FULL_LINE1 = 'India';
const FULL_LINE2 = 'Scientific Solutions';
const SUBTITLE =
  'Discover our cutting-edge solutions to accelerate scientific excellence.';
const TYPING_SPEED = 80;

const TRUST_PILLS = [
  {
    text: "Your Trusted Lab Partner",
    bg: "bg-red-100",
    textColor: "text-red-700",
  },
  {
    text: "24/7 Service",
    bg: "bg-blue-100",
    textColor: "text-blue-700",
  },
  {
    text: "100+ Instruments",
    bg: "bg-green-100",
    textColor: "text-green-700",
  },
];

export default function HeroOne() {
  const [animKey, setAnimKey] = useState(0);
  const [line1, setLine1] = useState('');
  const [line2, setLine2] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [showCursor1, setShowCursor1] = useState(false);
  const [showCursor2, setShowCursor2] = useState(false);
  const [showCursorSub, setShowCursorSub] = useState(false);
  const [badgeVisible, setBadgeVisible] = useState(false);
  const [indiaFullyTyped, setIndiaFullyTyped] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  // Controls when the logo fades in during line1 typing
  const [logoVisible, setLogoVisible] = useState(false);

  const sectionRef = useRef(null);
  const timeoutsRef = useRef([]);

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
    setLine1('');
    setLine2('');
    setSubtitle('');
    setShowCursor1(false);
    setShowCursor2(false);
    setShowCursorSub(false);
    setBadgeVisible(false);
    setIndiaFullyTyped(false);
    setCtaVisible(false);
    setLogoVisible(false);

    const t = setTimeout(() => setBadgeVisible(true), 200);
    timeoutsRef.current.push(t);

    // Show the logo slightly before "India" starts typing
    const tLogo = setTimeout(() => setLogoVisible(true), 400);
    timeoutsRef.current.push(tLogo);

    typeText(FULL_LINE1, setLine1, setShowCursor1, () => {
      setIndiaFullyTyped(true);

      typeText(FULL_LINE2, setLine2, setShowCursor2, () => {
        typeText(
          SUBTITLE,
          setSubtitle,
          setShowCursorSub,
          () => {
            const t2 = setTimeout(() => setCtaVisible(true), 150);
            timeoutsRef.current.push(t2);
          },
          300
        );
      });
    }, 500);
  }, [typeText]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setAnimKey((k) => k + 1);
      },
      { threshold: 0.25 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (animKey === 0) return;
    startAnimation();
    return clearAll;
  }, [animKey, startAnimation]);

  const renderLine1 = () => {
    const indiaText = line1; // line1 is purely "India" (partial or full)
    const hasIndia = indiaText.length > 0;

    return (
      /* Flex row keeps "Welcome to" + logo + "India" on one line, wrapping gracefully */
      <span className="inline-flex flex-wrap items-center gap-x-3 leading-tight">
        {/* "Welcome to" static text */}
        <span className={`opacity-0 ${logoVisible ? 'logo-fade-in' : ''}`}>Welcome to</span>
        {/* Being logo — fades in with "Welcome to", same baseline as text */}
        <span
          className={`inline-flex items-center opacity-0 ${logoVisible ? 'logo-fade-in' : ''}`}
          style={{ verticalAlign: 'middle' }}
        >
          <Image
            src="/logo.webp"
            alt="Being India"
            width={220}
            height={64}
            className="inline-block"
            style={{ filter: 'brightness(0) invert(1)' }}
          />
        </span>

        {/* "India" typed with tricolour gradient + underline */}
        {hasIndia && (
          <span
            className={`relative inline-block ${indiaFullyTyped ? 'india-revealed' : ''}`}>
            <span className="">{indiaText}</span>
            {/* {indiaFullyTyped && (
              <span className="india-underline absolute left-0 -bottom-[5px] h-[3px] rounded" />
            )} */}
          </span>
        )}

        {showCursor1 && <span className="typing-cursor" />}
      </span>
    );
  };

  return (
    <>
      <style>{`

        @keyframes indiaSlideIn {
        0%{clip-path:inset(0 100% 0 0);opacity:.3;transform:translateX(-10px)}
        65%{clip-path:inset(0 0 0 0);opacity:1;transform:translateX(3px)}
        100%{clip-path:inset(0 0 0 0);opacity:1;transform:translateX(0)}
        }

        @keyframes underlineExpand{
        0%{width:0;opacity:0}
        100%{width:100%;opacity:1}
        }

        @keyframes badgeFadeUp{
        0%{opacity:0;transform:translateY(14px)}
        100%{opacity:1;transform:translateY(0)}
        }

        @keyframes logoFadeIn{
        0%{opacity:0;transform:translateY(10px)}
        100%{opacity:1;transform:translateY(0)}
        }

        @keyframes fadeUpIn{
        0%{opacity:0;transform:translateY(18px)}
        100%{opacity:1;transform:translateY(0)}
        }

        @keyframes searchFadeIn{
        0%{opacity:0;transform:translateY(12px)}
        100%{opacity:1;transform:translateY(0)}
        }

        @keyframes blink{
        0%,100%{opacity:1}
        50%{opacity:0}
        }

        .logo-fade-in{
        animation:logoFadeIn .5s ease forwards;
        }

        .india-text{
        display:inline-block;
        background:linear-gradient(90deg,#FF9933 0%,#FF9933 24%,#fff 44%,#fff 56%,#138808 76%,#138808 100%);
        -webkit-background-clip:text;
        -webkit-text-fill-color:transparent;
        clip-path:inset(0 100% 0 0);
        opacity:0;
        transform:translateX(-10px);
        font-weight:900;
        }

        .india-revealed .india-text{
        animation:indiaSlideIn .8s cubic-bezier(.22,1,.36,1) forwards;
        }

        .india-underline{
        background:linear-gradient(90deg,#FF9933,#FFD700,#138808);
        animation:underlineExpand .7s .6s ease-out forwards;
        box-shadow:0 0 10px rgba(255,180,0,.6);
        }

        .typing-cursor{
        display:inline-block;
        width:3px;
        height:.85em;
        background:#FFD700;
        margin-left:3px;
        border-radius:1px;
        animation:blink .75s step-end infinite;
        }

        .badge-visible{
        animation:badgeFadeUp .6s ease forwards;
        }

        .cta-visible{
        animation:fadeUpIn .5s ease forwards;
        }

        .search-visible{
        animation:searchFadeIn .55s .2s ease forwards;
        }

        `}</style>

      <section
        ref={sectionRef}
        className="relative w-full lg:h-[750px] h-[600px] overflow-hidden">
        <Image
          src="/HeroImage2.webp"
          alt="Hero"
          fill
          priority
          quality={75}
          sizes="100vw"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="relative z-20 h-full flex items-start lg:mt-20 mt-5 px-6 md:px-7 lg:px-24">
          <div className="w-full lg:max-w-3xl max-w-2xl space-y-5">
            <h1 className="text-6xl font-black text-white">
              {renderLine1()}

              {line1 === FULL_LINE1 && (
                <>
                  <br />
                  <span>
                    {line2}
                    {showCursor2 && <span className="typing-cursor" />}
                  </span>
                </>
              )}
            </h1>

            {subtitle && (
              <div
                onClick={() => setIsSearchOpen(true)}
                className={`inline-flex items-center bg-white/95 rounded-full px-5 py-2 gap-3 shadow-xl cursor-pointer opacity-0 ${subtitle ? 'search-visible' : ''
                  }`}
              >
                <FaSearch className="text-[#2F4191]" />

                <input
                  type="text"
                  placeholder="Search for products..."
                  readOnly
                  className="bg-transparent outline-none text-sm w-[200px]"
                />

                <span className="bg-gradient-to-r from-[#2F4191] to-[#2B7EC2] text-white text-xs font-bold px-3 py-1 rounded-full">
                  Search
                </span>
              </div>
            )}

            {subtitle && (
              <p className="text-sm md:text-base text-gray-300 max-w-lg">
                {subtitle}
                {showCursorSub && <span className="typing-cursor" />}
              </p>
            )}

            {ctaVisible && (
              <div className="space-y-4 lg:block hidden">
                <Link href="/products">
                  <button
                    className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-white bg-gradient-to-r from-[#2F4191] to-[#2B7EC2] shadow-lg opacity-0 ${ctaVisible ? 'cta-visible' : ''
                      }`}
                  >
                    Request a Quote <FaArrowRight size={13} />
                  </button>
                </Link>

                <div className="flex flex-wrap gap-2 mt-5">
                  {TRUST_PILLS.map((pill, i) => (
                    <span
                      key={pill.text}
                      className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-white/30 ${pill.bg} ${pill.textColor}`}
                    >
                      <span className={`w-[5px] h-[5px] rounded-full ${pill.dot}`} />
                      {pill.text}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="absolute bottom-20 hidden lg:block left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[#2F4191] opacity-100 animate-bounce">
          <div className="w-[20px] h-[32px] border-2 border-black rounded-xl relative">
            <div className="absolute top-[5px] left-1/2 -translate-x-1/2 w-[4px] h-[7px] bg-[#2F4191] rounded"></div>
          </div>
          <span className="text-[9px] text-red-800 font-bold tracking-widest uppercase">
            Scroll
          </span>
        </div>
      </section>

      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}