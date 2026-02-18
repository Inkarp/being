"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const categories = [
  "All",
  "Automation",
  "Spectroscopy",
  "Chromatography",
  "Pharma",
  "AI",
];

const allBlogs = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  title: `Scientific Insight ${i + 1}`,
  category: categories[(i % 5) + 1],
  desc: "Application-driven insights for modern research workflows.",
  img: `https://picsum.photos/400/300?random=${i}`,
}));

export default function Blogs() {
  const [visible, setVisible] = useState(9);
  const [currentCategory, setCurrentCategory] = useState("All");
  const [visibleCards, setVisibleCards] = useState([]);
  const observer = useRef(null);

  const filteredBlogs = allBlogs.filter(
    (b) => currentCategory === "All" || b.category === currentCategory
  );

  const blogsToShow = filteredBlogs.slice(0, visible);

  /* ===== INTERSECTION OBSERVER ===== */
  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0", "scale-100");
          }
        });
      },
      { threshold: 0.15 }
    );
  }, []);

  useEffect(() => {
    const cards = document.querySelectorAll(".blog-card");
    cards.forEach((card) => observer.current.observe(card));
  }, [blogsToShow]);

  return (
    <div className="bg-[#f6f7f9] text-[#1d1d1d]">

      {/* HERO */}
      <section className="bg-white px-8 py-20 opacity-0 animate-[fadeUp_0.9s_cubic-bezier(.22,.61,.36,1)_forwards]">
        <h1 className="text-4xl font-bold mb-3">
          Scientific Insights & Innovation
        </h1>
        <p className="max-w-xl text-gray-500">
          Curated perspectives on laboratory automation, analytical science, and real-world research applications.
        </p>
      </section>

      {/* FEATURED */}
      <section className="grid lg:grid-cols-2 gap-10 px-8 py-16 opacity-0 animate-[fadeUp_1s_cubic-bezier(.22,.61,.36,1)_0.15s_forwards]">
        <div className="relative overflow-hidden rounded-2xl group">
          <Image
            // src="https://picsum.photos/900/600"
            src='/about.jpg'
            width={900}
            height={600}
            alt="Featured"
            className="rounded-2xl transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        <div>
          <small className="text-[#BE0010] font-bold">
            FEATURED INSIGHT
          </small>
          <h2 className="text-2xl font-semibold my-3">
            How Automation Is Transforming Modern Laboratories
          </h2>
          <p className="text-gray-600 mb-4">
            From reaction optimization to analytics integration, automation is redefining productivity and reproducibility.
          </p>
          <a href="#" className="text-[#BE0010] font-semibold">
            Read Full Article →
          </a>
        </div>
      </section>

      {/* MAIN */}
      <section className="grid lg:grid-cols-[260px_1fr] gap-10 px-8 py-16">

        {/* SIDEBAR */}
        <aside className="bg-[#F5F5F5] rounded-2xl p-6 sticky top-10 h-fit opacity-0 animate-[fadeUp_0.9s_cubic-bezier(.22,.61,.36,1)_0.3s_forwards]">
          <h3 className="mb-4 font-semibold">Explore Topics</h3>
          {categories.map((cat) => (
            <div
              key={cat}
              onClick={() => {
                setCurrentCategory(cat);
                setVisible(9);
              }}
              className={`px-4 py-2 mb-2 rounded-full text-sm cursor-pointer transition-all duration-300
                ${
                  currentCategory === cat
                    ? "bg-[#2F4191] text-white translate-x-1"
                    : "bg-gray-200 hover:bg-[#2B7EC2] hover:text-white hover:translate-x-1"
                }`}
            >
              {cat}
            </div>
          ))}
        </aside>

        {/* BLOG GRID */}
        <div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogsToShow.map((blog, i) => (
              <div
                key={blog.id}
                className="blog-card bg-white rounded-2xl overflow-hidden cursor-pointer opacity-0 translate-y-8 scale-95 transition-all duration-500"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <Image
                  // src={blog.img}
                  src="/about.jpg"
                  width={400}
                  height={300}
                  alt={blog.title}
                  className="h-48 w-full object-cover transition-transform duration-700 hover:scale-110"
                />
                <div className="p-5">
                  <small className="text-[#BE0010] font-semibold">
                    {blog.category}
                  </small>
                  <h4 className="my-2 font-semibold">
                    {blog.title}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {blog.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* LOAD MORE */}
          {visible < filteredBlogs.length && (
            <button
              onClick={() => setVisible((prev) => prev + 6)}
              className="mx-auto mt-12 block bg-[#BE0010] text-white px-8 py-3 rounded-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              Load More Insights
            </button>
          )}
        </div>
      </section>

      {/* Custom keyframes */}
      <style jsx global>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
