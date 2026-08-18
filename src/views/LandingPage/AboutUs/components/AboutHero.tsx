import { Box, Button, Chip, Container, Stack, Typography } from "@mui/material";
import banner from "@/assets/images/users/about-us-banner.png";
import { COLORS } from "@/constants/colors";

export default function AboutHero() {
    return(
        <Box
            sx={{
                position: 'relative',
                height: { xs: '100%' },
                overflow: 'hidden',
                bgcolor: '#060a12',
                py: { xs: 8, md: 12 },
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `
                        linear-gradient(
                        rgba(11, 18, 32, 0.65),
                        rgba(11, 18, 32, 0.65)
                        ),
                        url(${banner})
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
            <Container maxWidth="lg" sx={{ position: 'relative' }}>
                <Box sx={{ maxWidth: 620 }}>
                    <Chip
                        label="NGÔI NHÀ THÔNG MINH"
                        size="small"
                        sx={{
                            color: COLORS.COLOR_DETAIL,
                            border: '1px solid',
                            borderColor: COLORS.COLOR_DETAIL,
                            fontWeight: 700,
                            letterSpacing: 0.5,
                            mb: 3,
                        }}
                    />

                    <Typography
                        variant="h2"
                        sx={{ fontSize: { xs: '2rem', md: '3rem' }, lineHeight: 1.2, mb: 3, color: 'common.white' }}
                    >
                        Kiến tạo <Box component="span" sx={{ color: COLORS.COLOR_DETAIL }}>tương lai</Box>
                        <br />
                        từ công nghệ
                        <br />
                        hiện đại
                    </Typography>

                    <Typography sx={{ color: 'text.secondary', mb: 4, lineHeight: 1.8 }}>
                        Chúng tôi kiến tạo tương lai công nghệ số. Với hơn một thập kỉ kinh nghiệm, tự
                        hào là đơn vị tiên phong trong việc cung cấp các giải pháp công nghệ hiện đại.
                    </Typography>

                    <Stack direction="row" spacing={2}>
                        <Button variant="contained" color="primary" size="large">
                            Khám phá ngay
                        </Button>
                        <Button
                            variant="outlined"
                            size="large"
                            sx={{ borderColor: COLORS.COLOR_DETAIL, color: COLORS.COLOR_DETAIL, '&:hover': { borderColor: COLORS.COLOR_DETAIL } }}
                        >
                        Liên hệ với chúng tôi
                        </Button>
                    </Stack>
                </Box>
            </Container>
        </Box>
    )
}