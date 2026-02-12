'use client';
import { useState, useRef } from 'react';
import { FaPaperPlane, FaCheckCircle, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock, FaHeadset, FaUserCog } from 'react-icons/fa';

export default function ContactNew() {
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
                name: '', company: '', industry: '', designation: '', department: '',
                email: '', phone: '', enquiredProduct: '', typeOfCustomer: '',
                purchasePlan: '', country: '', state: '', city: '', message: ''
            });
        } catch (err) {
            setStatus('error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="min-h-screen bg-black/10 flex items-center justify-center py-5">
            <div className="w-full grid lg:grid-cols-6 gap-6 items-start relative z-10 max-w-7xl mx-auto px-4">
                {/* Left Side - Info Content (2/5) */}
                <div ref={leftRef} className="lg:col-span-2 w-full space-y-8 text-white flex flex-col items-center justify-center lg:items-start">
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

                {/* Middle Section - 3 Contact Cards in ONE ROW on LG */}
                <div className="lg:col-span-2 w-full space-y-4 hidden lg:block">
                    {/* Service Queries */}
                    <h2 className="text-4xl font-raleway font-black text-black bg-gradient-to-r from-[#2F4191] to-[#2B7EC2] bg-clip-text mb-4">
                        Reach Us
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-[#2F4191] to-[#2B7EC2] mx-auto lg:mx-0 rounded-full" />
                    <div className="group bg-[#2F4191] p-3 rounded-2xl transition-all duration-300 hover:scale-[1.02] shadow-lg">
                        <div className="flex items-start gap-5">
                            <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-r from-green-500 to-blue-500 shadow-lg group-hover:rotate-[360deg] transition-transform duration-500">
                                <FaHeadset className="w-7 h-7 text-white" />
                            </div>
                            <div className="flex flex-col gap-3 min-w-0 flex-1">
                                <h4 className="font-bold text-white text-lg">Service Queries</h4>
                                <div className="space-y-2 text-white text-xs">
                                    <p className="flex items-center gap-2">
                                        <FaPhoneAlt className="text-white/70" />
                                        +91 9030357676
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <FaEnvelope className="text-white/70" />
                                        <a href="mailto:service@techin.com" className="hover:underline truncate">service@techin.com</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Support */}
                    <div className="group bg-[#2F4191] p-3 rounded-2xl transition-all duration-300 hover:scale-[1.02] shadow-lg">
                        <div className="flex items-start gap-5">
                            <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 shadow-lg group-hover:rotate-[360deg] transition-transform duration-500">
                                <FaPhoneAlt className="w-7 h-7 text-white" />
                            </div>
                            <div className="flex flex-col gap-3 min-w-0 flex-1">
                                <h4 className="font-bold text-white text-lg">Support</h4>
                                <div className="space-y-2 text-white text-xs">
                                    <p className="flex items-center gap-2">
                                        <FaPhoneAlt className="text-white/70" />
                                        +91 9030357676
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <FaEnvelope className="text-white/70" />
                                        <a href="mailto:support@techin.com" className="hover:underline truncate">support@techin.com</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Account Queries */}
                    <div className="group bg-[#2F4191] p-3 rounded-2xl transition-all duration-300 hover:scale-[1.02] shadow-lg">
                        <div className="flex items-start gap-5">
                            <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg group-hover:rotate-[360deg] transition-transform duration-500">
                                <FaUserCog className="w-7 h-7 text-white" />
                            </div>
                            <div className="flex flex-col gap-3 min-w-0 flex-1">
                                <h4 className="font-bold text-white text-lg">Account Queries</h4>
                                <div className="space-y-2 text-white text-xs">
                                    <p className="flex items-center gap-2">
                                        <FaPhoneAlt className="text-white/70" />
                                        +91 9030357676
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <FaEnvelope className="text-white/70" />
                                        <a href="mailto:accounts@techin.com" className="hover:underline truncate">accounts@techin.com</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Contact Cards - Stack Vertically */}
                <div className="lg:hidden w-full space-y-4 col-span-full">
                    <div className="group bg-[#2F4191] p-6 rounded-2xl transition-all duration-300 hover:scale-[1.02] shadow-lg">
                        <div className="flex items-start gap-5">
                            <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-r from-green-500 to-blue-500 shadow-lg group-hover:rotate-[360deg] transition-transform duration-500">
                                <FaHeadset className="w-7 h-7 text-white" />
                            </div>
                            <div className="flex flex-col gap-3">
                                <h4 className="font-bold text-white text-xl">Service Queries</h4>
                                <div className="space-y-2 text-white text-sm">
                                    <p className="flex items-center gap-2">
                                        <FaPhoneAlt className="text-white/70" />
                                        +91 9030357676
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <FaEnvelope className="text-white/70" />
                                        <a href="mailto:service@techin.com" className="hover:underline">service@techin.com</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="group bg-[#2F4191] p-6 rounded-2xl transition-all duration-300 hover:scale-[1.02] shadow-lg">
                        <div className="flex items-start gap-5">
                            <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 shadow-lg group-hover:rotate-[360deg] transition-transform duration-500">
                                <FaPhoneAlt className="w-7 h-7 text-white" />
                            </div>
                            <div className="flex flex-col gap-3">
                                <h4 className="font-bold text-white text-xl">Support</h4>
                                <div className="space-y-2 text-white text-sm">
                                    <p className="flex items-center gap-2">
                                        <FaPhoneAlt className="text-white/70" />
                                        +91 9030357676
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <FaEnvelope className="text-white/70" />
                                        <a href="mailto:support@techin.com" className="hover:underline">support@techin.com</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="group bg-[#2F4191] p-6 rounded-2xl transition-all duration-300 hover:scale-[1.02] shadow-lg">
                        <div className="flex items-start gap-5">
                            <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg group-hover:rotate-[360deg] transition-transform duration-500">
                                <FaUserCog className="w-7 h-7 text-white" />
                            </div>
                            <div className="flex flex-col gap-3">
                                <h4 className="font-bold text-white text-xl">Account Queries</h4>
                                <div className="space-y-2 text-white text-sm">
                                    <p className="flex items-center gap-2">
                                        <FaPhoneAlt className="text-white/70" />
                                        +91 9030357676
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <FaEnvelope className="text-white/70" />
                                        <a href="mailto:accounts@techin.com" className="hover:underline">accounts@techin.com</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Form (2/5) */}
                <div ref={rightRef} className="lg:col-span-2 max-w-xl mx-auto lg:mx-0">
                    <div className="bg-white/50 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 shadow-2xl">
                        {!status ? (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <CompactInput name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
                                    <CompactInput name="company" placeholder="Company" value={form.company} onChange={handleChange} />
                                    <CompactInput name="industry" placeholder="Industry" value={form.industry} onChange={handleChange} required />
                                    <CompactInput name="designation" placeholder="Designation" value={form.designation} onChange={handleChange} required />
                                </div>
                                <CompactInput name="department" placeholder="Department" value={form.department} onChange={handleChange} />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <CompactInput name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
                                    <CompactInput name="phone" type="tel" placeholder="Phone" value={form.phone} onChange={handleChange} required />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <CompactInput name="enquiredProduct" placeholder="Enquired Product" value={form.enquiredProduct} onChange={handleChange} required />
                                    <CompactInput name="purchasePlan" placeholder="Purchase Plan" value={form.purchasePlan} onChange={handleChange} required />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                    <CompactInput name="country" placeholder="Country" value={form.country} onChange={handleChange} required />
                                    <CompactInput name="state" placeholder="State" value={form.state} onChange={handleChange} required />
                                    <CompactInput name="city" placeholder="City" value={form.city} onChange={handleChange} required />
                                </div>

                                <select name="typeOfCustomer" className="CompactInput w-full" value={form.typeOfCustomer} onChange={handleChange} required>
                                    <option value="">Type of Customer *</option>
                                    <option value="new">New Customer</option>
                                    <option value="existing">Existing Customer</option>
                                </select>

                                <CompactTextarea name="message" placeholder="Message (Optional)" value={form.message} onChange={handleChange} />

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full flex-1 group bg-gradient-to-r from-[#2F4191] to-[#2B7EC2] text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all text-sm flex items-center justify-center gap-2 disabled:opacity-50"
                                >
                                    {loading ? (
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            <FaPaperPlane className="text-sm group-hover:rotate-45 transition-transform duration-300" />
                                            Submit
                                        </>
                                    )}
                                </button>
                            </form>
                        ) : status === 'success' ? (
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
                                        setForm({
                                            name: '', company: '', industry: '', designation: '', department: '',
                                            email: '', phone: '', enquiredProduct: '', typeOfCustomer: '',
                                            purchasePlan: '', country: '', state: '', city: '', message: ''
                                        });
                                        setStatus(null);
                                    }}
                                    className="w-full bg-white text-[#2F4191] font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all text-sm"
                                >
                                    New Enquiry
                                </button>
                            </div>
                        ) : (
                            <div className="text-center space-y-6 p-8">
                                <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-rose-600 rounded-2xl flex items-center justify-center mx-auto shadow-xl">
                                    <FaCheckCircle className="text-3xl text-white rotate-180" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black text-white mb-2">Error!</h2>
                                    <p className="text-slate-300 text-sm">Please try again.</p>
                                </div>
                                <button
                                    onClick={() => setStatus(null)}
                                    className="w-full bg-white text-[#2F4191] font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all text-sm"
                                >
                                    Try Again
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

// Compact Input & Textarea components remain EXACTLY the same
function CompactInput({ name, placeholder, value, onChange, type = "text", required }) {
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

function CompactTextarea({ name, placeholder, value, onChange }) {
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
