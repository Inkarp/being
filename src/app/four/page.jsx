import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaClock } from "react-icons/fa6";
import { FaFacebookF, FaTwitter, FaInstagram, FaPinterestP } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import Hero from "../five/Hero";
import NewHeader from "../three/NewHeader";
import Offerings from "./Offerings";

export default function HeaderTwo() {
    return (
        <>
        <NewHeader />
        <Hero />
        <Offerings />
        </>
    );
}
