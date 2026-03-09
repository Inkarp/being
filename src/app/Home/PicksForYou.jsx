"use client";

import Image from "next/image";
import { useState } from "react";
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
    badge: "BEST SELLER",
    badgeColor: "#FFD700",
    model: "55UA82006LA",
    title: "LG 139 cm (55) 4K UHD AI UA8200 Smart TV with a7 AI Processor",
    rating: 4.7,
    reviews: 143,
  },
  {
    badge: "2026 MODEL",
    badgeColor: "#4FA8E0",
    model: "AS-Q18JNXE",
    title: "LG 3 Star 1.5T Split AC, AI Convertible 6-in-1 Cooling",
    rating: 3.3,
    reviews: 3,
  },
  {
    badge: "CASHBACK",
    badgeColor: "#34d399",
    model: "FHP1209Z5M",
    title: "LG 9Kg Front Load Washing Machine, AI Direct Drive™ Motor",
    rating: 4.4,
    reviews: 45,
  },
  {
    badge: "LIMITED STOCK",
    badgeColor: "#f87171",
    model: "GL-I292RPZX",
    title: "LG 242L Double Door Refrigerator with Door Cooling+",
    rating: 4.6,
    reviews: 31,
  },
  {
    badge: "NEW ARRIVAL",
    badgeColor: "#a78bfa",
    model: "WM-X9000",
    title: "LG 12Kg Front Load Washing Machine with TurboWash 360°",
    rating: 4.8,
    reviews: 12,
  },
  {
    badge: "BEST SELLER",
    badgeColor: "#FFD700",
    model: "OLED65C3",
    title: "LG 65 inch OLED evo C3 4K Smart TV with Dolby Vision",
    rating: 4.9,
    reviews: 210,
  },
  {
    badge: "TOP RATED",
    badgeColor: "#fb923c",
    model: "GL-T322RPZX",
    title: "LG 308L Frost-Free Double Door Refrigerator, Smart Inverter",
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
  const totalPages = Math.ceil(products.length / CARDS_PER_PAGE);

  const visible = products.slice(
    page * CARDS_PER_PAGE,
    page * CARDS_PER_PAGE + CARDS_PER_PAGE
  );

  const prev = () => setPage((p) => Math.max(0, p - 1));
  const next = () => setPage((p) => Math.min(totalPages - 1, p + 1));

  return (
    <section className="py-5" >
      <div className="max-w-[1360px] mx-auto px-6">

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
              className={`px-[18px] py-[6px] rounded-full text-[13px] font-bold tracking-[0.04em] transition ${
                activeTab === tab
                  ? "bg-white text-[#2F4191]"
                  : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Products */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
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

              <button className="inline-flex w-fit items-center gap-[7px] px-5 py-3 text-[12px] font-bold rounded-full bg-gradient-to-r from-[#2F4191] to-[#2B7EC2] text-white shadow-md hover:shadow-lg transition">
                View Details <FaArrowRight size={11} />
              </button>

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
              className={`h-[6px] transition-all ${
                i === page
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