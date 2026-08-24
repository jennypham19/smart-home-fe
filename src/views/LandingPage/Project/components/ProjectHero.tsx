import { Box, Button, Chip, Container, Stack, Typography } from "@mui/material";
import project_hero from '@/assets/images/users/project_hero.png'
import { COLORS } from "@/constants/colors";

export default function ProjectHero() {
    return (
        <Box
            sx={{
                position: 'relative',
                bgcolor: '#060a12',
                height: { xs: '100%' },
                py: { xs: 8, md: 12 },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                overflow: 'hidden',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `
                        linear-gradient(
                            rgba(11, 18, 32, 0.65),
                            rgba(11, 18, 32, 0.65)
                        ), 
                        url(${project_hero})
                    `,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    opacity: 0.7,
                    zIndex: 0,  
                }
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    inset: 0,
                    opacity: 0.25,
                    backgroundImage:
                        'linear-gradient(rgba(34,211,238,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.15) 1px, transparent 1px)',
                    backgroundSize: '34px 34px',
                    maskImage: 'radial-gradient(circle at 30% 40%, black, transparent 70%)',                  
                }}
            />
            <Container maxWidth="md" sx={{ position: 'relative', textAlign: 'center' }}>
                <Chip
                    label="TRUNG TÂM CÔNG NGHỆ"
                    size="small"
                    sx={{
                        bgcolor: 'rgba(255,255,255,0.06)',
                        color: 'secondary.main',
                        border: '1px solid',
                        borderColor: COLORS.COLOR_DETAIL,
                        fontWeight: 700,
                        letterSpacing: 0.5,
                        mb: 3,
                    }}
                />
                <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.6rem', color: '#fff' }, lineHeight: 1.25, mb: 2.5 }}>
                    Kiến tạo nên những công trình thông minh
                </Typography>

                <Typography sx={{ color: 'text.secondary', mb: 4, lineHeight: 1.8, maxWidth: 560, mx: 'auto' }}>
                    Khám phá cách ZTECH đang định nghĩa lại tương lai của kiến trúc và vận hành
                    thông qua các dự án thực tế quy mô lớn trên toàn quốc
                </Typography>

                <Stack direction="row" spacing={2} sx={{ justifyContent: 'center' }}>
                    <Button variant="contained" color="primary" size="large" sx={{ bgcolor: COLORS.COLOR_DETAIL, '&:hover': { bgcolor: COLORS.COLOR_DETAIL }, color: '#000' }}>
                        Xem các dự án
                    </Button>
                    <Button variant="outlined" size="large" sx={{ borderColor: COLORS.COLOR_DETAIL, color: COLORS.COLOR_DETAIL }}>
                        Sản phẩm dự án
                    </Button>
                </Stack>
            </Container>
        </Box>
    )
}