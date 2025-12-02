'use client';

import { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const services = [
    {
        title: 'IT Management',
        description:
            'Comprehensive management of your IT infrastructure, network monitoring, security, minimal downtime.',
        image: 'about-us.png',
        icon: '/icon3.svg',
    },
    {
        title: 'Cloud Solutions',
        description:
            'Design, deployment, and management of cloud tailored to your business needs, scalability, flexibility, and cost-efficiency.',
        image: 'about-us.png',
        icon: '/icon3.svg',
    },
    {
        title: 'Cybersecurity',
        description:
            'Protection of your digital assets through robust security measures, encryption to safeguard against evolving threats.',
        image: 'about-us.png',
        icon: '/icon2.svg',
    },
    {
        title: 'Data Analytics',
        description:
            'Transform raw data into actionable insights. Drive growth and make better decisions with modern analytics tools.',
        image: 'about-us.png',
        icon: '/icon1.svg',
    },
];

export default function OurProducts() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? services.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === services.length - 1 ? 0 : prev + 1));
    };

    return (
        <section className="bg-gradient-to-br from-[#2B7EC2] to-[#1e2b94] py-16 px-4 text-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex justify-center items-center flex-col">
                    <div className="flex items-center gap-2">
                        <img src="/icons/star.svg" className="w-5" alt="" />
                        <span className="uppercase text-sm font-semibold">Our Service</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">
                        Our Unique And Awesome <br /> Services
                    </h2>
                </div>

                {/* Cards */}
                <div className="relative">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-8 transition-transform duration-500 ease-in-out transform">
                        {services
                            .slice(currentIndex, currentIndex + 3)
                            .concat(
                                currentIndex + 3 > services.length
                                    ? services.slice(0, currentIndex + 3 - services.length)
                                    : []
                            )
                            .map((service, index) => (
                                <div
                                    key={index}
                                    className="bg-white text-black rounded-2xl overflow-hidden shadow-md relative"
                                >
                                    <img
                                        src={service.image}
                                        alt={service.title}
                                        className="w-full h-52 object-cover"
                                    />
                                    {/* Icon */}
                                    <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 z-10">
                                        <div className="bg-[#2B7EC2] absolute left-1/2 w-16 h-16 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                                            <img src={service.icon} alt="icon" className="w-8 h-8" />
                                        </div>
                                    </div>
                                    <div className="pt-8 pb-6 px-6 text-center">
                                        <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                                        <p className="text-sm text-gray-600 mb-4">{service.description}</p>
                                        <button className="bg-[#2B7EC2] text-white py-2 px-5 rounded-lg font-bold text-sm hover:bg-blue-800 transition">
                                            Read More
                                        </button>
                                    </div>
                                </div>
                            ))}
                    </div>


                </div>
                {/* Navigation Buttons */}
                <div className="absolute top-5 right-10 flex gap-4 p-4">
                    <button
                        onClick={handlePrev}
                        className="w-10 h-10 rounded-full bg-white text-[#2B7EC2] flex items-center justify-center shadow hover:bg-gray-200 transition"
                    >
                        <FaArrowLeft size={14} />
                    </button>
                    <button
                        onClick={handleNext}
                        className="w-10 h-10 rounded-full bg-white text-[#2B7EC2] flex items-center justify-center shadow hover:bg-gray-200 transition"
                    >
                        <FaArrowRight size={14} />
                    </button>
                </div>
            </div>
        </section>
    );
}
