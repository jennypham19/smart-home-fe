import { Box, Typography } from "@mui/material";
import Hero from "./Hero";
import BestSellers from "./BestSellers";
import Categories from "./Categories";
import CTABanner from "./CTABanner";
import Page from "@/components/Page";

interface DashboardLandingPageProps{

}

const DashboardLandingPage = (props: DashboardLandingPageProps) => {
    const { } = props;
    return(
        <Page title="FPT Smart Home - Trang chủ">
        <Box>
            <Hero/>
            {/* ---- DANH MỤC SẢN PHẨM ----- */}
            <Categories/>
            {/* ----- SẢN PHẨM BÁN CHẠY -------- */}
            <BestSellers/>
            {/* ---- CTV ----- */}
            <CTABanner/>
        </Box>
        </Page>
    )
}

export default DashboardLandingPage;