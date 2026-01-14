'use client';

import Image from 'next/image';
import { FaUser, FaComments, FaArrowRight } from 'react-icons/fa';

const blogs = [
    {
        title: 'How to Optimize Your IT Infrastructure for Maximum Efficiency',
        image: '/about.jpg',
        date: '16 March, 2025',
        author: 'Admin',
        comments: 3,
    },
    {
        title: 'How IT Infrastructure Can Improve Efficiency and Productivity',
        image: '/about.jpg',
        date: '16 March, 2025',
        author: 'Admin',
        comments: 3,
    },
    {
        title: 'How to Ensure Seamless IT Integration Across Departments',
        image: '/about.jpg',
        date: '16 March, 2025',
        author: 'Admin',
        comments: 3,
    },
];

const events = [
    {
        title: 'Annual Tech Summit 2025',
        date: '20 March, 2025',
        place: 'Hyderabad',
        image: '/about.jpg',
    },
    {
        title: 'Cloud Infrastructure Workshop',
        date: '28 March, 2025',
        place: 'Bangalore',
        image: '/about.jpg',
    },

];

export default function BlogsNew() {
    return (
        <section className="py-5">
            {/* Section heading */}
            <div className="w-full mx-auto text-center ">
                <div className="inline-flex items-center">
                    <span className="px-5 py-2.5 bg-gradient-to-br from-[#2F4191]/50 to-[#2B7EC2]/50 text-xs font-bold uppercase tracking-widest border-2 border-gray-200 rounded-full shadow-sm">
                        Blogs and Events
                    </span>
                </div>
                <h2 className="text-4xl font-extrabold text-black mt-2">
                    Our Latest News And Events
                </h2>
            </div>

            {/* 2/3 – 1/3 layout */}
            <div className="w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 py-6 items-stretch">

                <div className="h-full flex flex-col">
                    <h3 className="text-xl font-bold text-black text-center mb-4">
                        Upcoming Blogs
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 flex-1">
                        {blogs.map((blog, index) => (
                            <div
                                key={index}
                                className="bg-[#F5F7FF] rounded-2xl overflow-hidden shadow hover:shadow-md transition-all duration-300 flex flex-col h-full"
                            >
                                {/* Image */}
                                <div className="relative h-[220px]">
                                    <Image
                                        src={blog.image}
                                        alt={blog.title}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute bottom-3 left-4 bg-[#2BC2E2] text-white text-xs font-bold py-1 px-3 rounded-md shadow">
                                        {blog.date}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex flex-col flex-1 p-4 items-center text-center gap-4">
                                    <h3 className="font-bold text-base text-black leading-snug line-clamp-3">
                                        {blog.title}
                                    </h3>

                                    {/* CTA pinned bottom */}
                                    <div className="mt-auto">
                                        <div className="flex items-center gap-3 bg-[#2F3F8D] px-4 py-2 rounded-full">
                                            <span className="text-white font-medium text-sm">
                                                Know More
                                            </span>

                                            <div className="relative w-[30px] h-[30px] text-white">
                                                <svg
                                                    viewBox="0 0 30 30"
                                                    fill="currentColor"
                                                    className="spin-slow"
                                                >
                                                    <path d="M14.2257 0.947522C14.6258 0.457905..." />
                                                </svg>
                                                <FaArrowRight
                                                    size={12}
                                                    className="absolute top-1/2 left-1/2 text-black -translate-x-1/2 -translate-y-1/2"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <aside className="h-full flex flex-col">
                    <h3 className="text-xl font-bold text-black text-center mb-4">
                        Upcoming Events
                    </h3>

                    {/* Full height container */}
                    <div className="flex-1 bg-[#F5F7FF] rounded-2xl shadow overflow-hidden">
                        {/* <Image
                            src="/about.jpg"
                            alt="Upcoming Events"
                            fill
                            className="object-cover"
                        />
                         <Image
                            src="/about.jpg"
                            alt="Upcoming Events"
                            fill
                            className="object-cover"
                        /> */}
                    </div>
                </aside>
            </div>
        </section>
    );
}
