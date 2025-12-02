'use client'

import { useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
// import '@/styles/odometer.css'; 




export default function AboutSection() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Register GSAP plugin
    gsap.registerPlugin(ScrollTrigger);

    // Dynamically load odometer.js only on client side
    import('odometer').then(() => {
      const counters = document.querySelectorAll('.odometer');

      counters.forEach((counter) => {
        const targetValue = counter.getAttribute('data-value');

        ScrollTrigger.create({
          trigger: counter,
          start: 'top 80%',
          onEnter: () => {
            counter.innerHTML = targetValue; // Odometer will animate this
          },
          once: true,
        });
      });
    });

    // Section fade-in animation
    gsap.fromTo(
      '#about-content',
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#about-content',
          start: 'top 80%',
        },
      }
    );
  }, []);

  return (
    <section className="relative py-20  text-black">
      <div id="about-content" className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-[#F67A45] mb-6 uppercase font-[Teko]">
          GYM Fitness Meets <span className="text-black">Excellence!</span>
        </h2>
        <p className="text-gray-700 max-w-2xl mb-8">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mt-10">
          <div className="text-center">
            <div className="odometer text-5xl font-bold text-[#F67A45]" data-value="10">0</div>
            <div className="text-sm font-semibold text-gray-600 mt-2">Years of Service</div>
          </div>
          <div className="text-center">
            <div className="odometer text-5xl font-bold text-[#F67A45]" data-value="29">0</div>
            <div className="text-sm font-semibold text-gray-600 mt-2">Fitness Trainee</div>
          </div>
          <div className="text-center">
            <div className="odometer text-5xl font-bold text-[#F67A45]" data-value="3000">0</div>
            <div className="text-sm font-semibold text-gray-600 mt-2">Hours Trained</div>
          </div>
          <div className="text-center">
            <div className="odometer text-5xl font-bold text-[#F67A45]" data-value="42">0</div>
            <div className="text-sm font-semibold text-gray-600 mt-2">Happy Clients</div>
          </div>
        </div>
      </div>
    </section>
  );
}
