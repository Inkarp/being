// app/components/StatsSection.tsx
'use client';

const stats = [
  { value: '100+',   label: 'Products' ,image:"/White_1.svg"},
  { value: '100+',  label: 'Employees' ,image:"/White_2.svg"},
  { value: '25K+',   label: 'Customers' ,image:"/White_3.svg"},
  { value: '10k', label: 'Happy Customers',image:"/White_1.svg" },
];

export default function Stats() {
  return (
    <section className="relative w-full py-16 overflow-hidden">
      {/* Background video */}
      <video
        src="/bg-video.mov"          // put your video in /public
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 " />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ">
          {stats.map((item) => (
            <div
              key={item.label}
              className="bg-white rounded-3xl shadow-xl px-10 py-14 flex flex-col items-center text-center group hover:scale-[1.05] transition-all duration-300"
            >
              {/* Icon circle – replace with your SVG */}
              <div className="w-28 h-28 rounded-full bg-blue-500 flex items-center justify-center mb-8 group-hover:rotate-y-180 trasition-all duration-500">
                {/* <span className="text-white text-4xl">{item.image}</span> */}
                <img src={item.image} className="p-5"/>
              </div>

              <div className="text-4xl font-extrabold text-blue-500 mb-2">
                {item.value}
              </div>
              <div className="text-sm font-medium text-gray-500">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
