'use client';

import Image from 'next/image';
import { Fragment, useState } from 'react';

const CUSTOMER_LOGOS = {
    'Academic': ['/assets/customers/academic/one.webp'],
    'Academia-Government': [
        '/assets/customers/academic-government/one.webp',
        '/assets/customers/academic-government/two.webp',
        '/assets/customers/academic-government/three.webp',
        '/assets/customers/academic-government/four.webp',
        '/assets/customers/academic-government/five.webp',
        '/assets/customers/academic-government/six.webp',
        '/assets/customers/academic-government/seven.webp',
        '/assets/customers/academic-government/eight.webp',
        '/assets/customers/academic-government/nine.webp',
        '/assets/customers/academic-government/ten.webp',
        '/assets/customers/academic-government/eleven.webp',
        '/assets/customers/academic-government/twelve.webp',
        '/assets/customers/academic-government/thirteen.webp',
        '/assets/customers/academic-government/fourteen.webp',
    ],
    'Academia-Private': [
        '/assets/customers/academic-private/one.webp',
        '/assets/customers/academic-private/two.webp',
        '/assets/customers/academic-private/three.webp',
        '/assets/customers/academic-private/four.webp',
        '/assets/customers/academic-private/five.webp',
        '/assets/customers/academic-private/six.webp',
        '/assets/customers/academic-private/seven.webp',
    ],
    Dealer: [
        '/assets/customers/dealer/one.webp',
        '/assets/customers/dealer/two.webp',
        '/assets/customers/dealer/three.webp',
        '/assets/customers/dealer/four.webp',
        '/assets/customers/dealer/five.webp',
        '/assets/customers/dealer/six.webp',
        '/assets/customers/dealer/seven.webp',
        '/assets/customers/dealer/eight.webp',
    ],
    Government: [
        '/assets/customers/government/one.webp',
        '/assets/customers/government/two.webp',
        '/assets/customers/government/three.webp',
        '/assets/customers/government/four.webp',
        '/assets/customers/government/five.webp',
        '/assets/customers/government/six.webp',
    ],
    Private: [
        '/assets/customers/private/eight.webp',
        '/assets/customers/private/eighteen.webp',
        '/assets/customers/private/eleven.webp',
        '/assets/customers/private/five.webp',
        '/assets/customers/private/four.webp',
        '/assets/customers/private/fourteen.webp',
        '/assets/customers/private/fourty.webp',
        '/assets/customers/private/fourtyone.webp',
        '/assets/customers/private/nine.webp',
        '/assets/customers/private/ninteen.webp',
        '/assets/customers/private/one.webp',
        '/assets/customers/private/seven.webp',
        '/assets/customers/private/seventeen.webp',
        '/assets/customers/private/six.webp',
        '/assets/customers/private/sixteen.webp',
        '/assets/customers/private/ten.webp',
        '/assets/customers/private/thirteen.webp',
        '/assets/customers/private/thirty.webp',
        '/assets/customers/private/thirtyeight.webp',
        '/assets/customers/private/thirtyfive.webp',
        '/assets/customers/private/thirtyfour.webp',
        '/assets/customers/private/thirtynine.webp',
        '/assets/customers/private/thirtyone.webp',
        '/assets/customers/private/thirtyseven.webp',
        '/assets/customers/private/thirtysix.webp',
        '/assets/customers/private/thirtythree.webp',
        '/assets/customers/private/thirtytwo.webp',
        '/assets/customers/private/three.webp',
        '/assets/customers/private/twelve.webp',
        '/assets/customers/private/twenty.webp',
        '/assets/customers/private/twentyeight.webp',
        '/assets/customers/private/twentyfive.png',
        '/assets/customers/private/twentyfour.png',
        '/assets/customers/private/twentynine.webp',
        '/assets/customers/private/twentyone.webp',
        '/assets/customers/private/twentyseven.webp',
        '/assets/customers/private/twentysix.webp',
        '/assets/customers/private/twentythree.png',
        '/assets/customers/private/twentytwo.webp',
        '/assets/customers/private/two.webp',
    ],
};

const CATEGORIES = [
    'Government',
    'Academia-Government',
    'Academia-Private',
    'Academic',
    'Dealer',
    'Private',
];

const CATEGORY_LABELS = {
    Government: 'Government',
    'Academia-Government': 'Acad-Gov',
    'Academia-Private': 'Acad-Private',
    Academic: 'Academic',
    Dealer: 'Dealer',
    Private: 'Private',
};

const CATEGORY_COLORS = {
    Government: { pill: 'bg-blue-50 text-blue-700 border-blue-200', dot: 'bg-blue-500' },
    'Academia-Government': { pill: 'bg-violet-50 text-violet-700 border-violet-200', dot: 'bg-violet-500' },
    'Academia-Private': { pill: 'bg-emerald-50 text-emerald-700 border-emerald-200', dot: 'bg-emerald-500' },
    Academic: { pill: 'bg-cyan-50 text-cyan-700 border-cyan-200', dot: 'bg-cyan-500' },
    Dealer: { pill: 'bg-amber-50 text-amber-700 border-amber-200', dot: 'bg-amber-500' },
    Private: { pill: 'bg-rose-50 text-rose-700 border-rose-200', dot: 'bg-rose-500' },
};

const CUSTOMERS = Object.entries(CUSTOMER_LOGOS).flatMap(([category, logos]) =>
    logos.map((logo, index) => ({
        id: `${category}-${index}`,
        category,
        logo,
        name: `${CATEGORY_LABELS[category] ?? category} customer logo ${index + 1}`,
    }))
);

function padRow(row) {
    if (row.length >= 8) return row;

    const times = Math.ceil(8 / row.length);
    return Array(times).fill(row).flat();
}

