'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaArrowRight } from 'react-icons/fa';

export default function CategoryClient() {
  const { slug } = useParams();

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

  const handleChangeSub = (sub) => {
    const newIndex = data.subcategories.findIndex((s) => s.slug === sub.slug);
    const prevIndex = prevIndexRef.current;

    // decide direction
    if (newIndex > prevIndex) {
      setPanelAnim('animate-slide-in-right');
    } else if (newIndex < prevIndex) {
      setPanelAnim('animate-slide-in-left');
    } else {
      setPanelAnim('animate-slide-in-right');
    }

    prevIndexRef.current = newIndex;
    setActiveSub(sub.name);
    setActiveSubSlug(sub.slug);
  };

  return (
    <div className="min-h-screen">
      <div className="w-full mx-auto px-4 lg:px-6 py-6 lg:py-10">
        <header className="mb-6 lg:mb-8 border-b border-gray-500 pb-4 flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
          <h1 className="text-2xl lg:text-3xl font-semibold tracking-tight text-gray-900">
            {data.category}
          </h1>
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
                      onClick={() => handleChangeSub(sub)}
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
                    onClick={() => handleChangeSub(sub)}
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

          {/* RIGHT MODELS WITH ANIMATION */}
          <main className={`flex-1 ${panelAnim}`}>
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

                      <button
                        type="button"
                        className="mt-3 inline-flex items-center justify-between gap-3 px-3 py-1.5 border border-[#2F4191]/20 rounded-full hover:bg-[#2F4191]/5 transition"
                      >
                        <span className="text-xs font-medium text-[#2F4191] pl-1">
                          View details
                        </span>

                        <span className="relative flex h-[30px] w-[30px] items-center justify-center text-[#2F4191]">
                          <svg
                            width="30"
                            height="30"
                            viewBox="0 0 30 30"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                            className="absolute inset-0 spin-slow"
                          >
                            <path d="M14.2257 0.947522C14.6258 0.457905 15.3742 0.457905 15.7743 0.947522L16.8781 2.29817C17.181 2.66879 17.704 2.77283 18.1256 2.54633L19.6623 1.72088C20.2193 1.42165 20.9107 1.70806 21.093 2.31352L21.5959 3.98376C21.7339 4.44207 22.1773 4.73834 22.6535 4.69044L24.3891 4.51587C25.0182 4.45258 25.5474 4.98179 25.4841 5.61093L25.3096 7.34647C25.2617 7.8227 25.5579 8.2661 26.0162 8.40409L27.6865 8.90697C28.2919 9.08926 28.5783 9.7807 28.2791 10.3377L27.4537 11.8744C27.2272 12.296 27.3312 12.819 27.7018 13.1219L29.0525 14.2257C29.5421 14.6258 29.5421 15.3742 29.0525 15.7743L27.7018 16.8781C27.3312 17.181 27.2272 17.704 27.4537 18.1256L28.2791 19.6623C28.5783 20.2193 28.2919 20.9107 27.6865 21.093L26.0162 21.5959C25.5579 21.7339 25.2617 22.1773 25.3096 22.6535L25.4841 24.3891C25.5474 25.0182 25.0182 25.5474 24.3891 25.4841L22.6535 25.3096C22.1773 25.2617 21.7339 25.5579 21.5959 26.0162L21.093 27.6865C20.9107 28.2919 20.2193 28.5783 19.6623 28.2791L18.1256 27.4537C17.704 27.2272 17.181 27.3312 16.8781 27.7018L15.7743 29.0525C15.3742 29.5421 14.6258 29.5421 14.2257 29.0525L13.1219 27.7018C12.819 27.3312 12.296 27.2272 11.8744 27.4537L10.3377 28.2791C9.7807 28.5783 9.08926 28.2919 8.90697 27.6865L8.40409 26.0162C8.2661 25.5579 7.8227 25.2617 7.34647 25.3096L5.61093 25.4841C4.98179 25.5474 4.45258 25.0182 4.51587 24.3891L4.69044 22.6535C4.73834 22.1773 4.44207 21.7339 3.98376 21.5959L2.31352 21.093C1.70806 20.9107 1.42165 20.2193 1.72088 19.6623L2.54633 18.1256C2.77283 17.704 2.66879 17.181 2.29817 16.8781L0.947522 15.7743C0.457905 15.3742 0.457905 14.6258 0.947522 14.2257L2.29817 13.1219C2.66879 12.819 2.77283 12.296 2.54633 11.8744L1.72088 10.3377C1.42165 9.7807 1.70806 9.08926 2.31352 8.90697L3.98376 8.40409C4.44207 8.2661 4.73834 7.8227 4.69044 7.34647L4.51587 5.61093C4.45258 4.98179 4.98179 4.45258 5.61093 4.51587L7.34647 4.69044C7.8227 4.73834 8.2661 4.44207 8.40409 3.98376L8.90697 2.31352C9.08926 1.70806 9.7807 1.42165 10.3377 1.72088L11.8744 2.54633C12.296 2.77283 12.819 2.66879 13.1219 2.29817L14.2257 0.947522Z" />
                          </svg>

                          <FaArrowRight
                            size={12}
                            className="relative text-white"
                          />
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
