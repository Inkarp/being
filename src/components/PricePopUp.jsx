'use client';

import Image from 'next/image';
import { FaCheckCircle, FaTimes } from 'react-icons/fa';

export default function PricePopup({
    isOpen,
    onClose,
    product,
    price,
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[1100] bg-black/60 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full relative overflow-hidden">

                {/* CLOSE */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                >
                    <FaTimes />
                </button>

                {/* HEADER */}
                <div className="bg-gradient-to-r from-[#2F4191] to-[#2B7EC2] p-6 text-center text-white">
                    <FaCheckCircle className="mx-auto text-4xl mb-2" />
                    <h2 className="text-lg font-semibold">
                        Price Unlocked Successfully
                    </h2>
                    <p className="text-sm opacity-90">
                        Thank you for your enquiry
                    </p>
                </div>

                {/* BODY */}
                <div className="p-6 space-y-4 text-center">

                    {/* PRODUCT IMAGE */}
                    {product?.thumbnail && (
                        <div className="border rounded-xl p-4 bg-gray-50">
                            <Image
                                src={product.thumbnail}
                                alt={product.title}
                                width={220}
                                height={220}
                                className="object-contain mx-auto"
                            />
                        </div>
                    )}

                    {/* PRODUCT NAME */}
                    <h3 className="font-semibold text-gray-900">
                        {product?.title}
                    </h3>

                    {/* PRICE */}
                    <div className="text-3xl font-bold text-[#2F4191] tracking-wide">
                        ₹ {price}
                    </div>

                    <p className="text-xs text-gray-500">
                        *Price is indicative. Taxes & freight extra as applicable.
                    </p>

                    {/* CTA */}
                    <button
                        onClick={onClose}
                        className="mt-4 w-full bg-[#2F4191] text-white py-2.5 rounded-full text-sm font-medium hover:bg-[#2B7EC2]"
                    >
                        Continue Browsing
                    </button>
                </div>
            </div>
        </div>
    );
}
