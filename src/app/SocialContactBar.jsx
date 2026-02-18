"use client";
import { FaWhatsapp, FaInstagram, FaLinkedinIn, FaFacebookF } from "react-icons/fa";

export default function SocialContactBar() {
  const buttons = [
    // {
    //   icon: <FaLinkedinIn size={16} />,
    //   url: "https://www.linkedin.com/company/yourcompany",
    //   bg: "bg-[#0A66C2]",
    // },
    // {
    //   icon: <FaInstagram size={16} />,
    //   url: "https://www.instagram.com/yourpage",
    //   bg: "bg-pink-500",
    // },
    // {
    //   icon: <FaFacebookF size={16} />,
    //   url: "https://www.facebook.com/yourpage",
    //   bg: "bg-[#1877F2]",
    // },
    {
      icon: <FaWhatsapp size={28}  />,
      url: "https://wa.me/919030357676",
      bg: "bg-[#25D366]",
    },
  ];

  return (
    <div className="fixed left-3 bottom-2 z-40">
      {/* <div className="flex flex-col items-center gap-4 bg-white/70 border-b-2 border border-black/20 backdrop-blur px-2 py-3 rounded-full shadow-xl"> */}
        {buttons.map((btn, index) => (
          <button
            key={index}
            onClick={() => window.open(btn.url, "_blank")}
            className={`
              lg:w-14 lg:h-14 w-10 h-10 flex items-center justify-center text-white rounded-full
              ${btn.bg}
              border-b-2 border-black/50
              hover:border-[#2F4191]
              transition
            `}
          >
            {btn.icon}
          </button>
        ))}
      </div>
    // </div>
  );
}
