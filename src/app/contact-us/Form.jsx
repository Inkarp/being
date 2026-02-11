'use client';
import { useState } from 'react';
import { FaPaperPlane, FaCheckCircle, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

export default function Form() {
  const [formData, setFormData] = useState({
    name: '', company: '', industry: '', designation: '', department: '',
    email: '', phone: '', enquiredProduct: '', typeOfCustomer: '',
    purchasePlan: '', country: '', state: '', city: '', message: ''
  });
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const nextStep = () => step < 3 && setStep(step + 1);
  const prevStep = () => step > 1 && setStep(step - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setSubmitted(true);
    setLoading(false);
  };

  const fieldsByStep = {
    1: ['name', 'company', 'industry', 'designation', 'department',],
    2: ['email', 'phone', 'enquiredProduct', 'purchasePlan', 'country'],
    3: ['state', 'city', 'message']
  };

  return (
    <section className="min-h-screen bg-black flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-start relative z-10">
        {/* Right Side - Hero Content (unchanged positioning) */}
        <div className="lg:order-2 text-center lg:text-left space-y-8">
          <div className="inline-block bg-white/10 backdrop-blur-xl rounded-3xl px-8 py-4 border border-white/20">
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200 leading-tight">
              Reach Us At
              {/* <span className="block text-2xl lg:text-3xl text-blue-300 font-light mt-4">We are here</span> */}
            </h1>
          </div>
          <p className="text-xl text-white max-w-lg mx-auto lg:mx-0 leading-relaxed">
            Whether you have a question about our products, need assistance with an order, or just want to say hello, our team is ready to answer all your questions.  Don't hesitate to reach out – we're here to help!
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <ContactCard icon={FaMapMarkerAlt} title="HQ Address" detail="Hyderabad, Telangana, India" />
            <ContactCard icon={FaPhone} title="Call Us" detail="+91 9876543210" />
            <ContactCard icon={FaEnvelope} title="Email Us" detail="hello@yourcompany.com" />
          </div>
        </div>

        {/* Left Side - Compact Form (ALL FIELDS LEFT ALIGNED) */}
        <div className="lg:order-1 max-w-md mx-auto lg:mx-0">
          <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 shadow-2xl">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Compact Stepper */}
                <div className="flex items-center gap-2 mb-6">
                  {[1, 2, 3].map(s => (
                    <div key={s} className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-all ${step >= s ? 'bg-gradient-to-r from-[#2F4191] to-[#2B7EC2] text-white shadow-lg' : 'bg-white/20 text-white/50'}`}>
                      {s}
                    </div>
                  ))}
                </div>

                {/* Step 1: First 6 fields */}
                {step === 1 && fieldsByStep[1].map(field => (
                  <CompactInput
                    key={field}
                    name={field}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
                    value={formData[field]}
                    onChange={handleChange}
                    type={field === 'email' ? 'email' : 'text'}
                    required={field !== 'department'}
                    compact
                  />
                ))}

                {/* Step 2: Next 4 fields */}
                {step === 2 && fieldsByStep[2].map(field => (
                  <CompactInput
                    key={field}
                    name={field}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
                    value={formData[field]}
                    onChange={handleChange}
                    type={field === 'phone' ? 'tel' : 'text'}
                    required
                    compact
                  />
                ))}

                {/* Step 3: Last 3 fields */}
                {step === 3 && (
                  <>
                    <CompactInput name="state" placeholder="State" value={formData.state} onChange={handleChange} required compact />
                    <CompactInput name="city" placeholder="City" value={formData.city} onChange={handleChange} required compact />
                    <CompactTextarea
                      name="message"
                      placeholder="Message (Optional)"
                      value={formData.message}
                      onChange={handleChange}
                      compact
                    />
                  </>
                )}

                {/* Compact Navigation Buttons */}
                <div className="flex gap-3 pt-4">
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="flex-1 py-3 px-6 rounded-xl bg-white/20 text-white font-bold border border-white/30 backdrop-blur-xl hover:bg-white/30 transition-all text-sm"
                    >
                      ← Back
                    </button>
                  )}
                  {step < 3 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all text-sm"
                    >
                      Next →
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 bg-gradient-to-r from-[#2F4191] to-[#2B7EC2] text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all text-sm flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {loading ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <FaPaperPlane className="text-xs" />
                      )}
                      Send
                    </button>
                  )}
                </div>
              </form>
            ) : (
              <div className="text-center space-y-6 p-8">
                <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto shadow-xl">
                  <FaCheckCircle className="text-3xl text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-white mb-2">Success!</h2>
                  <p className="text-slate-300 text-sm">We'll contact you within 24 hours.</p>
                </div>
                <button
                  onClick={() => {
                    setFormData({ name: '', company: '', industry: '', designation: '', department: '', email: '', phone: '', enquiredProduct: '', typeOfCustomer: '', purchasePlan: '', country: '', state: '', city: '', message: '' });
                    setStep(1);
                    setSubmitted(false);
                  }}
                  className="w-full bg-white text-[#2F4191] font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all text-sm"
                >
                  New Enquiry
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// Compact Input Component (SMALL HEIGHT)
function CompactInput({ name, placeholder, value, onChange, type = "text", required, compact }) {
  return (
    <div>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className="w-full px-4 py-2.5 rounded-xl bg-white/20 border border-white/30 text-white placeholder-slate-300 text-sm focus:ring-2 focus:ring-blue-500/50 focus:border-transparent backdrop-blur-xl transition-all duration-300 hover:shadow-md h-11"
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
}

// Compact Textarea Component
function CompactTextarea({ name, placeholder, value, onChange, compact }) {
  return (
    <div>
      <textarea
        name={name}
        rows={3}
        placeholder={placeholder}
        className="w-full px-4 py-2.5 rounded-xl bg-white/20 border border-white/30 text-white placeholder-slate-300 text-sm focus:ring-2 focus:ring-blue-500/50 focus:border-transparent backdrop-blur-xl transition-all duration-300 hover:shadow-md resize-vertical"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

const ContactCard = ({ icon: Icon, title, detail }) => (
  <div className="group bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 cursor-pointer">
    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform duration-300">
      <Icon className="text-white text-xl" />
    </div>
    <h3 className="text-lg font-bold text-white mb-1 group-hover:text-blue-200">{title}</h3>
    <p className="text-slate-300">{detail}</p>
  </div>
);
