'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { FaArrowRight } from 'react-icons/fa';
import Image from 'next/image';

export default function RelatedModels({
  subcategories = [],
  categorySlug,
  currentSubSlug,
}) {
  const router = useRouter();
  const sliderRef = useRef(null);

  /* EXCLUDE CURRENT SUBCATEGORY */
  const relatedSubs = subcategories.filter(
    (sub) => sub.slug !== currentSubSlug && sub.models?.length
  );

  /* FLATTEN MODELS */
  const relatedModels = relatedSubs
    .flatMap((sub) =>
      sub.models.map((m) => ({
        ...m,
        subSlug: sub.slug,
      }))
    )
    .slice(0, 10);

  /* AUTO SLIDE */
  useEffect(() => {
    if (!sliderRef.current || relatedModels.length <= 3) return;

    const slider = sliderRef.current;
    const cardWidth = 300;

    const interval = setInterval(() => {
      if (
        slider.scrollLeft + slider.clientWidth >=
        slider.scrollWidth - cardWidth
      ) {
        slider.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        slider.scrollBy({ left: cardWidth, behavior: 'smooth' });
      }
    }, 3500);

    return () => clearInterval(interval);
  }, [relatedModels.length]);

  if (!relatedModels.length) return null;

  return (
    <section className="max-w-7xl mx-auto py-10 mt-5 border-t border-gray-200">
      {/* HEADER */}
      <div className=" text-center py-3">
        <h3 className="text-2xl sm:text-3xl font-semibold text-gray-900">
          Related Products
        </h3>
        <p className="text-sm text-gray-600 mt-2 max-w-xl mx-auto">
          Explore alternative models and related solutions from other categories
        </p>
      </div>

      {/* SLIDER */}
      <div className="relative">
        {/* FADE EDGES */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-12 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-white to-transparent z-10" />

        <div
          ref={sliderRef}
          className="
            flex gap-6
            overflow-x-auto scroll-smooth
            pb-6 px-2
            scrollbar-hide
          "
        >
          {relatedModels.map((model) => (
            <div
              key={`${model.subSlug}-${model.meta.slug}`}
              onClick={() =>
                router.push(
                  `/products/${categorySlug}/${model.subSlug}/${model.meta.slug}`
                )
              }
              className="
                group shrink-0 w-[280px] h-[450px]
                rounded-2xl cursor-pointer
                bg-white border border-gray-200
                shadow-sm hover:shadow-xl
                transition-all duration-300
                hover:-translate-y-1
              "
            >
              {/* IMAGE */}
              <div className="relative h-auto rounded-t-2xl bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4 overflow-hidden">
                <Image
                  src={model.thumbnail}
                  alt={model.title}
                  width={400}
                  height={300}
                  className="
                    max-h-full object-contain
                    transition-transform duration-300
                    group-hover:scale-105
                  "
                  loading="lazy"
                />
              </div>

                <div className="flex flex-col gap-5 items-center justify-between">
                  <h4 className="text-sm py-1 font-semibold text-gray-900 line-clamp-2">
                    {model.title}

                  </h4>
                  <button
                        type="button"
                        className="inline-flex items-center justify-between gap-3 px-3 py-1.5 border border-[#2F4191] rounded-full hover:bg-[#2F4191]/5 transition"
                      >
                        <span className="text-xs font-medium text-[#2F4191] pl-1">
                          View details
                        </span>

                        <div className="relative text-[#2F4191]">
                          {/* Only SVG spins */}
                          <svg
                            className="spin-slow "
                            width="30"
                            height="30"
                            viewBox="0 0 30 30"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M14.2257 0.947522C14.6258 0.457905 15.3742 0.457905 15.7743 0.947522L16.8781 2.29817C17.181 2.66879 17.704 2.77283 18.1256 2.54633L19.6623 1.72088C20.2193 1.42165 20.9107 1.70806 21.093 2.31352L21.5959 3.98376C21.7339 4.44207 22.1773 4.73834 22.6535 4.69044L24.3891 4.51587C25.0182 4.45258 25.5474 4.98179 25.4841 5.61093L25.3096 7.34647C25.2617 7.8227 25.5579 8.2661 26.0162 8.40409L27.6865 8.90697C28.2919 9.08926 28.5783 9.7807 28.2791 10.3377L27.4537 11.8744C27.2272 12.296 27.3312 12.819 27.7018 13.1219L29.0525 14.2257C29.5421 14.6258 29.5421 15.3742 29.0525 15.7743L27.7018 16.8781C27.3312 17.181 27.2272 17.704 27.4537 18.1256L28.2791 19.6623C28.5783 20.2193 28.2919 20.9107 27.6865 21.093L26.0162 21.5959C25.5579 21.7339 25.2617 22.1773 25.3096 22.6535L25.4841 24.3891C25.5474 25.0182 25.0182 25.5474 24.3891 25.4841L22.6535 25.3096C22.1773 25.2617 21.7339 25.5579 21.5959 26.0162L21.093 27.6865C20.9107 28.2919 20.2193 28.5783 19.6623 28.2791L18.1256 27.4537C17.704 27.2272 17.181 27.3312 16.8781 27.7018L15.7743 29.0525C15.3742 29.5421 14.6258 29.5421 14.2257 29.0525L13.1219 27.7018C12.819 27.3312 12.296 27.2272 11.8744 27.4537L10.3377 28.2791C9.7807 28.5783 9.08926 28.2919 8.90697 27.6865L8.40409 26.0162C8.2661 25.5579 7.8227 25.2617 7.34647 25.3096L5.61093 25.4841C4.98179 25.5474 4.45258 25.0182 4.51587 24.3891L4.69044 22.6535C4.73834 22.1773 4.44207 21.7339 3.98376 21.5959L2.31352 21.093C1.70806 20.9107 1.42165 20.2193 1.72088 19.6623L2.54633 18.1256C2.77283 17.704 2.66879 17.181 2.29817 16.8781L0.947522 15.7743C0.457905 15.3742 0.457905 14.6258 0.947522 14.2257L2.29817 13.1219C2.66879 12.819 2.77283 12.296 2.54633 11.8744L1.72088 10.3377C1.42165 9.7807 1.70806 9.08926 2.31352 8.90697L3.98376 8.40409C4.44207 8.2661 4.73834 7.8227 4.69044 7.34647L4.51587 5.61093C4.45258 4.98179 4.98179 4.45258 5.61093 4.51587L7.34647 4.69044C7.8227 4.73834 8.2661 4.44207 8.40409 3.98376L8.90697 2.31352C9.08926 1.70806 9.7807 1.42165 10.3377 1.72088L11.8744 2.54633C12.296 2.77283 12.819 2.66879 13.1219 2.29817L14.2257 0.947522Z" />
                          </svg>

                          {/* Static arrow centered */}
                          <FaArrowRight
                            size={12}
                            className="absolute top-1/2 left-1/2 text-white transform -translate-x-1/2 -translate-y-1/2"
                          />
                        </div>
                      </button>
             

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
