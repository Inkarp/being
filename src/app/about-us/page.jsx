import AboutHero from "./About/AboutHero";
import ManufacturingFlow from "./About/ManufacturingFlow";
import ProcessTimeline from "./About/ProcessTimeline";
import RoleCards from "./About/RoleCards";
import SpecificationControl from "./About/SpecificationControl";
import WhyChooseUs from "./About/WhyChooseUs";

export default function Page() {
    return (
        <div>
            <AboutHero />
            <RoleCards />
            <ManufacturingFlow />
            <SpecificationControl />
            <ProcessTimeline />
            <WhyChooseUs />
        </div>
    )
}