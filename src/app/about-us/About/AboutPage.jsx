import Image from "next/image";

const ACCENT = "#2B7EC2";

const stats = [
  { value: "", label: "Assured technical Assistance" },
  { value: "100+", label: "Products" },
  { value: "98%", label: "Client satisfaction" },
  { value: "24/7", label: "Technical support" },
];

const values = [
  {
    title: "Localized expertise",
    desc: "Application guidance, installation, and service support handled by teams who understand Indian labs.",
  },
  {
    title: "Controlled quality",
    desc: "Every solution is selected, configured, and checked for dependable performance in demanding workflows.",
  },
  {
    title: "Long-term partnership",
    desc: "We stay close after delivery with training, spares, calibration guidance, and responsive service care.",
  },
];

function SectionHeading({ eyebrow, title, description, light = false }) {
  return (
    <div className="space-y-4">
      <div
        className={`flex items-center gap-2.5 text-[11px] font-semibold tracking-[0.28em] uppercase ${
          light ? "text-white/80" : "text-[#2B7EC2]"
        }`}
      >
        <span
          className="h-[2px] w-8 origin-left"
          style={{ background: light ? "rgba(255,255,255,0.85)" : ACCENT }}
        />
        {eyebrow}
      </div>
      <h2
        className={`font-extrabold leading-tight ${
          light ? "text-white" : "text-gray-950"
        }`}
        style={{ fontSize: "clamp(28px, 4vw, 48px)" }}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`max-w-2xl text-base leading-relaxed ${
            light ? "text-white/[0.72]" : "text-gray-600"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}

export default function AboutPage() {
  return (
    <section className="mx-auto bg-white px-6 py-14 md:py-20">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-16">

        <div className="space-y-12">
          <SectionHeading
            eyebrow="About Us"
            title="Precision lab instruments, supported close to you."
            description="Being India brings globally engineered scientific instruments together with local application knowledge, installation support, and dependable service for laboratories across India."
          />

          <div className="rounded-lg border border-slate-200 bg-slate-50 p-6 shadow-sm md:p-8">
            <SectionHeading
              eyebrow="Our Mission"
              title="Make scientific workflows more reliable."
            />
            <div className="mt-6 space-y-4 text-gray-600 leading-relaxed">
              <p>
                We help research, industrial, education, and healthcare labs choose
                instruments that match their daily needs, not just a catalogue
                specification. From consultation to commissioning, our focus is on
                dependable outcomes.
              </p>
              <p>
                Our team combines product knowledge with hands-on service experience,
                so customers receive the right configuration, clear documentation,
                and support that continues after installation.
              </p>
            </div>
          </div>

          <div>
            <SectionHeading eyebrow="The Numbers" title="Built on trust and repeat performance." />

            <div className="mt-7 grid grid-cols-2 gap-4">
              {stats.map((item, index) => (
                <div
                  key={item.label}
                  className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#2B7EC2]/50 hover:shadow-md"
                >
                  <p
                    className="text-3xl font-extrabold md:text-4xl"
                    style={{ color: index === 1 ? "#2F4191" : ACCENT }}
                  >
                    {item.value}
                  </p>
                  <p className="mt-2 text-sm font-medium text-gray-500">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 md:gap-6">
          <div className="space-y-6 pt-20">
            <Image
              src="/service1.webp"
              alt="Laboratory service support"
              width={400}
              height={500}
              className="aspect-[4/5] w-full rounded-lg object-cover shadow-lg"
            />

            <Image
              src="/service4.webp"
              alt="Scientific instrument workspace"
              width={400}
              height={300}
              className="aspect-[4/3] w-full rounded-lg object-cover shadow-md"
            />
          </div>

          <div className="space-y-6">
            <Image
              src="/service3.webp"
              alt="Laboratory equipment setup"
              width={400}
              height={300}
              className="aspect-[4/3] w-full rounded-lg object-cover shadow-md"
            />

            <div className="rounded-lg bg-[#0a0a0a] p-6 text-white shadow-xl">
              <SectionHeading
                eyebrow="Our Values"
                title="Support that stays practical."
                light
              />
              <div className="mt-7 space-y-5">
                {values.map((item) => (
                  <div key={item.title} className="border-t border-white/[0.12] pt-5">
                    <h3 className="text-base font-bold text-white">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/60">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
