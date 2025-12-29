'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import EnquiryModal from '@/components/EnquiryModal';

export default function Model() {
    const router = useRouter();
    const { slug } = useParams();
    // slug = [category, subcategory, model]

    const [categorySlug, subSlug, modelSlug] = slug;

    const [subCategory, setSubCategory] = useState(null);
    const [product, setProduct] = useState(null);
    const [activeTab, setActiveTab] = useState('info');
    const [activeImg, setActiveImg] = useState(0);
    const [loading, setLoading] = useState(true);

    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`/api/products/${categorySlug}`);
                const data = await res.json();

                const sub = data.subcategories.find(s => s.slug === subSlug);
                const model = sub?.models.find(m => m.meta.slug === modelSlug);

                setSubCategory(sub || null);
                setProduct(model || null);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [categorySlug, subSlug, modelSlug]);

    if (loading) {
        return <p className="text-center py-20">Loading product…</p>;
    }

    if (!product || !subCategory) {
        return <p className="text-center py-20 text-red-500">Product not found</p>;
    }

    const images = [
        product.meta.thumbnail,
        product.meta.thumbnail,
        product.meta.thumbnail,
    ];

    return (
        <section className="max-w-7xl mx-auto px-6 py-10">
            {/* TOP SECTION */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                {/* LEFT THUMBNAILS */}
                <div className="flex lg:flex-col gap-3">
                    {images.map((img, i) => (
                        <button
                            key={i}
                            onClick={() => setActiveImg(i)}
                            className={`border rounded-md p-1 ${activeImg === i ? 'border-blue-600' : 'border-gray-300'
                                }`}
                        >
                            <Image
                                src={img}
                                alt="thumb"
                                width={80}
                                height={80}
                                className="object-contain"
                            />
                        </button>
                    ))}
                </div>

                {/* MAIN IMAGE */}
                <div className="flex items-center justify-center">
                    <Image
                        src={images[activeImg]}
                        alt={product.meta.title}
                        width={420}
                        height={420}
                        className="object-contain"
                    />
                </div>

                {/* RIGHT INFO */}
                <div>
                    <h1 className="text-2xl font-bold mb-4">
                        {product.meta.title}
                    </h1>

                    <p className="text-sm text-gray-600 mb-3">
                        Internal Volume
                    </p>

                    {/* MODEL SELECTOR */}
                    <div className="space-y-3">
                        {subCategory.models.map(m => (
                            <label
                                key={m.meta.slug}
                                className="flex items-center gap-2 text-sm cursor-pointer"
                            >
                                <input
                                    type="radio"
                                    checked={m.meta.slug === modelSlug}
                                    onChange={() =>
                                        router.push(
                                            `/products/${categorySlug}/${subSlug}/${m.meta.slug}`
                                        )
                                    }
                                />
                                {m.meta.title}
                            </label>
                        ))}
                    </div>
                    <div className='flex gap-5'>
                        <button className="mt-6 bg-orange-500 text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-orange-600">
                            Request a Quote
                        </button>

                        <button className="mt-6 bg-orange-500 text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-orange-600">
                            Enquiry
                        </button>
                    </div>
                </div>
            </div>

            {/* PRODUCT INFO */}
            <div className="mt-14">
                <h2 className="text-lg font-bold mb-3">PRODUCT INFO</h2>
                <p className="text-sm text-gray-700 leading-relaxed max-w-5xl">
                    {product.overview}
                </p>
            </div>

            {/* ================= TABS ================= */}
            <div className="mt-10 bg-white p-6 border border-gray-200 rounded-3xl shadow-xl">
                <div className=" flex gap-6 text-sm ">

                    {product.keyFeatures && (
                        <button
                            onClick={() => setActiveTab('features')}
                            className={`pb-2 ${activeTab === 'features'
                                    ? 'border-b-2 border-blue-600 font-medium '
                                    : 'text-gray-600 hover:bg-black/20'
                                }`}
                        >
                            Features
                        </button>
                    )}

                    {product.specifications && (
                        <button
                            onClick={() => setActiveTab('specs')}
                            className={`pb-2 ${activeTab === 'specs'
                                    ? 'border-b-2 border-blue-600 font-medium'
                                    : 'text-gray-600'
                                }`}
                        >
                            Specifications
                        </button>
                    )}

                    {product.applications && (
                        <button
                            onClick={() => setActiveTab('applications')}
                            className={`pb-2 ${activeTab === 'applications'
                                    ? 'border-b-2 border-blue-600 font-medium'
                                    : 'text-gray-600'
                                }`}
                        >
                            Applications
                        </button>
                    )}
                </div>

                {/* ================= TAB CONTENT ================= */}
                <div className="mt-6 text-sm">

                    {/* ✅ FEATURES */}
                    {activeTab === 'features' && product.keyFeatures && (
                        <ul className="list-disc list-inside space-y-2 max-w-5xl">
                            {product.keyFeatures.map((feature, index) => (
                                <li key={index}>{feature}</li>
                            ))}
                        </ul>
                    )}

                    {/* ✅ SPECIFICATIONS */}
                    {activeTab === 'specs' && product.specifications && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
                            {Object.entries(product.specifications).map(([key, value]) => (
                                <div
                                    key={key}
                                    className="flex justify-between border-b pb-2"
                                >
                                    <span className="font-medium capitalize">
                                        {key.replace(/([A-Z])/g, ' $1')}
                                    </span>
                                    <span>
                                        {typeof value === 'object'
                                            ? JSON.stringify(value)
                                            : value}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* ✅ APPLICATIONS */}
                    {activeTab === 'applications' && product.applications && (
                        <ul className="list-disc list-inside space-y-2 max-w-5xl">
                            {product.applications.map((app, index) => (
                                <li key={index}>{app}</li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
{/* Contact Modal */}
<EnquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

        </section>
    );
}
