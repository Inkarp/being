import Hero from './Home/Hero';
import About from './Home/About';
import Offerings from './Home/Offerings';
import Blogs from './Home/Blogs';
import BlogsNew from './Home/BlogsNew';
import Customers from './Home/Customers';
import CustomersOne from './Home/CustomersOne';
import HeaderOne from './Home/HeaderOne';

export default function Home() {
  return (
    <div className="">
      {/* <HeaderOne /> */}
      <Hero />
      <Offerings />     
      <About />
      {/* <Customers /> */}
      <CustomersOne />
      <Blogs />
      {/* <BlogsNew /> */}
    </div>
  );
}
