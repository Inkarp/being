'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const causes = [
  {
    title: 'Ovens',
    percentage:10,
    image: '/about-us.png',
    description: 'Totam rem aperiam, eaque ipsa quae ab illosa inventore veritatis et quasi.',
  },
  {
    title: 'Incubators',
    percentage: 12,
    image: '/about-us.png',
    description: 'Totam rem aperiam, eaque ipsa quae ab illosa inventore veritatis et quasi.',
  },
  {
    title: 'Shakers',
    percentage: 9,
    image: '/about-us.png',
    description: 'Totam rem aperiam, eaque ipsa quae ab illosa inventore veritatis et quasi.',
  },

   {
    title: 'Stirrers',
    percentage: 7,
    image: '/about-us.png',
    description: 'Totam rem aperiam, eaque ipsa quae ab illosa inventore veritatis et quasi.',
  },
  {
    title: 'Water Baths',
    percentage: 20,
    image: '/about-us.png',
    description: 'Totam rem aperiam, eaque ipsa quae ab illosa inventore veritatis et quasi.',
  },
   {
    title: 'Circulators & Chillers',
    percentage: 15,
    image: '/about-us.png',
    description: 'Totam rem aperiam, eaque ipsa quae ab illosa inventore veritatis et quasi.',
  },
  {
    title: 'Rotary Evaporators',
    percentage: 5,
    image: '/about-us.png',
    description: 'Totam rem aperiam, eaque ipsa quae ab illosa inventore veritatis et quasi.',
  },
  {
    title: 'Pumps',
    percentage: 6,
    image: '/about-us.png',
    description: 'Totam rem aperiam, eaque ipsa quae ab illosa inventore veritatis et quasi.',
  },
];

export default function Offerings() {
  const sectionRef = useRef(null);
  const [visibleCards, setVisibleCards] = useState(3);
  const [scrollEnabled, setScrollEnabled] = useState(true);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleWheel = (e) => {
      const atBottom = visibleCards >= causes.length;
     
      if (e.deltaY > 0 && visibleCards < causes.length) {
        e.preventDefault(); 
        setScrollEnabled(false);
        setVisibleCards((prev) => Math.min(prev + 1, causes.length));
      }

      if (atBottom) {
        setScrollEnabled(true);
      }
    };

    
    const lockScroll = () => {
      if (!scrollEnabled) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    };

    section.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('scroll', lockScroll);

    return () => {
      section.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', lockScroll);
      document.body.style.overflow = '';
    };
  }, [visibleCards, scrollEnabled]);

  return (
    <section
      ref={sectionRef}
      className="py-5 relative z-10 bg-[#2B7EC2]"
      // style={{ height: 'auto', overflow: 'hidden' }}
    >
      <div className="w-[95%] mx-auto px-4 text-center h-[700px] overflow-y-auto no-scrollbar">
        <h2 className="text-3xl font-bold py-3">
          Our <span className="text-white">Products</span>
        </h2>
        <p className="text-black">
          Our <span className="text-white font-medium">charity helps</span> those people who have no hope
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 transition-all duration-500 bg-gray-300  p-10 rounded-2xl">
          {causes.slice(0, visibleCards).map((cause, index) => (
            <div key={index} className="bg-white shadow-sm rounded-tr-[100px] border-tr-4 border-[#2F4191] overflow-hidden ">
              <div className="relative">
                <Image
                  src={cause.image}
                  alt={cause.title}
                  width={600}
                  height={400}
                  className="w-full h-64 object-cover"
                />

                <div className="absolute bottom-[-16px] left-30 bg-white border-2 border-[#2B7EC2] text-yellow-600 font-semibold text-sm px-3 py-1 rounded-full shadow-sm">
                  {cause.percentage}+ Products
                </div>
              </div>

              <div className="px-6 pt-8 pb-6 text-center space-y-3">
                <h3 className="text-lg font-semibold">{cause.title}</h3>
                <p className="text-gray-500 text-sm">{cause.description}</p>
                <div className="pt-4">
                  <button className="bg-[#2B7EC2] hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded-sm">
                    EXPLORE MORE
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
