'use client';

import { useParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

const applicationsData = {
  'sample-preparation-and-processing': {
    title: 'Sample Preparation & Processing',
    categories: {
      'Laboratory Drying Oven (LCD, up to 250 °C)': ['BPG-9040A', 'BPG-9070A', 'BPG-9140A', 'BPG-9240A', 'BPG-9420A'],
      'Laboratory Drying Oven (Touch, up to 300 °C)': ['BO-30F', 'BO-50F', 'BO-120F', 'BO-200F', 'BO-400F'],
      'Vacuum Oven (LED Display)': ['DZF-6032', 'DZF-6053', 'DZF-6092', 'DZF-6123', 'DZF-6213'],
      'Vacuum Oven (Touch Control)': ['BV-20', 'BV-50', 'BV-90', 'BV-120', 'BV-210'],
      'Vacuum Pump (Oil-Sealed)': ['VRI-4', 'VRI-8', 'VRD-16'],
      'Diaphragm Pump': ['V-20', 'V-40', 'V-65', 'V-135'],
      'Rotary Evaporator (Upto 185 °C Bath)': ['RV-21A', 'RV-5A', 'RV-20A', 'RV-50A'],
      'Rotary Evaporator Controller': ['VC-50'],
      'Recirculating Chiller (–20 °C to +20 °C)': ['BR-03A', 'BR-05A', 'BR-20A', 'BR-30A'],
      'Recirculating Chiller (–10 °C to +100 °C)': ['MP-10C', 'MP-30C', 'MPG-10C', 'MPG-40C'],
      'High-Temperature Chiller (-10°C/–40 °C to +150 °C)': ['BP-5B', 'BP-13L'],
      'Water Bath': ['BWS-20'],
    },
  },

  'material-characterization-and-testing': {
    title: 'Material Characterization & Testing',
    categories: {
      'High-Temperature Muffle Furnace': ['BWF-12/07CR', 'BWF-12/12CR'],
      'Digital Viscometer': ['BPTV-S1', 'BPTV-S2', 'BPTV-S3-R', 'BPTV-S3-RV', 'BPTV-S3-HA', 'BPTV-S3-HB'],
    },
  },

  'cell-and-microbiology-research': {
    title: 'Cell & Microbiology Research',
    categories: {
      'CO₂ Incubator (UV Sterilization)': ['BPN-80CH(UV)', 'BPN-150CH(UV)', 'BPN-190CH(UV)', 'BPN-240CH(UV)'],
      'CO₂ Incubator (Moist Heat, 90 °C)': ['BPN-80CRH', 'BPN-150CRH', 'BPN-190CRH', 'BPN-240CRH'],
      'CO₂ Incubator (Dry Heat, 180 °C)': ['BIO-150RHP Pro', 'BIO-190RHP Pro', 'BIO-240RHP Pro'],
      'CO₂ Incubator (Tri-Gas)': ['BIO-150RHP III', 'BIO-240RHP III'],
      'Heating Incubator': ['BPH-9042', 'BPH-9082', 'BPH-9162', 'BPH-9272', 'BPH-9402'],
      'Cooling Incubator': ['LRH-70', 'LRH-150', 'LRH-250'],
      'Cooling Incubator (Peltier)': ['BEC-50', 'BEC-100', 'BEC-250'],
      'Shaking Incubator (Benchtop)': ['BIS-2', 'BIS-3C'],
      'Shaking Incubator (Floor, Chest type)': ['HZQ-211C'],
      'Shaking Incubator (Floor, Stackable)': ['BSI-9', 'BSI-9C'],
      'Large Shaking Incubator (Vertical Floor)': ['HZQ-X300C', 'HZQ-X500C'],
      'Stackable Incubated Refrigerated Shaker with CO₂': ['BSIC-103', 'BSIC-113'],
    },
  },

  'cleanroom-and-contamination-control': {
    title: 'Cleanroom & Contamination Control',
    categories: {
      'Class II A2 Biosafety Cabinet': ['BBC-3S1', 'BBC-4S1', 'BBC-5S1', 'BBC-6S1'],
      'Vertical Laminar Airflow Cabinet': ['BCV-3', 'BCV-4', 'BCV-5', 'BCV-6'],
    },
  },

  'cold-storage-and-sample-preservation': {
    title: 'Cold Storage & Sample Preservation',
    categories: {
      'Ultra-Low Temperature Freezer (–86 °C)': ['BDW-86L390', 'BDW-86L490', 'BDW-86L650', 'BDW-86L770'],
      'Deep Freezer (–40 °C)': ['BDW-40L320', 'BDW-40L530D'],
      'Deep Freezer (–25 °C)': ['BDW-25L320'],
      'Laboratory Refrigerator (2–8 °C)': ['BYC-5L310', 'BYC-5L656', 'BYC-5L1000'],
      'Combined Refrigerator & Deep Freezer': ['BDW-25L300RF'],
    },
  },
};

export default function ProductDetails() {
  const { applications } = useParams();
  const currentApp = applicationsData[applications];

  const categories = currentApp ? Object.keys(currentApp.categories) : [];
  const initialCategory = useMemo(() => categories[0], [categories]);

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  useEffect(() => {
    if (categories.length > 0) {
      setSelectedCategory(categories[0]);
    }
  }, [applications]);

  const models = currentApp?.categories[selectedCategory] || [];

  return (
    <div className="flex min-h-screen w-[90%] mx-auto bg-gray-100 p-6 flex-col">
      {!currentApp ? (
        <div className="text-center text-red-600 font-semibold text-lg">
          Product category "{applications}" not found.
        </div>
      ) : (
        <>
          {/* Product Categories */}
          <div className="w-full flex gap-3 flex-wrap  shadow-md rounded-lg p-4">
            <h2 className="text-lg font-bold mb-2 w-full">{currentApp.title} - Categories</h2>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition ${selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-800 hover:bg-blue-100'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Models Grid */}
          <div className="w-full p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{selectedCategory}</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {models.map((model, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-lg shadow p-4 text-center text-blue-700 font-medium"
                >
                  <img
                    src="/product.png" // Replace with dynamic image later
                    alt={model}
                    className="w-full h-auto object-cover rounded mb-2"
                  />
                  {model}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
