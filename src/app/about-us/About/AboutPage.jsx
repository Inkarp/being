"use client"

import Image from "next/image";

const facilityImages = [
  {
    title: "Being Technology corporate headquarters — Shanghai",
    image: "/assets/about/headquarters.webp",
  },
  {
    title: "Manufacturing floor — 30,000 sq. m production facility",
    image: "/assets/about/manufacturing-floor.webp",
  },
  {
    title: "Quality, testing and R&D — ISO 9001, ISO 13485, CE certified",
    image: "/assets/about/quality-rd.webp",
  },
];

const productSections = [
  {
    title: "Sample Preparation & Processing",
    description:
      "Reliable tools for drying, heating, solvent removal, evaporation, and crystallization. Essential wherever reproducibility in sample prep affects every downstream result.",
    items: [
      "Laboratory Drying Ovens — LCD and Touch-control variants for a wide temperature range",
      "Vacuum Ovens — LED and Touch Control, multiple capacities",
      "Vacuum Pumps — Oil-sealed and Diaphragm options",
      "Rotary Evaporators — bench-top to scale-up",
      "Recirculating Chillers — broad temperature bandwidth for cooling and heating duties",
      "Water Baths, Vacuum Controllers and matched accessories",
    ],
  },
  {
    title: "Material Characterization & Testing",
    description:
      "High-temperature stability, ashing, composition studies, and physical-property measurement for R&D, QC, and regulatory work.",
    items: ["High-Temperature Muffle Furnaces"],
  },
  {
    title: "Cell & Microbiology Research",
    description:
      "Contamination-free, controlled environments for cell culture, fermentation, and microbiology — the workhorses of pharma R&D, vaccines, and life sciences.",
    items: [
      "CO₂ Incubators — UV-sterilization, Moist Heat, Dry Heat and Tri-Gas variants",
      "Heating and Cooling Incubators — including Peltier models for vibration-free, refrigerant-free cooling",
      "Shaking Incubators — benchtop, floor-standing chest type, stackable, and large vertical configurations",
      "Stackable Incubated Refrigerated Shakers with CO₂",
    ],
  },
  {
    title: "Cleanroom & Contamination Control",
    description:
      "Aseptic, particle-free workspaces for biologicals, pharmaceuticals, and sterile preparations.",
    items: ["Class II A2 Biosafety Cabinets", "Vertical Laminar Airflow Cabinets"],
  },
  {
    title: "Cold Storage & Sample Preservation",
    description:
      "Stable, validated cold chain for biologicals, reagents, vaccines, and chemicals — from laboratory refrigerators to ultra-low freezers.",
    items: [
      "Ultra-Low Temperature Freezers (−86 °C)",
      "Deep Freezers (−40 °C and −25 °C)",
      "Laboratory Refrigerators (2–8 °C)",
      "Combined Refrigerator-Freezer — flexible storage in a single footprint",
    ],
  },
];

