'use client';

import { useEffect, useState } from 'react';
import { FaTimes, FaPaperPlane, FaCheckCircle } from 'react-icons/fa';

const INDIAN_STATES = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa",
  "Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala",
  "Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland",
  "Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura",
  "Uttar Pradesh","Uttarakhand","West Bengal",
  "Andaman and Nicobar Islands","Chandigarh","Dadra and Nagar Haveli and Daman and Diu",
  "Delhi","Jammu and Kashmir","Ladakh","Lakshadweep","Puducherry"
];

const INITIAL_STATE = {
  name: '',
  company: '',
  gstNumber: '',
  industry: '',
  designation: '',
  department: '',
  phone: '',
  email: '',
  country: 'India',
  state: '',
  city: '',
  message: '',
  product: '',
  category: '',
};

const REQUIRED_FIELDS = [
  'name','company','gstNumber','industry','designation',
  'department','phone','email','state','city','message'
];

export default function PriceEnquiryForm({
  isOpen,
  onClose,
  productData,
  onSuccess,
}) {
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen && productData) {
      setFormData((prev) => ({
        ...prev,
        product: productData.model || '',
        category: productData.category || '',
        country: 'India',
      }));
    }
  }, [isOpen, productData]);

  const handleClose = () => {
    setFormData(INITIAL_STATE);
    setSubmitted(false);
    setError('');
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    for (const field of REQUIRED_FIELDS) {
      if (!formData[field]?.trim()) {
        return `Please fill the ${field.replace(/([A-Z])/g, ' $1')}`;
      }
    }
    if (!/^\d{10}$/.test(formData.phone)) {
      return 'Please enter a valid 10-digit phone number';
    }
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      return 'Please enter a valid email address';
    }
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/priceEnquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Submission failed');

      setSubmitted(true);
      onSuccess?.();

      setTimeout(handleClose, 1500);
    } catch (err) {
      setError('Failed to send enquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-gray-200 max-w-lg w-full max-h-[90vh] overflow-y-auto">

        {/* HEADER */}
        <div className="flex items-center justify-between p-5 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-[#2F4191]">Price Enquiry</h2>
          <button onClick={handleClose} className="p-2 hover:bg-gray-100 rounded-md">
            <FaTimes className="text-gray-500" />
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">

          {/* NAME & COMPANY */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="name" required placeholder="Full Name *"
              value={formData.name} onChange={handleChange}
              className="w-full rounded-full border px-3 py-2 text-sm" />
            <input name="company" required placeholder="Company *"
              value={formData.company} onChange={handleChange}
              className="w-full rounded-full border px-3 py-2 text-sm" />
          </div>

          {/* GST & INDUSTRY */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="gstNumber" required placeholder="GST Number *"
              value={formData.gstNumber} onChange={handleChange}
              className="w-full rounded-md border px-3 py-2 text-sm" />
            <input name="industry" required placeholder="Industry *"
              value={formData.industry} onChange={handleChange}
              className="w-full rounded-md border px-3 py-2 text-sm" />
          </div>

          {/* DESIGNATION & DEPARTMENT */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="designation" required placeholder="Designation *"
              value={formData.designation} onChange={handleChange}
              className="w-full rounded-md border px-3 py-2 text-sm" />
            <input name="department" required placeholder="Department *"
              value={formData.department} onChange={handleChange}
              className="w-full rounded-md border px-3 py-2 text-sm" />
          </div>

          {/* PHONE & EMAIL */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="phone" required type="tel" placeholder="Phone Number *"
              value={formData.phone} onChange={handleChange}
              className="w-full rounded-md border px-3 py-2 text-sm" />
            <input name="email" required type="email" placeholder="Email *"
              value={formData.email} onChange={handleChange}
              className="w-full rounded-md border px-3 py-2 text-sm" />
          </div>

          {/* COUNTRY & STATE */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input value="India" readOnly
              className="w-full rounded-md border px-3 py-2 text-sm bg-gray-100 cursor-not-allowed" />

            <select name="state" required value={formData.state}
              onChange={handleChange}
              className="w-full rounded-md border px-3 py-2 text-sm bg-white">
              <option value="">State *</option>
              {INDIAN_STATES.map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>

          <input name="city" required placeholder="City *"
            value={formData.city} onChange={handleChange}
            className="w-full rounded-md border px-3 py-2 text-sm" />

          <textarea rows="4" name="message"
            value={formData.message} onChange={handleChange}
            placeholder="Message Here..."
            className="w-full rounded-md border px-4 py-3 resize-none" />

          {error && <p className="text-sm text-red-500 text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading || submitted}
            className={`w-full py-3 rounded-md text-sm font-medium flex justify-center gap-2 text-white
              ${submitted ? 'bg-green-600' : 'bg-[#2F4191] hover:bg-[#2B7EC2]'}`}
          >
            {loading && 'Sending...'}
            {!loading && submitted && <><FaCheckCircle /> Enquiry Sent</>}
            {!loading && !submitted && <><FaPaperPlane /> Send Enquiry</>}
          </button>
        </form>
      </div>
    </div>
  );
}
