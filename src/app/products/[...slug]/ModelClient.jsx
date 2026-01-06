'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import EnquiryModal from '../../../components/EnquiryModal';
import { FaArrowRight } from 'react-icons/fa';
import { MdOutlineSettingsApplications } from 'react-icons/md';
import PriceEnquiryForm from '../../../components/PriceEnquiryForm';
import PricePopup from '../../../components/PricePopUp';


export default function Model() {
    const router = useRouter();
    const { slug } = useParams();

    const slugArray = Array.isArray(slug) ? slug : [];
    const [categorySlug, subSlug, modelSlug] = slugArray;

    const [subCategory, setSubCategory] = useState(null);
    const [product, setProduct] = useState(null);
    const [activeTab, setActiveTab] = useState('features');
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [priceUnlocked, setPriceUnlocked] = useState(false);

    const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
    const [isPriceOpen, setIsPriceOpen] = useState(false);
    const [showPricePopup, setShowPricePopup] = useState(false);

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
                    {/* IMAGE WRAPPER */}
                    <div className="relative border border-gray-200 rounded-2xl p-6 bg-white">

                        {/* GEM BADGE */}
                        {product.gem && (
                            <Image
                                src="/Gem.png"   // <-- your gem image path
                                alt="Featured Product"
                                width={60}
                                height={60}
                                className="absolute top-3 right-3 z-10"
                                priority
                            />
                        )}

                        {/* PRODUCT IMAGE */}
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

                        {/* ENQUIRY BUTTON */}
                        <button
                            onClick={() => setIsEnquiryOpen(true)}
                            className="bg-[#2F4191] text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[#2B7EC2]"
                        >
                            Enquiry
                        </button>

                        {/* PRICE BUTTON */}
                        {product.meta.price && (
                            <button
                                onClick={() => {
                                    if (!priceUnlocked) setIsPriceOpen(true);
                                }}
                                className="bg-[#2F4191] text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[#2B7EC2]"
                            >
                                {priceUnlocked ? `₹ ${product.meta.price}` : 'Request Price'}
                            </button>
                        )}

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
                                    className={`w-full flex items-center justify-between rounded-xl p-3 transition-all duration-300 ${isActive
                                        ? 'bg-[#2F4191] text-white shadow-md'
                                        : 'bg-gray-50 hover:bg-gray-100 text-gray-800'
                                        }
            `}
                                >
                                    <span className="text-sm font-medium">
                                        {m.meta.title}
                                    </span>

                                    <span className="relative flex h-[30px] w-[30px] items-center justify-center text-[#2F4191]">
                                        <svg
                                            width="30"
                                            height="30"
                                            viewBox="0 0 30 30"
                                            fill="currentColor"
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="absolute inset-0 spin-slow"
                                        >
                                            <path d="M14.2257 0.947522C14.6258 0.457905 15.3742 0.457905 15.7743 0.947522L16.8781 2.29817C17.181 2.66879 17.704 2.77283 18.1256 2.54633L19.6623 1.72088C20.2193 1.42165 20.9107 1.70806 21.093 2.31352L21.5959 3.98376C21.7339 4.44207 22.1773 4.73834 22.6535 4.69044L24.3891 4.51587C25.0182 4.45258 25.5474 4.98179 25.4841 5.61093L25.3096 7.34647C25.2617 7.8227 25.5579 8.2661 26.0162 8.40409L27.6865 8.90697C28.2919 9.08926 28.5783 9.7807 28.2791 10.3377L27.4537 11.8744C27.2272 12.296 27.3312 12.819 27.7018 13.1219L29.0525 14.2257C29.5421 14.6258 29.5421 15.3742 29.0525 15.7743L27.7018 16.8781C27.3312 17.181 27.2272 17.704 27.4537 18.1256L28.2791 19.6623C28.5783 20.2193 28.2919 20.9107 27.6865 21.093L26.0162 21.5959C25.5579 21.7339 25.2617 22.1773 25.3096 22.6535L25.4841 24.3891C25.5474 25.0182 25.0182 25.5474 24.3891 25.4841L22.6535 25.3096C22.1773 25.2617 21.7339 25.5579 21.5959 26.0162L21.093 27.6865C20.9107 28.2919 20.2193 28.5783 19.6623 28.2791L18.1256 27.4537C17.704 27.2272 17.181 27.3312 16.8781 27.7018L15.7743 29.0525C15.3742 29.5421 14.6258 29.5421 14.2257 29.0525L13.1219 27.7018C12.819 27.3312 12.296 27.2272 11.8744 27.4537L10.3377 28.2791C9.7807 28.5783 9.08926 28.2919 8.90697 27.6865L8.40409 26.0162C8.2661 25.5579 7.8227 25.2617 7.34647 25.3096L5.61093 25.4841C4.98179 25.5474 4.45258 25.0182 4.51587 24.3891L4.69044 22.6535C4.73834 22.1773 4.44207 21.7339 3.98376 21.5959L2.31352 21.093C1.70806 20.9107 1.42165 20.2193 1.72088 19.6623L2.54633 18.1256C2.77283 17.704 2.66879 17.181 2.29817 16.8781L0.947522 15.7743C0.457905 15.3742 0.457905 14.6258 0.947522 14.2257L2.29817 13.1219C2.66879 12.819 2.77283 12.296 2.54633 11.8744L1.72088 10.3377C1.42165 9.7807 1.70806 9.08926 2.31352 8.90697L3.98376 8.40409C4.44207 8.2661 4.73834 7.8227 4.69044 7.34647L4.51587 5.61093C4.45258 4.98179 4.98179 4.45258 5.61093 4.51587L7.34647 4.69044C7.8227 4.73834 8.2661 4.44207 8.40409 3.98376L8.90697 2.31352C9.08926 1.70806 9.7807 1.42165 10.3377 1.72088L11.8744 2.54633C12.296 2.77283 12.819 2.66879 13.1219 2.29817L14.2257 0.947522Z" />
                                        </svg>

                                        <FaArrowRight
                                            size={12}
                                            className="relative text-white"
                                        />
                                    </span>
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

            <EnquiryModal
                isOpen={isEnquiryOpen}
                onClose={() => setIsEnquiryOpen(false)}
                productData={{
                    model: product.meta.title,
                    category: categorySlug,
                    subcategory: subSlug,
                }}
            />

            <PriceEnquiryForm
                isOpen={isPriceOpen}
                onClose={() => setIsPriceOpen(false)}
                productData={{
                    model: product.meta.title,
                    category: categorySlug,
                    subcategory: subSlug,
                }}
                onSuccess={() => {
                    setPriceUnlocked(true);      // show price on button
                    setIsPriceOpen(false);       // close form
                    setShowPricePopup(true);     // open success popup
                }}
            />


            <PricePopup
                isOpen={showPricePopup}
                onClose={() => setShowPricePopup(false)}
                product={{
                    title: product.meta.title,
                    thumbnail: product.meta.thumbnail,
                }}
                price={product.meta.price}
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
