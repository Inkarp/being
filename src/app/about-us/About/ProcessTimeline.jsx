export default function ProcessTimeline() {
  const timeline = [
    "Concept & Consultation",
    "Design & Engineering",
    "Manufacturing",
    "Quality Inspection",
    "Delivery & Support",
  ];

  return (
    <section className="py-20 px-6 bg-slate-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-10 text-center">
          End-to-End Process
        </h2>

        <div className="space-y-6">
          {timeline.map((t, i) => (
            <div key={i} className="flex gap-4 items-start">
              <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center">
                {i + 1}
              </div>
              <p className="font-medium">{t}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
