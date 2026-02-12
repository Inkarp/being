import { FaUser, FaEnvelope, FaClock, FaPhoneAlt, FaMapMarkerAlt, FaHeadset, FaUserCog } from 'react-icons/fa';

export default function ContactDetails() {
    return (
        <div className="relative h-full group">
            <div className="relative z-10 lg:flex sm:flex-col items-center justify-center h-full px-3 py-5">
                {/* Left Section: Original Cards */}
                <div className="w-full space-y-8 text-white flex flex-col items-center justify-center ">
                    <div className="text-center">
                        <h2 className="text-4xl font-raleway font-black text-black bg-gradient-to-r from-[#2F4191] to-[#2B7EC2] bg-clip-text mb-4">
                            Let’s Connect!
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-[#2F4191] to-[#2B7EC2] mx-auto rounded-full" />
                    </div>

                    <div className="space-y-3">
                        {[
                            { icon: FaClock, title: "Office Hours", info: "Mon–Fri: 09:30AM–05:30PM", color: "from-[#2F4191] to-[#2B7EC2]" },
                            { icon: FaPhoneAlt, title: "Call Anytime", info: "+(009) 1888 000 2222", color: "from-[#2F4191] to-[#2B7EC2]" },
                            { icon: FaEnvelope, title: "Email Us", info: "info@techin.com", color: "from-[#2F4191] to-[#2B7EC2]" },
                            { icon: FaMapMarkerAlt, title: "Our Location", info: "12th Street, New York, USA", color: "from-[#2F4191] to-[#2B7EC2]" },
                        ].map(({ icon: Icon, title, info, color }, idx) => (
                            <div key={idx} className="group/contact flex items-start gap-4 p-4 hover:bg-white/10 rounded-2xl transition-all duration-300 hover:backdrop-blur-sm hover:scale-[1.02]">
                                <div className={`w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-r ${color} shadow-lg group-hover/contact:rotate-12 transition-transform duration-300 flex-shrink-0`}>
                                    <Icon className="w-7 h-7 text-white shadow-md" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-[#2F4191] text-lg mb-1">{title}</h4>
                                    <p className="text-black font-medium text-lg">{info}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Section: New Specialized Cards */}
                <div className="w-full  space-y-8 text-white flex flex-col items-center justify-center">
                    <div className="text-center">
                        <h2 className="text-4xl font-raleway font-black text-black bg-gradient-to-r from-[#2F4191] to-[#2B7EC2] bg-clip-text mb-4">
                            Reach Us
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-[#2F4191] to-[#2B7EC2] mx-auto rounded-full" />
                    </div>

                    <div className="space-y-3 grid grid-cols-2 gap-5">
                        {[
                            { icon: FaHeadset, title: "Service Queries", info: "+91 9030357676", color: "from-green-500 to-blue-500" },
                            { icon: FaEnvelope, title: "Service Email", info: "service@techin.com", color: "from-green-500 to-blue-500" },
                            { icon: FaPhoneAlt, title: "Support Phone", info: "+91 9030357676", color: "from-orange-500 to-red-500" },
                            { icon: FaEnvelope, title: "Support Mail", info: "support@techin.com", color: "from-orange-500 to-red-500" },
                            { icon: FaUserCog, title: "Account Queries", info: "+91 9030357676", color: "from-purple-500 to-pink-500" },
                            { icon: FaEnvelope, title: "Account Email", info: "accounts@techin.com", color: "from-purple-500 to-pink-500" },
                        ].map(({ icon: Icon, title, info, color }, idx) => (                         
                            <div key={idx} className="group/contact bg-[#2F4191] flex items-start gap-4 p-4 rounded-2xl transition-all duration-300 hover:backdrop-blur-sm hover:scale-[1.02]">
                                <div className={`w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-r ${color} shadow-lg group-hover/contact:rotate-360 transition-transform duration-500 flex-shrink-0`}>
                                    <Icon className="w-7 h-7 text-white  " />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white text-lg mb-1">{title}</h4>
                                    <p className="text-white font-medium text-lg">{info}</p>
                                </div>
                            </div>                        
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
