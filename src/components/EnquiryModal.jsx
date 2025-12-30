'use client';

import { useEffect, useState } from 'react';
import { FaTimes, FaPaperPlane, FaCheckCircle } from 'react-icons/fa';

const INITIAL_STATE = {
  name: '',
  company: '',
  designation: '',
  phone: '',
  email: '',
  department: '',
  city: '',
  state: '',
  country: '',
 
  product: '',
  category: '',
};

export default function EnquiryModal({ isOpen, onClose, productData }) {
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  /* Sync product data */
  useEffect(() => {
    if (isOpen && productData) {
      setFormData((prev) => ({
        ...prev,
        product: productData.model || '',
        category: productData.category || '',
      }));
    }
  }, [isOpen, productData]);

  /* Reset modal */
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
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Submission failed');

      setSubmitted(true);

      setTimeout(() => {
        handleClose();
      }, 2000);
    } catch (err) {
      console.error(err);
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
          <h2 className="text-lg font-semibold text-[#2F4191]">
            Product Enquiry
          </h2>
          <button
            onClick={handleClose}
            className="p-2 rounded-md hover:bg-gray-100"
          >
            <FaTimes className="text-gray-500" />
          </button>
        </div>

        {/* PRODUCT INFO */}
        {productData && (
          <div className="px-5 pt-4">
            <div className="rounded-lg border border-[#2B7EC2]/30 bg-[#2B7EC2]/10 px-4 py-3">
              <p className="text-sm text-gray-700">
                Product:{' '}
                <span className="font-medium text-[#2F4191]">
                  {productData.model}
                </span>
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {productData.category} → {productData.subcategory}
              </p>
            </div>
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">

          {/* NAME & COMPANY */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="name"
              required
              placeholder="Full Name *"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                         focus:border-[#2F4191] focus:ring-2 focus:ring-[#2B7EC2]/30 outline-none"
            />
            <input
              name="company"
              placeholder="Company"
              value={formData.company}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                         focus:border-[#2F4191] focus:ring-2 focus:ring-[#2B7EC2]/30 outline-none"
            />
          </div>

          {/* DESIGNATION & PHONE */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="designation"
              placeholder="Designation"
              value={formData.designation}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                         focus:border-[#2F4191] focus:ring-2 focus:ring-[#2B7EC2]/30 outline-none"
            />
            <input
              name="phone"
              type="tel"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                         focus:border-[#2F4191] focus:ring-2 focus:ring-[#2B7EC2]/30 outline-none"
            />
          </div>

          {/* EMAIL */}
          <input
            name="email"
            type="email"
            required
            placeholder="Email *"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                       focus:border-[#2F4191] focus:ring-2 focus:ring-[#2B7EC2]/30 outline-none"
          />

          {/* DEPARTMENT / CITY / STATE */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              name="department"
              placeholder="Department"
              value={formData.department}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                         focus:border-[#2F4191] focus:ring-2 focus:ring-[#2B7EC2]/30 outline-none"
            />
            <input
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                         focus:border-[#2F4191] focus:ring-2 focus:ring-[#2B7EC2]/30 outline-none"
            />
            <input
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                         focus:border-[#2F4191] focus:ring-2 focus:ring-[#2B7EC2]/30 outline-none"
            />
          </div>

          {/* COUNTRY */}
          <input
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                       focus:border-[#2F4191] focus:ring-2 focus:ring-[#2B7EC2]/30 outline-none"
          />

       

          {error && (
            <p className="text-sm text-red-500 text-center">{error}</p>
          )}

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading || submitted}
            className={`w-full py-3 rounded-md text-sm font-medium flex items-center justify-center gap-2 transition
              ${
                submitted
                  ? 'bg-[#2B7EC2] text-white'
                  : 'bg-[#2F4191] text-white hover:bg-[#2B7EC2]'
              }
              ${(loading || submitted) && 'opacity-80 cursor-not-allowed'}
            `}
          >
            {loading && (
              <>
                <span className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin" />
                Sending...
              </>
            )}

            {!loading && submitted && (
              <>
                <FaCheckCircle />
                Enquiry Sent Successfully
              </>
            )}

            {!loading && !submitted && (
              <>
                <FaPaperPlane />
                Send Enquiry
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
