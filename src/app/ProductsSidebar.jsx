"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { FaArrowRight } from "react-icons/fa";

function toNumber(value) {
  if (typeof value === "number") return value;
  if (typeof value === "string") {
    const parsed = Number(value.replace(/[^\d.]/g, ""));
    return Number.isFinite(parsed) ? parsed : 0;
  }
  return 0;
}

function formatPrice(value) {
  const amount = Math.round(toNumber(value));
  if (!amount) return "Price on request";

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function getSellingPrice(product) {
  const price = toNumber(product.price);
  const discount = toNumber(product.discount);
  if (!price || !discount) return price;
  return price - (price * discount) / 100;
}

function Confetti({ active }) {
  const pieces = Array.from({ length: 18 });
  const colors = ["#FFD700", "#FF4D6D", "#00C2FF", "#7BFF6A", "#FF9F1C", "#E040FB"];

  return (
    <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden rounded-2xl">
      {active &&
        pieces.map((_, i) => {
          const color = colors[i % colors.length];
          const left = `${(i / pieces.length) * 100}%`;
          const delay = `${(i * 0.07).toFixed(2)}s`;
          const size = i % 3 === 0 ? 7 : i % 3 === 1 ? 5 : 9;

          return (
            <span
              key={i}
              style={{
                position: "absolute",
                left,
                top: "-10px",
                width: size,
                height: size,
                background: color,
                borderRadius: i % 2 === 0 ? "50%" : "2px",
                animation: "confettiFall 1.3s ease-in forwards",
                animationDelay: delay,
                opacity: 0,
                transform: `rotate(${i * 25}deg)`,
              }}
            />
          );
        })}
    </div>
  );
}

function DiscountBadge({ discount }) {
  return (
    <div className="absolute -right-3 -top-3 z-20 flex items-center justify-center">
      <span
        className="absolute h-14 w-14 rounded-full"
        style={{
          background: "radial-gradient(circle, #FFD70066 0%, transparent 80%)",
          animation: "pulseGlow 1.5s ease-in-out infinite",
        }}
      />
      <span
        className="relative flex h-12 w-12 flex-col items-center justify-center rounded-full"
        style={{
          background: "linear-gradient(135deg, #FF4D6D 0%, #FF9F1C 100%)",
          boxShadow: "0 4px 16px 0 #FF4D6D88, 0 0 0 3px #FFD700",
          animation: "badgeBounce 1.1s cubic-bezier(.36,.07,.19,.97) infinite alternate",
        }}
      >
        <span className="text-[13px] font-black leading-none text-white">{discount}%</span>
        <span className="text-[8px] font-extrabold uppercase leading-none tracking-wide text-[#FFD700]">
          OFF
        </span>
      </span>
    </div>
  );
}

function ProductOfferCard({ item, showConfetti }) {
  return (
    <Link
      href={item.url}
      className="relative block rounded-2xl border border-gray-300 bg-white p-3 shadow-lg transition hover:shadow-xl"
    >
      <Confetti active={showConfetti} />
      <DiscountBadge discount={item.discount} />

      <div
        className="mb-3 inline-flex items-center rounded-full px-3 py-1 text-[10px] font-extrabold uppercase tracking-[1px] text-white"
        style={{
          background: "linear-gradient(90deg, #FF4D6D 0%, #FF9F1C 100%)",
          boxShadow: "0 2px 8px #FF4D6D55",
          animation: "shimmer 2s linear infinite",
          backgroundSize: "200% 100%",
        }}
      >
        Festival Season Offer
      </div>

      <div className="flex items-center gap-3">
        <Image
          src={item.image}
          alt={item.imageAlt || item.title}
          width={76}
          height={76}
          className="h-[76px] w-[76px] shrink-0 rounded-xl object-cover"
        />

        <div className="min-w-0 flex-1">
          <h3 className="line-clamp-2 text-[14px] font-bold leading-snug text-[#111827]">
            {item.title}
          </h3>
          <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="text-[12px] font-medium text-gray-400 line-through">
              {formatPrice(item.price)}
            </span>
            <span className="text-[15px] font-extrabold text-[#FF4D6D]">
              {formatPrice(item.sellingPrice)}
            </span>
          </div>
        </div>

        <div className="relative h-[30px] w-[30px] shrink-0 text-[#2F3F8D]">
          <svg width="30" height="30" viewBox="0 0 30 30" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.2257 0.947522C14.6258 0.457905 15.3742 0.457905 15.7743 0.947522L16.8781 2.29817C17.181 2.66879 17.704 2.77283 18.1256 2.54633L19.6623 1.72088C20.2193 1.42165 20.9107 1.70806 21.093 2.31352L21.5959 3.98376C21.7339 4.44207 22.1773 4.73834 22.6535 4.69044L24.3891 4.51587C25.0182 4.45258 25.5474 4.98179 25.4841 5.61093L25.3096 7.34647C25.2617 7.8227 25.5579 8.2661 26.0162 8.40409L27.6865 8.90697C28.2919 9.08926 28.5783 9.7807 28.2791 10.3377L27.4537 11.8744C27.2272 12.296 27.3312 12.819 27.7018 13.1219L29.0525 14.2257C29.5421 14.6258 29.5421 15.3742 29.0525 15.7743L27.7018 16.8781C27.3312 17.181 27.2272 17.704 27.4537 18.1256L28.2791 19.6623C28.5783 20.2193 28.2919 20.9107 27.6865 21.093L26.0162 21.5959C25.5579 21.7339 25.2617 22.1773 25.3096 22.6535L25.4841 24.3891C25.5474 25.0182 25.0182 25.5474 24.3891 25.4841L22.6535 25.3096C22.1773 25.2617 21.7339 25.5579 21.5959 26.0162L21.093 27.6865C20.9107 28.2919 20.2193 28.5783 19.6623 28.2791L18.1256 27.4537C17.704 27.2272 17.181 27.3312 16.8781 27.7018L15.7743 29.0525C15.3742 29.5421 14.6258 29.5421 14.2257 29.0525L13.1219 27.7018C12.819 27.3312 12.296 27.2272 11.8744 27.4537L10.3377 28.2791C9.7807 28.5783 9.08926 28.2919 8.90697 27.6865L8.40409 26.0162C8.2661 25.5579 7.8227 25.2617 7.34647 25.3096L5.61093 25.4841C4.98179 25.5474 4.45258 25.0182 4.51587 24.3891L4.69044 22.6535C4.73834 22.1773 4.44207 21.7339 3.98376 21.5959L2.31352 21.093C1.70806 20.9107 1.42165 20.2193 1.72088 19.6623L2.54633 18.1256C2.77283 17.704 2.66879 17.181 2.29817 16.8781L0.947522 15.7743C0.457905 15.3742 0.457905 14.6258 0.947522 14.2257L2.29817 13.1219C2.66879 12.819 2.77283 12.296 2.54633 11.8744L1.72088 10.3377C1.42165 9.7807 1.70806 9.08926 2.31352 8.90697L3.98376 8.40409C4.44207 8.2661 4.73834 7.8227 4.69044 7.34647L4.51587 5.61093C4.45258 4.98179 4.98179 4.45258 5.61093 4.51587L7.34647 4.69044C7.8227 4.73834 8.2661 4.44207 8.40409 3.98376L8.90697 2.31352C9.08926 1.70806 9.7807 1.42165 10.3377 1.72088L11.8744 2.54633C12.296 2.77283 12.819 2.66879 13.1219 2.29817L14.2257 0.947522Z" />
          </svg>
          <FaArrowRight size={12} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white" />
        </div>
      </div>
    </Link>
  );
}

export default function ProductsSidebar() {
  const [open, setOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!open) return undefined;

    setShowConfetti(true);
    const timeout = setTimeout(() => setShowConfetti(false), 1500);
    return () => clearTimeout(timeout);
  }, [open]);

  useEffect(() => {
    let mounted = true;

    async function loadProducts() {
      try {
        const res = await fetch("/api/products", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to load products");

        const data = await res.json();
        if (mounted) setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Offer products failed:", error);
        if (mounted) setProducts([]);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadProducts();

    return () => {
      mounted = false;
    };
  }, []);

  const items = useMemo(() => {
    return products
      .map((product) => {
        const price = toNumber(product.price);
        const discount = toNumber(product.discount);

        return {
          ...product,
          price,
          discount,
          sellingPrice: getSellingPrice({ price, discount }),
        };
      })
      .filter((product) => product.price > 0 && product.discount > 0)
      .sort((a, b) => {
        if (b.discount !== a.discount) return b.discount - a.discount;
        return a.sellingPrice - b.sellingPrice;
      })
      .slice(0, 5);
  }, [products]);

  return (
    <div
      className="group fixed right-0 top-1/2 z-50 -translate-y-1/2"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div className="flex h-28 w-6 cursor-pointer items-center justify-center rounded-l-full border border-gray-200 bg-[#2F4191] shadow-xl">
        <div className="h-10 w-1 rounded-full bg-gray-300" />
      </div>

      <div
        className={`
          absolute right-6 top-1/2 max-h-[80vh] -translate-y-1/2 overflow-hidden
          rounded-3xl border border-gray-200 bg-white shadow-2xl transition-all duration-500
          ${open ? "w-80 p-4 opacity-100" : "w-0 p-0 opacity-0"}
        `}
      >
        <div className="mb-3">
          <p className="text-[11px] font-extrabold uppercase tracking-[1.8px] text-[#FF4D6D]">
            Top Offers
          </p>
          <h2 className="text-lg font-bold leading-tight text-[#111827]">Best discounted products</h2>
          {!loading && (
            <p className="mt-1 text-xs font-medium text-gray-500">
              Showing {items.length} discounted {items.length === 1 ? "product" : "products"}
            </p>
          )}
        </div>

        <div className="flex max-h-[65vh] flex-col gap-3 overflow-y-auto pr-1">
          {loading && (
            <div className="rounded-2xl border border-gray-200 p-4 text-sm font-medium text-gray-500">
              Loading offers...
            </div>
          )}

          {!loading && items.length === 0 && (
            <div className="rounded-2xl border border-gray-200 p-4 text-sm font-medium text-gray-500">
              No discounted products found.
            </div>
          )}

          {items.map((item) => (
            <ProductOfferCard key={`${item.category}-${item.subcategory}-${item.id}`} item={item} showConfetti={showConfetti} />
          ))}
        </div>

        <style>{`
          @keyframes confettiFall {
            0% { transform: translateY(0) rotate(0deg); opacity: 1; }
            80% { opacity: 1; }
            100% { transform: translateY(160px) rotate(360deg); opacity: 0; }
          }
          @keyframes pulseGlow {
            0%, 100% { transform: scale(1); opacity: 0.7; }
            50% { transform: scale(1.35); opacity: 1; }
          }
          @keyframes badgeBounce {
            0% { transform: scale(1) rotate(-5deg); }
            100% { transform: scale(1.08) rotate(5deg); }
          }
          @keyframes shimmer {
            0% { background-position: 200% center; }
            100% { background-position: -200% center; }
          }
        `}</style>
      </div>
    </div>
  );
}
