import { Box, Container, Chip, Typography, Button, Stack } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import MemoryIcon from '@mui/icons-material/Memory';
import Grid from '@mui/material/Grid2';
import support_hero from '@/assets/images/users/support_hero.png'
import { COLORS } from '@/constants/colors';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '@/constants/routes';

const highlights = [
  {
    icon: TrendingUpIcon,
    title: 'Phát triển mạnh',
    desc: 'Các tính năng tích hợp AI công nghệ mới',
  },
  {
    icon: ShieldOutlinedIcon,
    title: 'Lõi bảo mật',
    desc: 'Bảo mật 2 lớp an toàn với công nghệ AI tích hợp',
  },
  {
    icon: CloudQueueIcon,
    title: 'Giải pháp xanh',
    desc: 'Năng lượng tái tạo thân thiện môi trường',
  },
  {
    icon: MemoryIcon,
    title: 'Mạch AI',
    desc: 'AI xử lý thông minh thế hệ mới',
  },
];

export default function SupportHero() {
  const navigate = useNavigate();
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
            url(${support_hero})
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.7,
          zIndex: 0,
        },       
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
        <Grid container spacing={6} sx={{ alignItems: 'center' }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Chip
              label="HIỆN ĐẠI THÔNG MINH"
              size="small"
              sx={{
                bgcolor: 'rgba(255,255,255,0.06)',
                color: COLORS.COLOR_DETAIL,
                border: '1px solid',
                borderColor: COLORS.COLOR_DETAIL,
                fontWeight: 700,
                letterSpacing: 0.5,
                mb: 3,
              }}
            />

            <Typography
              variant="h3"
              sx={{ fontSize: { xs: '2rem', md: '2.7rem' }, lineHeight: 1.2, mb: 3, color: 'common.white' }}
            >
              CÔNG NGHỆ HIỆN
              <br />
              ĐẠI - CUỘC SỐNG
              <br />
              <Box component="span" sx={{ color: 'secondary.main' }}>
                THÔNG MINH
              </Box>
            </Typography>

            <Typography sx={{ color: 'text.secondary', mb: 4, lineHeight: 1.8, maxWidth: 480 }}>
              Tại ZTECH, chúng tôi không chỉ bán đồ điện tử, chúng tôi bán cả sự tận tâm
              và uy tín cho khách hàng. Chúng tôi đang trong quá trình vươn đến kỷ nguyên
              hiện đại kỹ thuật số AI trong tương lai.
            </Typography>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button variant="contained" color="primary" size="large">
                Khám phá ngay
              </Button>
              <Button
                variant="outlined"
                size="large"
                sx={{ borderColor: COLORS.COLOR_DETAIL, color: COLORS.COLOR_DETAIL }}
                onClick={() => navigate(ROUTE_PATH.INTRO_LANDING)}
              >
                Về chúng tôi
              </Button>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                bgcolor: 'rgba(43, 40, 40, 0.03)',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 3,
                p: 2,
              }}
            >
              <Grid container spacing={2}>
                {highlights.map((h) => (
                  <Grid key={h.title} size={{ xs: 6 }}>
                    <Box
                      sx={{
                        bgcolor: 'rgba(10,15,26,0.6)',
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: 2,
                        p: 2.5,
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        gap: 2
                      }}
                    >
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: 1.5,
                          bgcolor: 'rgba(34,211,238,0.12)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mb: 1.5,
                          p: 2,
                          margin: { xs: 0, md: 'auto 0'}
                        }}
                      >
                        <h.icon sx={{ fontSize: 20, color: 'secondary.main' }} />
                      </Box>
                      <Stack>
                        <Typography sx={{ fontWeight: 700, mb: 0.5, fontSize: '0.95rem', color: 'common.white' }}>
                          {h.title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                          {h.desc}
                        </Typography>
                      </Stack>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
