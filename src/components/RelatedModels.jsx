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

  // EXCLUDE current subcategory
  const relatedSubs = subcategories.filter(
    (sub) => sub.slug !== currentSubSlug && sub.models?.length
  );

  // Flatten models (limit for UX)
  const relatedModels = relatedSubs
    .flatMap((sub) =>
      sub.models.map((m) => ({
        ...m,
        subSlug: sub.slug,
      }))
    )
    .slice(0, 10); // control how many you want

  // Auto slide
  useEffect(() => {
    if (!sliderRef.current || relatedModels.length <= 3) return;

    const slider = sliderRef.current;
    const cardWidth = 280;

    const interval = setInterval(() => {
      if (
        slider.scrollLeft + slider.clientWidth >=
        slider.scrollWidth - cardWidth
      ) {
        slider.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        slider.scrollBy({ left: cardWidth, behavior: 'smooth' });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [relatedModels.length]);

  if (!relatedModels.length) return null;

  return (
    <section className="max-w-5xl  mx-auto py-10 border-t mt-14">
      {/* Heading */}
      <div className="mb-6 text-center">
        <h3 className="text-2xl font-semibold text-gray-900">
          Related Products
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          Explore products from other categories
        </p>
      </div>

      {/* Slider */}
      <div
        ref={sliderRef}
        className="flex gap-6 overflow-x-auto pb-4 scroll-smooth scrollbar-hide bg-gray-200"
      >
        {relatedModels.map((model) => (
          <div
             key={`${model.subSlug}-${model.meta.slug}`} // ✅ UNIQUE KEY
            className="shrink-0 w-[260px] h-[340px]
                       bg-white border border-gray-200 rounded-xl
                       hover:shadow-lg transition cursor-pointer"
            onClick={() =>
              router.push(
                `/products/${categorySlug}/${model.subSlug}/${model.meta.slug}`
              )
            }
          >
            {/* Image */}
            <div className="h-[180px] bg-gray-50 rounded-t-xl flex items-center justify-center p-4">
              <img
                src={model.meta.thumbnail}
                alt={model.meta.title}
                className="max-h-full object-contain"
                loading="lazy"
              />
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col justify-between h-[160px]">
              <h4 className="text-sm font-semibold text-gray-900 line-clamp-2">
                {model.meta.title}
              </h4>

              <div className="mt-3 flex items-center gap-2 text-[#2F4191] text-sm font-medium">
                View Model
                <FaArrowRight size={12} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
