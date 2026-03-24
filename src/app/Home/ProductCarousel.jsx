'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const PRODUCTS = [
  {
    name: 'FT-IR Spectrometer',
    image: '/testImg.webp',
    installs: [
      { name: 'Biocon Limited', logo: "/BangloreUniversity.jpg" },
      { name: 'Indian Scientific Company', logo: "/BangloreUniversity.jpg" },
      { name: 'Bangalore University', logo: "/BangloreUniversity.jpg" },
    ],
  },
  {
    name: 'HPLC System',
    image: '/testImg.webp',
    installs: [
      { name: 'IISc Bangalore', logo: "/BangloreUniversity.jpg" },
      { name: 'Asian Paints', logo: "/BangloreUniversity.jpg" },
      { name: 'Dr Reddy Labs', logo: "/BangloreUniversity.jpg" },
    ],
  },
  {
    name: 'Gas Chromatograph',
    image: '/testImg.webp',
    installs: [
      { name: 'Sun Pharma', logo: "/BangloreUniversity.jpg" },
      { name: 'Cipla', logo: "/asian-paints-logo.avif" },
      { name: 'Reliance Labs', logo: "/BangloreUniversity.jpg" },
    ],
  },
  {
    name: 'UV-Vis Spectrophotometer',
    image: '/testImg.webp',
    installs: [
      { name: 'Infosys Labs', logo:  "/asian-paints-logo.avif" },
      { name: 'Wipro', logo:  "/BangloreUniversity.jpg"},
      { name: 'HCL', logo: "/asian-paints-logo.avif"},
    ],
  },
];

export default function ProductCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % PRODUCTS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const prev = () => {
    setIndex((prev) => (prev - 1 + PRODUCTS.length) % PRODUCTS.length);
  };

  const next = () => {
    setIndex((prev) => (prev + 1) % PRODUCTS.length);
  };

  const activeProduct = PRODUCTS[index];

  return (
    <div className="bg-gradient-to-b from-[#eef2f7] to-white py-16 px-6">
      {/* HEADER */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
          Trusted by 2000+ Customers
        </h1>
        <p className="text-gray-500 mt-3">
            Powering 2000+ Businesses Indiawide 🌍
        </p>
      </div>

      {/* CAROUSEL */}
      <div className="relative max-w-6xl mx-auto flex items-center justify-center">
        <button
          onClick={prev}
          className="absolute left-0 z-10 bg-white shadow rounded-full w-10 h-10 flex items-center justify-center hover:scale-110 transition"
        >
          ‹
        </button>

        <div className="flex items-center gap-6 overflow-hidden">
          {PRODUCTS.map((product, i) => {
            const position = (i - index + PRODUCTS.length) % PRODUCTS.length;

            let style = '';
            if (position === 0) style = 'scale-110 z-10';
            else if (position === 1 || position === PRODUCTS.length - 1)
              style = 'scale-90 opacity-70';
            else style = 'scale-75 opacity-40';

            return (
              <div key={i} className={`relative transition-all duration-500 ${style}`}>
                <div className="w-[250px] bg-white rounded-2xl shadow-lg overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={250}
                    height={200}
                    className="w-full object-cover"
                  />

                  <div className="bg-blue-100 text-center py-2 font-semibold text-gray-700">
                    {product.name}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={next}
          className="absolute right-0 z-10 bg-white shadow rounded-full w-10 h-10 flex items-center justify-center hover:scale-110 transition"
        >
          ›
        </button>
      </div>

      {/* DOTS */}
      <div className="flex justify-center gap-2 mt-8">
        {PRODUCTS.map((_, i) => (
          <div
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2 rounded-full cursor-pointer transition-all ${
              i === index ? 'bg-blue-500 w-6' : 'bg-gray-300 w-2'
            }`}
          />
        ))}
      </div>

      {/* LOGOS BASED ON ACTIVE PRODUCT */}
      <div className="mt-16 max-w-4xl mx-auto flex flex-wrap justify-center gap-6">
        {activeProduct.installs.map((item, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow px-6 py-4 flex items-center gap-3"
          >
            <Image src={item.logo} alt={item.name} width={40} height={40} />
            <span className="text-sm font-medium text-gray-700">
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}