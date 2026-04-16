'use client';

import { useEffect, useState } from 'react';
import { FaTimes, FaPaperPlane, FaCheckCircle } from 'react-icons/fa';

const INITIAL_STATE = {
  name: '',
  company: '',
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

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Andaman and Nicobar Islands', 'Chandigarh',
  'Dadra and Nagar Haveli and Daman and Diu', 'Delhi',
  'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry',
];

// Reusable input style
const inputClass =
  'w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600';

export default function ServiceRenewalForm({ isOpen, onClose, productData }) {
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  // Sync product info when modal opens
  useEffect(() => {
    if (isOpen && productData) {
      setFormData((prev) => ({
        ...prev,
        product: productData.model || '',
        category: productData.category || '',
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/serviceRenewal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Submission failed');

      setSubmitted(true);
      setTimeout(handleClose, 2000);
    } catch (err) {
      console.error(err);
      setError('Failed to send enquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    // Backdrop
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">

      {/* Modal */}
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-base font-semibold text-blue-800">
            Service Renewal Request
          </h2>
          <button
            onClick={handleClose}
            aria-label="Close"
            className="p-1.5 rounded hover:bg-gray-100 text-gray-500"
          >
            <FaTimes size={14} />
          </button>
        </div>

        {/* Product badge */}
        {productData?.model && (
          <div className="px-6 pt-4">
            <div className="bg-blue-50 border border-blue-200 rounded-md px-4 py-2.5">
              <p className="text-sm text-gray-600">
                Product:{' '}
                <span className="font-medium text-blue-800">{productData.model}</span>
              </p>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">

          {/* Row: Name + Company */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              name="name"
              required
              placeholder="Full Name *"
              value={formData.name}
              onChange={handleChange}
              className={inputClass}
            />
            <input
              name="company"
              required
              placeholder="Company *"
              value={formData.company}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          {/* Row: Designation + Department */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              name="designation"
              required
              placeholder="Designation *"
              value={formData.designation}
              onChange={handleChange}
              className={inputClass}
            />
            <input
              name="department"
              required
              placeholder="Department *"
              value={formData.department}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          {/* Row: Phone + Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              name="phone"
              required
              type="tel"
              placeholder="Phone Number *"
              value={formData.phone}
              onChange={handleChange}
              className={inputClass}
            />
            <input
              name="email"
              required
              type="email"
              placeholder="Email *"
              value={formData.email}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          {/* Row: Country (locked) + State */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              name="country"
              value="India"
              readOnly
              className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm bg-gray-100 text-gray-500 cursor-not-allowed"
            />
            <select
              name="state"
              required
              value={formData.state}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="">Select State *</option>
              {INDIAN_STATES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* City */}
          <input
            name="city"
            required
            placeholder="City *"
            value={formData.city}
            onChange={handleChange}
            className={inputClass}
          />

          {/* Message */}
          <textarea
            name="message"
            rows={4}
            placeholder="Message (optional)"
            value={formData.message}
            onChange={handleChange}
            className={`${inputClass} resize-none`}
          />

          {/* Error */}
          {error && (
            <p className="text-sm text-red-500 text-center">{error}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading || submitted}
            className={`w-full py-2.5 rounded-md text-sm font-medium flex items-center justify-center gap-2 transition-colors
              ${submitted ? 'bg-green-600' : 'bg-blue-800 hover:bg-blue-700'}
              text-white disabled:opacity-75 disabled:cursor-not-allowed`}
          >
            {loading && (
              <>
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                Sending...
              </>
            )}
            {!loading && submitted && (
              <>
                <FaCheckCircle />
                Enquiry Sent!
              </>
            )}
            {!loading && !submitted && (
              <>
                <FaPaperPlane size={12} />
                Send Enquiry
              </>
            )}
          </button>

        </form>
      </div>
    </div>
  );
}