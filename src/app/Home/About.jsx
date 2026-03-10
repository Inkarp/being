'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { BsPeople, BsShieldCheck, BsAward } from 'react-icons/bs';
import { RiTestTubeFill } from 'react-icons/ri';

const FEATURES = [
  {
    icon: BsShieldCheck,
    title: 'ISO Certified',
    desc: 'Every instrument meets rigorous international quality & safety standards.',
  },
  {
    icon: BsPeople,
    title: 'Expert Support',
    desc: '24/7 dedicated technical assistance from certified specialists.',
  },
  {
    icon: RiTestTubeFill,
    title: 'Precision Grade',
    desc: 'Lab-grade accuracy engineered for research, industry, and education.',
  },
];

const STATS = [
  { value: '10+', label: 'Years of Excellence' },
  { value: '5K+', label: 'Instruments Delivered' },
  { value: '98%', label: 'Client Satisfaction' },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

export default function About() {
  const [sectionRef, visible] = useInView();

  return (
    <>
      <style>{`
        :root {
          --blue-deep:  #2F4191;
          --blue-mid:   #2B7EC2;
          --blue-light: #4FA8E0;
          --blue-pale:  #EAF4FC;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes fadeLeft {
          from { opacity: 0; transform: translateX(-28px); }
          to   { opacity: 1; transform: translateX(0);     }
        }
        @keyframes fadeRight {
          from { opacity: 0; transform: translateX(28px); }
          to   { opacity: 1; transform: translateX(0);    }
        }
        @keyframes spinSlow {
          to { transform: rotate(360deg); }
        }
        @keyframes countUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .about-img-col.visible  { animation: fadeLeft  0.7s ease forwards; }
        .about-copy-col.visible { animation: fadeRight 0.7s 0.15s ease forwards; }
        .about-img-col,
        .about-copy-col         { opacity: 0; }

        .feature-card {
          opacity: 0;
          transform: translateY(20px);
          transition: box-shadow 0.3s, transform 0.3s, border-color 0.3s;
        }
        .feature-card.visible {
          animation: fadeUp 0.55s ease forwards;
        }
        .feature-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 48px rgba(43,126,194,0.18);
          border-color: var(--blue-mid) !important;
        }
        .feature-icon-wrap {
          transition: background 0.3s, transform 0.3s;
        }
        .feature-card:hover .feature-icon-wrap {
          background: var(--blue-deep);
          transform: scale(1.08) rotate(-4deg);
        }
        .feature-card:hover .feature-icon {
          color: #fff !important;
        }

        .stat-item.visible { animation: countUp 0.5s ease forwards; }
        .stat-item          { opacity: 0; }

        .gear-svg { animation: spinSlow 7s linear infinite; z-index: 0; }

        .know-btn {
          position: relative;
          overflow: hidden;
          transition: box-shadow 0.3s;
        }
        .know-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(120deg, var(--blue-deep), var(--blue-mid));
          opacity: 0;
          transition: opacity 0.3s;
          border-radius: inherit;
        }
        .know-btn:hover::before { opacity: 1; }
        .know-btn:hover { box-shadow: 0 8px 28px rgba(47,65,145,0.35); }
        .know-btn span { position: relative; z-index: 1; }

        .img-accent {
          position: absolute;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--blue-mid), var(--blue-light));
          opacity: 0.12;
          filter: blur(40px);
          pointer-events: none;
        }

        .divider-line {
          width: 48px;
          height: 3px;
          border-radius: 2px;
          background: linear-gradient(90deg, var(--blue-deep), var(--blue-light));
        }
      `}</style>

      <section
        ref={sectionRef}
        className="w-full py-5 px-4"
        // style={{ background: 'linear-gradient(160deg, #275c9c 0%, #6cacdf 50%, #f0f7ff 100%)' }}
      >
        <div className="max-w-7xl mx-auto">

          {/* ── Main Two-Column Grid ── */}
          <div className="grid lg:grid-cols-2 gap-10 xl:gap-16 items-center">

            {/* Left — Image */}
            <div className={`about-img-col ${visible ? 'visible' : ''} relative`}>
              {/* Decorative blobs */}
              <div className="img-accent" style={{ width: 320, height: 320, top: -40, left: -40 }} />
              <div className="img-accent" style={{ width: 200, height: 200, bottom: -20, right: -20, background: 'linear-gradient(135deg,#2F4191,#2B7EC2)' }} />

              {/* Image frame */}
              <div
                className="relative overflow-hidden rounded-3xl"
                style={{
                  boxShadow: '0 24px 64px rgba(43,126,194,0.22), 0 0 0 1px rgba(43,126,194,0.08)',
                }}
              >
                <Image
                  src="/contact.png"
                  alt="Inkarp Instruments Laboratory Solutions"
                  width={650}
                  height={520}
                  className="w-full h-auto object-cover"
                  style={{ aspectRatio: '5/4' }}
                />
                {/* Bottom gradient overlay for depth */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(to top, rgba(47,65,145,0.25) 0%, transparent 55%)',
                  }}
                />
              </div>

              {/* Floating stat strip */}
              <div
                className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-0 rounded-2xl overflow-hidden"
                style={{
                  boxShadow: '0 12px 40px rgba(0,0,0,0.18)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                {STATS.map((s, i) => (
                  <div
                    key={i}
                    className={`stat-item ${visible ? 'visible' : ''} px-5 py-3 text-center`}
                    style={{
                      animationDelay: `${0.4 + i * 0.12}s`,
                      background: i === 1
                        ? 'linear-gradient(135deg, var(--blue-deep), var(--blue-mid))'
                        : 'rgba(255,255,255,0.88)',
                      borderRight: i < 2 ? '1px solid rgba(43,126,194,0.15)' : 'none',
                      minWidth: 90,
                    }}
                  >
                    <div
                      className="text-xl font-black leading-none"
                      style={{ color: i === 1 ? '#fff' : 'var(--blue-deep)' }}
                    >
                      {s.value}
                    </div>
                    <div
                      className="text-[10px] font-semibold mt-0.5 uppercase tracking-wider"
                      style={{ color: i === 1 ? 'rgba(255,255,255,0.8)' : '#6b7280' }}
                    >
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Copy */}
            <div className={`about-copy-col ${visible ? 'visible' : ''} space-y-7`}>

              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest"
                style={{
                  background: 'white',
                  border: '1.5px solid rgba(47,65,145,0.2)',
                  color: 'var(--blue-deep)',
                }}
              >
                <span
                  style={{
                    width: 6, height: 6, borderRadius: '50%',
                    background: 'var(--blue-mid)', display: 'inline-block',
                  }}
                />
                About Us
              </div>

              {/* Headline */}
              <div>
                <h2
                  className="text-3xl md:text-4xl font-black leading-tight"
                  style={{ color: '#0f1c3f', letterSpacing: '-0.5px' }}
                >
                  Your Trusted<br />
                  <span style={{ color: 'white' }}>Lab Partner</span>
                </h2>
                <div className="divider-line mt-4" />
              </div>

              {/* Description box */}
              <p
                className="text-base md:text-lg leading-relaxed rounded-2xl px-5 py-4"
                style={{
                  color: '#374151',
                  background: '#fff',
                  border: '1px solid rgba(43,126,194,0.15)',
                  boxShadow: '0 4px 20px rgba(43,126,194,0.07)',
                }}
              >
                Delivering precision laboratory instruments with unmatched reliability. Serving research, industry, and education with{' '}
                <strong style={{ color: 'var(--blue-deep)' }}>10+ years</strong> of proven excellence across India.
              </p>

              {/* Feature Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {FEATURES.map(({ icon: Icon, title, desc }, i) => (
                  <div
                    key={title}
                    className={`feature-card ${visible ? 'visible' : ''} rounded-2xl p-5 flex flex-col gap-3`}
                    style={{
                      animationDelay: `${0.25 + i * 0.12}s`,
                      background: '#fff',
                      border: '1.5px solid rgba(43,126,194,0.12)',
                      boxShadow: '0 4px 16px rgba(43,126,194,0.06)',
                    }}
                  >
                    <div
                      className="feature-icon-wrap w-11 h-11 rounded-xl flex items-center justify-center"
                      style={{ background: 'var(--blue-pale)' }}
                    >
                      <Icon
                        className="feature-icon w-5 h-5"
                        style={{ color: 'var(--blue-deep)' }}
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-gray-900 mb-1">{title}</h4>
                      <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <Link href="/about-us">
                <div
                  className="know-btn inline-flex items-center gap-3 px-6 py-3 rounded-full cursor-pointer mt-2"
                  style={{
                    background: 'linear-gradient(135deg, var(--blue-deep), var(--blue-mid))',
                    // color: '#fff',
                  }}
                >
                  <span className="font-bold text-sm tracking-wide">Know More About Us</span>

                  {/* Spinning gear with arrow */}
                  <div className="relative w-8 h-8 flex-shrink-0">
                    <svg
                      width="32" height="32"
                      viewBox="0 0 30 30"
                      fill="black"
                      xmlns="http://www.w3.org/2000/svg"
                      className="gear-svg absolute inset-0 z-0"
                    >
                      <path d="M14.2257 0.947522C14.6258 0.457905 15.3742 0.457905 15.7743 0.947522L16.8781 2.29817C17.181 2.66879 17.704 2.77283 18.1256 2.54633L19.6623 1.72088C20.2193 1.42165 20.9107 1.70806 21.093 2.31352L21.5959 3.98376C21.7339 4.44207 22.1773 4.73834 22.6535 4.69044L24.3891 4.51587C25.0182 4.45258 25.5474 4.98179 25.4841 5.61093L25.3096 7.34647C25.2617 7.8227 25.5579 8.2661 26.0162 8.40409L27.6865 8.90697C28.2919 9.08926 28.5783 9.7807 28.2791 10.3377L27.4537 11.8744C27.2272 12.296 27.3312 12.819 27.7018 13.1219L29.0525 14.2257C29.5421 14.6258 29.5421 15.3742 29.0525 15.7743L27.7018 16.8781C27.3312 17.181 27.2272 17.704 27.4537 18.1256L28.2791 19.6623C28.5783 20.2193 28.2919 20.9107 27.6865 21.093L26.0162 21.5959C25.5579 21.7339 25.2617 22.1773 25.3096 22.6535L25.4841 24.3891C25.5474 25.0182 25.0182 25.5474 24.3891 25.4841L22.6535 25.3096C22.1773 25.2617 21.7339 25.5579 21.5959 26.0162L21.093 27.6865C20.9107 28.2919 20.2193 28.5783 19.6623 28.2791L18.1256 27.4537C17.704 27.2272 17.181 27.3312 16.8781 27.7018L15.7743 29.0525C15.3742 29.5421 14.6258 29.5421 14.2257 29.0525L13.1219 27.7018C12.819 27.3312 12.296 27.2272 11.8744 27.4537L10.3377 28.2791C9.7807 28.5783 9.08926 28.2919 8.90697 27.6865L8.40409 26.0162C8.2661 25.5579 7.8227 25.2617 7.34647 25.3096L5.61093 25.4841C4.98179 25.5474 4.45258 25.0182 4.51587 24.3891L4.69044 22.6535C4.73834 22.1773 4.44207 21.7339 3.98376 21.5959L2.31352 21.093C1.70806 20.9107 1.42165 20.2193 1.72088 19.6623L2.54633 18.1256C2.77283 17.704 2.66879 17.181 2.29817 16.8781L0.947522 15.7743C0.457905 15.3742 0.457905 14.6258 0.947522 14.2257L2.29817 13.1219C2.66879 12.819 2.77283 12.296 2.54633 11.8744L1.72088 10.3377C1.42165 9.7807 1.70806 9.08926 2.31352 8.90697L3.98376 8.40409C4.44207 8.2661 4.73834 7.8227 4.69044 7.34647L4.51587 5.61093C4.45258 4.98179 4.98179 4.45258 5.61093 4.51587L7.34647 4.69044C7.8227 4.73834 8.2661 4.44207 8.40409 3.98376L8.90697 2.31352C9.08926 1.70806 9.7807 1.42165 10.3377 1.72088L11.8744 2.54633C12.296 2.77283 12.819 2.66879 13.1219 2.29817L14.2257 0.947522Z" />
                    </svg>
                    <FaArrowRight
                      size={12} color='white'
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white z-10"
                    />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}