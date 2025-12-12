import ContactHeader from "./ContactBanner";
import ContactFormSection from "./ContactForm";


export default function ContactUs() {
  return (
    <>
    <ContactHeader />
    <ContactFormSection />
    <section className="w-[95%] mx-auto p-5">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10">
        <div className="flex-1">
            <div className="bg-white px-6 py-6 shadow-xl rounded-xl mb-8 space-y-6 text-sm font-medium text-gray-700">
                <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
                <form className="space-y-4">    
                    <div>
                        <label className="block mb-1 font-semibold" htmlFor="name">Name</label> 

                        <input
                            type="text"
                            id="name"               
                            className="w-full border border-gray-300 rounded px-3 py-2"
                            placeholder="Your Name"
                        />      
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold" htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="w-full border border-gray-300 rounded px-3 py-2"
                            placeholder="Your Email"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold" htmlFor="message">Message</label>
                        <textarea   
                            id="message"
                            className="w-full border border-gray-300 rounded px-3 py-2"
                            rows="5"                            
                            placeholder="Your Message"
                        ></textarea>    
                    </div>
                    <button
                        type="submit"   
                        className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 transition"
                    >
                        Send Message
                    </button>
                </form>
            </div>
        </div>

        </div>
    </section>
    </>
  );
}