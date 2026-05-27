'use client'

import Image from "next/image";

import { FaBuildingFlag } from "react-icons/fa6";

export default function AboutHero() {
  return (

    <section className="relative overflow-hidden bg-[#2F4191]" >
      <div className="absolute inset-0">
        <div className="absolute -left-28 top-12 h-80 w-80 rounded-full bg-white/10" />
        <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-[#2B7EC2]/30 blur-2xl" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:px-8 lg:py-10">
        <div>
          <p className="mb-5 inline-flex rounded-full border border-white/30 bg-white/10 px-5 py-2 text-sm font-semibold text-white backdrop-blur">
            About Us
          </p>

          <h1 className="text-4xl font-black leading-tight tracking-tight text-white md:text-6xl">
            Real labs. Real work. Real instruments.
          </h1>

          <p className="mt-6 text-lg leading-8 text-white/85">
            Behind every breakthrough, there's a workhorse. The oven that ran
            for 72 hours straight. The incubator that didn't blink during a
            power dip. The freezer that kept your cell line alive while you
            were on a flight. That's the kind of equipment we build our
            business around.
          </p>

          <p className="mt-5 text-base leading-8 text-white/80">
            Being India is the home of the BEING product range in India — a
            complete portfolio of laboratory and life-science instruments,
            brought to you by the same engineering family that's been quietly
            powering labs in 80+ countries for over two decades.
          </p>
        </div>

        <div className="relative">
          <div className="rounded-[32px] bg-white p-4 shadow-2xl">
            <div className="relative h-[420px] overflow-hidden rounded-[24px] bg-black">
              <Image
                src="/assets/about/about-hero.webp"
                alt="Being India laboratory instruments"
                fill
                priority
                className="object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-7">
                <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#2B7EC2]">
                  The story in one line
                </p>
                <h2 className="mt-3 text-2xl font-black leading-snug text-white">
                  Global engineering. Indian backing. Lab-grade reliability —
                  finally with a local phone number, a local engineer, and a
                  local service van.
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section >
  );
}
