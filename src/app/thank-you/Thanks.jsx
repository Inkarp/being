"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

// Product catalog with full URLs
const PRODUCT_CATALOG = {
  "bpg-9040a": {
    id: "bpg-9040a",
    name: "Laboratory Drying Oven - BPG-9040A",
    shortDescription: "Compact 40 L laboratory drying oven for routine drying and heating applications.",
    href: "/products/laboratory-ovens/laboratory-drying-oven/bpg-9040a",
  },
  "bpg-9070a": {
    id: "bpg-9070a",
    name: "Laboratory Drying Oven - BPG-9070A",
    shortDescription: "80 L forced-air drying oven for higher throughput laboratory workflows.",
    href: "/products/laboratory-ovens/laboratory-drying-oven/bpg-9070a",
  },
  "bpg-9140a": {
    id: "bpg-9140a",
    name: "Laboratory Drying Oven - BPG-9140A",
    shortDescription: "High-capacity drying oven for consistent thermal performance in research labs.",
    href: "/products/laboratory-ovens/laboratory-drying-oven/bpg-9140a",
  },
  "bpg-9240a": {
    id: "bpg-9240a",
    name: "Laboratory Drying Oven - BPG-9240A",
    shortDescription: "Larger chamber model for batch processing and demanding heating applications.",
    href: "/products/laboratory-ovens/laboratory-drying-oven/bpg-9240a",
  },
};

const RECOMMENDATIONS_MAP = {
  "bpg-9040a": ["bpg-9070a", "bpg-9140a"],
  "bpg-9070a": ["bpg-9040a", "bpg-9240a"],
  "bpg-9140a": ["bpg-9070a", "bpg-9240a"],
  "bpg-9240a": ["bpg-9070a", "bpg-9140a"],
};

function CheckmarkCircle({ color }) {
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDrawn(true), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" aria-hidden="true">
      <circle
        cx="40"
        cy="40"
        r="36"
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

function Particle({ style }) {
  return (
    <div
      style={{
        position: "absolute",
        borderRadius: "50%",
        pointerEvents: "none",
        ...style,
      }}
    />
  );
}

function InfoPill({ icon, label, value, color }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        background: "#fff",
        border: "1px solid rgba(0,0,0,0.07)",
        borderRadius: 12,
        padding: "14px 18px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
      }}
    >
      <span
        style={{
          width: 36,
          height: 36,
          borderRadius: 10,
          background: `${color}12`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.1rem",
          flexShrink: 0,
        }}
      >
        {icon}
      </span>
      <div>
        <div
          style={{
            fontSize: "0.65rem",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#9e9488",
            marginBottom: 2,
          }}
        >
          {label}
        </div>
        <div style={{ fontSize: "0.88rem", fontWeight: 600, color: "#1a1a1a" }}>{value}</div>
      </div>
    </div>
  );
}

function ProductCard({ product, onClick }) {
  return (
    <div
      style={{
        border: "1px solid rgba(0,0,0,0.08)",
        borderRadius: 14,
        padding: 16,
        background: "#fff",
        boxShadow: "0 4px 18px rgba(0,0,0,0.05)",
      }}
    >
      <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "#2F4191", marginBottom: 8 }}>
        Recommended Model
      </div>
      <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#1a1a1a", marginBottom: 8 }}>
        {product.name}
      </h3>
      <p style={{ fontSize: "0.88rem", lineHeight: 1.6, color: "#6b6456", marginBottom: 14 }}>
        {product.shortDescription}
      </p>
      <Link
        href={product.href}
        onClick={onClick}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "10px 16px",
          borderRadius: 999,
          textDecoration: "none",
          background: "linear-gradient(135deg, #2F4191, #2B7EC2)",
          color: "#fff",
          fontSize: "0.86rem",
          fontWeight: 600,
        }}
      >
        View Product
      </Link>
    </div>
  );
}