const whyLabsChooseUs = [
  "Trusted across India. 742 customer accounts, 1,789 instruments installed, 25 states and UTs — across government research institutions, private industry, and channel partners. The kind of footprint that doesn't get built on hype.",
  "Engineering that's earned its stripes. 20+ years of design, manufacturing and field experience. Hundreds of thousands of units in service worldwide. The kind of track record you can call references about.",
  "Certifications that matter. ISO 9001 quality systems, ISO 13485 for medical-device manufacturing, CE marking, and UL listing on selected products. If your auditor asks, we have an answer.",
  "Total solutions, not just boxes. From specifying the right oven for your drying protocol to commissioning a full rotary evaporator setup matched to your solvent — we help you get to a working lab, not just a delivered crate.",
  "Service that actually shows up. Installation, validation support, hands-on training, AMC and CMC packages, spares, and field engineers on the Inkarp network. Book service or AMC right from this website.",
  "Honest pricing. Honest timelines. No mystery surcharges, no \"we'll get back to you\" black holes. Ask us for a quote and you'll get one — with delivery windows we actually intend to hit.",
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      {/* STORY IN ONE LINE */}
      <section className=" px-6 py-5 text-black lg:px-8">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#2B7EC2]">
            The story in one line
          </p>
          <h2 className="mt-4 text-2xl font-black leading-snug md:text-4xl">
            Global engineering. Indian backing. Lab-grade reliability — finally
            with a local phone number, a local engineer, and a local service van.
          </h2>
        </div>
      </section>

      {/* WHERE WE COME FROM */}
      <section className="bg-[#2F4191] px-6 py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h2 className="text-sm font-black uppercase tracking-[0.25em] text-[#2B7EC2]">
              Where we come from
            </h2>
            <p className="mt-4 text-3xl font-black leading-tight text-white md:text-5xl">
              Built by BEING Technology, engineered and tested for working labs.
            </p>
          </div>

          <div className="space-y-6 text-base leading-8 text-white">
            <p>
              BEING Technology Co., Ltd. is headquartered in Shanghai and was
              founded with a single ambition — to make laboratory equipment that
              just works. Two decades and a 30,000 sq. metre manufacturing
              facility later, BEING runs one of the most comprehensive
              instrument portfolios in the industry: 100+ product lines, 200+
              patents, and certifications that read like a checklist of global
              trust — ISO 9001, ISO 13485, CE, and UL for select products.
            </p>

            <p>
              BEING isn't a name you find on glossy brochures alone. It's an
              OEM/ODM partner to several leading international laboratory
              brands. You may have used a BEING-built instrument without ever
              knowing it.
            </p>
          </div>
        </div>
      </section>

      {/* FACILITY */}
      <section className="bg-[#F5F7FF] px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.25em] text-[#2B7EC2]">
              Inside the Being facility — Shanghai, China
            </p>
            <h2 className="mt-4 text-3xl font-black text-black md:text-5xl">
              Where reliability is engineered, built and tested before it ever
              leaves the floor.
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {facilityImages.map((item) => (
              <div
                key={item.title}
                className="overflow-hidden rounded-[28px] bg-white shadow-lg"
              >
                <div className="relative h-64 bg-black">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-black leading-snug text-black">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY WE'RE HERE */}
      <section className="bg-[#2F4191] px-6 py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <div className="rounded-[32px] bg-white p-8 text-black md:p-12">
            <p className="text-sm font-black uppercase tracking-[0.25em] ">
              Why we're here
            </p>
            <h2 className="mt-4 text-3xl font-black leading-tight md:text-5xl">
              India deserves better than "send me a quote and we'll see in six
              weeks."
            </h2>
          </div>

          <div className="space-y-6 text-base leading-8 text-white">
            <p>
              Indian labs run hot. They run long. They run with power conditions
              that would make a European factory engineer cry. And they need
              partners who pick up the phone — not just before the sale, but two
              years later when a chamber sensor needs replacing on a Tuesday
              morning.
            </p>

            <p>
              That's why Being India exists. We've taken a globally-proven
              product line and wrapped it with what Indian labs actually need:
              fast quotations, honest application advice, real installation
              support, training that goes beyond a PDF, AMC contracts you can
              rely on, and spares that don't take a season to arrive.
            </p>
          </div>
        </div>
      </section>

      {/* BACKED BY INKARP */}
      <section className="bg-white px-6 py-10 text-black lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 className="text-sm font-black uppercase tracking-[0.25em] text-[#2B7EC2]">
              Backed by Inkarp
            </h2>
            <p className="mt-4 text-3xl font-black md:text-5xl">
              Backed by Inkarp’s network, applications team, and service strength.
            </p>
          </div>

          <div className="text-base leading-8 ">
            <p>
              Being India is an Inkarp Group company. Inkarp Instruments Pvt.
              Ltd. has been a trusted distributor of scientific and industrial
              instruments in India for decades, representing 49+ global principal
              brands across pharma, biotech, academia, hospitals, food,
              materials and industrial sectors. That means Being India launches
              not from zero, but on the shoulders of an established national
              service network, an experienced applications team, and the kind of
              customer relationships that don't get built overnight.
            </p>
          </div>
        </div>
      </section>

      {/* WHERE YOU'LL FIND US */}
      <section className="bg-[#2F4191] px-6 py-10 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-sm font-black uppercase tracking-[0.25em] text-[#2B7EC2]">
              Where you'll find us
            </h2>
            <p className="mt-4 text-3xl font-black leading-tight text-white md:text-5xl">
              Across India, inside labs that cannot afford downtime.
            </p>

            <p className="mt-6 text-base leading-8 text-white">
              742 customer accounts. 1,789 instruments installed. 25 states and
              union territories. From Jammu & Kashmir to Kerala, from Gujarat to
              Assam — that's where Being equipment is running, right now.
            </p>

            <p className="mt-6 rounded-3xl border border-black/10 bg-[#F5F7FF] p-6 text-base font-semibold leading-8 text-black">
              Installation density across India. Source: Being India customer
              directory.
            </p>
          </div>

          <div className="relative h-[480px] overflow-hidden rounded-[32px] bg-[#F5F7FF] shadow-lg">
            <Image
              src="/assets/about/india-map.webp"
              alt="Installation density across India"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* WHAT WE OFFER */}
      <section className="bg-[#F5F7FF] px-6 py-10 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <p className="text-sm font-black uppercase tracking-[0.25em] text-[#2B7EC2]">
              What we offer
            </p>
            <h2 className="mt-4 text-3xl font-black leading-tight text-black md:text-5xl">
              A full portfolio across five application areas. Pick a workflow —
              we have an instrument for it.
            </h2>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {productSections.map((section) => (
              <div
                key={section.title}
                className="rounded-[32px] bg-white p-7 shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <h3 className="text-2xl font-black text-[#2F4191]">
                  {section.title}
                </h3>

                <p className="mt-4 text-base leading-8 text-black/70">
                  {section.description}
                </p>

                <ul className="mt-6 space-y-3">
                  {section.items.map((item) => (
                    <li key={item} className="flex gap-3 text-sm text-black/75">
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#2B7EC2]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="bg-[#2F4191] px-6 py-10 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-[36px] bg-white p-8 text-black md:p-12">
          <h2 className="text-sm font-black uppercase tracking-[0.25em] text-[#2B7EC2]">
            Industries we serve
          </h2>

          <p className="mt-6 text-xl font-semibold leading-9 text-black">
            Pharmaceutical and biotechnology · Life sciences and clinical
            research · Hospitals and diagnostics · Universities and academic
            research · Food, beverage and agriculture · Chemicals and
            petrochemicals · Electronics and semiconductors · Automotive and
            aerospace · Materials testing · Environmental, quality and packaging
            test labs
          </p>

          <p className="mt-8 border-t border-white/10 pt-8 text-base leading-8 text-black">
            Across all of this, our India base today splits roughly as 382
            private-sector accounts, 193 government and institutional accounts,
            and 167 channel partners — a customer mix that gives us perspective
            across the full spectrum of Indian science and industry.
          </p>
        </div>
      </section>

      {/* WHY LABS CHOOSE US */}
      <section className="bg-[#F5F7FF] px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <h2 className="text-sm font-black uppercase tracking-[0.25em] text-[#2B7EC2]">
              Why labs choose us
            </h2>
            <p className="mt-4 text-3xl font-black text-black md:text-5xl">
              Reliable instruments, clear guidance, real timelines, and service that stays.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {whyLabsChooseUs.map((item, index) => (
              <div
                key={item}
                className="rounded-[28px] border border-black/10 bg-white p-7 shadow-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#2F4191] text-lg font-black text-white">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <p className="mt-6 text-base leading-8 text-black/75">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROMISE */}
      <section className="bg-black px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.25em] text-[#2B7EC2]">
            The promise
          </p>

          <h2 className="mt-5 text-3xl font-black leading-tight text-white md:text-3xl">
            We don't just sell equipment. We back it — with the people, the
            parts, and the patience to keep your lab running.
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-White">
            Because in this business, the spec sheet gets you in the door.
            Reliability is what keeps the relationship.
          </p>

          <p className=" text-2xl font-black text-[#2B7EC2]">
            Welcome to Being India. Let's get to work.
          </p>
        </div>
      </section>
    </main>
  );
}