

import Image from 'next/image';

const causes = [
  {
    title: 'IT sample preparation and processing',
    amountRaised: 53458,
    goal: 87609,
    percentage: 63,
    image: '/about-us.png',
    description:
      'Totam rem aperiam, eaque ipsa quae ab illosa inventore veritatis et quasi.',
  },
  {
    title: 'Temperature control storage chambers',
    amountRaised: 53458,
    goal: 87609,
    percentage: 42,
    image: '/about-us.png',
    description:
      'Totam rem aperiam, eaque ipsa quae ab illosa inventore veritatis et quasi.',
  },
  {
    title: 'Cell Culture and Microbiology',
    amountRaised: 53458,
    goal: 87609,
    percentage: 70,
    image: '/about-us.png',
    description:
      'Totam rem aperiam, eaque ipsa quae ab illosa inventore veritatis et quasi.',
  },
];

export default function Recent() {
  return (
    <section className="py-20 bg-[#f8f9fa]">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-2">
          Our  <span className="text-yellow-600">Products</span>
        </h2>
        <p className="text-gray-600 mb-10">
          Our <span className="text-yellow-600 font-medium">charity helps</span> those people who have no hope
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {causes.map((cause, index) => (
            <div key={index} className="bg-white shadow-sm rounded-md overflow-hidden">
              <div className="relative">
                <Image
                  src={cause.image}
                  alt={cause.title}
                  width={600}
                  height={400}
                  className="w-full h-64 object-cover"
                />

                {/* Progress bar */}
                {/* <div className="absolute bottom-0 left-0 w-full h-2 bg-yellow-200">
                  <div
                    className="h-2 bg-yellow-500"
                    style={{ width: `${cause.percentage}%` }}
                  ></div>
                </div> */}

                {/* Percentage Badge */}
                <div className="absolute bottom-[-16px] left-30 bg-white border-2 border-[#2B7EC2] text-yellow-600 font-semibold text-sm px-3 py-1 rounded-full shadow-sm">
                  {cause.percentage}+ Products
                </div>
              </div>

              <div className="px-6 pt-8 pb-6 text-center space-y-3">
                {/* <p className="text-sm text-gray-500">
                  Donation: <span className="font-semibold">${cause.amountRaised.toLocaleString()}</span>
                  /${cause.goal.toLocaleString()}
                </p> */}
                <h3 className="text-lg font-semibold">{cause.title}</h3>
                <p className="text-gray-500 text-sm">{cause.description}</p>
                <div className="pt-4">
                  <button className="bg-[#2B7EC2] hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded-sm">
                    EXPLORE MORE
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
