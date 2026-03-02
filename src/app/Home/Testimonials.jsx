"use client";

import Image from "next/image";
import React from "react";
import { FaQuoteRight, FaUser } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    name: "Timothy Quano",
    role: "Symph, Designer",
    // image:
    //   "/dp.jpg",
    text: "This product really helped my brand expand in a very manageable way. Would really use this for any future expansion.",
  },
  {
    id: 2,
    name: "Jane Doe",
    role: "ANI, CEO",
    image:
      "/dp.jpg",
    text: "Scalability will never be an issue now for my brand!",
  },
  {
    id: 3,
    name: "Rowen Smith",
    role: "Golden Bowl, CEO",
    image:
      "/dp.jpg",
    text: "The product is really easy to use that I didn't have to set training for my employees.",
  },
];

export default function Testimonials() {
  const [startIndex, setStartIndex] = React.useState(0);

  // show two items at a time and wrap around the list
  const visible = React.useMemo(() => {
    const slice = testimonials.slice(startIndex, startIndex + 2);
    if (slice.length < 2) {
      return [...slice, ...testimonials.slice(0, 2 - slice.length)];
    }
    return slice;
  }, [startIndex]);

  // auto advance the start index every 3 seconds
  React.useEffect(() => {
    const interval = setInterval(() => {
      setStartIndex((prev) => (prev + 1) % testimonials.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      style={{ perspective: '1200px' }}
      className="overflow-hidden relative min-h-[500px]  grid grid-cols-1 lg:grid-cols-12 place-content-center lg:place-items-center lg:gap-10 mx-auto px-6 py-10 border border-gray-200 rounded-2xl shadow-3xl"
    >
      {/* LEFT CONTENT */}
      <div className="relative z-10 mb-10 lg:mb-0 col-span-6">
        <div className="hidden xl:block absolute top-[-6rem] left-[-5rem] w-64 h-64 bg-[#2F4191]/50 hover:scale-110 transition-transform duration-300 rounded-full"></div>

        <h1 className="relative z-10 text-3xl sm:text-5xl 2xl:text-6xl font-bold sm:leading-snug 2xl:leading-tight">
          What our customers <br/> say about us.
        </h1>

        <p className="mt-4 mb-7 text-gray-500 max-w-sm 2xl:text-lg">
         Customers know what we are {" "}
          <span className="text-[#2F4191] hover:underline cursor-pointer">
            Being
          </span>{" "}
          to understand their business and customers better.
        </p>

        <button className="inline-block rounded-full bg-[#2F4191] py-2.5 px-10 font-bold text-white hover:shadow-lg transition">
          Read success stories
        </button>
      </div>

      {/* RIGHT TESTIMONIAL CARDS */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-5 col-span-6">
        {visible.map((item, idx) => (
          <div
            key={`${item.id}-${startIndex}-${idx}`}
            className="relative bg-[#2F4191]/10 shadow-[0_5px_30px_-15px_rgba(0,0,0,0.3)] rounded-xl flex flex-col lg:flex-row lg:items-center justify-between gap-10 p-7 hover:shadow-xl transition duration-300 animate-flip-cube"
            style={{ transformStyle: 'preserve-3d', backfaceVisibility: 'hidden' }}
          >
            {/* TEXT */}
            <div >
              <FaQuoteRight className="text-[#2F4191] mb-3" />
              <p className="my-3 text-gray-700 2xl:text-lg">
                {item.text}
              </p>

              <p className="text-gray-400">
                <span className="text-gray-900 capitalize font-bold">
                  {item.name}
                </span>{" "}
                — {item.role}
              </p>
            </div>

            {/* IMAGE */}
            <div className="relative shrink-0">
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.name}
                  width={112}
                  height={112}
                  className="rounded-full object-cover w-24 h-24 2xl:w-28 2xl:h-28"
                />
              ) : (
                <div className="w-24 h-24 2xl:w-28 2xl:h-28 rounded-full bg-gray-300 flex items-center justify-center text-xl font-bold text-gray-700">
                  {item.name ? item.name.charAt(0).toUpperCase() : ""}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}