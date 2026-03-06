import Hero from './Home/Hero';
import About from './Home/About';
import Blogs from './Home/Blogs';
import Customers from './Home/Customers';
import Products from './Home/Products';
import Testimonials from './Home/Testimonials';
import HeroNew from './Home/HeroNew';
import HeroOne from './Home/HeroOne';
import QuickLinks from './Home/QuickLinks';
import PicksForYou from './Home/PicksForYou';
import CategoryTabs from './Home/Categories';


export default function Home() {
  return (
    <div className="space-y-2">
      <HeroOne />  
      <QuickLinks />
      <PicksForYou />
      <CategoryTabs />
        {/* <HeroNew />
      <Hero />     */}
      <Products />
      <About />
      <Customers />
      <Blogs />
      <Testimonials />  
    </div>
  );
}
