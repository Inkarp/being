'use client'

export default function RoleCards() {
  const roles = [
    {
      title: "Manufacturing Partner (China)",
      desc: "Core engineering, fabrication, and base assembly.",
    },
    {
      title: "India Operations",
      desc: "Specification control, customization, QA, logistics, and support.",
    },
  ];

  return (
    <section className="py-16 px-6 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative overflow-hidden">
      {/* Pipeline Connection Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[60%] h-1 bg-gradient-to-r from-cyan-400/30 via-blue-400/50 to-emerald-400/30 rounded-full blur-sm"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[60%] h-1 bg-gradient-to-r from-cyan-500/60 via-blue-500/80 to-emerald-500/60 rounded-full blur-none"></div>
        {/* Flow Particles */}
        <div className="absolute top-[48%] left-[20%] w-2 h-2 bg-cyan-400 rounded-full animate-ping opacity-70"></div>
        <div className="absolute top-[48%] right-[20%] w-2 h-2 bg-emerald-400 rounded-full animate-ping opacity-70 animation-delay-1000"></div>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 relative z-10">
        {roles.map((r, i) => (
          <div
            key={i}
            className={`group relative rounded-3xl p-8 md:p-10 backdrop-blur-xl transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/20 hover:scale-[1.02] cursor-pointer overflow-hidden ${
              i === 0 
                ? 'bg-gradient-to-br from-cyan-50/80 via-white/90 border border-cyan-200/50 shadow-lg shadow-cyan-100/50' 
                : 'bg-gradient-to-br from-emerald-50/80 via-white/90 border border-emerald-200/50 shadow-lg shadow-emerald-100/50'
            }`}
          >
            {/* Card Glow Ring */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-500/10 via-transparent to-emerald-500/10 -m-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
            
            {/* Icon Badge */}
            <div className={`absolute -top-6 left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-2xl flex items-center justify-center shadow-2xl border-4 border-white/50 backdrop-blur-sm z-20 ${
              i === 0 ? 'bg-gradient-to-br from-cyan-500 to-blue-600 shadow-cyan-500/25' : 'bg-gradient-to-br from-emerald-500 to-teal-600 shadow-emerald-500/25'
            }`}>
              <span className="text-2xl opacity-90">
                {i === 0 ? '🏭' : '🇮🇳'}
              </span>
            </div>

            <div className="relative z-10 text-center md:text-left">
              <h3 className="text-2xl md:text-2xl font-black bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-4 group-hover:translate-y-[-2px] transition-transform duration-300">
                {r.title}
              </h3>
              <p className="text-slate-600 leading-relaxed text-lg">{r.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes ping-delay {
          0% { transform: scale(0.8); opacity: 1; }
          75% { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(1.4); opacity: 0; }
        }
        .animation-delay-1000 {
          animation: ping-delay 2s cubic-bezier(0, 0, 0.2, 1) infinite 1s;
        }
        .animate-ping {
          animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>
    </section>
  );
}
