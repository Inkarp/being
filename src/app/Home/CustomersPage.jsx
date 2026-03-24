'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import Testimonials from './Testimonials';

const STATS = [
  { value: '2000+', label: 'Happy Customers' },
  { value: '5000+', label: 'Installations' },
  { value: '10+', label: 'Products' },
];

const FEATURED_CLIENTS = [
  { name: 'Tesla Motors', logo: "/BangloreUniversity.jpg", color: '#E31937', products: ['CRM', 'Analytics', 'IoT Platform'] },
  { name: 'Microsoft Corp', logo: "/asian-paints-logo.avif", color: '#00A4EF', products: ['Azure AI', 'Dynamics 365', 'Power BI'] },
  { name: 'Reliance Ind.', logo: "/aurobindo.webp", color: '#1C4DA1', products: ['ERP', 'HRMS', 'Payroll'] },
  { name: 'Flipkart', logo: "/logo-iisc.png", color: '#2874F0', products: ['E-Commerce', 'Analytics', 'WMS'] },
  { name: 'Airtel', logo: "/BangloreUniversity.jpg", color: '#E40000', products: ['CRM', 'Billing', 'Support'] },
];

const INDUSTRY_LOGOS = [
  'Indian Scientific Company',
  'Biocon Limited - SEZ Unit',
  'Asian Paints Limited (Mahape)',
  'Bangalore University',
  'Indian Institute of Science (IISc) - Bengaluru',
  'Asian Paints Limited (Mahape)',
  'Indian Institute of Science (IISc) - Bengaluru',
  'Asian Paints Limited (Mahape)',
];

const TESTIMONIALS = [
  { quote: 'The CRM and Analytics suite transformed how we manage customer relationships. 300% ROI in just 6 months!', author: 'Elon Musk', title: 'CEO, Tesla Motors', color: '#E31937', initials: 'EM' },
  { quote: 'Seamless implementation of Dynamics 365 across our 50,000+ employees. Outstanding support!', author: 'Satya Nadella', title: 'CEO, Microsoft', color: '#00A4EF', initials: 'SN' },
  { quote: 'From manual to automated in 3 months. Their ERP solution scaled with our business perfectly.', author: 'Isha Ambani', title: 'Director, Reliance', color: '#1C4DA1', initials: 'IA' },
];

const INSTALLATIONS = [
  { name: 'INDIAN SCIENTIFIC COMPANY', location: 'Bangalore, India', color: '#111', initials: 'OL', products: ["FT-IR Spectrometer", "HPLC System"], year: 2024 },
  { name: 'Biocon Limited - SEZ Unit', location: 'Gurgaon, India', color: '#E23744', initials: 'ZO', products: ["FT-IR Spectrometer", "HPLC System"], year: 2024 },
  { name:'Asian Paints Limited (Mahape)', location: 'Mumbai, India', color: '#6C3EB8', initials: 'BY', products: ["FT-IR Spectrometer", "HPLC System"], year: 2024 },
  { name: 'Bangalore University', location: 'Noida, India', color: '#00BAF2', initials: 'PT', products: ["FT-IR Spectrometer", "HPLC System"], year: 2023 },
  { name: 'Indian Institute of Science (IISc) - Bengaluru', location: 'Bangalore, India', color: '#6C3EB8', initials: 'BY', products: ["FT-IR Spectrometer", "HPLC System"], year: 2024 },
  { name:'Asian Paints Limited (Mahape)', location: 'Noida, India', color: '#00BAF2', initials: 'PT', products: ["FT-IR Spectrometer", "HPLC System"], year: 2024 },
  { name: 'Indian Institute of Science (IISc) - Bengaluru', location: 'Hyderabad, India', color: '#FC8019', initials: 'SW', products: ["FT-IR Spectrometer", "HPLC System"], year: 2024 },
  { name: 'Asian Paints Limited (Mahape)', location: 'Bangalore, India', color: '#5F259F', initials: 'PP', products: ["FT-IR Spectrometer", "HPLC System"], year: 2024 },
];

const TAG_COLORS = {
  CRM: { bg: '#EEF2FF', text: '#4338CA' },
  Analytics: { bg: '#FFF7ED', text: '#C2410C' },
  Billing: { bg: '#F0FDF4', text: '#15803D' },
  'E-Commerce': { bg: '#FEF9C3', text: '#854D0E' },
  Support: { bg: '#F0FDF4', text: '#15803D' },
  HRMS: { bg: '#F5F3FF', text: '#6D28D9' },
  Payroll: { bg: '#FFF1F2', text: '#BE123C' },
  Payment: { bg: '#EFF6FF', text: '#1D4ED8' },
  'Fraud Guard': { bg: '#FFF7ED', text: '#C2410C' },
  Delivery: { bg: '#F0FDF4', text: '#15803D' },
  Wallet: { bg: '#F5F3FF', text: '#6D28D9' },
  KYC: { bg: '#FFF1F2', text: '#BE123C' },
  'Azure AI': { bg: '#EFF6FF', text: '#1D4ED8' },
  'Dynamics 365': { bg: '#EEF2FF', text: '#4338CA' },
  'Power BI': { bg: '#FFF7ED', text: '#C2410C' },
  ERP: { bg: '#ECFDF5', text: '#065F46' },
  'IoT Platform': { bg: '#F5F3FF', text: '#6D28D9' },
  WMS: { bg: '#FEF9C3', text: '#854D0E' },
};

