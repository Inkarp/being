"use client";

import { FaWhatsapp, FaInstagram, FaLinkedinIn, FaFacebook, FaFacebookF } from "react-icons/fa";
import { HiChatBubbleLeftRight } from "react-icons/hi2";

export default function SocialContactBar() {
  const handleWhatsApp = () => {
    window.open("https://wa.me/919030357676", "_blank"); // replace number
  };

  const handleChat = () => {
    alert("Chat feature coming soon 🚀");
    // or open modal / Tawk / Freshchat later
  };

  const handleInstagram = () => {
    window.open("https://www.instagram.com/yourpage", "_blank");
  };

  const handleLinkedIn = () => {
    window.open("https://www.linkedin.com/company/yourcompany", "_blank");
  };

  const handleFacebook = () => {
    window.open("https://www.facebook.com/yourpage", "_blank");
  };

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 animate-bounce hover:animate-none">
      <div className="flex flex-col items-center gap-4 bg-white/50 backdrop-blur p-3 rounded-2xl shadow-xl">

        {/* Chat with Us */}
        {/* <button
          onClick={handleChat}
          className="w-10 h-10 rounded-full bg-blue-600 text-white
                     flex items-center justify-center shadow-md
                     hover:scale-110 transition"
          aria-label="Chat with us"
          title="Chat with us"
        >
          <HiChatBubbleLeftRight size={20} />
        </button> */}
        {/* LinkedIn */}
        <button
          onClick={handleLinkedIn}
          className="w-9 h-9 rounded-full bg-[#0A66C2] text-white
                     flex items-center justify-center shadow
                     hover:scale-110 transition"
          aria-label="LinkedIn"
        >
          <FaLinkedinIn size={16} />
        </button>
        {/* Instagram */}
        <button
          onClick={handleInstagram}
          className="w-9 h-9 rounded-full bg-pink-500
                     text-white flex items-center justify-center shadow
                     hover:scale-110 transition"
          aria-label="Instagram"
        >
          <FaInstagram size={16} />
        </button>
        {/* Facebook */}
        <button
          onClick={handleFacebook}
          className="w-9 h-9 rounded-full bg-[#1877F2] text-white
                     flex items-center justify-center shadow
                     hover:scale-110 transition"
          aria-label="Facebook"
          title="Follow us on Facebook"
        >
          <FaFacebookF size={16} />
        </button>

        {/* WhatsApp */}
        <button
          onClick={handleWhatsApp}
          className="w-10 h-10 rounded-full bg-[#25D366] text-white
                     flex items-center justify-center shadow-md
                     hover:scale-110 transition"
          aria-label="Chat on WhatsApp"
          title="Chat on WhatsApp"
        >
          <FaWhatsapp size={20} />
        </button>

      </div>
    </div>
  );
}
