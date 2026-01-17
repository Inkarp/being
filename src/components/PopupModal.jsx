'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaArrowRight } from 'react-icons/fa';

export default function PopupModel({ models, categorySlug, subSlug }) {
    const router = useRouter();

    const [isOpen, setIsOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        if (!models?.length) return;
        const openInterval = setInterval(() => setIsOpen(true), 20000);
        return () => clearInterval(openInterval);
    }, [models?.length]);

    useEffect(() => {
        if (!isOpen || !models?.length) return;
        const rotate = setInterval(() => {
            setActiveIndex(prev => (prev + 1) % models.length);
        }, 5000);
        return () => clearInterval(rotate);
    }, [isOpen, models?.length]);

    if (!isOpen || !models?.length) return null;

    const activeModel = models[activeIndex];

    return (
        <div className="fixed right-2 bottom-2 z-[60] w-[300px] max-w-[90vw]">
            {/* Enhanced glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 via-purple-500/20 to-cyan-500/30 rounded-3xl blur-xl -z-10 animate-pulse" />
            {/* Main glass card - DARKER for text elevation */}
            <div className="relative overflow-hidden rounded-3xl border-2 border-white/20 bg-gradient-to-b from-slate-900/95 to-slate-800/90 backdrop-blur-3xl shadow-2xl shadow-slate-900/50 before:absolute before:inset-0 before:bg-gradient-to-r before:from-blue-500/5 before:to-purple-500/5 before:blur-xl">
                {/* Top accent glow */}
                <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-blue-400/80 via-cyan-400/80 to-purple-500/80 shadow-lg" />

                {/* Header - HIGHEST ELEVATION */}
                <div className="relative z-10 flex items-center justify-between px-6 pt-5 pb-3">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-2xl shadow-blue-500/50 ring-2 ring-white/30" />
                            <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg drop-shadow-lg">
                                ✨
                            </span>
                        </div>
                        <div>
                            <p className="text-xs uppercase tracking-wider font-bold text-cyan-300/90 drop-shadow-md">
                                AI Recommendations
                            </p>
                            <p className="text-sm font-semibold text-white drop-shadow-lg">
                                {models.length} perfect matches
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={() => setIsOpen(false)}
                        className="
              group relative h-9 w-9 rounded-2xl 
              bg-white/10 hover:bg-white/20 
              backdrop-blur-sm border border-white/20
              text-white/90 hover:text-white
              shadow-lg hover:shadow-xl
              transition-all duration-200 hover:scale-110
            "
                    >
                        ×
                        <span className="absolute inset-0 rounded-2xl bg-white/20 scale-0 group-hover:scale-100 transition-transform origin-center duration-200" />
                    </button>
                </div>

                {/* Subtle divider */}
                <div className="mx-6 h-px bg-gradient-to-r from-white/10 to-white/30" />

                {/* Featured model - SECONDARY ELEVATION */}
                {/* <div className="px-6 pt-4 pb-3">
                    <p className="text-xs font-medium text-slate-300/80 mb-2 tracking-wide">
                        Currently viewing
                    </p>
                    <p className="text-lg font-bold text-white leading-tight drop-shadow-xl mb-4 line-clamp-2">
                        {activeModel.meta.title}
                    </p>

                    <div className="flex items-center justify-between">
                        <button
                            onClick={() => router.push(`/products/${categorySlug}/${subSlug}/${activeModel.meta.slug}`)}
                            className="
                group relative inline-flex items-center gap-2
                bg-gradient-to-r from-blue-500 via-blue-600 to-cyan-500
                px-6 py-2.5 rounded-2xl font-semibold text-white text-sm
                shadow-2xl shadow-blue-500/40
                hover:shadow-3xl hover:shadow-blue-500/60
                hover:scale-[1.02] hover:-translate-y-0.5
                transition-all duration-300
                before:absolute before:inset-0 before:rounded-2xl 
                before:bg-white/20 before:opacity-0 before:group-hover:opacity-100
                before:transition-opacity before:blur-sm
              "
                        >
                            View Model
                            <span className="relative flex h-[30px] w-[30px] items-center justify-center text-white">
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
                                    className="relative text-black"
                                />
                            </span>
                        </button>

                        <div className="text-right text-xs">
                            <span className="text-slate-400 font-mono">{activeIndex + 1}</span>
                            <span className="mx-1 text-slate-500">/</span>
                            <span className="font-bold text-white">{models.length}</span>
                        </div>
                    </div>
                </div> */}

                {models.length > 1 && (
                    <>
                        <div className="mx-6 h-px bg-gradient-to-r from-white/5 to-transparent" />
                        <div className="px-6 pb-5 pt-3">
                            <p className="mb-3 text-xs font-semibold text-slate-300 uppercase tracking-wider">
                                Related Models
                            </p>
                            <div className="space-y-2">
                                {models
                                    .filter((_, i) => i !== activeIndex)
                                    .slice(0, 5)
                                    .map((m, idx) => (
                                        <button
                                            key={m.meta.slug}
                                            onClick={() => router.push(`/products/${categorySlug}/${subSlug}/${m.meta.slug}`)}
                                            className="
                        group flex items-center gap-3 w-full text-left py-2.5 px-3
                        rounded-xl hover:bg-white/10 hover:backdrop-blur-sm
                        hover:shadow-md hover:translate-x-1 transition-all duration-200
                        text-sm font-medium text-white/90 hover:text-white
                      "
                                        >
                                            <span className="w-7 h-7 flex items-center justify-center rounded-lg bg-white/10 text-xs font-bold">
                                                {idx + 1}
                                            </span>
                                            <span className="flex-1 truncate">{m.meta.title}</span>
                                            <span className="relative flex h-[30px] w-[30px] items-center justify-center text-white">
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
                                                    className="relative text-black"
                                                />
                                            </span>

                                        </button>
                                    ))}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
