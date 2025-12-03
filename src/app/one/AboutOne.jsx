'use client';

import Image from 'next/image';
import { FaArrowCircleRight, FaHeadphones } from 'react-icons/fa';
import { RiTestTubeFill } from "react-icons/ri";
import { BsShieldCheck, BsPeople } from 'react-icons/bs';

export default function AboutOne() {
  return (
    <section className="py-20 px-4 text-black">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">

        {/* Left side: images */}
        <div className="relative space-y-6">
          <div className="rounded-2xl overflow-hidden">
            <Image
              src="/about.jpg"
              alt="Professional"
              width={600}
              height={700}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* <div className="absolute top-6 left-2/3 bg-white shadow-lg rounded-xl py-4 px-6 text-center flex flex-col items-center justify-center w-28 h-40">
            <div className="text-lg font-semibold text-gray-700 rotate-[-90deg] absolute -left-10 top-[35%] whitespace-nowrap">
              Years of Experience
            </div>
            <div className="text-4xl font-bold text-blue-700 mt-12">30</div>
          </div> */}

          <div className="rounded-2xl overflow-hidden w-64 mt-4 ml-10">
            <Image
              src="/about.jpg"
              alt="Developer at work"
              width={400}
              height={250}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* Right side: content */}
        <div>
          <p className="text-blue-700 font-semibold mb-2 flex items-center gap-2">
            <RiTestTubeFill className='text-black' /><span className="text-xl">About Us</span><RiTestTubeFill className='text-black' />
          </p>
          <h2 className="text-4xl font-bold leading-snug mb-4">
            A Lab Patner<br />
            With<span className="text-blue-700">Best Provided Instruments</span>
          </h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            At techin, we are dedicated to delivering innovative IT solutions and services that empower businesses to thrive in the digital age. With a team of experienced professionals, we provide customized technology strategies, robust support, and cutting-edge solutions tailored to your unique needs. Our mission is to help you achieve your goals by making technology work for you efficiently, securely, and reliably.
          </p>

          <div className="grid grid-cols-2 gap-6 mb-10">
            <div className="flex items-start gap-3">
              <div className="bg-cyan-200 text-cyan-800 p-3 rounded-full text-2xl">
                <BsShieldCheck />
              </div>
              <div>
                <h4 className="text-lg font-semibold">Providing Skillful Services</h4>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-cyan-200 text-cyan-800 p-3 rounded-full text-2xl">
                <BsPeople />
              </div>
              <div>
                <h4 className="text-lg font-semibold">24/7 Support For Clients</h4>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 items-center justify-around">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 text-blue-700 p-3 rounded-full text-xl">
                <FaHeadphones />
              </div>
              <div>
                <p className="font-semibold text-sm">Call Us Any Time</p>
                <p className="text-lg font-bold">(+009) 1888 000 2222</p>
              </div>
            </div>

            <div className="group relative p-2 bg-[#2B7EC2] rounded-full w-fit flex items-center justify-center">
              <img
                src="/Circle-Button.svg"
                className="w-15 h-15 transition-transform duration-500 group-hover:animate-spin"
                alt="Spinning Image"
              />
              <FaArrowCircleRight
                size={24}
                className="absolute text-white transition-transform duration-500 group-hover:animate-bounce "
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
