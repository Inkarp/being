'use client';

import Link from "next/link";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

const profiles = [
  {
    name: "Ovens",
    description: "Hot air ovens for drying, sterilization and thermal testing.",
    link: "/products/laboratory-ovens",
    tag: "Thermal",
    number: "01",
  },
  {
    name: "Cabinets",
    description: "Safety and storage cabinets engineered for lab environments.",
    link: "/products/cabinet",
    tag: "Storage",
    number: "02",
  },
  {
    name: "Incubators",
    description: "Controlled temperature chambers for cell culture and microbiology.",
    link: "/products/incubators",
    tag: "Thermal",
    number: "03",
  },
  {
    name: "Chillers",
    description: "Precision temperature-controlled systems for lab workflows.",
    link: "/products/chillers",
    tag: "Cooling",
    number: "04",
  },
  {
    name: "Water Baths",
    description: "Reliable temperature-controlled water baths for labs.",
    link: "/products/water-baths",
    tag: "Thermal",
    number: "05",
  },
  {
    name: "Rotary Evaporators",
    description: "Efficient solvent evaporation systems for chemistry labs.",
    link: "/products/rotary-evaporators",
    tag: "Fluid",
    number: "06",
  },
  {
    name: "Pumps",
    description: "Vacuum and peristaltic pumps for diverse lab applications.",
    link: "/products/pumps",
    tag: "Fluid",
    number: "07",
  },
  {
    name: "Freezers",
    description: "Ultra-low and standard freezers for sample preservation.",
    link: "/products/freezers",
    tag: "Cooling",
    number: "08",
  },
  {
    name: "Digital Viscometer",
    description: "Accurate viscosity measurement for fluids and polymers.",
    link: "/products/digital-viscometer",
    tag: "Analytical",
    number: "09",
  },
  {
    name: "Muffle Furnace",
    description: "High-temperature furnaces for ashing and heat treatment.",
    link: "/products/muffle-furnance",
    tag: "Thermal",
    number: "10",
  },
  {
    name: "Centrifuges",
    description: "High-speed centrifugation for separation and analysis.",
    link: "/products/centrifuges",
    tag: "Analytical",
    number: "11",
  },
  {
    name: "Autoclaves",
    description: "Steam sterilization units for medical and lab use.",
    link: "/products/autoclaves",
    tag: "Sterilization",
    number: "12",
  },
];

export default function Products() {
  return (
    <section className="w-full py-8 px-4 md:px-8 relative overflow-hidden bg-slate-50">

      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #2F4191 1px, transparent 0)`,
          backgroundSize: "36px 36px",
        }}
      />

      {/* Glow accents */}
      <div className="absolute top-[-80px] left-[-80px] w-[400px] h-[400px] rounded-full bg-[#2F4191]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-80px] right-[-80px] w-[400px] h-[400px] rounded-full bg-[#2B7EC2]/10 blur-3xl pointer-events-none" />

      {/* Heading */}
      <div className="text-center max-w-3xl mx-auto mb-6 relative z-10">
        <span className="inline-block text-[11px] uppercase tracking-[3px] text-[#2F4191] font-medium border border-[#2F4191]/30 rounded-full px-4 py-1 mb-5 bg-[#2F4191]/5">
          Scientific Instruments
        </span>
        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
          Everything you need{" "}
          <span className="relative inline-block">
            <span className="relative z-10 text-[#2F4191]">in one place</span>
            <span className="absolute bottom-1 left-0 w-full h-[6px] bg-[#2B7EC2]/20 rounded-full -z-0" />
          </span>
        </h2>
        <p className="mt-4 text-slate-500 text-base leading-relaxed">
          Precision-built instruments designed to support research, testing, and production workflows.
        </p>
      </div>

      {/* Grid */}
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {profiles.map((profile, index) => (
          <Link
            key={index}
            href={profile.link}
            className="group relative bg-[#2F4191] rounded-2xl p-6 overflow-hidden flex flex-col justify-between min-h-[190px] transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#2F4191]/30 border border-white/10"
          >
            {/* Shine sweep on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
              style={{
                background: "linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.07) 50%, transparent 70%)",
              }}
            />

            {/* Decorative orb top-right */}
            <div className="absolute -top-8 -right-8 w-28 h-28 rounded-full bg-white/5 pointer-events-none transition-transform duration-500 group-hover:scale-125" />
            <div className="absolute -bottom-6 -left-6 w-20 h-20 rounded-full bg-white/5 pointer-events-none transition-transform duration-500 group-hover:scale-125" />

            {/* Top row: number + tag */}
            <div className="flex items-center justify-between mb-4 relative z-10">
              <span className="text-[11px] font-mono font-semibold text-white/40 tracking-widest">
                {profile.number}
              </span>
              <span className="text-[10px] uppercase tracking-[2px] text-white/60 border border-white/20 rounded-full px-3 py-[3px] bg-white/5">
                {profile.tag}
              </span>
            </div>

            {/* Content */}
            <div className="relative z-10 flex-1">
              <h3 className="text-xl font-bold text-white leading-snug mb-2 group-hover:text-white/95 transition-colors">
                {profile.name}
              </h3>
              <p className="text-sm text-white/60 leading-relaxed group-hover:text-white/75 transition-colors">
                {profile.description}
              </p>
            </div>

            {/* Bottom arrow */}
            <div className="relative z-10 mt-5 flex items-center justify-between">
              <div className="h-px flex-1 bg-white/10 group-hover:bg-white/20 transition-colors" />
              <div className="ml-3 w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300">
                <FaArrowUpRightFromSquare size={11} className="text-white" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="relative z-10 text-center mt-12">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 bg-[#2F4191] text-white text-sm font-medium px-6 py-3 rounded-full hover:bg-[#253580] transition-colors duration-200 shadow-lg shadow-[#2F4191]/30"
        >
          View all products
          <FaArrowUpRightFromSquare size={11} />
        </Link>
      </div>
    </section>
  );
}