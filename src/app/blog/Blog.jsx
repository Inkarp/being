'use client';

import React from 'react';
import Image from 'next/image';
import { FaArrowRight } from 'react-icons/fa';

export default function Blog() {
  return (
    <section className="py-5">
      <div className="max-w-7xl mx-auto px-4">
       <div className="flex flex-col lg:flex-row gap-10 max-h-screen overflow-hidden">

          {/* Left Section (Main Blog Grid) */}
         <div className="lg:w-3/4 space-y-5 overflow-y-auto pr-4">

            {/* Blog Header */}
            <div className="flex items-center justify-between">
              <a className="text-sm text-blue-600 font-medium" href="#">
                Showing 1 - 8 of 40 Result
              </a>
              <select className="bg-white shadow-xl  px-4 py-2 rounded-xl text-sm">
                <option>Sort By Latest</option>
                <option value="1">Some option</option>
                <option value="2">Another option</option>
                <option value="4">Potato</option>
              </select>
            </div>

            {/* Blog Grid (Example of two cards, repeat as needed) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((blog, index) => (
                <div key={index} className="bg-white shadow-xl rounded-xl overflow-scroll-y">
                  <div className="relative">
                    <Image
                      //   src={`/assets/images/blog/img${index + 1}.png`}
                      src={'/about.jpg'}
                      alt="Blog"
                      width={600}
                      height={400}
                      className="w-full object-cover"
                    />
                    {/* Date Overlay */}
                    <div className="absolute bottom-3 left-3 bg-white shadow px-3 py-2 rounded-md">
                      <p className="text-xs font-bold text-gray-700">12</p>
                      <p className="text-xs text-blue-600">Jun 2024</p>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex gap-4 text-sm text-gray-500 mb-2">
                      <span className="flex items-center gap-1">
                        👤 By Admin
                      </span>
                      <span className="flex items-center gap-1">
                        💬 (03) Comments
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800">
                      How to Optimize Your IT Infrastructure for Maximum Efficiency
                    </h3>
                    <div className="flex items-center gap-3 bg-[#2F3F8D] px-6 py-3 rounded-full w-fit">
                      <span className="text-white font-medium text-[16px]">Read More</span>
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
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <button className="text-blue-600 text-xl">&larr;</button>
              {[1, 2, 3, 4].map((n) => (
                <button
                  key={n}
                  className={`w-8 h-8 rounded-full ${n === 1 ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
                    }`}
                >
                  {n}
                </button>
              ))}
              <button className="text-blue-600 text-xl">&rarr;</button>
            </div>
          </div>

          {/* Right Section (Sidebar) */}
         <aside className="lg:w-2/5 space-y-5 sticky top-0 h-fit">
            {/* Search Widget */}
            <div className="bg-white p-4 rounded-lg shadow-xl">
              <h4 className="text-lg font-bold mb-3">Search Here...</h4>
              <input
                type="text"
                className="w-full border border-gray-300 px-4 py-2 rounded mb-2"
                placeholder="Search Here..."
              />
              <button className="w-full bg-blue-600 text-white py-2 rounded">
                Search
              </button>
            </div>

            {/* Latest News */}
            {/* <div className="bg-white p-4 rounded-xl shadow-xl space-y-4">
              <h4 className="text-lg font-bold">Latest News</h4>
              {[9, 10, 11].map((img, i) => (
                <div key={i} className="flex gap-4 items-center">
                  <Image
                    // src={`/assets/images/blog/img${img}.png`}
                    src={'/about.jpg'}
                    alt="Latest News"
                    width={80}
                    height={80}
                    className="rounded-md"
                  />
                  <div className="text-sm text-gray-700">
                    <p className="text-xs text-gray-500">24 Feb, 2024</p>
                    <p>How to Optimize Your IT Infrastructure for...</p>
                  </div>
                </div>
              ))}
            </div> */}

            {/* Categories */}
            <div className="bg-white shadow-xl p-4 rounded-xl space-y-3">
              <h4 className="text-lg font-bold">Category</h4>
              {[
                'Cleanroom & Contamination Control',
                'Cold Storage & Sample Preservation',
                'Material Characterization & Testing',
                'Cleanroom & Contamination Control',
                'Cold Storage & Sample Preservation',
                'Material Characterization & Testing',
              ].map((category, i) => (
                <div key={i} className="flex justify-between items-center text-sm">
                  <a href="#" className="text-gray-700 hover:text-blue-600">
                    {category}
                  </a>
                  <span><FaArrowRight /></span>
                </div>
              ))}
            </div>

            {/* Subscribe Widget */}
            <div className="bg-white shadow-xl p-4 rounded-xl ">
              <h4 className="text-lg font-bold">Get Updates</h4>
              <p className="text-sm text-gray-600 my-2">
                Subscribe email and get recent news and updates or offers.
              </p>
              <input
                type="email"
                placeholder="Email address..."
                className="w-full border border-gray-300 px-4 py-2 rounded-xl mb-2"
              />
              <button className="w-full bg-blue-600 text-white py-2 rounded">
                Subscribe
              </button>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
