import Header from "./Header";
import HeaderNew from "./HeaderNew";
import HeaderOne from "./HeaderOne";
import HeaderThree from "./HeaderThree";
import HeaderTwo from "./HeaderTwo";

export default function Home() {
  return (
    <div className="py-3">
      <Header />
      <div className="mt-10">
        <HeaderNew />
      </div>

      <div className="mt-10">
        <HeaderOne />
      </div>

      <div className="mt-10">
        <HeaderTwo />
      </div>

      <div className="mt-10">
        <HeaderThree />
      </div>
    </div>
  );
}
