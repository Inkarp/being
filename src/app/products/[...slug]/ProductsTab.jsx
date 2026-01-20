'use client';

export default function ProductTabs({
  activeTab,
  setActiveTab,
  hasFeatures,
  hasSpecs,
  hasApplications,
  hasFaqs,
  hasServices,
  hasFeedback,
}) {
  return (
    <div className="px-3 sm:px-6 pt-6 flex flex-wrap">
      <div
        className="
          bg-gray-100 rounded-full p-1
          flex gap-1
          overflow-x-auto scrollbar-hide
          w-full
          justify-start
          sm:justify-center
        "
      >
        {/* FEATURES */}
        {hasFeatures && (
          <button
            onClick={() => setActiveTab('features')}
            className={`px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300
              ${activeTab === 'features'
                ? 'bg-white text-gray-900 shadow-md'
                : 'text-gray-600 hover:text-gray-900'
              }`}
          >
            Key Features
          </button>
        )}

        {/* SPECIFICATIONS */}
        {hasSpecs && (
          <button
            onClick={() => setActiveTab('specs')}
            className={`px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300
              ${activeTab === 'specs'
                ? 'bg-white text-gray-900 shadow-md'
                : 'text-gray-600 hover:text-gray-900'
              }`}
          >
            Specifications
          </button>
        )}

        {/* APPLICATIONS */}
        {hasApplications && (
          <button
            onClick={() => setActiveTab('applications')}
            className={`px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300
              ${activeTab === 'applications'
                ? 'bg-white text-gray-900 shadow-md'
                : 'text-gray-600 hover:text-gray-900'
              }`}
          >
            Applications
          </button>
        )}

        {/* FAQs */}
        {hasFaqs && (
          <button
            onClick={() => setActiveTab('faqs')}
            className={`px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-300
              ${activeTab === 'faqs'
                ? 'bg-white text-gray-900 shadow-md'
                : 'text-gray-600 hover:text-gray-900'
              }`}
          >
            FAQs
          </button>
        )}

        {/* SERVICE & SUPPORT */}
        {hasServices && (
          <button
            onClick={() => setActiveTab('services')}
            className={`px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-300
              ${activeTab === 'services'
                ? 'bg-white text-gray-900 shadow-md'
                : 'text-gray-600 hover:text-gray-900'
              }`}
          >
            Service & Support
          </button>
        )}

        {/* CUSTOMER FEEDBACK */}
        {hasFeedback && (
          <button
            onClick={() => setActiveTab('feedback')}
            className={`px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-300
              ${activeTab === 'feedback'
                ? 'bg-white text-gray-900 shadow-md'
                : 'text-gray-600 hover:text-gray-900'
              }`}
          >
            Installations
          </button>
        )}
      </div>
    </div>
  );
}
