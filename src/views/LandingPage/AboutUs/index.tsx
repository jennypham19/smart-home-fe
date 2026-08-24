import Page from "@/components/Page";
import AboutHero from "./components/AboutHero";
import MissionSection from "./components/MissionSection";
import Market from "./components/Market";
import PartnersSection from "./components/PartnersSection";
import ContactSection from "./components/ContactSection";

interface AboutUsLandingPageProps{

}

const AboutUsLandingPage = (props: AboutUsLandingPageProps) => {
    const { } = props;
    return(
        <Page title="FPT Smart Home - Về chúng tôi">
            {/* Banner */}
            <AboutHero/>

            {/* Mission Section */}
            <MissionSection/>

            {/* Market Section */}
            <Market/>

            {/* Partners Section */}
            <PartnersSection/>

            {/* Contact Section */}
            <ContactSection/>
        </Page>
    )
}

export default AboutUsLandingPage;