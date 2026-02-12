'use client';

import Image from 'next/image';
import { useState } from 'react';

const testimonials = [
  {
    name: 'Leslie Alexander',
    handle: '@lesliealexander',
    quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et, egestas tempus tellus et, et laborum. Voluptas vel tempora facilis.',
    image: '/dp.jpg',
  },
  {
    name: 'Lindsey Walton',
    handle: '@lindseywalton',
    quote: 'Excepteur consequat Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    image: '/dp.jpg',
  },
  {
    name: 'Whitney Francis',
    handle: '@whitneyfrancis',
    quote: 'Voluptas quisquaerat voluptatem quisquam voluptatem. Ipsum ipsum, sit repellat natus error sit voluptatem accusantium dolorem.',
    image: '/dp.jpg',
  },
  {
    name: 'Leslie Alexander',
    handle: '@lesliealexander',
    quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et, egestas tempus tellus et, et laborum. Voluptas vel tempora facilis.',
    image: '/dp.jpg',
  },
];

export default function Testimonials() {
  return (
    <section className="py-6 bg-gradient-to-br from-purple-50 via-purple-50/50 to-purple-100">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
        <div className="text-center">
          <div className="inline-flex items-center">
            <span className="px-5 py-2.5 bg-gradient-to-br from-[#2F4191]/50 to-[#2B7EC2]/50 text-xs font-bold uppercase tracking-widest border-2 border-gray-200 rounded-full shadow-sm">
              Testimonials
            </span>
          </div>
          <p className="text-xl sm:text-2xl lg:text-2xl font-bold text-slate-900 mx-auto leading-tight">
            A word from our customers <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2F4191] to-[#2B7EC2]">hundreds of amazing people</span>          
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mx-auto">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="group relative bg-white/80 backdrop-blur-sm border border-white/50 hover:border-purple-200/50 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:bg-white">
              <p className="text-slate-700 text-lg leading-relaxed mb-6 font-medium italic">“{testimonial.quote}”</p>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="rounded-full border-4 border-white shadow-lg ring-2 ring-purple-200/50 group-hover:ring-purple-300/75 transition-all duration-300"
                  />
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-lg">{testimonial.name}</p>
                  {/* <p className="text-purple-600 font-medium text-sm">@{testimonial.handle}</p> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
