"use client";

import { useState } from "react";
import Image from "next/image";

const REVIEWS = [
    {
        id: 6,
        name: "Alice",
        role: "Data Scientist",
        avatar: "/dp.jpg",
        review:
            "Absolutely mind-blowing! From graphics to gameplay, it's a virtual masterpiece. I lost track of time in the immersive experience.",
    },
    {
        id: 0,
        name: "Bob",
        role: "Architect",
        avatar: "/dp.jpg",
        review:
            "A hidden gem for tech enthusiasts. The selection is vast, and the ease of discovering new tech is addictively delightful!",
    },
    {
        id: 2,
        name: "Charlie",
        role: "DevOps Engineer",
        avatar: "/dp.jpg",
        review:
            "Results speak louder than words. I've never seen progress like this. The workflows are challenging but oh-so-rewarding. Kudos!",
    },
];

export default function TestimonialOne() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    const total = REVIEWS.length;
    const current = REVIEWS[currentIndex];

    const handleSlide = (direction) => {
        if (animating) return;
        setAnimating(true);

        setTimeout(() => {
            if (direction === "prev") {
                setCurrentIndex((prev) => (prev - 1 + total) % total);
            } else {
                setCurrentIndex((prev) => (prev + 1) % total);
            }
            setAnimating(false);
        }, 500);
    };

    return (
        <section className="bg-gradient-to-tr from-slate-200 to-slate-50 flex items-center justify-center px-4">
            <main className="bg-white my-4 w-full max-w-2xl rounded-3xl text-center p-8 sm:p-16">
                <h1 className="text-xl font-bold">
                    A word from our customers
                </h1>
                <p className="text-sm">
                    We have been helping businesses do their best since 2018
                </p>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-[60px_auto_60px] gap-6 items-center">

                    {/* LEFT BUTTON */}
                    <button
                        onClick={() => handleSlide("prev")}
                        className={`rounded-full w-10 h-10 text-2xl flex items-center justify-center transition-all duration-500 relative isolate bg-[#2F4191] text-white hover:text-black hover:bg-white hover:ring-2 hover:ring-[#2F4191] ${animating ? "translate-x-20" : ""
                            }`}
                    >
                        ‹
                    </button>

                    {/* CARD */}
                    <div className="relative overflow-hidden">
                        <div className="grid">
                            <div className="transition-all duration-500">

                                {/* Blockquote */}
                                <blockquote
                                    className={`bg-[#2F4191] text-white rounded-md p-6 text-sm relative isolate transition-all duration-500 ${animating ? "scale-0" : "scale-100"
                                        }`}
                                >
                                    {current.review}
                                    <span className="absolute bg-[#2F4191] w-4 h-4 rotate-45 -bottom-2 left-1/2 -translate-x-1/2"></span>
                                </blockquote>

                                {/* Details */}
                                <div
                                    className={`flex flex-col items-center gap-2 mt-6 transition-all duration-500 ${animating
                                            ? "translate-y-[150px] opacity-0"
                                            : "translate-y-0 opacity-100"
                                        }`}
                                >
                                    <Image
                                        src={current.avatar}
                                        width={64}
                                        height={64}
                                        alt={current.name}
                                        className="rounded-full object-cover"
                                    />
                                    <div>
                                        <p className="text-sm font-bold">
                                            {current.name}
                                        </p>
                                        <p className="text-xs">{current.role}</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* RIGHT BUTTON */}
                    <button
                        onClick={() => handleSlide("next")}
                        className={`rounded-full w-10 h-10 text-2xl flex items-center justify-center transition-all duration-500 relative isolate bg-[#2F4191] text-white hover:text-black hover:bg-white hover:ring-2 hover:ring-[#2F4191] ${animating ? "-translate-x-20" : ""
                            }`}
                    >
                        ›
                    </button>
                </div>
            </main>
        </section>
    );
}
