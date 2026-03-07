'use client';
import { useEffect, useState, useRef, useCallback } from 'react';
import { FaSearch } from 'react-icons/fa';
import Link from 'next/link';
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
    const [indiaFullyTyped, setIndiaFullyTyped] = useState(false);
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
        setIndiaFullyTyped(false);

        typeText(FULL_LINE1, setLine1, setShowCursor1, () => {
            // Trigger India slide animation once line1 is fully typed
            setIndiaFullyTyped(true);
            typeText(FULL_LINE2, setLine2, setShowCursor2, () => {
                typeText(SUBTITLE, setSubtitle, setShowCursorSub, null, 300);
            });
        }, 500);
    }, [typeText]);

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setAnimKey(k => k + 1);
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

    // Renders "Welcome to Being India" with:
    //   - logo image injected before "Welcome"
    //   - "Being India" highlighted with left→right slide-in reveal on "India"
    const renderLine1 = () => {
        const beingIdx = line1.indexOf('Being');

        // Still typing "Welcome to "
        if (beingIdx === -1) {
            return (
                <>
                    {line1}
                    {showCursor1 && <span className="typing-cursor" />}
                </>
            );
        }

        const before = line1.slice(0, beingIdx);          // "Welcome to "
        const beingPart = line1.slice(beingIdx);           // "Being" … "Being India"
        const indiaIdx = beingPart.indexOf('India');
        const isIndiaVisible = indiaIdx !== -1;

        return (
            <>
                {/* Inline logo — sits before "Welcome to" */}
                <span className="hero-logo-inline">
                    <Image src="/logo.webp" alt="Being India" height={48} width={140} style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '10px', marginBottom: '6px' }} />
                </span>
                {before}
                <span className="being-india-group">
                    {/* "Being " typed normally */}
                    {isIndiaVisible ? beingPart.slice(0, indiaIdx) : beingPart}

                    {/* "India" — clip-reveal left→right once fully typed */}
                    {isIndiaVisible && (
                        <span className={`india-wrapper ${indiaFullyTyped ? 'india-revealed' : ''}`}>
                            <span className="india-text">
                                {beingPart.slice(indiaIdx)}
                            </span>
                            {indiaFullyTyped && <span className="india-underline" />}
                        </span>
                    )}
                </span>
                {showCursor1 && <span className="typing-cursor" />}
            </>
        );
    };

    return (
        <>
            <style>{`
                /* ── India slide-in from left ── */
                @keyframes indiaSlideIn {
                    0%   { clip-path: inset(0 100% 0 0); opacity: 0.4; transform: translateX(-8px); }
                    60%  { clip-path: inset(0 0%   0 0); opacity: 1;   transform: translateX(2px);  }
                    100% { clip-path: inset(0 0%   0 0); opacity: 1;   transform: translateX(0);    }
                }

                @keyframes underlineExpand {
                    0%   { width: 0%;   opacity: 0; }
                    100% { width: 100%; opacity: 1; }
                }

                @keyframes blink {
                    0%, 100% { opacity: 1; }
                    50%       { opacity: 0; }
                }

                @keyframes searchFadeIn {
                    0%   { opacity: 0; transform: translateY(12px); }
                    100% { opacity: 1; transform: translateY(0);    }
                }

                /* India text — tricolor gradient */
                .india-wrapper {
                    position: relative;
                    display: inline-block;
                }

                .india-text {
                    display: inline-block;
                    background: linear-gradient(
                        90deg,
                        #FF9933 0%,
                        #FF9933 25%,
                        #ffffff 48%,
                        #ffffff 52%,
                        #138808 75%,
                        #138808 100%
                    );
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    font-weight: 900;
                    /* hidden by default; revealed by .india-revealed */
                    clip-path: inset(0 100% 0 0);
                    opacity: 0;
                    transform: translateX(-8px);
                }

                .india-wrapper.india-revealed .india-text {
                    animation: indiaSlideIn 0.75s cubic-bezier(0.22, 1, 0.36, 1) forwards;
                }

                .india-underline {
                    position: absolute;
                    bottom: -4px;
                    left: 0;
                    height: 3px;
                    border-radius: 2px;
                    background: linear-gradient(90deg, #FF9933, #ffffff, #138808);
                    animation: underlineExpand 0.7s 0.55s ease-out forwards;
                    width: 0%;
                    opacity: 0;
                    box-shadow: 0 0 8px rgba(255,153,51,0.5);
                }

                /* Typing cursor */
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

                /* Search box */
                .search-box-wrapper {
                    display: inline-flex;
                    align-items: center;
                    background: white;
                    border-radius: 50px;
                    padding: 8px 16px;
                    margin: 16px 0;
                    gap: 10px;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.2);
                    opacity: 0;
                    cursor: pointer;
                }
                .search-box-wrapper.visible {
                    animation: searchFadeIn 0.6s 0.3s ease forwards;
                }
                .search-input {
                    border: none;
                    outline: none;
                    background: transparent;
                    color: #333;
                    font-size: 14px;
                    width: 280px;
                    font-weight: 500;
                    pointer-events: none;
                }
                .search-input::placeholder { color: #999; }
                .search-icon { color: #2F4191; }

                .hero-h1 { min-height: 7.5rem; }

                .hero-logo-inline {
                    display: inline-flex;
                    align-items: center;
                }
            `}</style>

            <section
                ref={sectionRef}
                className="w-full relative mx-auto h-screen flex flex-col md:flex-row overflow-hidden"
            >
                <div className="relative w-full h-full">
                    {/* Background */}
                    <div
                        className="absolute inset-0 z-10"
                        style={{
                            backgroundImage: 'url(/HeroImage2.webp)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />

                    {/* Content */}
                    <div className="relative z-20 h-full pt-10 flex items-start justify-start px-6 md:px-16 text-white">
                        <div className="space-y-5">
                            {/* Headline — logo is now inline inside renderLine1 */}
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

                            {/* Search box */}
                            {subtitle && (
                                <div
                                    className={`search-box-wrapper ${subtitle ? 'visible' : ''}`}
                                    onClick={() => setIsSearchOpen(true)}
                                >
                                    <FaSearch className="search-icon" size={18} />
                                    <input
                                        type="text"
                                        placeholder="Search for products..."
                                        className="search-input"
                                        readOnly
                                    />
                                </div>
                            )}

                            {/* Subtitle */}
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

            <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </>
    );
}