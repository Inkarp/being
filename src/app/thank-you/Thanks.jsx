"use client"
import Link from "next/link";
import { useState, useEffect } from "react";

// Animated checkmark SVG
function CheckmarkCircle({ color }) {
  const [drawn, setDrawn] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setDrawn(true), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
      <circle
        cx="40" cy="40" r="36"
        stroke={color}
        strokeWidth="3"
        strokeDasharray="226"
        strokeDashoffset={drawn ? 0 : 226}
        style={{ transition: "stroke-dashoffset 0.9s cubic-bezier(0.22,1,0.36,1)" }}
        fill="none"
      />
      <polyline
        points="24,41 35,53 56,29"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="50"
        strokeDashoffset={drawn ? 0 : 50}
        style={{ transition: "stroke-dashoffset 0.55s 0.75s cubic-bezier(0.22,1,0.36,1)" }}
        fill="none"
      />
    </svg>
  );
}

// Floating particle
function Particle({ style }) {
  return (
    <div style={{
      position: "absolute",
      borderRadius: "50%",
      pointerEvents: "none",
      ...style,
    }} />
  );
}

// Info pill
function InfoPill({ icon, label, value, color }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 12,
      background: "#fff",
      border: "1px solid rgba(0,0,0,0.07)",
      borderRadius: 12,
      padding: "14px 18px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
    }}>
      <span style={{
        width: 36, height: 36, borderRadius: 10,
        background: `${color}12`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "1.1rem", flexShrink: 0,
      }}>
        {icon}
      </span>
      <div>
        <div style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#9e9488", marginBottom: 2 }}>{label}</div>
        <div style={{ fontSize: "0.88rem", fontWeight: 600, color: "#1a1a1a" }}>{value}</div>
      </div>
    </div>
  );
}

