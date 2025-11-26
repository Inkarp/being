import { FaStar } from "react-icons/fa";

const stats = [
    {
        icon: FaStar,
        value: '100+',
        label: 'Products',
    },
    {
        icon: FaStar,
        value: '60+',
        label: 'Deliveries',
    },
    
    // {
    //     icon: FaStar,
    //     value: '25K',
    //     label: 'Happy Clients',
    // },
    // {
    //     icon: FaStar,
    //     value: '91.9K',
    //     label: 'Media Activities',
    // },
];

export default function Services() {
    return (
        <section className="bg-gradient-to-br from-blue-700 to-blue-900 py-20 text-white relative">
            <div className="max-w-6xl mx-auto px-4">
                <div className="mb-8 flex items-center space-x-3">
                    <span className="text-blue-300 font-bold text-lg">Facts</span>
                    {/* <span className="text-blue-300 text-xl">⦿⦿</span> */}
                </div>

                <h2 className="text-4xl font-bold mb-2">Need To Know</h2>
                <h3 className="text-4xl font-bold mb-4">Some Fun Facts</h3>

                <div className="flex items-center mb-8">
                    <div className="flex -space-x-4">
                        {/* Replace src with actual avatars */}
                        <img src="/about-us.png" alt="avatar" className="w-14 h-14 rounded-full border-4 border-white object-cover" />
                        <img src="/about-us.png" alt="avatar" className="w-14 h-14 rounded-full border-4 border-white object-cover" />
                        <img src="/about-us.png" alt="avatar" className="w-14 h-14 rounded-full border-4 border-white object-cover" />
                    </div>
                    <div className="ml-4 text-lg font-semibold leading-7">
                        We&apos;ve 30k+ Globally Clients
                    </div>
                </div>

                <div className="flex flex-wrap gap-6 justify-center">
                    {stats.map((stat, i) => (
                        <div
                            key={i}
                            className="bg-white bg-opacity-10 p-8 rounded-xl text-center min-w-[220px] flex-1"
                        >
                            {/* <div className="text-5xl mb-4"><stat.icon /></div> */}
                            <div className="text-4xl font-bold mb-2">{stat.value}</div>
                            <div className="text-lg font-semibold text-blue-200">{stat.label}</div>
                        </div>
                    ))}

                </div>
            </div>
            {/* Optional: You can add SVGs or background decorations using absolute positioning and opacity */}
        </section>
    );
}
