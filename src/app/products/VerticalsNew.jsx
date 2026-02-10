'use client';

import Image from "next/image";
import Link from "next/link";

const profiles = [
    {
        name: "Ovens",
        description: "Hot air ovens for drying, sterilization and thermal testing.",
        link: "/products/laboratory-ovens",
        icon: "/ovens.png",
        color: "from-orange-400 to-red-500", 
    },
    {
        name: "Incubators",
        description: "Controlled temperature chambers for cell culture and microbiology.",
        link: "/products/incubators",
        icon: "/incubators.png",
        color: "from-green-400 to-emerald-500",
    },
    {
        name: "Chillers",
        description: "Precision temperature-controlled systems for lab workflows.",
        link: "/products/chillers",
        icon: "/incubators.png",
        color: "from-blue-400 to-cyan-500",
    },
    {
        name: "Water Baths",
        description: "Reliable temperature-controlled water baths for labs.",
        link: "/products/water-baths",
        icon: "/incubators.png",
        color: "from-indigo-400 to-purple-500",
    },
    {
        name: "Rotary Evaporators",
        description: "Efficient solvent evaporation systems for chemistry labs.",
        link: "/products/rotary-evaporators",
        icon: "/incubators.png",
        color: "from-pink-400 to-rose-500",
    },
    {
        name: "Pumps",
        description: "Vacuum and peristaltic pumps for lab applications.",
        link: "/products/pumps",
        icon: "/incubators.png",
        color: "from-teal-400 to-sky-500",
    },
    {
        name: "Cabinet",
        description: "Vacuum and peristaltic pumps for lab applications.",
        link: "/products/cabinet",
        image: "/about.jpg",
        icon: "/incubators.png",
        socials: { whatsapp: "https://wa.me/918019828999" },
    },

    {
        name: "Freezers",
        description: "Vacuum and peristaltic pumps for lab applications.",
        link: "/products/freezers",
        image: "/about.jpg",
        icon: "/incubators.png",
        socials: { whatsapp: "https://wa.me/918019828999" },
    },

    {
        name: "Digital Viscometer",
        description: "Vacuum and peristaltic pumps for lab applications.",
        link: "/products/digital-viscometer",
        image: "/about.jpg",
        icon: "/incubators.png",
        socials: { whatsapp: "https://wa.me/918019828999" },
    },
    {
        name: "Muffle Furnance",
        description: "Vacuum and peristaltic pumps for lab applications.",
        link: "/products/muffle-furnance",
        image: "/about.jpg",
        icon: "/incubators.png",
        socials: { whatsapp: "https://wa.me/918019828999" },
    },
];

export default function VerticalsNew() {
    return (
        <section className="w-full py-5 bg-gray-200 relative overflow-hidden">
            {/* Animated Background Particles */}
            {/* <div className="absolute inset-0">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-[#2B7EC2]/20 to-blue-300/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-emerald-300/20 to-green-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-300/10 to-pink-300/10 rounded-full blur-3xl animate-ping" />
            </div> */}

            {/* Heading */}
            <div className="text-center max-w-3xl mx-auto relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-slate-800 bg-clip-text text-transparent drop-shadow-lg">
                    Everything you need <span className="text-[#2B7EC2] drop-shadow-md">in one place</span>
                </h2>
                <p className="mt-4 text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
                    Scientific instruments designed to support research, testing, and production
                </p>
            </div>

            {/* Cards */}
            <div className="w-full mx-auto  grid grid-cols-1 md:grid-cols-3 gap-8 p-6 relative z-10">
                {profiles.map((profile, index) => (
                    <Link
                        key={index}
                        href={profile.link}
                        className="group bg-white shadow-2xl backdrop-blur-xl border-2 border-[#2F4191]/50 rounded-3xl p-8 flex items-start gap-6 hover:border-[#2B7EC2]/70 hover:shadow-2xl hover:shadow-[#2B7EC2]/20 hover:-translate-y-3 hover:rotate-x-1 transition-all duration-500 origin-bottom relative overflow-hidden"
                    >
                        {/* Category Badge */}
                        <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-[#2F4191]/70 to-gray-100/80 backdrop-blur-sm border-2 border-[#2F4191]/70 rounded-2xl flex items-center justify-center shadow-2xl rotate-0 group-hover:rotate-15 group-hover:scale-110 transition-all duration-700">
                            <span className="text-lg font-bold text-gray-800 uppercase tracking-wider drop-shadow-md">{index + 1}</span>
                        </div>

                        {/* Icon Orb */}
                        <div className={`w-28 h-28 rounded-3xl bg-[#2F4191]/20 flex items-center justify-center shrink-0 shadow-xl group-hover:shadow-2xl group-hover:scale-110 transition-all duration-500 ring-2 ring-[#2F4191]/50 group-hover:ring-[#2B7EC2]/50`}>
                            <Image
                                src={profile.icon}
                                alt={profile.name}
                                width={64}
                                height={64}
                                className="group-hover:scale-125 transition-transform duration-300 group-hover:invert-0"
                            />
                        </div>

                        {/* Content */}
                        <div className="min-w-0 flex-1 pt-4">
                            <h3 className="text-xl md:text-2xl font-bold text-gray-900 group-hover:text-[#2B7EC2] transition-colors duration-300 line-clamp-2">
                                {profile.name}
                            </h3>
                            <p className="mt-3 text-sm md:text-base text-gray-600 leading-relaxed line-clamp-3 group-hover:text-gray-700 transition-colors">
                                {profile.description}
                            </p>
                        </div>

                        {/* Hover Overlay Glow */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#2B7EC2]/0 via-[#2B7EC2]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                        {/* Arrow Indicator */}
                        <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-[#2B7EC2]/60 group-hover:border-[#2B7EC2] rotate-45 group-hover:translate-x-1 transition-all duration-300 opacity-0 group-hover:opacity-100" />
                    </Link>
                ))}
            </div>
        </section>
    );
}
