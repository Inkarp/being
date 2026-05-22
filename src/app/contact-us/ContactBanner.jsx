'use client';

import { FaHeadset } from "react-icons/fa6";

export default function ContactHeader() {
  return (
    <section className="w-full bg-[radial-gradient(circle_at_top_left,#e8f3ff_0,#f8fafc_34%,#eef2f7_100%)]">
      <div className="mx-auto overflow-hidden border border-white/80 bg-white/75 shadow-[0_28px_80px_rgba(22,35,72,0.16)] backdrop-blur">
        <div className="relative overflow-hidden bg-[#101728] text-white">
          <div className="absolute inset-0 bg-[linear-gradient(120deg,#2F4191_0%,#2B7EC2_55%,#2F4191_100%)]" />
          <div className="absolute -right-16 top-8 h-52 w-52 rounded-full border border-white/20" />
          <div className="absolute right-20 -bottom-24 h-72 w-72 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute left-8 top-10 hidden h-20 w-20 rotate-12 rounded-2xl border border-white/15 bg-white/10 sm:block" />

          <div className="relative z-10 px-6 py-12 sm:px-10 lg:px-12 lg:py-14">
            <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-white/90 shadow-sm">
              <FaHeadset className="text-[#a9efff]" />
              Speak with our team
            </div>
            <h1 className="max-w-4xl text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Contact Us
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-white/82 sm:text-lg">
              Connect with Being for product enquiries, service support and guidance on choosing the right laboratory solution.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
