
'use client';
import { useState, useMemo } from 'react';
import { HiX } from 'react-icons/hi';
import { FiSend } from 'react-icons/fi';


const MAIN_OPTIONS = [
  'Product',
  'Service',
  'Quote',
  'Talk to expert',
];

const PRODUCTS = [
  'Laboratory Drying Oven',
  'Incubators',
  'Chillers',
  'Water Baths',
  'Rotary Evaporators',
  'Pumps',
  'Cabinet',
  'Freezers',
  'Digital Viscometer',
  'Muffle Furnace',
];

// MASTER PRODUCT LIST (Future link ready)

// MASTER PRODUCT LIST (Future link ready)

export const PRODUCT_MASTER = [
  { name: 'Laboratory Drying Oven', slug: 'laboratory-drying-oven', link: '#' },
  { name: 'Vacuum Oven (LED Display)', slug: 'vacuum-oven-led', link: '#' },
  { name: 'Vacuum Oven (Touch Control)', slug: 'vacuum-oven-touch', link: '#' },
  { name: 'High-Temperature Muffle Furnace', slug: 'muffle-furnace', link: '#' },
  { name: 'Water Bath', slug: 'water-bath', link: '#' },
  { name: 'Heating Incubator', slug: 'heating-incubator', link: '#' },
  { name: 'Vacuum Pump (Oil-Sealed)', slug: 'vacuum-pump-oil', link: '#' },
  { name: 'Diaphragm Pump', slug: 'diaphragm-pump', link: '#' },
  { name: 'Rotary Evaporator', slug: 'rotary-evaporator', link: '#' },
  { name: 'Rotary Evaporator Controller', slug: 'rotary-controller', link: '#' },
  { name: 'Recirculating Chiller (–20 °C to +20 °C)', slug: 'chiller-20', link: '#' },
  { name: 'Recirculating Chiller (–10 °C to +100 °C)', slug: 'chiller-100', link: '#' },
  { name: 'High-Temperature Chiller', slug: 'high-temp-chiller', link: '#' },
  { name: 'Digital Viscometer', slug: 'digital-viscometer', link: '#' },
  { name: 'Cooling Incubator', slug: 'cooling-incubator', link: '#' },
  { name: 'Deep Freezer (–40 °C)', slug: 'deep-freezer-40', link: '#' },
  { name: 'Deep Freezer (–25 °C)', slug: 'deep-freezer-25', link: '#' },
  { name: 'Ultra-Low Temperature Freezer (–86 °C)', slug: 'ult-freezer', link: '#' },
  { name: 'Laboratory Refrigerator (2–8 °C)', slug: 'lab-refrigerator', link: '#' },
  { name: 'CO₂ Incubator', slug: 'co2-incubator', link: '#' },
  { name: 'Biosafety Cabinet', slug: 'biosafety-cabinet', link: '#' },
  { name: 'Vertical Laminar Airflow Cabinet', slug: 'laminar-airflow', link: '#' },
  { name: 'Combined Refrigerator & Deep Freezer', slug: 'combo-fridge', link: '#' },
  { name: 'Cell Culture Lab Setup', slug: 'cell-culture-setup', link: '#' },
];

export const CROSS_SELL_MAP = {
  'Laboratory Drying Oven': [
    'Vacuum Oven (LED Display)',
    'Vacuum Oven (Touch Control)',
    'High-Temperature Muffle Furnace',
    'Water Bath',
    'Heating Incubator',
  ],

  'Vacuum Oven (LED Display)': [
    'Vacuum Pump (Oil-Sealed)',
    'Diaphragm Pump',
    'Laboratory Drying Oven',
    'Recirculating Chiller (–20 °C to +20 °C)',
  ],

  'Vacuum Oven (Touch Control)': [
    'Vacuum Pump (Oil-Sealed)',
    'Diaphragm Pump',
    'Rotary Evaporator',
    'Recirculating Chiller (–20 °C to +20 °C)',
  ],

  'Vacuum Pump (Oil-Sealed)': [
    'Vacuum Oven (LED Display)',
    'Vacuum Oven (Touch Control)',
    'Rotary Evaporator',
    'Diaphragm Pump',
  ],

  'Diaphragm Pump': [
    'Vacuum Oven (LED Display)',
    'Rotary Evaporator',
    'Vacuum Pump (Oil-Sealed)',
  ],

  'Rotary Evaporator': [
    'Rotary Evaporator Controller',
    'Vacuum Pump (Oil-Sealed)',
    'Diaphragm Pump',
    'Recirculating Chiller (–20 °C to +20 °C)',
    'High-Temperature Chiller',
    'Water Bath',
  ],

  'Water Bath': [
    'Rotary Evaporator',
    'Heating Incubator',
    'Digital Viscometer',
  ],

  'Digital Viscometer': [
    'Water Bath',
    'Heating Incubator',
    'Laboratory Refrigerator (2–8 °C)',
  ],

  'CO₂ Incubator': [
    'Biosafety Cabinet',
    'Vertical Laminar Airflow Cabinet',
    'Ultra-Low Temperature Freezer (–86 °C)',
    'Laboratory Refrigerator (2–8 °C)',
  ],
};

