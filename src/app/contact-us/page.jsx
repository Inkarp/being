
import ContactHeader from "./ContactBanner";
import ContactDetails from "./ContactDetails";
import ContactFormSection from "./ContactForm";
import Form from "./Form";


export default function ContactUs() {
    return (
        <div className="space-y-3">
            {/* <ContactHeader /> */}
            <ContactFormSection />
            <ContactDetails />
            <Form />
        </div>
    );
}