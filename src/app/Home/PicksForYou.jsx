"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
} from "react-icons/fa";

const TABS = ["All", "Popular", "Newest"];

const products = [
  {
    badge: "Popular",
    badgeColor: "#FFD700",
    model: "55UA82006LA",
    title: "Laboratory Drying Oven – BPG-9040A",
    rating: 4.7,
    reviews: 143,
  },
  {
    badge: "Newest",
    badgeColor: "#4FA8E0",
    model: "AS-Q18JNXE",
    title: "Laboratory Drying Oven – BPG-9040A",
    rating: 3.3,
    reviews: 3,
  },
  {
    badge: "Newest",
    badgeColor: "#4FA8E0",
    model: "AS-QJNXE",
    title: "Laboratory Drying Oven – BPG-9040A",
    rating: 3.3,
    reviews: 3,
  },
  {
    badge: "Newest",
    badgeColor: "#34d399",
    model: "FHP1209Z5M",
    title: "Laboratory Drying Oven – BPG-9040A",
    rating: 4.4,
    reviews: 45,
  },
  {
    badge: "Newest",
    badgeColor: "#f87171",
    model: "GL-I292RPZX",
    title: "Laboratory Drying Oven – BPG-9040A",
    rating: 4.6,
    reviews: 31,
  },
  {
    badge: "Newest",
    badgeColor: "#a78bfa",
    model: "WM-X9000",
    title: "Laboratory Drying Oven – BPG-9040A",
    rating: 4.8,
    reviews: 12,
  },
  {
    badge: "BEST SELLER",
    badgeColor: "#FFD700",
    model: "OLED65C3",
    title: "Laboratory Drying Oven – BPG-9040A",
    rating: 4.9,
    reviews: 210,
  },
  {
    badge: "TOP RATED",
    badgeColor: "#fb923c",
    model: "GL-T322RPZX",
    title: "Laboratory Drying Oven – BPG-9040A",
    rating: 4.5,
    reviews: 88,
  },
];

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-[2px]">
      {[1, 2, 3, 4, 5].map((s) => {
        const filled = rating >= s;
        const half = !filled && rating >= s - 0.5;

        return filled ? (
          <FaStar key={s} size={12} color="#FFD700" />
        ) : half ? (
          <FaStarHalfAlt key={s} size={12} color="#FFD700" />
        ) : (
          <FaRegStar key={s} size={12} color="#FFD700" />
        );
      })}
    </div>
  );
}

export default function PicksForYou() {
  const [activeTab, setActiveTab] = useState("All");
  const [page, setPage] = useState(0);

  const CARDS_PER_PAGE = 4;

  const popularBadges = new Set(["Popular", "BEST SELLER", "TOP RATED"]);
  const filteredProducts =
    activeTab === "All"
      ? products
      : activeTab === "Popular"
        ? products.filter((p) => popularBadges.has(p.badge))
        : products.filter((p) => p.badge === "Newest");

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / CARDS_PER_PAGE));

  const visible = filteredProducts.slice(
    page * CARDS_PER_PAGE,
    page * CARDS_PER_PAGE + CARDS_PER_PAGE
  );

  useEffect(() => {
    setPage(0);
  }, [activeTab]);

  const prev = () => setPage((p) => Math.max(0, p - 1));
  const next = () => setPage((p) => Math.min(totalPages - 1, p + 1));

  return (
    <section className="py-5" >
      <div className="px-10 mx-auto">

        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
          <div>
            {/* <p className="text-[11px] font-extrabold tracking-[0.14em] uppercase text-[#FFD700] mb-1">
              Curated for you
            </p> */}

            <h2 className="text-[clamp(28px,4vw,48px)] font-black text-white leading-tight">
              Curated Picks For You
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[13px] text-white/60 font-semibold">
              {page + 1} <span className="text-white/30">/ {totalPages}</span>
            </span>

            <button
              onClick={prev}
              disabled={page === 0}
              className="w-[44px] h-[44px] flex items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20 hover:scale-105 disabled:opacity-30"
            >
              <FaArrowLeft size={14} />
            </button>

            <button
              onClick={next}
              disabled={page === totalPages - 1}
              className="w-[44px] h-[44px] flex items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20 hover:scale-105 disabled:opacity-30"
            >
              <FaArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-[18px] py-[6px] rounded-full text-[13px] font-bold tracking-[0.04em] transition ${activeTab === tab
                ? "bg-white text-[#2F4191]"
                : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Products */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-5 md:grid-cols-2 sm:grid-cols-1">
          {visible.map((product, i) => (
            <div
              key={i}
              className="bg-white rounded-[24px] p-[22px] flex flex-col gap-[14px] min-h-[460px] relative overflow-hidden transition transform hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="flex-1">

                <span
                  className="text-[10px] font-extrabold tracking-[0.1em] px-[10px] py-[3px] rounded-full inline-block mb-[10px]"
                  style={{
                    background: `${product.badgeColor}22`,
                    color:
                      product.badgeColor === "#FFD700"
                        ? "#b45309"
                        : product.badgeColor,
                  }}
                >
                  {product.badge}
                </span>

                <p className="text-[11px] text-gray-400 font-semibold tracking-[0.06em] mb-1">
                  {product.model}
                </p>

                <h3 className="text-[14px] font-bold text-gray-900 leading-[1.45] mb-2 line-clamp-3">
                  {product.title}
                </h3>

                <div className="flex items-center gap-2">
                  <StarRating rating={product.rating} />
                  <span className="text-[12px] font-bold text-gray-700">
                    {product.rating}
                  </span>
                  <span className="text-[11px] text-gray-400">
                    ({product.reviews} reviews)
                  </span>
                </div>
              </div>

              <div className="h-[200px] rounded-[16px] flex items-center justify-center bg-gradient-to-br from-[#2B7EC2]/10 to-[#2F4191]/20">
                <Image
                  src="/testImg.webp"
                  alt={product.title}
                  width={260}
                  height={180}
                  className="object-contain max-h-[180px]"
                />
              </div>

              <Link href="/about-us">
                <div
                  className="know-btn inline-flex items-center gap-3 px-6 py-2 rounded-full cursor-pointer mt-2"
                  style={{
                    background: 'linear-gradient(135deg, var(--blue-deep), var(--blue-mid))',
                    // color: '#fff',
                  }}
                >
                  <span className="font-bold text-white text-sm tracking-wide">View Details</span>

                  {/* Spinning gear with arrow */}
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
              </Link>

              <div
                className="absolute -top-5 -right-5 w-[80px] h-[80px] rounded-full"
                style={{ background: `${product.badgeColor}18` }}
              />
            </div>
          ))}
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center gap-2 mt-9">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className={`h-[6px] transition-all ${i === page
                ? "w-[20px] bg-white rounded-[3px]"
                : "w-[6px] bg-white/30 rounded-full"
                }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}