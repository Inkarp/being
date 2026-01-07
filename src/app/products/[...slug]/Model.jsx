'use client';

import { MdOutlineSettingsApplications } from "react-icons/md";
import { FaChevronDown } from "react-icons/fa";

export default function Model({
  product,
  activeTab,
  setActiveTab,
}) {
  if (!product) return null;

  return (
    <>
      {/* ================= TAB BUTTONS ================= */}
      <div className="px-6 pt-6 flex justify-center items-center">
        <div className="bg-gray-100 rounded-full p-1 flex gap-1 flex-wrap">

          {product.keyFeatures && (
            <button
              onClick={() => setActiveTab('features')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all
                ${activeTab === 'features'
                  ? 'bg-white text-gray-900 shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
                }`}
            >
              Features
            </button>
          )}

          {product.specifications && (
            <button
              onClick={() => setActiveTab('specs')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all
                ${activeTab === 'specs'
                  ? 'bg-white text-gray-900 shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
                }`}
            >
              Specifications
            </button>
          )}

          {product.applications && (
            <button
              onClick={() => setActiveTab('applications')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all
                ${activeTab === 'applications'
                  ? 'bg-white text-gray-900 shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
                }`}
            >
              Applications
            </button>
          )}

          {product.faqs && product.faqs.length > 0 && (
            <button
              onClick={() => setActiveTab('faqs')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all
                ${activeTab === 'faqs'
                  ? 'bg-white text-gray-900 shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
                }`}
            >
              FAQs
            </button>
          )}

        </div>
      </div>

      {/* ================= TAB CONTENT ================= */}
      <div className="p-6 text-sm text-gray-700 flex justify-center items-center">

        {/* FEATURES */}
        {activeTab === 'features' && product.keyFeatures && (
          <div className="space-y-6 max-w-6xl w-full">

            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Key Features of {product.meta.title}
              </h2>
              <p className="text-sm text-gray-700">
                {product.overview}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {product.keyFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-lg transition flex gap-5"
                >
                  <span className="text-blue-500 text-xl">
                    <MdOutlineSettingsApplications />
                  </span>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {feature}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SPECIFICATIONS */}
        {activeTab === 'specs' && product.specifications && (
          <div className="space-y-6 max-w-5xl w-full">

            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Technical Specifications of {product.meta.title}
              </h2>
              <p className="text-sm text-gray-700">
                {product.overview}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div
                  key={key}
                  className="flex justify-between bg-gray-50 rounded-lg p-4"
                >
                  <span className="font-medium text-gray-900">
                    {key.replace(/([A-Z])/g, ' $1')}
                  </span>
                  <span className="text-gray-600 text-right">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* APPLICATIONS */}
        {activeTab === 'applications' && product.applications && (
          <div className="space-y-6 max-w-6xl w-full">

            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Applications of {product.meta.title}
              </h2>
              <p className="text-sm text-gray-700">
                {product.overview}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {product.applications.map((app, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-xl p-5 hover:border-blue-600 transition"
                >
                  <p className="text-sm text-gray-700">
                    {app}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FAQs */}
        {activeTab === 'faqs' && product.faqs && (
          <div className="space-y-6 max-w-5xl w-full">

            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Frequently Asked Questions
              </h2>
              <p className="text-sm text-gray-700">
                Common questions about {product.meta.title}
              </p>
            </div>

            <div className="space-y-4">
              {product.faqs.map((faq, index) => (
                <details
                  key={index}
                  className="group border border-gray-200 rounded-xl p-4 bg-white"
                >
                  <summary className="flex cursor-pointer items-center justify-between font-medium list-none">
                    {faq.question}
                    <span className="border border-gray-300 bg-gray-100 rounded-full p-1">
                      <FaChevronDown
                        size={16}
                        className="transition-transform duration-300 group-open:rotate-180"
                      />
                    </span>
                  </summary>
                  <p className="mt-3 text-sm text-gray-700">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>

          </div>
        )}

      </div>
    </>
  );
}
