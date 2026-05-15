'use client';

import { MdHealthAndSafety } from 'react-icons/md';
import { FaChevronDown } from 'react-icons/fa';
import Image from 'next/image';
import { FaVialCircleCheck } from 'react-icons/fa6';
import { LuBadgeCheck } from 'react-icons/lu';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { useState } from 'react';


export default function ProductTabContent({
  product,
  activeTab,
  setIsServiceOpen,
  setIsServiceRenewalOpen
}) {

  const [openFeature, setOpenFeature] = useState(null);
  const [openSafety, setOpenSafety] = useState(null);
  const [openApplication, setOpenApplication] = useState(null);
  const [openInstallation, setOpenInstallation] = useState(null);
  const keyFeatures = product.features?.keyFeatures ||
    product.features?.items?.map((item) => (
      typeof item === 'string'
        ? { title: item }
        : item
    )) ||
    [];
  const safetyFeatureOverview = Array.isArray(product.features?.safetyFeatures?.overview)
    ? product.features.safetyFeatures.overview
    : [];
  const safetyFeatures = Array.isArray(product.features?.safetyFeatures)
    ? product.features.safetyFeatures
    : product.features?.safetyFeatures?.items || [];

  return (
    <div className="p-6 text-sm text-gray-700 flex justify-center items-center w-full">

      {/* ================= FEATURES ================= */}
      {activeTab === "features" && product.features && (
        <div className=" mx-auto space-y-4">

          {/* Heading */}
          <div className="text-center max-w-5xl mx-auto">
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">
              Key Features of {product.title}
            </h2>

            {Array.isArray(product.features.overview) &&
              product.features.overview.map((para, index) => (
                <p
                  key={index}
                  className="text-gray-600 leading-relaxed text-base"
                >
                  {para}
                </p>
              ))}
          </div>

          {/* FEATURES */}
         
          <div className="space-y-5 max-w-5xl mx-auto">
            {keyFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-md"
              >
                {/* Top Row */}
                <button
                  onClick={() =>
                    setOpenFeature(openFeature === index ? null : index)
                  }
                  className="w-full px-6 py-5 flex items-center justify-between text-left"
                >
                  <div className="flex items-center gap-5">

                    {/* Icon */}
                    <div className="min-w-[52px] h-[52px] rounded-xl bg-[#243B8F] flex items-center justify-center text-white">
                      <FaVialCircleCheck size={24} />
                    </div>

                    {/* Title */}
                    <h3 className="text-[17px] font-semibold text-gray-900 leading-snug">
                      {feature.title}
                    </h3>
                  </div>

                  {/* Plus / Minus */}
                  <div className="min-w-[38px] h-[38px] rounded-full border border-gray-300 flex items-center justify-center text-gray-500">
                    {openFeature === index ? (
                      <FiMinus size={18} />
                    ) : (
                      <FiPlus size={18} />
                    )}
                  </div>
                </button>

                {/* Expand Content */}
                <div
                  className={`transition-all duration-300 overflow-hidden ${openFeature === index
                    ? "max-h-[500px] opacity-100"
                    : "max-h-0 opacity-0"
                    }`}
                >
                  <div className="px-6 pb-6 pl-[95px]">
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {feature.description || feature.value}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        

          {/* ================= SAFETY FEATURES ================= */}
          {safetyFeatures.length > 0 && (
            <div className="pt-10">

              <div className="text-center mb-8">
                <h2 className="text-3xl font-semibold text-gray-900 mb-3">
                  Safety Features
                </h2>

                {safetyFeatureOverview.length > 0 ? (
                  safetyFeatureOverview.map((para, index) => (
                    <p key={index} className="text-gray-600 leading-relaxed">
                      {para}
                    </p>
                  ))
                ) : (
                  <p className="text-gray-600">
                    Advanced protection systems designed for safe and reliable laboratory operation.
                  </p>
                )}
              </div>

              <div className="space-y-5">
                {safetyFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className="bg-white border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-md"
                  >
                    {/* Top Row */}
                    <button
                      onClick={() =>
                        setOpenSafety(openSafety === index ? null : index)
                      }
                      className="w-full px-6 py-5 flex items-center justify-between text-left"
                    >
                      <div className="flex items-center gap-5">

                        <div className="min-w-[52px] h-[52px] rounded-xl bg-[#2F4191] flex items-center justify-center text-white">
                          <MdHealthAndSafety size={24} />
                        </div>

                        <h3 className="text-[17px] font-semibold text-gray-900 leading-snug">
                          {feature.title}
                        </h3>
                      </div>

                      <div className="min-w-[38px] h-[38px] rounded-full border border-gray-300 flex items-center justify-center text-gray-500">
                        {openSafety === index ? (
                          <FiMinus size={18} />
                        ) : (
                          <FiPlus size={18} />
                        )}
                      </div>
                    </button>

                    {/* Expand */}
                    <div
                      className={`transition-all duration-300 overflow-hidden ${openSafety === index
                        ? "max-h-[500px] opacity-100"
                        : "max-h-0 opacity-0"
                        }`}
                    >
                      <div className="px-6 pb-6 pl-[95px]">
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
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
              <div key={index} className="flex justify-between border bg-gray-100 border-gray-200 rounded-lg gap-4">
                {/* bg-transparent to avoid parent bg conflict */}
                <div className=" px-3 py-2 rounded-md flex-1 text-left"> {/* Left: label bg */}
                  <span className="text-sm font-medium text-black block">
                    {spec.label}
                  </span>
                </div>
                <div className="bg-[#2B7EC2]/50 text-black p-2 flex-1 text-left"> {/* Right: value bg */}
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

          <div className="space-y-5">
            {product.applications.items.map((app, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-md"
              >
                {/* Top Row */}
                <button
                  onClick={() =>
                    setOpenApplication(openApplication === index ? null : index)
                  }
                  className="w-full px-6 py-5 flex items-center justify-between text-left"
                >
                  <div className="flex items-center gap-5">
                    {/* Icon */}
                    <div className="min-w-[52px] h-[52px] rounded-xl bg-[#2B7EC2] flex items-center justify-center text-white">
                      <LuBadgeCheck size={24} />
                    </div>

                    {/* Title */}
                    <h3 className="text-[17px] font-semibold text-gray-900 leading-snug">
                      {app.label}
                    </h3>
                  </div>

                  {/* Plus / Minus */}
                  <div className="min-w-[38px] h-[38px] rounded-full border border-gray-300 flex items-center justify-center text-gray-500">
                    {openApplication === index ? (
                      <FiMinus size={18} />
                    ) : (
                      <FiPlus size={18} />
                    )}
                  </div>
                </button>

                {/* Expand Content */}
                <div
                  className={`transition-all duration-300 overflow-hidden ${openApplication === index
                    ? "max-h-[300px] opacity-100"
                    : "max-h-0 opacity-0"
                    }`}
                >
                  <div className="px-6 pb-6 pl-[95px]">
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {app.value}
                    </p>
                  </div>
                </div>
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
              className="animate-pulse bg-[#2F4191] text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-[#2B7EC2] transition"
            >
              Click here for One Year Warranty?
            </button>
          </div>

          <p className="text-sm text-gray-700 leading-relaxed">
            {product.services.description}
          </p>
          {/* <div className="bg-gray-300 rounded-2xl p-4">
            <div
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
            </div>
          </div> */}
        </div>
      )}

      {/* ================= BLOG ================= */}
      {activeTab === 'blog' && product.blog && (
        <article className="max-w-5xl mx-auto w-full space-y-8">
          <header className="text-center max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 font-['Arial','Helvetica Neue','Helvetica',sans-serif]">
              {product.blog.heading || product.blog.title || `Blog of ${product.title}`}
            </h2>

            {product.blog.description && (
              <p className="text-sm text-gray-700 leading-relaxed mb-3">
                {product.blog.description}
              </p>
            )}

            {Array.isArray(product.blog.overview) &&
              product.blog.overview.map((para, index) => (
                <p key={index} className="text-sm text-gray-700 leading-relaxed mb-3">
                  {para}
                </p>
              ))}
          </header>

          {Array.isArray(product.blog.content) && (
            <div className="space-y-5">
              {product.blog.content.map((block, index) => {
                if (block.type === 'heading') {
                  const HeadingTag = block.level === 'h3' ? 'h3' : 'h2';

                  return (
                    <HeadingTag key={index} className="text-xl font-semibold text-gray-900 pt-4">
                      {block.value}
                    </HeadingTag>
                  );
                }

                if (block.type === 'list') {
                  return (
                    <ul key={index} className="list-disc pl-6 space-y-2 text-sm text-gray-700 leading-relaxed">
                      {block.items?.map((item, itemIndex) => (
                        <li key={itemIndex}>{item}</li>
                      ))}
                    </ul>
                  );
                }

                return (
                  <p key={index} className="text-sm text-gray-700 leading-relaxed">
                    {block.value}
                  </p>
                );
              })}
            </div>
          )}

          {Array.isArray(product.blog.items) && (
            <div className="space-y-8">
              {product.blog.items.map((post, index) => (
                <section key={index} className="space-y-3">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {post.description}
                  </p>
                </section>
              ))}
            </div>
          )}
        </article>
      )}

      {/* ================= INSTALLATIONS ================= */}
      {activeTab === 'feedback' && product.installations && (
        <div className="space-y-8 max-w-5xl mx-auto w-full">
          {/* Heading + Description */}
          <div className="flex flex-col items-center text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3 font-['Arial','Helvetica Neue','Helvetica',sans-serif]">
              Installations of {product.title}
            </h2>

            <p className="text-gray-700 ">
              {product.installations.description}
            </p>
          </div>

          {/* Installation List */}
          <div className="space-y-3">
            {product.installations.items.map((installation, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-md"
              >
                {/* Top Row */}
                <button
                  onClick={() =>
                    setOpenInstallation(openInstallation === index ? null : index)
                  }
                  className="w-full px-6 py-5 flex items-center justify-between text-left"
                >
                  <div className="flex items-center gap-5">
                    {/* Icon */}
                    <div className="min-w-[52px] h-[52px] rounded-xl bg-[#2B7EC2] flex items-center justify-center text-white">
                      <MdHealthAndSafety size={24} />
                    </div>

                    {/* Title */}
                    <h3 className="text-[17px] font-semibold text-gray-900 leading-snug">
                      Installation {index + 1}
                    </h3>
                  </div>

                  {/* Plus / Minus */}
                  <div className="min-w-[38px] h-[38px] rounded-full border border-gray-300 flex items-center justify-center text-gray-500">
                    {openInstallation === index ? (
                      <FiMinus size={18} />
                    ) : (
                      <FiPlus size={18} />
                    )}
                  </div>
                </button>

                {/* Expand Content */}
                <div
                  className={`transition-all duration-300 overflow-hidden ${openInstallation === index
                    ? "max-h-[200px] opacity-100"
                    : "max-h-0 opacity-0"
                    }`}
                >
                  <div className="px-6 pb-6 pl-[95px]">
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {installation}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}


    </div>
  );
}
