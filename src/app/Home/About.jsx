'use client';

import Image from 'next/image';
import { FaArrowRight, FaHeadphones } from 'react-icons/fa';
import { RiTestTubeFill } from "react-icons/ri";
import { BsPeople, BsShieldCheck } from 'react-icons/bs';
import Link from 'next/link';

export default function About() {
  return (
    <section className="py-5 px-4 min-h-screen flex flex-col items-center">
      <div className=" grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        <div className="space-y-12 order-2 lg:order-1">
          <div className="relative group">
            <div className="overflow-hidden rounded-3xl shadow-2xl ring-1 ring-black/5">
              <Image
                src="/about.jpg"
                alt="Inkarp Instruments Laboratory Solutions"
                width={650}
                height={500}
                className="w-full h-auto aspect-[4/4] object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
        {/* Right: Content + Stats */}
        <div className="space-y-5 lg:order-2">
          {/* Badge */}
          <div className="inline-flex items-center">
            <span className="px-5 py-2.5 bg-gradient-to-br from-[#2F4191]/50 to-[#2B7EC2]/50 text-xs font-bold uppercase tracking-widest border-2 border-gray-200 rounded-full shadow-sm">
              About Inkarp
            </span>
          </div>

          {/* Headline + Description */}
          <div className="space-y-3">
            <h2 className="text-3xl font-black leading-[0.88] bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent drop-shadow-sm">
              Your Trusted Lab Partner
            </h2>
            <div className="text-xl md:text-2xl text-gray-600 leading-relaxed  ">
              Delivering precision laboratory instruments with unmatched reliability. Serving research, industry, and education with{' '}
              <span className="font-bold text-gray-900">10+ years</span> of excellence.
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            <div className="group flex items-start gap-4 p-8 rounded-2xl border border-gray-100 hover:shadow-2xl hover:border-gray-200 transition-all duration-400 bg-gray-50/50">
              <div className="w-14 h-14 mt-1 bg-white rounded-2xl flex items-center justify-center shadow-lg border flex-shrink-0 group-hover:scale-105 transition-transform">
                <BsShieldCheck className="w-7 h-7 text-gray-700" />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="font-bold text-xl text-gray-900 mb-3 group-hover:text-gray-950">ISO Certified</h4>
                <p className="text-base text-gray-600 leading-relaxed">Every instrument meets </p>
              </div>
            </div>

            <div className="group flex items-start gap-4 p-8 rounded-2xl border border-gray-100 hover:shadow-2xl hover:border-gray-200 transition-all duration-400 bg-gray-50/50">
              <div className="w-14 h-14 mt-1 bg-white rounded-2xl flex items-center justify-center shadow-lg border flex-shrink-0 group-hover:scale-105 transition-transform">
                <BsPeople className="w-7 h-7 text-gray-700" />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="font-bold text-xl text-gray-900 mb-3 group-hover:text-gray-950">Expert Support</h4>
                <p className="text-base text-gray-600 leading-relaxed">24/7 technical assistance</p>
              </div>
            </div>
            <div className="group flex items-start gap-4 p-8 rounded-2xl border border-gray-100 hover:shadow-2xl hover:border-gray-200 transition-all duration-400 bg-gray-50/50">
              <div className="w-14 h-14 mt-1 bg-white rounded-2xl flex items-center justify-center shadow-lg border flex-shrink-0 group-hover:scale-105 transition-transform">
                <BsShieldCheck className="w-7 h-7 text-gray-700" />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="font-bold text-xl text-gray-900 mb-3 group-hover:text-gray-950">ISO Certified</h4>
                <p className="text-base text-gray-600 leading-relaxed">Every instrument meets </p>
              </div>
            </div>

            <Link href="/about-us" >
            <div className="flex items-center justify-center gap-3 bg-[#2F3F8D] px-3 py-2 rounded-full w-max hover:bg-[#1c2a5f] cursor-pointer transition-colors">
              <span className="text-white font-medium text-[16px]">Know More</span>
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
            </Link>
          </div>
        </div>
      </div>
      {/* Compact Stats Grid - Below Image */}
      <div className="flex w-full gap-6 py-5 border-t border-gray-100">
        <div className="text-center p-6 rounded-2xl hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-gray-200">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center shadow-sm border">
            <BsShieldCheck className="w-8 h-8 text-gray-700" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-2">Lab Certified</div>
          <div className="text-sm text-gray-600 font-medium">Quality assured</div>
        </div>
        <div className="text-center p-6 rounded-2xl hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-gray-200">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center shadow-sm border">
            <RiTestTubeFill className="w-8 h-8 text-gray-700" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-2">500+</div>
          <div className="text-sm text-gray-600 font-medium">Instruments</div>
        </div>
        <div className="text-center p-6 rounded-2xl hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-gray-200">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center shadow-sm border">
            <BsShieldCheck className="w-8 h-8 text-gray-700" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-2">Lab Certified</div>
          <div className="text-sm text-gray-600 font-medium">Quality assured</div>
        </div>
        <div className="text-center p-6 rounded-2xl hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-gray-200">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center shadow-sm border">
            <RiTestTubeFill className="w-8 h-8 text-gray-700" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-2">500+</div>
          <div className="text-sm text-gray-600 font-medium">Instruments</div>
        </div>
      </div>
    </section>
  );
}
