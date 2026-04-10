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
import CustomersImages from './Home/CustomersImages';
import Test from './Home/Test';
import CustomersPage from './Home/CustomersPage';
import TestTwo from './Home/TestTwo';
import ProductCarousel from './Home/ProductCarousel';
import ProductQueries from './Home/ProductQueries';

export default function Home() {
  return (
    <div className=""
      style={{ background: 'linear-gradient(160deg, #275c9c 0%, #6cacdf 50%, #f0f7ff 100%)' }}>
      <HeroOne />
      <CategoryTabs />
      <PicksForYou />
      {/* <HeroNew /> */}
      {/* <Hero />     */}
      {/* <Products /> */}
      <QuickLinks />
      <About />
      <ProductQueries />
      {/* <Test /> */}
      {/* <ProductCarousel /> */}
      <TestTwo />
      {/* <CustomersPage /> */}
      <CustomersImages />
      <Customers />
      <Testimonials />
      <Blogs />
    </div>
  );
}
