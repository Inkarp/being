'use client';

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { FaArrowRight, FaChevronRight } from "react-icons/fa";

const ALL_PRODUCTS = "all-products";

function groupProductsByCategory(items) {
    const categories = items.reduce((acc, item) => {
        const categorySlug = item.category || "unknown";
        const subcategorySlug = item.subcategory || "all";

        if (!acc[categorySlug]) {
            acc[categorySlug] = {
                slug: categorySlug,
                name: item.categoryName || item.category || categorySlug,
                subcategories: {},
            };
        }

        if (!acc[categorySlug].subcategories[subcategorySlug]) {
            acc[categorySlug].subcategories[subcategorySlug] = {
                slug: subcategorySlug,
                name: item.subcategoryName || item.subcategory || subcategorySlug,
                models: [],
            };
        }

        acc[categorySlug].subcategories[subcategorySlug].models.push(item);
        return acc;
    }, {});

    return Object.values(categories).map((category) => ({
        ...category,
        subcategories: Object.values(category.subcategories),
        totalModels: Object.values(category.subcategories).reduce(
            (sum, sub) => sum + sub.models.length,
            0
        ),
    }));
}

function getModelLabel(model) {
    const label = model.slug || model.id || model.meta?.slug;
    if (label) return String(label).toUpperCase();

    const codeMatch = String(model.model || model.title || "").match(/[A-Z]{2,}[A-Z0-9-]*\d[A-Z0-9-]*/i);
    return (codeMatch?.[0] || "MODEL").toUpperCase();
}

