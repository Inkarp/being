'use client';

import { useEffect, useState } from 'react';
import { FaTimes, FaPaperPlane, FaCheckCircle } from 'react-icons/fa';

const INITIAL_STATE = {
  name: '',
  company: '',
  industry: '',
  designation: '',
  department: '',
  phone: '',
  email: '',
  officialEmail: '',
  country: 'India',
  state: '',
  city: '',
  message: '',
  product: '',
  category: '',

  // Tracking
  ipAddress: '',
  referrer: '',
  source: '',
  keyword: '',
  deviceType: '',
  timestamp: '',
  landingUrl: '',
  pagePath: '',
  fullUrl: '',
  utm_source: '',
  utm_medium: '',
  utm_campaign: '',
  utm_term: '',
  utm_content: '',
  gclid: '',
  fbclid: '',

  // Honeypot
  website: '',
};

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi"
];

export default function EnquiryModal({ isOpen, onClose, productData }) {

  const [formData, setFormData] = useState(INITIAL_STATE);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  /* ---------------- PRODUCT AUTO PICK ---------------- */
  useEffect(() => {
    if (isOpen && productData) {
      setFormData(prev => ({
        ...prev,
        product: productData.model || '',
        category: productData.category || '',
      }));
    }
  }, [isOpen, productData]);

  /* ---------------- TRACKING COLLECTION ---------------- */
  useEffect(() => {
    if (!isOpen) return;

    const collectTracking = async () => {

      let ipAddress = 'Unknown';
      try {
        const ipRes = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipRes.json();
        ipAddress = ipData.ip;
      } catch { }

      const referrer = document.referrer || 'Direct';
      const params = new URLSearchParams(window.location.search);

      const utm_source = params.get('utm_source') || '';
      const utm_medium = params.get('utm_medium') || '';
      const utm_campaign = params.get('utm_campaign') || '';
      const utm_term = params.get('utm_term') || '';
      const utm_content = params.get('utm_content') || '';
      const gclid = params.get('gclid') || '';
      const fbclid = params.get('fbclid') || '';
      const keyword = params.get('keyword') || '';

      let source = utm_source || 'Direct';

      const ua = navigator.userAgent.toLowerCase();
      let deviceType = /mobile|android|iphone/.test(ua) ? 'Mobile' : 'Desktop';

      setFormData(prev => ({
        ...prev,
        ipAddress,
        referrer,
        source,
        keyword,
        deviceType,
        timestamp: new Date().toISOString(),
        landingUrl: window.location.href,
        pagePath: window.location.pathname,
        fullUrl: window.location.href,
        utm_source,
        utm_medium,
        utm_campaign,
        utm_term,
        utm_content,
        gclid,
        fbclid,
      }));
    };

    collectTracking();
  }, [isOpen]);

  /* ---------------- VALIDATED HANDLE CHANGE ---------------- */

  const handleChange = (e) => {
    let { name, value } = e.target;

    // Block URLs globally
    if (/https?:\/\/|www\./i.test(value)) return;

    // Name formatting
    if (name === 'name') {
      value = value.replace(/[^a-zA-Z\s.]/g, '');
      value = value.toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
    }

    // Text-only fields
    if (['company', 'industry', 'designation', 'department', 'city'].includes(name)) {
      value = value.replace(/[^a-zA-Z\s]/g, '');
    }

    // Phone restriction
    if (name === 'phone') {
      value = value.replace(/\D/g, '').slice(0, 10);
    }

    // Email no spaces
    if (name === 'email' || name === 'officialEmail') {
      value = value.replace(/\s/g, '');
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  /* ---------------- SUBMIT ---------------- */

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.phone.length !== 10) {
      setError('Phone must be 10 digits');
      setLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email) || !emailRegex.test(formData.officialEmail)) {
      setError('Invalid email format');
      setLoading(false);
      return;
    }

    if (formData.website) {
      setError('Spam detected');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed');

      setSubmitted(true);
      setTimeout(() => {
        handleClose();
      }, 2000);

    } catch {
      setError('Submission failed');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData(INITIAL_STATE);
    setSubmitted(false);
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] bg-black/50  flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6">

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl text-center font-semibold text-[#2F4191]">Product Enquiry</h2>
          <button onClick={handleClose}><FaTimes /></button>
        </div>

        {productData && (
          <div className="mb-4 p-3 bg-blue-50 rounded">
            <p className="text-sm">
              Product: <strong>{productData.model}</strong>
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-2 grid md:grid-cols-2 gap-2  grid-cols-1">

          {/* Honeypot */}
          <input type="text" name="website" style={{ display: 'none' }} onChange={handleChange} />

          <Input name="name" placeholder="Full Name *" value={formData.name} onChange={handleChange} required />
          <Input name="company" placeholder="Company *" value={formData.company} onChange={handleChange} required />
          <Input name="industry" placeholder="Industry *" value={formData.industry} onChange={handleChange} required />
          <Input name="designation" placeholder="Designation *" value={formData.designation} onChange={handleChange} required />
          <Input name="department" placeholder="Department *" value={formData.department} onChange={handleChange} required />

          <div className="flex">
            <span className="px-3 py-2 bg-gray-200 rounded-l-md text-sm">+91</span>
            <input
              name="phone"
              placeholder="Phone *"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 focus:border-[#2F4191] px-3 py-2 rounded-r-full"
              required
            />
          </div>

          <Input name="email" type="email" placeholder="Personal Email *" value={formData.email} onChange={handleChange} required />
          <Input name="officialEmail" type="email" placeholder="Official Email *" value={formData.officialEmail} onChange={handleChange} required />
          <Input name="city" placeholder="City *" value={formData.city} onChange={handleChange} required />

          <select name="state" value={formData.state} onChange={handleChange} required className="w-full border border-gray-300 px-3 py-2 rounded">
            <option value="">Select State *</option>
            {INDIAN_STATES.map(s => <option key={s}>{s}</option>)}
          </select>

          <div className="flex flex-col gap-5">
            <input value="India" readOnly className="w-full border border-gray-300 px-3 py-2 rounded bg-gray-100" />
            <textarea
              name="message"
              rows="2"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              className="w-full border border-gray-300 focus:border-[#2F4191] px-3 py-2 rounded"
            />

          </div>
          {error && <p className="text-red-500 text-sm border border-red-500 rounded px-2 py-1 ">{error}</p>}
          <button
            type="submit"
            disabled={loading || submitted}
            className={`w-full py-3 rounded-md text-sm font-medium flex items-center justify-center gap-2 transition
              ${submitted
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

function Input({ name, placeholder, value, onChange, type = "text", required }) {
  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full border border-gray-300 focus:border-[#2F4191] px-3 py-2 rounded-full"
    />
  );
}