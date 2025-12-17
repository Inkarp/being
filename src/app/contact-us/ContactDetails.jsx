'use client';
import { FaUser, FaEnvelope, FaClock, FaPhoneAlt, FaMapMarkerAlt, FaArrowRight } from 'react-icons/fa';

export default function ContactDetails() {
    return (
        <section className="relative w-full h-[550px] overflow-hidden">
            {/* Fullscreen background video */}
            <video
                src="/bg-video.mov"
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Dark overlay for readability (optional) */}
            <div className="absolute inset-0 bg-black/40" />
            {/* Foreground content */}
            <div className="relative z-10 w-[80%] mx-auto h-full flex flex-col md:flex-row items-center justify-center gap-6 py-6">
                {/* Left: Form */}
                <div className="w-full md:w-1/2 bg-[#f7f6ff]/95 p-5 space-y-4 rounded-2xl shadow-xl">
                    <h2 className="text-3xl font-extrabold mt-2">Contact Us Here</h2>

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

                        {/* Row 3 */}
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
                                    placeholder="Subject"
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

                        <div className="flex items-center gap-3 bg-[#2F3F8D] px-3 py-2 rounded-full w-fit">
                            <span className="text-white font-medium text-[16px]">Send Message</span>
                            {/* Gear SVG with arrow inside */}
                            <div className="relative w-[30px] h-[30px] text-white">
                                <svg
                                    width="30"
                                    height="30"
                                    viewBox="0 0 30 30"
                                    fill="currentColor"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className='spin-slow'
                                >
                                    <path d="M14.2257 0.947522C14.6258 0.457905 15.3742 0.457905 15.7743 0.947522L16.8781 2.29817C17.181 2.66879 17.704 2.77283 18.1256 2.54633L19.6623 1.72088C20.2193 1.42165 20.9107 1.70806 21.093 2.31352L21.5959 3.98376C21.7339 4.44207 22.1773 4.73834 22.6535 4.69044L24.3891 4.51587C25.0182 4.45258 25.5474 4.98179 25.4841 5.61093L25.3096 7.34647C25.2617 7.8227 25.5579 8.2661 26.0162 8.40409L27.6865 8.90697C28.2919 9.08926 28.5783 9.7807 28.2791 10.3377L27.4537 11.8744C27.2272 12.296 27.3312 12.819 27.7018 13.1219L29.0525 14.2257C29.5421 14.6258 29.5421 15.3742 29.0525 15.7743L27.7018 16.8781C27.3312 17.181 27.2272 17.704 27.4537 18.1256L28.2791 19.6623C28.5783 20.2193 28.2919 20.9107 27.6865 21.093L26.0162 21.5959C25.5579 21.7339 25.2617 22.1773 25.3096 22.6535L25.4841 24.3891C25.5474 25.0182 25.0182 25.5474 24.3891 25.4841L22.6535 25.3096C22.1773 25.2617 21.7339 25.5579 21.5959 26.0162L21.093 27.6865C20.9107 28.2919 20.2193 28.5783 19.6623 28.2791L18.1256 27.4537C17.704 27.2272 17.181 27.3312 16.8781 27.7018L15.7743 29.0525C15.3742 29.5421 14.6258 29.5421 14.2257 29.0525L13.1219 27.7018C12.819 27.3312 12.296 27.2272 11.8744 27.4537L10.3377 28.2791C9.7807 28.5783 9.08926 28.2919 8.90697 27.6865L8.40409 26.0162C8.2661 25.5579 7.8227 25.2617 7.34647 25.3096L5.61093 25.4841C4.98179 25.5474 4.45258 25.0182 4.51587 24.3891L4.69044 22.6535C4.73834 22.1773 4.44207 21.7339 3.98376 21.5959L2.31352 21.093C1.70806 20.9107 1.42165 20.2193 1.72088 19.6623L2.54633 18.1256C2.77283 17.704 2.66879 17.181 2.29817 16.8781L0.947522 15.7743C0.457905 15.3742 0.457905 14.6258 0.947522 14.2257L2.29817 13.1219C2.66879 12.819 2.77283 12.296 2.54633 11.8744L1.72088 10.3377C1.42165 9.7807 1.70806 9.08926 2.31352 8.90697L3.98376 8.40409C4.44207 8.2661 4.73834 7.8227 4.69044 7.34647L4.51587 5.61093C4.45258 4.98179 4.98179 4.45258 5.61093 4.51587L7.34647 4.69044C7.8227 4.73834 8.2661 4.44207 8.40409 3.98376L8.90697 2.31352C9.08926 1.70806 9.7807 1.42165 10.3377 1.72088L11.8744 2.54633C12.296 2.77283 12.819 2.66879 13.1219 2.29817L14.2257 0.947522Z" />
                                </svg>

                                {/* Center arrow */}
                                <FaArrowRight
                                    size={12}
                                    className="absolute top-1/2 left-1/2 text-black transform -translate-x-1/2 -translate-y-1/2 "
                                />
                            </div>
                        </div>
                    </form>
                </div>

                {/* Right: Contact info card */}
                <div className="w-full md:w-1/2 ">
                    <div className="w-full max-w-md mx-auto px-6 py-6 shadow-2xl rounded-3xl bg-black/30 text-white backdrop-blur">
                        <h2 className="text-3xl font-bold mb-8">Let’s Get In Touch!</h2>

                        <div className="space-y-6">
                            {/* Item 1 */}
                            <div className="flex items-start gap-4">
                                <div className="bg-black p-3 rounded-lg">
                                    <FaClock className="text-white text-xl spin-slow" />
                                </div>
                                <div>
                                    <h4 className="font-bold">Office Time</h4>
                                    <p className="text-sm text-gray-200">Mon–Fri: 10:00Am–09:00Pm</p>
                                </div>
                            </div>

                            {/* Item 2 */}
                            <div className="flex items-start gap-4 bounce-right">
                                <div className="bg-black p-3 rounded-lg">
                                    <FaPhoneAlt className="text-white text-xl" />
                                </div>
                                <div>
                                    <h4 className="font-bold">Call Us Any Time</h4>
                                    <p className="text-sm text-blue-200">+91 9030357676</p>
                                </div>
                            </div>

                            {/* Item 3 */}
                            <div className="flex items-start gap-4 bounce-right">
                                <div className="bg-black p-3 rounded-lg">
                                    <FaEnvelope className="text-white text-xl " />
                                </div>
                                <div>
                                    <h4 className="font-bold">Email Address</h4>
                                    <p className="text-sm text-blue-200">info@techin.com</p>
                                </div>
                            </div>

                            {/* Item 4 */}
                            <div className="flex items-start gap-4">
                                <div className="bg-black p-3 rounded-lg">
                                    <FaMapMarkerAlt className="text-white text-xl spin-slow" />
                                </div>
                                <div>
                                    <h4 className="font-bold">Office Address</h4>
                                    <p className="text-sm text-blue-200">12th Street, New York, USA</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
