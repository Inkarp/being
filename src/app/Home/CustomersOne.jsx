'use client';

import { useState } from 'react';

const CATEGORIES = [
    'Government',
    'Academia-Government',
    'Academia-Private',
    'Dealer',  
    'Private',
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
];

export default function CustomersOne() {
    const [activeCategory, setActiveCategory] = useState('Government');

    const filteredCustomers = CUSTOMERS.filter(
        (c) => c.category === activeCategory
    );

    return (
        // <section className="h-screen w-full flex flex-col bg-gradient-to-br from-slate-50 to-blue-50/50">
        <section className="h-screen w-full flex flex-col">
            {/* HEADER */}
            <div className="text-center flex-shrink-0">
                <span className="inline-block px-6 py-2 text-xs font-bold uppercase tracking-widest
                bg-gradient-to-br from-[#2F4191]/50 to-[#2B7EC2]/50
                border border-gray-200 rounded-full">
                    Our Customers
                </span>
                <p className="mt-4 text-gray-600  mx-auto text-lg">
                    Our customers span academia, government, and industry, reflecting long-standing trust and partnerships.
                </p>
            </div>

            {/* MAIN LAYOUT */}
            <div className="flex-1 flex flex-col gap-0 overflow-hidden py-2 space-y-3">
                {/* ================= MOBILE DROPDOWN ================= */}
                <div className="lg:hidden bg-white ">
                    <select
                        value={activeCategory}
                        onChange={(e) => setActiveCategory(e.target.value)}
                        className="w-full border bg-[#2F4191] border-gray-300 rounded-lg px-2 py-2 text-gray-700 focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all duration-200"
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
                                className={`w-full text-center px-4 py-3 rounded-lg  border transition-all duration-200 text-sm font-medium
                                    ${activeCategory === cat
                                        ? 'bg-[#2B7EC2] text-white border-white/50 text-lg'
                                        : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300 hover:shadow-sm cursor-pointer'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

               
                <div className="lg:col-span-3 flex flex-col overflow-hidden">
                    <div className="flex-1 border border-gray-200 rounded-xl p-8 overflow-hidden bg-[#F5F5F5] shadow-sm">
                        <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                            {filteredCustomers.length === 0 ? (
                                <div className="flex items-center justify-center h-64 text-gray-500">
                                    {/* <p className="text-lg">No customers found in this category.</p> */}
                                </div>
                            ) : (
                                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                                    {filteredCustomers.map((cust, index) => (
                                        <div
                                            key={index}
                                            className="relative group border border-gray-200 rounded-lg px-2 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 bg-white text-center h-20 flex items-center justify-center hover:bg-[#2F4191] hover:text-white"
                                        >
                                            <p className="font-medium text-xs md:text-sm leading-tight">
                                                {cust.name}
                                            </p>

                                            {/* HOVER TOOLTIP — desktop only */}
                                            <div className="hidden lg:block absolute bottom-1/2 left-1/2 -translate-x-1/2 mb-3 w-72 bg-white border border-gray-200 rounded-xl shadow-xl p-5 opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto transition-all duration-200 z-100 max-w-xs">
                                                <p className="text-lg font-semibold text-[#2B7EC2] tracking-wide">
                                                    Products Purchased
                                                </p>
                                                <ul className="text-sm text-gray-700 z-100 space-y-1 max-h-32 overflow-y-auto">
                                                    {cust.products.map((p, i) => (
                                                        <li key={i} className="flex items-center ">
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
