'use client';

import Link from 'next/link';
import { FaArrowRight, FaCheckCircle, } from 'react-icons/fa';

const causes = [
    {
        title: 'Ovens',
        percentage: 10,
        link: "/products/ovens",
        description: 'Totam rem aperiam, eaque ipsa quae ab illosa inventore veritatis et quasi.',
    },
    {
        title: 'Incubators',
        percentage: 12,
        link: "/products/incubators",
        description: 'Totam rem aperiam, eaque ipsa quae ab illosa inventore veritatis et quasi.',
    },
    {
        title: 'Chillers',
        percentage: 9,
        link: "/products/chillers",
        description: 'Totam rem aperiam, eaque ipsa quae ab illosa inventore veritatis et quasi.',
    },
    {
        title: 'Water Baths',
        percentage: 7,
        link: "/products/water-baths",
        description: 'Totam rem aperiam, eaque ipsa quae ab illosa inventore veritatis et quasi.',
    },
    {
        title: 'Rotary Evaporators',
        percentage: 20,
        link: "/products/rotary-evaporators",
        description: 'Totam rem aperiam, eaque ipsa quae ab illosa inventore veritatis et quasi.',
    },
    {
        title: 'Pumps',
        percentage: 15,
        link: "/products/pumps",
        description: 'Totam rem aperiam, eaque ipsa quae ab illosa inventore veritatis et quasi.',
    },
    {
        title: 'Cabinet',
        percentage: 5,
        link: "/products/cabinet",
        description: 'Totam rem aperiam, eaque ipsa quae ab illosa inventore veritatis et quasi.',
    },
    {
        title: 'Freezers',
        percentage: 6,
        link: "/products/freezers",
        description: 'Totam rem aperiam, eaque ipsa quae ab illosa inventore veritatis et quasi.',
    },
    {
        title: 'Digital Viscometers',
        percentage: 6,
        link: "/products/digital-viscometer",
        description: 'Totam rem aperiam, eaque ipsa quae ab illosa inventore veritatis et quasi.',
    },
    {
        title: 'Muffle furnance',
        percentage: 6,
        link: "/products/muffle-furnance",
        description: 'Totam rem aperiam, eaque ipsa quae ab illosa inventore veritatis et quasi.',
    },
];

