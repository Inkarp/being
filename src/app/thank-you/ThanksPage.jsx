"use client"

import Link from "next/link";
import { useState, useEffect, useRef } from "react";

// ── Animated number counter ──
function Counter({ target, duration = 1200, suffix = "" }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    const raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return <>{val.toLocaleString()}{suffix}</>;
}

// ── Single step in the "what's next" timeline ──
function TimelineStep({ number, title, desc, color, delay, visible }) {
  return (
    <div style={{
      display: "flex", gap: 16, alignItems: "flex-start",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateX(0)" : "translateX(-20px)",
      transition: `opacity 0.6s ${delay}s ease, transform 0.6s ${delay}s ease`,
    }}>
      <div style={{
        flexShrink: 0, width: 36, height: 36, borderRadius: "50%",
        background: color, display: "flex", alignItems: "center",
        justifyContent: "center", fontSize: "0.75rem", fontWeight: 800,
        color: "#0a0e1a", boxShadow: `0 0 0 6px ${color}22`,
      }}>
        {number}
      </div>
      <div style={{ paddingTop: 6 }}>
        <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "#f0ece4", marginBottom: 3 }}>{title}</div>
        <div style={{ fontSize: "0.78rem", color: "#7a7265", lineHeight: 1.55 }}>{desc}</div>
      </div>
    </div>
  );
}

// ── Orbiting ring decoration ──
function OrbitRing({ size, strokeColor, duration, delay, clockwise = true }) {
  return (
    <div style={{
      position: "absolute", width: size, height: size,
      borderRadius: "50%",
      border: `1px solid ${strokeColor}`,
      top: "50%", left: "50%",
      transform: "translate(-50%, -50%)",
      animation: `${clockwise ? "spinCW" : "spinCCW"} ${duration}s ${delay}s linear infinite`,
      pointerEvents: "none",
    }} />
  );
}