export default function Thanks() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [visible, setVisible] = useState(false);
  const [countDown, setCountDown] = useState(15);

  const productId = searchParams.get("product") || "";

  const recommendedProducts = useMemo(() => {
    const ids = RECOMMENDATIONS_MAP[productId] || [];
    return ids.map((id) => PRODUCT_CATALOG[id]).filter(Boolean);
  }, [productId]);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (countDown <= 0) {
      router.push("/");
      return;
    }

    const t = setTimeout(() => setCountDown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countDown, router]);

  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "thank_you_page_view",
      source_product_id: productId,
      recommended_count: recommendedProducts.length,
      recommended_ids: recommendedProducts.map((p) => p.id).join(","),
      page_url: typeof window !== "undefined" ? window.location.href : "",
    });
  }, [productId, recommendedProducts]);

  const handleRecommendationClick = (product) => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "thank_you_recommendation_click",
      source_product_id: productId,
      clicked_product_id: product.id,
      clicked_product_name: product.name,
      page_url: window.location.href,
    });
  };

  const particles = [
    { width: 6, height: 6, top: "12%", left: "8%", background: "#2F419133", animation: "floatA 6s ease-in-out infinite" },
    { width: 10, height: 10, top: "20%", right: "10%", background: "#2B7EC233", animation: "floatB 8s ease-in-out infinite" },
    { width: 5, height: 5, top: "70%", left: "5%", background: "#FF993344", animation: "floatA 7s 1s ease-in-out infinite" },
    { width: 8, height: 8, bottom: "15%", right: "7%", background: "#13880833", animation: "floatB 9s 2s ease-in-out infinite" },
  ];

  const ringProgress = ((15 - countDown) / 15) * 100;
  const circumference = 2 * Math.PI * 18;
  const offset = circumference - (ringProgress / 100) * circumference;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=DM+Sans:wght@400;500;600&display=swap');

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
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.7); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes pulseRing {
          0% { box-shadow: 0 0 0 0 rgba(47,65,145,0.25); }
          70% { box-shadow: 0 0 0 18px rgba(47,65,145,0); }
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
          transition: transform 0.2s, box-shadow 0.2s; text-decoration: none;
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

        @media (max-width: 600px) {
          .ty-cards { grid-template-columns: 1fr !important; }
          .ty-actions { flex-direction: column !important; align-items: stretch !important; }
          .ty-recommendations { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div
        className="ty-root"
        style={{
          fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
          background: "black",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          padding: "20px",
        }}
      >
        {particles.map((p, i) => <Particle key={i} style={p} />)}

        <div
          style={{
            position: "relative",
            zIndex: 1,
            background: "#fff",
            border: "1px solid rgba(0,0,0,0.07)",
            padding: "20px",
            maxWidth: 760,
            width: "100%",
            boxShadow: "0 24px 80px rgba(0,0,0,0.1)",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(32px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: 28,
              animation: visible ? "scaleIn 0.6s 0.2s both ease" : "none",
            }}
          >
            <div style={{ animation: "pulseRing 2s 1.2s ease-out", borderRadius: "50%" }}>
              <CheckmarkCircle color="#2F4191" />
            </div>
          </div>

          <h1
            style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontSize: "clamp(1.5rem, 2vw, 2.3rem)",
              fontWeight: 700,
              color: "#1a1a1a",
              textAlign: "center",
              lineHeight: 1.2,
              marginBottom: 14,
            }}
          >
            Thank You for Reaching Out!
          </h1>

          <p
            style={{
              fontSize: "0.95rem",
              color: "#6b6456",
              textAlign: "center",
              lineHeight: 1.7,
              maxWidth: 520,
              margin: "0 auto 28px",
            }}
          >
            We&apos;ve received your enquiry and our scientific solutions team will get back to you within{" "}
            <strong style={{ color: "#2F4191" }}>24 hours</strong>.
          </p>

          <div
            className="ty-cards"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 10,
              marginBottom: 28,
            }}
          >
            <InfoPill icon="📬" label="Response time" value="Within 24 hours" color="#2F4191" />
            <InfoPill icon="📞" label="Support line" value="+91 40 2784 5678" color="#2B7EC2" />
            <InfoPill icon="✉️" label="Email" value="info@beingindia.com" color="#0e7490" />
            <InfoPill icon="🏢" label="Location" value="Hyderabad, India" color="#065f46" />
          </div>

          {recommendedProducts.length > 0 && (
            <div style={{ marginTop: 24 }}>
              <h2
                style={{
                  fontSize: "1.15rem",
                  fontWeight: 700,
                  color: "#1a1a1a",
                  marginBottom: 14,
                  textAlign: "center",
                }}
              >
                You may also be interested in
              </h2>

              <div
                className="ty-recommendations"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 14,
                }}
              >
                {recommendedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onClick={() => handleRecommendationClick(product)}
                  />
                ))}
              </div>
            </div>
          )}

          <div
            className="ty-actions"
            style={{
              display: "flex",
              gap: 12,
              justifyContent: "center",
              flexWrap: "wrap",
              marginTop: 28,
            }}
          >
            <Link href="/" className="ty-btn-primary">← Back to Home</Link>
            <Link href="/products" className="ty-btn-secondary">Explore Products</Link>
          </div>

          <div
            style={{
              marginTop: 28,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
            }}
          >
            <svg width="40" height="40" viewBox="0 0 40 40" style={{ flexShrink: 0 }}>
              <circle cx="20" cy="20" r="18" stroke="#e8e4dd" strokeWidth="2.5" fill="none" />
              <circle
                cx="20"
                cy="20"
                r="18"
                stroke="#2F4191"
                strokeWidth="2.5"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                transform="rotate(-90 20 20)"
                style={{ transition: "stroke-dashoffset 1s linear" }}
              />
              <text
                x="20"
                y="25"
                textAnchor="middle"
                style={{ fontSize: "11px", fontWeight: 700, fill: "#2F4191", fontFamily: "DM Sans, sans-serif" }}
              >
                {countDown}
              </text>
            </svg>
            <p style={{ fontSize: "0.78rem", color: "#9e9488", lineHeight: 1.4 }}>
              Redirecting to homepage<br />
              in <strong style={{ color: "#2F4191" }}>{countDown}s</strong>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}