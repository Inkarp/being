'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

// Animated Counter Component
const Odometer = ({ target, suffix = '', duration = 10000 }) => {
  const [count, setCount] = useState(0);
  const [inView, setInView] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setInView(true);
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const increment = target > 0 ? 1 : -1;
    const stepTime = Math.abs(Math.floor(duration / target));

    const timer = setInterval(() => {
      start += increment;
      setCount(start);
      if ((increment > 0 && start >= target) || (increment < 0 && start <= target)) {
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <div ref={ref} className="text-[32px] md:text-[40px] font-extrabold text-black">
      {count}
      {suffix}
    </div>
  );
};

export default function AboutOneNew() {
  return (
    <section className="py-12 px-6 md:px-16 bg-white">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        {/* Left: Images */}
        <div className="relative flex gap-5">
          <div className="flex flex-col gap-5">
            <Image src="/about.jpg" alt="Image 1" width={300} height={400} className="rounded-md object-cover" />
            <Image src="/about.jpg" alt="Image 2" width={300} height={400} className="rounded-md object-cover" />
          </div>
           <Image src="/about.jpg" alt="Image 2" width={300} height={400} className="rounded-md object-cover" />
          {/* Circle Badge */}
          <div className="absolute top-1/2 left-[45%] bg-[#2B7EC2] rounded-full p-2 spin-slow transform -translate-y-1/2 -translate-x-1/2 z-10">
            <Image src="/Circle-Button.svg" alt="Badge" width={100} height={100} />
          </div>
        </div>

        {/* Right: Text + Counters */}
        <div>
          {/* Heading */}
          <span className="text-[#F67A45] border-l-2 border-r-2 px-2 border-[#F67A45] text-[12px] font-medium tracking-widest">ABOUT US</span><br/>
          <div className="font-bold uppercase text-[32px] md:text-[44px] text-[#01010F] font-[Teko] flex flex-wrap gap-3 items-center"> 
            <span>WHERE SCIENCE MEETS <span>HERE</span></span>
           
           <span className='text-[#2B7EC2]'>Excellence!</span>
          </div>

          {/* Subheading */}
          {/* <h3 className="text-[32px] font-extrabold text-[#F67A45] mt-4 tracking-wider uppercase">
          Excellence!
          </h3> */}

          {/* Paragraph */}
          <p className="text-gray-600 mt-4 text-[15px] leading-relaxed">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text. Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          </p>

          {/* Stats Grid */}
          <div className="mt-10 space-y-8">
            {/* Row 1 */}
            <div className="flex flex-wrap md:flex-nowrap gap-10">
              <StatBlock number={10} suffix="+" label="YEARS OF SERVICE" />
              <StatBlock number={100} suffix="+" label="PRODUCTS" />
            </div>

            <hr className="border-t border-[#2B7EC2] w-full" />

            {/* Row 2 */}
            <div className="flex flex-wrap md:flex-nowrap gap-10">
              <StatBlock number={100} suffix="K" label="HAPPY CUSTOMERS" />
              <StatBlock number={42} suffix="+" label="HAPPY CLIENTS" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Reusable StatBlock
const StatBlock = ({ number, suffix, label }) => (
  <div className="flex items-center gap-6">
    <Odometer target={number} suffix={suffix} />
    <div className="w-[1px] h-10 bg-[#2B7EC2]"></div>
    <div className="text-sm font-bold uppercase text-[#01010F] whitespace-nowrap">{label}</div>
  </div>
);
