'use client';

import { useState } from 'react';

const CATEGORIES = [
    'Academia-Government',
    'Academia-Private',
    'Government',
    'Private',
    'Dealer',
];


const CUSTOMERS = [
    { name: 'Asian Paints Limited (Mahape)', category: 'Private', products: ["FT-IR Spectrometer", "HPLC System"] },
    { name: 'Bangalore University', category: 'Academia-Government', products: ["AFM Microscope", "Rotary Evaporator"] },
    { name: 'Aurobindo Pharma Limited - Unit 3', category: 'Private', products: ["Freeze Dryer", "UV-Vis Spectrophotometer"] },
    { name: 'AVIRAL POWER SOLUTIONS PVT LTD', category: 'Dealer', products: ["FT-IR Spectrometer", "HPLC System"] },
    { name: 'Indian Institute of Science (IISc) - Bengaluru', category: 'Academia-Government', products: ["AFM Microscope", "Rotary Evaporator"] },
    { name: 'Hindustan Petroleum Corporation Limited', category: 'Government', products: ["Freeze Dryer", "UV-Vis Spectrophotometer"] },
    { name: 'Birla Institute of Technology & Science (BITS) Pilani - Hyderabad', category: 'Academia-Private', products: ["FT-IR Spectrometer", "HPLC System"] },
    { name: 'ICAR - Indian Veterinary Research Institute (IVRI)', category: 'Government', products: ["Freeze Dryer", "UV-Vis Spectrophotometer"] },
    { name: 'INDIAN SCIENTIFIC COMPANY', category: 'Dealer', products: ["FT-IR Spectrometer", "HPLC System"] },
    { name: 'Biocon Limited - SEZ Unit', category: 'Private', products: ["Freeze Dryer", "UV-Vis Spectrophotometer"] },
    { name: 'Asian Paints Limited (Mahape)', category: 'Private', products: ["FT-IR Spectrometer", "HPLC System"] },
    { name: 'Bangalore University', category: 'Academia-Government', products: ["AFM Microscope", "Rotary Evaporator"] },
    { name: 'Aurobindo Pharma Limited - Unit 3', category: 'Private', products: ["Freeze Dryer", "UV-Vis Spectrophotometer"] },
    { name: 'AVIRAL POWER SOLUTIONS PVT LTD', category: 'Dealer', products: ["FT-IR Spectrometer", "HPLC System"] },
    { name: 'Indian Institute of Science (IISc) - Bengaluru', category: 'Academia-Government', products: ["AFM Microscope", "Rotary Evaporator"] },
    { name: 'Hindustan Petroleum Corporation Limited', category: 'Government', products: ["Freeze Dryer", "UV-Vis Spectrophotometer"] },
    { name: 'Birla Institute of Technology & Science (BITS) Pilani - Hyderabad', category: 'Academia-Private', products: ["FT-IR Spectrometer", "HPLC System"] },
    { name: 'ICAR - Indian Veterinary Research Institute (IVRI)', category: 'Government', products: ["Freeze Dryer", "UV-Vis Spectrophotometer"] },
    { name: 'INDIAN SCIENTIFIC COMPANY', category: 'Dealer', products: ["FT-IR Spectrometer", "HPLC System"] },
    { name: 'Biocon Limited - SEZ Unit', category: 'Private', products: ["Freeze Dryer", "UV-Vis Spectrophotometer"] },
    { name: 'Asian Paints Limited (Mahape)', category: 'Private', products: ["FT-IR Spectrometer", "HPLC System"] },
    { name: 'Bangalore University', category: 'Academia-Government', products: ["AFM Microscope", "Rotary Evaporator"] },
    { name: 'Aurobindo Pharma Limited - Unit 3', category: 'Private', products: ["Freeze Dryer", "UV-Vis Spectrophotometer"] },
    { name: 'AVIRAL POWER SOLUTIONS PVT LTD', category: 'Dealer', products: ["FT-IR Spectrometer", "HPLC System"] },
    { name: 'Indian Institute of Science (IISc) - Bengaluru', category: 'Academia-Government', products: ["AFM Microscope", "Rotary Evaporator"] },
    { name: 'Hindustan Petroleum Corporation Limited', category: 'Government', products: ["Freeze Dryer", "UV-Vis Spectrophotometer"] },
    { name: 'Birla Institute of Technology & Science (BITS) Pilani - Hyderabad', category: 'Academia-Private', products: ["FT-IR Spectrometer", "HPLC System"] },
    { name: 'ICAR - Indian Veterinary Research Institute (IVRI)', category: 'Government', products: ["Freeze Dryer", "UV-Vis Spectrophotometer"] },
    { name: 'INDIAN SCIENTIFIC COMPANY', category: 'Dealer', products: ["FT-IR Spectrometer", "HPLC System"] },
    { name: 'Biocon Limited - SEZ Unit', category: 'Private', products: ["Freeze Dryer", "UV-Vis Spectrophotometer"] },
    { name: 'Asian Paints Limited (Mahape)', category: 'Private', products: ["FT-IR Spectrometer", "HPLC System"] },
    { name: 'Bangalore University', category: 'Academia-Government', products: ["AFM Microscope", "Rotary Evaporator"] },
    { name: 'Aurobindo Pharma Limited - Unit 3', category: 'Private', products: ["Freeze Dryer", "UV-Vis Spectrophotometer"] },
    { name: 'AVIRAL POWER SOLUTIONS PVT LTD', category: 'Dealer', products: ["FT-IR Spectrometer", "HPLC System"] },
    { name: 'Indian Institute of Science (IISc) - Bengaluru', category: 'Academia-Government', products: ["AFM Microscope", "Rotary Evaporator"] },
    { name: 'Hindustan Petroleum Corporation Limited', category: 'Government', products: ["Freeze Dryer", "UV-Vis Spectrophotometer"] },
    { name: 'Birla Institute of Technology & Science (BITS) Pilani - Hyderabad', category: 'Academia-Private', products: ["FT-IR Spectrometer", "HPLC System"] },
    { name: 'ICAR - Indian Veterinary Research Institute (IVRI)', category: 'Government', products: ["Freeze Dryer", "UV-Vis Spectrophotometer"] },
    { name: 'INDIAN SCIENTIFIC COMPANY', category: 'Dealer', products: ["FT-IR Spectrometer", "HPLC System"] },
    { name: 'Biocon Limited - SEZ Unit', category: 'Private', products: ["Freeze Dryer", "UV-Vis Spectrophotometer"] },
    { name: 'Asian Paints Limited (Mahape)', category: 'Private', products: ["FT-IR Spectrometer", "HPLC System"] },
    { name: 'Bangalore University', category: 'Academia-Government', products: ["AFM Microscope", "Rotary Evaporator"] },
    { name: 'Aurobindo Pharma Limited - Unit 3', category: 'Private', products: ["Freeze Dryer", "UV-Vis Spectrophotometer"] },
    { name: 'AVIRAL POWER SOLUTIONS PVT LTD', category: 'Dealer', products: ["FT-IR Spectrometer", "HPLC System"] },
    { name: 'Indian Institute of Science (IISc) - Bengaluru', category: 'Academia-Government', products: ["AFM Microscope", "Rotary Evaporator"] },
    { name: 'Hindustan Petroleum Corporation Limited', category: 'Government', products: ["Freeze Dryer", "UV-Vis Spectrophotometer"] },
    { name: 'Birla Institute of Technology & Science (BITS) Pilani - Hyderabad', category: 'Academia-Private', products: ["FT-IR Spectrometer", "HPLC System"] },
    { name: 'ICAR - Indian Veterinary Research Institute (IVRI)', category: 'Government', products: ["Freeze Dryer", "UV-Vis Spectrophotometer"] },
    { name: 'INDIAN SCIENTIFIC COMPANY', category: 'Dealer', products: ["FT-IR Spectrometer", "HPLC System"] },
    { name: 'Biocon Limited - SEZ Unit', category: 'Private', products: ["Freeze Dryer", "UV-Vis Spectrophotometer"] },
    { name: 'Asian Paints Limited (Mahape)', category: 'Private', products: ["FT-IR Spectrometer", "HPLC System"] },
    { name: 'Bangalore University', category: 'Academia-Government', products: ["AFM Microscope", "Rotary Evaporator"] },
    { name: 'Aurobindo Pharma Limited - Unit 3', category: 'Private', products: ["Freeze Dryer", "UV-Vis Spectrophotometer"] },
    { name: 'AVIRAL POWER SOLUTIONS PVT LTD', category: 'Dealer', products: ["FT-IR Spectrometer", "HPLC System"] },
    { name: 'Indian Institute of Science (IISc) - Bengaluru', category: 'Academia-Government', products: ["AFM Microscope", "Rotary Evaporator"] },
    { name: 'Hindustan Petroleum Corporation Limited', category: 'Government', products: ["Freeze Dryer", "UV-Vis Spectrophotometer"] },
    { name: 'Birla Institute of Technology & Science (BITS) Pilani - Hyderabad', category: 'Academia-Private', products: ["FT-IR Spectrometer", "HPLC System"] },
    { name: 'ICAR - Indian Veterinary Research Institute (IVRI)', category: 'Government', products: ["Freeze Dryer", "UV-Vis Spectrophotometer"] },
    { name: 'INDIAN SCIENTIFIC COMPANY', category: 'Dealer', products: ["FT-IR Spectrometer", "HPLC System"] },
    { name: 'Biocon Limited - SEZ Unit', category: 'Private', products: ["Freeze Dryer", "UV-Vis Spectrophotometer"] },
    { name: 'Asian Paints Limited (Mahape)', category: 'Private', products: ["FT-IR Spectrometer", "HPLC System"] },
    { name: 'Bangalore University', category: 'Academia-Government', products: ["AFM Microscope", "Rotary Evaporator"] },
    { name: 'Aurobindo Pharma Limited - Unit 3', category: 'Private', products: ["Freeze Dryer", "UV-Vis Spectrophotometer"] },
    { name: 'AVIRAL POWER SOLUTIONS PVT LTD', category: 'Dealer', products: ["FT-IR Spectrometer", "HPLC System"] },
    { name: 'Indian Institute of Science (IISc) - Bengaluru', category: 'Academia-Government', products: ["AFM Microscope", "Rotary Evaporator"] },
    { name: 'Hindustan Petroleum Corporation Limited', category: 'Government', products: ["Freeze Dryer", "UV-Vis Spectrophotometer"] },
    { name: 'Birla Institute of Technology & Science (BITS) Pilani - Hyderabad', category: 'Academia-Private', products: ["FT-IR Spectrometer", "HPLC System"] },
    { name: 'ICAR - Indian Veterinary Research Institute (IVRI)', category: 'Government', products: ["Freeze Dryer", "UV-Vis Spectrophotometer"] },
    { name: 'INDIAN SCIENTIFIC COMPANY', category: 'Dealer', products: ["FT-IR Spectrometer", "HPLC System"] },
    { name: 'Biocon Limited - SEZ Unit', category: 'Private', products: ["Freeze Dryer", "UV-Vis Spectrophotometer"] },
    { name: 'Asian Paints Limited (Mahape)', category: 'Private', products: ["FT-IR Spectrometer", "HPLC System"] },
    { name: 'Bangalore University', category: 'Academia-Government', products: ["AFM Microscope", "Rotary Evaporator"] },
    { name: 'Aurobindo Pharma Limited - Unit 3', category: 'Private', products: ["Freeze Dryer", "UV-Vis Spectrophotometer"] },
    { name: 'AVIRAL POWER SOLUTIONS PVT LTD', category: 'Dealer', products: ["FT-IR Spectrometer", "HPLC System"] },
    { name: 'Indian Institute of Science (IISc) - Bengaluru', category: 'Academia-Government', products: ["AFM Microscope", "Rotary Evaporator"] },
    { name: 'Hindustan Petroleum Corporation Limited', category: 'Government', products: ["Freeze Dryer", "UV-Vis Spectrophotometer"] },
    { name: 'Birla Institute of Technology & Science (BITS) Pilani - Hyderabad', category: 'Academia-Private', products: ["FT-IR Spectrometer", "HPLC System"] },
    { name: 'ICAR - Indian Veterinary Research Institute (IVRI)', category: 'Government', products: ["Freeze Dryer", "UV-Vis Spectrophotometer"] },
    { name: 'INDIAN SCIENTIFIC COMPANY', category: 'Dealer', products: ["FT-IR Spectrometer", "HPLC System"] },
    { name: 'Biocon Limited - SEZ Unit', category: 'Private', products: ["Freeze Dryer", "UV-Vis Spectrophotometer"] },
    { name: 'Asian Paints Limited (Mahape)', category: 'Private', products: ["FT-IR Spectrometer", "HPLC System"] },
    { name: 'Bangalore University', category: 'Academia-Government', products: ["AFM Microscope", "Rotary Evaporator"] },
    { name: 'Aurobindo Pharma Limited - Unit 3', category: 'Private', products: ["Freeze Dryer", "UV-Vis Spectrophotometer"] },
    { name: 'AVIRAL POWER SOLUTIONS PVT LTD', category: 'Dealer', products: ["FT-IR Spectrometer", "HPLC System"] },
    { name: 'Indian Institute of Science (IISc) - Bengaluru', category: 'Academia-Government', products: ["AFM Microscope", "Rotary Evaporator"] },
    { name: 'Hindustan Petroleum Corporation Limited', category: 'Government', products: ["Freeze Dryer", "UV-Vis Spectrophotometer"]    },
    { name: 'Birla Institute of Technology & Science (BITS) Pilani - Hyderabad', category: 'Academia-Private', products: ["FT-IR Spectrometer", "HPLC System"] },
    { name: 'ICAR - Indian Veterinary Research Institute (IVRI)', category: 'Government', products: ["Freeze Dryer", "UV-Vis Spectrophotometer"] },
    { name: 'INDIAN SCIENTIFIC COMPANY', category: 'Dealer', products: ["FT-IR Spectrometer", "HPLC System"] },
    { name: 'Biocon Limited - SEZ Unit', category: 'Private', products: ["Freeze Dryer", "UV-Vis Spectrophotometer"] },
    { name: 'Asian Paints Limited (Mahape)', category: 'Private', products: ["FT-IR Spectrometer", "HPLC System"] },
    { name: 'Bangalore University', category: 'Academia-Government', products: ["AFM Microscope", "Rotary Evaporator"] },
    { name: 'Aurobindo Pharma Limited - Unit 3', category: 'Private', products: ["Freeze Dryer", "UV-Vis Spectrophotometer"] },
    { name: 'AVIRAL POWER SOLUTIONS PVT LTD', category: 'Dealer', products: ["FT-IR Spectrometer", "HPLC System"] },
    { name: 'Indian Institute of Science (IISc) - Bengaluru', category: 'Academia-Government', products: ["AFM Microscope", "Rotary Evaporator"] },
    { name: 'Hindustan Petroleum Corporation Limited', category: 'Government', products: ["Freeze Dryer", "UV-Vis Spectrophotometer"] },
    { name: 'Birla Institute of Technology & Science (BITS) Pilani - Hyderabad', category: 'Academia-Private', products: ["FT-IR Spectrometer", "HPLC System"] },
    { name: 'ICAR - Indian Veterinary Research Institute (IVRI)', category: 'Government', products: ["Freeze Dryer", "UV-Vis Spectrophotometer"] },
    { name: 'INDIAN SCIENTIFIC COMPANY', category: 'Dealer', products: ["FT-IR Spectrometer", "HPLC System"] },
    { name: 'Biocon Limited - SEZ Unit', category: 'Private', products: ["Freeze Dryer", "UV-Vis Spectrophotometer"] },
    { name: 'Asian Paints Limited (Mahape)', category: 'Private', products: ["FT-IR Spectrometer", "HPLC System"] },
    { name: 'Bangalore University', category: 'Academia-Government', products: ["AFM Microscope", "Rotary Evaporator"] },
    { name: 'Aurobindo Pharma Limited - Unit 3', category: 'Private', products: ["Freeze Dryer", "UV-Vis Spectrophotometer"] },
    { name: 'AVIRAL POWER SOLUTIONS PVT LTD', category: 'Dealer', products: ["FT-IR Spectrometer", "HPLC System"] },
    { name: 'Indian Institute of Science (IISc) - Bengaluru', category: 'Academia-Government', products: ["AFM Microscope", "Rotary Evaporator"] },
    { name: 'Hindustan Petroleum Corporation Limited', category: 'Government', products: ["Freeze Dryer", "UV-Vis Spectrophotometer"] },
    { name: 'Birla Institute of Technology & Science (BITS) Pilani - Hyderabad', category: 'Academia-Private', products: ["FT-IR Spectrometer", "HPLC System"] },
    { name: 'ICAR - Indian Veterinary Research Institute (IVRI)', category: 'Government', products: ["Freeze Dryer", "UV-Vis Spectrophotometer"] },
    { name: 'INDIAN SCIENTIFIC COMPANY', category: 'Dealer', products: ["FT-IR Spectrometer", "HPLC System"] },
    { name: 'Biocon Limited - SEZ Unit', category: 'Private', products: ["Freeze Dryer", "UV-Vis Spectrophotometer"] },
    { name: 'Asian Paints Limited (Mahape)', category: 'Private', products: ["FT-IR Spectrometer", "HPLC System"] },
    { name: 'Bangalore University', category: 'Academia-Government', products: ["AFM Microscope", "Rotary Evaporator"] },
    { name: 'Aurobindo Pharma Limited - Unit 3', category: 'Private', products: ["Freeze Dryer", "UV-Vis Spectrophotometer"] },
    { name: 'AVIRAL POWER SOLUTIONS PVT LTD', category: 'Dealer', products: ["FT-IR Spectrometer", "HPLC System"] },
    { name: 'Indian Institute of Science (IISc) - Bengaluru', category: 'Academia-Government', products: ["AFM Microscope", "Rotary Evaporator"] },
    { name: 'Hindustan Petroleum Corporation Limited', category: 'Government', products: ["Freeze Dryer", "UV-Vis Spectrophotometer"] },
    { name: 'Birla Institute of Technology & Science (BITS) Pilani - Hyderabad', category: 'Academia-Private', products: ["FT-IR Spectrometer", "HPLC System"] },
    { name: 'ICAR - Indian Veterinary Research Institute (IVRI)', category: 'Government', products: ["Freeze Dryer", "UV-Vis Spectrophotometer"] },
    { name: 'INDIAN SCIENTIFIC COMPANY', category: 'Dealer', products: ["FT-IR Spectrometer", "HPLC System"] },
    { name: 'Biocon Limited - SEZ Unit', category: 'Private', products: ["Freeze Dryer", "UV-Vis Spectrophotometer"] },
      { name: 'Asian Paints Limited (Mahape)', category: 'Private', products: ["FT-IR Spectrometer", "HPLC System"] },
    { name: 'Bangalore University', category: 'Academia-Government', products: ["AFM Microscope", "Rotary Evaporator"] },
    { name: 'Aurobindo Pharma Limited - Unit 3', category: 'Private', products: ["Freeze Dryer", "UV-Vis Spectrophotometer"] },
    { name: 'AVIRAL POWER SOLUTIONS PVT LTD', category: 'Dealer', products: ["FT-IR Spectrometer", "HPLC System"] },
    { name: 'Indian Institute of Science (IISc) - Bengaluru', category: 'Academia-Government', products: ["AFM Microscope", "Rotary Evaporator"] },
    { name: 'Hindustan Petroleum Corporation Limited', category: 'Government', products: ["Freeze Dryer", "UV-Vis Spectrophotometer"]    },
    { name: 'Birla Institute of Technology & Science (BITS) Pilani - Hyderabad', category: 'Academia-Private', products: ["FT-IR Spectrometer", "HPLC System"] },
    { name: 'ICAR - Indian Veterinary Research Institute (IVRI)', category: 'Government', products: ["Freeze Dryer", "UV-Vis Spectrophotometer"] },
    { name: 'INDIAN SCIENTIFIC COMPANY', category: 'Dealer', products: ["FT-IR Spectrometer", "HPLC System"] },
    { name: 'Biocon Limited - SEZ Unit', category: 'Private', products: ["Freeze Dryer", "UV-Vis Spectrophotometer"] },
    { name: 'Asian Paints Limited (Mahape)', category: 'Private', products: ["FT-IR Spectrometer", "HPLC System"] },
    { name: 'Bangalore University', category: 'Academia-Government', products: ["AFM Microscope", "Rotary Evaporator"] },
    { name: 'Aurobindo Pharma Limited - Unit 3', category: 'Private', products: ["Freeze Dryer", "UV-Vis Spectrophotometer"] },
    { name: 'AVIRAL POWER SOLUTIONS PVT LTD', category: 'Dealer', products: ["FT-IR Spectrometer", "HPLC System"] },
    { name: 'Indian Institute of Science (IISc) - Bengaluru', category: 'Academia-Government', products: ["AFM Microscope", "Rotary Evaporator"] },
    { name: 'Hindustan Petroleum Corporation Limited', category: 'Government', products: ["Freeze Dryer", "UV-Vis Spectrophotometer"] },
    { name: 'Birla Institute of Technology & Science (BITS) Pilani - Hyderabad', category: 'Academia-Private', products: ["FT-IR Spectrometer", "HPLC System"] },
    { name: 'ICAR - Indian Veterinary Research Institute (IVRI)', category: 'Government', products: ["Freeze Dryer", "UV-Vis Spectrophotometer"] },
    { name: 'INDIAN SCIENTIFIC COMPANY', category: 'Dealer', products: ["FT-IR Spectrometer", "HPLC System"] },
    { name: 'Biocon Limited - SEZ Unit', category: 'Private', products: ["Freeze Dryer", "UV-Vis Spectrophotometer"] },
    { name: 'Asian Paints Limited (Mahape)', category: 'Private', products: ["FT-IR Spectrometer", "HPLC System"] },
    { name: 'Bangalore University', category: 'Academia-Government', products: ["AFM Microscope", "Rotary Evaporator"] },
    { name: 'Aurobindo Pharma Limited - Unit 3', category: 'Private', products: ["Freeze Dryer", "UV-Vis Spectrophotometer"] },
    { name: 'AVIRAL POWER SOLUTIONS PVT LTD', category: 'Dealer', products: ["FT-IR Spectrometer", "HPLC System"] },
    { name: 'Indian Institute of Science (IISc) - Bengaluru', category: 'Academia-Government', products: ["AFM Microscope", "Rotary Evaporator"] },
    { name: 'Hindustan Petroleum Corporation Limited', category: 'Government', products: ["Freeze Dryer", "UV-Vis Spectrophotometer"] },
    { name: 'Birla Institute of Technology & Science (BITS) Pilani - Hyderabad', category: 'Academia-Private', products: ["FT-IR Spectrometer", "HPLC System"] },
    { name: 'ICAR - Indian Veterinary Research Institute (IVRI)', category: 'Government', products: ["Freeze Dryer", "UV-Vis Spectrophotometer"] },
    { name: 'INDIAN SCIENTIFIC COMPANY', category: 'Dealer', products: ["FT-IR Spectrometer", "HPLC System"] },
    { name: 'Biocon Limited - SEZ Unit', category: 'Private', products: ["Freeze Dryer", "UV-Vis Spectrophotometer"] },
    { name: 'Asian Paints Limited (Mahape)', category: 'Private', products: ["FT-IR Spectrometer", "HPLC System"] },
    { name: 'Bangalore University', category: 'Academia-Government', products: ["AFM Microscope", "Rotary Evaporator"] },
    { name: 'Aurobindo Pharma Limited - Unit 3', category: 'Private', products: ["Freeze Dryer", "UV-Vis Spectrophotometer"] },
    { name: 'AVIRAL POWER SOLUTIONS PVT LTD', category: 'Dealer', products: ["FT-IR Spectrometer", "HPLC System"] },
    { name: 'Indian Institute of Science (IISc) - Bengaluru', category: 'Academia-Government', products: ["AFM Microscope", "Rotary Evaporator"] },
    { name: 'Hindustan Petroleum Corporation Limited', category: 'Government', products: ["Freeze Dryer", "UV-Vis Spectrophotometer"] },
    { name: 'Birla Institute of Technology & Science (BITS) Pilani - Hyderabad', category: 'Academia-Private', products: ["FT-IR Spectrometer", "HPLC System"] },
    { name: 'ICAR - Indian Veterinary Research Institute (IVRI)', category: 'Government', products: ["Freeze Dryer", "UV-Vis Spectrophotometer"] },
    { name: 'INDIAN SCIENTIFIC COMPANY', category: 'Dealer', products: ["FT-IR Spectrometer", "HPLC System"] },
    { name: 'Biocon Limited - SEZ Unit', category: 'Private', products: ["Freeze Dryer", "UV-Vis Spectrophotometer"] },
];

