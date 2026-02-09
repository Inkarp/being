'use client'

export default function ProcessTimeline() {
  const timeline = [
    "Concept & Consultation",
    "Design & Engineering", 
    "Manufacturing",
    "Quality Inspection",
    "Delivery & Support",
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-slate-900 via-indigo-900/30 to-slate-900 relative overflow-hidden min-h-[600px]">
      {/* Orbital Ring Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid-slate-900/20 [background-size:100px_100px]"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] h-[2px] bg-gradient-to-r from-cyan-400/30 via-blue-400/50 to-purple-400/30 rounded-full blur"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <h2 className="text-4xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent text-center mb-20 drop-shadow-2xl">
          End-to-End Process
        </h2>

        <div className="space-y-12">
          {timeline.map((t, i) => (
            <div key={i} className="group relative pl-20">
              {/* Orbital Planet Marker */}
              <div className={`absolute left-0 top-1/2 transform -translate-y-1/2 w-16 h-16 rounded-3xl shadow-2xl border-4 border-white/20 backdrop-blur-3xl overflow-hidden transition-all duration-700 group-hover:scale-110 group-hover:rotate-180 hover:shadow-purple-500/30 ${
                i === 0 ? 'bg-gradient-to-br from-cyan-500/90 to-blue-600 shadow-cyan-500/40 animate-spin-slow' :
                i === 1 ? 'bg-gradient-to-br from-blue-500/90 to-indigo-600 shadow-blue-500/40 animate-pulse' :
                i === 2 ? 'bg-gradient-to-br from-orange-500/90 to-red-600 shadow-orange-500/40 animate-bounce-slow' :
                i === 3 ? 'bg-gradient-to-br from-emerald-500/90 to-teal-600 shadow-emerald-500/40 animate-ping-slow' :
                'bg-gradient-to-br from-purple-500/90 to-pink-600 shadow-purple-500/40 animate-float'
              }`}>
                {/* Planet Ring */}
                <div className="absolute inset-2 bg-gradient-to-r from-white/20 to-transparent rounded-2xl blur-sm group-hover:opacity-100 opacity-60 transition-opacity"></div>
                {/* Core Glow */}
                <div className="absolute inset-1 bg-white/40 rounded-xl blur animate-ping opacity-0 group-hover:opacity-100 transition-opacity delay-150"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-black text-white drop-shadow-lg">
                    {i + 1}
                  </span>
                </div>
              </div>

              {/* Connection Arc */}
              {i < timeline.length - 1 && (
                <div className="absolute left-8 top-full w-1.5 h-16 bg-gradient-to-b from-cyan-400/40 via-blue-400/60 to-purple-400/40 transform translate-y-4 group-hover:opacity-100 opacity-40 blur-sm transition-opacity"></div>
              )}

              {/* Content Card */}
              <div className="bg-white/10 backdrop-blur-3xl rounded-3xl p-8 pl-12 border border-white/20 shadow-2xl group-hover:shadow-2xl group-hover:shadow-cyan-500/30 hover:bg-white/20 transition-all duration-500 hover:-translate-x-4 hover:rotate-1">
                <p className="text-xl font-bold text-white/95 leading-tight tracking-wide drop-shadow-lg group-hover:text-white transition-colors">
                  {t}
                </p>
              </div>

              {/* Magnetic Field Ring */}
              <div className="absolute inset-0 -m-8 rounded-3xl bg-gradient-to-r from-cyan-500/20 via-transparent to-purple-500/20 blur-xl opacity-0 group-hover:opacity-60 transition-all duration-700 -z-10 animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes spin-slow { to { transform: rotate(360deg); } }
        @keyframes bounce-slow { 0%, 80%, 100% { transform: scale(0); } 40% { transform: scale(1.1); } }
        @keyframes ping-slow { 0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); } 70% { box-shadow: 0 0 0 20px rgba(16, 185, 129, 0); } 100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); } }
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
        .animate-bounce-slow { animation: bounce-slow 3s infinite; }
        .animate-ping-slow { animation: ping-slow 2s infinite; }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .bg-grid-slate-900\/20 {
          background-image: linear-gradient(rgba(148, 163, 184, 0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(148, 163, 184, 0.1) 1px, transparent 1px);
        }
      `}</style>
    </section>
  );
}
