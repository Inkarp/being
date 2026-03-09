'use client';
import { useEffect, useState, useRef, useCallback } from 'react';
import { FaSearch, FaArrowRight } from 'react-icons/fa';
import Link from 'next/link';
import SearchOverlay from './SearchOverlay';
import Image from 'next/image';



const FULL_LINE1 = 'Welcome to Being India';
const FULL_LINE2 = 'Scientific Solutions';
const SUBTITLE =
  'Discover our cutting-edge solutions to accelerate scientific excellence.';
const TYPING_SPEED = 80;

const TRUST_PILLS = ['ISO Certified', '10+ Years', '5,000+ Instruments'];

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

    const t = setTimeout(() => setBadgeVisible(true), 200);
    timeoutsRef.current.push(t);

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
    const beingIdx = line1.indexOf('Being');
    if (beingIdx === -1)
      return (
        <>
          {line1}
          {showCursor1 && <span className="typing-cursor" />}
        </>
      );

    const before = line1.slice(0, beingIdx);
    const beingPart = line1.slice(beingIdx);
    const indiaIdx = beingPart.indexOf('India');
    const hasIndia = indiaIdx !== -1;

    return (
      <>
        {before}
        {hasIndia ? beingPart.slice(0, indiaIdx) : beingPart}

        {hasIndia && (
          <span
            className={`relative inline-block ${
              indiaFullyTyped ? 'india-revealed' : ''
            }`}
          >
            <span className="india-text">{beingPart.slice(indiaIdx)}</span>

            {indiaFullyTyped && (
              <span className="india-underline absolute left-0 -bottom-[5px] h-[3px] rounded" />
            )}
          </span>
        )}

        {showCursor1 && <span className="typing-cursor" />}
      </>
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
        className="relative w-full h-screen overflow-hidden"
      >
        <Image
          src="/HeroImage.webp"
          alt="Hero"
          fill
          priority
          quality={90}
          sizes="100vw"
          className="absolute inset-0 object-cover object-center"
        />

        <div className="relative z-20 h-full flex items-center px-6 md:px-14 lg:px-24">
          <div className="w-full max-w-2xl space-y-5">
            <span
              className={`inline-flex items-center bg-white border border-white/30 backdrop-blur-xl px-[14px] py-[5px] pl-[8px] rounded-full opacity-0 ${
                badgeVisible ? 'badge-visible' : ''
              }`}
            >
              <Image
                src="/logo.webp"
                alt="Being India"
                width={105}
                height={32}
              />
            </span>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight text-white">
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
                className={`inline-flex items-center bg-white/95 rounded-full px-5 py-2 gap-3 shadow-xl cursor-pointer opacity-0 ${
                  subtitle ? 'search-visible' : ''
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

            {/* {ctaVisible && (
              <div className="space-y-4">
                <Link href="/products">
                  <button
                    className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-[#0f1c3f] bg-gradient-to-r from-[#FFD700] to-[#FF9933] shadow-lg opacity-0 ${
                      ctaVisible ? 'cta-visible' : ''
                    }`}
                  >
                    Explore Products <FaArrowRight size={13} />
                  </button>
                </Link>

                <div className="flex flex-wrap gap-2">
                  {TRUST_PILLS.map((label, i) => (
                    <span
                      key={label}
                      className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider bg-white/10 border border-white/30 px-3 py-1 rounded-full text-white"
                    >
                      <span className="w-[5px] h-[5px] rounded-full bg-yellow-400" />
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            )} */}
          </div>
        </div>

        {/* <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white opacity-100 animate-bounce">
          <div className="w-[20px] h-[32px] border-2 border-black rounded-xl relative">
            <div className="absolute top-[5px] left-1/2 -translate-x-1/2 w-[4px] h-[7px] bg-yellow-400 rounded"></div>
          </div>
          <span className="text-[9px] font-bold tracking-widest uppercase">
            Scroll
          </span>
        </div> */}
      </section>

      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}