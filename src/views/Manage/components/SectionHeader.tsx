import { C } from "@/constants/colors";
import { ArrowForward } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";

interface SectionHeaderProps{
    title: string,
    onClick: () => void
}
const SectionHeader = ({ title, onClick }: SectionHeaderProps) => {
    return (
        <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ mb: 2 }}
        >
            <Typography sx={{ color: C.text, fontSize: { xs: 18, md: 20 }, fontWeight: 700 }}>
            {title}
            </Typography>
            <Stack direction='row' sx={{ cursor: 'pointer' }} onClick={onClick}>
                <Typography sx={{ color: '#fff '}}>Xem tất cả</Typography>
                <ArrowForward sx={{ color: '#fff'}}/>
            </Stack>
        </Stack>
    )
};

export default SectionHeader;