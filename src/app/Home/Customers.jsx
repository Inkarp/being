'use client';

import Image from 'next/image';
import { useState } from 'react';

const CUSTOMER_LOGOS = {
  Academic: ['/assets/customers/academic/one.webp'],
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
    '/assets/customers/private/one.webp',
    '/assets/customers/private/two.webp',
    '/assets/customers/private/three.webp',
    '/assets/customers/private/four.webp',
    '/assets/customers/private/five.webp',
    '/assets/customers/private/six.webp',
    '/assets/customers/private/seven.webp',
    '/assets/customers/private/eight.webp',
    '/assets/customers/private/nine.webp',
    '/assets/customers/private/ten.webp',
    '/assets/customers/private/eleven.webp',
    '/assets/customers/private/twelve.webp',
    '/assets/customers/private/thirteen.webp',
    '/assets/customers/private/fourteen.webp',
    '/assets/customers/private/sixteen.webp',
    '/assets/customers/private/seventeen.webp',
    '/assets/customers/private/eighteen.webp',
    '/assets/customers/private/ninteen.webp',
    '/assets/customers/private/twenty.webp',
    '/assets/customers/private/twentyone.webp',
    '/assets/customers/private/twentytwo.webp',
    '/assets/customers/private/twentythree.png',
    '/assets/customers/private/twentyfour.png',
    '/assets/customers/private/twentyfive.png',
    '/assets/customers/private/twentysix.webp',
    '/assets/customers/private/twentyseven.webp',
    '/assets/customers/private/twentyeight.webp',
    '/assets/customers/private/twentynine.webp',
    '/assets/customers/private/thirty.webp',
    '/assets/customers/private/thirtyone.webp',
    '/assets/customers/private/thirtytwo.webp',
    '/assets/customers/private/thirtythree.webp',
    '/assets/customers/private/thirtyfour.webp',
    '/assets/customers/private/thirtyfive.webp',
    '/assets/customers/private/thirtysix.webp',
    '/assets/customers/private/thirtyseven.webp',
    '/assets/customers/private/thirtyeight.webp',
    '/assets/customers/private/thirtynine.webp',
    '/assets/customers/private/fourty.webp',
    '/assets/customers/private/fourtyone.webp',
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
  Government: { active: 'border-blue-200 bg-blue-50 text-blue-700', dot: 'bg-blue-500' },
  'Academia-Government': { active: 'border-violet-200 bg-violet-50 text-violet-700', dot: 'bg-violet-500' },
  'Academia-Private': { active: 'border-emerald-200 bg-emerald-50 text-emerald-700', dot: 'bg-emerald-500' },
  Academic: { active: 'border-cyan-200 bg-cyan-50 text-cyan-700', dot: 'bg-cyan-500' },
  Dealer: { active: 'border-amber-200 bg-amber-50 text-amber-700', dot: 'bg-amber-500' },
  Private: { active: 'border-rose-200 bg-rose-50 text-rose-700', dot: 'bg-rose-500' },
};

const ROW_ANIMATION_CLASSES = [
  'animate-[marquee-left_28s_linear_infinite]',
  'animate-[marquee-right_38s_linear_infinite]',
  'animate-[marquee-left_48s_linear_infinite]',
];

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
  return (
    <div className="group/card relative mx-3 shrink-0">
      <div className="relative flex h-20 w-40 cursor-pointer items-center justify-center rounded-2xl border border-[#f0f0f0] bg-white px-4 shadow-[0_1px_4px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:border-[#2B7EC2]/40 hover:shadow-[0_20px_40px_rgba(47,65,145,0.12),0_4px_12px_rgba(47,65,145,0.08)]">
        <Image
          src={customer.logo}
          alt={customer.name}
          width={120}
          height={48}
          className="mx-auto max-h-12 w-auto select-none object-contain"
          draggable={false}
        />

        <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 shadow-[0_0_0_2px_rgba(43,126,194,0.3)] transition-opacity duration-300 group-hover/card:opacity-100" />
      </div>
    </div>
  );
}

function MarqueeRow({ customers, rowIndex }) {
  const doubled = [...customers, ...customers];

  return (
    <div className="group/row relative w-full overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white via-white/80 to-transparent sm:w-28" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white via-white/80 to-transparent sm:w-28" />

      <div
        className={`flex py-3 will-change-transform group-hover/row:[animation-play-state:paused] ${ROW_ANIMATION_CLASSES[rowIndex]}`}
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
      `}</style>

      <section className="relative w-full overflow-hidden bg-white py-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,#c7d2e8_1px,transparent_1px)] bg-[length:28px_28px] opacity-40" />
        <div className="absolute left-1/2 top-0 h-px w-48 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#2B7EC2] to-transparent" />

        <div className="relative mb-10 px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#2F4191]/20 bg-[#2F4191]/5 px-5 py-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#2B7EC2]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#2F4191]">
              Our Customers
            </span>
          </div>

          <h2 className="mb-3 mt-4 text-2xl font-bold text-[#0f1e4a] sm:text-3xl lg:text-4xl">
            Trusted Across Every Sector
          </h2>
          <p className="mx-auto max-w-5xl text-base leading-relaxed text-gray-500">
            From government labs to leading private enterprises, our partnerships span academia, industry, and beyond.
          </p>
        </div>

        <div className="relative mb-10 flex flex-wrap justify-center gap-2 px-6">
          <button
            onClick={() => setActiveCategory(null)}
            className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-200 ${
              activeCategory === null
                ? 'scale-105 border-[#0f1e4a] bg-[#0f1e4a] text-white shadow-[0_4px_12px_rgba(15,30,74,0.25)]'
                : 'border-gray-200 bg-white text-gray-500 hover:border-[#0f1e4a]/30 hover:text-[#0f1e4a]'
            }`}
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
                className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? `scale-105 shadow-[0_2px_8px_rgba(0,0,0,0.1)] ${color.active}`
                    : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300 hover:text-[#0f1e4a]'
                }`}
              >
                <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${color.dot}`} />
                {CATEGORY_LABELS[category] ?? category}
              </button>
            );
          })}
        </div>

        <div className="flex flex-col gap-2">
          {rawRows.map((row, rowIndex) => (
            <MarqueeRow
              key={`${activeCategory ?? 'all'}-row-${rowIndex}`}
              customers={padRow(row)}
              rowIndex={rowIndex}
            />
          ))}
        </div>

        <div className="absolute bottom-0 left-1/2 h-px w-48 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#2B7EC2] to-transparent" />
      </section>
    </>
  );
}
