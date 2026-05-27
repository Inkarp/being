
import About from './Home/About';
import Blogs from './Home/Blogs';
import Customers from './Home/Customers';
import Testimonials from './Home/Testimonials';
import HeroOne from './Home/HeroOne';
import QuickLinks from './Home/QuickLinks';
import PicksForYou from './Home/PicksForYou';
import CategoryTabs from './Home/Categories';

export default function Home() {
  return (
    <div className=""
      style={{ background: 'linear-gradient(160deg, #275c9c 0%, #6cacdf 50%, #f0f7ff 100%)' }}>
      <HeroOne />
      <CategoryTabs />
      <PicksForYou />
      <QuickLinks />
      <About />
      <Customers />
      <Testimonials />
      <Blogs />
    </div>
  );
}
