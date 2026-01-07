"use client";

import { usePathname } from "next/navigation";
import { FaShareAlt, FaWhatsapp, FaInstagram } from "react-icons/fa";

export default function ShareButton() {
    const pathname = usePathname();

    // ✅ show only on /products pages
    if (!pathname?.startsWith("/products/")) return null;


    const baseUrl =
        typeof window !== "undefined" ? window.location.origin : "";
    const currentUrl = `${baseUrl}${pathname}`;

    const handleWhatsAppShare = () => {
        const text = encodeURIComponent(currentUrl);
        window.open(`https://wa.me/?text=${text}`, "_blank");
    };

    const handleInstagramShare = () => {
        if (navigator.share) {
            navigator.share({
                title: document.title,
                url: currentUrl,
            });
        } else {
            alert("Instagram sharing is not supported in this browser.");
        }
    };

    return (
        <div className="fixed left-4 top-1/2 -translate-y-1/2 z-50">
            <div className="group relative flex flex-col items-center">

                {/* Social icons (vertical hover) */}
                <div
                    className="flex flex-col items-center gap-3 mb-3
                     opacity-0 translate-y-4 pointer-events-none
                     group-hover:opacity-100 group-hover:translate-y-0
                     group-hover:pointer-events-auto
                     transition-all duration-300"
                >
                    <button
                        onClick={handleWhatsAppShare}
                        className="w-10 h-10 rounded-full bg-green-500 text-white
                       flex items-center justify-center shadow-md
                       hover:bg-green-600 transition"
                        aria-label="Share on WhatsApp"
                    >
                        <FaWhatsapp size={18} />
                    </button>

                    <button
                        onClick={handleInstagramShare}
                        className="w-10 h-10 rounded-full bg-pink-500 text-white
                       flex items-center justify-center shadow-md
                       hover:bg-pink-600 transition"
                        aria-label="Share on Instagram"
                    >
                        <FaInstagram size={18} />
                    </button>
                </div>

                {/* Main share button */}
                <button
                    className="w-12 h-12 rounded-full bg-[#2F4191] text-white
                     flex items-center justify-center shadow-lg
                     hover:bg-[#2B7EC2] transition"
                    aria-label="Share"
                >
                    <FaShareAlt size={18} />
                </button>

            </div>
        </div>
    );
}
