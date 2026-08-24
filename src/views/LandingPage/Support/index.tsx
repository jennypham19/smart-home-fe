import Page from "@/components/Page";
import SupportHero from "./components/SupportHero";
import SupportCenterSection from "./components/SupportCenterSection";
import FaqSection from "./components/FaqSection";
import SupportRequestSection from "./components/SupportRequestSection";

interface SupportLandingPageProps{

}

const SupportLandingPage = (props: SupportLandingPageProps) => {
    const { } = props;
    return(
        <Page title="FPT Smart Home - Hỗ trợ">
            {/* Support Hero */}
            <SupportHero/>

            {/* Support Center Section */}
            <SupportCenterSection/>

            {/* FAQ Section */}
            <FaqSection/>

            {/* Support Request Section */}
            <SupportRequestSection/>
        </Page>
    )
}

export default SupportLandingPage;