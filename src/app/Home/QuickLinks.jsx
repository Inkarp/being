"use client";

import Image from "next/image";

const links = [
    {
        image: "/Amc.svg",
        title: "Buy AMC",
    },
    {
        image: "/Amc.svg",
        title: "All Promotions",
    },
    {
        image: "/offers.webp",
        title: "Best Offers",
    },
    {
        image: "/Amc.svg",
        title: "Shop the Latest",
    },

];

export default function QuickLinks() {
    return (
        <section className="w-full  py-6">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between gap-6">

                    {links.map((item, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center min-w-[110px] cursor-pointer group"
                        >
                            <div className="w-16 h-16 rounded-full bg-[#F0ECE4] shadow-sm flex items-center justify-center">

                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    unoptimized
                                    width={32}
                                    height={32}
                                />

                            </div>

                            <p className="text-[14px] text-gray-700 mt-3 text-center">
                                {item.title}
                            </p>
                        </div>
                    ))}

                </div>
            </div>
        </section>
    );
}