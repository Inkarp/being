'use client';

import Image from 'next/image';
import { FaFileDownload, FaShare } from 'react-icons/fa';
import { FcCollaboration } from 'react-icons/fc';
import ProductTabs from './ProductsTab';
import ProductTabContent from './ProductTabContent';

export default function ProductActionSection({
  product,
  activeTab,
  setActiveTab,
  handleShare,
  priceUnlocked,
  setIsPriceOpen,
  setIsEnquiryOpen,
  setIsExclusivePatnership,
  setIsServiceOpen,
}) {
  return (
    <div className="mt-5 border border-gray-200 rounded-2xl">

      {/* ================= ACTION BAR ================= */}
      <div className="flex flex-col gap-6 lg:flex-row lg:justify-between lg:items-center bg-gray-200 py-4">

        {/* LEFT */}
        <div className="flex flex-wrap justify-center items-center gap-4 px-4 sm:px-6 lg:px-10">
          {product.gem && (
            <Image
              src="/Gem.png"
              alt="Gem Product"
              width={130}
              height={130}
              className="shrink-0"
            />
          )}

          <button
            onClick={() => setIsExclusivePatnership(true)}
            className="group flex items-center gap-3 bg-[#2B7EC2] text-white px-4 sm:px-6 py-3 rounded-full text-sm font-semibold hover:bg-[#2F4191] transition"
          >
            <span className="flex items-center justify-center w-9 h-9 bg-white rounded-full">
              <FcCollaboration size={20} />
            </span>
            <span>
              <span className="block">Be Our</span>
              <span className="block font-bold">Exclusive Partner</span>
            </span>
          </button>
        </div>

        {/* CENTER */}
        <div className="flex flex-wrap justify-center items-center gap-4 px-4 sm:px-6 lg:px-10">
          <button
            onClick={() => setIsEnquiryOpen(true)}
            className="flex items-center gap-3 bg-[#2F4191] text-white px-4 sm:px-6 py-3 rounded-full text-sm font-semibold hover:bg-[#2B7EC2] transition shadow-lg"
          >
            <FaFileDownload size={18} />
            Download Brochure
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-3 bg-[#2F4191] text-white px-4 sm:px-6 py-3 rounded-full text-sm font-semibold hover:bg-[#2B7EC2] transition shadow-lg"
          >
            <FaShare size={18} />
            Share
          </button>
        </div>

        {/* RIGHT */}
        <div className="flex flex-wrap justify-center items-center gap-4 px-4 sm:px-6 lg:px-10">
          <button
            onClick={() => setIsEnquiryOpen(true)}
            className="bg-[#2F4191] text-white px-4 sm:px-6 py-3 rounded-full text-sm hover:bg-[#2B7EC2]"
          >
            Enquiry
          </button>

          {product.price && (
            <button
              onClick={() => !priceUnlocked && setIsPriceOpen(true)}
              className="bg-[#2F4191] text-white px-4 sm:px-6 py-3 rounded-full text-sm hover:bg-[#2B7EC2]"
            >
              {priceUnlocked ? `₹ ${product.price}` : 'Request Price'}
            </button>
          )}
        </div>
      </div>

      {/* ================= TABS ================= */}
      <ProductTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        hasFeatures={product.features?.items?.length > 0}
        hasSpecs={product.specifications?.items?.length > 0}
        hasApplications={product.applications?.items?.length > 0}
        hasFaqs={product.faqs?.length > 0}
        hasServices={!!product.services}
        hasFeedback={!!product.feedback}
      />

      {/* ================= TAB CONTENT ================= */}
      <ProductTabContent
        product={product}
        activeTab={activeTab}
        setIsServiceOpen={setIsServiceOpen}
      />
    </div>
  );
}
