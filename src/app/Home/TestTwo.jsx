'use client';

import Image from 'next/image';
import { useState, useRef } from 'react';

const CATEGORIES = [
  'Government',
  'Academia-Government',
  'Academia-Private',
  'Dealer',
  'Private',
];

const CATEGORY_LABELS = {
  'Government':          'Government',
  'Academia-Government': 'Acad-Gov',
  'Academia-Private':    'Acad-Private',
  'Dealer':              'Dealer',
  'Private':             'Private',
};

const LOGO_BASE = '/logos/';

const CUSTOMERS = [
  { name: 'Asian Paints Limited (Mahape)',                              category: 'Private',            products: ['FT-IR Spectrometer', 'HPLC System'],              logo: `/asian-paints-logo.avif` },
  { name: 'Bangalore University',                                       category: 'Academia-Government', products: ['AFM Microscope', 'Rotary Evaporator'],            logo: `/BangloreUniversity.jpg` },
  { name: 'Aurobindo Pharma Limited - Unit 3',                          category: 'Private',            products: ['Freeze Dryer', 'UV-Vis Spectrophotometer'],        logo: `/aurobindo.webp` },
  { name: 'AVIRAL POWER SOLUTIONS PVT LTD',                            category: 'Dealer',             products: ['FT-IR Spectrometer', 'HPLC System'],              logo: `${LOGO_BASE}aviral.png` },
  { name: 'Indian Institute of Science (IISc) - Bengaluru',            category: 'Academia-Government', products: ['AFM Microscope', 'Rotary Evaporator'],            logo: `${LOGO_BASE}logo-iisc.png` },
  { name: 'Hindustan Petroleum Corporation Limited',                    category: 'Government',         products: ['Freeze Dryer', 'UV-Vis Spectrophotometer'],        logo: `${LOGO_BASE}hpcl.png` },
  { name: 'Birla Institute of Technology & Science (BITS) Pilani - Hyderabad', category: 'Academia-Private', products: ['FT-IR Spectrometer', 'HPLC System'],       logo: `${LOGO_BASE}bits.png` },
  { name: 'ICAR - Indian Veterinary Research Institute (IVRI)',         category: 'Government',         products: ['Freeze Dryer', 'UV-Vis Spectrophotometer'],        logo: `${LOGO_BASE}icar.png` },
  { name: 'INDIAN SCIENTIFIC COMPANY',                                  category: 'Dealer',             products: ['FT-IR Spectrometer', 'HPLC System'],              logo: `${LOGO_BASE}indian-scientific.png` },
  { name: 'Biocon Limited - SEZ Unit',                                  category: 'Private',            products: ['Freeze Dryer', 'UV-Vis Spectrophotometer'],        logo: `${LOGO_BASE}biocon.png` },
  { name: 'Asian Paints Limited (Mahape)',                              category: 'Private',            products: ['FT-IR Spectrometer', 'HPLC System'],              logo: `${LOGO_BASE}asian-paints-logo.avif` },
  { name: 'Bangalore University',                                       category: 'Academia-Government', products: ['AFM Microscope', 'Rotary Evaporator'],            logo: `${LOGO_BASE}BangloreUniversity.jpg` },
  { name: 'Aurobindo Pharma Limited - Unit 3',                          category: 'Private',            products: ['Freeze Dryer', 'UV-Vis Spectrophotometer'],        logo: `${LOGO_BASE}aurobindo.webp` },
  { name: 'AVIRAL POWER SOLUTIONS PVT LTD',                            category: 'Dealer',             products: ['FT-IR Spectrometer', 'HPLC System'],              logo: `${LOGO_BASE}aviral.png` },
  { name: 'Indian Institute of Science (IISc) - Bengaluru',            category: 'Academia-Government', products: ['AFM Microscope', 'Rotary Evaporator'],            logo: `${LOGO_BASE}logo-iisc.png` },
  { name: 'Hindustan Petroleum Corporation Limited',                    category: 'Government',         products: ['Freeze Dryer', 'UV-Vis Spectrophotometer'],        logo: `${LOGO_BASE}hpcl.png` },
  { name: 'Birla Institute of Technology & Science (BITS) Pilani - Hyderabad', category: 'Academia-Private', products: ['FT-IR Spectrometer', 'HPLC System'],       logo: `${LOGO_BASE}bits.png` },
  { name: 'ICAR - Indian Veterinary Research Institute (IVRI)',         category: 'Government',         products: ['Freeze Dryer', 'UV-Vis Spectrophotometer'],        logo: `${LOGO_BASE}icar.png` },
  { name: 'INDIAN SCIENTIFIC COMPANY',                                  category: 'Dealer',             products: ['FT-IR Spectrometer', 'HPLC System'],              logo: `${LOGO_BASE}indian-scientific.png` },
  { name: 'Biocon Limited - SEZ Unit',                                  category: 'Private',            products: ['Freeze Dryer', 'UV-Vis Spectrophotometer'],        logo: `${LOGO_BASE}biocon.png` },
  { name: 'Asian Paints Limited (Mahape)',                              category: 'Private',            products: ['FT-IR Spectrometer', 'HPLC System'],              logo: `${LOGO_BASE}asian-paints-logo.avif` },
  { name: 'Bangalore University',                                       category: 'Academia-Government', products: ['AFM Microscope', 'Rotary Evaporator'],            logo: `${LOGO_BASE}BangloreUniversity.jpg` },
  { name: 'Aurobindo Pharma Limited - Unit 3',                          category: 'Private',            products: ['Freeze Dryer', 'UV-Vis Spectrophotometer'],        logo: `${LOGO_BASE}aurobindo.webp` },
  { name: 'AVIRAL POWER SOLUTIONS PVT LTD',                            category: 'Dealer',             products: ['FT-IR Spectrometer', 'HPLC System'],              logo: `${LOGO_BASE}aviral.png` },
  { name: 'Indian Institute of Science (IISc) - Bengaluru',            category: 'Academia-Government', products: ['AFM Microscope', 'Rotary Evaporator'],            logo: `${LOGO_BASE}logo-iisc.png` },
  { name: 'Hindustan Petroleum Corporation Limited',                    category: 'Government',         products: ['Freeze Dryer', 'UV-Vis Spectrophotometer'],        logo: `${LOGO_BASE}hpcl.png` },
  { name: 'Birla Institute of Technology & Science (BITS) Pilani - Hyderabad', category: 'Academia-Private', products: ['FT-IR Spectrometer', 'HPLC System'],       logo: `${LOGO_BASE}bits.png` },
  { name: 'ICAR - Indian Veterinary Research Institute (IVRI)',         category: 'Government',         products: ['Freeze Dryer', 'UV-Vis Spectrophotometer'],        logo: `${LOGO_BASE}icar.png` },
  { name: 'INDIAN SCIENTIFIC COMPANY',                                  category: 'Dealer',             products: ['FT-IR Spectrometer', 'HPLC System'],              logo: `${LOGO_BASE}indian-scientific.png` },
  { name: 'Biocon Limited - SEZ Unit',                                  category: 'Private',            products: ['Freeze Dryer', 'UV-Vis Spectrophotometer'],        logo: `${LOGO_BASE}biocon.png` },
];

