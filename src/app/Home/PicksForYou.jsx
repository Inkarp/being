"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { FaArrowLeft, FaArrowRight, FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

const ALL_TAB = "all";
const CARDS_PER_PAGE = 4;
const TAG_COLORS = ["#4FA8E0", "#FFD700", "#34d399", "#fb923c", "#a78bfa", "#f87171", "#38bdf8"];

function normalizeTag(tag) {
  return String(tag || "").trim().toLowerCase();
}

function formatTag(tag) {
  return normalizeTag(tag)
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function getTagColor(tag) {
  const normalized = normalizeTag(tag);
  if (normalized === "best-seller") return "#FFD700";
  if (normalized === "new") return "#4FA8E0";
  if (normalized === "featured") return "#34d399";

  const index = [...normalized].reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return TAG_COLORS[index % TAG_COLORS.length];
}

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-[2px]">
      {[1, 2, 3, 4, 5].map((s) =>
        rating >= s ? (
          <FaStar key={s} size={12} color="#FFD700" />
        ) : rating >= s - 0.5 ? (
          <FaStarHalfAlt key={s} size={12} color="#FFD700" />
        ) : (
          <FaRegStar key={s} size={12} color="#FFD700" />
        )
      )}
    </div>
  );
}

function GearArrowButton() {
  return (
    <div
      className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full cursor-pointer mt-auto w-fit transition-all duration-200 hover:scale-105 hover:shadow-[0_6px_20px_rgba(43,126,194,0.4)]"
      style={{ background: "linear-gradient(135deg, #2B7EC2, #2F4191)" }}
    >
      <span className="text-sm font-bold text-white tracking-wide">View Details</span>
      <div className="relative w-8 h-8 flex-shrink-0">
        <svg
          width="32" height="32"
          viewBox="0 0 30 30"
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
          className="gear-svg absolute inset-0 z-0"
        >
          <path d="M14.2257 0.947522C14.6258 0.457905 15.3742 0.457905 15.7743 0.947522L16.8781 2.29817C17.181 2.66879 17.704 2.77283 18.1256 2.54633L19.6623 1.72088C20.2193 1.42165 20.9107 1.70806 21.093 2.31352L21.5959 3.98376C21.7339 4.44207 22.1773 4.73834 22.6535 4.69044L24.3891 4.51587C25.0182 4.45258 25.5474 4.98179 25.4841 5.61093L25.3096 7.34647C25.2617 7.8227 25.5579 8.2661 26.0162 8.40409L27.6865 8.90697C28.2919 9.08926 28.5783 9.7807 28.2791 10.3377L27.4537 11.8744C27.2272 12.296 27.3312 12.819 27.7018 13.1219L29.0525 14.2257C29.5421 14.6258 29.5421 15.3742 29.0525 15.7743L27.7018 16.8781C27.3312 17.181 27.2272 17.704 27.4537 18.1256L28.2791 19.6623C28.5783 20.2193 28.2919 20.9107 27.6865 21.093L26.0162 21.5959C25.5579 21.7339 25.2617 22.1773 25.3096 22.6535L25.4841 24.3891C25.5474 25.0182 25.0182 25.5474 24.3891 25.4841L22.6535 25.3096C22.1773 25.2617 21.7339 25.5579 21.5959 26.0162L21.093 27.6865C20.9107 28.2919 20.2193 28.5783 19.6623 28.2791L18.1256 27.4537C17.704 27.2272 17.181 27.3312 16.8781 27.7018L15.7743 29.0525C15.3742 29.5421 14.6258 29.5421 14.2257 29.0525L13.1219 27.7018C12.819 27.3312 12.296 27.2272 11.8744 27.4537L10.3377 28.2791C9.7807 28.5783 9.08926 28.2919 8.90697 27.6865L8.40409 26.0162C8.2661 25.5579 7.8227 25.2617 7.34647 25.3096L5.61093 25.4841C4.98179 25.5474 4.45258 25.0182 4.51587 24.3891L4.69044 22.6535C4.73834 22.1773 4.44207 21.7339 3.98376 21.5959L2.31352 21.093C1.70806 20.9107 1.42165 20.2193 1.72088 19.6623L2.54633 18.1256C2.77283 17.704 2.66879 17.181 2.29817 16.8781L0.947522 15.7743C0.457905 15.3742 0.457905 14.6258 0.947522 14.2257L2.29817 13.1219C2.66879 12.819 2.77283 12.296 2.54633 11.8744L1.72088 10.3377C1.42165 9.7807 1.70806 9.08926 2.31352 8.90697L3.98376 8.40409C4.44207 8.2661 4.73834 7.8227 4.69044 7.34647L4.51587 5.61093C4.45258 4.98179 4.98179 4.45258 5.61093 4.51587L7.34647 4.69044C7.8227 4.73834 8.2661 4.44207 8.40409 3.98376L8.90697 2.31352C9.08926 1.70806 9.7807 1.42165 10.3377 1.72088L11.8744 2.54633C12.296 2.77283 12.819 2.66879 13.1219 2.29817L14.2257 0.947522Z" />
        </svg>
        <FaArrowRight
          size={12} color='black'
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white z-10"
        />
      </div>
    </div>
  );
}

