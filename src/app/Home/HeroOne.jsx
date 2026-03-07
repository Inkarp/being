'use client';
import { useEffect, useState, useRef, useCallback } from 'react';
import { FaArrowRight, FaSearch } from 'react-icons/fa';
import Link from 'next/link';
import Header from './Header';
import HeaderOne from './HeaderOne';
import SearchOverlay from './SearchOverlay';
import Image from 'next/image';

const FULL_LINE1 = 'Welcome to Being India';
const FULL_LINE2 = 'Scientific Solutions';
const SUBTITLE = 'Discover our cutting-edge solutions to accelerate scientific excellence.';
const TYPING_SPEED = 80;

export default function HeroOne() {
    const [animKey, setAnimKey] = useState(0);
    const [line1, setLine1] = useState('');
    const [line2, setLine2] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [showCursor1, setShowCursor1] = useState(false);
    const [showCursor2, setShowCursor2] = useState(false);
    const [showCursorSub, setShowCursorSub] = useState(false);
    const [badgeVisible, setBadgeVisible] = useState(false);
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

        const t = setTimeout(() => setBadgeVisible(true), 200);
        timeoutsRef.current.push(t);

        typeText(FULL_LINE1, setLine1, setShowCursor1, () => {
            typeText(FULL_LINE2, setLine2, setShowCursor2, () => {
                typeText(SUBTITLE, setSubtitle, setShowCursorSub, null, 300);
            });
        }, 500);
    }, [typeText]);

    // IntersectionObserver — fires every time section enters viewport
    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setAnimKey(k => k + 1);
                }
            },
            { threshold: 0.3 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (animKey === 0) return;
        startAnimation();
        return clearAll;
    }, [animKey, startAnimation]);

    // Render line1 with "India" highlighted once it appears
    const renderLine1 = () => {
        const highlightWord = 'India';
        const idx = line1.indexOf('Being');
        if (idx === -1) {
            return (
                <>
                    {line1}
                    {showCursor1 && <span className="typing-cursor" />}
                </>
            );
        }
        const before = line1.slice(0, idx);
        const highlighted = line1.slice(idx); // "Being" or "Being India" as it types
        return (
            <>
                {before}
                <span className="india-wrapper">
                    <span className="india-text">{highlighted}</span>
                    {line1 === FULL_LINE1 && <span className="india-underline" />}
                </span>
                {showCursor1 && <span className="typing-cursor" />}
            </>
        );
    };

    return (
        <>
            <style>{`
                @keyframes shimmer {
                    0%   { background-position: -200% center; }
                    100% { background-position:  200% center; }
                }
                @keyframes underlineExpand {
                    0%   { width: 0%;   opacity: 0; }
                    100% { width: 100%; opacity: 1; }
                }
                @keyframes badgeFadeUp {
                    0%   { opacity: 0; transform: translateY(12px); }
                    100% { opacity: 1; transform: translateY(0);    }
                }
                @keyframes searchFadeIn {
                    0%   { opacity: 0; transform: translateY(12px); }
                    100% { opacity: 1; transform: translateY(0);    }
                }
                @keyframes blink {
                    0%, 100% { opacity: 1; }
                    50%       { opacity: 0; }
                }
                @keyframes flagWave {
                    0%, 100% { transform: rotate(0deg);  }
                    25%      { transform: rotate(-8deg); }
                    75%      { transform: rotate( 8deg); }
                }
                @keyframes spin-slow {
                    from { transform: rotate(0deg);   }
                    to   { transform: rotate(360deg); }
                }

                .india-text {
                    background: linear-gradient(
                        120deg,
                        #FF9933 0%,
                        #FF9933 22%,
                        #ffffff 45%,
                        #ffffff 68%,
                        #00ff08 85%,
                        #33ff4e 100%
                    );
                    background-size: 250% auto;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    animation: shimmer 2.5s linear infinite;
                    display: inline-block;
                    font-weight: 900;
                }

                .india-wrapper {
                    position: relative;
                    display: inline-block;
                }

                .india-underline {
                    position: absolute;
                    bottom: -4px;
                    left: 0;
                    height: 3px;
                    border-radius: 2px;
                    background: linear-gradient(90deg, #FF9933, #FFD700, #138808);
                    animation: underlineExpand 0.9s ease-out forwards;
                    width: 0%;
                    opacity: 0;
                    box-shadow: 0 0 10px rgba(255,180,0,0.7);
                }

                .typing-cursor {
                    display: inline-block;
                    width: 3px;
                    height: 0.85em;
                    background: #FFD700;
                    margin-left: 3px;
                    vertical-align: middle;
                    border-radius: 1px;
                    animation: blink 0.75s step-end infinite;
                }

                .made-in-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    background: white;
                    border: 1px solid black;
                    backdrop-filter: blur(8px);
                    padding: 5px 14px 5px 10px;
                    border-radius: 100px;
                    font-size: 12px;
                    font-weight: 700;
                    letter-spacing: 0.1em;
                    color: white;
                    text-transform: uppercase;
                    margin-bottom: 12px;
                    opacity: 0;
                }
                .badge-visible {
                    animation: badgeFadeUp 0.6s ease forwards;
                }

                .search-box-wrapper {
                    display: inline-flex;
                    align-items: center;
                    background: white;
                    border-radius: 50px;
                    padding: 8px 16px;
                    margin: 16px 0;
                    gap: 10px;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
                    opacity: 0;
                }
                
                .search-box-wrapper.visible {
                    animation: searchFadeIn 0.6s ease forwards;
                    animation-delay: 0.3s;
                }

                .search-input {
                    border: none;
                    outline: none;
                    background: transparent;
                    color: #333;
                    font-size: 14px;
                    width: 280px;
                    font-weight: 500;
                }

                .search-input::placeholder {
                    color: #999;
                }

                .search-icon {
                    color: #2F4191;
                    cursor: pointer;
                }

                .flag-emoji {
                    font-size: 18px;
                    display: inline-block;
                    animation: flagWave 1.8s ease-in-out infinite;
                    transform-origin: bottom center;
                }

                .spin-slow {
                    animation: spin-slow 6s linear infinite;
                }

                .hero-h1 {
                    /* reserve space so layout doesn't jump */
                    min-height: 7.5rem;
                }
            `}</style>

            <section
                ref={sectionRef}
                className="w-full relative mx-auto h-screen flex flex-col md:flex-row overflow-hidden">
                <div className="relative w-full h-full">
                    {/* Background Image */}
                    <div className="absolute inset-0 z-10">
                        <Image
                            src="/HeroImage.webp"
                            alt="Hero background"
                            fill
                            priority
                            className="object-fit"
                        />
                    </div>
                    {/* Main Content */}
                    <div className="relative z-20 h-full pt-10 flex items-start justify-start px-6 md:px-16 text-white">
                        <div className="space-y-5">
                            {/* Badge */}
                            <div className=''>
                                <span className={`made-in-badge ${badgeVisible ? 'badge-visible' : ''}`}>
                                    {/* <span className="flag-emoji">🇮🇳</span> */}
                                    {/* Proudly Now in India */}
                                    <div className=''>
                                        <Image src="/logo.webp" alt='' height={100} width={200} />
                                    </div>
                                </span>
                            </div>
                            {/* Typing headline */}
                            <h1 className="hero-h1 text-4xl md:text-6xl font-bold leading-tight">
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
                            {/* Search Box below heading */}
                            {subtitle && (
                                <div className={`search-box-wrapper ${subtitle ? 'visible' : ''}`} onClick={() => setIsSearchOpen(true)}>
                                    <FaSearch className="search-icon" size={18} />
                                    <input
                                        type="text"
                                        placeholder="Search for products..."
                                        className="search-input"
                                    />
                                </div>
                            )}
                            {/* Subtitle appears after heading finishes */}
                            {subtitle && (
                                <p className="text-lg md:text-xl text-gray-200 max-w-xl">
                                    {subtitle}
                                    {showCursorSub && <span className="typing-cursor" />}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </section>
            <SearchOverlay
                isOpen={isSearchOpen}
                onClose={() => setIsSearchOpen(false)}
            />
        </>
    );
}