import Page from "@/components/Page";
import ProjectHero from "./components/ProjectHero";
import ProjectsStatsSection from "./components/ProjectsStatsSection";
import FeaturedProjectsSection from "./components/FeaturedProjectsSection";
import TopProjectProductsSection from "./components/TopProjectProductsSection";

interface ProjectLandingPageProps{

}

const ProjectLandingPage = (props: ProjectLandingPageProps) => {
    const { } = props;
    const handleScrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        element?.scrollIntoView({
            behavior: "smooth",
            block: 'start'
        })
    }
    return(
        <Page title="FPT Smart Home - Dự án">
            {/* Project Hero */}
            <ProjectHero onScrollToSection={handleScrollToSection}/>

            {/* Projects Stats Section */}
            <ProjectsStatsSection/>

            {/* Featured Projects Section */}
            <FeaturedProjectsSection id="featured-projects"/>

            {/* Top Project Products Section */}
            <TopProjectProductsSection id="top-project-product"/>
        </Page>
    )
}

export default ProjectLandingPage;