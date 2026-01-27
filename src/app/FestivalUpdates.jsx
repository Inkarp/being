"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function FestivalUpdates({ link = "/" }) {  // Default link if none passed
  const [show, setShow] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem("promoSeen");
    if (!seen) {
      setTimeout(() => setShow(true), 800);
      setTimeout(() => {
        setShow(false);
        localStorage.setItem("promoSeen", "true");
      }, 8000); // Auto-hide after 8s
    }
  }, []);

  if (!show) return null;

  return (
    <div className="fixed left-0 top-1/2 -translate-y-1/2 z-[999] transition-all duration-700 animate-slideInRight">
      <div className="relative bg-gradient-to-br from-black/95 via-slate-900/90 to-black/80 backdrop-blur-xl shadow-2xl shadow-[#FF6B35]/40 rounded-2xl rounded-r-none overflow-hidden w-[340px] border border-orange-500/30 hover:shadow-3xl hover:shadow-[#FF6B35]/60 group">
        {/* Close Button */}
        <button
          onClick={() => {
            setShow(false);
            localStorage.setItem("promoSeen", "true");
          }}
          className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-white text-sm px-3 py-1.5 rounded-xl font-medium hover:bg-orange-500/80 transition-all duration-200 z-10 shadow-lg"
          title="Close"
        >
          ✕
        </button>

        {/* Festival Image */}
        <Image
          src="https://images.unsplash.com/photo-1701203651310-1a6ce5c040f0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=320&h=180&q=90"  // Vibrant Pongal harvest festival (public, optimized)
          alt="Pongal Festival Special Updates - Celebrate with us!"
          width={340}
          height={200}
          className="w-full h-48 object-cover brightness-110 group-hover:scale-105 transition-transform duration-500"
          priority  // Preload for instant show
        />

        {/* CTA Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
          <h3 className="text-xl font-bold text-white mb-2 drop-shadow-lg">Pongal Special!</h3>
          <p className="text-orange-100 text-sm mb-4 opacity-90">Get latest festival updates & offers</p>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 text-white px-6 py-3 rounded-xl font-semibold text-sm shadow-xl hover:shadow-2xl hover:shadow-orange-500/50 transform hover:scale-105 transition-all duration-300"
          >
            View Updates →
          </a>
        </div>
      </div>
    </div>
  );
}
