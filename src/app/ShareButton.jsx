"use client";
import { useState } from "react";
import { FaWhatsapp, FaInstagram, FaLinkedinIn, FaFacebookF } from "react-icons/fa";
import { HiChatBubbleLeftRight } from "react-icons/hi2";

export default function SocialContactBar() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <>
      {/* <Chatbot open={chatOpen} onClose={() => setChatOpen(false)} /> */}

      <div className="fixed right-2 top-1/2 -translate-y-1/2 z-40">
        <div className="flex flex-col items-center gap-4 bg-white/70 border backdrop-blur p-2 rounded-2xl shadow-xl">
          {/* <button
            onClick={() => setChatOpen(true)}
            className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:scale-110 transition"
            title="Chat with us"
          >
            <HiChatBubbleLeftRight size={20} />
          </button> */}

          <button
            onClick={() => window.open("https://www.linkedin.com/company/yourcompany", "_blank")}
            className="w-9 h-9 rounded-full bg-[#0A66C2] text-white flex items-center justify-center"
          >
            <FaLinkedinIn size={16} />
          </button>

          <button
            onClick={() => window.open("https://www.instagram.com/yourpage", "_blank")}
            className="w-9 h-9 rounded-full bg-pink-500 text-white flex items-center justify-center"
          >
            <FaInstagram size={16} />
          </button>

          <button
            onClick={() => window.open("https://www.facebook.com/yourpage", "_blank")}
            className="w-9 h-9 rounded-full bg-[#1877F2] text-white flex items-center justify-center"
          >
            <FaFacebookF size={16} />
          </button>

          <button
            onClick={() => window.open("https://wa.me/919030357676", "_blank")}
            className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center"
          >
            <FaWhatsapp size={20} />
          </button>
        </div>
      </div>
    </>
  );
}
