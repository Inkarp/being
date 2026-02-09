export default function AboutHero() {
  return (
    <section className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-20 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Engineering Precision.<br />
            Delivered for India.
          </h1>
          <p className="mt-4 text-slate-300">
            Official India partner delivering instruments engineered in China,
            customized, controlled, and supported locally.
          </p>
        </div>

        <div className="bg-slate-700/40 rounded-xl p-6 backdrop-blur">
          <p className="text-sm uppercase text-slate-400">
            Our Philosophy
          </p>
          <p className="mt-2 text-lg">
            Global manufacturing, Indian expertise, uncompromised control.
          </p>
        </div>
      </div>
    </section>
  );
}
