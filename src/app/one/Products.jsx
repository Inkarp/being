'use client';

import React from 'react';
import { FaCogs, FaCloud, FaShieldAlt } from 'react-icons/fa';

const services = [
    {
        title: 'IT sample preparation and processing',
        description:
            'Comprehensive management of your IT infrastructure, network monitoring, security, minimal downtime.',
        icon: <FaCogs size={28} className="text-white" />,
        image: '/about-us.png', // Replace with your real images in /public
    },
    {
        title: 'Temperature control storage chambers',
        description:
            'Comprehensive management of your IT infrastructure, network monitoring, security, minimal downtime.',
        icon: <FaCloud size={28} className="text-white" />,
        image: '/about-us.png',
    },
    {
        title: 'Cell Culture and Microbiology',
        description:
            'Comprehensive management of your IT infrastructure, network monitoring, security, minimal downtime.',
        icon: <FaShieldAlt size={28} className="text-white" />,
        image: '/about-us.png',
    },
];

const Products = () => {
    return (
        <section className="bg-[#f4f4ff] w-[95%] mx-auto py-6">
            <div className="container mx-auto px-4 text-center">
                <p className="text-indigo-600 font-semibold text-sm flex justify-center items-center gap-2 mb-2">
                    {/* <span>🔷</span> Our Products <span>🔷</span> */}
                    Our Products
                </p>
                <h2 className="text-3xl md:text-4xl font-bold mb-10">
                    Our Unique And Awesome Products
                </h2>

                <div className="flex items-centet justify-center gap-5 px-20">
                    {services.map((service, idx) => (
                        <div
                            key={idx}
                            className="bg-white rounded-r-[100px] border-2 border-indigo-500 shadow-md overflow-hidden flex flex-col items-center p-6 transition hover:scale-105 hover:shadow-xl hover:bg-[#2B7EC2] hover:text-white"
                        >
                            <img
                                src={service.image}
                                alt={service.title}
                                className="w-full h-48 p-5 object-cover rounded-md mb-4"
                            />
                            <div className="bg-indigo-600 p-3 rounded-md -mt-10 z-10 mb-4 relative">
                                {service.icon}
                            </div>
                            <h3 className="text-xl font-semibold mb-2 uppercase">{service.title}</h3>
                            <p className=" text-sm mb-6">{service.description}</p>
                            <div className=''>
                            <button className="bg-indigo-600 text-white font-bold px-6 py-2 rounded hover:bg-indigo-700 transition text-sm">
                                Know More
                            </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Products;
