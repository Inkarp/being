'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

// ─── Icons (zero extra deps) ──────────────────────────────────────────────────

const IconClose = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const IconCheck = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const IconClock = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
  </svg>
);

const IconInfo = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

// ─── Main Component ───────────────────────────────────────────────────────────

export default function PricePopup({ isOpen, onClose, product, price }) {
  const [visible, setVisible] = useState(false);
  const overlayRef = useRef(null);

  /* Animate in */
  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => setVisible(true));
      document.body.style.overflow = 'hidden';
    } else {
      setVisible(false);
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  /* Escape key */
  useEffect(() => {
    if (!isOpen) return;
    const fn = (e) => { if (e.key === 'Escape') handleClose(); };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [isOpen]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 280);
  };

  if (!isOpen) return null;

  /* Format price safely */
  const formattedPrice = (() => {
    const raw = product?.price ?? price;
    if (raw == null) return null;
    const num = Number(String(raw).replace(/[^0-9.]/g, ''));
    return isNaN(num) ? String(raw) : num.toLocaleString('en-IN');
  })();

  return (
    <>
      <style>{styles}</style>

      {/* Overlay */}
      <div
        ref={overlayRef}
        className={`pp-overlay ${visible ? 'pp-overlay--in' : ''}`}
        onClick={(e) => { if (e.target === overlayRef.current) handleClose(); }}
        role="dialog"
        aria-modal="true"
        aria-label="Price Unlocked"
      >
        {/* Card */}
        <div className={`pp-card ${visible ? 'pp-card--in' : ''}`}>

          {/* Accent bar */}
          <div className="pp-accent-bar" />

          {/* Close button */}
          <button onClick={handleClose} className="pp-close" aria-label="Close">
            <IconClose />
          </button>

          {/* ── SUCCESS HEADER ── */}
          <div className="pp-header">
            <div className="pp-check-ring">
              <IconCheck />
            </div>
            <p className="pp-header-title">Price Unlocked</p>
            <p className="pp-header-sub">Thank you for your enquiry</p>
          </div>

          <div className="pp-divider" />

          {/* ── BODY ── */}
          <div className="pp-body">

            {/* Product image */}
            {product?.thumbnail && (
              <div className="pp-img-wrap">
                <Image
                  src={product.thumbnail}
                  alt={product?.title || product?.model || 'Product'}
                  width={180}
                  height={180}
                  style={{ objectFit: 'contain', maxWidth: '100%', maxHeight: '100%' }}
                />
              </div>
            )}

            {/* Product name */}
            {(product?.title || product?.model) && (
              <p className="pp-product-name">
                {product.title || product.model}
              </p>
            )}

            {/* Price block */}
            {formattedPrice && (
              <div className="pp-price-block">
                <span className="pp-price-label">Indicative Price</span>
                <div className="pp-price-value">
                  <span className="pp-price-symbol">₹</span>
                  <span className="pp-price-number">{formattedPrice}</span>
                </div>
              </div>
            )}

            {/* Disclaimer */}
            <div className="pp-disclaimer">
              <IconInfo />
              <span>Price is indicative. Taxes &amp; freight extra as applicable.</span>
            </div>

            {/* CTA */}
            <button onClick={handleClose} className="pp-cta">
              <IconClock />
              We'll get back to you shortly
            </button>

            {/* Trust note */}
            <p className="pp-trust">Our team will reach you within 1–2 business days</p>

          </div>
        </div>
      </div>
    </>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=DM+Serif+Display&display=swap');

  .pp-overlay {
    position: fixed; inset: 0; z-index: 1100;
    background: rgba(15,23,42,0.55);
    backdrop-filter: blur(6px);
    display: flex; align-items: center; justify-content: center; padding: 16px;
    opacity: 0; transition: opacity 0.22s cubic-bezier(0.4,0,0.2,1);
  }
  .pp-overlay--in { opacity: 1; }

  .pp-card {
    background: #fff; border-radius: 18px;
    box-shadow: 0 24px 64px rgba(15,23,42,0.14), 0 4px 16px rgba(15,23,42,0.06);
    max-width: 400px; width: 100%;
    position: relative; overflow: hidden;
    font-family: 'DM Sans', sans-serif;
    transform: translateY(20px) scale(0.97); opacity: 0;
    transition: transform 0.32s cubic-bezier(0.34,1.56,0.64,1), opacity 0.28s ease;
  }
  .pp-card--in { transform: translateY(0) scale(1); opacity: 1; }

  .pp-accent-bar {
    position: absolute; top: 0; left: 0; right: 0; height: 3px;
    background: linear-gradient(90deg, #1E3A8A, #3B82F6);
    border-radius: 18px 18px 0 0;
  }

  /* Close */
  .pp-close {
    position: absolute; top: 14px; right: 14px;
    background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px;
    width: 34px; height: 34px; display: flex; align-items: center; justify-content: center;
    color: #64748B; cursor: pointer;
    transition: background 0.18s, color 0.18s, border-color 0.18s;
    z-index: 1;
  }
  .pp-close:hover { background: #FEE2E2; color: #DC2626; border-color: #FECACA; }

  /* Header */
  .pp-header {
    display: flex; flex-direction: column; align-items: center;
    padding: 40px 28px 24px; text-align: center; gap: 8px;
  }
  .pp-check-ring {
    width: 64px; height: 64px; border-radius: 50%;
    background: #ECFDF5; border: 2px solid #6EE7B7;
    color: #059669;
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 4px;
    animation: pp-pop 0.4s cubic-bezier(0.34,1.56,0.64,1) 0.2s both;
  }
  @keyframes pp-pop {
    from { transform: scale(0.5); opacity: 0; }
    to   { transform: scale(1);   opacity: 1; }
  }
  .pp-header-title {
    font-family: 'DM Serif Display', serif; font-size: 22px; font-weight: 400;
    color: #0F172A; margin: 0; line-height: 1.2;
  }
  .pp-header-sub { font-size: 14px; color: #64748B; margin: 0; }

  /* Divider */
  .pp-divider { height: 1px; background: #E2E8F0; margin: 0 24px; }

  /* Body */
  .pp-body {
    padding: 24px 24px 28px;
    display: flex; flex-direction: column; align-items: center; gap: 16px;
  }

  /* Product image */
  .pp-img-wrap {
    width: 100%; background: #F8FAFC; border: 1px solid #E2E8F0;
    border-radius: 12px; padding: 16px;
    display: flex; align-items: center; justify-content: center;
    min-height: 160px; box-sizing: border-box;
  }

  /* Product name */
  .pp-product-name {
    font-size: 15px; font-weight: 600; color: #1E293B;
    text-align: center; margin: 0; line-height: 1.4;
  }

  /* Price block */
  .pp-price-block {
    background: #EFF6FF; border: 1px solid #BFDBFE;
    border-radius: 12px; padding: 14px 24px;
    display: flex; flex-direction: column; align-items: center; gap: 4px;
    width: 100%; box-sizing: border-box;
  }
  .pp-price-label {
    font-size: 11px; font-weight: 700; letter-spacing: 0.08em;
    text-transform: uppercase; color: #2563EB;
  }
  .pp-price-value { display: flex; align-items: baseline; gap: 4px; }
  .pp-price-symbol { font-size: 22px; font-weight: 600; color: #1E3A8A; }
  .pp-price-number {
    font-size: 38px; font-weight: 700; color: #1E3A8A; line-height: 1;
    font-variant-numeric: tabular-nums;
  }

  /* Disclaimer */
  .pp-disclaimer {
    display: flex; align-items: flex-start; gap: 6px;
    color: #94A3B8; font-size: 12px; line-height: 1.5; text-align: left;
    width: 100%;
  }
  .pp-disclaimer svg { flex-shrink: 0; margin-top: 1px; }

  /* CTA */
  .pp-cta {
    display: flex; align-items: center; justify-content: center; gap: 8px;
    width: 100%; padding: 13px 24px;
    background: linear-gradient(135deg, #1E3A8A, #2563EB);
    color: #fff; border: none; border-radius: 10px;
    font-family: 'DM Sans', sans-serif; font-size: 14.5px; font-weight: 600;
    cursor: pointer; letter-spacing: 0.01em;
    box-shadow: 0 4px 16px rgba(37,99,235,0.28);
    transition: transform 0.18s, box-shadow 0.18s;
  }
  .pp-cta:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 24px rgba(37,99,235,0.38);
  }
  .pp-cta:active { transform: translateY(0); }

  /* Trust note */
  .pp-trust {
    font-size: 12px; color: #94A3B8; text-align: center; margin: 0;
  }
`;