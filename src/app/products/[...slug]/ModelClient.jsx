'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import EnquiryModal from '../../../components/EnquiryModal';
import PopupModal from '../../../components/PopupModal';
import { FaArrowRight } from 'react-icons/fa';
import { MdOutlineSettingsApplications } from 'react-icons/md';


export default function Model() {
    const router = useRouter();
    const { slug } = useParams();

    // slug = [category, subcategory, model]
    const slugArray = Array.isArray(slug) ? slug : [];
    const [categorySlug, subSlug, modelSlug] = slugArray;

    const [subCategory, setSubCategory] = useState(null);
    const [product, setProduct] = useState(null);
    const [activeTab, setActiveTab] = useState('features');
    const [activeImg, setActiveImg] = useState(0);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [priceUnlocked, setPriceUnlocked] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`/api/products/${categorySlug}`);
                const data = await res.json();

                const sub = data.subcategories.find(s => s.slug === subSlug);
                const model = sub?.models.find(m => m.meta.slug === modelSlug);

                setSubCategory(sub || null);
                setProduct(model || null);
            } catch (error) {
                console.error(error);
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
        return (
            <p className="text-center py-20 text-red-500">
                Product not found
            </p>
        );
    }

    const images = [
        product.meta.thumbnail,
        product.meta.thumbnail,
        product.meta.thumbnail,
    ];

    return (
        <section className="w-full mx-auto px-6 py-10 ">

            {/* ================= SEO META ================= */}
            <Head>
                <title>
                    {product?.meta?.title
                        ? `${product.meta.title} | Inkarp Instruments`
                        : 'Product | Inkarp Instruments'}
                </title>

                {product?.meta?.description && (
                    <meta
                        name="description"
                        content={product.meta.description}
                    />
                )}
            </Head>

            {/* ================= TOP 3-COLUMN LAYOUT ================= */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr_1fr] gap-10 items-start">

                {/* ================= COLUMN 1: IMAGE ================= */}
                <div className="flex flex-col justify-center">
                    <div className="border border-gray-200 rounded-2xl p-6 bg-white">
                        <Image
                            src={product.meta.thumbnail}
                            alt={product.meta.title}
                            width={420}
                            height={420}
                            className="object-contain mx-auto"
                            priority
                        />
                    </div>
                     {/* CTA BUTTONS */}
                    <div className="flex flex-wrap gap-4 pt-2">
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-[#2F4191] text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[#2B7EC2]"
                        >
                            Enquiry
                        </button>

                        {/* <button
                            onClick={() => {
                                if (!priceUnlocked) setIsModalOpen(true);
                            }}
                            className="bg-[#2F4191] text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[#2B7EC2]"
                        >
                            {priceUnlocked && product.meta.price
                                ? `₹ ${product.meta.price}`
                                : 'Request Price'}
                        </button> */}
                       
                    </div>
                </div>

                {/* ================= COLUMN 2: PRODUCT OVERVIEW ================= */}
                <div className="space-y-6">

                    <h1 className="text-2xl font-semibold text-gray-900">
                        {product.meta.title}
                    </h1>

                    {product.overview && (
                        <div>
                            <h2 className="text-lg font-semibold mb-2">
                                Product Overview
                            </h2>
                            <p className="text-sm text-gray-700 leading-relaxed">
                                {product.overview}
                            </p>
                        </div>
                    )}

                   
                </div>

                {/* ================= COLUMN 3: MODELS ================= */}
                <div className="border border-gray-200 rounded-2xl p-4 bg-white">

                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Available Models
                    </h3>

                    <div className="space-y-2">
                        {subCategory.models.map((m) => {
                            const isActive = m.meta.slug === modelSlug;

                            return (
                                <button
                                    key={m.meta.slug}
                                    onClick={() =>
                                        router.push(
                                            `/products/${categorySlug}/${subSlug}/${m.meta.slug}`
                                        )
                                    }
                                    className={`
              w-full flex items-center justify-between rounded-xl p-3 transition-all duration-300
              ${isActive
                                            ? 'bg-[#2F4191] text-white shadow-md'
                                            : 'bg-gray-50 hover:bg-gray-100 text-gray-800'
                                        }
            `}
                                >
                                    <span className="text-sm font-medium">
                                        {m.meta.title}
                                    </span>

                                    <FaArrowRight
                                        className={`text-sm ${isActive ? 'text-white' : 'text-[#2F4191]'
                                            }`}
                                    />
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>



            {/* ================= TAB PILLS ================= */}
            <div className="mt-12 border border-gray-200 rounded-xl">

                {/* TAB BUTTONS */}
                <div className="px-6 pt-6 flex justify-center items-center">
                    <div className="bg-gray-100 rounded-full p-1 flex gap-1">

                        {product.keyFeatures && (
                            <button
                                onClick={() => setActiveTab('features')}
                                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300
            ${activeTab === 'features'
                                        ? 'bg-white text-gray-900 shadow-md'
                                        : 'text-gray-600 hover:text-gray-900'
                                    }
          `}
                            >
                                Features
                            </button>
                        )}

                        {product.specifications && (
                            <button
                                onClick={() => setActiveTab('specs')}
                                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300
            ${activeTab === 'specs'
                                        ? 'bg-white text-gray-900 shadow-md'
                                        : 'text-gray-600 hover:text-gray-900'
                                    }
          `}
                            >
                                Specifications
                            </button>
                        )}

                        {product.applications && (
                            <button
                                onClick={() => setActiveTab('applications')}
                                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300
            ${activeTab === 'applications'
                                        ? 'bg-white text-gray-900 shadow-md'
                                        : 'text-gray-600 hover:text-gray-900'
                                    }
          `}
                            >
                                Applications
                            </button>
                        )}
                     
                    </div>
                </div>

                {/* TAB CONTENT */}
                <div className="p-6 text-sm text-gray-700">

                    {/* FEATURES – Card Grid */}
                    {activeTab === 'features' && product.keyFeatures && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {product.keyFeatures.map((feature, index) => (
                                <div
                                    key={index}
                                    className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-lg transition flex gap-5"
                                >
                                    <h4 className="text-blue-500 text-xl">
                                        <MdOutlineSettingsApplications />
                                    </h4>
                                    
                                    <p className="text-sm text-gray-700 leading-relaxed">
                                        {feature}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* SPECIFICATIONS – Clean Spec Grid */}
                    {activeTab === 'specs' && product.specifications && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
                            {Object.entries(product.specifications).map(([key, value]) => (
                                <div
                                    key={key}
                                    className="flex justify-between bg-gray-50 rounded-lg p-4"
                                >
                                    <span className="text-sm font-medium text-gray-900">
                                        {key.replace(/([A-Z])/g, ' $1')}
                                    </span>
                                    <span className="text-sm text-gray-600 text-right">
                                        {value}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* APPLICATIONS – Use Case Cards */}
                    {activeTab === 'applications' && product.applications && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {product.applications.map((app, index) => (
                                <div
                                    key={index}
                                    className="border border-gray-200 rounded-xl p-5 hover:border-blue-600 transition"
                                >
                                    {/* <h4 className="font-semibold text-gray-900 mb-2">
                                        Use Case {index + 1}
                                    </h4> */}
                                    <p className="text-sm text-gray-700 leading-relaxed">
                                        {app}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}

                </div>
            </div>


            {/* ================= ENQUIRY MODAL ================= */}
            <EnquiryModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                productData={{
                    model: product.meta.title,
                    category: categorySlug,
                    subcategory: subSlug,
                }}
                onSuccess={() => setPriceUnlocked(true)} // 🔥 unlock price
            />

            {/* {subCategory?.models?.length > 1 && (
                <PopupModal
                    models={subCategory.models}
                    categorySlug={categorySlug}
                    subSlug={subSlug}
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSuccess={() => {
                        setPriceUnlocked(true);
                        setIsModalOpen(false);
                    }}
                />
            )} */}
        </section>
    );
}
