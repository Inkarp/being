'use client';

import { MdOutlineSettingsApplications } from 'react-icons/md';
import { FaChevronDown } from 'react-icons/fa';

export default function ProductTabContent({
  product,
  activeTab,
  setIsServiceOpen,
}) {
  return (
    <div className="p-6 text-sm text-gray-700 flex justify-center items-center w-full">

      {/* ================= FEATURES ================= */}
      {activeTab === 'features' && product.features && (
        <div className="space-y-8 max-w-5xl">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Key Features of {product.title}
            </h2>

            {Array.isArray(product.features.overview) &&
              product.features.overview.map((para, index) => (
                <p key={index} className="text-sm text-gray-700 leading-relaxed">
                  {para}
                </p>
              ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {product.features.items.map((feature, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-lg transition flex gap-5"
              >
                <div className="text-blue-500 text-xl mt-1">
                  <MdOutlineSettingsApplications />
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {feature}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= SPECIFICATIONS ================= */}
      {activeTab === 'specs' && product.specifications && (
        <div className="space-y-8 w-full max-w-5xl">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Technical Specifications of {product.title}
            </h2>

            {Array.isArray(product.specifications.overview) &&
              product.specifications.overview.map((para, index) => (
                <p key={index} className="text-sm text-gray-700 leading-relaxed mb-3">
                  {para}
                </p>
              ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {product.specifications.items.map((spec, index) => (
              <div
                key={index}
                className="flex justify-between bg-gray-50 border border-gray-200 rounded-lg p-4 gap-4"
              >
                <span className="text-sm font-medium text-gray-900">
                  {spec.label}
                </span>
                <span className="text-sm text-gray-600 text-right">
                  {spec.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= APPLICATIONS ================= */}
      {activeTab === 'applications' && product.applications && (
        <div className="space-y-8 max-w-5xl">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Applications of {product.title}
            </h2>

            {Array.isArray(product.applications.overview) &&
              product.applications.overview.map((para, index) => (
                <p key={index} className="text-sm text-gray-700 leading-relaxed mb-3">
                  {para}
                </p>
              ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {product.applications.items.map((app, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-xl p-5 bg-white hover:shadow-sm"
              >
                <h4 className="text-sm font-semibold text-gray-900 mb-2">
                  {app.label}
                </h4>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {app.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= FAQs ================= */}
      {activeTab === 'faqs' && product.faqs && (
        <section className="w-full max-w-5xl">
          <div className="space-y-4">
            {product.faqs.map((faq, index) => (
              <details
                key={index}
                className="group rounded-xl border border-gray-200 bg-white open:shadow-md"
              >
                <summary className="flex justify-between gap-4 px-5 py-4 cursor-pointer font-medium">
                  <span>{faq.question}</span>
                  <FaChevronDown className="transition group-open:rotate-180" />
                </summary>
                <div className="px-5 pb-4 text-gray-700">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </section>
      )}

      {/* ================= SERVICES ================= */}
      {activeTab === 'services' && product.services && (
        <div className="space-y-6 max-w-5xl w-full">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Service & Support in India</h2>
            <button
              onClick={() => setIsServiceOpen(true)}
              className="bg-[#2F4191] text-white px-6 py-3 rounded-full text-sm hover:bg-[#2B7EC2]"
            >
              Need a service?
            </button>
          </div>

          <p className="text-sm text-gray-700">
            {product.services.description}
          </p>
        </div>
      )}

      {/* ================= FEEDBACK ================= */}
      {activeTab === 'feedback' && product.feedback && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl">
          {product.feedback.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Customer feedback ${index + 1}`}
              className="rounded-xl bg-gray-50 p-3"
              loading="lazy"
            />
          ))}
        </div>
      )}

    </div>
  );
}
