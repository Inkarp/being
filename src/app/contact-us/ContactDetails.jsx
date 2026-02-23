'use client';
import { useState, useRef, useEffect } from 'react';
import { FaPaperPlane, FaCheckCircle, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock, FaHeadset, FaUserCog } from 'react-icons/fa';
import Form from './Form';

export default function ContactDetails() {
  

    return (
        <section className="min-h-screen flex md:flex-row flex-col items-center justify-center py-5">
            <div className="w-full grid lg:grid-cols-4 gap-3 items-start relative px-4 bg-[#2F4191]/10 rounded-l-3xl py-8">
                {/* Left Side - Info Content (2/5) */}
                <div  className="lg:col-span-2 w-full space-y-8 text-white flex flex-col items-center justify-start lg:items-start">
                    <div className="text-center lg:text-left">
                        <h2 className="text-4xl font-raleway font-black text-black bg-gradient-to-r from-[#2F4191] to-[#2B7EC2] bg-clip-text mb-4">
                            Let's Connect!
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-[#2F4191] to-[#2B7EC2] mx-auto lg:mx-0 rounded-full" />
                        <div className="space-y-3 w-full">
                            {[
                                { icon: FaClock, title: "Office Hours", info: "Mon–Fri: 09:30AM–05:30PM", color: "from-[#2F4191] to-[#2B7EC2]" },
                                { icon: FaPhoneAlt, title: "Call Anytime", info: "+(009) 1888 000 2222", color: "from-[#2F4191] to-[#2B7EC2]" },
                                { icon: FaEnvelope, title: "Email Us", info: "info@techin.com", color: "from-[#2F4191] to-[#2B7EC2]" },
                                { icon: FaMapMarkerAlt, title: "Our Location", info: "12th Street, New York, USA", color: "from-[#2F4191] to-[#2B7EC2]" },
                            ].map(({ icon: Icon, title, info, color }, idx) => (
                                <div key={idx} className="group/contact flex items-start gap-4 p-4 hover:bg-white/10 rounded-2xl transition-all duration-300 hover:backdrop-blur-sm hover:scale-[1.02] w-full">
                                    <div className={`w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-r ${color} shadow-lg group-hover/contact:rotate-12 transition-transform duration-300 flex-shrink-0`}>
                                        <Icon className="w-7 h-7 text-white" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-[#2F4191] text-lg mb-1">{title}</h4>
                                        <p className="text-black font-medium text-lg">{info}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Middle Section - 3 Contact Cards in ONE ROW on LG */}
                <div className="lg:col-span-2 w-full space-y-4">
                    {/* Service Queries */}
                    <h2 className="text-4xl font-raleway font-black text-black bg-gradient-to-r from-[#2F4191] to-[#2B7EC2] bg-clip-text mb-4">
                        Reach Us
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-[#2F4191] to-[#2B7EC2] mx-auto lg:mx-0 rounded-full" />
                    <div className="group bg-[#2F4191] p-3 rounded-2xl transition-all duration-300 hover:scale-[1.02] shadow-lg">
                        <div className="flex items-start gap-5">
                            <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-r from-green-500 to-blue-500 shadow-lg group-hover:rotate-[360deg] transition-transform duration-500">
                                <FaHeadset className="w-7 h-7 text-white" />
                            </div>
                            <div className="flex flex-col gap-3 min-w-0 flex-1">
                                <h4 className="font-bold text-white text-lg">Service Queries</h4>
                                <div className="space-y-2 text-white text-lg">
                                    <p className="flex items-center gap-2">
                                        <FaPhoneAlt className="text-white/70" />
                                        +91 9030357676
                                    </p>
                                    <p className="flex items-center gap-2 text-lg">
                                        <FaEnvelope className="text-white/70" />
                                        <a href="mailto:service@techin.com" className="hover:underline truncate">service@techin.com</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Support */}
                    <div className="group bg-[#2F4191] p-3 rounded-2xl transition-all duration-300 hover:scale-[1.02] shadow-lg">
                        <div className="flex items-start gap-5">
                            <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 shadow-lg group-hover:rotate-[360deg] transition-transform duration-500">
                                <FaPhoneAlt className="w-7 h-7 text-white" />
                            </div>
                            <div className="flex flex-col gap-3 min-w-0 flex-1">
                                <h4 className="font-bold text-white text-lg">Support</h4>
                                <div className="space-y-2 text-white text-lg">
                                    <p className="flex items-center gap-2">
                                        <FaPhoneAlt className="text-white/70" />
                                        +91 9030357676
                                    </p>
                                    <p className="flex items-center gap-2 text-lg">
                                        <FaEnvelope className="text-white/70" />
                                        <a href="mailto:support@techin.com" className="hover:underline truncate">support@techin.com</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Account Queries */}
                    <div className="group bg-[#2F4191] p-3 rounded-2xl transition-all duration-300 hover:scale-[1.02] shadow-lg">
                        <div className="flex items-start gap-5">
                            <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg group-hover:rotate-[360deg] transition-transform duration-500">
                                <FaUserCog className="w-7 h-7 text-white" />
                            </div>
                            <div className="flex flex-col gap-3 min-w-0 flex-1">
                                <h4 className="font-bold text-white text-lg">Account Queries</h4>
                                <div className="space-y-2 text-white text-lg">
                                    <p className="flex items-center gap-2">
                                        <FaPhoneAlt className="text-white/70" />
                                        +91 9030357676
                                    </p>
                                    <p className="flex items-center gap-2 text-lg">
                                        <FaEnvelope className="text-white/70" />
                                        <a href="mailto:accounts@techin.com" className="hover:underline truncate">accounts@techin.com</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Form />
        </section>
    );
}
