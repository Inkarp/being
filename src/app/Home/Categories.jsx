"use client";

import { useState } from "react";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

const categories = [
  { name: "Ovens", link: "/products/ovens" },
  { name: "Incubators", link: "/products/incubators" },
  { name: "Chillers", link: "/products/chillers" },
  { name: "Water Baths", link: "/products/water-baths" },
  { name: "Rotary Evaporators", link: "/products/rotary-evaporators" },
  { name: "Pumps", link: "/products/pumps" },
  { name: "Cabinet", link: "/products/cabinet" },
  { name: "Freezers", link: "/products/freezers" },
  { name: "Digital Viscometers", link: "/products/digital-viscometers" },
  { name: "Muffle Furnace", link: "/products/muffle-furnace" },
];

export default function CategoryTabs() {
  const [active, setActive] = useState("Ovens");

  return (
    <div className="w-full flex bg-[#e6e1da] border-t border-b border-gray-200">
      {/* Left Section - 30% */}
      <div className="w-[20%] flex items-center px-8">
        <h2 className="text-2xl font-bold text-black">Products to Explore</h2>
      </div>
      {/* Right Section - 70% */}
      <div className="w-[80%] flex items-center px-8">
        {/* Tabs */}
        <div className="flex gap-8 overflow-x-auto whitespace-nowrap flex-1 py-4">

          {categories.map((item) => (
            <Link
              key={item.name}
              href={item.link}
              onClick={() => setActive(item.name)}
              className={`text-lg pb-2 transition ${
                active === item.name
                  ? "border-b-2 border-red-500 text-black"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              {item.name}
            </Link>
          ))}

        </div> 
      </div>
    </div>
  );
}