'use client';

import { FaArrowRight, FaClock, FaMapMarkerAlt, FaSearch } from 'react-icons/fa';

const events = [
  {
    title: 'PMEc Hyderabad',
    date: 'May 14, 2015 3.00 PM',
    location: 'Conference Hall, 12 Marcon Street, Africa',
    description:
      'Ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti sat quos dolores et quas molestias excepturi sint occaecat.',
    image: '/about.jpg', // Replace with actual path
  },
  {
    title: 'Wapii Lucknow',
    date: 'May 14, 2015 3.00 PM',
    location: 'Conference Hall, 12 Marcon Street, Africa',
    description:
      'Ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti sat quos dolores et quas molestias excepturi sint occaecat.',
    image: '/about.jpg', // Replace with actual path
  },
];

const categories = [
  { name: 'All', count: 52 },
  { name: 'Conferences', count: 11 },
  { name: 'Events', count: 10 },
  { name: 'Pages', count: 52 },
];

const archives = [
  { name: 'March 2015', count: 4 },
  { name: 'January 2015', count: 5 },
  { name: 'December 2014', count: 6 },
  { name: 'October 2014', count: 8 },
];

export default function Events() {
  return (
    <section className="w-[95%] mx-auto p-5">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10">
        {/* Left Content */}
        <div className="flex-1">
          {/* Filter Bar */}
          <div className="bg-white px-6 py-4 shadow-xl rounded-xl mb-8 flex flex-wrap gap-4 items-center justify-between text-sm font-medium text-gray-700">
            <div className="flex items-center gap-2">
              <span className="font-semibold">EVENTS FILTER:</span>
            </div>
            <div className="flex flex-wrap justify-between gap-10">
              <select className="border-none outline-none bg-transparent">
                <option>All Events</option>
              </select>
              <select className="border-none outline-none bg-transparent">
                <option>Place</option>
              </select>
              {/* <select className="border-none outline-none bg-transparent">
                <option>Keyword</option>
              </select> */}
            </div>
          </div>

          {/* Event Cards */}
          {events.map((event, index) => (
            <div key={index} className="bg-white flex flex-col md:flex-row mb-6 shadow-sm rounded-xl overflow-hidden">
              <img src={event.image} alt={event.title} className="w-full md:w-1/2 h-auto object-cover" />
              <div className="p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{event.title}</h3>
                  <div className="flex items-center text-sm text-gray-500 gap-4 mt-2 flex-wrap">
                    <div className="flex items-center gap-1">
                      <FaClock className="text-yellow-600" />
                      {event.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <FaMapMarkerAlt className="text-yellow-600" />
                      {event.location}
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-gray-600 leading-relaxed">{event.description}</p>
                </div>
                <div className="flex items-center gap-3 bg-[#2F3F8D] px-6 py-3 rounded-full w-fit">
                  <span className="text-white font-medium text-[16px]">Join Now</span>
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

        {/* Sidebar */}
        <div className="w-full lg:w-[300px] space-y-8">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search Here"
              className="w-full bg-white shadow-xl rounded-xl px-4 py-2 pr-10 text-sm"
            />
            <FaSearch className="absolute right-3 top-3 text-gray-500" />
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-bold text-sm mb-3">CATEGORIES</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              {categories.map((cat, i) => (
                <li key={i} className="flex justify-between border-b border-black/30 pb-1">
                  <span>{cat.name}</span>
                  <span>({cat.count})</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Archives */}
          <div>
            <h4 className="font-bold text-sm mb-3">ARCHIVES</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              {archives.map((arch, i) => (
                <li key={i} className="flex justify-between border-b border-gray-500 pb-1">
                  <span>{arch.name}</span>
                  <span>({arch.count})</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
