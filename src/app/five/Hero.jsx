
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="w-[95%] mx-auto rounded-[50px] mt-22 h-[550px] bg-gradient-to-r from-[#2B7EC2] via-[#63B3ED] to-[#E0F2FE] text-white overflow-hidden">
      <div className="w-full mx-auto lg:flex  flex flex-row justify-center items-center gap-10">
        <div className="space-y-6 max-w-4xl p-8 ">
          <button className="bg-[#381dfa] text-white text-sm font-semibold px-4 py-2 rounded">
            Premium Scientific Lab Instruments
          </button>

          <h1 className="text-5xl font-bold leading-tight">
            Advancing Precision in <br /> Laboratory Technology
          </h1>

          <p className="text-black text-md">
            We provide high‑quality, reliable, and innovative laboratory instruments designed to support
            research, diagnostics, and industrial applications. Our solutions deliver accuracy, durability,
            and advanced performance for every scientific environment.
          </p>

          <button className="mt-4 bg-[#381dfa] hover:bg-[#4a36fc] text-white font-bold px-6 py-3 rounded shadow">
            Explore Instruments
          </button>
        </div>

        {/* Right Image */}
        <div className=''>
          <Image
            src="/hero.png"
            // src="/about.jpg"
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
