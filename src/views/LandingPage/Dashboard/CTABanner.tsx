import { Box, Container, Stack, Typography, Button } from '@mui/material';
import GroupsIcon from '@mui/icons-material/Groups';
import Grid from "@mui/material/Grid2";
import member from "@/assets/images/users/member.png"
import { COLORS } from '@/constants/colors';

export default function CTABanner() {
  return (
    <Box sx={{ bgcolor: '#0d1522', py: { xs: 6, md: 8 } }}>
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography
              variant="h3"
              sx={{ fontSize: { xs: '1.8rem', md: '2.4rem' }, lineHeight: 1.3, mb: 3, color: '#fff' }}
            >
              Bạn muốn trở thành
              <br />
              <Box component="span" sx={{ color: 'secondary.main' }}>
                cộng tác viên
              </Box>{' '}
              của chúng tôi ?
            </Typography>

            <Stack direction="row" spacing={1} alignItems="baseline" sx={{ mb: 3 }}>
              <Typography sx={{ color: 'text.secondary' }}>Ưu đãi tới</Typography>
              <Typography sx={{ color: 'secondary.main', fontWeight: 800, fontSize: '2.5rem' }}>
                20% OFF
              </Typography>
            </Stack>

            <Typography sx={{ color: 'text.secondary', mb: 4, maxWidth: 480, lineHeight: 1.8 }}>
              Khi bạn trở thành cộng tác viên của FPT SMART HOME bạn sẽ nhận được ưu đãi mua sắm lên tới 20% áp dụng cho toàn bộ các sản phẩm từ cửa hàng của FPT SMART HOME. Nhanh tay trở thành thành viên của FPT SMART HOME nào !!!
            </Typography>

            <Stack direction="row" spacing={2}>
              <Button variant="contained" color="primary" size="large">
                Tham gia thành viên
              </Button>
              <Button
                variant="outlined"
                size="large"
                sx={{ borderColor: COLORS.COLOR_DETAIL, color: COLORS.COLOR_DETAIL }}
              >
                Tìm hiểu thêm
              </Button>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                height: { xs: 260, md: 350 },
                width: { xs: '100%', md: 552},
                borderRadius: 3,
                bgcolor: '#000000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid',
                borderColor: 'divider',
                objectFit: 'fill'
              }}
              component='img'
              src={member}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
