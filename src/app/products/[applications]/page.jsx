'use client';

import { useParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

const applicationsData = {
  'ovens': {
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
  'incubators': {
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
  const allModels = currentApp ? Object.values(currentApp.categories).flat() : [];

  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    setSelectedCategory(''); // Always show all initially
  }, [applications]);

  const filteredModels = selectedCategory 
    ? currentApp?.categories[selectedCategory] || [] 
    : allModels;

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* Fixed Left Sidebar */}
        {!currentApp ? null : (
          <aside className="lg:w-96 xl:w-[20%] flex-shrink-0 bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 sticky top-8 h-fit max-h-[90vh] overflow-hidden hover:shadow-3xl transition-all duration-500">
            <div className="space-y-6">
              {/* Header */}
              <div className="text-center pb-6 border-b border-blue-100">
                <h1 className="text-lg font-black bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 bg-clip-text text-transparent mb-2">
                  {currentApp.title}
                </h1>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto"></div>
              </div>

              {/* Filter Pills */}
              <div className="space-y-3 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-blue-50 pr-2">
                {/* All Products */}
                <button
                  onClick={() => setSelectedCategory('')}
                  className={`group w-full flex items-center justify-between p-6 rounded-2xl text-left transition-all duration-300 backdrop-blur-sm border-2 ${
                    selectedCategory === ''
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-2xl border-blue-400 transform scale-[1.02] ring-4 ring-blue-500/30'
                      : 'bg-white/70 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 border-gray-200 hover:border-blue-300 hover:shadow-xl hover:-translate-y-1'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-4 h-4 rounded-full bg-gradient-to-r from-white/80 to-blue-200 shadow-lg group-hover:animate-ping"></div>
                    <span className="font-bold text-base">All Products</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/50 px-4 py-2 rounded-xl backdrop-blur-sm shadow-lg">
                    <span className="text-xl font-black text-blue-400">{allModels.length}</span>
                    <span className="text-xs font-medium">items</span>
                  </div>
                </button>

                {/* Categories */}
                {categories.map((category, idx) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`group w-full flex items-center justify-between p-6 rounded-2xl text-left transition-all duration-300 backdrop-blur-sm border-2 truncate ${
                      selectedCategory === category
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-2xl border-emerald-400 transform scale-[1.02] ring-4 ring-emerald-500/30'
                        : 'bg-white/70 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 border-gray-200 hover:border-emerald-300 hover:shadow-xl hover:-translate-y-1'
                    }`}
                    title={category}
                  >
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <div 
                        className={`w-4 h-4 rounded-full shadow-lg transition-all duration-300 ${
                          selectedCategory === category 
                            ? 'bg-gradient-to-r from-white to-green-100 scale-125' 
                            : 'bg-gradient-to-r from-gray-300 to-gray-400 group-hover:scale-110 group-hover:bg-emerald-400'
                        }`}
                      ></div>
                      <span className="font-semibold text-sm truncate pr-4 line-clamp-2">{category}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/50 px-4 py-2 rounded-xl backdrop-blur-sm shadow-lg min-w-[3rem]">
                      <span className="text-lg font-black text-emerald-500">{currentApp.categories[category].length}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </aside>
        )}

        {/* Scrollable Main Content */}
        <main className="lg:flex-1 min-h-[70vh] flex flex-col">
          {!currentApp ? (
            <div className="flex flex-col items-center justify-center flex-1 text-center py-20">
              <div className="text-6xl mb-8 animate-bounce">🔬</div>
              <h1 className="text-2xl font-black text-gray-900 mb-4 bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
                Category Not Found
              </h1>
              <p className="text-lg text-gray-600 max-w-md mb-8">
                Product category "<span className="font-mono text-red-500">"{applications}"</span>" not found.
              </p>
            </div>
          ) : (
            <>
              {/* Header */}
              <header className="mb-12 pb-8 border-b-4 border-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-b-3xl">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <div>
                    <h1 className="text-3xl lg:text-4xl font-black bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-2 leading-tight">
                      Product Collection
                    </h1>
                    <div className="flex items-center gap-4 text-sm font-semibold text-gray-600">
                      <span className={`px-6 py-3 rounded-2xl backdrop-blur-sm shadow-lg border ${
                        selectedCategory 
                          ? 'bg-emerald-500/10 text-emerald-700 border-emerald-200' 
                          : 'bg-blue-500/10 text-blue-700 border-blue-200'
                      }`}>
                        {selectedCategory 
                          ? `${selectedCategory} • ${filteredModels.length} models`
                          : `All Categories • ${filteredModels.length} total models`
                        }
                      </span>
                      {selectedCategory && (
                        <button
                          onClick={() => setSelectedCategory('')}
                          className="group flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-blue-200 hover:border-blue-300 font-semibold text-blue-700"
                        >
                          <span>👀</span>
                          <span>Show All</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </header>

              {/* Scrollable Products Grid - ONLY RIGHT SECTION SCROLLS */}
              <div className="flex-1 h-[calc(100vh-20rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 pr-2 pb-8">
                {filteredModels.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                    {filteredModels.map((model, idx) => (
                      <div
                        key={`${selectedCategory || 'all'}-${idx}`}
                        className="group relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl hover:shadow-3xl border border-white/60 p-6 h-full transition-all duration-500 hover:-translate-y-4 hover:scale-[1.03] hover:rotate-[0.5deg]"
                      >
                        {/* 3D Card Effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                        
                        {/* Product Image */}
                        <div className="relative z-10 flex items-center justify-center h-40 mb-6 overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500/5 to-purple-500/5 border-4 border-white/50 shadow-2xl">
                          <img
                            src="/product.png"
                            alt={model}
                            className="w-24 h-24 object-contain group-hover:scale-125 group-hover:rotate-12 transition-all duration-700 filter drop-shadow-2xl brightness-110"
                          />
                          <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700 animate-pulse"></div>
                        </div>

                        {/* Product Name */}
                        <h4 className="text-lg font-black text-gray-900 mb-4 text-center leading-tight bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-500 line-clamp-2 px-2">
                          {model}
                        </h4>

                        {/* Status Badge */}
                        <div className="flex items-center justify-center gap-3 mb-6">
                          <div className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full shadow-lg animate-ping"></div>
                          <span className="text-xs font-bold text-emerald-600 tracking-wider uppercase">In Stock</span>
                        </div>

                        {/* Action Button */}
                        <button className="w-full group-hover:group bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-4 px-6 rounded-2xl text-sm font-black shadow-2xl hover:shadow-3xl hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 transform hover:-translate-y-2 transition-all duration-300 relative overflow-hidden">
                          <span className="relative z-10 flex items-center justify-center gap-3">
                            View Details
                            <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </span>
                          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent -skew-x-12 -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center py-20">
                    <div className="text-8xl mb-12 animate-bounce">🔍</div>
                    <h3 className="text-2xl font-black text-gray-900 mb-6 bg-gradient-to-r from-gray-600 to-gray-400 bg-clip-text">
                      No Products Found
                    </h3>
                    <p className="text-lg text-gray-600 mb-12 max-w-lg">
                      No products match the selected category. Try exploring other options.
                    </p>
                    <button
                      onClick={() => setSelectedCategory('')}
                      className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-12 py-6 rounded-3xl font-black text-lg shadow-2xl hover:shadow-3xl hover:-translate-y-3 transition-all duration-500 transform"
                    >
                      Explore All ({allModels.length}) Products
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
