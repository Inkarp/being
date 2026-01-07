"use client";

import { FaWhatsapp, FaInstagram, FaLinkedinIn, FaFacebook } from "react-icons/fa";

export default function SocialContactBar() {
  const handleWhatsApp = () => {
    window.open("https://www.instagram.com/yourpage", "_blank"); // replace number
  };

  const handleInstagram = () => {
    window.open("https://www.instagram.com/yourpage", "_blank");
  };

  const handleLinkedIn = () => {
    window.open("https://www.linkedin.com/company/yourcompany", "_blank");
  };

  return (
    <div className="fixed right-2 top-1/3 -translate-y-1/2 z-50 animate-bounce p-1 rounded-2xl ">
      <div className="flex flex-col items-center gap-3">

        {/* WhatsApp */}
        <button
          onClick={handleWhatsApp}
          className="w-8 h-8 rounded-full bg-blue-600 text-white
                     flex items-center justify-center shadow-lg 
                     hover:bg-blue-500 transition"
          aria-label="Chat on WhatsApp"
          title="Talk to us on WhatsApp"
        >
          <FaFacebook size={16} />
            {/* <span className="absolute -top-6 text-xs font-semibold text-black p-1 bg-blue-100 rounded-full">
              Follow
            </span> */}
        </button>

        {/* Instagram */}
        <button
          onClick={handleInstagram}
          className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-purple-600
                     text-white flex items-center justify-center shadow-lg
                     hover:opacity-90 transition"
          aria-label="Visit Instagram"
          title="Follow us on Instagram"
        >
          <FaInstagram size={16} />
        </button>

        {/* LinkedIn */}
        <button
          onClick={handleLinkedIn}
          className="w-8 h-8 rounded-full bg-[#0A66C2] text-white
                     flex items-center justify-center shadow-lg
                     hover:bg-[#004182] transition"
          aria-label="Visit LinkedIn"
          title="Connect on LinkedIn"
        >
          <FaLinkedinIn size={16} />
        </button>

      </div>
    </div>
  );
}
