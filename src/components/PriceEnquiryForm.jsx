'use client';

import { useEffect, useState } from 'react';
import { FaTimes, FaPaperPlane, FaCheckCircle } from 'react-icons/fa';

const INITIAL_STATE = {
    name: '',
    company: '',
    gstNumber: '',
    industry: '',
    designation: '',
    department: '',
    phone: '',
    email: '',
    country: '',
    state: '',
    city: '',
    message: '',
    product: '',
    category: '',
};

const REQUIRED_FIELDS = [
    'name',
    'company',
    'gstNumber',
    'industry',
    'designation',
    'department',
    'phone',
    'email',
    'country',
    'state',
    'city',
    'message',
];

export default function PriceEnquiryForm({
    isOpen,
    onClose,
    productData,
    onSuccess, // 🔥 REQUIRED to unlock price
}) {
    const [formData, setFormData] = useState(INITIAL_STATE);
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    /* Sync product data */
    useEffect(() => {
        if (isOpen && productData) {
            setFormData((prev) => ({
                ...prev,
                product: productData.model || '',
                category: productData.category || '',
            }));
        }
    }, [isOpen, productData]);

    /* Reset modal */
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

    const validateForm = () => {
        for (const field of REQUIRED_FIELDS) {
            if (!formData[field] || formData[field].trim() === '') {
                return `Please fill the ${field.replace(/([A-Z])/g, ' $1')}`;
            }
        }

        if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            return 'Please enter a valid email address';
        }

        if (!/^\d{10}$/.test(formData.phone)) {
            return 'Please enter a valid 10-digit phone number';
        }

        return '';
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

            if (!res.ok) throw new Error('Submission failed');

            setSubmitted(true);

            // 🔥 UNLOCK PRICE
            if (onSuccess) onSuccess();

            setTimeout(() => {
                handleClose();
            }, 1500);
        } catch (err) {
            console.error(err);
            setError('Failed to send enquiry. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[1000] bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl border border-gray-200 max-w-lg w-full max-h-[90vh] overflow-y-auto">

                {/* HEADER */}
                <div className="flex items-center justify-between p-5 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-[#2F4191]">
                        Price Enquiry
                    </h2>
                    <button
                        onClick={handleClose}
                        className="p-2 rounded-md hover:bg-gray-100"
                    >
                        <FaTimes className="text-gray-500" />
                    </button>
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit} className="p-5 space-y-4">

                    {/* NAME & COMPANY */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input name="name" required placeholder="Full Name *"
                            value={formData.name} onChange={handleChange}
                            className="w-full rounded-full border px-3 py-2 text-sm" />

                        <input name="company" required placeholder="Company *"
                            value={formData.company} onChange={handleChange}
                            className="w-full rounded-full border px-3 py-2 text-sm" />
                    </div>

                    {/* GST & INDUSTRY */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input name="gstNumber" required placeholder="GST Number *"
                            value={formData.gstNumber} onChange={handleChange}
                            className="w-full rounded-md border px-3 py-2 text-sm" />

                        <input name="industry" required placeholder="Industry *"
                            value={formData.industry} onChange={handleChange}
                            className="w-full rounded-md border px-3 py-2 text-sm" />
                    </div>

                    {/* DESIGNATION & DEPARTMENT */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input name="designation" required placeholder="Designation *"
                            value={formData.designation} onChange={handleChange}
                            className="w-full rounded-md border px-3 py-2 text-sm" />

                        <input name="department" required placeholder="Department *"
                            value={formData.department} onChange={handleChange}
                            className="w-full rounded-md border px-3 py-2 text-sm" />
                    </div>

                    {/* PHONE & EMAIL */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input name="phone" type="tel" required placeholder="Phone Number *"
                            value={formData.phone} onChange={handleChange}
                            className="w-full rounded-md border px-3 py-2 text-sm" />

                        <input name="email" type="email" required placeholder="Email *"
                            value={formData.email} onChange={handleChange}
                            className="w-full rounded-md border px-3 py-2 text-sm" />
                    </div>

                    {/* LOCATION */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input name="country" required placeholder="Country *"
                            value={formData.country} onChange={handleChange}
                            className="w-full rounded-md border px-3 py-2 text-sm" />

                        <input name="state" required placeholder="State *"
                            value={formData.state} onChange={handleChange}
                            className="w-full rounded-md border px-3 py-2 text-sm" />
                    </div>

                    <input name="city" required placeholder="City *"
                        value={formData.city} onChange={handleChange}
                        className="w-full rounded-md border px-3 py-2 text-sm" />

                    {/* MESSAGE */}
                    <textarea rows="5" name="message"
                        value={formData.message} onChange={handleChange}
                        placeholder="Message Here..."
                        className="w-full px-4 py-3 rounded-md border resize-none" />

                    {error && (
                        <p className="text-sm text-red-500 text-center">{error}</p>
                    )}

                    {/* SUBMIT */}
                    <button
                        type="submit"
                        disabled={loading || submitted}
                        className={`w-full py-3 rounded-md text-sm font-medium flex justify-center gap-2
                        ${submitted ? 'bg-green-600' : 'bg-[#2F4191] hover:bg-[#2B7EC2]'}
                        text-white`}
                    >
                        {loading && 'Sending...'}
                        {!loading && submitted && (
                            <>
                                <FaCheckCircle /> Enquiry Sent
                            </>
                        )}
                        {!loading && !submitted && (
                            <>
                                <FaPaperPlane /> Send Enquiry
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