export default function CustomersList() {
    const [activeCategory, setActiveCategory] = useState('Private');

    const filteredCustomers = CUSTOMERS.filter(
        (c) => c.category === activeCategory
    );

    return (
        <section className="h- w-full flex flex-col bg-gradient-to-br from-slate-50 to-blue-50/50">
            {/* HEADER */}
            <div className="text-center flex-shrink-0">
                <span className="inline-block px-6 py-2 text-xs font-bold uppercase tracking-widest
                bg-gradient-to-br from-[#2F4191]/50 to-[#2B7EC2]/50
                border border-gray-200 rounded-full">
                    Our Customers
                </span>
                <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-lg">
                    Our customers span academia, government, and industry, reflecting long-standing trust and partnerships.
                </p>
            </div>

            {/* MAIN LAYOUT */}
            <div className="flex-1 flex flex-col gap-0 overflow-hidden p-2 space-y-3">
                {/* ================= MOBILE DROPDOWN ================= */}
                <div className="lg:hidden bg-white border-b border-gray-200 p-4">
                    <select
                        value={activeCategory}
                        onChange={(e) => setActiveCategory(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:ring-2 focus:ring-[#2B7EC2] focus:border-transparent"
                    >
                        {CATEGORIES.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                </div>

                {/* ================= LEFT CATEGORIES (DESKTOP ONLY) ================= */}
                <div className="hidden lg:block flex bg-white border-r border-gray-200">
                     {/* <h3 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wide">Filter by Category</h3> */}
                    <div className="py-2 px-5 space-y-2 sticky top-0 h-full flex gap-3 bg-[#2F4191] rounded-full">
                       
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`w-full text-center px-4 py-3 rounded-lg bg-[#2F4191] border transition-all duration-200 text-sm font-medium
                                    ${activeCategory === cat
                                        ? 'bg-[#2B7EC2] text-white border-white/50 shadow-md'
                                        : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300 hover:shadow-sm cursor-pointer'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* ================= RIGHT CUSTOMER GRID ================= */}
                <div className="lg:col-span-3 flex flex-col overflow-hidden">
                    <div className="flex-1 border border-gray-200 rounded-xl p-6 overflow-hidden bg-white shadow-sm">
                        <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                            {filteredCustomers.length === 0 ? (
                                <div className="flex items-center justify-center h-64 text-gray-500">
                                    <p className="text-lg">No customers found in this category.</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                                    {filteredCustomers.map((cust, index) => (
                                        <div
                                            key={index}
                                            className="relative group border border-gray-200 rounded-lg p-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 bg-white text-center h-28 flex items-center justify-center"
                                        >
                                            <p className="font-medium text-gray-900 text-xs md:text-sm leading-tight">
                                                {cust.name}
                                            </p>

                                            {/* HOVER TOOLTIP — desktop only */}
                                            <div className="hidden lg:block absolute left-1/2 bottom-full -translate-x-1/2 mb-3 w-72 bg-white border border-gray-200 rounded-xl shadow-xl p-5 opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto transition-all duration-200 z-50 max-w-xs">
                                                <p className="text-xs font-semibold text-[#2B7EC2] mb-3 tracking-wide">
                                                    Products Purchased
                                                </p>
                                                <ul className="text-xs text-gray-700 space-y-1 max-h-32 overflow-y-auto">
                                                    {cust.products.map((p, i) => (
                                                        <li key={i} className="flex items-center">
                                                            <span className="w-1.5 h-1.5 bg-[#2B7EC2] rounded-full mr-2"></span>
                                                            {p}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
