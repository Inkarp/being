"use client";
import { FaWhatsapp, FaInstagram, FaLinkedinIn, FaFacebookF } from "react-icons/fa";

export default function ShareButton() {
  const socialLinks = [
    {
      icon: <FaLinkedinIn size={28} />,
      url: "https://www.linkedin.com/company/yourcompany",
      bg: "bg-white",
      textColor:"text-blue-600"
    },
    {
      icon: <FaInstagram size={28} />,
      url: "https://www.instagram.com/yourpage",
      bg: "bg-white",
      textColor:"text-pink-500"
    },
    {
      icon: <FaFacebookF size={28} />,
      url: "https://www.facebook.com/yourpage",
      bg: "bg-white",
      textColor:"text-blue-700"
    },
    {
      icon: <FaWhatsapp size={28} />,
      url: "https://wa.me/919030357676",
      bg: "bg-white",
      textColor:"text-green-500"
    },
  ];

  return (
    <div className="fixed right-2 top-1/2 -translate-y-1/2 z-40">
      <div className="flex flex-col items-center bg-white/70 border border-black backdrop-blur rounded-full shadow-xl overflow-hidden">
        
        {socialLinks.map((item, index) => (
          <button
            key={index}
            onClick={() => window.open(item.url, "_blank")}
            className={`
              w-12 h-12 flex items-center text-black justify-center hover:border-r-2 border-[#2F4191] transition-all duration-200
              ${item.bg} ${item.textColor} 
              ${index !== socialLinks.length - 1 ? "border-b border-black/20" : ""}
            `}
          >
            {item.icon}
          </button>
        ))}

      </div>
    </div>
  );
}
