'use client';

import { useEffect, useState } from 'react';
import { FaTimes, FaPaperPlane } from 'react-icons/fa';

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
  message: '',
  product: '',
  category: '',
};

export default function EnquiryModal({ isOpen, onClose, productData }) {
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  /* ✅ Sync product data every time modal opens or product changes */
  useEffect(() => {
    if (isOpen && productData) {
      setFormData((prev) => ({
        ...prev,
        product: productData.model || '',
        category: productData.category || '',
      }));
    }
  }, [isOpen, productData]);

  /* ✅ Reset modal completely on close */
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
    <div className="fixed inset-0 z-[1000] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-700/50 max-w-lg w-full max-h-[90vh] overflow-y-auto">

        {/* HEADER */}
        <div className="p-6 border-b border-slate-700/50">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-slate-100">Get Quote</h2>
            <button
              onClick={handleClose}
              className="p-2 rounded-xl hover:bg-slate-800/50 transition"
            >
              <FaTimes className="text-slate-400 hover:text-slate-200" />
            </button>
          </div>

          {productData && (
            <div className="mt-4 p-4 bg-gradient-to-r from-orange-500/10 to-blue-500/10 border border-orange-400/30 rounded-2xl">
              <p className="text-sm text-slate-300">
                For:{' '}
                <span className="font-semibold text-orange-300">
                  {productData.model}
                </span>
              </p>
              <p className="text-xs text-slate-500 mt-1">
                {productData.category} → {productData.subcategory}
              </p>
            </div>
          )}
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="name" required placeholder="Full Name *" value={formData.name} onChange={handleChange} className="input" />
            <input name="company" placeholder="Company" value={formData.company} onChange={handleChange} className="input" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="designation" placeholder="Designation" value={formData.designation} onChange={handleChange} className="input" />
            <input name="phone" type="tel" placeholder="Phone Number" value={formData.phone} onChange={handleChange} className="input" />
          </div>

          <input name="email" type="email" required placeholder="Email *" value={formData.email} onChange={handleChange} className="input" />

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <input name="department" placeholder="Department" value={formData.department} onChange={handleChange} className="input" />
            <input name="city" placeholder="City" value={formData.city} onChange={handleChange} className="input" />
            <input name="state" placeholder="State" value={formData.state} onChange={handleChange} className="input" />
          </div>

          <input name="country" placeholder="Country" value={formData.country} onChange={handleChange} className="input" />

          <textarea
            name="message"
            rows={4}
            required
            placeholder="Message *"
            value={formData.message}
            onChange={handleChange}
            className="input resize-none"
          />

          {error && (
            <p className="text-sm text-red-400 text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 text-slate-900 font-semibold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl transition disabled:opacity-50"
          >
            {loading ? (
              <>
                <span className="w-5 h-5 border-2 border-slate-900/30 border-t-slate-900 rounded-full animate-spin" />
                Sending...
              </>
            ) : submitted ? (
              <>
                <FaPaperPlane /> Sent Successfully!
              </>
            ) : (
              <>
                <FaPaperPlane /> Send Enquiry
              </>
            )}
          </button>
        </form>
      </div>

      {/* Tailwind shortcut */}
      <style jsx>{`
        .input {
          width: 100%;
          padding: 0.75rem 1rem;
          background: rgba(30, 41, 59, 0.5);
          border: 1px solid rgba(100, 116, 139, 0.5);
          border-radius: 1rem;
          color: #f8fafc;
          outline: none;
        }
        .input::placeholder {
          color: #94a3b8;
        }
        .input:focus {
          border-color: #fb923c;
          box-shadow: 0 0 0 2px rgba(251, 146, 60, 0.4);
        }
      `}</style>
    </div>
  );
}
