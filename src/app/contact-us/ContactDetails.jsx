'use client';
import { useState } from 'react';
import { FaUser, FaEnvelope } from 'react-icons/fa';
import { FaClock, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';

export default function ContactDetails() {
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
            body: JSON.stringify({
              name: form.name,
              company: form.company,
              industry: form.industry,
              designation: form.designation,
              department: form.department,
              email: form.email,
              phone: form.phone,
              enquiredProduct: form.enquiredProduct,
              typeOfCustomer: form.typeOfCustomer,
              purchasePlan: form.purchasePlan,
              country: form.country,
              state: form.state,
              city: form.city,
              message: form.message,
            }),
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
        <section className="relative w-full h-[550px] overflow-hidden">
            {/* Fullscreen background video */}
            <video
                src="/bg-video.mov"
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Dark overlay for readability (optional) */}
            <div className="absolute inset-0 bg-black/40" />
            {/* Foreground content */}
            <section className="w-[95%] mx-auto py-3">
                <div className="flex flex-col justify-center items-center md:flex-row overflow-hidden space-x-3 p-5">
                    {/* Left: Form */}
                    <div className="w-full h-auto md:w-1/2 bg-white p-5 space-y-3 rounded-2xl">
                        <div>
                            <h2 className="text-3xl font-extrabold mt-2">Contact Information Here</h2>
                        </div>

                        <form className="space-y-4 bg-red-500" onSubmit={handleSubmit}>
                            {/* Row 1: Name, Company */}
                            <div className="flex gap-4 bg-white">
                                <div className="flex-1 relative">
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Name"
                                        className="w-full px-4 py-2 rounded-md shadow-sm pr-10"
                                        value={form.name}
                                        onChange={handleChange}
                                        required
                                    />
                                    <FaUser className="absolute right-3 top-2.5 text-gray-400" />
                                </div>
                                <div className="flex-1 relative">
                                    <input
                                        type="text"
                                        name="company"
                                        placeholder="Company Name"
                                        className="w-full px-4 py-2 rounded-md shadow-sm pr-10"
                                        value={form.company}
                                        onChange={handleChange}
                                        required
                                    />
                                    <FaUser className="absolute right-3 top-2.5 text-gray-400" />
                                </div>
                            </div>

                            {/* Row 2: Industry, Designation */}
                            <div className="flex gap-4">
                                <div className="flex-1 relative">
                                    <input
                                        type="text"
                                        name="industry"
                                        placeholder="Industry"
                                        className="w-full px-4 py-2 rounded-md shadow-sm pr-10"
                                        value={form.industry}
                                        onChange={handleChange}
                                        required
                                    />
                                    <FaUser className="absolute right-3 top-2.5 text-gray-400" />
                                </div>
                                <div className="flex-1 relative">
                                    <input
                                        type="text"
                                        name="designation"
                                        placeholder="Designation"
                                        className="w-full px-4 py-2 rounded-md shadow-sm pr-10"
                                        value={form.designation}
                                        onChange={handleChange}
                                        required
                                    />
                                    <FaUser className="absolute right-3 top-2.5 text-gray-400" />
                                </div>
                            </div>

                            {/* Row 3: Department, Email */}
                            <div className="flex gap-4">
                                <div className="flex-1 relative">
                                    <input
                                        type="text"
                                        name="department"
                                        placeholder="Department"
                                        className="w-full px-4 py-2 rounded-md shadow-sm pr-10"
                                        value={form.department}
                                        onChange={handleChange}
                                        required
                                    />
                                    <FaUser className="absolute right-3 top-2.5 text-gray-400" />
                                </div>
                                <div className="flex-1 relative">
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email Address"
                                        className="w-full px-4 py-2 rounded-md shadow-sm pr-10"
                                        value={form.email}
                                        onChange={handleChange}
                                        required
                                    />
                                    <FaEnvelope className="absolute right-3 top-2.5 text-gray-400" />
                                </div>
                            </div>

                            {/* Row 4: Phone, Enquired Product */}
                            <div className="flex gap-4">
                                <div className="flex-1 relative">
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="Contact Number"
                                        className="w-full px-4 py-2 rounded-md shadow-sm pr-10"
                                        value={form.phone}
                                        onChange={handleChange}
                                        required
                                    />
                                    <FaPhoneAlt className="absolute right-3 top-2.5 text-gray-400" />
                                </div>
                                <div className="flex-1 relative">
                                    <input
                                        type="text"
                                        name="enquiredProduct"
                                        placeholder="Enquired Product"
                                        className="w-full px-4 py-2 rounded-md shadow-sm pr-10"
                                        value={form.enquiredProduct}
                                        onChange={handleChange}
                                        required
                                    />
                                    <FaUser className="absolute right-3 top-2.5 text-gray-400" />
                                </div>
                            </div>

                            {/* Row 5: Type Of Customer, Purchase Plan */}
                            <div className="flex gap-4">
                                <div className="flex-1 relative">
                                    <select
                                        name="typeOfCustomer"
                                        className="w-full px-4 py-2 rounded-md shadow-sm pr-10 bg-white"
                                        value={form.typeOfCustomer}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="" disabled>
                                            Type Of Customer
                                        </option>
                                        <option value="existing">Existing</option>
                                        <option value="new">New</option>
                                    </select>
                                </div>
                                <div className="flex-1 relative">
                                    <input
                                        type="text"
                                        name="purchasePlan"
                                        placeholder="Purchase Plan"
                                        className="w-full px-4 py-2 rounded-md shadow-sm pr-10"
                                        value={form.purchasePlan}
                                        onChange={handleChange}
                                        required
                                    />
                                    <FaUser className="absolute right-3 top-2.5 text-gray-400" />
                                </div>
                            </div>

                            {/* Row 6: Country, State */}
                            <div className="flex gap-4">
                                <div className="flex-1 relative">
                                    <input
                                        type="text"
                                        name="country"
                                        placeholder="Country"
                                        className="w-full px-4 py-2 rounded-md shadow-sm pr-10"
                                        value={form.country}
                                        onChange={handleChange}
                                        required
                                    />
                                    <FaMapMarkerAlt className="absolute right-3 top-2.5 text-gray-400" />
                                </div>
                                <div className="flex-1 relative">
                                    <input
                                        type="text"
                                        name="state"
                                        placeholder="State"
                                        className="w-full px-4 py-2 rounded-md shadow-sm pr-10"
                                        value={form.state}
                                        onChange={handleChange}
                                        required
                                    />
                                    <FaMapMarkerAlt className="absolute right-3 top-2.5 text-gray-400" />
                                </div>
                            </div>

                            {/* Row 7: City */}
                            <div className="flex gap-4">
                                <div className="flex-1 relative">
                                    <input
                                        type="text"
                                        name="city"
                                        placeholder="City"
                                        className="w-full px-4 py-2 rounded-md shadow-sm pr-10"
                                        value={form.city}
                                        onChange={handleChange}
                                        required
                                    />
                                    <FaMapMarkerAlt className="absolute right-3 top-2.5 text-gray-400" />
                                </div>
                            </div>

                            {/* Message (optional) */}
                            <textarea
                                rows={5}
                                name="message"
                                placeholder="Message Here..."
                                className="w-full px-4 py-3 rounded-md shadow-sm resize-none"
                                value={form.message}
                                onChange={handleChange}
                            />

                            {/* Submit Button + Status */}
                            <button
                                type="submit"
                                className="bg-blue-600 text-white font-bold py-2 px-6 rounded-md shadow hover:bg-blue-700 transition disabled:opacity-60"
                                disabled={loading}
                            >
                                {loading ? 'Sending...' : 'Send Message'}
                            </button>

                            {status === 'success' && (
                                <p className="text-sm text-green-600 mt-2">Enquiry sent successfully!</p>
                            )}
                            {status === 'error' && (
                                <p className="text-sm text-red-600 mt-2">
                                    Failed to send enquiry. Please try again.
                                </p>
                            )}
                        </form>
                    </div>

                    {/* Right: Video + Info */}
                    <div className="relative w-full md:w-1/2 h-full md:h-auto">
                        <video
                            src="/bg-video.mov"
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="w-full h-full object-cover rounded-2xl"
                        />

                        <div className="absolute inset-0 flex items-center justify-center px-4 ">
                            <div className="w-full max-w-md px-4 py-5 shadow-2xl rounded-3xl bg-black/10 text-black ">
                                <h2 className="text-3xl font-bold mb-8">Let’s Get In Touch!</h2>

                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="bg-black p-3 rounded-lg">
                                            <FaClock className="text-white text-xl" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-black">Office Time</h4>
                                            <p className="text-sm text-white">Mon–Fri: 10:00Am–09:00Pm</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="bg-black p-3 rounded-lg">
                                            <FaPhoneAlt className="text-white text-xl" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-black">Call Us Any Time</h4>
                                            <p className="text-sm text-blue-100">+(009) 1888 000 2222</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="bg-black p-3 rounded-lg">
                                            <FaEnvelope className="text-white text-xl" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-black">Email Address</h4>
                                            <p className="text-sm text-blue-100">info@techin.com</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="bg-black p-3 rounded-lg">
                                            <FaMapMarkerAlt className="text-white text-xl" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-black">Office Address</h4>
                                            <p className="text-sm text-blue-100">12th Street, New York, USA</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </section>
    );
}
