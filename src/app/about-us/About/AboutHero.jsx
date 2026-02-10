'use client'

import RoleCards from "./RoleCards";

export default function AboutHero() {
  return (
    <section className="relative min-h-[50vh] overflow-hidden py-5 px-6 bg-[#2F4191]">
      {/* Animated Background Particles */}
      {/* <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/10 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-0"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-40 left-20 w-80 h-80 bg-slate-400/10 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div> */}

      <div className="w-full mx-auto grid md:grid-cols-2 gap-10 p-5 items-center relative z-10">
        <div className="order-2 md:order-1 transform md:-rotate-0 md:translate-x-0 md:translate-y-0 hover:rotate-0 hover:translate-x-8 hover:translate-y-12 transition-all duration-700 group">
          <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-white via-slate-100 to-slate-200 bg-clip-text text-transparent leading-tight drop-shadow-2xl">
            Engineering Precision.<br />
            Delivered for India.
          </h1>
          <p className="mt-6 text-slate-300 text-lg leading-relaxed backdrop-blur-sm">
            Official India partner delivering instruments engineered in China,
            customized, controlled, and supported locally.
          </p>
        </div>

        <div className="order-1 md:order-2 row-span-1 md:col-span-1 bg-white/5 backdrop-blur-3xl rounded-3xl p-8 md:p-10 border border-white/20 shadow-2xl shadow-cyan-500/10 hover:shadow-cyan-500/20 transition-all duration-500 hover:scale-[1.02] group hover:border-white/40 relative overflow-hidden">
          {/* Orbital Ring Effect */}
          <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 via-transparent to-purple-500/20 rounded-3xl -rotate-3 animate-spin-slow opacity-50"></div>
          <div className="relative z-10">
            <p className="text-md md:text-sm font-raleway uppercase tracking-widest text-white font-medium mb-4 bg-gradient-to-r from-cyan-400/50 to-transparent bg-clip-text">
              Our Philosophy
            </p>
            <p className="text-xl md:text-2xl font-light text-white/95 leading-tight drop-shadow-lg">
              Global manufacturing, Indian expertise, uncompromised control.
            </p>
          </div>
        </div>

      </div>
      {/* <RoleCards /> */}

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes spin-slow {
          to { transform: rotate(360deg); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        .animate-spin-slow { animation: spin-slow 20s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
      `}</style>
    </section>
  );
}
