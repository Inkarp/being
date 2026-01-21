'use client';

import { MdOutlineSettingsApplications } from 'react-icons/md';
import { FaChevronDown } from 'react-icons/fa';
import Image from 'next/image';


export default function ProductTabContent({
  product,
  activeTab,
  setIsServiceOpen,
  setIsServiceRenewalOpen
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {product.features.items.map((feature, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-lg transition flex gap-5"
              >
                <div className="text-white bg-[#2F4191] text-xl mt-1 p-2 rounded-lg flex items-center justify-center">
                  <MdOutlineSettingsApplications size={36} />
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 ">
            {product.specifications.items.map((spec, index) => (
              <div key={index} className="flex justify-between border bg-gray-100 border-gray-200 rounded-lg gap-4"> {/* bg-transparent to avoid parent bg conflict */}
                <div className=" px-3 py-2 rounded-md flex-1 text-left"> {/* Left: label bg */}
                  <span className="text-sm font-medium text-black block">
                    {spec.label}
                  </span>
                </div>
                <div className="bg-gray-300 text-black p-2 flex-1 text-left"> {/* Right: value bg */}
                  <span className="text-sm  block">
                    {spec.value}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* ================= APPLICATIONS ================= */}
      {activeTab === 'applications' && product.applications && (
        <div className="space-y-8 max-w-5xl">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3 font-['Arial','Helvetica Neue','Helvetica',sans-serif]">
              Applications of {product.title}
            </h2>

            {Array.isArray(product.applications.overview) &&
              product.applications.overview.map((para, index) => (
                <p key={index} className="text-sm text-gray-700 leading-relaxed mb-3">
                  {para}
                </p>
              ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
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
      {/* =================faqs ================= */}

      {activeTab === 'faqs' && product?.faqs && (
        <section className="w-full max-w-5xl mx-auto space-y-8">
          {/* ================= OVERVIEW ================= */}
          {Array.isArray(product.faqs.overview) && (
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                FAQs of {product.title}
              </h2>

              {product.faqs.overview.map((text, i) => (
                <p
                  key={i}
                  className="text-sm text-gray-700 leading-relaxed w-full mx-auto mb-3"
                >
                  {text}
                </p>
              ))}
            </div>
          )}

          {/* ================= FAQ ITEMS ================= */}
          <div className="space-y-4">
            {Array.isArray(product.faqs?.items) &&
              product.faqs.items.map((faq, index) => (
                <details
                  key={index}
                  className="group rounded-xl border border-gray-200 bg-white open:shadow-md"
                >
                  <summary className="flex justify-between items-start gap-4 px-5 py-4 cursor-pointer font-medium list-none">
                    <span className="text-sm sm:text-base text-gray-900 leading-relaxed">
                      {faq.question}
                    </span>
                    <FaChevronDown className="transition-transform group-open:rotate-180" />
                  </summary>

                  <div className="px-5 pb-4 text-sm text-gray-700 leading-relaxed">
                    {faq.answer}
                  </div>
                </details>
              ))}
          </div>

        </section>
      )}

      {/* ================= service ================= */}
      {activeTab === 'services' && product.services && (
        <div className="space-y-6 max-w-5xl w-full">

          {/* HEADER */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <h2 className="text-2xl font-semibold text-gray-900">
              Service & Support in India
            </h2>

            <button
              onClick={() => setIsServiceOpen(true)}
              className="bg-[#2F4191] text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-[#2B7EC2] transition"
            >
              Need a service?
            </button>

            
            <button
              onClick={() => setIsServiceRenewalOpen(true)}
              className="bg-[#2F4191] text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-[#2B7EC2] transition"
            >
              Request for One Year Warranty?
            </button>
          </div>

          <p className="text-sm text-gray-700 leading-relaxed">
            {product.services.description}
          </p>
          <div className="bg-gray-300 rounded-2xl p-4">

            {/* <div
              className="bg-white rounded-xl p-4 max-h-[420px] overflow-y-auto pr-2"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {product.services.photos?.map((img, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-xl p-3 bg-white hover:shadow-md transition"
                  >
                    <Image
                      src={img}
                      alt={`Service support ${index + 1} for ${product.title}`}
                      width={300}
                      height={200}
                      className="w-full h-[250px] object-contain"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div> */}

          </div>
        </div>
      )}

      {/* ================= INSTALLATIONS ================= */}
      {activeTab === 'feedback' && product.installations && (
        <div className="space-y-8 max-w-5xl">
          {/* Heading + Description */}
          <div className="flex flex-col items-center text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3 font-['Arial','Helvetica Neue','Helvetica',sans-serif]">
              Installations of {product.title}
            </h2>

            <p className="text-gray-700 max-w-3xl">
              {product.installations.description}
            </p>
          </div>

          {/* Installation List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {product.installations.items.map((app, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-xl p-5 bg-white hover:shadow-sm transition"
              >
                <h4 className="text-sm font-semibold text-gray-900">
                  {app}
                </h4>
              </div>
            ))}
          </div>
        </div>
      )}


    </div>
  );
}
