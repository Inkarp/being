'use client';

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiShare2 } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

const profiles = [

  {
    name: "Ovens",
    description: "Hot air ovens for drying, sterilization and thermal testing.",
    link: "/products/ovens",
    image: "/about.jpg",
    icon: "/icon1.svg",
    socials: { whatsapp: "https://wa.me/918019828999" },
  },
  {
    name: "Incubators",
    description: "Controlled temperature chambers for cell culture and microbiology.",
    link: "/products/incubators",
    image: "/about.jpg",
    icon: "/icon1.svg",
    socials: { whatsapp: "https://wa.me/918019828999" },
  },
  {
    name: "Shakers And Stirrers",
    description: "Orbital shakers, magnetic stirrers for uniform mixing.",
    link: "/products/shakers-and-stirrers",
    image: "/about.jpg",
    icon: "/icon1.svg",
    socials: { whatsapp: "https://wa.me/918019828999" },
  },
  {
    name: "Water Baths, Circulators and chillers",
    description: "Precision temperature-controlled baths for lab workflows.",
    link: "/products/water-baths-circulators-and-chillers",
    image: "/about.jpg",
    icon: "/icon1.svg",
    socials: { whatsapp: "https://wa.me/918019828999" },
  },
  {
    name: "Rotary Evaporators",
    description: "Efficient solvent evaporation systems for chemistry labs.",
    link: "/products/rotary-evaporators",
    image: "/about.jpg",
    icon: "/icon1.svg",
    socials: { whatsapp: "https://wa.me/918019828999" },
  },
  {
    name: "Pumps",
    description: "Vacuum and peristaltic pumps for lab applications.",
    link: "/products/pumps",
    image: "/about.jpg",
    icon: "/icon1.svg",
    socials: { whatsapp: "https://wa.me/918019828999" },
  },
];

function ProfileCard({ profile, isOpen, index, setOpenIndex }) {
  const { whatsapp } = profile.socials || {};

  return (
    <div className="w-full h-full group rounded-[30px] overflow-hidden hover:border border-[#2B7EC2] bg-white shadow-xl hover:shadow-md relative hover:scale-[1.02] transition-transform">
      <Link href={profile.link} className="block">
        <div className="bg-[#F5F5F5] p-5 h-[160px] flex flex-col justify-center">
          <div className="flex items-center mb-3">
            <div className="w-14 h-14 bg-white rounded-full grid place-items-center">
              <Image
                src={profile.icon}
                alt={`${profile.name} Icon`}
                width={40}
                height={40}
                className="group-hover:rotate-[360deg] transition-transform duration-800"
              />
            </div>
            <h3 className="text-base font-bold pl-3 text-black">
              {profile.name}
            </h3>
          </div>
          <div className="w-full h-[1px] bg-gradient-to-r from-[#2B7EC2] to-[#2B7EC2]" />
          <p className="text-xs text-black mt-2 line-clamp-3">
            {profile.description}
          </p>
        </div>

        {/* <div className="relative w-full aspect-[16/10]">
          <Image
            src={profile.image}
            alt={profile.name}
            fill
            className="object-cover"
          />
        </div> */}
      </Link>

      {/* {whatsapp && (
        <div className="absolute bottom-3 right-3">
          <div
            className="relative"
            onMouseEnter={() => setOpenIndex(index)}
            onMouseLeave={() => setOpenIndex(null)}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center"
            >
              <FiShare2 size={18} />
            </button>

            <div
              className={`absolute right-12 top-1/2 -translate-y-1/2 flex gap-2 transition-all duration-300 ${
                isOpen
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-6 pointer-events-none"
              }`}
            >
              <a
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-green-500 text-white rounded-full"
              >
                <FaWhatsapp size={18} />
              </a>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
}

export default function productsPage() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="relative w-[98%] mx-auto py-5">
      <div className="text-center">
        <h1 className="text-3xl font-bold font-[MaxOT]">
          Explore Our <span className="text-[#E63946]">Scientific products</span>
        </h1>
        <p className="mt-4 text-lg text-gray-700">
          From research to production, discover how our solutions support every lab need.
        </p>
      </div>

      <div className="w-full py-3 flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 w-full max-w-5xl">
          {profiles.map((profile, index) => (
            <div key={index} className="max-w-[350px] w-full mx-auto">
              <ProfileCard
                profile={profile}
                index={index}
                isOpen={openIndex === index}
                setOpenIndex={setOpenIndex}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
