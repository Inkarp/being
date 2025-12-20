'use client';

import { useState } from 'react';

const productData = {
  'Laboratory Drying Oven (LCD, up to 250 °C)': ['BPG-9040A', 'BPG-9070A', 'BPG-9140A', 'BPG-9240A', 'BPG-9420A'],
  'Laboratory Drying Oven (Touch, up to 300 °C)': ['BO-30F', 'BO-50F', 'BO-120F', 'BO-200F', 'BO-400F'],
  'Vacuum Oven (LED Display)': ['DZF-6032', 'DZF-6053', 'DZF-6092', 'DZF-6123', 'DZF-6213'],
  'Vacuum Oven (Touch Control)': ['BV-20', 'BV-50', 'BV-90', 'BV-120', 'BV-210'],
  'Vacuum Pump (Oil-Sealed)': ['VRI-4', 'VRI-8', 'VRD-16', 'VRD-16', 'VRD-16'],
  'Diaphragm Pump': ['V-20', 'V-40', 'V-65', 'V-135'],
  'Rotary Evaporator (Upto 185 °C Bath)': ['RV-21A', 'RV-5A', 'RV-20A', 'RV-50A'],
  'Rotary Evaporator Controller': ['VC-50'],
  'Recirculating Chiller (–20 °C to +20 °C)': ['BR-03A', 'BR-05A', 'BR-20A', 'BR-30A'],
  'Recirculating Chiller (–10 °C to +100 °C)': ['MP-10C', 'MP-30C', 'MPG-10C', 'MPG-40C'],
  'High-Temperature Chiller (-10°C/–40 °C to +150 °C)': ['BP-5B', 'BP-13L'],
  'Water Bath': ['BWS-20'],
};

export default function ProductDetails({ params }) {
  const [selectedCategory, setSelectedCategory] = useState(Object.keys(productData)[0]);
  const models = productData[selectedCategory] || [];

  return (
    <div className="flex min-h-screen bg-gray-100 p-6">
      {/* Left Sidebar */}
      <div className="w-1/3 bg-white shadow-md rounded-lg p-4 space-y-3">
        <h2 className="text-lg font-bold mb-2">Product Categories</h2>
        {Object.keys(productData).map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`block w-full text-left px-4 py-2 rounded-md hover:bg-blue-100 ${
              selectedCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-100'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Right Content */}
      <div className="w-2/3 p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">{selectedCategory}</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {models.map((model, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow p-4 text-center text-lg font-medium text-blue-700"
            >
              {model}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
