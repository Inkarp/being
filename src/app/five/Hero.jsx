
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="w-[95%] mx-auto h-[600px] bg-[#0c1b3a] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto lg:flex flex flex-row justify-center items-center gap-10">

        {/* Left Content */}
        <div className="space-y-6 max-w-xl">
          <button className="bg-[#381dfa] text-white text-sm font-semibold px-4 py-2 rounded">
            Premium Scientific Lab Instruments
          </button>

          <h1 className="text-5xl font-bold leading-tight">
            Advancing Precision in <br /> Laboratory Technology
          </h1>

          <p className="text-gray-300 text-md">
            We provide high‑quality, reliable, and innovative laboratory instruments designed to support
            research, diagnostics, and industrial applications. Our solutions deliver accuracy, durability,
            and advanced performance for every scientific environment.
          </p>

          <button className="mt-4 bg-[#381dfa] hover:bg-[#4a36fc] text-white font-bold px-6 py-3 rounded shadow">
            Explore Instruments
          </button>
        </div>

        {/* Right Image */}
        <div>
          <Image
            src="/hero.png"
            alt="Scientific Laboratory Equipment"
            width={500}
            height={600}
            className="object-contain"
          />
        </div>

      </div>
    </section>

  );
}
