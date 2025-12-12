// components/ContactFormSection.jsx
import { FaUser, FaEnvelope } from 'react-icons/fa';

export default function ContactFormSection() {
    return (
        <section className="w-[95%] mx-auto py-12">
            <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-xl overflow-hidden">

                {/* Left: Form */}
                <div className="w-full md:w-1/2 bg-[#f7f6ff] p-10 space-y-6">
                    <div>
                        <p className="text-blue-600 font-bold flex items-center gap-2">
                            <span>💠</span> Contact Us <span>💠</span>
                        </p>
                        <h2 className="text-3xl font-extrabold mt-2">TechIn Contact Information Here</h2>
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
                <div className="w-full md:w-1/2">
                    <img
                        src="/about.jpg" // Replace with actual image
                        alt="Contact Visual"
                        className="w-full h-full object-cover rounded-l-none rounded-r-xl"
                    />
                </div>
            </div>
        </section>
    );
}
