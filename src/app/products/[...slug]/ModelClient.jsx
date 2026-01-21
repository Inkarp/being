'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';

import EnquiryModal from '../../../components/EnquiryModal';
import {
    FaArrowRight,
    FaArrowUp,
    FaFileDownload,
    FaShare
} from 'react-icons/fa';
import { MdOutlineSettingsApplications, MdZoomOutMap } from 'react-icons/md';
import PriceEnquiryForm from '../../../components/PriceEnquiryForm';
import PricePopup from '../../../components/PricePopUp';
import PopupModal from '../../../components/PopupModal';
import ExclusivePartner from '../../../components/ExclusivePatnership';
import ServiceRenewalForm from '../../../components/ServiceRenewalForm';
import { FaChevronDown } from 'react-icons/fa';
import { FcCollaboration } from 'react-icons/fc';
import RelatedModels from '../../../components/RelatedModels';

// ✅ ADD CONTEXT IMPORT
import { useProductContext } from '../../../app/context/ProductContext';
import ServiceForm from '../../../components/ServiceForm';
import ProductTabs from './ProductsTab';
import ProductTabContent from './ProductTabContent';
import ProductActionSection from './ProductActionSection';


export default function Model() {
    /* ---------------- SHARE BUTTON ---------------- */
    const handleShare = async () => {
        const url = window.location.href;

        try {
            if (navigator.share) {
                await navigator.share({
                    title: document.title,
                    url,
                });
            } else {
                await navigator.clipboard.writeText(url);
                alert('Page link copied to clipboard!');
            }
        } catch (error) {
            console.error('Share failed:', error);
        }
    };

    const router = useRouter();
    const { slug } = useParams();

    const slugArray = Array.isArray(slug) ? slug : [];
    const [categorySlug, subSlug, modelSlug] = slugArray;

    // ✅ CONTEXT
    const { categoryData, setCategoryData } = useProductContext();

    /* ---------------- STATE ---------------- */
    const [subCategory, setSubCategory] = useState(null);
    const [product, setProduct] = useState(null);
    const [activeTab, setActiveTab] = useState('features');
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [priceUnlocked, setPriceUnlocked] = useState(false);

    const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
    const [isPriceOpen, setIsPriceOpen] = useState(false);
    const [showPricePopup, setShowPricePopup] = useState(false);

    const [isServiceOpen, setIsServiceOpen] = useState(false);

    const [isExclusivePatnership, setIsExclusivePatnership] = useState(false);
 const [isServiceRenewalOpen, setIsServiceRenewalOpen] = useState(false);

    /* ---------------- DATA LOADING ---------------- */
    useEffect(() => {
        if (!categorySlug || !subSlug || !modelSlug) return;

        // ✅ 1. TRY CONTEXT FIRST (NO FETCH)
        if (categoryData) {
            const sub = categoryData.subcategories?.find(
                (s) => s.slug === subSlug
            );

            const model = sub?.models?.find(
                (m) => m.meta.slug === modelSlug
            );

            if (sub && model) {
                setSubCategory(sub);
                setProduct(model);
                setLoading(false);
                return;
            }
        }

        // ✅ 2. FALLBACK FETCH (REFRESH / DIRECT URL)
        const fetchFallback = async () => {
            try {
                const res = await fetch(`/api/products/${categorySlug}`);
                const data = await res.json();

                setCategoryData(data); // rehydrate context

                const sub = data.subcategories?.find(
                    (s) => s.slug === subSlug
                );

                const model = sub?.models?.find(
                    (m) => m.meta.slug === modelSlug
                );

                setSubCategory(sub || null);
                setProduct(model || null);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchFallback();
    }, [
        categorySlug,
        subSlug,
        modelSlug,
        categoryData,
        setCategoryData,
    ]);

    /* ---------------- LOADING ---------------- */
    if (loading) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-gray-300 border-t-[#2F4191] rounded-full animate-spin" />
            </div>
        );
    }

    /* ---------------- ERROR ---------------- */
    if (!product || !subCategory) {
        return (
            <p className="text-center py-20 text-red-500">
                Product not found
            </p>
        );
    }

    return (
        <section className="w-full mx-auto p-5">
            <div className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr_1fr] gap-10 items-start">
                    {/* ================= LEFT: AVAILABLE MODELS ================= */}
                    <div className="bg-gray-200 rounded-2xl p-4">
                        <div className='flex justify-center items-center'>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                Available Models
                            </h3>
                        </div>
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
                                            }`}
                                    >
                                        <span className="text-sm font-medium">
                                            {m.title}
                                        </span>
                                        <div className="relative text-[#2F4191]">
                                            {/* Only SVG spins */}
                                            <svg
                                                className="spin-slow "
                                                width="30"
                                                height="30"
                                                viewBox="0 0 30 30"
                                                fill="currentColor"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path d="M14.2257 0.947522C14.6258 0.457905 15.3742 0.457905 15.7743 0.947522L16.8781 2.29817C17.181 2.66879 17.704 2.77283 18.1256 2.54633L19.6623 1.72088C20.2193 1.42165 20.9107 1.70806 21.093 2.31352L21.5959 3.98376C21.7339 4.44207 22.1773 4.73834 22.6535 4.69044L24.3891 4.51587C25.0182 4.45258 25.5474 4.98179 25.4841 5.61093L25.3096 7.34647C25.2617 7.8227 25.5579 8.2661 26.0162 8.40409L27.6865 8.90697C28.2919 9.08926 28.5783 9.7807 28.2791 10.3377L27.4537 11.8744C27.2272 12.296 27.3312 12.819 27.7018 13.1219L29.0525 14.2257C29.5421 14.6258 29.5421 15.3742 29.0525 15.7743L27.7018 16.8781C27.3312 17.181 27.2272 17.704 27.4537 18.1256L28.2791 19.6623C28.5783 20.2193 28.2919 20.9107 27.6865 21.093L26.0162 21.5959C25.5579 21.7339 25.2617 22.1773 25.3096 22.6535L25.4841 24.3891C25.5474 25.0182 25.0182 25.5474 24.3891 25.4841L22.6535 25.3096C22.1773 25.2617 21.7339 25.5579 21.5959 26.0162L21.093 27.6865C20.9107 28.2919 20.2193 28.5783 19.6623 28.2791L18.1256 27.4537C17.704 27.2272 17.181 27.3312 16.8781 27.7018L15.7743 29.0525C15.3742 29.5421 14.6258 29.5421 14.2257 29.0525L13.1219 27.7018C12.819 27.3312 12.296 27.2272 11.8744 27.4537L10.3377 28.2791C9.7807 28.5783 9.08926 28.2919 8.90697 27.6865L8.40409 26.0162C8.2661 25.5579 7.8227 25.2617 7.34647 25.3096L5.61093 25.4841C4.98179 25.5474 4.45258 25.0182 4.51587 24.3891L4.69044 22.6535C4.73834 22.1773 4.44207 21.7339 3.98376 21.5959L2.31352 21.093C1.70806 20.9107 1.42165 20.2193 1.72088 19.6623L2.54633 18.1256C2.77283 17.704 2.66879 17.181 2.29817 16.8781L0.947522 15.7743C0.457905 15.3742 0.457905 14.6258 0.947522 14.2257L2.29817 13.1219C2.66879 12.819 2.77283 12.296 2.54633 11.8744L1.72088 10.3377C1.42165 9.7807 1.70806 9.08926 2.31352 8.90697L3.98376 8.40409C4.44207 8.2661 4.73834 7.8227 4.69044 7.34647L4.51587 5.61093C4.45258 4.98179 4.98179 4.45258 5.61093 4.51587L7.34647 4.69044C7.8227 4.73834 8.2661 4.44207 8.40409 3.98376L8.90697 2.31352C9.08926 1.70806 9.7807 1.42165 10.3377 1.72088L11.8744 2.54633C12.296 2.77283 12.819 2.66879 13.1219 2.29817L14.2257 0.947522Z" />
                                            </svg>

                                            {/* Static arrow centered */}
                                            <FaArrowRight
                                                size={12}
                                                className="absolute top-1/2 left-1/2 text-white transform -translate-x-1/2 -translate-y-1/2"
                                            />
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                    {/* ================= CENTER: PRODUCT INFO ================= */}
                    <div className="space-y-6">
                        <h1 className="text-2xl font-semibold text-gray-900">
                            {product.title}
                        </h1>

                        {product.overview && (
                            <div>
                                {/* <h2 className="text-lg font-semibold mb-3">
                                    Product Overview
                                </h2> */}

                                {Array.isArray(product.overview) ? (
                                    product.overview.map((para, index) => (
                                        <p
                                            key={index}
                                            className="text-sm text-gray-700 leading-relaxed mb-4"
                                        >
                                            {para}
                                        </p>
                                    ))
                                ) : (
                                    <p className="text-sm text-gray-700 leading-relaxed">
                                        {product.overview}
                                    </p>
                                )}
                            </div>
                        )}

                    </div>

                    {/* ================= RIGHT: PRODUCT IMAGE ================= */}
                    <div className="flex flex-col justify-center">
                        <div className="relative border border-gray-200 rounded-2xl p-6 bg-[#2F4191]/10 transition-colors duration-300">
                            {/* GEM BADGE ON IMAGE */}
                            {product.gem && (
                                <Image
                                    src="/Gem.png"
                                    alt="Featured Product"
                                    width={60}
                                    height={60}
                                    className="absolute top-3 right-3 z-10"
                                    priority
                                />
                            )}
                            <div className='p-2 bg-[#2F4191]/20 absolute bottom-3 right-3 rounded-full hover:bg-[#2F4191]/40 cursor-pointer'>
                                <MdZoomOutMap
                                    size={24}

                                />
                            </div>

                            <Image
                                src={product.thumbnail}
                                alt={product.title}
                                width={420}
                                height={420}
                                className="object-contain mx-auto"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>

            <ProductActionSection
                product={product}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                handleShare={handleShare}
                priceUnlocked={priceUnlocked}
                setIsPriceOpen={setIsPriceOpen}
                setIsEnquiryOpen={setIsEnquiryOpen}
                setIsExclusivePatnership={setIsExclusivePatnership}
                setIsServiceOpen={setIsServiceOpen}
                setIsServiceRenewalOpen={setIsServiceRenewalOpen}
            />
            <div className='text-center py-2'>Disclaimer: Specifications are indicative. Performance may vary depending on load, usage, and ambient conditions.</div>

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
                    title: product.title,
                    thumbnail: product.meta.thumbnail,
                    price: product.price,   // ✅ ADD THIS
                }}
            />


            <ExclusivePartner
                isOpen={isExclusivePatnership}
                onClose={() => setIsExclusivePatnership(false)}
                productData={{
                    model: product.meta.title,
                    category: categorySlug,
                    subcategory: subSlug,
                }}
            />

            <ServiceForm
                isOpen={isServiceOpen}
                onClose={() => setIsServiceOpen(false)}
                productData={{
                    model: product.meta.title,
                    category: categorySlug,
                    subcategory: subSlug,
                }}
            />
            {/* 
            {subCategory?.models?.length > 1 && (
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
            {categoryData?.subcategories?.length > 1 && (
                <RelatedModels
                    subcategories={categoryData.subcategories}
                    categorySlug={categorySlug}
                    currentSubSlug={subSlug}
                />
            )}

            <ServiceRenewalForm isOpen={isServiceRenewalOpen}
                onClose={() => setIsServiceRenewalOpen(false)}
                productData={{
                    model: product.meta.title,
                    category: categorySlug,
                    subcategory: subSlug,
                }} />
        </section>
    );

}
