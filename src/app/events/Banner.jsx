'use client'

import { FaArrowRightArrowLeft } from "react-icons/fa6"

export default function Banner() {
    return (
         <section className="relative h-[300px] w-[92%] mx-auto rounded-[20px] overflow-hidden">
      {/* Background image with dark overlay */}
      <div className="absolute inset-0">
        <img
          src="/about-us.png" // Replace with actual image
          alt="Contact Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-blue-900 opacity-60" />
      </div>
        {/* <div className="relative h-[200px] bg-white w-[90%] mx-auto rounded-[20px] flex justify-center items-center"> */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white">
                <h1 className="text-3xl">Upcoming Events </h1>
            </div>

            <div className="absolute bottom-2 right-5 bg-white w-full max-w-sm p-3 rounded-lg shadow-xl flex items-center gap-2">
                <input
                    type="text"
                    className="w-full border border-gray-300 px-3 py-2 rounded text-sm"
                    placeholder="Search here..."
                />
            </div>
            {/* <div className="absolute bottom-0 left-50 transform -translate-x-1/2 -translate-y-1/2 text-black flex justify-center items-center w-full">
            <div className="flex items-center gap-2 bg-white rounded-full shadow-lg">
                <h1 className="text-3xl">Home <FaArrowRightArrowLeft /> Events </h1>
            </div>
            </div> */}
        {/* </div> */}
        </section>
    )
}