const CATEGORY_COLORS = {
  'Government':          { pill: 'bg-blue-50 text-blue-700 border-blue-200',             dot: 'bg-blue-500' },
  'Academia-Government': { pill: 'bg-violet-50 text-violet-700 border-violet-200',       dot: 'bg-violet-500' },
  'Academia-Private':    { pill: 'bg-emerald-50 text-emerald-700 border-emerald-200',    dot: 'bg-emerald-500' },
  'Dealer':              { pill: 'bg-amber-50 text-amber-700 border-amber-200',          dot: 'bg-amber-500' },
  'Private':             { pill: 'bg-rose-50 text-rose-700 border-rose-200',             dot: 'bg-rose-500' },
};

function padRow(row) {
  if (row.length < 8) {
    const times = Math.ceil(8 / row.length);
    return Array(times).fill(row).flat();
  }
  return row;
}

function CustomerCard({ customer, rowIndex, cardIndex }) {
  const [hovered, setHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const timerRef = useRef(null);

  const handleMouseEnter = () => {
    setHovered(true);
    timerRef.current = setTimeout(() => setShowTooltip(true), 350);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setShowTooltip(false);
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  return (
    <div
      className="relative flex-shrink-0 mx-3"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Logo card */}
      <div
        style={{
          width: '160px',
          height: '80px',
          borderRadius: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 16px',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          border: hovered ? '1px solid rgba(43,126,194,0.4)' : '1px solid #f0f0f0',
          background: 'white',
          boxShadow: hovered
            ? '0 20px 40px rgba(47,65,145,0.12), 0 4px 12px rgba(47,65,145,0.08)'
            : '0 1px 4px rgba(0,0,0,0.06)',
          transform: hovered ? 'translateY(-4px) scale(1.05)' : 'translateY(0) scale(1)',
          zIndex:1000,
        }}
      >
        <Image
          src={customer.logo}
          alt={customer.name}
          width={120}
          height={48}
          className="object-contain max-h-12 w-auto mx-auto select-none"
          draggable={false}
        />

        {/* Glow ring */}
        {hovered && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '16px',
              boxShadow: '0 0 0 2px rgba(43,126,194,0.3)',
              pointerEvents: 'none',
            }}
          />
        )}
      </div>

      {/* Tooltip — appears after 350ms */}
      <div
        style={{
          position: 'absolute',
          bottom: 'calc(100% + 14px)',
          left: '50%',
          transform: `translateX(-50%) translateY(${showTooltip ? '0px' : '8px'})`,
          opacity: showTooltip ? 1 : 0,
          transition: 'opacity 0.22s ease, transform 0.22s ease',
          width: '260px',
          borderRadius: '16px',
          background: 'linear-gradient(135deg, #0f1e4a 0%, #192f6a 100%)',
          boxShadow: '0 24px 48px rgba(15,30,74,0.35)',
          zIndex: 50,
          pointerEvents: 'none',
          overflow: 'hidden',
        }}
      >
        {/* Decorative glow inside tooltip */}
        <div
          style={{
            position: 'absolute',
            top: '-24px',
            right: '-24px',
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(43,126,194,0.4), transparent)',
            pointerEvents: 'none',
          }}
        />

        {/* Arrow */}
        <div
          style={{
            position: 'absolute',
            bottom: '-6px',
            left: '50%',
            transform: 'translateX(-50%) rotate(45deg)',
            width: '12px',
            height: '12px',
            background: '#192f6a',
          }}
        />

        <div style={{ padding: '16px', position: 'relative' }}>
          <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#5BA3D9', marginBottom: '4px' }}>
            Products Purchased
          </p>
          <p style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.95)', marginBottom: '10px', lineHeight: '1.4' }}>
            {customer.name}
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {customer.products.map((p, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: 'rgba(255,255,255,0.7)', marginBottom: '6px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#2B7EC2', flexShrink: 0 }} />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function MarqueeRow({ customers, direction, speed, rowIndex }) {
  const [paused, setPaused] = useState(false);
  const doubled = [...customers, ...customers];
  const animName = direction === 'left' ? 'marquee-left' : 'marquee-right';

  return (
    <div
      style={{ position: 'relative', overflow: 'hidden', width: '100%' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Left fade */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: '112px', zIndex: 10, pointerEvents: 'none',
        background: 'linear-gradient(to right, white 40%, transparent)',
      }} />
      {/* Right fade */}
      <div style={{
        position: 'absolute', right: 0, top: 0, bottom: 0, width: '112px', zIndex: 10, pointerEvents: 'none',
        background: 'linear-gradient(to left, white 40%, transparent)',
      }} />

      <div
        style={{
          display: 'flex',
          padding: '12px 0',
          animation: `${animName} ${speed}s linear infinite`,
          animationPlayState: paused ? 'paused' : 'running',
          willChange: 'transform',
        }}
      >
        {doubled.map((cust, i) => (
          <CustomerCard
            key={`r${rowIndex}-${i}-${cust.name}`}
            customer={cust}
            rowIndex={rowIndex}
            cardIndex={i}
          />
        ))}
      </div>
    </div>
  );
}

export default function TestTwo() {
  const [activeCategory, setActiveCategory] = useState(null);

  const filtered = activeCategory
    ? CUSTOMERS.filter((c) => c.category === activeCategory)
    : CUSTOMERS;

  const uniqueCount = [...new Set(filtered.map((c) => c.name))].length;

  const chunkSize = Math.ceil(filtered.length / 3);
  const rawRows = [
    filtered.slice(0, chunkSize),
    filtered.slice(chunkSize, chunkSize * 2),
    filtered.slice(chunkSize * 2),
  ].filter((r) => r.length > 0);

  return (
    <>
      <style>{`
        @keyframes marquee-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.4; }
        }
      `}</style>

      <section style={{ position: 'relative', width: '100%', background: 'white', paddingTop: '64px', paddingBottom: '64px', overflow: 'hidden' }}>

        {/* Dot-grid background */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(circle, #c7d2e8 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          opacity: 0.4,
        }} />

        {/* Top accent line */}
        <div style={{
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          height: '1px', width: '192px',
          background: 'linear-gradient(to right, transparent, #2B7EC2, transparent)',
        }} />

        {/* HEADER */}
        <div style={{ position: 'relative', textAlign: 'center', padding: '0 24px', marginBottom: '40px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '8px 20px', borderRadius: '999px',
            border: '1px solid rgba(47,65,145,0.2)', background: 'rgba(47,65,145,0.05)',
            marginBottom: '20px',
          }}>
            <span style={{
              width: '8px', height: '8px', borderRadius: '50%', background: '#2B7EC2',
              animation: 'pulse-dot 2s ease-in-out infinite',
            }} />
            <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#2F4191' }}>
              Our Customers
            </span>
          </div>

          <h2 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 700, color: '#0f1e4a', letterSpacing: '-0.02em', margin: '0 0 12px' }}>
            Trusted Across Every Sector
          </h2>
          <p style={{ color: '#6b7280', fontSize: '16px', maxWidth: '1080px', margin: '0 auto', lineHeight: 1.6 }}>
            From government labs to leading private enterprises — our partnerships span academia, industry, and beyond.
          </p>
        </div>

        {/* CATEGORY FILTER PILLS */}
        <div style={{ position: 'relative', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px', padding: '0 24px', marginBottom: '40px' }}>
          {/* All */}
          <button
            onClick={() => setActiveCategory(null)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              padding: '8px 16px', borderRadius: '999px', fontSize: '12px', fontWeight: 600,
              border: activeCategory === null ? '1px solid #0f1e4a' : '1px solid #e5e7eb',
              background: activeCategory === null ? '#0f1e4a' : 'white',
              color: activeCategory === null ? 'white' : '#6b7280',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              transform: activeCategory === null ? 'scale(1.05)' : 'scale(1)',
              boxShadow: activeCategory === null ? '0 4px 12px rgba(15,30,74,0.25)' : 'none',
            }}
          >
            All Customers
          </button>

          {CATEGORIES.map((cat) => {
            const color = CATEGORY_COLORS[cat];
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(isActive ? null : cat)}
                className={isActive ? color.pill : ''}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  padding: '8px 16px', borderRadius: '999px', fontSize: '12px', fontWeight: 600,
                  border: isActive ? '1px solid currentColor' : '1px solid #e5e7eb',
                  background: isActive ? undefined : 'white',
                  color: isActive ? undefined : '#6b7280',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  transform: isActive ? 'scale(1.05)' : 'scale(1)',
                  boxShadow: isActive ? '0 2px 8px rgba(0,0,0,0.1)' : 'none',
                }}
              >
                <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${color.dot}`} />
                {CATEGORY_LABELS[cat] ?? cat}
              </button>
            );
          })}
        </div>

        {/* MARQUEE ROWS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {rawRows.map((row, rowIdx) => (
            <MarqueeRow
              key={`${activeCategory ?? 'all'}-row-${rowIdx}`}
              customers={padRow(row)}
              direction={rowIdx % 2 === 0 ? 'left' : 'right'}
              speed={28 + rowIdx * 10}
              rowIndex={rowIdx}
            />
          ))}
        </div>

        {/* Bottom count */}
        {/* <div style={{ position: 'relative', textAlign: 'center', marginTop: '40px' }}>
          <span style={{ fontSize: '12px', color: '#9ca3af', letterSpacing: '0.03em' }}>
            Showing{' '}
            <span style={{ fontWeight: 600, color: '#2F4191' }}>{uniqueCount}</span>
            {' '}unique customers
            {activeCategory ? ` · ${activeCategory}` : ' across all categories'}
          </span>
        </div> */}

        {/* Bottom accent line */}
        <div style={{
          position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
          height: '1px', width: '192px',
          background: 'linear-gradient(to right, transparent, #2B7EC2, transparent)',
        }} />
      </section>
    </>
  );
}