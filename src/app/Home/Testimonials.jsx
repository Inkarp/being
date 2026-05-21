"use client";

import Image from "next/image";
import React from "react";
import { FaQuoteRight, FaUser } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    name: "Shalin Chaappan",
    role: "Customer",
    text: "The service was good, and the customer support was amazing for all the equipment present in our lab. The service engineer was also very professional. While quality and cost are important when purchasing equipment, reliable future support is equally important. That kind of support is what we received from Inkarp. Keep up the spirit.",
  },
  {
    id: 2,
    name: "Manu Eswar",
    role: "Customer",
    text: "Good service was delivered for the Being chillers we purchased from Inkarp Instruments. The demonstration was also clear and helpful. Thank you.",
  },
  {
    id: 3,
    name: "Ramesh Ponnam",
    role: "Customer",
    text: "The Being Instruments equipment is working well, and the service provided was good.",
  },
  {
    id: 4,
    name: "Gokul G",
    role: "Customer",
    text: "We are using a Being rotary evaporator in our purification lab, and it is working well. Inkarp provides timely support for preventive maintenance and service requests, and their team handles everything professionally.",
  },
  {
    id: 5,
    name: "Apurv Uday Rakhonde",
    role: "Customer",
    text: "The Being chiller is working properly, and we are satisfied with its performance.",
  },
  {
    id: 6,
    name: "Dnyaneshwar Chaudhari",
    role: "Customer",
    text: "The Being chiller is working well. It was checked by Mr. Afroj, and his service work was satisfactory.",
  },
  {
    id: 7,
    name: "Vembu K",
    role: "Customer",
    text: "The instrument was installed successfully, and the demo was explained clearly. The equipment is working well.",
  },
  {
    id: 8,
    name: "Sanjeev Regula",
    role: "Customer",
    text: "We received good service for the Being chiller and rotary evaporator. The support experience was satisfactory.",
  },
  {
    id: 9,
    name: "Vaishnavi Thakare",
    role: "Customer",
    text: "We received good service for the Being vacuum pump. The support provided was helpful and satisfactory.",
  },
  {
    id: 10,
    name: "Rinku Varshney",
    role: "Customer",
    text: "The Being Instruments engineer visited for the installation, and the overall service experience was very good.",
  },
  {
    id: 11,
    name: "Prateek Sachan",
    role: "Customer",
    text: "The Being rotary evaporator is a very nice instrument, and the service engineer handled the work very well.",
  },
  {
    id: 12,
    name: "Devika Krishnan",
    role: "Customer",
    text: "We are satisfied with the overall quality of installation and maintenance of the instruments. Thank you for the timely servicing, which helps support uninterrupted performance.",
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
      style={{
        perspective: '1200px',
        background: 'linear-gradient(160deg, #275c9c 0%, #6cacdf 50%, #f0f7ff 100%)'
      }}
      className="overflow-hidden relative min-h-[500px] grid grid-cols-1 lg:grid-cols-12 place-content-center lg:place-items-center lg:gap-10 mx-auto  border-b border-white"
    >
      {/* LEFT CONTENT */}
      <div className="relative z-10 p-5 lg:mb-0 col-span-6">
        <div className="hidden xl:block absolute top-[-6rem] left-[-5rem] w-64 h-64 bg-[#2F4191]/50 hover:scale-110 transition-transform duration-300 rounded-full"></div>

        <h1 className="relative z-10 text-3xl text-white sm:text-5xl 2xl:text-6xl font-bold sm:leading-snug 2xl:leading-tight">
          What our customers <br /> say about us.
        </h1>

        <p className="mt-4 mb-7 text-white max-w-sm 2xl:text-lg">
          Customers know what we are {" "}
          <span className="text-black  hover:underline cursor-pointer">
            Being
          </span>{" "}
          to understand their business and customers better.
        </p>
      </div>

      {/* RIGHT TESTIMONIAL CARDS */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-5 col-span-6 p-5">
        {visible.map((item, idx) => (
          <div
            key={`${item.id}-${startIndex}-${idx}`}
            className="relative bg-white shadow-[0_5px_30px_-15px_rgba(0,0,0,0.3)] rounded-xl flex flex-col lg:flex-row lg:items-center justify-between gap-10 p-7 hover:shadow-xl transition duration-300 animate-flip-cube"
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