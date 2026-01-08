'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaArrowRight } from 'react-icons/fa';
import { useProductContext } from '../../../app/context/ProductContext'; // ✅ ADD

export default function CategoryClient() {
  const { slug } = useParams();

  const { setCategoryData } = useProductContext(); // ✅ ADD

  const [data, setData] = useState(null);
  const [activeSub, setActiveSub] = useState(null);
  const [activeSubSlug, setActiveSubSlug] = useState(null);
  const [loading, setLoading] = useState(true);
  const [panelAnim, setPanelAnim] = useState('animate-slide-in-right');

  const prevIndexRef = useRef(0);

  useEffect(() => {
    if (!slug) return;

    const fetchCategory = async () => {
      try {
        const res = await fetch(`/api/products/${slug}`);
        const json = await res.json();

        setData(json);
        setCategoryData(json); // ✅ STORE DATA IN CONTEXT

        if (json.subcategories?.length) {
          setActiveSub(json.subcategories[0].name);
          setActiveSubSlug(json.subcategories[0].slug);
          prevIndexRef.current = 0;
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [slug, setCategoryData]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-[#2F4191] rounded-full animate-spin" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 text-lg">Category not found</p>
      </div>
    );
  }

  const models =
    data.subcategories.find((s) => s.slug === activeSubSlug)?.models || [];

  const handleChangeSub = (sub) => {
    const newIndex = data.subcategories.findIndex((s) => s.slug === sub.slug);
    const prevIndex = prevIndexRef.current;

    setPanelAnim(
      newIndex > prevIndex
        ? 'animate-slide-in-right'
        : 'animate-slide-in-left'
    );

    prevIndexRef.current = newIndex;
    setActiveSub(sub.name);
    setActiveSubSlug(sub.slug);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1440px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 lg:py-10">

        {/* HEADER */}
        <header className="mb-6 border-b border-gray-300 pb-4">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900">
            {data.category}
          </h1>
        </header>

        <div className="flex flex-col md:flex-row gap-4 md:gap-6">

          {/* SIDEBAR (DESKTOP) */}
          <aside className="hidden md:block w-full md:w-64 lg:w-72 shrink-0">
            <div className="sticky top-24 rounded-xl border border-gray-300 bg-white shadow-sm">
              <div className="px-4 py-3 border-b">
                <h2 className="text-sm font-semibold uppercase text-gray-700">
                  Subcategories
                </h2>
              </div>

              <nav className="p-2 space-y-1 max-h-[70vh] overflow-y-auto">
                {data.subcategories.map((sub) => {
                  const isActive = activeSubSlug === sub.slug;
                  return (
                    <button
                      key={sub.slug}
                      onClick={() => handleChangeSub(sub)}
                      className={`w-full flex justify-between px-3 py-2 rounded-lg text-sm transition
                        ${
                          isActive
                            ? 'bg-[#2F4191]/10 text-[#2F4191] font-medium border border-[#2F4191]/30'
                            : 'hover:bg-gray-50 text-gray-700'
                        }`}
                    >
                      <span className="truncate">{sub.name}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* MOBILE SUBCATEGORY TABS */}
          <div className="md:hidden mb-3">
            <div className="flex gap-2 overflow-x-auto pb-2 -mx-3 px-3">
              {data.subcategories.map((sub) => {
                const isActive = activeSubSlug === sub.slug;
                return (
                  <button
                    key={sub.slug}
                    onClick={() => handleChangeSub(sub)}
                    className={`whitespace-nowrap px-4 py-2 rounded-full text-sm border transition
                      ${
                        isActive
                          ? 'bg-[#2F4191] text-white border-[#2F4191]'
                          : 'bg-white border-gray-200 text-gray-700'
                      }`}
                  >
                    {sub.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* MODELS */}
          <main className={`flex-1 transition-all duration-300 ${panelAnim}`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg sm:text-xl font-semibold">{activeSub}</h2>
              <span className="text-xs text-gray-500">
                {models.length} models
              </span>
            </div>

            {models.length === 0 ? (
              <div className="border border-dashed rounded-xl p-10 text-center text-gray-500">
                No models available.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-5">
                {models.map((model) => (
                  <Link
                    key={model.meta.slug}
                    href={`/products/${slug}/${activeSubSlug}/${model.meta.slug}`}
                    className="group flex flex-col rounded-xl border border-gray-300 bg-white shadow-sm hover:shadow-md transition overflow-hidden"
                  >
                    <div className="relative h-40 sm:h-44 lg:h-48 bg-gray-50">
                      <Image
                        src={model.meta.thumbnail}
                        alt={model.meta.title}
                        fill
                        className="object-contain p-4 group-hover:scale-[1.03] transition"
                      />
                    </div>

                    <div className="flex flex-col px-4 pt-3 pb-4 flex-1">
                      <h3 className="text-sm font-semibold line-clamp-2">
                        {model.meta.title}
                      </h3>

                      <p className="mt-2 text-xs text-gray-500 line-clamp-3">
                        {model.overview}
                      </p>

                      <button
                        type="button"
                        className="mt-3 inline-flex items-center justify-between gap-3 px-3 py-1.5 border border-[#2F4191]/20 rounded-full hover:bg-[#2F4191]/5 transition"
                      >
                        <span className="text-xs font-medium text-[#2F4191] pl-1">
                          View details
                        </span>

                        <span className="relative flex h-[30px] w-[30px] items-center justify-center text-[#2F4191]">
                          <FaArrowRight size={12} className="relative text-white" />
                        </span>
                      </button>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
