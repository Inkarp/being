'use client';

import { useEffect, useState } from 'react';
import { FaTimes, FaPaperPlane, FaCheckCircle } from 'react-icons/fa';

const GST_REGEX = /^[0-3][0-9][A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi"
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
  officialEmail: '',
  country: 'India',
  state: '',
  city: '',
  message: '',
  product: '',
  price: '',
};

export default function PriceEnquiryForm({ isOpen, onClose, productData }) {
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen && productData) {
      setFormData(prev => ({
        ...prev,
        product: productData.model,
        price: productData.price,
      }));
    }
  }, [isOpen, productData]);

  const handleChange = (e) => {
    let { name, value } = e.target;

    // Block URLs
    if (/https?:\/\/|www\./i.test(value)) return;

    // Name validation
    if (name === 'name') {
      value = value.replace(/[^a-zA-Z\s]/g, '');
      value = value.toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
    }

    // Company validation
    if (name === 'company') {
      value = value.replace(/[^a-zA-Z\s]/g, '');
    }

    // GST uppercase
    if (name === 'gstNumber') {
      value = value.toUpperCase().slice(0,15);
    }

    // Industry / Designation / Department / City
    if (['industry','designation','department','city'].includes(name)) {
      value = value.replace(/[^a-zA-Z\s]/g, '');
    }

    // Phone
    if (name === 'phone') {
      value = value.replace(/\D/g,'').slice(0,10);
    }

    // Email
    if (name === 'email' || name === 'officialEmail') {
      value = value.replace(/\s/g,'');
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!GST_REGEX.test(formData.gstNumber)) return "Invalid GST Number";
    if (!/^\d{10}$/.test(formData.phone)) return "Invalid Phone Number";
    if (!EMAIL_REGEX.test(formData.email)) return "Invalid Personal Email";
    if (!EMAIL_REGEX.test(formData.officialEmail)) return "Invalid Official Email";
    return "";
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

      if (!res.ok) throw new Error();

      setSubmitted(true);
      setTimeout(onClose,1500);

    } catch {
      setError("Submission failed");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in zoom-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[92vh] overflow-y-auto border border-gray-100">
        
        {/* HEADER */}
        <div className="flex justify-between items-center px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-[#2F4191] to-[#2B7EC2] bg-clip-text text-transparent">
              Price Enquiry
            </h2>
            <p className="text-sm text-gray-500 mt-1">Get a personalized quote for your requirsements</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-2xl hover:bg-gray-200 transition-all duration-200 hover:scale-105 group"
          >
            <FaTimes className="text-xl text-gray-500 group-hover:text-gray-700 transition-colors" />
          </button>
        </div>

        {/* PRODUCT INFO */}
        {productData && (
          <div className="px-8 pb-4 border-b border-gray-100">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#2F4191] to-[#2B7EC2] rounded-2xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-4L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-600 mb-1">Selected Product</p>
                  <p className="text-xl font-bold text-[#2F4191] truncate">{productData.model}</p>
                  {productData.price && (
                    <p className="text-lg font-semibold text-green-600 mt-1">
                      Starting at ₹{productData.price}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />

            <FormInput
              label="Company Name"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Your company/organization name"
              required
            />
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput
              label="GST Number"
              name="gstNumber"
              value={formData.gstNumber}
              onChange={handleChange}
              placeholder="15-digit GSTIN (e.g., 27AAPFU0939F1Z5)"
              required
            />

            <FormInput
              label="Industry"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              placeholder="e.g., Manufacturing, Healthcare, IT Services"
              required
            />
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput
              label="Designation"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              placeholder="e.g., Manager, Director, Engineer"
              required
            />

            <FormInput
              label="Department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              placeholder="e.g., Procurement, Engineering, Operations"
              required
            />
          </div>

          {/* Row 4 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PhoneInput
              value={formData.phone}
              onChange={handleChange}
              label="Phone Number"
            />

            <FormInput
              label="Personal Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="yourname@email.com"
              required
            />
          </div>

          {/* Row 5 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput
              label="Official Email"
              name="officialEmail"
              type="email"
              value={formData.officialEmail}
              onChange={handleChange}
              placeholder="name@company.com"
              required
            />

            <FormInput
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="e.g., Hyderabad, Mumbai, Bangalore"
              required
            />
          </div>

          {/* Row 6 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <StateSelect
              value={formData.state}
              onChange={handleChange}
              label="State"
            />

            <div className='flex'>
          
              {/* <label className="form-label">Country</label> */}
                <FormInput
                value="India"
                readOnly
                className="form-input bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200 cursor-not-allowed"
              />
            </div>
          </div>

          {/* Message */}
          <div className='flex flex-col'>
            <label className="form-label">Requirements / Message</label>
            <textarea
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              className="form-input rounded-2xl border border-gray-200 resize-vertical focus:ring-4 focus:ring-blue-100 transition-all duration-200 p-2 text-lg placeholder:text-gray-400"
              placeholder="Tell us about your specific requirements, quantity needed, delivery timeline, or any other details..."
            />
            <p className="text-xs text-gray-500 mt-2">
              This helps us provide you with the most accurate quote
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-2xl">
              <p className="text-red-600 text-sm font-medium">{error}</p>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading || submitted}
            className={`w-full py-4 px-8 rounded-2xl text-lg font-semibold flex items-center justify-center gap-3 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5 group ${
              submitted
                ? "bg-green-500 text-white"
                : loading
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-gradient-to-r from-[#2F4191] to-[#2B7EC2] text-white hover:from-[#2B7EC2] hover:to-[#244E8A]"
            }`}
          >
            {submitted ? (
              <>
                <FaCheckCircle className="animate-pulse" />
                Enquiry Sent Successfully!
              </>
            ) : loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <FaPaperPlane className="group-hover:translate-x-1 transition-transform" />
                Send Enquiry
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

function FormInput({ label, name, value, onChange, type = "text", placeholder, required }) {
  return (
    <div>
      <label className="form-label">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="form-input h-14 px-4 text-lg border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all duration-200 placeholder:text-gray-400"
      />
    </div>
  );
}

function PhoneInput({ value, onChange, label }) {
  return (
    <div>
      <label className="form-label">
        {label} <span className="text-red-500">*</span>
      </label>
      <div className="flex bg-white border-2 border-gray-200 rounded-2xl focus-within:ring-4 focus-within:ring-blue-100 focus-within:border-blue-400 transition-all duration-200 overflow-hidden">
        <span className="px-4 py-3.5 bg-gradient-to-r from-gray-50 to-gray-100 border-r border-gray-200 text-lg font-medium text-gray-700 flex items-center">
          +91
        </span>
        <input
          name="phone"
          value={value}
          onChange={onChange}
          required
          placeholder="XXXXXXXXXX"
          maxLength={10}
          className="form-input flex-1 px-4 py-3.5 text-lg rounded-r-2xl border-0 focus:ring-0 placeholder:text-gray-400"
        />
      </div>
    </div>
  );
}

function StateSelect({ value, onChange, label }) {
  return (
    <div>
      <label className="form-label">
        {label} <span className="text-red-500">*</span>
      </label>
      <select
        name="state"
        value={value}
        onChange={onChange}
        required
        className="form-input h-14 px-4 text-lg border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all duration-200 bg-white appearance-none cursor-pointer"
      >
        <option value="">Select your state</option>
        {INDIAN_STATES.map((state) => (
          <option key={state} value={state}>{state}</option>
        ))}
      </select>
    </div>
  );
}
