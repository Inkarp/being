'use client';

import Image from 'next/image';
import { FaUser, FaComments, FaArrowRight } from 'react-icons/fa';

const blogs = [
  {
    title: 'How to Optimize Your IT Infrastructure for Maximum Efficiency',
    image: '/about.jpg',
    date: '16 March, 2025',
    author: 'Admin',
    comments: 3,
  },
  {
    title: 'How IT Infrastructure Can Improve Efficiency and Productivity',
    image: '/about.jpg',
    date: '16 March, 2025',
    author: 'Admin',
    comments: 3,
  },
  {
    title: 'How to Ensure Seamless IT Integration Across Departments',
    image: '/about.jpg',
    date: '16 March, 2025',
    author: 'Admin',
    comments: 3,
  },
];

const events = [
  {
    title: 'Annual Tech Summit 2025',
    date: '20 March, 2025',
    place: 'Hyderabad',
    image: '/about.jpg',
  },
  {
    title: 'Cloud Infrastructure Workshop',
    date: '28 March, 2025',
    place: 'Bangalore',
    image: '/about.jpg',
  },

];

export default function Blogs() {
  return (
    <section className="py-16 px-6">
      {/* Section heading */}
      <div className="w-full mx-auto text-center mb-12">
        <div className="inline-flex items-center">
          <span className="px-5 py-2.5 bg-gradient-to-br from-[#2F4191]/50 to-[#2B7EC2]/50 text-xs font-bold uppercase tracking-widest border-2 border-gray-200 rounded-full shadow-sm">
            Blogs and Events
          </span>
        </div>
        <h2 className="text-4xl font-extrabold text-black mt-2">
          Our Latest News And 
          Updates
        </h2>
      </div>

      {/* 2/3 – 1/3 layout */}
      <div className="w-full mx-auto flex flex-col lg:flex-row gap-10">
        {/* Left: Blogs (2/3) */}
        <div className="w-full lg:basis-2/3">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {blogs.map((blog, index) => (
              <div
                key={index}
                className="bg-[#F5F7FF] rounded-2xl overflow-hidden shadow hover:shadow-md transition-all duration-500 hover:scale-[1.03]"
              >
                {/* Image & Date */}
                <div className="relative">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-[220px] object-cover rounded-t-2xl"
                  />
                  <div className="absolute bottom-3 left-4 bg-[#2BC2E2] text-white text-sm font-bold py-1 px-4 rounded-md shadow">
                    {blog.date}
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col p-3 items-center gap-4 text-gray-500 text-sm">
                  <h3 className="font-bold text-lg text-black leading-snug">
                    {blog.title}
                  </h3>
                  <div className="flex items-start justify-start gap-3 bg-[#2F3F8D] px-3 py-2 rounded-full w-fit ">
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
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Events (1/3) */}
        <aside className="w-full lg:basis-1/3">
          {/* <h3 className="text-xl font-bold text-black mb-4">
            Upcoming Events
          </h3> */}
          {/* <div className="bg-[#F5F7FF] rounded-2xl shadow p-6 h-full">
            <div className="space-y-4">
              {events.map((event, idx) => (
                <div
                  key={idx}
                  className="border border-[#E0E4FF] rounded-xl p-4 bg-white hover:shadow-md transition flex items-center justify-between gap-4"
                >
                  <div>
                    <p className="text-xs font-semibold text-[#2B7EC2] uppercase tracking-wide">
                      {event.date}
                    </p>
                    <h4 className="mt-1 font-semibold text-sm text-black">
                      {event.title}
                    </h4>
                    <p className="mt-1 text-xs text-gray-500">
                      {event.place}
                    </p>
                  </div>
                  <div className="flex items-center justify-center gap-3 bg-[#2F3F8D] px-2 py-1 rounded-full w-fit">
                    <span className="text-white font-medium text-[14px]">Join Us</span>
          
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

                      <FaArrowRight
                        size={12}
                        className="absolute top-1/2 left-1/2 text-black transform -translate-x-1/2 -translate-y-1/2 "
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div> */}
          <Image src="/about.jpg" alt="About Us" width={650} height={500} className="w-full h-auto aspect-[4/4] object-cover rounded-3xl shadow-2xl ring-1 ring-black/5" />
        </aside>
      </div>
    </section>
  );
}
