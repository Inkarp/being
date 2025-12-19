'use client';

import Image from 'next/image';
import { FaArrowCircleRight, FaArrowRight, FaHeadphones } from 'react-icons/fa';
import { RiTestTubeFill } from "react-icons/ri";
import { BsShieldCheck, BsPeople } from 'react-icons/bs';

export default function About() {
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

          <div className="mt-10 space-y-8">
            {/* First Row (placeholder - you can add other stats later here) */}
            <div className="flex flex-wrap md:flex-nowrap gap-20">
              {/* Empty for now or add content here */}
              <div className="text-center">
                <span className="text-3xl font-bold text-[#2B7EC2] block">200+</span>
                <span className="text-lg font-semibold text-gray-800">Happy Customers</span>
              </div>
              <div className="w-[1px] h-15 bg-[#2B7EC2]"></div>
              <div className="text-center">
                <span className="text-3xl font-bold text-[#2B7EC2] block">200+</span>
                <span className="text-lg font-semibold text-gray-800">Happy Customers</span>
              </div>
            </div>

            {/* Divider */}
            <hr className="border-t border-[#2B7EC2] w-auto" />
            {/* Stats Row */}
            <div className="flex flex-wrap md:flex-nowrap gap-20">
              <div className="text-center">
                <span className="text-3xl font-bold text-[#2B7EC2] block">200+</span>
                <span className="text-lg font-semibold text-gray-800">Happy Customers</span>

              </div>
              <div className="w-[1px] h-15 bg-[#2B7EC2]"></div>
              <div className="text-center">
                <span className="text-3xl font-bold text-[#2B7EC2] block">200+</span>
                <span className="text-lg font-semibold text-gray-800">Happy Customers</span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="text-blue-700 font-semibold mb-2 flex items-center gap-2">
            <span className=" text-white bg-[#2B7EC2] p-2 uppercase font-bold text-sm tracking-wider inline-block border-2 border-[#2F3F8D] rounded-full mb-2">
              About Us
            </span>
          </div>
          <h2 className="text-4xl font-bold leading-snug mb-4">
            A Lab Partner
            With<span className="text-blue-700"> Best Provided Instruments</span>
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
                <h4 className="text-lg font-semibold">Providing Laboratory Services</h4>
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
            <div className="flex items-center gap-3 animate-bounce">
              <div className="bg-blue-100 text-blue-700 p-3 rounded-full text-xl">
                <FaHeadphones />
              </div>
              <div className=''>
                <p className="font-semibold text-sm">Call Us Any Time</p>
                <p className="text-lg font-bold">(+91) 9030357676</p>
              </div>
            </div>

            {/* <div className="group relative p-2 bg-[#2B7EC2] rounded-full  w-fit flex items-center justify-center">
            <img
              src="/Circle-Button.svg"
              className="w-15 h-15 transition-transform duration-500 spin-slow"
              alt="Spinning Image"
            />
            <FaArrowCircleRight
              size={24}
              className="absolute text-white transition-transform duration-500 group-hover:animate-bounce "
            />
          </div> */}

            <div className="flex items-center gap-3 bg-[#2F3F8D] px-6 py-3 rounded-full w-fit">
              <span className="text-white font-medium text-[16px]">About Us</span>
              {/* Gear SVG with arrow inside */}
              <div className="relative w-[30px] h-[30px] text-white">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  className='spin-slow'
                >
                  <path d="M14.2257 0.947522C14.6258 0.457905 15.3742 0.457905 15.7743 0.947522L16.8781 2.29817C17.181 2.66879 17.704 2.77283 18.1256 2.54633L19.6623 1.72088C20.2193 1.42165 20.9107 1.70806 21.093 2.31352L21.5959 3.98376C21.7339 4.44207 22.1773 4.73834 22.6535 4.69044L24.3891 4.51587C25.0182 4.45258 25.5474 4.98179 25.4841 5.61093L25.3096 7.34647C25.2617 7.8227 25.5579 8.2661 26.0162 8.40409L27.6865 8.90697C28.2919 9.08926 28.5783 9.7807 28.2791 10.3377L27.4537 11.8744C27.2272 12.296 27.3312 12.819 27.7018 13.1219L29.0525 14.2257C29.5421 14.6258 29.5421 15.3742 29.0525 15.7743L27.7018 16.8781C27.3312 17.181 27.2272 17.704 27.4537 18.1256L28.2791 19.6623C28.5783 20.2193 28.2919 20.9107 27.6865 21.093L26.0162 21.5959C25.5579 21.7339 25.2617 22.1773 25.3096 22.6535L25.4841 24.3891C25.5474 25.0182 25.0182 25.5474 24.3891 25.4841L22.6535 25.3096C22.1773 25.2617 21.7339 25.5579 21.5959 26.0162L21.093 27.6865C20.9107 28.2919 20.2193 28.5783 19.6623 28.2791L18.1256 27.4537C17.704 27.2272 17.181 27.3312 16.8781 27.7018L15.7743 29.0525C15.3742 29.5421 14.6258 29.5421 14.2257 29.0525L13.1219 27.7018C12.819 27.3312 12.296 27.2272 11.8744 27.4537L10.3377 28.2791C9.7807 28.5783 9.08926 28.2919 8.90697 27.6865L8.40409 26.0162C8.2661 25.5579 7.8227 25.2617 7.34647 25.3096L5.61093 25.4841C4.98179 25.5474 4.45258 25.0182 4.51587 24.3891L4.69044 22.6535C4.73834 22.1773 4.44207 21.7339 3.98376 21.5959L2.31352 21.093C1.70806 20.9107 1.42165 20.2193 1.72088 19.6623L2.54633 18.1256C2.77283 17.704 2.66879 17.181 2.29817 16.8781L0.947522 15.7743C0.457905 15.3742 0.457905 14.6258 0.947522 14.2257L2.29817 13.1219C2.66879 12.819 2.77283 12.296 2.54633 11.8744L1.72088 10.3377C1.42165 9.7807 1.70806 9.08926 2.31352 8.90697L3.98376 8.40409C4.44207 8.2661 4.73834 7.8227 4.69044 7.34647L4.51587 5.61093C4.45258 4.98179 4.98179 4.45258 5.61093 4.51587L7.34647 4.69044C7.8227 4.73834 8.2661 4.44207 8.40409 3.98376L8.90697 2.31352C9.08926 1.70806 9.7807 1.42165 10.3377 1.72088L11.8744 2.54633C12.296 2.77283 12.819 2.66879 13.1219 2.29817L14.2257 0.947522Z" />
                </svg>

                {/* Center arrow */}
                <FaArrowRight
                  size={12}
                  className="absolute top-1/2 left-1/2 text-black transform -translate-x-1/2 -translate-y-1/2 "
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section >
  );
}
