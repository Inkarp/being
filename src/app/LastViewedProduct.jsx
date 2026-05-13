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
    <div className="fixed bottom-6 left-6 z-50">
      <div className="w-[300px] overflow-hidden rounded-[16px] border border-black/10 bg-white shadow-[0_8px_32px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.06)] animate-lvp-slide-up">
        <div className="h-[3px] bg-[linear-gradient(90deg,_#2F4191_0%,_#2B7EC2_50%,_#BE0010_100%)]" />

        <div className="px-[14px] pb-[12px] pt-[14px]">
          <div className="mb-2.5 flex items-center gap-1.5">
            <div className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#2B7EC2] animate-lvp-pulse" />
            <span className="flex-1 text-[11px] font-semibold uppercase tracking-[0.06em] text-[#888]">Continue where you left off</span>
            <button
              type="button"
              onClick={() => setDismissed(true)}
              aria-label="Dismiss"
              className="rounded-none border-none bg-transparent p-0 text-[16px] leading-none text-[#bbb] transition-colors duration-150 hover:text-[#555]"
            >
              ×
            </button>
          </div>

          <p className="mb-2.5 text-[13.5px] font-semibold leading-[1.45] text-[#111827] line-clamp-2">{product.name}</p>

          <div className="mb-3 flex flex-wrap items-center gap-1.5">
            <span className="rounded-[5px] bg-[#EEF4FF] px-2 py-[2.5px] text-[10.5px] font-semibold text-[#2F4191]">In Stock</span>
            {product.quoteOnly && <span className="rounded-[5px] bg-[#FFF5F5] px-2 py-[2.5px] text-[10.5px] font-semibold text-[#BE0010]">Quote Only</span>}
            {product.category && <span className="text-[11px] text-[#6B7280]">{product.category}</span>}
          </div>

          <div className="mb-3 h-px bg-[#f0f0f0]" />

          <Link href={product.url} className="mb-2 inline-flex w-full items-center justify-between rounded-[10px] bg-[#2F4191] px-3.5 py-2.5 text-[12.5px] font-semibold text-white transition duration-150 hover:opacity-90 active:scale-[0.99] no-underline">
            <span>View product</span>
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/20">
              <FaArrowRight size={9} />
            </span>
          </Link>

          <div className="flex gap-2">
            <button type="button" className="flex-1 rounded-[10px] border border-[#BE0010]/15 bg-[#FFF5F5] px-3 py-2 text-[11.5px] font-semibold text-[#BE0010] transition duration-150 hover:bg-[#FFEBEB]">
              Request quote
            </button>
            <a href="tel:+919999999999" className="flex-1 items-center justify-center gap-1.5 rounded-[10px] border border-[#E8E8E8] bg-[#F5F5F5] px-3 py-2 text-[11.5px] font-semibold text-[#374151] transition duration-150 hover:bg-[#E5E7EB] hover:text-[#111827] inline-flex no-underline">
              <FaPhoneAlt size={10} />
              Talk to expert
            </a>
          </div>
        </div>

        <div className="h-[2px] overflow-hidden bg-[#f0f0f0]">
          <div className="h-full w-full bg-[#2B7EC2] animate-lvp-shrink" />
        </div>
      </div>
    </div>
  );
}