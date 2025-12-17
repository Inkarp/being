'use client';
import { FaFlask, FaBalanceScale, FaMicroscope, FaBatteryFull, FaCogs, FaDna, FaCompressArrowsAlt, FaThermometerHalf, FaVial, FaArrowRight } from "react-icons/fa";

const offerings = [
  {
    title: "Sample Preparation & Processing",
    icon: <FaFlask size={30} />,
    desc: "Provides reliable tools for drying, heating, solvent removal, and evaporation in early-stage experiments. These systems ensure uniform sample treatment, accurate concentration, and recovery of solvents. They also support crystallization, purification, and stable heating or cooling of liquids. Essential in pharma, chemistry, food, and academic labs where reproducibility in sample preparation directly impacts downstream analysis.",
    number: "01",
  },
  {
    title: "Material Characterization & Testing",
    icon: <FaBalanceScale size={30} />,
    desc: "Enables precise measurement of physical and chemical properties of materials under controlled conditions. Furnaces provide stable high-temperature environments for ashing, thermal stability, and composition studies. Viscometers give accurate viscosity readings essential in polymers, coatings, oils, paints, and pharma formulations. These tools help in R&D, production quality checks, and regulatory compliance testing.",
    number: "02",
  },
  {
    title: "Cell & Microbiology Research",
    icon: <FaMicroscope size={30} />,
    desc: "Creates controlled and contamination-free environments for cell culture, microbial studies, and incubation. CO₂ incubators mimic in vivo conditions, maintaining pH and temperature for mammalian cell growth. Heating and cooling incubators support microbial cultures and biochemical testing. Shaking incubators provide oxygenation and mixing for microbial fermentation, protein expression, and cell suspensions. These systems are widely used in pharma R&D, vaccines, fermentation, food microbiology, and life science research.",
    number: "03",
  },
  {
    title: "Cleanroom & Contamination Control",
    icon: <FaBatteryFull size={30} />,
    desc: "Provides aseptic and safe working conditions for handling biological and pharmaceutical samples. Biosafety cabinets protect the operator, the sample, and the environment from cross-contamination. Laminar airflow units create particle-free workspaces for sterile preparations. Used in clinical diagnostics, pharma QC, vaccine production, and molecular biology labs.",
    number: "04",
  },
  {
    title: "Cold Storage & Sample Preservation",
    icon: <FaCogs size={30} />,
    desc: "Ensures safe, long-term storage of sensitive biologicals, reagents, vaccines, and chemicals. Ultra-low freezers preserve enzymes, cell lines, DNA, and drug substances. Deep freezers and lab refrigerators store samples at stable temperatures to maintain activity, stability, and integrity. Combined refrigerator-freezer units support flexible storage of reagents and biologicals in one system. Critical for hospitals, pharma, CROs, biobanks, food testing, and research labs.",
    number: "05",
  },
  // {
  //   title: "Pumps",
  //   icon: <FaDna size={30} />,
  //   desc: "Empowering biological breakthroughs with cutting-edge cell analysis, imaging, and molecular biology platforms.",
  //   number: "06",
  // },
  // {
  //   title: "Extrusion and Homogenization",
  //   icon: <FaCompressArrowsAlt size={30} className="text-blue-300" />,
  //   desc: "Delivering high-pressure homogenization and extrusion equipment for nanoemulsions, dispersions, and formulations.",
  //   number: "07",
  // },
  // {
  //   title: "Rheology and Thermal Analysis",
  //   icon: <FaThermometerHalf size={30} className="text-blue-300" />,
  //   desc: "Measuring material behavior and thermal properties with precision rheometers and calorimeters.",
  //   number: "08",
  // },
  // {
  //   title: "General Laboratory Instruments",
  //   icon: <FaVial size={30} className="text-blue-300" />,
  //   desc: "From pH meters to water purification – your everyday research essentials under one roof.",
  //   number: "09",
  // },
];

