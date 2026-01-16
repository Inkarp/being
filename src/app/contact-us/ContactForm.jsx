'use client';
import { useState, useEffect, useRef } from 'react';
import { FaUser, FaEnvelope, FaClock, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';

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

  // Sync heights between left and right panels
  useEffect(() => {
    const syncHeights = () => {
      if (leftRef.current && rightRef.current) {
        const rightHeight = rightRef.current.scrollHeight;
        leftRef.current.style.height = `${rightHeight}px`;
      }
    };

    syncHeights();
    window.addEventListener('resize', syncHeights);
    return () => window.removeEventListener('resize', syncHeights);
  }, [form, status]);

  return (
    <section className="w-full py-5 ">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch ">
        {/* Left: Contact Info - Glassmorphism Effect */}
        <div 
          ref={leftRef}
          className="relative h-full min-h-[600px] group"
        >
          {/* Animated Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-blue-500/20 to-indigo-600/20 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl transform group-hover:scale-[1.02] transition-all duration-500" />
          
          {/* Content */}
          <div className="relative z-10 flex items-center justify-center h-full px-8 py-12">
            <div className="w-full max-w-md space-y-8 text-white">
              <div className="text-center mb-12">
                <h2 className="text-4xl lg:text-5xl font-black text-black bg-gradient-to-r from-white to-blue-100 bg-clip-text mb-4">
                  Let’s Connect!
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full" />
              </div>

              <div className="space-y-3">
                {[
                  { icon: FaClock, title: "Office Hours", info: "Mon–Fri: 10:00AM–09:00PM", color: "from-yellow-400 to-orange-500" },
                  { icon: FaPhoneAlt, title: "Call Anytime", info: "+(009) 1888 000 2222", color: "from-green-400 to-emerald-500" },
                  { icon: FaEnvelope, title: "Email Us", info: "info@techin.com", color: "from-blue-400 to-cyan-500" },
                  { icon: FaMapMarkerAlt, title: "Our Location", info: "12th Street, New York, USA", color: "from-purple-400 to-violet-500" },
                  { icon: FaClock, title: "Office Hours", info: "Mon–Fri: 10:00AM–09:00PM", color: "from-yellow-400 to-orange-500" },
                  { icon: FaPhoneAlt, title: "Call Anytime", info: "+(009) 1888 000 2222", color: "from-green-400 to-emerald-500" },
                  { icon: FaEnvelope, title: "Email Us", info: "info@techin.com", color: "from-blue-400 to-cyan-500" },
                  { icon: FaMapMarkerAlt, title: "Our Location", info: "12th Street, New York, USA", color: "from-purple-400 to-violet-500" }
                ].map(({ icon: Icon, title, info, color }, idx) => (
                  <div key={idx} className="group/contact flex items-start gap-4 p-4 hover:bg-white/10 rounded-2xl transition-all duration-300 hover:backdrop-blur-sm hover:scale-[1.02]">
                    <div className={`w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-r ${color} shadow-lg group-hover/contact:rotate-12 transition-transform duration-300 flex-shrink-0`}>
                      <Icon className="w-7 h-7 text-white shadow-md" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#2F4191] text-lg mb-1">{title}</h4>
                      <p className="text-black font-medium text-lg">{info}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Form */}
        <div 
          ref={rightRef}
          className="bg-gradient-to-b from-white to-slate-50 rounded-3xl shadow-2xl p-8 lg:p-12 border border-slate-200/50 backdrop-blur-sm h-full flex flex-col justify-center"
        >
          <div className="text-center">
            <h2 className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 bg-clip-text text-transparent mb-4">
              Get In Touch
            </h2>
            <p className="text-slate-600 font-medium text-lg max-w-md mx-auto">
              Fill out the form below and our team will get back to you within 24 hours
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* 2-Column Grid Rows */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField 
                name="name" 
                placeholder="Full Name *" 
                value={form.name} 
                onChange={handleChange}
                icon={FaUser}
                required
              />
              <InputField 
                name="company" 
                placeholder="Company Name *" 
                value={form.company} 
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField 
                name="industry" 
                placeholder="Industry *" 
                value={form.industry} 
                onChange={handleChange}
                required
              />
              <InputField 
                name="designation" 
                placeholder="Designation *" 
                value={form.designation} 
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <InputField 
                name="purchasePlan" 
                placeholder="Purchase Plan *" 
                value={form.purchasePlan} 
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            </div>

            <InputField 
              name="city" 
              placeholder="City *" 
              value={form.city} 
              onChange={handleChange}
              className="md:col-span-2"
              required
            />

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                Message (Optional)
              </label>
              <textarea
                rows={5}
                name="message"
                placeholder="Tell us more about your requirements..."
                className="w-full px-5 py-4 rounded-2xl border border-slate-200 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-vertical bg-slate-50/50 backdrop-blur-sm"
                value={form.message}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className="md:col-span-2 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-black py-5 px-8 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-[1.02] hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group/btn"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-3">
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Sending...
                </span>
              ) : (
                'Send Enquiry Now'
              )}
              <div className="absolute inset-0 bg-white/20 scale-0 group-hover/btn:scale-100 rounded-2xl transition-transform duration-300" />
            </button>

            {status === 'success' && (
              <div className="md:col-span-2 bg-green-50 border border-green-200 rounded-2xl p-6 text-center">
                <div className="text-green-600 font-semibold text-lg mb-2">✅ Enquiry Sent Successfully!</div>
                <p className="text-green-700">Our team will contact you within 24 hours.</p>
              </div>
            )}
            
            {status === 'error' && (
              <div className="md:col-span-2 bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
                <div className="text-red-600 font-semibold text-lg mb-2">❌ Failed to Send</div>
                <p className="text-red-700">Please try again or contact us directly.</p>
              </div>
            )}
          </form>
        </div>
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
        className={`w-full pl-12 pr-5 py-4 rounded-2xl border border-slate-200 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-slate-50/50 backdrop-blur-sm hover:shadow-md min-h-[56px] ${
          required ? 'required' : ''
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
