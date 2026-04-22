'use client'

export default function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-[#0a0a0a] px-6 py-16 text-white md:py-20">
      <div className="absolute inset-y-0 left-0 w-1/2 bg-[#2B7EC2]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,10,10,0)_0%,rgba(10,10,10,0.35)_42%,#0a0a0a_68%)]" />

      <div className="relative z-10 mx-auto grid gap-10 md:grid-cols-[1.15fr_0.85fr] md:items-center">
        <div className="space-y-6">
          <div className="flex items-center gap-2.5 text-[11px] font-semibold tracking-[0.28em] text-white/80">
            <span className="h-[2px] w-8 bg-white" />
            ABOUT BEING INDIA
          </div>
          <h1 className="max-w-3xl text-4xl font-black leading-tight md:text-6xl">
            Engineering Precision<br />
            Delivered for India
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-white/[0.68] md:text-lg">
            Official India partner delivering instruments engineered in China,
            customized, controlled, and supported locally.
          </p>
        </div>

        <div className="border border-white/15 bg-white/[0.08] p-7 shadow-2xl backdrop-blur-md md:p-9">
          <div className="flex items-center gap-2.5 text-[11px] font-semibold tracking-[0.28em] text-[#78c4ff]">
            <span className="h-[2px] w-8 bg-[#78c4ff]" />
            OUR PHILOSOPHY
          </div>
          <p className="mt-6 text-2xl font-semibold leading-tight text-white md:text-3xl">
            Global manufacturing, Indian expertise, uncompromised control.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-3">
            <div className="border border-white/[0.12] bg-white/[0.08] p-4">
              <p className="text-2xl font-black text-[#78c4ff]">01</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-white/[0.62]">
                Selection
              </p>
            </div>
            <div className="border border-white/[0.12] bg-white/[0.08] p-4">
              <p className="text-2xl font-black text-[#78c4ff]">02</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-white/[0.62]">
                Support
              </p>
            </div>
          </div>
          {/* <div className="relative z-10">
            <p className="text-md md:text-sm font-raleway uppercase tracking-widest text-white font-medium mb-4">
              Our Philosophy
            </p>
            <p className="text-xl md:text-2xl text-white/95 leading-tight drop-shadow-lg">
              Global manufacturing, Indian expertise, uncompromised control.
            </p>
          </div> */}
        </div>

      </div>

      <style jsx>{`
        section {
          min-height: 420px;
        }
      `}</style>
    </section>
  );
}
