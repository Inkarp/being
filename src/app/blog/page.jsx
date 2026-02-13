import Banner from "../events/Banner";
import Blog from "./Blog";
import Blogs from "./Blogs";


export default function Page() {
    return (
        <div className="">
            <Banner />
            <Blogs />
            <Blog />     
        </div>
    );
}
