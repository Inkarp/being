"use client";

import Image from "next/image";
import Link from "next/link";

const links = [
  { image: "/Amc.svg",      title: "Buy AMC",         href: "/amc",        color: "#2B7EC2" },
  { image: "/Amc.svg",      title: "Warranty Claim",  href: "/promotions",  color: "#2F4191" },
  { image: "/offers.webp",  title: "Offers",     href: "/offers",      color: "#2B7EC2" },
  { image: "/Amc.svg",      title: "Service", href: "/products",    color: "#2F4191" },
];

export default function QuickLinks() {
  return (
    <>
      <style>{`
        @keyframes fadeUpLink {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .ql-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          text-decoration: none;
          flex: 1;
          min-width: 80px;
          animation: fadeUpLink 0.4s ease both;
        }

        .ql-icon-ring {
          position: relative;
          width: 68px; height: 68px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1),
                      box-shadow 0.3s ease;
          background: #fff;
          border: 1.5px solid rgba(47,65,145,0.10);
          box-shadow: 0 4px 16px rgba(43,126,194,0.10);
        }

        .ql-item:hover .ql-icon-ring {
          transform: translateY(-5px) scale(1.08);
          box-shadow: 0 12px 32px rgba(43,126,194,0.22);
        }

        /* Colored glow ring on hover */
        .ql-icon-ring::after {
          content: '';
          position: absolute; inset: -4px;
          border-radius: 50%;
          border: 2px solid transparent;
          transition: border-color 0.25s, opacity 0.25s;
          opacity: 0;
        }
        .ql-item:hover .ql-icon-ring::after {
          border-color: var(--accent);
          opacity: 1;
        }

        .ql-label {
          font-size: 12px;
          font-weight: 700;
          color: #374151;
          text-align: center;
          letter-spacing: 0.02em;
          line-height: 1.3;
          transition: color 0.2s;
        }
        .ql-item:hover .ql-label {
          color: var(--accent);
        }

        /* Divider between items */
        .ql-divider {
          width: 1px;
          height: 40px;
          background: linear-gradient(to bottom, transparent, rgba(47,65,145,0.12), transparent);
          flex-shrink: 0;
          align-self: center;
        }

        @media (max-width: 480px) {
          .ql-divider { display: none; }
          .ql-icon-ring { width: 56px; height: 56px; }
          .ql-label { font-size: 11px; }
        }
      `}</style>

      <section style={{
        width: '100%',
        background: 'linear-gradient(to right, #f8faff, #eef4fd, #f8faff)',
        borderBottom: '1px solid rgba(47,65,145,0.08)',
      }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '20px 24px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 0,
          }}>
            {links.map((item, i) => (
              <>
                <Link
                  key={item.title}
                  href={item.href}
                  className="ql-item"
                  style={{ '--accent': item.color, animationDelay: `${i * 0.08}s` }}
                >
                  <div className="ql-icon-ring">
                    <Image
                      src={item.image}
                      alt={item.title}
                      unoptimized
                      width={34}
                      height={34}
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                  <span className="ql-label">{item.title}</span>
                </Link>

                {/* Divider between items, not after last */}
                {i < links.length - 1 && (
                  <div key={`div-${i}`} className="ql-divider" />
                )}
              </>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}