export default function OfferingsSection() {
  return (
    <section className=" w-[90%] mx-auto text-white py-5 px-6  font-sans">
      <div className="text-center py-3 flex flex-col justify-center items-center">
        <div className="flex gap-3">
          <span className="text-[#2B7EC2] bg-white p-2 uppercase font-bold text-sm tracking-wider inline-block border-2 border-[#2F3F8D] mb-2">
            Our Offerings
          </span>

          <span className="text-black bg-[#2B7EC2] p-2 uppercase font-bold text-sm tracking-wider inline-block border-2 border-[#2F3F8D] mb-2">
            Our Offerings
          </span>

          <span className="text-white bg-[#2B7EC2] p-2 uppercase font-bold text-sm tracking-wider inline-block border-2 border-[#2F3F8D] rounded-full mb-2">
            Our Offerings
          </span>
        </div>
        {/* <div className="w-fit">
          <div className="relative group w-[120px] h-[120px] text-white">

            <svg
              viewBox="0 0 30 30"
              className="w-full h-full fill-black spin-slow transition duration-500"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M14.2257 0.947522C14.6258 0.457905 15.3742 0.457905 15.7743 0.947522L16.8781 2.29817C17.181 2.66879 17.704 2.77283 18.1256 2.54633L19.6623 1.72088C20.2193 1.42165 20.9107 1.70806 21.093 2.31352L21.5959 3.98376C21.7339 4.44207 22.1773 4.73834 22.6535 4.69044L24.3891 4.51587C25.0182 4.45258 25.5474 4.98179 25.4841 5.61093L25.3096 7.34647C25.2617 7.8227 25.5579 8.2661 26.0162 8.40409L27.6865 8.90697C28.2919 9.08926 28.5783 9.7807 28.2791 10.3377L27.4537 11.8744C27.2272 12.296 27.3312 12.819 27.7018 13.1219L29.0525 14.2257C29.5421 14.6258 29.5421 15.3742 29.0525 15.7743L27.7018 16.8781C27.3312 17.181 27.2272 17.704 27.4537 18.1256L28.2791 19.6623C28.5783 20.2193 28.2919 20.9107 27.6865 21.093L26.0162 21.5959C25.5579 21.7339 25.2617 22.1773 25.3096 22.6535L25.4841 24.3891C25.5474 25.0182 25.0182 25.5474 24.3891 25.4841L22.6535 25.3096C22.1773 25.2617 21.7339 25.5579 21.5959 26.0162L21.093 27.6865C20.9107 28.2919 20.2193 28.5783 19.6623 28.2791L18.1256 27.4537C17.704 27.2272 17.181 27.3312 16.8781 27.7018L15.7743 29.0525C15.3742 29.5421 14.6258 29.5421 14.2257 29.0525L13.1219 27.7018C12.819 27.3312 12.296 27.2272 11.8744 27.4537L10.3377 28.2791C9.7807 28.5783 9.08926 28.2919 8.90697 27.6865L8.40409 26.0162C8.2661 25.5579 7.8227 25.2617 7.34647 25.3096L5.61093 25.4841C4.98179 25.5474 4.45258 25.0182 4.51587 24.3891L4.69044 22.6535C4.73834 22.1773 4.44207 21.7339 3.98376 21.5959L2.31352 21.093C1.70806 20.9107 1.42165 20.2193 1.72088 19.6623L2.54633 18.1256C2.77283 17.704 2.66879 17.181 2.29817 16.8781L0.947522 15.7743C0.457905 15.3742 0.457905 14.6258 0.947522 14.2257L2.29817 13.1219C2.66879 12.819 2.77283 12.296 2.54633 11.8744L1.72088 10.3377C1.42165 9.7807 1.70806 9.08926 2.31352 8.90697L3.98376 8.40409C4.44207 8.2661 4.73834 7.8227 4.69044 7.34647L4.51587 5.61093C4.45258 4.98179 4.98179 4.45258 5.61093 4.51587L7.34647 4.69044C7.8227 4.73834 8.2661 4.44207 8.40409 3.98376L8.90697 2.31352C9.08926 1.70806 9.7807 1.42165 10.3377 1.72088L11.8744 2.54633C12.296 2.77283 12.819 2.66879 13.1219 2.29817L14.2257 0.947522Z" />
            </svg>


            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-2">
              <span className="text-white font-medium text-[Roboto] leading-5 text-[16px]">
                Our <br /> Offerings
              </span>

            </div>
          </div>
        </div> */}
        <div className="flex justify-center items-center py-3">
          <h2 className="text-2xl md:text-2xl text-black  flex flex-wrap gap-1">
            {"Explore Our Scientific Focus Areas".split("").map((char, index) => (
              <span
                key={index}
                className="inline-block animate-bounce"
                style={{ animationDelay: `${index * 0.02}s` }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h2>
        </div>

      </div>

      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6  ">
        {offerings.map((item, idx) => (
          <div
            key={idx}
            className="relative group bg-black/80 border border-white p-6 hover:shadow-lg hover:border-cyan-400 transition-all duration-300 flex flex-col"
          >

            {/* Icon and Title */}
            <div className="flex items-center gap-4 mb-4">
              <span className="p-3 rounded-3xl border transition-transform duration-600 group-hover:rotate-y-180 text-[#2B7EC2]">
                {item.icon}
              </span>
              <h3 className="text-lg font-semibold">{item.title}</h3>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-300 mb-4">{item.desc}</p>

            {/* Read More */}
            <div className="mt-auto">
              <a href="#" className="text-sm text-white font-semibold hover:text-cyan-400">
                <div className="flex items-center gap-3 bg-white px-3 py-2 rounded-full w-fit">
                  <span className="text-[#2F3F8D] font-medium text-[16px]">Know More</span>
                  <div className="relative w-[30px] h-[30px] text-[#2B7EC2]">
                    <svg width="30" height="30" viewBox="0 0 30 30" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className='spin-slow' > <path d="M14.2257 0.947522C14.6258 0.457905 15.3742 0.457905 15.7743 0.947522L16.8781 2.29817C17.181 2.66879 17.704 2.77283 18.1256 2.54633L19.6623 1.72088C20.2193 1.42165 20.9107 1.70806 21.093 2.31352L21.5959 3.98376C21.7339 4.44207 22.1773 4.73834 22.6535 4.69044L24.3891 4.51587C25.0182 4.45258 25.5474 4.98179 25.4841 5.61093L25.3096 7.34647C25.2617 7.8227 25.5579 8.2661 26.0162 8.40409L27.6865 8.90697C28.2919 9.08926 28.5783 9.7807 28.2791 10.3377L27.4537 11.8744C27.2272 12.296 27.3312 12.819 27.7018 13.1219L29.0525 14.2257C29.5421 14.6258 29.5421 15.3742 29.0525 15.7743L27.7018 16.8781C27.3312 17.181 27.2272 17.704 27.4537 18.1256L28.2791 19.6623C28.5783 20.2193 28.2919 20.9107 27.6865 21.093L26.0162 21.5959C25.5579 21.7339 25.2617 22.1773 25.3096 22.6535L25.4841 24.3891C25.5474 25.0182 25.0182 25.5474 24.3891 25.4841L22.6535 25.3096C22.1773 25.2617 21.7339 25.5579 21.5959 26.0162L21.093 27.6865C20.9107 28.2919 20.2193 28.5783 19.6623 28.2791L18.1256 27.4537C17.704 27.2272 17.181 27.3312 16.8781 27.7018L15.7743 29.0525C15.3742 29.5421 14.6258 29.5421 14.2257 29.0525L13.1219 27.7018C12.819 27.3312 12.296 27.2272 11.8744 27.4537L10.3377 28.2791C9.7807 28.5783 9.08926 28.2919 8.90697 27.6865L8.40409 26.0162C8.2661 25.5579 7.8227 25.2617 7.34647 25.3096L5.61093 25.4841C4.98179 25.5474 4.45258 25.0182 4.51587 24.3891L4.69044 22.6535C4.73834 22.1773 4.44207 21.7339 3.98376 21.5959L2.31352 21.093C1.70806 20.9107 1.42165 20.2193 1.72088 19.6623L2.54633 18.1256C2.77283 17.704 2.66879 17.181 2.29817 16.8781L0.947522 15.7743C0.457905 15.3742 0.457905 14.6258 0.947522 14.2257L2.29817 13.1219C2.66879 12.819 2.77283 12.296 2.54633 11.8744L1.72088 10.3377C1.42165 9.7807 1.70806 9.08926 2.31352 8.90697L3.98376 8.40409C4.44207 8.2661 4.73834 7.8227 4.69044 7.34647L4.51587 5.61093C4.45258 4.98179 4.98179 4.45258 5.61093 4.51587L7.34647 4.69044C7.8227 4.73834 8.2661 4.44207 8.40409 3.98376L8.90697 2.31352C9.08926 1.70806 9.7807 1.42165 10.3377 1.72088L11.8744 2.54633C12.296 2.77283 12.819 2.66879 13.1219 2.29817L14.2257 0.947522Z" /> </svg>
                    <FaArrowRight
                      size={12}
                      className="absolute top-1/2 left-1/2 text-white transform -translate-x-1/2 -translate-y-1/2"
                    />
                  </div>
                </div>
              </a>
            </div>


            {/* Number in top right */}
            <div className="absolute bottom-3 right-4 text-white/50 text-4xl font-bold select-none">
              {item.number}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
