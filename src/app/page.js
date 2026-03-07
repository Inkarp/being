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
    <div className="">
      <HeroOne />
      {/* <CategoryTabs /> */}
      <PicksForYou />
      {/* <HeroNew />
      <Hero />     */}
      {/* <Products /> */}
      <QuickLinks />
      <About />
      <Customers />
      <Testimonials />
      <Blogs /> 
    </div>
  );
}
