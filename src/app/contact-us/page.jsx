import Header from "../five/Header";
import ContactHeader from "./ContactBanner";
import ContactDetails from "./ContactDetails";
import ContactFormSection from "./ContactForm";


export default function ContactUs() {
    return (
        <>
            <ContactHeader />
            <ContactFormSection />
            <ContactDetails />
        </>
    );
}