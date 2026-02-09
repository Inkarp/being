'use client'

export default function WhyChooseUs() {
  const reasons = [
    "Direct manufacturer collaboration",
    "India-led quality & control", 
    "Transparent pricing",
    "Local service & support",
    "Custom-built solutions",
  ];

  return (
    <section className="py-16 px-6 relative overflow-hidden bg-gradient-to-br from-slate-50/60 via-white to-emerald-50/40">
      {/* Neural Network Background */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-20 left-10 w-px h-32 bg-gradient-to-b from-cyan-400 to-transparent"></div>
        <div className="absolute top-1/2 left-1/3 w-px h-40 bg-gradient-to-b from-blue-400 to-transparent"></div>
        <div className="absolute bottom-20 right-10 w-px h-24 bg-gradient-to-b from-emerald-400 to-transparent"></div>
        <div className="absolute top-1/4 right-1/4 w-px h-48 bg-gradient-to-b from-purple-400 to-transparent"></div>
      </div>

      <div className="max-w-6xl mx-auto text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-slate-800 via-gray-700 to-emerald-600 bg-clip-text text-transparent drop-shadow-2xl mb-4 tracking-tight">
          Why Choose Us
        </h2>
        <div className="h-1 w-24 bg-gradient-to-r from-transparent via-emerald-400 to-transparent mx-auto rounded-full mb-16 blur-sm"></div>

        <div className="grid md:grid-cols-3 gap-8 mt-10">
          {reasons.map((reason, i) => (
            <div
              key={i}
              className="group relative p-8 rounded-3xl backdrop-blur-xl bg-white/70 border border-white/50 shadow-xl hover:shadow-2xl hover:shadow-emerald-500/25 transition-all duration-700 hover:scale-[1.05] hover:-translate-y-4 overflow-hidden cursor-pointer"
            >
              {/* Crystalline Orb */}
              <div className={`absolute -top-12 left-1/2 transform -translate-x-1/2 w-24 h-24 rounded-3xl shadow-2xl border-4 border-white/60 backdrop-blur-2xl z-20 opacity-90 transition-all duration-700 group-hover:scale-110 group-hover:-rotate-180 ${
                i === 0 ? 'bg-gradient-to-br from-cyan-500 to-blue-600 shadow-cyan-500/40' :
                i === 1 ? 'bg-gradient-to-br from-emerald-500 to-teal-600 shadow-emerald-500/40' :
                i === 2 ? 'bg-gradient-to-br from-amber-500 to-orange-600 shadow-amber-500/40' :
                i === 3 ? 'bg-gradient-to-br from-purple-500 to-indigo-600 shadow-purple-500/40' :
                'bg-gradient-to-br from-rose-500 to-pink-600 shadow-rose-500/40'
              }`}>
                {/* Crystal Facets */}
                <div className="absolute inset-2 bg-gradient-to-r from-white/30 via-transparent to-white/20 rounded-2xl rotate-45 group-hover:opacity-100 opacity-70 transition-opacity"></div>
                <div className="absolute inset-1 bg-white/50 rounded-xl blur-sm animate-ping opacity-0 group-hover:opacity-100 delay-150"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-black text-white drop-shadow-lg">
                    {i + 1}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="relative z-10 mt-16">
                <p className="text-lg font-bold text-slate-800 leading-tight tracking-wide group-hover:text-slate-900 transition-all duration-300">
                  {reason}
                </p>
              </div>

              {/* Holographic Ring */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-emerald-400/20 via-transparent to-cyan-400/20 -m-4 opacity-0 group-hover:opacity-100 transition-all duration-700 blur-xl animate-pulse"></div>
              
              {/* Neural Connection Lines */}
              <div className="absolute top-1/2 -right-6 w-20 h-px bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity blur-sm"></div>
              <div className="absolute top-1/4 -left-6 w-16 h-px bg-gradient-to-r from-cyan-400/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity blur-sm"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
