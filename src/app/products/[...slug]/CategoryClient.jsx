'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function CategoryClient() {
  const { slug } = useParams();

  const [data, setData] = useState(null);
  const [activeSub, setActiveSub] = useState(null);
  const [activeSubSlug, setActiveSubSlug] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const fetchCategory = async () => {
      try {
        const res = await fetch(`/api/products/${slug}`);
        const json = await res.json();

        setData(json);

        if (json.subcategories?.length) {
          setActiveSub(json.subcategories[0].name);
          setActiveSubSlug(json.subcategories[0].slug);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-[#2F4191] rounded-full animate-spin" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-red-500 text-lg">Category not found</p>
      </div>
    );
  }

  const models =
    data.subcategories.find((s) => s.slug === activeSubSlug)?.models || [];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6 lg:py-10">
        {/* Page header */}
        <header className="mb-6 lg:mb-8 border-b border-gray-200 pb-4 flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-2xl lg:text-3xl font-semibold tracking-tight text-gray-900">
              {data.category}
            </h1>
            <p className="text-sm text-gray-500">
              Browse all models under this category and its subcategories.
            </p>
          </div>
        </header>

        <div className="flex gap-6">
          {/* LEFT SIDEBAR */}
          <aside className="hidden md:block w-64 shrink-0">
            <div className="sticky top-20 rounded-xl border border-gray-200 bg-white shadow-sm">
              <div className="px-4 py-3 border-b border-gray-100">
                <h2 className="text-sm font-semibold tracking-wide text-gray-700 uppercase">
                  Subcategories
                </h2>
              </div>

              <nav className="p-2 space-y-1 max-h-[70vh] overflow-y-auto">
                {data.subcategories.map((sub) => {
                  const isActive = activeSubSlug === sub.slug;
                  return (
                    <button
                      key={sub.slug}
                      type="button"
                      onClick={() => {
                        setActiveSub(sub.name);
                        setActiveSubSlug(sub.slug);
                      }}
                      className={[
                        'w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition',
                        isActive
                          ? 'bg-[#2F4191]/10 text-[#2F4191] font-medium border border-[#2F4191]/30'
                          : 'text-gray-700 hover:bg-gray-50',
                      ].join(' ')}
                    >
                      <span className="truncate text-left">{sub.name}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* MOBILE SUBCATEGORY TABS */}
          <div className="md:hidden mb-4 -mt-2">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {data.subcategories.map((sub) => {
                const isActive = activeSubSlug === sub.slug;
                return (
                  <button
                    key={sub.slug}
                    type="button"
                    onClick={() => {
                      setActiveSub(sub.name);
                      setActiveSubSlug(sub.slug);
                    }}
                    className={[
                      'whitespace-nowrap px-3 py-1.5 rounded-full text-sm border transition',
                      isActive
                        ? 'bg-[#2F4191] text-white border-[#2F4191]'
                        : 'bg-white text-gray-700 border-gray-200',
                    ].join(' ')}
                  >
                    {sub.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT MODELS */}
          <main className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                {activeSub}
              </h2>
              <p className="text-xs text-gray-500">
                {models.length} models found
              </p>
            </div>

            {models.length === 0 ? (
              <div className="border border-dashed border-gray-200 rounded-xl p-10 text-center text-gray-500 text-sm">
                No models available for this subcategory yet.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {models.map((model) => (
                  <Link
                    key={model.meta.slug}
                    href={`/products/${slug}/${activeSubSlug}/${model.meta.slug}`}
                    className="group flex flex-col h-full rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                  >
                    <div className="relative w-full h-44 bg-gray-50">
                      <Image
                        src={model.meta.thumbnail}
                        alt={model.meta.title}
                        fill
                        sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                        className="object-contain p-4 group-hover:scale-[1.02] transition-transform"
                      />
                    </div>

                    <div className="flex-1 flex flex-col px-4 pt-3 pb-4">
                      <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">
                        {model.meta.title}
                      </h3>
                      <p className="mt-2 text-xs text-gray-500 line-clamp-3">
                        {model.overview}
                      </p>

                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-xs font-medium text-[#2F4191]">
                          View details
                        </span>
                        <span className="inline-flex items-center justify-center h-7 w-7 rounded-full bg-gray-100 text-gray-500 text-xs group-hover:bg-[#2F4191] group-hover:text-white transition-colors">
                          →
                        </span>
                      </div>
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