function CustomerCard({ customer }) {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            className="relative mx-3 flex-shrink-0"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
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
                }}
            >
                <Image
                    src={customer.logo}
                    alt={customer.name}
                    width={120}
                    height={48}
                    className="mx-auto max-h-12 w-auto select-none object-contain"
                    draggable={false}
                />

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
            <div
                style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: '112px',
                    zIndex: 10,
                    pointerEvents: 'none',
                    background: 'linear-gradient(to right, white 40%, transparent)',
                }}
            />
            <div
                style={{
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    bottom: 0,
                    width: '112px',
                    zIndex: 10,
                    pointerEvents: 'none',
                    background: 'linear-gradient(to left, white 40%, transparent)',
                }}
            />

            <div
                style={{
                    display: 'flex',
                    padding: '12px 0',
                    animation: `${animName} ${speed}s linear infinite`,
                    animationPlayState: paused ? 'paused' : 'running',
                    willChange: 'transform',
                }}
            >
                {doubled.map((customer, index) => (
                    <CustomerCard key={`row-${rowIndex}-${index}-${customer.id}`} customer={customer} />
                ))}
            </div>
        </div>
    );
}

export default function Customers() {
    const [activeCategory, setActiveCategory] = useState(null);

    const filtered = activeCategory
        ? CUSTOMERS.filter((customer) => customer.category === activeCategory)
        : CUSTOMERS;

    const chunkSize = Math.ceil(filtered.length / 3);
    const rawRows = [
        filtered.slice(0, chunkSize),
        filtered.slice(chunkSize, chunkSize * 2),
        filtered.slice(chunkSize * 2),
    ].filter((row) => row.length > 0);

    return (
        <>
            <style>{`
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>

            <section style={{ position: 'relative', width: '100%', background: 'white', paddingTop: '64px', paddingBottom: '64px', overflow: 'hidden' }}>
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        pointerEvents: 'none',
                        backgroundImage: 'radial-gradient(circle, #c7d2e8 1px, transparent 1px)',
                        backgroundSize: '28px 28px',
                        opacity: 0.4,
                    }}
                />

                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        height: '1px',
                        width: '192px',
                        background: 'linear-gradient(to right, transparent, #2B7EC2, transparent)',
                    }}
                />

                <div style={{ position: 'relative', textAlign: 'center', padding: '0 24px', marginBottom: '40px' }}>
                    <div
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '8px 20px',
                            borderRadius: '999px',
                            border: '1px solid rgba(47,65,145,0.2)',
                            background: 'rgba(47,65,145,0.05)',
                        }}
                    >
                        <span
                            style={{
                                width: '8px',
                                height: '8px',
                                borderRadius: '50%',
                                background: '#2B7EC2',
                                animation: 'pulse-dot 2s ease-in-out infinite',
                            }}
                        />
                        <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#2F4191' }}>
                            Our Customers
                        </span>
                    </div>

                    <h2 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 700, color: '#0f1e4a', letterSpacing: '-0.02em', margin: '0 0 12px' }}>
                        Trusted Across Every Sector
                    </h2>
                    <p style={{ color: '#6b7280', fontSize: '16px', maxWidth: '1080px', margin: '0 auto', lineHeight: 1.6 }}>
                        From government labs to leading private enterprises, our partnerships span academia, industry, and beyond.
                    </p>
                </div>

                <div style={{ position: 'relative', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px', padding: '0 24px', marginBottom: '40px' }}>
                    <button
                        onClick={() => setActiveCategory(null)}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '8px 16px',
                            borderRadius: '999px',
                            fontSize: '12px',
                            fontWeight: 600,
                            border: activeCategory === null ? '1px solid #0f1e4a' : '1px solid #e5e7eb',
                            background: activeCategory === null ? '#0f1e4a' : 'white',
                            color: activeCategory === null ? 'white' : '#6b7280',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            transform: activeCategory === null ? 'scale(1.05)' : 'scale(1)',
                            boxShadow: activeCategory === null ? '0 4px 12px rgba(15,30,74,0.25)' : 'none',
                        }}
                    >
                        All Logos
                    </button>

                    {CATEGORIES.map((category) => {
                        const color = CATEGORY_COLORS[category];
                        const isActive = activeCategory === category;

                        return (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(isActive ? null : category)}
                                className={isActive ? color.pill : ''}
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    padding: '8px 16px',
                                    borderRadius: '999px',
                                    fontSize: '12px',
                                    fontWeight: 600,
                                    border: isActive ? '1px solid currentColor' : '1px solid #e5e7eb',
                                    background: isActive ? undefined : 'white',
                                    color: isActive ? undefined : '#6b7280',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                    transform: isActive ? 'scale(1.05)' : 'scale(1)',
                                    boxShadow: isActive ? '0 2px 8px rgba(0,0,0,0.1)' : 'none',
                                }}
                            >
                                <Fragment>
                                    <span className={`h-1.5 w-1.5 flex-shrink-0 rounded-full ${color.dot}`} />
                                    {CATEGORY_LABELS[category] ?? category}
                                </Fragment>
                            </button>
                        );
                    })}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {rawRows.map((row, rowIndex) => (
                        <MarqueeRow
                            key={`${activeCategory ?? 'all'}-row-${rowIndex}`}
                            customers={padRow(row)}
                            direction={rowIndex % 2 === 0 ? 'left' : 'right'}
                            speed={28 + rowIndex * 10}
                            rowIndex={rowIndex}
                        />
                    ))}
                </div>

                <div
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        height: '1px',
                        width: '192px',
                        background: 'linear-gradient(to right, transparent, #2B7EC2, transparent)',
                    }}
                />
            </section>
        </>
    );
}
