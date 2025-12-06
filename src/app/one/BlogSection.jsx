'use client';

import { FaUser, FaComments } from 'react-icons/fa';

const blogs = [
  {
    title: 'How to Optimize Your IT Infrastructure for Maximum Efficiency',
    image: '/about.jpg', // Replace with your image path
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

export default function BlogSection() {
  return (
    <section className="py-16 px-6">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <p className="text-[#2B7EC2] font-semibold text-sm flex items-center justify-center gap-2">
          💠 News & Blog 💠
        </p>
        <h2 className="text-4xl font-extrabold text-black mt-2">
          Our Latest News And <br className="hidden sm:block" />
          Updates
        </h2>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {blogs.map((blog, index) => (
          <div
            key={index}
            className="bg-[#F5F7FF] rounded-2xl overflow-hidden shadow hover:shadow-md transition-all duration-500 hover:scale-[1.1]"
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
            <div className="p-6 text-left">
              <div className="flex items-center gap-4 text-gray-500 text-sm mb-3">
                <div className="flex items-center gap-1">
                  <FaUser className="text-[#2B7EC2]" />
                  <span>By {blog.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <FaComments className="text-[#2B7EC2]" />
                  <span>({String(blog.comments).padStart(2, '0')}) Comments</span>
                </div>
              </div>

              <h3 className="font-bold text-lg text-black leading-snug">
                {blog.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