export default function Products() {
    const [categories, setCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState(ALL_PRODUCTS);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;

        async function loadProducts() {
            try {
                const res = await fetch("/api/products", { cache: "no-store" });
                const json = await res.json();
                const grouped = groupProductsByCategory(Array.isArray(json) ? json : []);

                if (mounted) setCategories(grouped);
            } catch (error) {
                console.error("Failed to load products:", error);
            } finally {
                if (mounted) setLoading(false);
            }
        }

        loadProducts();
        return () => {
            mounted = false;
        };
    }, []);

    const totalProducts = useMemo(
        () => categories.reduce((sum, category) => sum + category.totalModels, 0),
        [categories]
    );

    const visibleCategories = useMemo(() => {
        if (activeCategory === ALL_PRODUCTS) return categories;
        return categories.filter((category) => category.slug === activeCategory);
    }, [activeCategory, categories]);

    const filteredSubcategories = useMemo(() => {
        const term = searchTerm.trim().toLowerCase();

        return visibleCategories
            .flatMap((category) =>
                category.subcategories.map((sub) => ({
                    ...sub,
                    categoryName: category.name,
                    categorySlug: category.slug,
                    models: sub.models.filter((model) => {
                        if (!term) return true;

                        return [
                            model.title,
                            model.model,
                            model.id,
                            model.slug,
                            model.categoryName,
                            model.category,
                            model.subcategoryName,
                            model.subcategory,
                        ]
                            .filter(Boolean)
                            .join(" ")
                            .toLowerCase()
                            .includes(term);
                    }),
                }))
            )
            .filter((sub) => sub.models.length > 0);
    }, [searchTerm, visibleCategories]);

    return (
        <section className="w-full bg-[#f7f7f5]">
            <div className="mx-auto overflow-hidden border border-[#d9d9d5] bg-[#fafaf8] shadow-[0_12px_40px_rgba(17,24,39,0.12)]">
                <div className="relative overflow-hidden bg-[#111] text-white">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#2F4191]/95 via-[#2B7EC2]/75 to-[#2B7EC2]/60" />
                    <div className="mx-auto grid gap-6 px-5 py-10 sm:grid-cols-[1.3fr_0.9fr] sm:px-10 sm:py-12 lg:px-10 lg:py-8">
                        <div className="relative z-10 flex flex-col justify-center gap-6">
                            <div>
                                <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
                                    Explore premium lab products with 
                                    <span className="text-[#2B7EC2]"> confidence</span>
                                </h1>
                                <p className="mt-4 max-w-xl text-base leading-7 text-white/80 sm:text-lg">
                                    Discover the latest models, automatic category updates and powerful product search in one beautiful experience.
                                </p>
                            </div>
                            <div className="grid gap-3 sm:grid-cols-2">
                                <div className="rounded-3xl border border-white/15 bg-white/10 p-5 shadow-lg backdrop-blur-sm">
                                    <p className="text-sm uppercase tracking-[0.25em] text-white/80">Total models</p>
                                     <p className="mt-3 text-3xl font-bold text-white">120+</p>
                                </div>
                                <div className="rounded-3xl border border-white/15 bg-white/10 p-5 shadow-lg backdrop-blur-sm">
                                    <p className="text-sm uppercase tracking-[0.25em] text-white/80">Total Categories</p>
                                  
                                    <p className="mt-3 text-3xl font-bold text-white">{totalProducts}</p>
                                </div>
                            </div>
                        </div>
                        <div className="relative flex items-center justify-center">
                            <div className="relative h-72 w-full overflow-hidden rounded-[2rem] border border-white/20 bg-slate-950 shadow-2xl sm:h-80 lg:h-[26rem]">
                                <Image
                                    src="/HeroImage2.webp"
                                    alt="Lab product showcase"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-[300px_minmax(0,1fr)]">
                    <aside className="border-b border-[#d9d9d5] bg-[#f4f4f1] py-5 md:border-b-0 md:border-r">
                        <p className="px-6 text-xs font-bold uppercase tracking-[0.12em] text-[#777]">
                            Categories
                        </p>

                        <div className="mt-3">
                            <button
                                type="button"
                                onClick={() => setActiveCategory(ALL_PRODUCTS)}
                                className={`relative flex w-full items-center justify-between px-6 py-3 text-left text-base transition ${activeCategory === ALL_PRODUCTS
                                    ? "bg-[#eeeeea] font-bold text-[#111]"
                                    : "font-medium text-[#303030] hover:bg-[#eeeeea]"
                                    }`}
                            >
                                {activeCategory === ALL_PRODUCTS && (
                                    <span className="absolute left-0 top-0 h-full w-[3px] bg-[#111]" />
                                )}
                                <span>All products</span>
                                <span className="text-xs text-[#8a8a84]">{totalProducts}</span>
                            </button>

                            {loading ? (
                                <div className="px-6 py-4 text-sm text-[#777]">Loading...</div>
                            ) : (
                                categories.map((category) => {
                                    const isActive = category.slug === activeCategory;

                                    return (
                                        <button
                                            key={category.slug}
                                            type="button"
                                            onClick={() => setActiveCategory(category.slug)}
                                            className={`relative flex w-full items-center justify-between px-6 py-3 text-left text-base transition ${isActive
                                                ? "bg-[#eeeeea] font-bold text-[#111]"
                                                : "font-medium text-[#303030] hover:bg-[#eeeeea]"
                                                }`}
                                        >
                                            {isActive && (
                                                <span className="absolute left-0 top-0 h-full w-[3px] bg-[#111]" />
                                            )}
                                            <span className="truncate">{category.name}</span>
                                            <span className="ml-3 text-xs text-[#8a8a84]">{category.totalModels}</span>
                                        </button>
                                    );
                                })
                            )}
                        </div>
                    </aside>

                    <main className="bg-[#fbfbf9] p-5 sm:p-7">
                        <label htmlFor="product-search" className="sr-only">
                            Search products or models
                        </label>
                        <input
                            id="product-search"
                            value={searchTerm}
                            onChange={(event) => setSearchTerm(event.target.value)}
                            placeholder="Search products or models..."
                            className="h-12 w-full rounded-lg border border-[#d6d6d1] bg-white px-4 text-lg text-[#1f1f1f] outline-none transition placeholder:text-[#777] focus:border-[#2F4191] focus:ring-2 focus:ring-[#2F4191]/15"
                        />

                        <div className="mt-5 overflow-hidden rounded-xl border border-[#d1d1cc] bg-white">
                            {loading ? (
                                <div className="p-6 text-sm font-medium text-[#777]">Loading products...</div>
                            ) : filteredSubcategories.length === 0 ? (
                                <div className="p-6 text-sm font-medium text-[#777]">
                                    No products found.
                                </div>
                            ) : (
                                filteredSubcategories.map((sub) => {
                                    const firstModel = sub.models[0];
                                    const href = firstModel?.url || `/products/${sub.categorySlug}/${sub.slug}`;

                                    return (
                                        <Link
                                            key={`${sub.categorySlug}-${sub.slug}`}
                                            href={href}
                                            className="group flex items-center gap-4 border-b border-[#d8d8d3] px-5 py-4 transition last:border-b-0 hover:bg-[#f7f7f3]"
                                        >
                                            <div className="min-w-0 flex-1">
                                                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                                                    <h2 className="text-base font-bold leading-snug text-[#171717]">
                                                        {sub.name}
                                                    </h2>
                                                    {activeCategory === ALL_PRODUCTS && (
                                                        <span className="text-xs font-semibold text-[#8a8a84]">
                                                            {sub.categoryName}
                                                        </span>
                                                    )}
                                                </div>

                                                <div className="mt-2 flex flex-wrap gap-2">
                                                    {sub.models.slice(0, 6).map((model) => (
                                                        <span
                                                            key={model.url || model.id || model.slug || model.model}
                                                            className="rounded border border-[#d6d6cf] bg-[#f1f1ee] px-2 py-0.5 font-mono text-[11px] font-medium leading-none text-[#444]"
                                                        >
                                                            {getModelLabel(model)}
                                                        </span>
                                                    ))}
                                                    {sub.models.length > 6 && (
                                                        <span className="rounded border border-[#d6d6cf] bg-[#f1f1ee] px-2 py-0.5 text-[11px] font-semibold leading-none text-[#666]">
                                                            +{sub.models.length - 6}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="relative w-8 h-8 flex-shrink-0">
                                                   <svg
                                                     width="32" height="32"
                                                     viewBox="0 0 30 30"
                                                     fill="black"
                                                     xmlns="http://www.w3.org/2000/svg"
                                                     className="gear-svg absolute inset-0 z-0"
                                                   >
                                                     <path d="M14.2257 0.947522C14.6258 0.457905 15.3742 0.457905 15.7743 0.947522L16.8781 2.29817C17.181 2.66879 17.704 2.77283 18.1256 2.54633L19.6623 1.72088C20.2193 1.42165 20.9107 1.70806 21.093 2.31352L21.5959 3.98376C21.7339 4.44207 22.1773 4.73834 22.6535 4.69044L24.3891 4.51587C25.0182 4.45258 25.5474 4.98179 25.4841 5.61093L25.3096 7.34647C25.2617 7.8227 25.5579 8.2661 26.0162 8.40409L27.6865 8.90697C28.2919 9.08926 28.5783 9.7807 28.2791 10.3377L27.4537 11.8744C27.2272 12.296 27.3312 12.819 27.7018 13.1219L29.0525 14.2257C29.5421 14.6258 29.5421 15.3742 29.0525 15.7743L27.7018 16.8781C27.3312 17.181 27.2272 17.704 27.4537 18.1256L28.2791 19.6623C28.5783 20.2193 28.2919 20.9107 27.6865 21.093L26.0162 21.5959C25.5579 21.7339 25.2617 22.1773 25.3096 22.6535L25.4841 24.3891C25.5474 25.0182 25.0182 25.5474 24.3891 25.4841L22.6535 25.3096C22.1773 25.2617 21.7339 25.5579 21.5959 26.0162L21.093 27.6865C20.9107 28.2919 20.2193 28.5783 19.6623 28.2791L18.1256 27.4537C17.704 27.2272 17.181 27.3312 16.8781 27.7018L15.7743 29.0525C15.3742 29.5421 14.6258 29.5421 14.2257 29.0525L13.1219 27.7018C12.819 27.3312 12.296 27.2272 11.8744 27.4537L10.3377 28.2791C9.7807 28.5783 9.08926 28.2919 8.90697 27.6865L8.40409 26.0162C8.2661 25.5579 7.8227 25.2617 7.34647 25.3096L5.61093 25.4841C4.98179 25.5474 4.45258 25.0182 4.51587 24.3891L4.69044 22.6535C4.73834 22.1773 4.44207 21.7339 3.98376 21.5959L2.31352 21.093C1.70806 20.9107 1.42165 20.2193 1.72088 19.6623L2.54633 18.1256C2.77283 17.704 2.66879 17.181 2.29817 16.8781L0.947522 15.7743C0.457905 15.3742 0.457905 14.6258 0.947522 14.2257L2.29817 13.1219C2.66879 12.819 2.77283 12.296 2.54633 11.8744L1.72088 10.3377C1.42165 9.7807 1.70806 9.08926 2.31352 8.90697L3.98376 8.40409C4.44207 8.2661 4.73834 7.8227 4.69044 7.34647L4.51587 5.61093C4.45258 4.98179 4.98179 4.45258 5.61093 4.51587L7.34647 4.69044C7.8227 4.73834 8.2661 4.44207 8.40409 3.98376L8.90697 2.31352C9.08926 1.70806 9.7807 1.42165 10.3377 1.72088L11.8744 2.54633C12.296 2.77283 12.819 2.66879 13.1219 2.29817L14.2257 0.947522Z" />
                                                   </svg>
                                                   <FaArrowRight
                                                     size={12} color='white'
                                                     className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white z-10"
                                                   />
                                                 </div>
                                        </Link>
                                    );
                                })
                            )}
                        </div>
                    </main>
                </div>
            </div>
        </section>
    );
}
