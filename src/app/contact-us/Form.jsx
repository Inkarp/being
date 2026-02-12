'use client';
import { useState } from 'react';
import { FaPaperPlane, FaCheckCircle, FaMapMarkerAlt, FaPhone, FaEnvelope, FaPhoneAlt, FaHeadset, FaUserCog, FaArrowRight, FaArrowLeft, FaClock } from 'react-icons/fa';

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
    <section className="min-h-screen bg-black/10 flex flex-col items-center justify-center px-10 py-5 space-y-3 relative z-10 rounded-3xl">
      <div className="inline-flex items-center">
        <span className="px-5 py-2.5 bg-gradient-to-br from-[#2F4191]/50 to-[#2B7EC2]/50 text-xs font-bold uppercase tracking-widest border-2 border-gray-200 rounded-full shadow-sm">
          Reach Us
        </span>
      </div>

      <p className="text-gray-600">
        Feel free to reach out to us with any questions, inquiries, or feedback. We're here to assist you and provide the best possible support.
      </p>
      <div className="w-full  grid lg:grid-cols-3 gap-6 items-start relative z-10">
        {/* Right Side - Hero Content (unchanged positioning) */}

        <div className="lg:col-span-1 w-full space-y-8 text-white flex flex-col items-center justify-center lg:items-start">
          <div className="text-center lg:text-left">
            <h2 className="text-4xl font-raleway font-black text-black bg-gradient-to-r from-[#2F4191] to-[#2B7EC2] bg-clip-text mb-4">
              Let's Connect!
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#2F4191] to-[#2B7EC2] mx-auto lg:mx-0 rounded-full" />
            <div className="space-y-3 w-full">
              {[
                { icon: FaClock, title: "Office Hours", info: "Mon–Fri: 09:30AM–05:30PM", color: "from-[#2F4191] to-[#2B7EC2]" },
                { icon: FaPhoneAlt, title: "Call Anytime", info: "+(009) 1888 000 2222", color: "from-[#2F4191] to-[#2B7EC2]" },
                { icon: FaEnvelope, title: "Email Us", info: "info@techin.com", color: "from-[#2F4191] to-[#2B7EC2]" },
                { icon: FaMapMarkerAlt, title: "Our Location", info: "12th Street, New York, USA", color: "from-[#2F4191] to-[#2B7EC2]" },
              ].map(({ icon: Icon, title, info, color }, idx) => (
                <div key={idx} className="group/contact flex items-start gap-4 p-4 hover:bg-white/10 rounded-2xl transition-all duration-300 hover:backdrop-blur-sm hover:scale-[1.02] w-full">
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
        <div className="grid lg:grid-cols-1 grid-cols-1 gap-6 w-full max-w-6xl">
          {/* SERVICE QUERIES */}
          <div className="group bg-[#2F4191] p-6 lg:p-8 rounded-2xl transition-all duration-300 hover:scale-[1.02] shadow-lg">
            <div className="flex  items-start gap-5">
              <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-r from-green-500 to-blue-500 shadow-lg group-hover:rotate-[360deg] transition-transform duration-500">
                <FaHeadset className="w-7 h-7 text-white" />
              </div>
              <div className="flex flex-col gap-3">
                <h4 className="font-bold text-white text-xl">
                  Service Queries
                </h4>

                <div className="space-y-2 text-white text-sm">
                  <p className="flex items-center gap-2">
                    <FaPhoneAlt className="text-white/70" />
                    +91 9030357676
                  </p>
                  <p className="flex items-center gap-2">
                    <FaEnvelope className="text-white/70" />
                    service@techin.com
                  </p>
                </div>
              </div>

            </div>
          </div>


          {/* SUPPORT */}
          <div className="group bg-[#2F4191] p-6 lg:p-8 rounded-2xl transition-all duration-300 hover:scale-[1.02] shadow-lg">
            <div className="flex items-start gap-5">

              <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 shadow-lg group-hover:rotate-[360deg] transition-transform duration-500">
                <FaPhoneAlt className="w-7 h-7 text-white" />
              </div>

              <div className="flex flex-col gap-3">
                <h4 className="font-bold text-white text-xl">
                  Support
                </h4>

                <div className="space-y-2 text-white text-sm">
                  <p className="flex items-center gap-2">
                    <FaPhoneAlt className="text-white/70" />
                    +91 9030357676
                  </p>
                  <p className="flex items-center gap-2">
                    <FaEnvelope className="text-white/70" />
                    support@techin.com
                  </p>
                </div>
              </div>

            </div>
          </div>


          {/* ACCOUNT */}
          <div className="group bg-[#2F4191] p-6 lg:p-8 rounded-2xl transition-all duration-300 hover:scale-[1.02] shadow-lg">
            <div className="flex items-start gap-5">

              <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg group-hover:rotate-[360deg] transition-transform duration-500">
                <FaUserCog className="w-7 h-7 text-white" />
              </div>

              <div className="flex flex-col gap-3">
                <h4 className="font-bold text-white text-xl">
                  Account Queries
                </h4>

                <div className="space-y-2 text-white text-sm">
                  <p className="flex items-center gap-2">
                    <FaPhoneAlt className="text-white/70" />
                    +91 9030357676
                  </p>
                  <p className="flex items-center gap-2">
                    <FaEnvelope className="text-white/70" />
                    accounts@techin.com
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>



        {/* Left Side - Compact Form (ALL FIELDS LEFT ALIGNED) */}
        <div className="lg:order-1 max-w-md mx-auto lg:mx-0">
          <div className="bg-white/50 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 shadow-2xl">
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
                      className="flex-1 flex items-center justify-center gap-5 py-3 px-6 rounded-xl bg-gradient-to-r from-[#2F4191] to-[#2B7EC2] text-white font-bold border border-white/30 backdrop-blur-xl hover:bg-[#2F3F8D]/80 transition-all text-sm"
                    >
                      <div className="relative w-[30px] h-[30px] text-white">
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


                        <FaArrowLeft
                          size={12}
                          className="absolute top-1/2 left-1/2 text-black transform -translate-x-1/2 -translate-y-1/2 "
                        />
                      </div>
                      <span className="text-white font-medium text-[16px]">Back</span>
                    </button>
                  )}
                  {step < 3 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="flex flex-1 justify-center items-center gap-5 bg-gradient-to-r from-[#2F4191] to-[#2B7EC2] text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all text-sm"
                    >
                      <span className="text-white font-medium text-[16px]">Next</span>
                      <div className="relative w-[30px] h-[30px] text-white">
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
                          className="absolute top-1/2 left-1/2 text-black transform -translate-x-1/2 -translate-y-1/2 "
                        />
                      </div>

                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 group bg-gradient-to-r from-[#2F4191] to-[#2B7EC2] text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all text-sm flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {loading ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <FaPaperPlane className="text-sm group-hover:rotate-45 transition-transform duration-300" />
                      )}
                      Submit
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
                  <p className="text-slate-300 text-sm">We will contact you within 24 hours.</p>
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
        className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/30 text-white placeholder-white text-sm focus:ring-2 focus:ring-blue-500/50 focus:border-transparent backdrop-blur-xl transition-all duration-300 hover:shadow-md h-11"
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
