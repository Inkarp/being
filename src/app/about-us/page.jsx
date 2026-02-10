import AboutHero from "./About/AboutHero";
import AboutHeroNew from "./About/AboutHeroNew";
import ManufacturingFlow from "./About/ManufacturingFlow";
import ProcessTimeline from "./About/ProcessTimeline";
import RoleCards from "./About/RoleCards";
import SpecificationControl from "./About/SpecificationControl";
import WhyChooseUs from "./About/WhyChooseUs";
import Image from 'next/image';

export default function Page() {
    return (
        <div className="relative min-h-screen overflow-hidden">

            {/* <div className="fixed inset-0 z-0">
                <Image
                    src="/Bg.png" 
                    alt="About Background"
                    fill
                    className="object-cover object-center"
                    priority
                    quality={100}
                />
              
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900/40 via-slate-800/30 to-slate-900/50" />
            </div> */}

            {/* Content Container */}
            <div className="relative z-10">
                <AboutHero />
                <AboutHeroNew />
                {/* <RoleCards />
                <ManufacturingFlow />
                <SpecificationControl />
                <ProcessTimeline />
                <WhyChooseUs /> */}
            </div>
        </div>
    )
}