export default function Thanks() {
  const [visible, setVisible] = useState(false);
  const [countDown, setCountDown] = useState(10);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  // countdown timer (UI only — wire up router.push('/') in real Next.js)
  useEffect(() => {
    if (countDown <= 0) return;
    const t = setTimeout(() => setCountDown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countDown]);

  const particles = [
    { width: 6,  height: 6,  top: "12%", left: "8%",  background: "#2F419133", animation: "floatA 6s ease-in-out infinite" },
    { width: 10, height: 10, top: "20%", right: "10%", background: "#2B7EC233", animation: "floatB 8s ease-in-out infinite" },
    { width: 5,  height: 5,  top: "70%", left: "5%",  background: "#FF993344", animation: "floatA 7s 1s ease-in-out infinite" },
    { width: 8,  height: 8,  bottom: "15%", right: "7%", background: "#13880833", animation: "floatB 9s 2s ease-in-out infinite" },
    { width: 4,  height: 4,  top: "45%", left: "3%",  background: "#2F419122", animation: "floatA 5s 0.5s ease-in-out infinite" },
    { width: 7,  height: 7,  top: "80%", right: "15%", background: "#FF993322", animation: "floatB 6.5s 1.5s ease-in-out infinite" },
  ];

  const ringProgress = ((10 - countDown) / 10) * 100;
  const circumference = 2 * Math.PI * 18;
  const offset = circumference - (ringProgress / 100) * circumference;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap');

        @keyframes floatA {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-18px) rotate(15deg); }
        }
        @keyframes floatB {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(14px) rotate(-10deg); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.7); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes shimmer {
          0%   { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }
        @keyframes pulseRing {
          0%   { box-shadow: 0 0 0 0 rgba(47,65,145,0.25); }
          70%  { box-shadow: 0 0 0 18px rgba(47,65,145,0); }
          100% { box-shadow: 0 0 0 0 rgba(47,65,145,0); }
        }

        .ty-root * { box-sizing: border-box; margin: 0; padding: 0; }

        .ty-btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 13px 28px; border-radius: 999px; border: none;
          background: linear-gradient(135deg, #2F4191, #2B7EC2);
          color: #fff; font-family: 'DM Sans', sans-serif;
          font-size: 0.88rem; font-weight: 600; cursor: pointer;
          box-shadow: 0 4px 20px rgba(47,65,145,0.35);
          transition: transform 0.2s, box-shadow 0.2s;
          text-decoration: none;
        }
        .ty-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(47,65,145,0.45);
        }
        .ty-btn-secondary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 13px 28px; border-radius: 999px;
          border: 1.5px solid rgba(47,65,145,0.25);
          background: transparent; color: #2F4191;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.88rem; font-weight: 600; cursor: pointer;
          transition: all 0.2s; text-decoration: none;
        }
        .ty-btn-secondary:hover {
          background: rgba(47,65,145,0.06);
          border-color: #2F4191;
        }

        @media (max-width: 600px) {
          .ty-cards { grid-template-columns: 1fr !important; }
          .ty-actions { flex-direction: column !important; align-items: stretch !important; }
          .ty-actions a, .ty-actions button { justify-content: center !important; }
        }
      `}</style>

      <div
        className="ty-root"
        style={{
          fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
          background: "#F0ECE4",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 20px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background particles */}
        {particles.map((p, i) => <Particle key={i} style={p} />)}

        {/* Soft gradient blobs */}
        <div style={{
          position: "absolute", top: "-100px", right: "-80px",
          width: 400, height: 400, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(47,65,145,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: "-80px", left: "-60px",
          width: 350, height: 350, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(43,126,194,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        {/* Main card */}
        <div style={{
          position: "relative", zIndex: 1,
          background: "#fff",
          border: "1px solid rgba(0,0,0,0.07)",
          borderRadius: 24,
          padding: "52px 48px",
          maxWidth: 580, width: "100%",
          boxShadow: "0 24px 80px rgba(0,0,0,0.1)",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(32px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}>

          {/* Top accent bar */}
          <div style={{
            position: "absolute", top: 0, left: "15%", right: "15%", height: 3,
            borderRadius: "0 0 6px 6px",
            background: "linear-gradient(90deg, #2F4191, #2B7EC2, #FF9933)",
          }} />

          {/* Checkmark */}
          <div style={{
            display: "flex", justifyContent: "center", marginBottom: 28,
            animation: visible ? "scaleIn 0.6s 0.2s both ease" : "none",
          }}>
            <div style={{
              animation: "pulseRing 2s 1.2s ease-out",
              borderRadius: "50%",
            }}>
              <CheckmarkCircle color="#2F4191" />
            </div>
          </div>

          {/* Eyebrow */}
          <div style={{
            display: "flex", justifyContent: "center", marginBottom: 14,
            animation: visible ? "fadeUp 0.6s 0.35s both ease" : "none",
          }}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 7,
              fontSize: "0.66rem", fontWeight: 700, letterSpacing: "0.14em",
              textTransform: "uppercase", color: "#2F4191",
              background: "rgba(47,65,145,0.07)",
              border: "1px solid rgba(47,65,145,0.18)",
              borderRadius: 999, padding: "5px 14px",
            }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#2F4191" }} />
              Form Submitted
            </span>
          </div>

          {/* Heading */}
          <h1 style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: "clamp(1.7rem, 4vw, 2.3rem)",
            fontWeight: 700, color: "#1a1a1a",
            textAlign: "center", lineHeight: 1.2,
            letterSpacing: "-0.02em", marginBottom: 14,
            animation: visible ? "fadeUp 0.6s 0.45s both ease" : "none",
          }}>
            Thank You for<br />Reaching Out!
          </h1>

          {/* Subtitle */}
          <p style={{
            fontSize: "0.95rem", color: "#6b6456",
            textAlign: "center", lineHeight: 1.7,
            maxWidth: 420, margin: "0 auto 32px",
            animation: visible ? "fadeUp 0.6s 0.55s both ease" : "none",
          }}>
            We've received your enquiry and our scientific solutions team will
            get back to you within <strong style={{ color: "#2F4191" }}>24 hours</strong>.
          </p>

          {/* Info pills */}
          <div
            className="ty-cards"
            style={{
              display: "grid", gridTemplateColumns: "1fr 1fr",
              gap: 10, marginBottom: 32,
              animation: visible ? "fadeUp 0.6s 0.65s both ease" : "none",
            }}
          >
            <InfoPill icon="📬" label="Response time"  value="Within 24 hours"    color="#2F4191" />
            <InfoPill icon="📞" label="Support line"   value="+91 40 2784 5678"   color="#2B7EC2" />
            <InfoPill icon="✉️" label="Email"          value="info@beingindia.com" color="#0e7490" />
            <InfoPill icon="🏢" label="Location"       value="Hyderabad, India"   color="#065f46" />
          </div>

          {/* Divider */}
          <div style={{
            height: 1, background: "rgba(0,0,0,0.06)",
            margin: "0 0 28px",
            animation: visible ? "fadeUp 0.6s 0.72s both ease" : "none",
          }} />

          {/* Actions */}
          <div
            className="ty-actions"
            style={{
              display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap",
              animation: visible ? "fadeUp 0.6s 0.78s both ease" : "none",
            }}
          >
            <Link href="/" className="ty-btn-primary">
              ← Back to Home
            </Link>
            <Link href="/products" className="ty-btn-secondary">
              Explore Products
            </Link>
          </div>

          {/* Auto-redirect hint */}
          <div style={{
            marginTop: 28, display: "flex", alignItems: "center",
            justifyContent: "center", gap: 10,
            animation: visible ? "fadeUp 0.6s 0.88s both ease" : "none",
          }}>
            {/* tiny countdown ring */}
            <svg width="40" height="40" viewBox="0 0 40 40" style={{ flexShrink: 0 }}>
              <circle cx="20" cy="20" r="18" stroke="#e8e4dd" strokeWidth="2.5" fill="none" />
              <circle
                cx="20" cy="20" r="18"
                stroke="#2F4191" strokeWidth="2.5" fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                transform="rotate(-90 20 20)"
                style={{ transition: "stroke-dashoffset 1s linear" }}
              />
              <text x="20" y="25" textAnchor="middle"
                style={{ fontSize: "11px", fontWeight: 700, fill: "#2F4191", fontFamily: "DM Sans, sans-serif" }}>
                {countDown}
              </text>
            </svg>
            <p style={{ fontSize: "0.78rem", color: "#9e9488", lineHeight: 1.4 }}>
              Redirecting to homepage<br />in <strong style={{ color: "#2F4191" }}>{countDown}s</strong>
            </p>
          </div>

          {/* Bottom logo watermark */}
          <div style={{
            marginTop: 32, textAlign: "center",
            animation: visible ? "fadeUp 0.6s 0.95s both ease" : "none",
          }}>
            <span style={{
              fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em",
              textTransform: "uppercase", color: "#c8c2b8",
            }}>
              Being India Scientific Solutions
            </span>
          </div>
        </div>
      </div>
    </>
  );
}