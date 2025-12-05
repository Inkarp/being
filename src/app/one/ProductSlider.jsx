'use client';

import { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const features = [
  {
    title: 'Incubators',
    items: [
      'BIF Series – Mechanical Convection Incubators',
      'BIT Series – Natural Convection Incubators',
      'BIC Series – Cooling Incubators',
      'BIO Series – CO₂ Incubators',
    ],
  },
  {
    title: 'Ovens',
    items: [
      'BOF Series – Mechanical Convection Ovens',
      'BON Series – Natural Convection Ovens',
      'BOV Series – Vacuum Ovens',
    ],
  },
  {
    title: 'Shakers & Stirrers',
    items: [
      'BS Series – Orbital Shakers',
      'BIS Series – Incubated Shakers',
      'BS/BIS Series – Shaker Accessories',
      'BMS Series – Square Magnetic Heated Stirrers',
    ],
  },
  {
    title: 'Evaporators',
    items: ['BRE Series – Rotary Evaporators'],
  },
  {
    title: 'Water Baths, Circulators & Chillers',
    items: [
      'BWB Series – General Purpose Water Bath',
      'BWB Series – Accessories',
      'BPC Series – Heat/Cooling Circulating Bath',
      'BRC Series – Recirculating Chiller',
    ],
  },
  {
    title: 'Pumps',
    items: ['V Series – Diaphragm Pumps'],
  },
  {
    title: 'Outside of U.S. Market Products',
    items: [
      'DZF-6032 Vacuum Oven',
      '-86°C Ultra Low Temperature Freezer',
    ],
  },
];

export default function ProductSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerSlide = 2;

  const nextSlide = () => {
    if (currentIndex + itemsPerSlide < features.length) {
      setCurrentIndex((prev) => prev + itemsPerSlide);
    }
  };

  const prevSlide = () => {
    if (currentIndex - itemsPerSlide >= 0) {
      setCurrentIndex((prev) => prev - itemsPerSlide);
    }
  };

  const visibleFeatures = features.slice(currentIndex, currentIndex + itemsPerSlide);

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-[#2B7EC2]">Our Product Features</h2>
          <div className="flex gap-2">
            <button
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className="p-2 bg-white border rounded-full hover:bg-[#2B7EC2] hover:text-white transition disabled:opacity-40"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={nextSlide}
              disabled={currentIndex + itemsPerSlide >= features.length}
              className="p-2 bg-white border rounded-full hover:bg-[#2B7EC2] hover:text-white transition disabled:opacity-40"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {visibleFeatures.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white border rounded-lg shadow hover:shadow-md transition-all p-6"
            >
              <h3 className="text-xl font-semibold text-[#2B7EC2] mb-3">{feature.title}</h3>
              <ul className="text-gray-700 list-disc list-inside space-y-1 text-sm">
                {feature.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* View All Button */}
        {currentIndex + itemsPerSlide >= features.length && (
          <div className="mt-10 flex justify-center">
            <button className="bg-[#2B7EC2] text-white px-6 py-3 rounded-full hover:bg-[#1E5F9C] transition">
              View All Features
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
