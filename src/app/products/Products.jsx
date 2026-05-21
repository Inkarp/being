'use client';

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
    FaArrowRight,
    FaBoxes,
    FaFilter,
    FaFlask,
    FaLayerGroup,
    FaSearch,
    FaStar,
} from "react-icons/fa";

const ALL_PRODUCTS = "all-products";

function getCategoryFromUrl() {
    if (typeof window === "undefined") return "";
    return new URLSearchParams(window.location.search).get("category") || "";
}

function setCategoryInUrl(categorySlug) {
    if (typeof window === "undefined") return;

    const url = new URL(window.location.href);
    url.searchParams.set("category", categorySlug);
    window.history.replaceState(window.history.state, "", url);
}

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
    const [activeCategory, setActiveCategory] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;

        async function loadProducts() {
            try {
                const res = await fetch("/api/products", { cache: "no-store" });
                const json = await res.json();
                const grouped = groupProductsByCategory(Array.isArray(json) ? json : []);

                if (mounted) {
                    setCategories(grouped);
                    const categoryFromUrl = getCategoryFromUrl();
                    const isKnownCategory = grouped.some((category) => category.slug === categoryFromUrl);
                    const initialCategory = categoryFromUrl === ALL_PRODUCTS || isKnownCategory
                        ? categoryFromUrl
                        : grouped[0]?.slug || ALL_PRODUCTS;

                    setActiveCategory(initialCategory);
                }
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

    const handleCategoryChange = (categorySlug) => {
        setActiveCategory(categorySlug);
        setCategoryInUrl(categorySlug);
    };

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
        <section className="w-full bg-[radial-gradient(circle_at_top_left,#e8f3ff_0,#f8fafc_34%,#eef2f7_100%)] ">
            <div className="mx-auto max-w-7xl overflow-hidden  border border-white/80 bg-white/75 shadow-[0_28px_80px_rgba(22,35,72,0.16)] backdrop-blur">
                <div className="relative overflow-hidden bg-[#101728] text-white">
                    <div className="absolute inset-0 bg-[linear-gradient(120deg,#2F4191_0%,#2B7EC2_55%,#2F4191_100%)]" />
                    <div className="absolute -right-16 top-8 h-52 w-52 rounded-full border border-white/20" />
                    <div className="absolute right-20 -bottom-24 h-72 w-72 rounded-full bg-white/10 blur-2xl" />
                    <div className="absolute left-8 top-10 hidden h-20 w-20 rotate-12 rounded-2xl border border-white/15 bg-white/10 sm:block" />

                    <div className="relative z-10 grid gap-8 px-6 py-12 sm:px-10  lg:px-12 lg:py-14">
                        <div className="flex flex-col justify-center">
                            <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-white/90 shadow-sm">
                                <FaStar className="text-[#a9efff]" />
                                Premium lab equipment
                            </div>
                            <h1 className="max-w-4xl text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                                Explore premium lab products with confidence
                            </h1>
                            <p className="mt-5 max-w-3xl text-base leading-8 text-white/82 sm:text-lg">
                                Browse categories, compare model families and jump straight into the right product range with a smoother, more visual experience.
                            </p>
                        </div>


                    </div>
                </div>

                <div className="grid bg-[#f7f9fc] md:grid-cols-[310px_minmax(0,1fr)]">
                    <aside className="border-b border-[#dfe7f1] bg-white/85 py-5 md:border-b-0 md:border-r">
                        <div className="flex items-center gap-3 px-6">
                            <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#2F4191] text-white shadow-lg shadow-[#2F4191]/25">
                                <FaLayerGroup />
                            </span>
                            <div>
                                <p className="text-base font-bold uppercase tracking-[0.16em] text-[#6f7c91]">
                                    Categories
                                </p>

                            </div>
                        </div>

                        <div className="mt-5 space-y-1 px-3">
                            {loading ? (
                                <div className="rounded-2xl bg-[#f3f6fb] px-4 py-4 text-sm text-[#6f7c91]">Loading categories...</div>
                            ) : (
                                categories.map((category) => {
                                    const isActive = category.slug === activeCategory;

                                    return (
                                        <button
                                            key={category.slug}
                                            type="button"
                                            onClick={() => handleCategoryChange(category.slug)}
                                            className={`group relative flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-base transition ${isActive
                                                ? "bg-[#182033] font-semibold text-white shadow-lg shadow-[#182033]/18"
                                                : "font-semibold text-[#30394d] hover:bg-[#eef5ff] hover:text-[#2F4191]"
                                                }`}
                                        >
                                            {isActive && (
                                                <span className="absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r-full bg-[#79d9ff]" />
                                            )}
                                            <span className="truncate">{category.name}</span>
                                            <span className={`ml-3 rounded-full px-2.5 py-1 text-xs ${isActive ? "bg-white/15 text-white" : "bg-white text-[#7a8798] shadow-sm"}`}>
                                                {category.totalModels}
                                            </span>
                                        </button>
                                    );
                                })
                            )}

                            <button
                                type="button"
                                onClick={() => handleCategoryChange(ALL_PRODUCTS)}
                                className={`relative flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-base transition ${activeCategory === ALL_PRODUCTS
                                    ? "bg-[#182033] font-semibold text-white shadow-lg shadow-[#182033]/18"
                                    : "font-semibold text-[#30394d] hover:bg-[#eef5ff] hover:text-[#2F4191]"
                                    }`}
                            >
                                {activeCategory === ALL_PRODUCTS && (
                                    <span className="absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r-full bg-[#79d9ff]" />
                                )}
                                <span>All products</span>
                                <span className={`rounded-full px-2.5 py-1 text-xs ${activeCategory === ALL_PRODUCTS ? "bg-white/15 text-white" : "bg-white text-[#7a8798] shadow-sm"}`}>
                                    {totalProducts}
                                </span>
                            </button>
                        </div>
                    </aside>

                    <main className="bg-[#f7f9fc] p-5 sm:p-7 lg:p-8">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                            <div>
                                <div className="inline-flex items-center gap-2 rounded-full bg-[#e8f2ff] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#2F4191]">
                                    <FaFilter />
                                    Choose your Product
                                </div>
                                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#151b2d] sm:text-3xl">
                                    {activeCategory === ALL_PRODUCTS
                                        ? "All product lines"
                                        : categories.find((category) => category.slug === activeCategory)?.name}
                                </h2>
                            </div>

                            <div className="relative w-full lg:max-w-md">
                                <label htmlFor="product-search" className="sr-only">
                                    Search products or models
                                </label>
                                <FaSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#7a8798]" />
                                <input
                                    id="product-search"
                                    value={searchTerm}
                                    onChange={(event) => setSearchTerm(event.target.value)}
                                    placeholder="Search products or models..."
                                    className="h-14 w-full rounded-2xl border border-[#dce6f1] bg-white pl-11 pr-4 text-base font-medium text-[#1f2737] shadow-sm outline-none transition placeholder:text-[#8c98aa] focus:border-[#2B7EC2] focus:ring-4 focus:ring-[#2B7EC2]/12"
                                />
                            </div>
                        </div>

                        <div className="mt-6">
                            {loading ? (
                                <div className="rounded-3xl border border-[#dce6f1] bg-white p-8 text-sm font-semibold text-[#6f7c91] shadow-sm">Loading products...</div>
                            ) : filteredSubcategories.length === 0 ? (
                                <div className="rounded-3xl border border-[#dce6f1] bg-white p-8 text-sm font-semibold text-[#6f7c91] shadow-sm">
                                    No products found.
                                </div>
                            ) : (
                                <div className="grid gap-4 lg:grid-cols-2">
                                    {filteredSubcategories.map((sub) => {
                                        const firstModel = sub.models[0];
                                        const href = firstModel?.url || `/products/${sub.categorySlug}/${sub.slug}`;

                                        return (
                                            <Link
                                                key={`${sub.categorySlug}-${sub.slug}`}
                                                href={href}
                                                className="group relative overflow-hidden rounded-3xl border border-[#dce6f1] bg-white p-5 shadow-[0_12px_32px_rgba(26,39,70,0.07)] transition duration-300 hover:-translate-y-1 hover:border-[#8ecbf4] hover:shadow-[0_24px_46px_rgba(26,39,70,0.13)]"
                                            >
                                                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#2F4191] to-[#2B7EC2] opacity-80" />

                                                <div className="flex items-start gap-4">
                                                    <div className="grid h-14 w-14 flex-shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-[#e8f2ff] to-[#d8fbf6] text-[#2F4191] shadow-inner">
                                                        <FaFlask size={22} />
                                                    </div>

                                                    <div className="min-w-0 flex-1">
                                                        <div className="flex flex-wrap items-center gap-2">
                                                            <h3 className="text-lg font-semibold leading-snug text-[#151b2d]">
                                                                {sub.name}
                                                            </h3>
                                                            {activeCategory === ALL_PRODUCTS && (
                                                                <span className="rounded-full bg-[#f0f4fa] px-2.5 py-1 text-xs font-bold text-[#68758a]">
                                                                    {sub.categoryName}
                                                                </span>
                                                            )}
                                                        </div>

                                                        <div className="mt-3 flex items-center gap-2 text-sm font-semibold text-[#667386]">
                                                            <FaBoxes className="text-[#2B7EC2]" />
                                                            <span>{sub.models.length} models available</span>
                                                        </div>

                                                        <div className="mt-4 flex flex-wrap gap-2">
                                                            {sub.models.slice(0, 6).map((model) => (
                                                                <span
                                                                    key={model.url || model.id || model.slug || model.model}
                                                                    className="rounded-full border border-[#dce6f1] bg-[#f8fbff] px-3 py-1 font-mono text-[11px] font-bold leading-none text-[#37445a]"
                                                                >
                                                                    {getModelLabel(model)}
                                                                </span>
                                                            ))}
                                                            {sub.models.length > 6 && (
                                                                <span className="rounded-full border border-[#dce6f1] bg-[#eef6ff] px-3 py-1 text-[11px] font-bold leading-none text-[#2F4191]">
                                                                    +{sub.models.length - 6}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="relative h-11 w-11 flex-shrink-0">
                                                        <span className="absolute inset-0 rounded-full bg-[#151b2d] transition group-hover:scale-110 group-hover:bg-[#2F4191]" />
                                                        <svg
                                                            width="44" height="44"
                                                            viewBox="0 0 30 30"
                                                            fill="currentColor"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="spin-slow absolute inset-0 h-full w-full text-[#151b2d] opacity-0 transition group-hover:text-[#2F4191] group-hover:opacity-100"
                                                        >
                                                            <path d="M14.2257 0.947522C14.6258 0.457905 15.3742 0.457905 15.7743 0.947522L16.8781 2.29817C17.181 2.66879 17.704 2.77283 18.1256 2.54633L19.6623 1.72088C20.2193 1.42165 20.9107 1.70806 21.093 2.31352L21.5959 3.98376C21.7339 4.44207 22.1773 4.73834 22.6535 4.69044L24.3891 4.51587C25.0182 4.45258 25.5474 4.98179 25.4841 5.61093L25.3096 7.34647C25.2617 7.8227 25.5579 8.2661 26.0162 8.40409L27.6865 8.90697C28.2919 9.08926 28.5783 9.7807 28.2791 10.3377L27.4537 11.8744C27.2272 12.296 27.3312 12.819 27.7018 13.1219L29.0525 14.2257C29.5421 14.6258 29.5421 15.3742 29.0525 15.7743L27.7018 16.8781C27.3312 17.181 27.2272 17.704 27.4537 18.1256L28.2791 19.6623C28.5783 20.2193 28.2919 20.9107 27.6865 21.093L26.0162 21.5959C25.5579 21.7339 25.2617 22.1773 25.3096 22.6535L25.4841 24.3891C25.5474 25.0182 25.0182 25.5474 24.3891 25.4841L22.6535 25.3096C22.1773 25.2617 21.7339 25.5579 21.5959 26.0162L21.093 27.6865C20.9107 28.2919 20.2193 28.5783 19.6623 28.2791L18.1256 27.4537C17.704 27.2272 17.181 27.3312 16.8781 27.7018L15.7743 29.0525C15.3742 29.5421 14.6258 29.5421 14.2257 29.0525L13.1219 27.7018C12.819 27.3312 12.296 27.2272 11.8744 27.4537L10.3377 28.2791C9.7807 28.5783 9.08926 28.2919 8.90697 27.6865L8.40409 26.0162C8.2661 25.5579 7.8227 25.2617 7.34647 25.3096L5.61093 25.4841C4.98179 25.5474 4.45258 25.0182 4.51587 24.3891L4.69044 22.6535C4.73834 22.1773 4.44207 21.7339 3.98376 21.5959L2.31352 21.093C1.70806 20.9107 1.42165 20.2193 1.72088 19.6623L2.54633 18.1256C2.77283 17.704 2.66879 17.181 2.29817 16.8781L0.947522 15.7743C0.457905 15.3742 0.457905 14.6258 0.947522 14.2257L2.29817 13.1219C2.66879 12.819 2.77283 12.296 2.54633 11.8744L1.72088 10.3377C1.42165 9.7807 1.70806 9.08926 2.31352 8.90697L3.98376 8.40409C4.44207 8.2661 4.73834 7.8227 4.69044 7.34647L4.51587 5.61093C4.45258 4.98179 4.98179 4.45258 5.61093 4.51587L7.34647 4.69044C7.8227 4.73834 8.2661 4.44207 8.40409 3.98376L8.90697 2.31352C9.08926 1.70806 9.7807 1.42165 10.3377 1.72088L11.8744 2.54633C12.296 2.77283 12.819 2.66879 13.1219 2.29817L14.2257 0.947522Z" />
                                                        </svg>
                                                        <FaArrowRight
                                                            size={14}
                                                            className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-white transition group-hover:translate-x-[-35%]"
                                                        />
                                                    </div>
                                                </div>
                                            </Link>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </main>
                </div>
            </div>
        </section>
    );
}
