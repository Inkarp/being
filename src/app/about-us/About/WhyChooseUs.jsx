export default function WhyChooseUs() {
  const reasons = [
    "Direct manufacturer collaboration",
    "India-led quality & control",
    "Transparent pricing",
    "Local service & support",
    "Custom-built solutions",
  ];

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold">Why Choose Us</h2>

        <div className="grid md:grid-cols-3 gap-6 mt-10">
          {reasons.map((r, i) => (
            <div
              key={i}
              className="border rounded-xl p-6 hover:border-red-600 transition"
            >
              <p className="font-medium">{r}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
