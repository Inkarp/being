"use client";

import { useState } from "react";

const testimonials = [
  {
    id: 1,
    initials: "JD",
    name: "John Doe",
    role: "CEO, ABC Inc.",
    text: `Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment.`,
  },
  {
    id: 2,
    initials: "WD",
    name: "Winter Doe",
    role: "CTO, XYZ Corp.",
    text: `Bring to the table win-win survival strategies to ensure proactive domination. At the end of the day, going forward, a new normal that has evolved from generation X is on the runway heading towards a streamlined cloud solution.`,
  },
  {
    id: 3,
    initials: "JW",
    name: "John Wick",
    role: "Product Manager, Fake Corp.",
    text: `Capitalize on low hanging fruit to identify a ballpark value added activity to beta test. Override the digital divide with additional clickthroughs from DevOps.`,
  },
];

export default function TestimonialsTwo() {
  const [active, setActive] = useState(2);

  const prevSlide = () => {
    setActive((prev) => (prev === 1 ? testimonials.length : prev - 1));
  };

  const nextSlide = () => {
    setActive((prev) =>
      prev === testimonials.length ? 1 : prev + 1
    );
  };

  const current = testimonials.find((t) => t.id === active);

  return (
    <section className="bg-gray-200 py-16 px-4">
      <div className="container mx-auto flex flex-col md:flex-row shadow-sm overflow-hidden">

        {/* LEFT SIDE */}
        <div className="relative w-full md:w-1/2 bg-[#2F4191] flex flex-col justify-center py-16">

          {/* Decorative grid */}
          <div className="absolute top-0 left-0 w-24 h-24 bg-[radial-gradient(#2F4191_2px,transparent_2px)] bg-[size:16px_16px] opacity-40"></div>

          <div className="relative text-3xl md:text-5xl text-indigo-100 font-semibold leading-tight tracking-tight px-8 md:px-16">
            <span className="block">What Our</span>
            <span className="block">Customers</span>
            <span className="block">Are Saying!</span>
          </div>

          {/* Arrows (Desktop only) */}
          <div className="absolute right-0 bottom-0 mr-6 mb-6 hidden md:flex">
            <button
              onClick={prevSlide}
              className="rounded-l-full border-r bg-gray-100 text-gray-500 hover:text-indigo-500 font-bold w-12 h-10"
            >
              ←
            </button>
            <button
              onClick={nextSlide}
              className="rounded-r-full bg-gray-100 text-gray-500 hover:text-indigo-500 font-bold w-12 h-10"
            >
              →
            </button>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="bg-gray-100 md:w-1/2 flex flex-col justify-between relative">

          {/* Quote Icon */}
          <div className="absolute top-6 left-8 text-indigo-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-12 h-12 fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M6.5 10c-.223 0-.437.034-.65.065.069-.232.14-.468.254-.68.114-.308.292-.575.469-.844.148-.291.409-.488.601-.737.201-.242.475-.403.692-.604.213-.21.492-.315.714-.463.232-.133.434-.28.65-.35.208-.086.39-.16.539-.222.302-.125.474-.197.474-.197L9.758 4.03c0 0-.218.052-.597.144C8.97 4.222 8.737 4.278 8.472 4.345c-.271.05-.56.187-.882.312C7.272 4.799 6.904 4.895 6.562 5.123c-.344.218-.741.4-1.091.692C5.132 6.116 4.723 6.377 4.421 6.76c-.33.358-.656.734-.909 1.162C3.219 8.33 3.02 8.778 2.81 9.221c-.19.443-.343.896-.468 1.336-.237.882-.343 1.72-.384 2.437-.034.718-.014 1.315.028 1.747.015.204.043.402.063.539.017.109.025.168.025.168l.026-.006C2.535 17.474 4.338 19 6.5 19c2.485 0 4.5-2.015 4.5-4.5S8.985 10 6.5 10zM17.5 10c-.223 0-.437.034-.65.065.069-.232.14-.468.254-.68.114-.308.292-.575.469-.844.148-.291.409-.488.601-.737.201-.242.475-.403.692-.604.213-.21.492-.315.714-.463.232-.133.434-.28.65-.35.208-.086.39-.16.539-.222.302-.125.474-.197.474-.197L20.758 4.03c0 0-.218.052-.597.144-.191.048-.424.104-.689.171-.271.05-.56.187-.882.312-.317.143-.686.238-1.028.467-.344.218-.741.4-1.091.692-.339.301-.748.562-1.05.944-.33.358-.656.734-.909 1.162C14.219 8.33 14.02 8.778 13.81 9.221c-.19.443-.343.896-.468 1.336-.237.882-.343 1.72-.384 2.437-.034.718-.014 1.315.028 1.747.015.204.043.402.063.539.017.109.025.168.025.168l.026-.006C13.535 17.474 15.338 19 17.5 19c2.485 0 4.5-2.015 4.5-4.5S19.985 10 17.5 10z"/>
            </svg>
          </div>

          {/* Text */}
          <div className="relative z-10">
            <p className="serif italic text-gray-600 text-lg md:text-2xl px-8 md:px-16 py-12 transition-all duration-500">
              {current.text}
            </p>
          </div>

          {/* Initials Selector */}
          <div className="flex justify-center items-center my-6">
            {testimonials.map((t) => (
              <button
                key={t.id}
                onClick={() => setActive(t.id)}
                className={`mx-2 rounded-full font-bold transition-all duration-300
                  ${
                    active === t.id
                      ? "h-16 w-16 bg-indigo-600 text-white opacity-100"
                      : "h-12 w-12 bg-indigo-300 text-gray-600 opacity-25"
                  }
                `}
              >
                {t.initials}
              </button>
            ))}
          </div>

          {/* Name & Role */}
          <div className="text-center pb-10">
            <h2 className="text-base font-bold text-gray-700">
              {current.name}
            </h2>
            <small className="text-gray-500 text-sm">
              {current.role}
            </small>
          </div>
        </div>
      </div>
    </section>
  );
}
