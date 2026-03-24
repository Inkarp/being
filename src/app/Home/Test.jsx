// app/page.js
import Image from "next/image";

const stats = [
  { label: "Customers", value: "2,000+" },
  { label: "Installations", value: "5,000+" },
  { label: "Products", value: "10+" },
];

const featuredClients = [
  {
    name: "Amazon India",
    logo: "/BangloreUniversity.jpg",
    tags: ["CRM", "Analytics", "Billing"],
  },
  {
    name: "Tata Motors",
    logo: "/BangloreUniversity.jpg",
    tags: ["HRMS", "Payroll", "CRM"],
  },
  {
    name: "Zomato",
    logo: "/BangloreUniversity.jpg",
    tags: ["Analytics", "Billing", "CRM"],
  },
  {
    name: "State Bank of India",
    logo: "/BangloreUniversity.jpg",
    tags: ["Core", "Security", "Analytics"],
  },
  {
    name: "Reliance",
    logo: "/BangloreUniversity.jpg",
    tags: ["CRM", "Inventory", "POS"],
  },
];

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "CTO, TechCorp",
    text: "Increased our efficiency by 300%. The CRM + Analytics combo is game-changing!",
  },
  {
    name: "Priya Kumar",
    role: "Head of IT, Tata Motors",
    text: "Seamless implementation across 50,000 employees. Best decision we made!",
  },
  {
    name: "Amit Mehta",
    role: "CEO, GrowFast",
    text: "From startup to scale-up, their products grew with us. Amazing support!",
  },
];

export default function Test() {
  return (
    <main className="bg-gray-50 min-h-screen py-16 px-6">
      {/* Header */}
      <div className="text-center max-w-4xl mx-auto">
        <p className="text-sm bg-blue-100 text-blue-600 inline-block px-4 py-1 rounded-full mb-4">
          Trusted by 2000+ Customers Worldwide
        </p>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Join <span className="text-blue-600">2,000+</span> Happy Customers
        </h1>
        <p className="text-gray-600">
          From startups to enterprises — we power 5,000+ installations globally.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 max-w-4xl mx-auto">
        {stats.map((item, index) => (
          <div key={index} className="bg-white rounded-xl shadow p-6 text-center">
            <h2 className="text-2xl font-bold text-blue-600">{item.value}</h2>
            <p className="text-gray-500">{item.label}</p>
          </div>
        ))}
      </div>

      {/* Featured Clients */}
      <div className="mt-16 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-center mb-8">⭐ Featured Clients</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {featuredClients.map((client, index) => (
            <div key={index} className="group bg-white rounded-xl shadow p-4 hover:shadow-lg transition">
              <div className="flex justify-center mb-4">
                <Image src={client.logo} alt={client.name} width={80} height={40} />
              </div>
              <h3 className="text-center font-medium text-gray-700">{client.name}</h3>

              <div className="mt-3 opacity-0 group-hover:opacity-100 transition text-center">
                <p className="text-xs text-gray-500 mb-1">Products Installed</p>
                <div className="flex flex-wrap justify-center gap-1">
                  {client.tags.map((tag, i) => (
                    <span key={i} className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="mt-20 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-center mb-8">What Our Customers Say</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <p className="text-yellow-500 mb-2">★★★★★</p>
              <p className="text-gray-600 mb-4">"{t.text}"</p>
              <h4 className="font-semibold text-gray-800">{t.name}</h4>
              <p className="text-sm text-gray-500">{t.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-20 max-w-4xl mx-auto bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-10 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Join These Companies?</h2>
        <p className="mb-6">See why 2,000+ businesses trust us.</p>
        <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-gray-100">
          View All Customers
        </button>
      </div>
    </main>
  );
}
