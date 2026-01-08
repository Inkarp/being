'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { FaArrowRight } from 'react-icons/fa';

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
    <section className="max-w-7xl mx-auto py-14 mt-20 border-t border-gray-200">
      {/* HEADER */}
      <div className="mb-10 text-center">
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
                group shrink-0 w-[280px] h-[360px]
                rounded-2xl cursor-pointer
                bg-white border border-gray-200
                shadow-sm hover:shadow-xl
                transition-all duration-300
                hover:-translate-y-1
              "
            >
              {/* IMAGE */}
              <div className="relative h-[190px] rounded-t-2xl bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4 overflow-hidden">
                <img
                  src={model.meta.thumbnail}
                  alt={model.meta.title}
                  className="
                    max-h-full object-contain
                    transition-transform duration-300
                    group-hover:scale-105
                  "
                  loading="lazy"
                />
              </div>

              {/* CONTENT */}
              <div className="p-5 flex flex-col justify-between h-[170px]">
                <h4 className="text-sm font-semibold text-gray-900 line-clamp-2">
                  {model.meta.title}
                </h4>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    Explore details
                  </span>

                  <span
                    className="
                      inline-flex items-center gap-2
                      text-sm font-medium text-[#2F4191]
                      group-hover:gap-3 transition-all
                    "
                  >
                    View Model
                    <FaArrowRight size={12} />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
