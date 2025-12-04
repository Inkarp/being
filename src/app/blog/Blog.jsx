'use client';

import React from 'react';
import Image from 'next/image';

export default function Blog() {
  return (
    <section className="py-16 bg-white mt-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left Section (Main Blog Grid) */}
          <div className="lg:w-2/3 space-y-10">
            {/* Blog Header */}
            <div className="flex items-center justify-between">
              <a className="text-sm text-blue-600 font-medium" href="#">
                Showing 1 - 8 of 40 Result
              </a>
              <select className="border px-4 py-2 rounded-md text-sm">
                <option>Sort By Latest</option>
                <option value="1">Some option</option>
                <option value="2">Another option</option>
                <option value="4">Potato</option>
              </select>
            </div>

            {/* Blog Grid (Example of two cards, repeat as needed) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((blog, index) => (
                <div key={index} className="bg-white shadow-md rounded-md overflow-hidden">
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
                    <a
                      href="single-blog.html"
                      className="inline-block mt-4 text-sm text-blue-600 font-medium"
                    >
                      Read More →
                    </a>
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
                  className={`w-8 h-8 rounded-full ${
                    n === 1 ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {n}
                </button>
              ))}
              <button className="text-blue-600 text-xl">&rarr;</button>
            </div>
          </div>

          {/* Right Section (Sidebar) */}
          <aside className="lg:w-1/3 space-y-10">
            {/* Search Widget */}
            <div className="border p-4 rounded-lg shadow">
              <h4 className="text-lg font-bold mb-3">Search Here...</h4>
              <input
                type="text"
                className="w-full border px-4 py-2 rounded mb-2"
                placeholder="Search Here..."
              />
              <button className="w-full bg-blue-600 text-white py-2 rounded">
                Search
              </button>
            </div>

            {/* Latest News */}
            <div className="border p-4 rounded-lg shadow space-y-4">
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
            </div>

            {/* Categories */}
            <div className="border p-4 rounded-lg shadow space-y-3">
              <h4 className="text-lg font-bold">Category</h4>
              {[
                'IT Management',
                'Cloud Solutions',
                'Cybersecurity',
                'IT Consulting & Strategy',
                'Data Backup & Recovery',
                'Software Development',
              ].map((category, i) => (
                <div key={i} className="flex justify-between items-center text-sm">
                  <a href="#" className="text-gray-700 hover:text-blue-600">
                    {category}
                  </a>
                  <span>→</span>
                </div>
              ))}
            </div>

            {/* Subscribe Widget */}
            <div className="border p-4 rounded-lg shadow">
              <h4 className="text-lg font-bold">Get Updates</h4>
              <p className="text-sm text-gray-600 my-2">
                Subscribe email and get recent news and updates or offers.
              </p>
              <input
                type="email"
                placeholder="Email address..."
                className="w-full border px-4 py-2 rounded mb-2"
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
