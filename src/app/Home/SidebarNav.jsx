"use client";
import { useState } from "react";
import Link from "next/link";
import {
    FaHome,
    FaLayerGroup,
    FaBuilding,
    FaTags,
    FaEdit,
} from "react-icons/fa";

const menu = [
    { icon: FaHome, label: "Home", href: "/" },
    { icon: FaLayerGroup, label: "Products", href: "/products" },
    { icon: FaBuilding, label: "Events", href: "/events" },
    { icon: FaTags, label: "Blogs", href: "/blog" },
    { icon: FaEdit, label: "About Us", href: "/about-us" },
    { icon: FaTags, label: "Contact Us", href: "/contact-us" },
    { icon: FaTags, label: "Product Profile", href: "/product-profile" },
];


export default function SidebarNav() {
    const [active, setActive] = useState(0);

    return (
        <>
        <div className="w-[80px] relative flex justify-center z-100">
            {/* Curved Background */}
            <div className="fixed left-2 top-10 bottom-10 w-[110px] bg-white shadow-xl rounded-[60px] border border-gray-200 flex flex-col items-center py-6 gap-8">

                {menu.map((item, index) => {
                    const Icon = item.icon;
                    return (
                        <Link
                            key={index}
                            href={item.href}
                            onClick={() => setActive(index)}
                            className={`flex flex-col items-center gap-2 w-full py-4 transition 
                ${active === index ? "bg-[#e9f3ff]" : "hover:bg-gray-50"}
              `}
                        >
                            <Icon className="text-[#2F4191]" size={22} />
                            <span className="text-[22px] text-gray-600 text-center px-2">
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </div>
        </>
    );
}
