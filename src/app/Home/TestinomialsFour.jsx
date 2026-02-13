"use client";

import Image from "next/image";

const testimonials = [
    {
        id: 1,
        name: "David H. Hansson",
        role: "CTO, Boosting Metabolism",
        link: "https://timerse.com/7-steps-to-boost-your-metabolism/",
        image: "/dp.jpg",
        text: `I felt disorganized. Pieces of paper everywhere. I was constantly making new lists, losing old ones, crossing off items and adding new ones. I was forever worried things were slipping and not getting done. My brain was tired`,
        youtube: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
        id: 2,
        name: "Dan Abramov",
        role: "Creator, Java",
        link: "https://swift.org/",
        image: "/dp.jpg",
        text: `I felt disorganized. Pieces of paper everywhere. I was constantly making new lists, losing old ones, crossing off items and adding new ones. I was forever worried things were slipping and not getting done. My brain was tired`,
        youtube: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
];

export default function TestimonialsFour() {
    return (
        <section className="bg-gray-800 text-gray-100 py-16 px-6 sm:px-8">

            {/* Container */}
            <div className="relative max-w-screen-xl mx-auto bg-gray-100 text-gray-900 rounded-lg shadow-lg px-8 md:px-12 lg:px-16 xl:px-32 py-16">

                {/* Hero Pattern Background */}
                {/* <div className="absolute right-0 bottom-0 w-64 h-56 opacity-40 bg-[url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3z' fill='%239C92AC' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E\")]"></div> */}

                <div className="relative">

                    {/* Heading */}
                    <div className="text-center">
                        <h2 className="text-4xl lg:text-5xl font-bold text-gray-800">
                            Testimonials
                        </h2>
                        <div className="my-4 mx-auto w-12 h-2 border-4 border-indigo-500"></div>
                        <p className="text-gray-700 font-light">
                            Here are what some of our amazing customers are saying ...
                        </p>
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:mx-12 mt-10">

                        {testimonials.map((item) => (
                            <div
                                key={item.id}
                                className="relative rounded-lg shadow max-w-sm mx-auto p-10 bg-gray-100 text-gray-700 flex flex-col justify-between hover:shadow-xl transition"
                            >
                                {/* Quote Icon */}
                                <div className="absolute top-0 left-8 text-indigo-200">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-12 h-12 fill-current"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M6.5 10c-.223 0-.437.034-.65.065.069-.232.14-.468.254-.68.114-.308.292-.575.469-.844.148-.291.409-.488.601-.737.201-.242.475-.403.692-.604.213-.21.492-.315.714-.463.232-.133.434-.28.65-.35.208-.086.39-.16.539-.222.302-.125.474-.197.474-.197L9.758 4.03c0 0-.218.052-.597.144C8.97 4.222 8.737 4.278 8.472 4.345c-.271.05-.56.187-.882.312C7.272 4.799 6.904 4.895 6.562 5.123c-.344.218-.741.4-1.091.692C5.132 6.116 4.723 6.377 4.421 6.76c-.33.358-.656.734-.909 1.162C3.219 8.33 3.02 8.778 2.81 9.221c-.19.443-.343.896-.468 1.336-.237.882-.343 1.72-.384 2.437-.034.718-.014 1.315.028 1.747.015.204.043.402.063.539.017.109.025.168.025.168l.026-.006C2.535 17.474 4.338 19 6.5 19c2.485 0 4.5-2.015 4.5-4.5S8.985 10 6.5 10zM17.5 10c-.223 0-.437.034-.65.065.069-.232.14-.468.254-.68.114-.308.292-.575.469-.844.148-.291.409-.488.601-.737.201-.242.475-.403.692-.604.213-.21.492-.315.714-.463.232-.133.434-.28.65-.35.208-.086.39-.16.539-.222.302-.125.474-.197.474-.197L20.758 4.03c0 0-.218.052-.597.144-.191.048-.424.104-.689.171-.271.05-.56.187-.882.312-.317.143-.686.238-1.028.467-.344.218-.741.4-1.091.692-.339.301-.748.562-1.05.944-.33.358-.656.734-.909 1.162C14.219 8.33 14.02 8.778 13.81 9.221c-.19.443-.343.896-.468 1.336-.237.882-.343 1.72-.384 2.437-.034.718-.014 1.315.028 1.747.015.204.043.402.063.539.017.109.025.168.025.168l.026-.006C13.535 17.474 15.338 19 17.5 19c2.485 0 4.5-2.015 4.5-4.5S19.985 10 17.5 10z" />
                                    </svg>
                                </div>

                                {/* Text */}
                                <p>{item.text}</p>

                                {/* Divider */}
                                <div className="w-full border border-gray-300 my-8"></div>

                                {/* Profile */}
                                <div className="flex items-center">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        width={48}
                                        height={48}
                                        className="rounded-full border-2 border-indigo-400"
                                    />
                                    <div className="ml-4">
                                        <div className="font-bold">{item.name}</div>
                                        <div className="text-sm text-gray-600 mt-1">
                                            {item.role}
                                        </div>
                                    </div>
                                </div>

                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </section>
    );
}
