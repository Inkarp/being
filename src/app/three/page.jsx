import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaClock } from "react-icons/fa6";
import { FaFacebookF, FaTwitter, FaInstagram, FaPinterestP } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";

export default function HeaderOne() {
    return (
        <header className="w-[95%] flex mx-auto bg-white font-[Roboto] rounded-2xl p-2">
            <div className="flex flex-col w-full">
                <div className="w-full px-5 py-2 bg-[#2B7EC2] rounded-2xl flex justify-between items-center text-white">

                    <div className="flex items-center gap-14">
                        <nav className="flex items-start gap-10 font-semibold">
                            <a className="hover:text-gray-200 cursor-pointer">Home</a>
                            <a className="hover:text-gray-200 cursor-pointer">About</a>
                            <a className="hover:text-gray-200 cursor-pointer">Products</a>
                            <a className="hover:text-gray-200 cursor-pointer">Contact Us</a>
                            <a className="hover:text-gray-200 cursor-pointer">News and Events</a>
                        </nav>
                    </div>
                    <div className="flex  ">
                        <img src="/logo.webp" alt="TechIn Logo" className="h-[100px] w-full bg-white rounded-3xl" />
                    </div>
                    <div className="flex items-center gap-5">
                        <div className="bg-white text-[#312CF0] w-12 h-12 rounded-full flex justify-center items-center cursor-pointer">
                            <FaSearch size={18} />
                        </div>

                        <div className="bg-white text-[#312CF0] w-12 h-12 rounded-full flex justify-center items-center cursor-pointer">
                            <RxHamburgerMenu size={20} />
                        </div>

                        <button className="bg-[#00C6F8] text-white font-bold px-8 py-3 rounded-lg text-[18px] shadow-md hover:bg-[#05d1ff]">
                            Product Profile
                        </button>

                    </div>
                </div>
            </div>

        </header>
    );
}
