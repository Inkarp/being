export default function SpecificationControl() {
  const points = [
    "India-defined technical specifications",
    "Vendor drawings & approvals",
    "Material & component validation",
    "Final acceptance before dispatch",
  ];

  return (
    <section className="py-16 px-6 bg-slate-900 text-white">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-3xl font-bold">
            Specification & Quality Control
          </h2>
          <p className="mt-4 text-slate-300">
            Every system is built to Indian market requirements —
            not generic imports.
          </p>
        </div>

        <ul className="space-y-4">
          {points.map((p, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="text-[#2F4191]">✔</span>
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
