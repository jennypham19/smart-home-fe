import { Box, ThemeProvider } from "@mui/material"
import { Outlet } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer";
import theme from "@/theme/theme";

const LandingPageLayout = () => {
    return(
        <ThemeProvider theme={theme}>            
            <Box 
                sx={{ 
                    bgcolor: 'background.default',
                    minHeight: '100svh',
                    paddingTop: '64px',
                }}
            >
                <Header/>
                <Box flexGrow={1}>
                    <Outlet/>
                </Box>
                <Footer/>
            </Box>
        </ThemeProvider>
    )
}

export default LandingPageLayout;