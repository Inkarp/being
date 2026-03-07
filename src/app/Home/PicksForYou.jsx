"use client";

import Image from "next/image";

const products = [
  {
    badge: "CASHBACK | BEST SELLER",
    model: "55UA82006LA",
    title: "LG 139 cm (55) 4K UHD AI UA8200 Smart TV with a7...",
    rating: "4.7",
    reviews: "143",
  },
  {
    badge: "CASHBACK | 2026 Model",
    model: "AS-Q18JNXE",
    title: "LG 3 Star (1.5) Split AC, AI Convertible 6-in-1 Cooling,...",
    rating: "3.3",
    reviews: "3",
  },
  {
    badge: "CASHBACK | BEST SELLER",
    model: "FHP1209Z5M",
    title: "LG 9Kg Front Load Washing Machine, AI Direct Drive™,...",
    rating: "4.4",
    reviews: "45",
  },
  {
    badge: "LIMITED QUANTITY | BEST SELLER",
    model: "GL-I292RPZX",
    title: "LG 242L Double Door Refrigerator with Door...",
    rating: "4.6",
    reviews: "31",
  },
];

export default function PicksForYou() {
  return (
    <section className="bg-[#2B7EC2] py-14">
      <div className="max-w-[1400px] mx-auto px-6">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-5xl text-white font-semibold tracking-tight">
            PICKS FOR YOU:
          </h2>

          <div className="flex items-center gap-6">
            <span className="text-lg text-gray-600">1 / 7</span>
            <div className="w-12 h-12 border rounded-full flex items-center justify-center text-gray-500">
              ‹
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-10 mb-10 text-lg">
          <button className="border-b-2 border-white pb-1 font-medium text-white backdrop-blur-md bg-white/20 px-4 py-2 rounded-full transition">
            All 
          </button>
          <button className="text-gray-300 backdrop-blur-md bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition hover:text-white">Popular</button>
          <button className="text-gray-300 backdrop-blur-md bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition hover:text-white">Newest</button>
        </div>

         {/* <div className="flex gap-4 mb-10 text-lg pb-2">
          <button className="border-b-2 border-white pb-1 font-medium text-white backdrop-blur-md bg-white/20 px-4 py-2 rounded-full transition flex-shrink-0">
            Ovens
          </button>
          <button className="text-gray-300 backdrop-blur-md bg-white/20 px-4 py-2 rounded-full transition hover:text-white hover:bg-white/30 flex-shrink-0">Incubators</button>
          <button className="text-gray-300 backdrop-blur-md bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition hover:text-white flex-shrink-0">Water baths</button>
          <button className="text-gray-300 backdrop-blur-md bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition hover:text-white flex-shrink-0">Chillers</button>
          <button className="text-gray-300 backdrop-blur-md bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition hover:text-white flex-shrink-0">Rotary Evaporators</button>
          <button className="text-gray-300 backdrop-blur-md bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition hover:text-white flex-shrink-0">Pumps</button>
          <button className="text-gray-300 backdrop-blur-md bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition hover:text-white flex-shrink-0">Cabinet</button>
          <button className="text-gray-300 backdrop-blur-md bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition hover:text-white flex-shrink-0">Freezers</button>
           <button className="text-gray-300 backdrop-blur-md bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition hover:text-white flex-shrink-0">Digital Viscometers</button>
            <button className="text-gray-300 backdrop-blur-md bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition hover:text-white flex-shrink-0">Muffle Furnance</button>
        </div> */}

        {/* Products Grid */}
        <div className="grid grid-cols-4 gap-8">
          {products.map((product, i) => (
            <div
              key={i}
              className="bg-[#f5f5f5] rounded-[28px] p-6 flex flex-col justify-between min-h-[520px]"
            >
              <div>
                {/* Badge */}
                <p className="text-red-600 text-sm font-medium mb-3">
                  {product.badge}
                </p>

                {/* Model */}
                <p className="text-sm text-gray-500 mb-1">
                  {product.model}
                </p>

                {/* Title */}
                <h3 className="text-lg leading-snug mb-3">
                  {product.title}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-2 text-sm mb-3">
                  <span className="text-yellow-500">★★★★★</span>
                  <span className="text-gray-700">
                    {product.rating} ({product.reviews})
                  </span>
                </div>
              </div>

              {/* Image */}
              <div className="flex justify-center items-end mt-6">
                <Image
                  src="/testImg.webp"
                  alt="product"
                  width={260}
                  height={260}
                  className="object-contain"
                />
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}