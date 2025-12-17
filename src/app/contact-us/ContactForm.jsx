'use client';
import { FaUser, FaEnvelope } from 'react-icons/fa';
import { FaClock, FaPhoneAlt,  FaMapMarkerAlt } from 'react-icons/fa';

export default function ContactFormSection() {
    return (
        <section className="w-[95%] mx-auto py-3 ">
            <div className="flex flex-col justify-center items-center md:flex-row overflow-hidden space-x-3 p-5">
                {/* Left: Form */}
                <div className="w-full h-auto md:w-1/2 bg-[#f7f6ff] p-5 space-y-3 rounded-2xl">
                    <div>

                        <h2 className="text-3xl font-extrabold mt-2"> Contact Information Here</h2>
                    </div>

                    <form className="space-y-4">
                        {/* Row 1 */}
                        <div className="flex gap-4">
                            <div className="flex-1 relative">
                                <input
                                    type="text"
                                    placeholder="Name"
                                    className="w-full px-4 py-2 rounded-md shadow-sm pr-10"
                                />
                                <FaUser className="absolute right-3 top-2.5 text-gray-400" />
                            </div>
                            <div className="flex-1 relative">
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    className="w-full px-4 py-2 rounded-md shadow-sm pr-10"
                                />
                                <FaEnvelope className="absolute right-3 top-2.5 text-gray-400" />
                            </div>

                        </div>

                        {/* Row 2 */}
                        <div className="flex gap-4">
                            <div className="flex-1 relative">
                                <input
                                    type="text"
                                    placeholder="Company Name"
                                    className="w-full px-4 py-2 rounded-md shadow-sm pr-10"
                                />
                                <FaUser className="absolute right-3 top-2.5 text-gray-400" />
                            </div>
                            <div className="flex-1 relative">
                                <input
                                    type="text"
                                    placeholder="Designation"
                                    className="w-full px-4 py-2 rounded-md shadow-sm pr-10"
                                />
                                <FaUser className="absolute right-3 top-2.5 text-gray-400" />
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-1 relative">
                                <input
                                    type="text"
                                    placeholder="Phone Number"
                                    className="w-full px-4 py-2 rounded-md shadow-sm pr-10"
                                />
                                <FaUser className="absolute right-3 top-2.5 text-gray-400" />
                            </div>
                            <div className="flex-1 relative">
                                <input
                                    type="text"
                                    placeholder=""
                                    className="w-full px-4 py-2 rounded-md shadow-sm pr-10"
                                />
                                <FaUser className="absolute right-3 top-2.5 text-gray-400" />
                            </div>
                        </div>

                        {/* Message */}
                        <textarea
                            rows="5"
                            placeholder="Message Here..."
                            className="w-full px-4 py-3 rounded-md shadow-sm resize-none"
                        ></textarea>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="bg-blue-600 text-white font-bold py-2 px-6 rounded-md shadow hover:bg-blue-700 transition"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
                {/* Right: Image */}
                <div className="relative w-full md:w-1/2 h-full md:h-auto">
                    <video
                        src="/bg-video.mov"
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover rounded-2xl"
                    />

                    <div className="absolute inset-0 flex items-center justify-center px-4 ">
                        <div className="w-full max-w-md px-4 py-5 shadow-2xl rounded-3xl bg-black/10 text-black ">
                            <h2 className="text-3xl font-bold mb-8">Let’s Get In Touch!</h2>

                            <div className="space-y-6">
                                {/* Item 1 */}
                                <div className="flex items-start gap-4">
                                    <div className="bg-black p-3 rounded-lg">
                                        <FaClock className="text-white text-xl" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-black">Office Time</h4>
                                        <p className="text-sm text-white">Mon–Fri: 10:00Am–09:00Pm</p>
                                    </div>
                                </div>

                                {/* Item 2 */}
                                <div className="flex items-start gap-4">
                                    <div className="bg-black p-3 rounded-lg">
                                        <FaPhoneAlt className="text-white text-xl" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-black">Call Us Any Time</h4>
                                        <p className="text-sm text-blue-100">+(009) 1888 000 2222</p>
                                    </div>
                                </div>

                                {/* Item 3 */}
                                <div className="flex items-start gap-4">
                                    <div className="bg-black p-3 rounded-lg">
                                        <FaEnvelope className="text-white text-xl" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-black">Email Address</h4>
                                        <p className="text-sm text-blue-100">info@techin.com</p>
                                    </div>
                                </div>

                                {/* Item 4 */}
                                <div className="flex items-start gap-4">
                                    <div className="bg-black p-3 rounded-lg">
                                        <FaMapMarkerAlt className="text-white text-xl" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-black">Office Address</h4>
                                        <p className="text-sm text-blue-100">12th Street, New York, USA</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
