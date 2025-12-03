'use client';
import { FaFlask, FaBalanceScale, FaMicroscope, FaBatteryFull, FaCogs, FaDna, FaCompressArrowsAlt, FaThermometerHalf, FaVial } from "react-icons/fa";

const offerings = [
  {
    title: "Synthesis and Flow Chemistry",
    icon: <FaFlask size={30} className="text-blue-300" />,
    desc: "Innovating scalable synthesis pathways and continuous flow technologies for precise, efficient chemical development.",
    number: "01",
  },
  {
    title: "Analytical and Chromatography Solutions",
    icon: <FaBalanceScale size={30} className="text-blue-300" />,
    desc: "Delivering precise analytical instrumentation to ensure peak resolution and unmatched data reproducibility.",
    number: "02",
  },
  {
    title: "Analytical Chemistry and Weighing",
    icon: <FaMicroscope size={30} className="text-blue-300" />,
    desc: "Delivering precise analytical instrumentation to ensure peak resolution and unmatched data reproducibility.",
    number: "03",
  },
  {
    title: "Material Science and Battery Research",
    icon: <FaBatteryFull size={30} className="text-blue-300" />,
    desc: "Advanced material characterization and thermal analysis tools for energy storage, semiconductors, and polymers.",
    number: "04",
  },
  {
    title: "Pilot Plants and Automation",
    icon: <FaCogs size={30} className="text-blue-300" />,
    desc: "Designing and implementing pilot-scale automation for chemical and pharmaceutical scale-ups.",
    number: "05",
  },
  {
    title: "Life Sciences",
    icon: <FaDna size={30} className="text-blue-300" />,
    desc: "Empowering biological breakthroughs with cutting-edge cell analysis, imaging, and molecular biology platforms.",
    number: "06",
  },
  {
    title: "Extrusion and Homogenization",
    icon: <FaCompressArrowsAlt size={30} className="text-blue-300" />,
    desc: "Delivering high-pressure homogenization and extrusion equipment for nanoemulsions, dispersions, and formulations.",
    number: "07",
  },
  {
    title: "Rheology and Thermal Analysis",
    icon: <FaThermometerHalf size={30} className="text-blue-300" />,
    desc: "Measuring material behavior and thermal properties with precision rheometers and calorimeters.",
    number: "08",
  },
  {
    title: "General Laboratory Instruments",
    icon: <FaVial size={30} className="text-blue-300" />,
    desc: "From pH meters to water purification – your everyday research essentials under one roof.",
    number: "09",
  },
];

export default function OfferingsSection() {
  return (
    <section className=" text-white py-16 px-6 md:px-16 font-sans">
      <div className="text-center mb-12">
        <span className="text-red-500 uppercase font-bold text-sm tracking-wider inline-block border-b-2 border-red-500 mb-2">
          Our Offerings
        </span>
        <h2 className="text-3xl md:text-4xl text-black font-bold">Explore Our Scientific Focus Areas</h2>
      </div>

      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
        {offerings.map((item, idx) => (
          <div
            key={idx}
            className="relative rounded-2xl bg-[#0C2A3A] border border-[#1A3D52] p-6 hover:shadow-lg hover:border-cyan-400 transition-all duration-300"
          >
            {/* Icon and Title */}
            <div className="flex items-center gap-4 mb-4">
              {item.icon}
              <h3 className="text-lg font-semibold">{item.title}</h3>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-300 mb-4">{item.desc}</p>

            {/* Read More */}
            <a href="#" className="text-sm text-white font-semibold underline hover:text-cyan-400">
              READ MORE
            </a>

            {/* Number in top right */}
            <div className="absolute bottom-3 right-4 text-gray-700 text-4xl font-bold opacity-20 select-none">
              {item.number}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
