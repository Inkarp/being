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
    <section className="py-16 px-6 bg-slate-50">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
        {roles.map((r, i) => (
          <div
            key={i}
            className="rounded-xl border p-8 hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold">{r.title}</h3>
            <p className="mt-3 text-slate-600">{r.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
