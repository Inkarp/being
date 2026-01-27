"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function FestivalUpdates({ link = "/" }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // show after slight delay
    const showTimer = setTimeout(() => {
      setShow(true);
    }, 800);

    // auto hide after 8 seconds
    const hideTimer = setTimeout(() => {
      setShow(false);
    }, 8800);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!show) return null;

  return (
    <div className="fixed right-0 top-45 -translate-y-1/2 z-[999] transition-all duration-700 animate-slideInRight">
      <div className="relative bg-white backdrop-blur-xl shadow-2xl shadow-[#FF6B35]/40 rounded-2xl rounded-r-none overflow-hidden w-[250px] border border-[#2F4191] group">

        {/* Close Button */}
        <button
          onClick={() => setShow(false)}
          className="absolute top-3 right-3 bg-black/70 text-white text-sm px-3 py-1.5 rounded-xl z-10"
        >
          ✕
        </button>

        {/* Festival Image */}
        <a href={link}>
          <Image
            src="/theme.webp"
            alt="Festival Updates"
            width={340}
            height={200}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
            priority
          />
        </a>
      </div>
    </div>
  );
}
