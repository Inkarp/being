'use client'

import Image from "next/image"
import { FaArrowRightArrowLeft } from "react-icons/fa6"

export default function Banner() {
    return (
        <section className="relative h-[300px] w-full mx-auto rounded-[20px] overflow-hidden">
            {/* Background image with dark overlay */}
            <div className="absolute inset-0">
                <Image
                    width={500}
                    height={300}
                    src="/about-us.png" // Replace with actual image
                    alt="Contact Banner"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-[#2F4191] " />
            </div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white">
                <h1 className="text-3xl">Upcoming Events </h1>
            </div>
        </section>
    )
}


