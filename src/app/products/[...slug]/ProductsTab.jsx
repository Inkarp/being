'use client'

const TABS = [
  { key: 'features', label: 'Key Features', flag: 'hasFeatures' },
  { key: 'specs', label: 'Specifications', flag: 'hasSpecs' },
  { key: 'applications', label: 'Applications', flag: 'hasApplications' },
  { key: 'faqs', label: 'FAQs', flag: 'hasFaqs' },
  { key: 'services', label: 'Service & Support', flag: 'hasServices' },
  { key: 'feedback', label: 'Installations', flag: 'hasFeedback' },
]

export default function ProductTabs(props) {
  const { activeTab, setActiveTab } = props

  const visibleTabs = TABS.filter(tab => props[tab.flag])
  const activeIndex = visibleTabs.findIndex(tab => tab.key === activeTab)

  return (
    <>
      <div className="tabs-wrapper">
        <div className="glass-tabs">
          {visibleTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`tab-btn ${activeTab === tab.key ? 'active' : ''}`}
            >
              {tab.label}
            </button>
          ))}

          <div
            className="glider"
            style={{
              width: `${100 / visibleTabs.length}%`,
              transform: `translateX(${activeIndex * 100}%)`,
            }}
          />
        </div>
      </div>

      <style jsx>{`
        .tabs-wrapper {
          display: flex;
          justify-content: center;
          padding: 20px 12px;
          width: 100%;
        }

        .glass-tabs {
          position: relative;
          display: flex;
          width: 100%;
          max-width: 1200px;
          padding: 6px;
          border-radius: 16px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;

          background: linear-gradient(
            135deg,
            #2F4191,
            #2B7EC2
          );

          box-shadow:
            0 8px 20px rgba(0,0,0,0.25);
        }

        /* Hide scrollbar */
        .glass-tabs::-webkit-scrollbar {
          display: none;
        }

        .tab-btn {
          flex: 1;
          min-width: 160px;
          padding: 10px 20px;
          font-size: 14px;
          font-weight: 600;
          background: transparent;
          border: none;
          color: white;
          cursor: pointer;
          z-index: 2;
          white-space: nowrap;
          scroll-snap-align: center;
          transition: color 0.3s ease;
        }

        .tab-btn:hover {
          opacity: 0.9;
        }

        .tab-btn.active {
          color: black;
        }

        .glider {
          position: absolute;
          top: 6px;
          bottom: 6px;
          left: 0;
          border-radius: 12px;
          z-index: 1;

          background: white;

          transition:
            transform 0.5s cubic-bezier(0.37, 1.95, 0.66, 0.56);

          box-shadow:
            0 4px 15px rgba(0,0,0,0.2);
        }

        /* Desktop */
        @media (min-width: 768px) {
          .glass-tabs {
            overflow-x: hidden;
          }

          .tab-btn {
            min-width: auto;
          }
        }

        /* Small screens */
        @media (max-width: 640px) {
          .tab-btn {
            font-size: 12px;
            padding: 8px 16px;
          }
        }
      `}</style>
    </>
  )
}