export default function PicksForYou() {
  const [activeTab, setActiveTab] = useState(ALL_TAB);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    let mounted = true;

    async function fetchProducts() {
      try {
        const res = await fetch("/api/products", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to load products");

        const data = await res.json();
        if (mounted) setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Picks for you products failed:", err);
        if (mounted) setProducts([]);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchProducts();

    return () => {
      mounted = false;
    };
  }, []);

  const tabs = useMemo(() => {
    const tagMap = new Map();

    products.forEach((product) => {
      product.tags?.forEach((tag) => {
        const value = normalizeTag(tag);
        if (value && !tagMap.has(value)) tagMap.set(value, formatTag(value));
      });
    });

    return [{ value: ALL_TAB, label: "All" }, ...[...tagMap].map(([value, label]) => ({ value, label }))];
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (activeTab === ALL_TAB) return products;

    return products.filter((product) =>
      product.tags?.some((tag) => normalizeTag(tag) === activeTab)
    );
  }, [activeTab, products]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / CARDS_PER_PAGE));
  const visible = filteredProducts.slice(page * CARDS_PER_PAGE, page * CARDS_PER_PAGE + CARDS_PER_PAGE);

  useEffect(() => {
    setPage(0);
  }, [activeTab]);

  useEffect(() => {
    if (!tabs.some((tab) => tab.value === activeTab)) setActiveTab(ALL_TAB);
  }, [activeTab, tabs]);

  const navigate = (dir) => {
    setPage((p) => Math.min(Math.max(0, p + dir), totalPages - 1));
    setAnimKey((k) => k + 1);
  };

  const badgeTextColor = (color) => (color === "#FFD700" ? "#92620a" : color);

  return (
    <section
      className="py-10 px-5 md:px-10">
      <div className="flex items-center justify-between mb-1">
        <div
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full border"
          style={{
            borderColor: "rgba(43,126,194,0.25)",
            background: "white",
            backdropFilter: "blur(8px)",
          }}
        >
          <span className="w-2 h-2 rounded-full bg-[#2B7EC2] animate-pulse" />
          <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#2F4191]">
            Picks for you
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[13px] font-semibold text-white/60">
            <span className="text-white font-bold">{page + 1}</span>{" "}
            <span className="text-white/30">/ {totalPages}</span>
          </span>
          <button
            onClick={() => navigate(-1)}
            disabled={page === 0}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20 hover:scale-105 disabled:opacity-80 disabled:cursor-not-allowed"
          >
            <FaArrowLeft size={13} />
          </button>
          <button
            onClick={() => navigate(1)}
            disabled={page === totalPages - 1}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-white/25 bg-white text-white backdrop-blur-md transition hover:bg-white/20 hover:scale-105 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <FaArrowRight size={13} color="black" />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 py-6 flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`px-5 py-[7px] rounded-full text-[13px] font-bold tracking-[0.04em] transition-all duration-200 ${activeTab === tab.value
                ? "bg-white text-[#2F4191]"
                : "bg-white/10 text-white/65 hover:bg-white/18 hover:text-white hover:scale-105"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div key={animKey} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {loading && (
          <div className="col-span-full text-center text-white/70 py-10">
            Loading products...
          </div>
        )}

        {!loading && visible.length === 0 && (
          <div className="col-span-full text-center text-white/70 py-10">
            No tagged products found.
          </div>
        )}

        {!loading &&
          visible.map((product, i) => {
            const badge = product.tags?.[0] || product.categoryName || "Product";
            const badgeColor = getTagColor(badge);

            return (
              <div
                key={product.url || `${product.category}-${product.subcategory}-${product.id}`}
                className="bg-white rounded-[20px] p-5 flex flex-col gap-3 relative overflow-hidden transition-all duration-250 hover:-translate-y-1 cursor-pointer"
                style={{
                  animationDelay: `${i * 55}ms`,
                  animation: "cardIn 0.35s ease both",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 20px 48px rgba(43,126,194,0.22)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.08)";
                }}
              >
                <div
                  className="absolute -top-4 -right-4 w-16 h-16 rounded-full pointer-events-none"
                  style={{ background: badgeColor, opacity: 0.12 }}
                />

                <span
                  className="text-[10px] font-extrabold tracking-[0.1em] uppercase px-2.5 py-[3px] rounded-full inline-block w-fit"
                  style={{
                    background: `${badgeColor}22`,
                    color: badgeTextColor(badgeColor),
                  }}
                >
                  {formatTag(badge)}
                </span>

                <div
                  className="h-40 rounded-2xl flex items-center justify-center overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${badgeColor}18, rgba(47,65,145,0.15))`,
                  }}
                >
                  <Image
                    src={product.image || "/testImg.webp"}
                    alt={product.imageAlt || product.title || "Product image"}
                    width={220}
                    height={150}
                    className="object-contain max-h-[140px]"
                  />
                </div>

                <h3 className="text-[13px] font-bold text-gray-900 leading-[1.5] line-clamp-2">
                  {product.title}
                </h3>

                <div className="flex items-center gap-2">
                  <StarRating rating={4.8} />
                  <span className="text-[12px] font-bold text-gray-800">4.8</span>
                  <span className="text-[11px] text-gray-400 truncate">{product.categoryName}</span>
                </div>

                <Link href={product.url || "/products"}>
                  <GearArrowButton />
                </Link>
              </div>
            );
          })}
      </div>

      <div className="flex justify-center gap-1.5 mt-8">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setPage(i);
              setAnimKey((k) => k + 1);
            }}
            className="h-[5px] rounded-[3px] transition-all duration-300"
            style={{
              width: i === page ? 20 : 6,
              background: i === page ? "#fff" : "rgba(255,255,255,0.28)",
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
