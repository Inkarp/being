
import Banner from "./Banner";
import Events from "./events";

export const metadata = {
    title: "Events & Exhibitions | Being Instruments India | Lab Equipment Shows",
    description: "See where Being Instruments India is exhibiting next — lab equipment trade shows, pharmaceutical exhibitions, biotech conferences & product demonstrations across India. Stay updated with our latest events.",
    keywords: [
        "laboratory equipment exhibition India",
        "lab equipment trade show India",
        "Being Instruments events",
        "scientific instruments exhibition India",
        "pharma lab equipment conference India",
        "laboratory equipment exhibition India 2026",
        "pharmaceutical trade show India",
        "biotech laboratory conference India",
        "scientific instrument demo event India",
        "Being Instruments exhibition Hyderabad",
        "trade show",
        "exhibition",
        "pharma conference",
        "biotech event",
        "product demo",
        "instrument showcase",
        "India laboratory industry",
    ],
};

export default function page() {
    return (
        <div className="">
            <Banner />
            <Events />   
        </div>
    )
}