function Tag({ label }) {
  const c = TAG_COLORS[label] || { bg: '#F3F4F6', text: '#374151' };
  return (
    <span
      className="text-xs font-semibold px-2 py-0.5 rounded-full"
      style={{ backgroundColor: c.bg, color: c.text }}
    >
      {label}
    </span>
  );
}

export default function CustomersPage() {
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTestimonialIndex(prev => (prev + 1) % TESTIMONIALS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const visibleTestimonials = [
    TESTIMONIALS[testimonialIndex % TESTIMONIALS.length],
    TESTIMONIALS[(testimonialIndex + 1) % TESTIMONIALS.length],
    TESTIMONIALS[(testimonialIndex + 2) % TESTIMONIALS.length],
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track { animation: marquee 28s linear infinite; }
        .marquee-track:hover { animation-play-state: paused; }
      `}</style>

      {/* ── SECTION 1: HERO ── */}
      <div className="bg-white border-b border-gray-100 text-center py-10 px-6">
        <span className="inline-block px-4 py-1 text-xs font-bold uppercase tracking-widest text-blue-600 border border-blue-200 rounded-full bg-blue-50 mb-4">
          Trusted by 2000+ Customers
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-8">
          Powering 2000+ Businesses Indiawide 🌍
        </h1>
        <div className="flex justify-center">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={`px-10 py-2 ${i < STATS.length - 1 ? 'border-r-2 border-gray-200' : ''}`}
            >
              <p className="text-4xl font-extrabold text-[#2B7EC2]">{s.value}</p>
              <p className="text-sm text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── SECTION 2: FEATURED CLIENTS ── */}
      <div className="bg-white py-10 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">⭐ Featured Clients</h2>
            <p className="text-gray-400 text-sm mt-1">Some of our most valued enterprise customers</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {FEATURED_CLIENTS.map((c, i) => (
              <div
                key={i}
                className="relative border-2 border-gray-200 hover:border-blue-400 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 rounded-2xl p-4 w-44 flex flex-col items-center gap-2 bg-white cursor-pointer"
              >
                {/* <span className="absolute -top-3 left-3 bg-yellow-400 text-yellow-900 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full tracking-wider">
                  Featured
                </span> */}
                <p className="text-xl font-black mt-2" style={{ color: c.color }}>
                  <Image src={c.logo} alt='' width={150} height={50} />
                </p>
                {/* <p className="font-semibold text-sm text-gray-800 flex items-center gap-1">
                  {c.name}
                  <svg className="w-3.5 h-3.5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </p>
                <div className="flex flex-wrap gap-1 justify-center">
                  {c.products.map(p => <Tag key={p} label={p} />)}
                </div> */}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SECTION 3: LOGO SCROLLER ── */}
      <div className="bg-gray-50 py-10 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 text-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Trusted by Industry Leaders</h2>
          <p className="text-gray-400 text-sm mt-1">🔒 Hover over any logo to see installed products</p>
        </div>
        <div className="relative overflow-hidden">
          <div className="flex gap-16 marquee-track whitespace-nowrap">
            {INDUSTRY_LOGOS.map((logo, i) => (
              <span key={i} className="text-xl font-bold text-gray-400 hover:text-gray-800 transition-colors cursor-pointer shrink-0">
                {logo}
              </span>
            ))}
          </div>
          <div className="absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-gray-50 to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none" />
        </div>
      </div>

      {/* ── SECTION 4: TESTIMONIALS ── */}
      {/* <div className="bg-gray-50 py-12">
        <div className="max-w-8xl mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">What Our Customers Say</h2>
            <p className="text-gray-400 mt-1 text-sm">Real stories from real customers</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {visibleTestimonials.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex gap-0.5 mb-3">
                  {[1,2,3,4,5].map(s => (
                    <svg key={s} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed my-4 italic">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
                    style={{ backgroundColor: t.color }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{t.author}</p>
                    <p className="text-xs text-gray-400">{t.title}</p>
                  </div>
                  <div
                    className="ml-auto w-8 h-8 rounded flex items-center justify-center text-xs font-black"
                    style={{ backgroundColor: t.color + '25', color: t.color }}
                  >
                    {t.author[0]}
                  </div>
                </div>
              </div>
            ))}
          </div>
    
          <div className="flex justify-center gap-2 mt-6">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setTestimonialIndex(i)}
                className={`h-2 rounded-full transition-all duration-300 ${i === testimonialIndex ? 'bg-blue-500 w-6' : 'bg-gray-300 w-2'}`}
              />
            ))}
           
          </div>
        </div>
      </div> */}
      <Testimonials />

      {/* ── SECTION 5: EXPLORE INSTALLATIONS ── */}
      <div className="bg-white py-12 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Explore Installations</h2>

          {/* Filter tabs */}
          <div className="flex gap-2 flex-wrap justify-center mb-8">
            {['All Customers (2000+)', 'Academic-Government', 'Academic-Private', 'Private', 'Dealer', ].map((tab, i) => (
              <button
                key={tab}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${i === 0
                    ? 'bg-[#2F4191] text-white shadow'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Installation cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {INSTALLATIONS.map((c, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md hover:-translate-y-0.5 transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0"
                    style={{ backgroundColor: c.color }}
                  >
                    {c.initials}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{c.name}</p>
                    <p className="text-xs text-gray-400">📍 {c.location}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {c.products.map(p => <Tag key={p} label={p} />)}
                </div>
                <p className="text-xs text-green-500 font-medium">✅ Installed {c.year}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-10">
            <button className="px-8 py-3 rounded-full border-2 border-[#2F4191] text-[#2F4191] font-semibold hover:bg-[#2F4191] hover:text-white transition-all text-sm">
              View All 2000+ Customers →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}