import Products from "../Home/Products";
import Verticals from "./Verticals";
import VerticalsNew from "./VerticalsNew";
import VerticalsNewOne from "./VerticalsNewOne";

export default function Page() {
  return (
    <div>
      <VerticalsNewOne />
      <Products />
      <VerticalsNew />
      <Verticals />
    </div>
  )
}