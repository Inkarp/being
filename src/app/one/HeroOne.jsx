import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { FaArrowCircleRight } from 'react-icons/fa';

export default function HeroOne() {
  const typeRef = useRef(null);
  const [typing, setTyping] = useState(false);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTyping(true);
          setFinished(false);

          // Remove animation class after it finishes
          setTimeout(() => {
            setTyping(false);
            setFinished(true);
          }, 3500); // match typing duration
        } else {
          // Reset when element leaves the screen
          setTyping(false);
          setFinished(false);
        }
      },
      { threshold: 0.3 }
    );

    if (typeRef.current) observer.observe(typeRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="w-[90%] mx-auto rounded-[50px] py-2 h-[550px] text-white overflow-hidden">
      <div className="w-full mx-auto lg:flex flex-row justify-center items-center gap-10">
        
        <div className="space-y-6 max-w-4xl p-8">

          <button className="bg-[#381dfa] text-white text-sm font-semibold px-4 py-2 rounded bounce-right">
            Premium Scientific Lab Instruments
          </button>

          {/* TYPEWRITER TEXT */}
          <h1
            ref={typeRef}
            className={`
              text-3xl text-black font-bold leading-tight
              ${typing ? "typewriter-active" : ""}
              ${finished ? "typewriter-done" : ""}
            `}
          >
            Advancing Precision in Laboratory Technology
          </h1>

          <p className="text-black text-md">
            We provide high-quality, reliable, and innovative laboratory instruments designed to support
            research, diagnostics, and industrial applications. Our solutions deliver accuracy, durability,
            and advanced performance for every scientific environment.
          </p>

          <div className="group relative p-2 bg-[#2B7EC2] rounded-full w-fit flex items-center justify-center">
            <img
              src="/Circle-Button.svg"
              className="w-20 h-20 transition-transform duration-500 spin-slow group-hover:animate-spin"
              alt="Spinning Image"
            />
            <FaArrowCircleRight
              size={32}
              className="absolute text-white transition-transform duration-500 bounce-right"
            />
          </div>

        </div>

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
