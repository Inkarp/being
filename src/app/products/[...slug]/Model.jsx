'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Model() {
    const router = useRouter();
    const { slug } = useParams();
    const [categorySlug, subSlug, modelSlug] = slug || [];

    const [subCategory, setSubCategory] = useState(null);
    const [product, setProduct] = useState(null);
    const [activeTab, setActiveTab] = useState('info');
    const [activeImg, setActiveImg] = useState(0);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        if (!categorySlug || !subSlug || !modelSlug) return;

        const fetchData = async () => {
            try {
                const res = await fetch(`/api/products/${categorySlug}`);
                const data = await res.json();

                const sub = data.subcategories.find((s) => s.slug === subSlug);
                const model = sub?.models.find((m) => m.meta.slug === modelSlug);

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
        return (
            <section className="min-h-[60vh] flex items-center justify-center bg-slate-950 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900">
                <div className="relative">
                    <div className="h-10 w-10 rounded-full border-2 border-t-transparent border-orange-400 animate-spin" />
                    <p className="mt-4 text-center text-sm text-slate-300 tracking-[0.2em] uppercase">
                        Loading product…
                    </p>
                </div>
            </section>
        );
    }

    if (!product || !subCategory) {
        return (
            <section className="min-h-[60vh] flex items-center justify-center bg-slate-950">
                <p className="text-center text-red-400 text-sm md:text-base bg-red-500/10 border border-red-500/40 px-6 py-3 rounded-full backdrop-blur-md">
                    Product not found
                </p>
            </section>
        );
    }

    const images = [
        product.meta.thumbnail,
        product.meta.thumbnail,
        product.meta.thumbnail,
    ];

    return (
        <section className="relative overflow-hidden bg-slate-950 text-slate-50">
            {/* Gradient background accents */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -top-32 -left-32 h-80 w-80 rounded-full bg-orange-500/20 blur-3xl" />
                <div className="absolute -bottom-40 -right-10 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_55%)]" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
                {/* Breadcrumb + badge */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                    <div className="flex items-center gap-2 text-xs md:text-sm text-slate-400">
                        <button
                            onClick={() => router.push('/products')}
                            className="hover:text-orange-400 transition-colors"
                        >
                            Products
                        </button>
                        <span className="opacity-60">/</span>
                        <span className="capitalize opacity-80">{categorySlug}</span>
                        <span className="opacity-60">/</span>
                        <span className="capitalize opacity-80">{subSlug}</span>
                        <span className="opacity-60">/</span>
                        <span className="text-slate-100">{product.meta.title}</span>
                    </div>

                    <span className="inline-flex items-center gap-2 rounded-full border border-orange-400/40 bg-orange-500/10 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-orange-200 shadow-[0_0_25px_rgba(251,146,60,0.45)]">
                    </span>
                </div>

                {/* TOP SECTION */}
                <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1.1fr)] gap-10 lg:gap-14 items-start">
                    {/* LEFT: Gallery */}
                    <div className="flex  gap-6">
                        {/* Thumbnails */}
                        <div className="flex md:flex-col gap-3 md:max-h-[420px] md:overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-700/60 scrollbar-track-transparent">
                            {images.map((img, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveImg(i)}
                                    className={`group relative rounded-2xl border bg-slate-900/60 backdrop-blur-xl p-1.5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(15,23,42,0.9)] hover:border-orange-400/60 ${activeImg === i
                                        ? 'border-orange-400 shadow-[0_0_40px_rgba(251,146,60,0.55)]'
                                        : 'border-slate-700/80'
                                        }`}
                                >
                                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-500/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <Image
                                        src={img}
                                        alt="thumbnail"
                                        width={88}
                                        height={88}
                                        className="relative z-10 object-contain rounded-xl"
                                    />
                                </button>
                            ))}
                        </div>

                        {/* Main image card */}
                        <div className="relative flex-1">
                            <div className="pointer-events-none absolute -inset-6 rounded-[32px] bg-gradient-to-tr from-orange-500/20 via-transparent to-blue-500/25 opacity-70" />
                            <div className="relative rounded-[28px] bg-slate-900/70 border border-slate-700/60 backdrop-blur-2xl shadow-[0_35px_120px_rgba(15,23,42,1)] overflow-hidden">
                                <div className="absolute inset-x-10 top-6 h-8 rounded-full bg-gradient-to-r from-orange-500/40 via-white/10 to-blue-500/50 blur-2xl opacity-50" />
                                <div className="flex items-center justify-center px-6 pt-10 pb-8">
                                    <Image
                                        src={images[activeImg]}
                                        alt={product.meta.title}
                                        width={460}
                                        height={460}
                                        className="object-contain drop-shadow-[0_24px_60px_rgba(15,23,42,0.95)] transition-transform duration-500 ease-out scale-100 hover:scale-105"
                                    />
                                </div>

                                {/* Image indicators */}
                                <div className="flex items-center justify-center gap-1 pb-5">
                                    {images.map((_, i) => (
                                        <span
                                            key={i}
                                            className={`h-1 rounded-full transition-all ${activeImg === i
                                                ? 'w-7 bg-orange-400'
                                                : 'w-2 bg-slate-600'
                                                }`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: Info panel */}
                    <div className="relative">
                        {/* <div className="absolute -inset-x-6 -top-6 -bottom-6 rounded-[32px] bg-slate-900/70 border border-slate-700/60 backdrop-blur-2xl shadow-[0_32px_90px_rgba(15,23,42,1)]" /> */}
                        <div className="relative p-3">
                            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight mb-3">
                                {product.meta.title}
                            </h1>

                            {/* <p className="text-xs uppercase tracking-[0.27em] text-slate-400 mb-5">
                                Precision • Stability • Performance
                            </p> */}

                            {/* Highlight metrics row stub */}
                            <div className="mb-6 grid grid-cols-3 gap-3 text-xs">
                                <div className="rounded-2xl border border-slate-700/70 bg-slate-900/70 px-3 py-3">
                                    <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 mb-1">
                                        Internal Volume
                                    </p>
                                    <p className="text-sm font-medium text-slate-50">
                                        Custom
                                    </p>
                                </div>
                                {/* <div className="rounded-2xl border border-slate-700/70 bg-slate-900/70 px-3 py-3">
                                    <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 mb-1">
                                        Category
                                    </p>
                                    <p className="text-xs capitalize text-slate-100">{subSlug}</p>
                                </div> */}
                                <div className="rounded-2xl border border-slate-700/70 bg-slate-900/70 px-3 py-3">
                                    <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 mb-1">
                                        Model
                                    </p>
                                    <p className="text-xs text-slate-100">{modelSlug}</p>
                                </div>
                            </div>

                            {/* Model selector pills */}
                            <div className="mb-6">
                                <p className="text-xs font-medium text-slate-300 mb-3">
                                    Choose model variant
                                </p>
                                <div className="grid grid-col-3 gap-2">
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
                                                className={`group relative overflow-hidden rounded-full border px-3 py-1.5 text-xs md:text-[13px] transition-all duration-300 ${isActive
                                                    ? 'border-orange-400 bg-orange-500/15 text-orange-100 shadow-[0_0_25px_rgba(251,146,60,0.55)]'
                                                    : 'border-slate-700 bg-slate-900/70 text-slate-300 hover:border-orange-400/70 hover:text-orange-100'
                                                    }`}
                                            >

                                                <span className="absolute inset-0 bg-gradient-to-r from-orange-500/30 via-transparent to-blue-500/30 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                <span className="relative">{m.meta.title}</span>

                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* CTA buttons */}
                            <div className="flex flex-wrap items-center gap-3 mb-6">
                                <button className="relative inline-flex items-center justify-center rounded-full px-6 py-2.5 text-xs font-medium uppercase tracking-[0.25em] text-slate-950 bg-gradient-to-r from-orange-400 via-orange-500 to-amber-400 shadow-[0_18px_45px_rgba(251,146,60,0.55)] transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-[0_28px_70px_rgba(251,146,60,0.8)]">
                                    <span>Request a quote</span>
                                </button>

                                <button className="relative inline-flex items-center justify-center rounded-full px-6 py-2.5 text-xs font-medium uppercase tracking-[0.25em] text-orange-100 border border-orange-400/60 bg-slate-900/60 backdrop-blur-xl hover:bg-orange-500/10 transition-all duration-300">
                                    Enquiry
                                </button>
                            </div>

                            {/* Short overview */}
                            {/* {product.overview && (
                                <p className="text-sm leading-relaxed text-slate-300/90">
                                    {product.overview}
                                </p>
                            )} */}
                        </div>
                    </div>
                </div>

                {/* PRODUCT INFO & TABS */}
                <div className="mt-12 lg:mt-14">
                    <div className="mb-4 flex items-center justify-between gap-4">
                        <h2 className="text-sm font-semibold tracking-[0.3em] text-slate-400 uppercase">
                            Product info
                        </h2>
                        <div className="h-px flex-1 bg-gradient-to-r from-slate-600 via-slate-700/40 to-transparent" />
                    </div>

                    <div className="bg-slate-950/70 border border-slate-800/70 rounded-3xl shadow-[0_26px_80px_rgba(15,23,42,1)] p-4 sm:p-6 lg:p-7 backdrop-blur-2xl">
                        <div className="flex flex-wrap gap-3 text-xs md:text-sm ">
                            <button 
                                onClick={() => setActiveTab('info')}
                                className={`relative rounded-full px-3 py-1.5 transition-all ${activeTab === 'info'
                                    ? 'bg-slate-800 text-slate-50'
                                    : 'text-slate-400 hover:bg-slate-900 border'
                                    }`}
                            >
                                Overview
                            </button>

                            {product.keyFeatures && (
                                <button
                                    onClick={() => setActiveTab('features')}
                                    className={`relative rounded-full px-3 py-1.5 transition-all ${activeTab === 'features'
                                        ? 'bg-slate-800 text-slate-50 border'
                                        : 'text-slate-400 hover:bg-slate-900'
                                        }`}
                                >
                                    Features
                                </button>
                            )}

                            {product.specifications && (
                                <button
                                    onClick={() => setActiveTab('specs')}
                                    className={`relative rounded-full px-3 py-1.5 transition-all ${activeTab === 'specs'
                                        ? 'bg-slate-800 text-slate-50'
                                        : 'text-slate-400 hover:bg-slate-900'
                                        }`}
                                >
                                    Specifications
                                </button>
                            )}

                            {product.applications && (
                                <button
                                    onClick={() => setActiveTab('applications')}
                                    className={`relative rounded-full px-3 py-1.5 transition-all ${activeTab === 'applications'
                                        ? 'bg-slate-800 text-slate-50'
                                        : 'text-slate-400 hover:bg-slate-900'
                                        }`}
                                >
                                    Applications
                                </button>
                            )}
                        </div>

                        <div className="mt-6 text-sm text-slate-200">
                            {activeTab === 'info' && (
                                <p className="max-w-4xl leading-relaxed text-slate-300/90">
                                    {product.overview ||
                                        'High‑performance instrumentation built for demanding laboratory environments, engineered for precision, reliability and ease of use.'}
                                </p>
                            )}

                            {activeTab === 'features' && product.keyFeatures && (
                                <ul className="grid gap-2 sm:grid-cols-2 max-w-5xl">
                                    {product.keyFeatures.map((feature, index) => (
                                        <li key={index} className="flex items-start gap-2 rounded-2xl bg-slate-900/70 border border-slate-800/70 px-3 py-2.5">
                                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-orange-400 flex-shrink-0" />
                                            <span className="text-slate-200/90">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}

                            {activeTab === 'specs' && product.specifications && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
                                    {Object.entries(product.specifications).map(([key, value]) => (
                                        <div
                                            key={key}
                                            className="flex justify-between gap-4 rounded-2xl bg-slate-900/70 border border-slate-800/70 px-3 py-2.5"
                                        >
                                            <span className="font-medium text-slate-200 capitalize">
                                                {key.replace(/([A-Z])/g, ' $1')}
                                            </span>
                                            <span className="text-slate-300 text-right">
                                                {typeof value === 'object' ? JSON.stringify(value) : value}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {activeTab === 'applications' && product.applications && (
                                <ul className="list-disc list-inside space-y-2 max-w-5xl text-slate-300/90">
                                    {product.applications.map((app, index) => (
                                        <li key={index}>{app}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
