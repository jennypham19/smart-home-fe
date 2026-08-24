import Page from "@/components/Page";
import ContactHero from "./components/ContactHero";
import ContactCTASection from "./components/ContactCTASection";

interface ContactLandingPageProps{

}

const ContactLandingPage = (props: ContactLandingPageProps) => {
    const { } = props;
    return(
        <Page title="FPT Smart Home - Liên hệ">
            {/* Contact Hero */}
            <ContactHero/>

            {/* Contact CTA Section */}
            <ContactCTASection/>
        </Page>
    )
}

export default ContactLandingPage;