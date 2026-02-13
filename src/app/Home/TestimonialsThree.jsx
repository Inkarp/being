"use client";

import Image from "next/image";

const testimonials = [
  {
    id: 1,
    name: "Timothy Quano",
    role: "Symph, Designer",
    image:
      "/dp.jpg",
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

export default function TestimonialsThree() {
  return (
    <section className="overflow-hidden relative min-h-screen grid grid-cols-1 lg:grid-cols-12 place-content-center lg:place-items-center lg:gap-16  mx-auto px-6 py-16">

      {/* LEFT CONTENT */}
      <div className="relative z-10 mb-10 lg:mb-0 col-span-6">

        <div className="hidden xl:block absolute top-[-6rem] left-[-5rem] w-64 h-64 bg-[#2F4191]/30 hover:scale-110 transition-transform duration-300 rounded-full"></div>

        <h1 className="relative z-10 text-3xl sm:text-5xl 2xl:text-6xl font-bold sm:leading-snug 2xl:leading-tight">
          Bringing value <br /> across different brands.
        </h1>

        <p className="mt-4 mb-7 text-gray-500 max-w-sm 2xl:text-lg">
          Over 7 brands in all sizes use{" "}
          <span className="text-red-400 hover:underline cursor-pointer">
            Branchify
          </span>{" "}
          to understand their business and customers better.
        </p>

        <button className="inline-block rounded-full bg-red-50 py-2.5 px-10 font-bold text-red-500 hover:shadow-lg transition">
          Read success stories
        </button>
      </div>

      {/* RIGHT TESTIMONIAL CARDS */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-5 col-span-6">

        {testimonials.map((item) => (
          <div
            key={item.id}
            className="relative bg-white shadow-[0_5px_30px_-15px_rgba(0,0,0,0.3)] rounded-sm flex flex-col lg:flex-row lg:items-center justify-between gap-10 p-7 hover:shadow-xl transition duration-300"
          >
            {/* TEXT */}
            <div>
              {/* Quote SVG */}
              <svg
                viewBox="0 0 475.082 475.081"
                width="25"
                height="25"
                className="mb-3 fill-current text-[#2F4191]"
              >
                <path d="M164.45 219.27h-63.954c-7.614 0-14.087-2.664-19.417-7.994-5.327-5.33-7.994-11.801-7.994-19.417v-9.132c0-20.177 7.139-37.401 21.416-51.678 14.276-14.272 31.503-21.411 51.678-21.411h18.271c4.948 0 9.229-1.809 12.847-5.424 3.616-3.617 5.424-7.898 5.424-12.847V54.819c0-4.948-1.809-9.233-5.424-12.85-3.617-3.612-7.898-5.424-12.847-5.424h-18.271c-19.797 0-38.684 3.858-56.673 11.563-17.987 7.71-33.545 18.132-46.68 31.267-13.134 13.129-23.553 28.688-31.262 46.677C3.855 144.039 0 162.931 0 182.726v200.991c0 15.235 5.327 28.171 15.986 38.834 10.66 10.657 23.606 15.985 38.832 15.985h109.639c15.225 0 28.167-5.328 38.828-15.985 10.657-10.663 15.987-23.599 15.987-38.834V274.088c0-15.232-5.33-28.168-15.994-38.832C192.622 224.6 179.675 219.27 164.45 219.27z" />
                
              </svg>

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
              <Image
                src={item.image}
                alt={item.name}
                width={112}
                height={112}
                className="rounded-full object-cover w-24 h-24 2xl:w-28 2xl:h-28"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#deb2b280] to-[#deb2b280]"></div>
            </div>
          </div>
        ))}

        {/* Decorative Circle */}
        {/* <div className="hidden xl:block absolute bottom-[-6rem] right-[25rem] w-72 h-72 bg-red-50 rounded-full"></div> */}
      </div>
    </section>
  );
}
