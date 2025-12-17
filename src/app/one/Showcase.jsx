'use client';

export default function Showcase() {
  return (
    <section className="w-full py-16 bg-gray-100">
      {/* Parent needs `group` and will toggle `c-active` (for demo kept always active) */}
      <div data-scroll-item="" className="group c-active">
        {/* TOP ROW */}
        <div className="
          origin-left relative top-[50px] text-[#01010F] overflow-hidden py-[20px]
          group-[.c-active]:rotate-[3deg]
          transition-all duration-[300ms]
        ">
          {/* Color layers */}
          <div className="
            origin-top absolute inset-0 bg-[#F67A45]
            group-[:not(.c-active)]:scale-y-0
            group-[:not(.c-active)]:delay-[90ms]
            delay-0 transition-all duration-[300ms]
          " />
          <div className="
            origin-top absolute inset-0 bg-[#D5BDA2]
            group-[:not(.c-active)]:scale-y-0
            group-[:not(.c-active)]:delay-[60ms]
            delay-[30ms] transition-all duration-[300ms]
          " />
          <div className="
            origin-top absolute inset-0 bg-black
            group-[:not(.c-active)]:scale-y-0
            group-[:not(.c-active)]:delay-[30ms]
            delay-[60ms] transition-all duration-[300ms]
          " />
          <div className="
            origin-top absolute inset-0 bg-[#D5BDA2]
            group-[:not(.c-active)]:scale-y-0
            group-[:not(.c-active)]:delay-[0ms]
            delay-[90ms] transition-all duration-[300ms]
          " />

          {/* Content */}
          <div className="relative flex whitespace-nowrap items-center justify-center gap-[30px] font-[Teko] font-semibold text-[28px] uppercase">
            <div className="origin-right group-[:not(.c-active)]:scale-x-0 group-[:not(.c-active)]:delay-[0ms] delay-[0ms] transition-all duration-[300ms]">
              Rise up
            </div>
            <img
              className="origin-right group-[:not(.c-active)]:scale-x-0 group-[:not(.c-active)]:delay-[30ms] delay-[0ms] transition-all duration-[300ms]"
              src="https://raw.githubusercontent.com/uiaextend/gymfito/main/home/sliding.svg"
              alt=""
            />
            <div className="origin-right group-[:not(.c-active)]:scale-x-0 group-[:not(.c-active)]:delay-[60ms] delay-[0ms] transition-all duration-[300ms]">
              show up
            </div>
            <img
              className="origin-right group-[:not(.c-active)]:scale-x-0 group-[:not(.c-active)]:delay-[90ms] delay-[0ms] transition-all duration-[300ms]"
              src="https://raw.githubusercontent.com/uiaextend/gymfito/main/home/sliding.svg"
              alt=""
            />
            <div className="origin-right group-[:not(.c-active)]:scale-x-0 group-[:not(.c-active)]:delay-[120ms] delay-[0ms] transition-all duration-[300ms]">
              never give up
            </div>
            <img
              className="origin-right group-[:not(.c-active)]:scale-x-0 group-[:not(.c-active)]:delay-[150ms] delay-[0ms] transition-all duration-[300ms]"
              src="https://raw.githubusercontent.com/uiaextend/gymfito/main/home/sliding.svg"
              alt=""
            />
            <div className="origin-right group-[:not(.c-active)]:scale-x-0 group-[:not(.c-active)]:delay-[160ms] delay-[0ms] transition-all duration-[300ms]">
              Train hard
            </div>
            <img
              className="origin-right group-[:not(.c-active)]:scale-x-0 group-[:not(.c-active)]:delay-[190ms] delay-[0ms] transition-all duration-[300ms]"
              src="https://raw.githubusercontent.com/uiaextend/gymfito/main/home/sliding.svg"
              alt=""
            />
            <div className="origin-right group-[:not(.c-active)]:scale-x-0 group-[:not(.c-active)]:delay-[220ms] delay-[0ms] transition-all duration-[300ms]">
              Train hard
            </div>
            <img
              className="origin-right group-[:not(.c-active)]:scale-x-0 group-[:not(.c-active)]:delay-[250ms] delay-[0ms] transition-all duration-[300ms]"
              src="https://raw.githubusercontent.com/uiaextend/gymfito/main/home/sliding.svg"
              alt=""
            />
            <div className="origin-right group-[:not(.c-active)]:scale-x-0 group-[:not(.c-active)]:delay-[280ms] delay-[0ms] transition-all duration-[300ms]">
              Train hard
            </div>
            <img
              className="origin-right group-[:not(.c-active)]:scale-x-0 group-[:not(.c-active)]:delay-[310ms] delay-[0ms] transition-all duration-[300ms]"
              src="https://raw.githubusercontent.com/uiaextend/gymfito/main/home/sliding.svg"
              alt=""
            />
            <div className="origin-right group-[:not(.c-active)]:scale-x-0 group-[:not(.c-active)]:delay-[330ms] delay-[0ms] transition-all duration-[300ms]">
              stay humble
            </div>
            <img
              className="origin-right group-[:not(.c-active)]:scale-x-0 group-[:not(.c-active)]:delay-[360ms] delay-[0ms] transition-all duration-[300ms]"
              src="https://raw.githubusercontent.com/uiaextend/gymfito/main/home/sliding.svg"
              alt=""
            />
            <div className="origin-right group-[:not(.c-active)]:scale-x-0 group-[:not(.c-active)]:delay-[390ms] delay-[0ms] transition-all duration-[300ms]">
              stay humble
            </div>
            <img
              className="origin-right group-[:not(.c-active)]:scale-x-0 group-[:not(.c-active)]:delay-[420ms] delay-[0ms] transition-all duration-[300ms]"
              src="https://raw.githubusercontent.com/uiaextend/gymfito/main/home/sliding.svg"
              alt=""
            />
            <div className="origin-right group-[:not(.c-active)]:scale-x-0 group-[:not(.c-active)]:delay-[450ms] delay-[0ms] transition-all duration-[300ms]">
              be proud
            </div>
            <img
              className="origin-right group-[:not(.c-active)]:scale-x-0 group-[:not(.c-active)]:delay-[480ms] delay-[0ms] transition-all duration-[300ms]"
              src="https://raw.githubusercontent.com/uiaextend/gymfito/main/home/sliding.svg"
              alt=""
            />
            <div className="origin-right group-[:not(.c-active)]:scale-x-0 group-[:not(.c-active)]:delay-[510ms] delay-[0ms] transition-all duration-[300ms]">
              Believe in yourself
            </div>
          </div>
        </div>

        {/* BOTTOM ROW */}
        <div className="
          relative overflow-hidden py-[20px]
          group-[.c-active]:rotate-[-3deg]
        ">
          <div className="
            origin-bottom absolute inset-0 bg-[#F67A45]
            group-[:not(.c-active)]:scale-y-0
            group-[:not(.c-active)]:delay-[90ms]
            delay-[0ms] transition-all duration-[300ms]
          " />
          <div className="
            origin-bottom absolute inset-0 bg-[#D5BDA2]
            group-[:not(.c-active)]:scale-y-0
            group-[:not(.c-active)]:delay-[60ms]
            delay-[30ms] transition-all duration-[300ms]
          " />
          <div className="
            origin-bottom absolute inset-0 bg-[#01010F]
            group-[:not(.c-active)]:scale-y-0
            group-[:not(.c-active)]:delay-[30ms]
            delay-[60ms] transition-all duration-[300ms]
          " />
          <div className="
            origin-bottom absolute inset-0 bg-[#F67A45]
            group-[:not(.c-active)]:scale-y-0
            group-[:not(.c-active)]:delay-[0ms]
            delay-[90ms] transition-all duration-[300ms]
          " />

          <div className="relative flex whitespace-nowrap items-center justify-center gap-[30px] font-[Teko] font-semibold text-[28px] uppercase">
            <div className="origin-left group-[:not(.c-active)]:scale-x-0 group-[:not(.c-active)]:delay-[0ms] delay-[0ms] transition-all duration-[300ms]">
              Sweat now, shine later
            </div>
            <img
              className="origin-left group-[:not(.c-active)]:scale-x-0 group-[:not(.c-active)]:delay-[30ms] delay-[0ms] transition-all duration-[300ms]"
              src="https://raw.githubusercontent.com/uiaextend/gymfito/main/home/sliding-black.svg"
              alt=""
            />
            <div className="origin-left group-[:not(.c-active)]:scale-x-0 group-[:not(.c-active)]:delay-[60ms] delay-[0ms] transition-all duration-[300ms]">
              Stronger every rep
            </div>
            <img
              className="origin-left group-[:not(.c-active)]:scale-x-0 group-[:not(.c-active)]:delay-[90ms] delay-[0ms] transition-all duration-[300ms]"
              src="https://raw.githubusercontent.com/uiaextend/gymfito/main/home/sliding-black.svg"
              alt=""
            />
            <div className="origin-left group-[:not(.c-active)]:scale-x-0 group-[:not(.c-active)]:delay-[120ms] delay-[0ms] transition-all duration-[300ms]">
              prouder every step
            </div>
            <img
              className="origin-left group-[:not(.c-active)]:scale-x-0 group-[:not(.c-active)]:delay-[150ms] delay-[0ms] transition-all duration-[300ms]"
              src="https://raw.githubusercontent.com/uiaextend/gymfito/main/home/sliding-black.svg"
              alt=""
            />
            <div className="origin-left group-[:not(.c-active)]:scale-x-0 group-[:not(.c-active)]:delay-[180ms] delay-[0ms] transition-all duration-[300ms]">
              Push your limits
            </div>
            <img
              className="origin-left group-[:not(.c-active)]:scale-x-0 group-[:not(.c-active)]:delay-[210ms] delay-[0ms] transition-all duration-[300ms]"
              src="https://raw.githubusercontent.com/uiaextend/gymfito/main/home/sliding-black.svg"
              alt=""
            />
            <div className="origin-left group-[:not(.c-active)]:scale-x-0 group-[:not(.c-active)]:delay-[240ms] delay-[0ms] transition-all duration-[300ms]">
              exceed your expectations
            </div>
            <img
              className="origin-left group-[:not(.c-active)]:scale-x-0 group-[:not(.c-active)]:delay-[250ms] delay-[0ms] transition-all duration-[300ms]"
              src="https://raw.githubusercontent.com/uiaextend/gymfito/main/home/sliding-black.svg"
              alt=""
            />
            <div className="origin-left group-[:not(.c-active)]:scale-x-0 group-[:not(.c-active)]:delay-[280ms] delay-[0ms] transition-all duration-[300ms]">
              Rise up, show up, never give up
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