export default function ThanksPage() {
  const [phase, setPhase] = useState(0); // 0=hidden, 1=icon, 2=text, 3=stats, 4=timeline
  const timerRef = useRef([]);

  useEffect(() => {
    const schedule = (fn, ms) => { const t = setTimeout(fn, ms); timerRef.current.push(t); };
    schedule(() => setPhase(1), 100);
    schedule(() => setPhase(2), 600);
    schedule(() => setPhase(3), 1100);
    schedule(() => setPhase(4), 1500);
    return () => timerRef.current.forEach(clearTimeout);
  }, []);

  const stats = [
    { value: 5000, suffix: "+", label: "Instruments Delivered" },
    { value: 10,   suffix: "+ Yrs", label: "Scientific Excellence" },
    { value: 98,   suffix: "%", label: "Customer Satisfaction" },
  ];

  const steps = [
    { number: "01", title: "Confirmation Email Sent", desc: "Check your inbox — a copy of your enquiry is on its way.", color: "#FFD700" },
    { number: "02", title: "Expert Review (2–4 hrs)", desc: "Our specialist reviews your requirements carefully.", color: "#2B7EC2" },
    { number: "03", title: "Personal Follow-up", desc: "You'll receive a tailored response within 24 hours.", color: "#FF9933" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap');

        @keyframes spinCW  { to { transform: translate(-50%,-50%) rotate(360deg);  } }
        @keyframes spinCCW { to { transform: translate(-50%,-50%) rotate(-360deg); } }
        @keyframes pulseGlow {
          0%,100% { box-shadow: 0 0 0 0 rgba(255,215,0,0.2), 0 0 40px rgba(255,215,0,0.08); }
          50%      { box-shadow: 0 0 0 14px rgba(255,215,0,0), 0 0 60px rgba(255,215,0,0.15); }
        }
        @keyframes fadeUp {
          from { opacity:0; transform: translateY(20px); }
          to   { opacity:1; transform: translateY(0); }
        }
        @keyframes scaleUp {
          from { opacity:0; transform: scale(0.5) rotate(-10deg); }
          to   { opacity:1; transform: scale(1) rotate(0deg); }
        }
        @keyframes tickDraw {
          from { stroke-dashoffset: 60; }
          to   { stroke-dashoffset: 0; }
        }
        @keyframes circleDraw {
          from { stroke-dashoffset: 170; }
          to   { stroke-dashoffset: 0; }
        }
        @keyframes scanline {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(400%); }
        }
        @keyframes borderShimmer {
          0%   { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }

        .ty2-root { box-sizing: border-box; }
        .ty2-root * { box-sizing: border-box; margin: 0; padding: 0; }

        .ty2-stat-card:hover {
          transform: translateY(-4px) !important;
          border-color: rgba(255,215,0,0.25) !important;
        }

        .ty2-btn-gold {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 13px 30px; border-radius: 999px; border: none;
          background: linear-gradient(135deg, #FFD700, #FF9933);
          color: #0a0e1a; font-family: 'DM Sans', sans-serif;
          font-size: 0.88rem; font-weight: 700; cursor: pointer;
          box-shadow: 0 4px 24px rgba(255,215,0,0.3);
          transition: transform 0.2s, box-shadow 0.2s;
          text-decoration: none;
        }
        .ty2-btn-gold:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(255,215,0,0.45);
        }
        .ty2-btn-ghost {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 12px 28px; border-radius: 999px;
          border: 1px solid rgba(240,236,228,0.2);
          background: rgba(240,236,228,0.04);
          color: #b8b0a4; font-family: 'DM Sans', sans-serif;
          font-size: 0.88rem; font-weight: 500; cursor: pointer;
          transition: all 0.2s; text-decoration: none;
        }
        .ty2-btn-ghost:hover {
          background: rgba(240,236,228,0.09);
          border-color: rgba(240,236,228,0.35);
          color: #f0ece4;
        }

        @media (max-width: 768px) {
          .ty2-grid { grid-template-columns: 1fr !important; }
          .ty2-stats { grid-template-columns: 1fr 1fr !important; }
          .ty2-actions { flex-direction: column !important; align-items: stretch !important; }
          .ty2-actions a { justify-content: center !important; }
          .ty2-main { padding: 40px 24px !important; }
        }
        @media (max-width: 480px) {
          .ty2-stats { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ── Full-page dark background ── */}
      <div className="ty2-root" style={{
        fontFamily: "'DM Sans', sans-serif",
        background: "#0a0e1a",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px 20px",
        position: "relative",
        overflow: "hidden",
      }}>

        {/* Grid texture overlay */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          zIndex: 0,
        }} />

        {/* Corner glows */}
        <div style={{
          position: "absolute", top: -120, right: -80, width: 500, height: 500,
          borderRadius: "50%", pointerEvents: "none", zIndex: 0,
          background: "radial-gradient(circle, rgba(47,65,145,0.18) 0%, transparent 65%)",
        }} />
        <div style={{
          position: "absolute", bottom: -100, left: -60, width: 420, height: 420,
          borderRadius: "50%", pointerEvents: "none", zIndex: 0,
          background: "radial-gradient(circle, rgba(255,153,51,0.1) 0%, transparent 65%)",
        }} />

        {/* ── Main two-column layout ── */}
        <div className="ty2-grid" style={{
          position: "relative", zIndex: 1,
          display: "grid",
          gridTemplateColumns: "1fr 380px",
          gap: 2,
          maxWidth: 960,
          width: "100%",
          minHeight: 560,
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: 24,
          overflow: "hidden",
          boxShadow: "0 40px 120px rgba(0,0,0,0.5)",
        }}>

          {/* ═══════════════ LEFT PANEL ═══════════════ */}
          <div className="ty2-main" style={{
            background: "#0f1424",
            padding: "52px 48px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: 32,
          }}>

            {/* Logo area */}
            <div style={{
              opacity: phase >= 2 ? 1 : 0,
              transform: phase >= 2 ? "translateY(0)" : "translateY(-12px)",
              transition: "all 0.5s ease",
            }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                fontSize: "0.62rem", fontWeight: 800, letterSpacing: "0.18em",
                textTransform: "uppercase", color: "#FFD700",
                marginBottom: 40,
              }}>
                <span style={{ width: 20, height: 1, background: "#FFD700", display: "inline-block" }} />
                Being India Scientific Solutions
                <span style={{ width: 20, height: 1, background: "#FFD700", display: "inline-block" }} />
              </div>
            </div>

            {/* Central icon */}
            <div style={{ textAlign: "left" }}>
              <div style={{
                position: "relative",
                display: "inline-block",
                width: 80, height: 80,
                marginBottom: 28,
                opacity: phase >= 1 ? 1 : 0,
                transition: "opacity 0.4s ease",
              }}>
                {/* Orbiting decorations */}
                <OrbitRing size={120} strokeColor="rgba(255,215,0,0.12)" duration={12} delay={0} clockwise={true} />
                <OrbitRing size={160} strokeColor="rgba(43,126,194,0.08)" duration={18} delay={0} clockwise={false} />

                {/* Checkmark circle */}
                <svg width="80" height="80" viewBox="0 0 80 80" style={{ animation: phase >= 1 ? "scaleUp 0.6s ease both" : "none" }}>
                  <defs>
                    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%"   stopColor="#FFD700" />
                      <stop offset="100%" stopColor="#FF9933" />
                    </linearGradient>
                  </defs>
                  <circle cx="40" cy="40" r="36" fill="rgba(255,215,0,0.07)"
                    stroke="url(#goldGrad)" strokeWidth="1.5"
                    strokeDasharray="226"
                    style={{ animation: phase >= 1 ? "circleDraw 0.8s 0.1s ease both" : "none" }}
                  />
                  <polyline
                    points="24,41 35,52 57,28"
                    stroke="url(#goldGrad)" strokeWidth="3.5"
                    strokeLinecap="round" strokeLinejoin="round"
                    fill="none" strokeDasharray="60"
                    style={{ animation: phase >= 1 ? "tickDraw 0.5s 0.7s ease both" : "none" }}
                  />
                </svg>

                {/* Pulse glow */}
                <div style={{
                  position: "absolute", inset: -4, borderRadius: "50%",
                  animation: phase >= 1 ? "pulseGlow 2.5s 1s ease-in-out infinite" : "none",
                  pointerEvents: "none",
                }} />
              </div>

              {/* Headline */}
              <h1 style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 600,
                color: "#f0ece4",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                marginBottom: 16,
                opacity: phase >= 2 ? 1 : 0,
                transform: phase >= 2 ? "translateY(0)" : "translateY(16px)",
                transition: "all 0.6s 0.1s ease",
              }}>
                Your Enquiry<br />
                <span style={{
                  background: "linear-gradient(135deg, #FFD700, #FF9933)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}>
                  Has Been Received.
                </span>
              </h1>

              <p style={{
                fontSize: "0.92rem", color: "#7a7265",
                lineHeight: 1.7, maxWidth: 380,
                opacity: phase >= 2 ? 1 : 0,
                transform: phase >= 2 ? "translateY(0)" : "translateY(12px)",
                transition: "all 0.6s 0.25s ease",
              }}>
                Our scientific experts will review your requirements and reach out within
                {" "}<span style={{ color: "#FFD700", fontWeight: 600 }}>24 hours</span> with
                a personalised solution.
              </p>
            </div>

            {/* Stat strip */}
            <div className="ty2-stats" style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 12,
              opacity: phase >= 3 ? 1 : 0,
              transform: phase >= 3 ? "translateY(0)" : "translateY(16px)",
              transition: "all 0.6s ease",
            }}>
              {stats.map((s, i) => (
                <div
                  key={i}
                  className="ty2-stat-card"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: 12, padding: "14px 16px",
                    transition: "transform 0.2s, border-color 0.2s",
                  }}
                >
                  <div style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.6rem", fontWeight: 700,
                    color: "#FFD700", lineHeight: 1,
                    marginBottom: 4,
                  }}>
                    {phase >= 3 && <Counter target={s.value} suffix={s.suffix} duration={1400} />}
                  </div>
                  <div style={{ fontSize: "0.68rem", color: "#5a5450", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="ty2-actions" style={{
              display: "flex", gap: 12, flexWrap: "wrap",
              opacity: phase >= 3 ? 1 : 0,
              transform: phase >= 3 ? "translateY(0)" : "translateY(12px)",
              transition: "all 0.6s 0.15s ease",
            }}>
              <Link href="/" className="ty2-btn-gold">← Back to Home</Link>
              <Link href="/products" className="ty2-btn-ghost">Explore Products →</Link>
            </div>
          </div>

          {/* ═══════════════ RIGHT PANEL ═══════════════ */}
          <div style={{
            background: "#080b14",
            borderLeft: "1px solid rgba(255,255,255,0.05)",
            padding: "48px 32px",
            display: "flex",
            flexDirection: "column",
            gap: 32,
            position: "relative",
            overflow: "hidden",
          }}>
            {/* Scanline effect */}
            <div style={{
              position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
              background: "linear-gradient(transparent 50%, rgba(255,255,255,0.012) 50%)",
              backgroundSize: "100% 4px",
            }} />
            <div style={{
              position: "absolute", left: 0, right: 0, height: "30%",
              background: "linear-gradient(transparent, rgba(255,215,0,0.03), transparent)",
              animation: "scanline 4s linear infinite",
              pointerEvents: "none", zIndex: 0,
            }} />

            {/* Section label */}
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{
                fontSize: "0.6rem", fontWeight: 800,
                letterSpacing: "0.2em", textTransform: "uppercase",
                color: "#3a3530", marginBottom: 20,
              }}>
                — What Happens Next
              </div>

              {/* Timeline */}
              <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                {steps.map((s, i) => (
                  <TimelineStep
                    key={i}
                    {...s}
                    delay={1.5 + i * 0.15}
                    visible={phase >= 4}
                  />
                ))}
              </div>
            </div>

            {/* Divider */}
            <div style={{
              height: 1,
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)",
              position: "relative", zIndex: 1,
            }} />

            {/* Contact block */}
            <div style={{
              position: "relative", zIndex: 1,
              opacity: phase >= 4 ? 1 : 0,
              transform: phase >= 4 ? "translateY(0)" : "translateY(12px)",
              transition: "all 0.6s 1.9s ease",
            }}>
              <div style={{
                fontSize: "0.6rem", fontWeight: 800,
                letterSpacing: "0.2em", textTransform: "uppercase",
                color: "#3a3530", marginBottom: 16,
              }}>
                — Need Immediate Help?
              </div>

              {[
                { icon: "📞", line1: "+91 40 2784 5678", line2: "Mon – Sat, 9am – 6pm" },
                { icon: "✉️", line1: "info@beingindia.com", line2: "We reply within 4 hours" },
              ].map((c, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: 12,
                  padding: "10px 0",
                  borderBottom: i === 0 ? "1px solid rgba(255,255,255,0.04)" : "none",
                }}>
                  <span style={{ fontSize: "1rem", flexShrink: 0 }}>{c.icon}</span>
                  <div>
                    <div style={{ fontSize: "0.83rem", fontWeight: 600, color: "#c8c2b8" }}>{c.line1}</div>
                    <div style={{ fontSize: "0.68rem", color: "#4a4540" }}>{c.line2}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom tag */}
            <div style={{
              marginTop: "auto", position: "relative", zIndex: 1,
              opacity: phase >= 4 ? 1 : 0,
              transition: "opacity 0.6s 2.1s ease",
            }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                fontSize: "0.62rem", color: "#3a3530",
                fontWeight: 600, letterSpacing: "0.08em",
              }}>
                <span style={{
                  width: 6, height: 6, borderRadius: "50%",
                  background: "#22c55e",
                  boxShadow: "0 0 0 4px rgba(34,197,94,0.15)",
                }} />
                ISO Certified · Hyderabad, India
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}