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

function GearArrowIcon() {
  return (
    <span className="relative inline-flex h-8 w-8 flex-shrink-0 items-center justify-center">
      <svg
        width="32"
        height="32"
        viewBox="0 0 30 30"
        fill="white"
        xmlns="http://www.w3.org/2000/svg"
        className="gear-svg absolute inset-0 z-0"
        aria-hidden="true"
      >
        <path d="M14.2257 0.947522C14.6258 0.457905 15.3742 0.457905 15.7743 0.947522L16.8781 2.29817C17.181 2.66879 17.704 2.77283 18.1256 2.54633L19.6623 1.72088C20.2193 1.42165 20.9107 1.70806 21.093 2.31352L21.5959 3.98376C21.7339 4.44207 22.1773 4.73834 22.6535 4.69044L24.3891 4.51587C25.0182 4.45258 25.5474 4.98179 25.4841 5.61093L25.3096 7.34647C25.2617 7.8227 25.5579 8.2661 26.0162 8.40409L27.6865 8.90697C28.2919 9.08926 28.5783 9.7807 28.2791 10.3377L27.4537 11.8744C27.2272 12.296 27.3312 12.819 27.7018 13.1219L29.0525 14.2257C29.5421 14.6258 29.5421 15.3742 29.0525 15.7743L27.7018 16.8781C27.3312 17.181 27.2272 17.704 27.4537 18.1256L28.2791 19.6623C28.5783 20.2193 28.2919 20.9107 27.6865 21.093L26.0162 21.5959C25.5579 21.7339 25.2617 22.1773 25.3096 22.6535L25.4841 24.3891C25.5474 25.0182 25.0182 25.5474 24.3891 25.4841L22.6535 25.3096C22.1773 25.2617 21.7339 25.5579 21.5959 26.0162L21.093 27.6865C20.9107 28.2919 20.2193 28.5783 19.6623 28.2791L18.1256 27.4537C17.704 27.2272 17.181 27.3312 16.8781 27.7018L15.7743 29.0525C15.3742 29.5421 14.6258 29.5421 14.2257 29.0525L13.1219 27.7018C12.819 27.3312 12.296 27.2272 11.8744 27.4537L10.3377 28.2791C9.7807 28.5783 9.08926 28.2919 8.90697 27.6865L8.40409 26.0162C8.2661 25.5579 7.8227 25.2617 7.34647 25.3096L5.61093 25.4841C4.98179 25.5474 4.45258 25.0182 4.51587 24.3891L4.69044 22.6535C4.73834 22.1773 4.44207 21.7339 3.98376 21.5959L2.31352 21.093C1.70806 20.9107 1.42165 20.2193 1.72088 19.6623L2.54633 18.1256C2.77283 17.704 2.66879 17.181 2.29817 16.8781L0.947522 15.7743C0.457905 15.3742 0.457905 14.6258 0.947522 14.2257L2.29817 13.1219C2.66879 12.819 2.77283 12.296 2.54633 11.8744L1.72088 10.3377C1.42165 9.7807 1.70806 9.08926 2.31352 8.90697L3.98376 8.40409C4.44207 8.2661 4.73834 7.8227 4.69044 7.34647L4.51587 5.61093C4.45258 4.98179 4.98179 4.45258 5.61093 4.51587L7.34647 4.69044C7.8227 4.73834 8.2661 4.44207 8.40409 3.98376L8.90697 2.31352C9.08926 1.70806 9.7807 1.42165 10.3377 1.72088L11.8744 2.54633C12.296 2.77283 12.819 2.66879 13.1219 2.29817L14.2257 0.947522Z" />
      </svg>
      <FaArrowRight size={12} color="black" className="relative z-10" />
    </span>
  );
}

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
      <span className="inline-flex flex-wrap items-center justify-center sm:justify-start gap-x-3 leading-tight">
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
            style={{ filter: '' }}
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

        @keyframes spinSlow{
        from{transform:rotate(0deg)}
        to{transform:rotate(360deg)}
        }

        .gear-svg{
        animation:spinSlow 7s linear infinite;
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
        className="relative w-full lg:h-[750px] h-[560px] sm:h-[600px] overflow-hidden bg-[#2F4191]">
        <Image
          src="/HeroImage2.webp"
          alt="Hero"
          fill
          priority
          quality={75}
          sizes="100vw"
          className="hidden sm:block absolute inset-0 w-full h-full object-cover"
        />

        <div className="relative z-20 h-full flex items-start justify-center sm:justify-start lg:mt-20 mt-8 px-5 sm:px-6 md:px-7 lg:px-24">
          <div className="w-full lg:max-w-3xl max-w-2xl space-y-4 sm:space-y-5 text-center sm:text-left">
            <h1 className="text-[2.4rem] leading-tight sm:text-5xl lg:text-6xl font-black text-white">
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
                className={`inline-flex max-w-full items-center bg-white/95 rounded-full px-4 sm:px-5 py-2 gap-2 sm:gap-3 shadow-xl cursor-pointer opacity-0 ${subtitle ? 'search-visible' : ''
                  }`}
              >
                <FaSearch className="text-[#2F4191]" />

                <input
                  type="text"
                  placeholder="Search for products..."
                  readOnly
                  className="bg-transparent outline-none text-sm w-[150px] sm:w-[200px] min-w-0"
                />

                <span className="bg-gradient-to-r from-[#2F4191] to-[#2B7EC2] text-white text-xs font-bold px-3 py-1 rounded-full">
                  Search
                </span>
              </div>
            )}

            {subtitle && (
              <p className="text-sm md:text-base text-gray-300 max-w-lg mx-auto sm:mx-0">
                {subtitle}
                {showCursorSub && <span className="typing-cursor" />}
              </p>
            )}

            {ctaVisible && (
              <div className="space-y-4 flex justify-center sm:justify-start">
                <Link href="/products">
                  <button
                    className={`inline-flex items-center gap-3 px-5 py-2.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-[#2F4191] to-[#2B7EC2] shadow-lg opacity-0 ${ctaVisible ? 'cta-visible' : ''
                      }`}
                  >
                    Explore Products <GearArrowIcon />
                  </button>
                </Link>


              </div>
            )}
          </div>
        </div>

        <div className="animate-bounce absolute bottom-15 left-1/2 hidden lg:flex -translate-x-1/2 flex-col items-center z-20 cursor-pointer">

          {/* Arrow */}
          <div className=" mb-3">
            <svg
              width="34"
              height="18"
              viewBox="0 0 34 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-[0_0_10px_rgba(255,255,255,0.45)]"
            >
              <path
                d="M2 2L17 16L32 2"
                stroke="rgba(255,255,255,0.92)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Text */}
          <span
            className="text-white/75 uppercase tracking-[0.38em] text-[11px] font-medium select-none drop-shadow-md"
          >
            Scroll To Explore
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
