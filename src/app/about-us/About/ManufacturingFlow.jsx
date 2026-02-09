'use client'

export default function ManufacturingFlow() {
  const steps = [
    "Requirement Definition",
    "Engineering & Manufacturing", 
    "India-side QA & Validation",
    "Delivery & Installation",
  ];

  return (
    <section className="py-16 px-6 bg-gradient-to-b from-slate-50/50 via-white to-blue-50/30 relative overflow-hidden">
      {/* Pipeline Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-emerald-400/40 transform -translate-y-1/2 blur-sm"></div>
        <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/70 to-emerald-500/70 transform -translate-y-1/2"></div>
        {/* Flow Particles */}
        {steps.map((_, i) => (
          <div 
            key={i}
            className="absolute top-1/2 left-[calc(25%*var(--i)+12.5%)] w-3 h-3 bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full shadow-lg animate-pulse opacity-0"
            style={{ 
              '--i': i,
              animationDelay: `${i * 0.8}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <h2 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-slate-900 via-gray-800 to-slate-700 bg-clip-text text-transparent text-center mb-16 drop-shadow-lg">
          Manufacturing & Delivery Flow
        </h2>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <div
              key={i}
              className="group relative p-8 text-center transition-all duration-500 hover:scale-105 hover:-translate-y-2"
            >
              {/* Connection Lines */}
              {i < 3 && (
                <div className="absolute top-20 right-0 w-px h-20 bg-gradient-to-b from-cyan-400/50 to-emerald-400/50 group-hover:opacity-100 opacity-30 transition-opacity blur-sm"></div>
              )}
              
              {/* Industrial Badge */}
              <div className={`relative w-20 h-20 mx-auto mb-6 rounded-2xl shadow-2xl border-4 border-white/30 backdrop-blur-xl overflow-hidden group-hover:rotate-12 transition-all duration-700 ${
                i === 0 ? 'bg-gradient-to-br from-blue-500 to-cyan-600 shadow-blue-500/30' :
                i === 1 ? 'bg-gradient-to-br from-orange-500 to-red-600 shadow-orange-500/30' :
                i === 2 ? 'bg-gradient-to-br from-emerald-500 to-teal-600 shadow-emerald-500/30' :
                'bg-gradient-to-br from-purple-500 to-indigo-600 shadow-purple-500/30'
              }`}>
                {/* Metal Ring */}
                <div className="absolute inset-2 bg-gradient-to-r from-white/20 to-transparent rounded-xl blur-sm group-hover:opacity-100 opacity-70 transition-opacity"></div>
                <div className="absolute inset-1 bg-white/30 rounded-lg blur"></div>
                
                {/* Number */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-black text-white/95 drop-shadow-lg">
                    {i + 1}
                  </span>
                </div>
              </div>

              <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 border border-white/40 shadow-xl group-hover:shadow-2xl group-hover:shadow-cyan-500/20 transition-all duration-500 hover:bg-white/80">
                <p className="text-lg font-semibold text-slate-800 leading-tight tracking-wide group-hover:text-slate-900 transition-colors">
                  {step}
                </p>
              </div>
              
              {/* Hover Glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </section>
  );
}