export default function Chatbot({ open, onClose }) {

  const [step, setStep] = useState(0);
  const [category, setCategory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  const [showCrossSell, setShowCrossSell] = useState(false);
  const [recommendedProducts, setRecommendedProducts] = useState([]);

  // ✅ Hooks must always execute
  const dynamicFields = useMemo(() => {
    if (!category) return [];

    if (category === 'Product') {
      return [
        'Name',
        'Company Name',
        'Industry',
        'Email',
        'Official Email',
        'Contact Number',
        'Designation',
        'Department',
        'Country',
        'State',
        'City',
        'GST Number',
      ];
    }

    if (category === 'Service') {
      return [
        'Product Name',
        'Model Number',
        'Customer Name',
        'Company Name',
        'Email',
        'Official Email',
        'Contact Number',
        'Designation',
        'Department',
        'State',
        'City',
        'Type Of Service',
        'Under warranty',
        'Message',
      ];
    }

    if (category === 'Quote') {
      return [
        'Company Name',
        'GST Number',
        'State',
        'Customer Name',
        'Email',
        'Official Email',
        'Contact Number',
        'Billing Address',
        'Shipping Address',
      ];
    }

    if (category === 'Talk to expert') {
      return [
        'Customer Name',
        'Company Name',
        'Industry',
        'Email',
        'Official Email',
        'Contact',
        'Designation',
        'Department',
        'Enquired Product',
        'City',
        'Message',
      ];
    }

    return [];
  }, [category]);

  // ✅ AFTER ALL HOOKS
  if (!open) return null;


  const handleSubmit = async () => {
    setLoading(true);

    const payload = {
      Category: category,
      Product: selectedProduct,
      ...formData,
    };

    await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    setLoading(false);

    // 🔥 CROSS SELL TRIGGER
    if (category === 'Product' && CROSS_SELL_MAP[selectedProduct]) {
      const names = CROSS_SELL_MAP[selectedProduct];

      const matched = PRODUCT_MASTER.filter((p) =>
        names.includes(p.name)
      );

      setRecommendedProducts(matched);
      setShowCrossSell(true);
    } else {
      onClose();
    }
  };

  const renderMainSelection = () => (
    <div className="space-y-3">
      {MAIN_OPTIONS.map((opt) => (
        <button
          key={opt}
          onClick={() => {
            setCategory(opt);
            setStep(1);
          }}
          className="w-full rounded-xl bg-gradient-to-r from-[#2F4191] to-[#2B7EC2] text-white py-2 text-sm font-medium hover:scale-[1.02] transition"
        >
          {opt}
        </button>
      ))}
    </div>
  );

  const renderProductSelection = () => (
    <select
      onChange={(e) => {
        setSelectedProduct(e.target.value);
        setStep(2);
      }}
      className="w-full border rounded-lg px-3 py-2 text-sm"
      defaultValue=""
    >
      <option value="" disabled>
        Select Product
      </option>
      {PRODUCTS.map((p) => (
        <option key={p}>{p}</option>
      ))}
    </select>
  );

  const renderDynamicForm = () => (
    <div className="space-y-3">
      {dynamicFields.map((field) => (
        <input
          key={field}
          placeholder={field}
          onChange={(e) =>
            setFormData({ ...formData, [field]: e.target.value })
          }
          className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#2F4191]"
        />
      ))}

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full mt-2 rounded-xl bg-[#2F4191] text-white py-2 text-sm font-semibold flex items-center justify-center gap-2 hover:bg-[#2B7EC2]"
      >
        {loading ? 'Submitting...' : 'Submit & Send'}
        <FiSend size={14} />
      </button>
    </div>
  );

  return (
    <div className="fixed bottom-24 right-6 z-50 w-[380px] backdrop-blur-lg bg-white/90 rounded-2xl shadow-2xl border overflow-hidden">

      {/* Header */}
      <div className="flex justify-between items-center bg-gradient-to-r from-[#2F4191] to-[#2B7EC2] text-white px-4 py-3">
        <span className="font-semibold text-sm">
          Welcome to Being India
        </span>
        <button onClick={onClose}>
          <HiX size={18} />
        </button>
      </div>

      {/* Body */}
      <div className="p-5 space-y-4 max-h-[500px] overflow-y-auto">

        {step === 0 && renderMainSelection()}

        {step === 1 && renderProductSelection()}

        {step === 2 && renderDynamicForm()}

      </div>

      {showCrossSell && (
        <div className="mt-4 border-t pt-4">
          <h4 className="font-semibold text-sm mb-3 text-[#2F4191]">
            You may also be interested in:
          </h4>

          <div className="space-y-2">
            {recommendedProducts.map((product) => (
              <a
                key={product.slug}
                href={product.link}
                className="block px-3 py-2 text-sm rounded-lg border hover:bg-[#2F4191] hover:text-white transition"
              >
                {product.name}
              </a>
            ))}
          </div>

          <button
            onClick={onClose}
            className="mt-4 w-full bg-[#2F4191] text-white py-2 rounded-lg"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}