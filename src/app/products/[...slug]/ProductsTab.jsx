'use client';

/* ================= REUSABLE TAB BUTTON ================= */
function TabButton({ label, tabKey, activeTab, setActiveTab }) {
  const isActive = activeTab === tabKey;

  return (
    <button
      onClick={() => setActiveTab(tabKey)}
      className={`
        px-4 sm:px-6 py-2
        rounded-full
        text-xs sm:text-sm
        font-medium
        whitespace-nowrap
        transition-all duration-300

        ${isActive
          ? 'bg-white text-gray-900 shadow-md'
          : 'text-white hover:text-gray-900'
        }
      `}
    >
      {label}
    </button>
  );
}

/* ================= TAB CONFIGURATION (SINGLE SOURCE OF TRUTH) ================= */
const TABS = [
  { key: 'features', label: 'Key Features', flag: 'hasFeatures' },
  { key: 'specs', label: 'Specifications', flag: 'hasSpecs' },
  { key: 'applications', label: 'Applications', flag: 'hasApplications' },
  { key: 'faqs', label: 'FAQs', flag: 'hasFaqs' },
  { key: 'services', label: 'Service & Support', flag: 'hasServices' },
  { key: 'feedback', label: 'Installations', flag: 'hasFeedback' },
];

/* ================= MAIN COMPONENT ================= */
export default function ProductTabs(props) {
  const {
    activeTab,
    setActiveTab,
    hasFeatures,
    hasSpecs,
    hasApplications,
    hasFaqs,
    hasServices,
    hasFeedback,
  } = props;

  return (
    <div className="px-3 sm:px-6 pt-6 flex flex-wrap">
      <div
        className="
          bg-[#2F4191]
          rounded-2xl
          p-1
          flex gap-1
          overflow-x-auto
          scrollbar-hide
          w-full
          justify-start sm:justify-center
        "
      >
        {TABS.map((tab) => {
          const isVisible = props[tab.flag];
          if (!isVisible) return null;

          return (
            <TabButton
              key={tab.key}
              label={tab.label}
              tabKey={tab.key}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          );
        })}
      </div>
    </div>
  );
}
