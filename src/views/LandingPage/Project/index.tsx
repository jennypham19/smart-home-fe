import Page from "@/components/Page";
import ProjectHero from "./components/ProjectHero";
import ProjectsStatsSection from "./components/ProjectsStatsSection";
import FeaturedProjectsSection from "./components/FeaturedProjectsSection";

interface ProjectLandingPageProps{

}

const ProjectLandingPage = (props: ProjectLandingPageProps) => {
    const { } = props;
    return(
        <Page title="FPT Smart Home - Dự án">
            {/* Project Hero */}
            <ProjectHero/>

            {/* Projects Stats Section */}
            <ProjectsStatsSection/>

            {/* Featured Projects Section */}
            <FeaturedProjectsSection/>
        </Page>
    )
}

export default ProjectLandingPage;