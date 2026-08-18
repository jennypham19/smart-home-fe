import { Box, Container, Stack, Typography } from "@mui/material";
import mission from "@/assets/images/users/about-us.png";
import Grid from "@mui/material/Grid2";
import { COLORS } from "@/constants/colors";

export default function MissionSection() {
    return(
        <Box sx={{ bgcolor: 'background.default', py: { xs: 8, md: 10 } }}>
            <Container maxWidth="lg">
                <Grid container spacing={6} sx={{ alignItems: 'center' }}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box
                            sx={{
                                position: 'relative',
                                height: '100%',
                                minHeight: { xs: 320, md: 480 },
                                backgroundImage: `url(${mission})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                            }}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography
                        sx={{
                            color: '#C1E9FF',
                            fontWeight: 700,
                            letterSpacing: 1,
                            fontSize: '0.8rem',
                            mb: 1.5,
                        }}
                        >
                        LỢI THẾ CỦA FPT SMART HOME
                        </Typography>
                        <Typography variant="h4" sx={{ fontSize: { xs: '1.7rem', md: '2rem' }, mb: 3, color: 'common.white' }}>
                            VỚI CHÚNG TÔI
                        </Typography>

                        <Box
                        sx={{
                            borderLeft: '3px solid',
                            borderColor: 'secondary.main',
                            pl: 2.5,
                            mb: 3,
                        }}
                        >
                        <Typography sx={{ color: 'text.primary', fontStyle: 'italic', lineHeight: 1.8 }}>
                            “ Khách hàng là thượng đế. chăm sóc khách hàng 24/7, khi cần lắp đặt các kỹ sư và đội ngũ của chúng tôi sẽ hỗ trợ nhiệt tình. Đặc biệt, tại FPT SMART HOME đa dạng các mẫu mã và thẩm mỹ sang trọng ”
                        </Typography>
                        </Box>

                        <Typography sx={{ color: 'text.secondary', mb: 4, lineHeight: 1.8 }}>
                            Mỗi sản phẩm tại FPT SMART HOME, từ những chiếc camera đến công tắc điện thông minh đều tích hợp AI thông minh được tuyển chọn khắt khe và kiểm định định kì. Chúng tôi tin rằng công nghệ thật sự có ý nghĩa khi ns phục vụ và nâng tầm cuộc sống con người.
                        </Typography>

                        <Stack direction="row" spacing={2}>
                        <Box
                            sx={{
                            flex: 1,
                            bgcolor: '#5F5F5F',
                            border: '1px solid',
                            borderColor: '#5F5F5F',
                            p: 2.5,
                            }}
                        >
                            <Typography sx={{ color: COLORS.COLOR_DETAIL, fontWeight: 800, fontSize: '1.6rem' }}>
                                120+ SHOP
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                Nhượng quyền
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                            flex: 1,
                            bgcolor: '#5F5F5F',
                            border: '1px solid',
                            borderColor: '#5F5F5F',
                            p: 2.5,
                            }}
                        >
                            <Typography sx={{ color: COLORS.COLOR_DETAIL, fontWeight: 800, fontSize: '1.6rem' }}>
                                400+
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                Văn phòng giao dịch
                            </Typography>
                        </Box>
                        </Stack>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}