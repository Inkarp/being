export default function ManufacturingFlow() {
  const steps = [
    "Requirement Definition",
    "Engineering & Manufacturing",
    "India-side QA & Validation",
    "Delivery & Installation",
  ];

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-10 text-center">
          Manufacturing & Delivery Flow
        </h2>

        <div className="grid md:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <div
              key={i}
              className="relative p-6 border rounded-lg text-center"
            >
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center">
                {i + 1}
              </span>
              <p className="mt-4 font-medium">{step}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
