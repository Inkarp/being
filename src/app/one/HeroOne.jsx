
import Image from 'next/image';
import { FaArrowCircleRight } from 'react-icons/fa';

export default function HeroOne() {
  return (
    <section className="w-[95%] mx-auto rounded-[50px] py-2 h-[550px] text-white overflow-hidden">
      <div className="w-full mx-auto lg:flex  flex flex-row justify-center items-center gap-10">
        <div className="space-y-6 max-w-4xl p-8 ">
          <button className="bg-[#381dfa] text-white text-sm font-semibold px-4 py-2 rounded">
            Premium Scientific Lab Instruments
          </button>

          <h1 className="text-5xl text-black font-bold leading-tight">
            Advancing Precision in <br /> Laboratory Technology
          </h1>

          <p className="text-black text-md">
            We provide high‑quality, reliable, and innovative laboratory instruments designed to support
            research, diagnostics, and industrial applications. Our solutions deliver accuracy, durability,
            and advanced performance for every scientific environment.
          </p>

          {/* <button className="mt-4 bg-[#381dfa] hover:bg-[#4a36fc] text-white font-bold px-6 py-3 rounded shadow">
            Explore Instruments
          </button> */}
          <div className="group relative p-2 bg-[#2B7EC2] rounded-full w-fit flex items-center justify-center">
            <img
              src="/Circle-Button.svg"
              className="w-20 h-20 transition-transform duration-500 group-hover:animate-spin"
              alt="Spinning Image"
            />
            <FaArrowCircleRight
              size={32}
              className="absolute text-white transition-transform duration-500 group-hover:animate-bounce"
            />
          </div>

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
