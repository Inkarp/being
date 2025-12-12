import { FaClock, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

export default function ContactDetails() {
    return (
        <section className="w-[95%]  mx-auto py-12 overflow-hidden">
            <div className="flex flex-col md:flex-row">
                {/* Left: Image */}
                <div className="w-full md:w-1/2">
                    <img
                        src="/contact.png" // Replace with actual image path
                        alt="Contact Details Visual"
                        className="w-full h-full object-contain rounded-l-xl"
                    />
                </div>
                {/* Right: Contact Info */}
                <div className="w-full md:w-1/2 p-8 text-black flex flex-col justify-center">
                    <h2 className="text-3xl font-bold mb-8">Let’s Get In Touch!</h2>

                    {/* Contact Items */}
                    <div className="space-y-6">

                        {/* Item 1 */}
                        <div className="flex items-start gap-4">
                            <div className="bg-black p-3 rounded-lg">
                                <FaClock className="text-white text-xl" />
                            </div>
                            <div>
                                <h4 className="font-bold text-black">Office Time</h4>
                                <p className="text-sm text-blue-600">Mon–Fri: 10:00Am–09:00Pm</p>
                            </div>
                        </div>

                        {/* Item 2 */}
                        <div className="flex items-start gap-4">
                            <div className="bg-black p-3 rounded-lg">
                                <FaPhoneAlt className="text-white text-xl" />
                            </div>
                            <div>
                                <h4 className="font-bold text-black">Call Us Any Time</h4>
                                <p className="text-sm text-blue-600">+(009) 1888 000 2222</p>
                            </div>
                        </div>

                        {/* Item 3 */}
                        <div className="flex items-start gap-4">
                            <div className="bg-black p-3 rounded-lg">
                                <FaEnvelope className="text-white text-xl" />
                            </div>
                            <div>
                                <h4 className="font-bold text-black">Email Address</h4>
                                <p className="text-sm text-blue-600">info@techin.com</p>
                            </div>
                        </div>

                        {/* Item 4 */}
                        <div className="flex items-start gap-4">
                            <div className="bg-black p-3 rounded-lg">
                                <FaMapMarkerAlt className="text-white text-xl" />
                            </div>
                            <div>
                                <h4 className="font-bold text-black">Office Address</h4>
                                <p className="text-sm text-blue-600">12th Street, New York, USA</p>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="w-full md:w-1/2">
                    <img
                        src="/contact.png" // Replace with actual image path
                        alt="Contact Details Visual"
                        className="w-full h-full object-contain rounded-l-xl"
                    />
                </div>


            </div>
        </section>
    );
}
