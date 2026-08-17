import { Box, Container, Stack, Chip, Typography, Button } from '@mui/material';
import cam_bien from "@/assets/images/users/cam-bien.png";
import Grid from "@mui/material/Grid2"

export default function Hero() {
  return (
    <Box sx={{ bgcolor: 'background.default', py: { xs: 6, md: 10 } }}>
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          <Grid size={{ xs: 12, md: 6 }}>
            <Chip
              label="Công nghệ tân tiến"
              sx={{
                bgcolor: 'rgba(255,255,255,0.06)',
                color: '#C1E9FF',
                border: '1px solid #C1E9FF',
                borderColor: 'divider',
                mb: 3,
                fontSize: { xs: 13, md: 16 }
              }}
            />
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '2.4rem', md: '3.6rem' },
                lineHeight: 1.1,
                mb: 3,
                color: '#fff'
              }}
            >
              Cảm Biến Khói
              <br />
              <Box component="span" sx={{ color: '#C1E9FF' }}>
                Wi-Fi
              </Box>
            </Typography>

            <Stack direction="row" spacing={2} alignItems="baseline" sx={{ mb: 3 }}>
              <Typography
                sx={{
                  textDecoration: 'line-through',
                  color: 'text.secondary',
                  fontSize: { xs: '1.2rem', md: '1.5rem'},
                }}
              >
                1,590,000 VNĐ
              </Typography>
              <Typography
                sx={{ color: 'secondary.main', fontWeight: 800, fontSize: { xs: '1.8rem', md: '2.5rem' } }}
              >
                1,500,000 VNĐ
              </Typography>
            </Stack>

            <Typography sx={{ color: 'text.secondary', maxWidth: 480, lineHeight: 1.8 }}>
              ● Cảm biến khói phát hiện khói và truyền thông tin đến Ổ cắm thông minh Wi-Fi. Đồng thời phát báo động
            </Typography>
            <Typography sx={{ color: 'text.secondary', maxWidth: 480, lineHeight: 1.8 }}>
              ● Ổ cắm thông minh Wi-Fi với tính năng Mini Hub sẽ nhận thông tin từ cảm biến khói và gửi thông báo tới điện thoại; đồng thời cấp nguồn hoạt động cho còi báo động
            </Typography>
            <Typography sx={{ color: 'text.secondary', maxWidth: 480, lineHeight: 1.8 }}>
              ● Người dùng có thể vào App FPT Life để kiểm tra tình hình thông qua FPT Camera được tích hợp
            </Typography>
            <Typography sx={{ color: 'text.secondary', mb: 4, maxWidth: 480, lineHeight: 1.8 }}>
              ● Ổ cắm thông minh Wi-Fi Còi báo động phát âm thanh báo động (mở rộng khu vực báo động)
            </Typography>

            <Stack direction="row" spacing={2}>
              <Button variant="contained" color="primary" size="large" sx={{ bgcolor: '#2764EB', fontSize: { xs: 13, md: 18 } }}>
                Mua ngay
              </Button>
              <Button
                variant="outlined"
                size="large"
                sx={{ borderColor: '#C1E9FF', color: '#C1E9FF', fontSize: { xs: 13, md: 18 } }}
              >
                Thêm vào giỏ hàng
              </Button>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                position: 'relative',
                height: { xs: 280, md: 380 },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  left: '5%',
                  top: '0%',
                  width: { xs: '100%', md: 480 },
                  height: { xs: '100%', md: 469 },
                  borderRadius: 3,
                  borderColor: 'divider',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                component='img'
                src={cam_bien}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
