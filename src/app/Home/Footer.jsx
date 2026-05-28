'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
    FaFacebookF,
    FaInstagram,
    FaLinkedin,
    FaTwitter
} from 'react-icons/fa';
import { FaSquareXTwitter } from 'react-icons/fa6';
import { HiH2 } from 'react-icons/hi2';

const socialLinks = [
    {
        label: 'Facebook',
        href: 'https://www.facebook.com/people/Being-India/61580278097295/',
        icon: FaFacebookF,
    },
    {
        label: 'Instagram',
        href: 'https://www.instagram.com/beingindia_scientific',
        icon: FaInstagram,
    },
    {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/company/being-scientific-india',
        icon: FaLinkedin,
    },
    {
        label: 'Twitter',
        href: 'https://x.com/BEINGlabindia',
        icon: FaSquareXTwitter ,
    },
];

const quickLinks = [
    [
        { label: 'Home', href: '/' },
        { label: 'Contact Us', href: '/contact-us' },
        { label: 'About Us', href: '/about-us' },
    ],
    [
        { label: 'Products', href: '/products' },
        { label: 'Events', href: '/events' },
        { label: 'Blogs', href: '/blogs' },
        // { label: 'Product Profile', href: '/product-profile' },
    ],
];

const productLinks = [
    [
        { label: 'Ovens', href: '/products/laboratory-ovens' },
        { label: 'Incubators', href: '/products/incubators' },
        { label: 'Chillers', href: '/products/chillers' },
        { label: 'Rotary Evaporators', href: '/products/rotary-evaporators' },
        { label: 'Water baths', href: '/products/water-baths' },
    ],
    [
        { label: 'Pumps', href: '/products/pumps' },
        { label: 'Safety Cabinets', href: '/products/biological-safety-cabinets' },
        { label: 'Freezers', href: '/products/freezers' },
        { label: 'Muffle Furnace', href: '/products/muffle-furnace' },
    ],
];

function FooterLink({ href, children }) {
    return (
        <Link href={href} className="relative inline-block group">
            {children}
            <span className="absolute left-1/2 -bottom-1 h-[1px] w-0 bg-white transition-all duration-300 group-hover:w-full group-hover:left-0" />
        </Link>
    );
}

function ContactCard({ icon, alt, title, children }) {
    return (
        <div className="p-3 sm:p-4 flex items-start gap-3 sm:gap-4 group bg-white rounded-2xl md:rounded-3xl">
            <Image
                src={icon}
                alt={alt}
                width={40}
                height={40}
                className="h-10 w-10 transition duration-300 group-hover:rotate-360 bg-[#2B7EC2] rounded-full p-1 flex-shrink-0"
            />
            <div className="min-w-0">
                <h4 className="text-black font-bold text-base sm:text-lg mb-1">
                    {title}
                </h4>
                {children}
            </div>
        </div>
    );
}

function LinkColumn({ title, groups }) {
    return (
        <div>
            <h2 className="text-lg sm:text-xl font-bold border-b-2 border-white inline-block mb-4">
                {title}
            </h2>
            <div className="grid grid-cols-2 gap-5">
                {groups.map((group, index) => (
                    <ul key={index} className="space-y-2 text-sm sm:text-base">
                        {group.map((item) => (
                            <li key={item.href}>
                                <FooterLink href={item.href}>{item.label}</FooterLink>
                            </li>
                        ))}
                    </ul>
                ))}
            </div>
        </div>
    );
}

export default function Footer() {
    return (
        <footer className="bg-[#2B7EC2] text-white font-raleway">
            <div className="w-full mx-auto py-6 md:py-3 px-4 sm:px-6 lg:px-10 flex flex-col lg:flex-row gap-7 lg:gap-8">
                <div className="lg:w-1/4 flex flex-col justify-center gap-3">
                    <ContactCard icon="/location.svg" alt="Location" title="Office Address">
                        <h2 className="text-sm sm:text-base leading-relaxed font-semibold text-[#2F4191]">
                            Nacharam, Habsiguda, Hyderabad, Telangana, 500076
                        </h2>
                    </ContactCard>

                    <ContactCard icon="/mail.svg" alt="Email" title="Email Address">
                        <h2 className="text-sm sm:text-base break-all font-semibold text-[#2F4191] animate-bounce">
                            info@beinglab.co.in
                        </h2>
                    </ContactCard>

                    <ContactCard icon="/phone.svg" alt="Phone" title="Call Us For Support">
                        <h2 className="text-sm sm:text-base font-semibold text-[#2F4191] animate-bounce">
                            +91 9966634008
                        </h2>
                    </ContactCard>
                </div>

                <div className="lg:w-3/4 flex flex-col justify-center items-start lg:items-center gap-8 lg:gap-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 sm:gap-10 xl:gap-14 w-full">
                        <LinkColumn title="Quick Links" groups={quickLinks} />
                        <LinkColumn title="Explore Products" groups={productLinks} />

                        <div className="space-y-5">
                            <h2 className="text-lg sm:text-xl font-bold border-b-2 border-white inline-block mb-4">
                                Stay Connected
                            </h2>

                            <div className="flex gap-4">
                                {socialLinks.map(({ label, href, icon: Icon }) => (
                                    <a
                                        key={label}
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={`Follow Being India on ${label}`}
                                        className="bg-white p-3 rounded-full hover:text-white hover:bg-black transition-all duration-300 text-[#2B7EC2] cursor-pointer hover:scale-110"
                                    >
                                        <Icon />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white py-4">
                <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row gap-2 sm:gap-4 justify-between items-center text-xs sm:text-sm text-black text-center">
                  <Link href="/privacy-policy" className='hover:underline' > <p>Privacy Policy</p></Link> 
                    <p>
                        Copyright © <span className="font-semibold">Beinglab</span>. All rights reserved.
                    </p>
                <Link href={"/terms-and-conditions"} className='hover:underline'>    <p>Terms and Conditions</p></Link>
                </div>
            </div>
        </footer>
    );
}
