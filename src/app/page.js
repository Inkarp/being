import { FaPaperPlane, FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaInstagram, FaYoutube, FaLinkedin } from 'react-icons/fa';
import { FaFacebookF, FaTwitter, FaPinterestP } from 'react-icons/fa';
import ScrollToTop from './ScrollToTop';

import Header from './Home/Header';
import Hero from './Home/Hero';
import About from './Home/About';
import Offerings from './Home/Offerings';
import Blogs from './Home/Blogs';
import Footer from './Home/Footer';


export default function Home() {
  return (
    <div className="">
      <Hero />
      <Offerings />
      <About />
      <Blogs />
    </div>
  );
}
