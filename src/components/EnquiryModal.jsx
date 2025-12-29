'use client';

import { useState } from 'react';
import { FaTimes, FaPaperPlane } from 'react-icons/fa';

export default function EnquiryModal({ isOpen, onClose, productData }) {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    designation: '',
    phone: '',
    email: '',
    department: '',
    city: '',
    state: '',
    country: '',
    message: '',
    product: productData?.model || '',
    category: productData?.category || '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitted(true);
        setTimeout(() => {
          onClose();
          setSubmitted(false);
        }, 2000);
      }
    } catch (err) {
      console.error('Submit error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[1000] flex items-center justify-center p-4">
      <div className="bg-slate-900/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-700/50 max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-slate-700/50">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-100">Get Quote</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-800/50 rounded-xl transition backdrop-blur-sm"
            >
              <FaTimes size={20} className="text-slate-400 hover:text-slate-200" />
            </button>
          </div>

          {/* Product Context */}
          {productData && (
            <div className="mt-4 p-4 bg-gradient-to-r from-orange-500/10 to-blue-500/10 border border-orange-400/30 rounded-2xl">
              <p className="text-sm text-slate-300">
                For: <span className="font-semibold text-orange-300">{productData.model}</span>
              </p>
              <p className="text-xs text-slate-500 mt-1">
                {productData.category} → {productData.subcategory}
              </p>
            </div>
          )}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="name"
              placeholder="Full Name *"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-2xl focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none transition backdrop-blur-sm text-slate-100 placeholder-slate-400"
            />
            <input
              name="company"
              placeholder="Company"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-2xl focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none transition backdrop-blur-sm text-slate-100 placeholder-slate-400"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="designation"
              placeholder="Designation"
              value={formData.designation}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-2xl focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none transition backdrop-blur-sm text-slate-100 placeholder-slate-400"
            />
            <input
              name="phone"
              type="tel"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-2xl focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none transition backdrop-blur-sm text-slate-100 placeholder-slate-400"
            />
          </div>

          <input
            name="email"
            type="email"
            placeholder="Email *"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-2xl focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none transition backdrop-blur-sm text-slate-100 placeholder-slate-400"
          />

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <input
              name="department"
              placeholder="Department"
              value={formData.department}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-2xl focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none transition backdrop-blur-sm text-slate-100 placeholder-slate-400"
            />
            <input
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-2xl focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none transition backdrop-blur-sm text-slate-100 placeholder-slate-400"
            />
            <input
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-2xl focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none transition backdrop-blur-sm text-slate-100 placeholder-slate-400"
            />
          </div>

          <input
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-2xl focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none transition backdrop-blur-sm text-slate-100 placeholder-slate-400"
          />

          <textarea
            name="message"
            rows={4}
            placeholder="Message *"
            required
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-2xl focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none transition backdrop-blur-sm text-slate-100 placeholder-slate-400 resize-vertical"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 text-slate-900 font-semibold py-4 px-6 rounded-2xl hover:from-orange-600 hover:via-orange-700 hover:to-amber-600 transition-all duration-300 flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-xl border border-orange-400/30"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-slate-900/30 border-t-slate-900 rounded-full animate-spin" />
                Sending...
              </>
            ) : submitted ? (
              <>
                <FaPaperPlane />
                Sent Successfully!
              </>
            ) : (
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