export default function ProductsList() {
    return (
        <section className="py-5 ">
            <div className="w-full mx-auto text-center p-4">
                {/* Header */}
                <div className="inline-flex items-center ">
                    <span className="px-6 py-2.5 bg-gradient-to-br from-[#2F4191]/70 to-[#2B7EC2]/70 text-xs font-bold uppercase tracking-widest border border-white/50 rounded-full shadow-xl backdrop-blur-sm text-white">
                        Our Products
                    </span>
                </div>

                <p className="text-xl mx-auto leading-relaxed">
                    Our <span className="text-black font-semibold">Customers</span> love our products
                </p>

                {/* Pricing Cards Layout - 2 columns */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 w-full mx-auto">
                    {causes.map((cause, index) => (
                        <div
                            key={index}
                            className="group relative bg-white/80 backdrop-blur-xl border border-gray-100 shadow-2xl hover:shadow-blue-500/25 hover:border-[#2B7EC2]/40 rounded-3xl p-8 text-center transition-all duration-500 hover:-translate-y-2 overflow-hidden"
                        >
                            {/* Animated background shine */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 -skew-x-12 -translate-x-full group-hover:translate-x-full"></div>

                            {/* Top Product Count Badge */}
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gradient-to-br from-[#2F4191] to-[#2B7EC2] text-white font-semibold text-xl w-40 h-16 rounded-b-3xl flex items-center justify-center shadow-2xl border-2 border-white mt-3">
                                {cause.percentage}+ products 
                            </div>

                            {/* Product Name - Large */}
                            <h2 className="text-2xl font-semibold text-gray-900 mb-6 pt-8 leading-tight">
                                {cause.title}
                            </h2>

                            {/* Checkmarks Section */}
                            <div className="space-y-4 py-2">
                                <div className="flex items-center justify-center gap-3 text-lg">
                                    <div className="w-6 h-6 bg-[#2F4191] rounded-full flex items-center justify-center shadow-md">
                                        <FaCheckCircle color='white' />
                                    </div>
                                    <span className="text-gray-700 font-medium">Access to 25+ Lab Models</span>
                                </div>
                                <div className="flex items-center justify-center gap-3 text-lg">

                                    <div className="flex items-center justify-center gap-3 text-lg">
                                        <div className="w-6 h-6 bg-[#2F4191] rounded-full flex items-center justify-center shadow-md">
                                            <FaCheckCircle color='white' />
                                        </div>
                                        <span className="text-gray-700 font-medium">Access to 25+ Lab Models</span>
                                    </div>
                                    {/* <p className="text-gray-500 text-sm mt-6 pt-6 border-t border-gray-100">
                {cause.description}
              </p> */}
                                </div>
                            </div>

                            {/* CTA Button */}
                            <Link href={cause.link} className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#2F4191] to-[#2B7EC2] hover:from-[#2B7EC2] hover:to-[#2F4191] text-white font-semibold text-lg px-8 py-4 rounded-full shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group/button w-fit">
                                <span>Know More</span>
                                <div className="relative w-8 h-8 flex-shrink-0">
                                    <svg
                                        className="spin-slow "
                                        width="30"
                                        height="30"
                                        viewBox="0 0 30 30"
                                        fill="currentColor"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M14.2257 0.947522C14.6258 0.457905 15.3742 0.457905 15.7743 0.947522L16.8781 2.29817C17.181 2.66879 17.704 2.77283 18.1256 2.54633L19.6623 1.72088C20.2193 1.42165 20.9107 1.70806 21.093 2.31352L21.5959 3.98376C21.7339 4.44207 22.1773 4.73834 22.6535 4.69044L24.3891 4.51587C25.0182 4.45258 25.5474 4.98179 25.4841 5.61093L25.3096 7.34647C25.2617 7.8227 25.5579 8.2661 26.0162 8.40409L27.6865 8.90697C28.2919 9.08926 28.5783 9.7807 28.2791 10.3377L27.4537 11.8744C27.2272 12.296 27.3312 12.819 27.7018 13.1219L29.0525 14.2257C29.5421 14.6258 29.5421 15.3742 29.0525 15.7743L27.7018 16.8781C27.3312 17.181 27.2272 17.704 27.4537 18.1256L28.2791 19.6623C28.5783 20.2193 28.2919 20.9107 27.6865 21.093L26.0162 21.5959C25.5579 21.7339 25.2617 22.1773 25.3096 22.6535L25.4841 24.3891C25.5474 25.0182 25.0182 25.5474 24.3891 25.4841L22.6535 25.3096C22.1773 25.2617 21.7339 25.5579 21.5959 26.0162L21.093 27.6865C20.9107 28.2919 20.2193 28.5783 19.6623 28.2791L18.1256 27.4537C17.704 27.2272 17.181 27.3312 16.8781 27.7018L15.7743 29.0525C15.3742 29.5421 14.6258 29.5421 14.2257 29.0525L13.1219 27.7018C12.819 27.3312 12.296 27.2272 11.8744 27.4537L10.3377 28.2791C9.7807 28.5783 9.08926 28.2919 8.90697 27.6865L8.40409 26.0162C8.2661 25.5579 7.8227 25.2617 7.34647 25.3096L5.61093 25.4841C4.98179 25.5474 4.45258 25.0182 4.51587 24.3891L4.69044 22.6535C4.73834 22.1773 4.44207 21.7339 3.98376 21.5959L2.31352 21.093C1.70806 20.9107 1.42165 20.2193 1.72088 19.6623L2.54633 18.1256C2.77283 17.704 2.66879 17.181 2.29817 16.8781L0.947522 15.7743C0.457905 15.3742 0.457905 14.6258 0.947522 14.2257L2.29817 13.1219C2.66879 12.819 2.77283 12.296 2.54633 11.8744L1.72088 10.3377C1.42165 9.7807 1.70806 9.08926 2.31352 8.90697L3.98376 8.40409C4.44207 8.2661 4.73834 7.8227 4.69044 7.34647L4.51587 5.61093C4.45258 4.98179 4.98179 4.45258 5.61093 4.51587L7.34647 4.69044C7.8227 4.73834 8.2661 4.44207 8.40409 3.98376L8.90697 2.31352C9.08926 1.70806 9.7807 1.42165 10.3377 1.72088L11.8744 2.54633C12.296 2.77283 12.819 2.66879 13.1219 2.29817L14.2257 0.947522Z" />
                                    </svg>
                                    <FaArrowRight
                                        size={14}
                                        className="absolute top-1/2 left-1/2 text-[#2F4191] transform -translate-x-1/2 -translate-y-1/2"
                                    />
                                </div>
                            </Link>

                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
        </section>
    );
}
