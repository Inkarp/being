'use client';
import { useState, useEffect, useRef } from 'react';
import { FaUser, FaEnvelope, FaClock, FaPhoneAlt, FaMapMarkerAlt, FaArrowRight } from 'react-icons/fa';

export default function ContactFormSection() {
  const [form, setForm] = useState({
    name: '',
    company: '',
    industry: '',
    designation: '',
    department: '',
    email: '',
    phone: '',
    enquiredProduct: '',
    typeOfCustomer: '',
    purchasePlan: '',
    country: '',
    state: '',
    city: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error('Failed');

      setStatus('success');
      setForm({
        name: '',
        company: '',
        industry: '',
        designation: '',
        department: '',
        email: '',
        phone: '',
        enquiredProduct: '',
        typeOfCustomer: '',
        purchasePlan: '',
        country: '',
        state: '',
        city: '',
        message: '',
      });
    } catch (err) {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full px-10">
      <div
        ref={rightRef}
        className="p-8 lg:p-12 border border-slate-200/50 backdrop-blur-sm h-full flex flex-col justify-center"
      >
        <div className="text-center">
          <h2 className="text-2xl lg:text-3xl font-black bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 bg-clip-text text-transparent mb-4">
            Get In Touch
          </h2>
          <p className="text-slate-600 font-medium text-lg  mx-auto">
            Fill out the form below and our team will get back to you within 24 hours
          </p>
        </div>

        <form className="space-y-3" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InputField
              name="name"
              placeholder="Full Name *"
              value={form.name}
              onChange={handleChange}
              required
            />
            <InputField
              name="company"
              placeholder="Company Name *"
              value={form.company}
              onChange={handleChange}
              required
            />
            <InputField
              name="industry"
              placeholder="Industry *"
              value={form.industry}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InputField
              name="designation"
              placeholder="Designation *"
              value={form.designation}
              onChange={handleChange}
              required
            />
            <InputField
              name="department"
              placeholder="Department *"
              value={form.department}
              onChange={handleChange}
              required
            />
            <InputField
              name="email"
              type="email"
              placeholder="Email Address *"
              value={form.email}
              onChange={handleChange}
              icon={FaEnvelope}
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InputField
              name="phone"
              type="tel"
              placeholder="Phone Number *"
              value={form.phone}
              onChange={handleChange}
              required
            />
            <InputField
              name="enquiredProduct"
              placeholder="Product Interested *"
              value={form.enquiredProduct}
              onChange={handleChange}
              required
            />
            <SelectField
              name="typeOfCustomer"
              value={form.typeOfCustomer}
              onChange={handleChange}
              options={[
                { value: "existing", label: "Existing Customer" },
                { value: "new", label: "New Customer" }
              ]}
              placeholder="Customer Type *"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <InputField
              name="purchasePlan"
              placeholder="Purchase Plan *"
              value={form.purchasePlan}
              onChange={handleChange}
              required
            />
            <InputField
              name="country"
              placeholder="Country *"
              value={form.country}
              onChange={handleChange}
              required
            />
            <InputField
              name="state"
              placeholder="State *"
              value={form.state}
              onChange={handleChange}
              required
            />
            <InputField
              name="city"
              placeholder="City *"
              value={form.city}
              onChange={handleChange}
              // className="md:col-span-2"
              required
            />
          </div>
          <div className="md:col-span-1">
            <label className="block text-sm font-semibold text-slate-700 mb-3">
              Message (Optional)
            </label>
            <textarea
              rows={3}
              name="message"
              placeholder="Tell us more about your requirements..."
              className="w-full px-5 py-2 rounded-2xl border border-slate-200 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-vertical bg-slate-50/50 backdrop-blur-sm"
              value={form.message}
              onChange={handleChange}
            />
          </div>

          <div className='flex items-center justify-center gap-5'>

            <button
              type="submit"
              className="md:col-span-2 w-fit bg-gradient-to-r from-[#2F4191] to-[#2B7EC2] text-white font-black py-5 px-8 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-[1.02] hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group/btn"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-3">
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Sending...
                </span>
              ) : (
                <div className='flex gap-5 items-center justify-center'>
                   <span className="text-white font-medium text-sm">
                                       Send Enquiry 
                                    </span>
                  <div className="relative w-[30px] h-[30px] text-white ">
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 30 30"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      className='spin-slow'
                    >
                      <path d="M14.2257 0.947522C14.6258 0.457905 15.3742 0.457905 15.7743 0.947522L16.8781 2.29817C17.181 2.66879 17.704 2.77283 18.1256 2.54633L19.6623 1.72088C20.2193 1.42165 20.9107 1.70806 21.093 2.31352L21.5959 3.98376C21.7339 4.44207 22.1773 4.73834 22.6535 4.69044L24.3891 4.51587C25.0182 4.45258 25.5474 4.98179 25.4841 5.61093L25.3096 7.34647C25.2617 7.8227 25.5579 8.2661 26.0162 8.40409L27.6865 8.90697C28.2919 9.08926 28.5783 9.7807 28.2791 10.3377L27.4537 11.8744C27.2272 12.296 27.3312 12.819 27.7018 13.1219L29.0525 14.2257C29.5421 14.6258 29.5421 15.3742 29.0525 15.7743L27.7018 16.8781C27.3312 17.181 27.2272 17.704 27.4537 18.1256L28.2791 19.6623C28.5783 20.2193 28.2919 20.9107 27.6865 21.093L26.0162 21.5959C25.5579 21.7339 25.2617 22.1773 25.3096 22.6535L25.4841 24.3891C25.5474 25.0182 25.0182 25.5474 24.3891 25.4841L22.6535 25.3096C22.1773 25.2617 21.7339 25.5579 21.5959 26.0162L21.093 27.6865C20.9107 28.2919 20.2193 28.5783 19.6623 28.2791L18.1256 27.4537C17.704 27.2272 17.181 27.3312 16.8781 27.7018L15.7743 29.0525C15.3742 29.5421 14.6258 29.5421 14.2257 29.0525L13.1219 27.7018C12.819 27.3312 12.296 27.2272 11.8744 27.4537L10.3377 28.2791C9.7807 28.5783 9.08926 28.2919 8.90697 27.6865L8.40409 26.0162C8.2661 25.5579 7.8227 25.2617 7.34647 25.3096L5.61093 25.4841C4.98179 25.5474 4.45258 25.0182 4.51587 24.3891L4.69044 22.6535C4.73834 22.1773 4.44207 21.7339 3.98376 21.5959L2.31352 21.093C1.70806 20.9107 1.42165 20.2193 1.72088 19.6623L2.54633 18.1256C2.77283 17.704 2.66879 17.181 2.29817 16.8781L0.947522 15.7743C0.457905 15.3742 0.457905 14.6258 0.947522 14.2257L2.29817 13.1219C2.66879 12.819 2.77283 12.296 2.54633 11.8744L1.72088 10.3377C1.42165 9.7807 1.70806 9.08926 2.31352 8.90697L3.98376 8.40409C4.44207 8.2661 4.73834 7.8227 4.69044 7.34647L4.51587 5.61093C4.45258 4.98179 4.98179 4.45258 5.61093 4.51587L7.34647 4.69044C7.8227 4.73834 8.2661 4.44207 8.40409 3.98376L8.90697 2.31352C9.08926 1.70806 9.7807 1.42165 10.3377 1.72088L11.8744 2.54633C12.296 2.77283 12.819 2.66879 13.1219 2.29817L14.2257 0.947522Z" />
                    </svg>
                    <FaArrowRight
                      size={12}
                      className="absolute top-1/2 left-1/2 text-black transform -translate-x-1/2 -translate-y-1/2"
                    />
                  </div>
                </div>
              )}
              <div className="absolute inset-0 bg-white/20 scale-0 group-hover/btn:scale-100 rounded-2xl transition-transform duration-300" />
            </button>


            {status === 'success' && (
              <div className="md:col-span-5 bg-green-50 border border-green-200 rounded-2xl p-6 text-center">
                <div className="text-green-600 font-semibold text-lg mb-2">✅ Enquiry Sent Successfully!</div>
                <p className="text-green-700">Our team will contact you within 24 hours.</p>
              </div>
            )}
          </div>

          {status === 'error' && (
            <div className="md:col-span-2 bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
              <div className="text-red-600 font-semibold text-lg mb-2">❌ Failed to Send</div>
              <p className="text-red-700">Please try again or contact us directly.</p>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}

// Reusable Input Component
function InputField({ name, placeholder, value, onChange, type = "text", icon: Icon, className = "", required, ...props }) {
  return (
    <div className={`relative group ${className}`}>
      {Icon && (
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors w-5 h-5" />
      )}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className={`w-full pl-12 pr-5 py-4 rounded-2xl border border-slate-200 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-slate-50/50 backdrop-blur-sm hover:shadow-md min-h-[56px] ${required ? 'required' : ''
          }`}
        value={value}
        onChange={onChange}
        {...props}
      />
    </div>
  );
}

// Reusable Select Component
function SelectField({ name, value, onChange, options, placeholder, required, className = "" }) {
  return (
    <div className={`relative group ${className}`}>
      <select
        name={name}
        className="w-full pl-12 pr-5 py-4 rounded-2xl border border-slate-200 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-slate-50/50 backdrop-blur-sm hover:shadow-md appearance-none min-h-[56px] cursor-pointer"
        value={value}
        onChange={onChange}
        required={required}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map(({ value: optValue, label }) => (
          <option key={optValue} value={optValue}>{label}</option>
        ))}
      </select>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
        <svg className="w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}
