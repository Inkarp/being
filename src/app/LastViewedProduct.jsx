'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaArrowRight, FaPhoneAlt } from 'react-icons/fa';

export default function LastViewedProduct() {
  const [product, setProduct] = useState(null);
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('lastProduct'));
    if (stored) setProduct(stored);

    const hasShown = sessionStorage.getItem('lastViewedShown');
    if (!hasShown && stored) {
      setShow(true);
      sessionStorage.setItem('lastViewedShown', 'true');
      setTimeout(() => setShow(false), 7000);
    }
  }, []);

  if (!product || !show || dismissed) return null;

  return (
    <>
      <style>{`
        @keyframes lvp-slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes lvp-pulse {
          0%,100% { opacity: 1; transform: scale(1); }
          50%      { opacity: 0.5; transform: scale(0.7); }
        }
        @keyframes lvp-shrink {
          from { width: 100%; }
          to   { width: 0%; }
        }

        .lvp-card {
          animation: lvp-slide-up 0.4s cubic-bezier(0.22, 1, 0.36, 1) both;
          background: white;
          border-radius: 16px;
          border: 0.5px solid rgba(0,0,0,0.1);
          box-shadow: 0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06);
          overflow: hidden;
          width: 300px;
        }

        .lvp-accent-bar {
          height: 3px;
          background: linear-gradient(90deg, #2F4191 0%, #2B7EC2 50%, #BE0010 100%);
        }

        .lvp-body { padding: 14px 14px 12px; }

        .lvp-eyebrow {
          display: flex; align-items: center; gap: 6px; margin-bottom: 10px;
        }

        .lvp-dot {
          width: 6px; height: 6px; border-radius: 50%; background: #2B7EC2;
          flex-shrink: 0; animation: lvp-pulse 2s ease-in-out infinite;
        }

        .lvp-eyebrow-label {
          font-size: 11px; font-weight: 600; letter-spacing: 0.06em;
          text-transform: uppercase; color: #888; flex: 1;
        }

        .lvp-dismiss {
          background: none; border: none; cursor: pointer;
          color: #bbb; font-size: 16px; line-height: 1; padding: 0;
          transition: color 0.15s;
        }
        .lvp-dismiss:hover { color: #555; }

        .lvp-name {
          font-size: 13.5px; font-weight: 600; color: #1a1a1a;
          line-height: 1.45; margin: 0 0 10px;
          display: -webkit-box; -webkit-line-clamp: 2;
          -webkit-box-orient: vertical; overflow: hidden;
        }

        .lvp-meta { display: flex; align-items: center; gap: 6px; margin-bottom: 12px; }

        .lvp-badge {
          font-size: 10.5px; font-weight: 600; padding: 2.5px 7px;
          border-radius: 5px; background: #EEF4FF; color: #2F4191;
        }
        .lvp-badge-alt { background: #FFF5F5; color: #BE0010; }

        .lvp-cat { font-size: 11px; color: #aaa; }

        .lvp-divider { height: 0.5px; background: #f0f0f0; margin: 0 0 12px; }

        .lvp-view-btn {
          display: flex; align-items: center; justify-content: space-between;
          width: 100%; padding: 10px 14px; box-sizing: border-box;
          background: #2F4191; color: white;
          border: none; border-radius: 10px;
          font-size: 12.5px; font-weight: 600; cursor: pointer;
          margin-bottom: 7px; text-decoration: none;
          transition: opacity 0.15s, transform 0.1s;
        }
        .lvp-view-btn:hover { opacity: 0.9; transform: translateY(-1px); }
        .lvp-view-btn:active { transform: scale(0.99); }

        .lvp-view-icon {
          width: 20px; height: 20px; border-radius: 50%;
          background: rgba(255,255,255,0.2);
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }

        .lvp-row { display: flex; gap: 7px; }

        .lvp-quote-btn {
          flex: 1; padding: 9px 10px;
          background: #FFF5F5; color: #BE0010;
          border: 0.5px solid rgba(190,0,16,0.15);
          border-radius: 10px; font-size: 11.5px; font-weight: 600;
          cursor: pointer; transition: all 0.15s;
        }
        .lvp-quote-btn:hover { background: #FFEBEB; }

        .lvp-talk-btn {
          display: flex; align-items: center; gap: 5px;
          padding: 9px 10px;
          background: #f5f5f5; color: #555;
          border: 0.5px solid #e8e8e8;
          border-radius: 10px; font-size: 11.5px; font-weight: 600;
          cursor: pointer; text-decoration: none; transition: all 0.15s;
        }
        .lvp-talk-btn:hover { background: #eee; color: #222; }

        .lvp-timer {
          height: 2px; background: #f0f0f0; overflow: hidden;
        }
        .lvp-timer-fill {
          height: 100%; background: #2B7EC2;
          animation: lvp-shrink 7s linear forwards;
        }
      `}</style>

      <div className="fixed bottom-6 left-6 z-50">
        <div className="lvp-card">
          <div className="lvp-accent-bar" />

          <div className="lvp-body">
            {/* Eyebrow */}
            <div className="lvp-eyebrow">
              <div className="lvp-dot" />
              <span className="lvp-eyebrow-label">Continue where you left off</span>
              <button
                className="lvp-dismiss"
                onClick={() => setDismissed(true)}
                aria-label="Dismiss"
              >
                ×
              </button>
            </div>

            {/* Product name */}
            <p className="lvp-name">{product.name}</p>

            {/* Meta */}
            <div className="lvp-meta">
              <span className="lvp-badge">In Stock</span>
              {product.quoteOnly && <span className="lvp-badge lvp-badge-alt">Quote Only</span>}
              {product.category && <span className="lvp-cat">{product.category}</span>}
            </div>

            <div className="lvp-divider" />

            {/* Primary CTA */}
            <Link href={product.url} className="lvp-view-btn">
              <span>View product</span>
              <span className="lvp-view-icon">
                <FaArrowRight size={9} />
              </span>
            </Link>

            {/* Secondary CTAs */}
            <div className="lvp-row">
              <button className="lvp-quote-btn">Request quote</button>
              <a href="tel:+919999999999" className="lvp-talk-btn">
                <FaPhoneAlt size={10} />
                Talk to expert
              </a>
            </div>
          </div>

          {/* Auto-dismiss countdown */}
          <div className="lvp-timer">
            <div className="lvp-timer-fill" />
          </div>
        </div>
      </div>
    </>
  );
}