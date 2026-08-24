import { Box, Container, Stack, Typography, Card, Chip, Divider } from '@mui/material';
import Grid from "@mui/material/Grid2";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import StarIcon from '@mui/icons-material/Star';
import VillaIcon from '@mui/icons-material/Villa';
import ApartmentIcon from '@mui/icons-material/Apartment';
import ParkIcon from '@mui/icons-material/Park';
import ScreenshotMonitorIcon from '@mui/icons-material/ScreenshotMonitor';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import SettingsRemoteIcon from '@mui/icons-material/SettingsRemote';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import VideocamIcon from '@mui/icons-material/Videocam';

const projects = [
  {
    category: 'SMART HOME BIỆT THỰ CAO CẤP',
    categoryColor: '#22d3ee',
    icon: VillaIcon,
    title: 'SMART HOME A LÀ CART',
    rating: 4.9,
    views: '5000 views',
    desc: 'Triển khai hệ thống nhà thông minh toàn diện cho biệt thự với điều khiển chiếu sáng, rèm cửa, điều hòa, camera an ninh và khóa cửa thông minh. Chủ nhà dễ dàng quản lý mọi thiết bị từ xa qua điện thoại, nâng cao tiện nghi, an toàn và tiết kiệm năng lượng.',
    products: [
      { icon: ScreenshotMonitorIcon, label: 'Screen 4K' },
      { icon: ShieldOutlinedIcon, label: 'Security core' },
    ],
  },
  {
    category: 'KHÁCH SẠN VÀ HOMESTAY',
    categoryColor: '#f472b6',
    icon: ApartmentIcon,
    title: 'KHÁCH SẠN LUNA',
    rating: 5.0,
    views: '10.000 views',
    desc: 'Triển khai hệ thống điều khiển thông minh cho khách sạn và homestay, cho phép quản lý thiết bị điện, khóa cửa, điều hòa cùng chiếu sáng từ xa. Giải pháp giúp tối ưu chi phí vận hành, đồng thời tối ưu chi phí quản lý và vận hành.',
    products: [
      { icon: SettingsRemoteIcon, label: 'Remote' },
      { icon: ShieldOutlinedIcon, label: 'Security core' },
    ],
  },
  {
    category: 'KHU RESORT & SPA CAO CẤP',
    categoryColor: '#4ade80',
    icon: ParkIcon,
    title: 'FUSION RESORT PHU QUOC',
    rating: 5.0,
    views: '500.000 views',
    desc: 'Ứng dụng công nghệ Smart Home vào vận phòng với hệ thống chiếu sáng, điều hòa, kiểm soát ra vào tập trung và camera giám sát. Giải pháp giúp quản lý tập trung, tiết kiệm chi phí vận hành, tăng hiệu quả làm việc và đảm bảo an ninh cho doanh nghiệp.',
    products: [
      { icon: AcUnitIcon, label: 'Smart Air' },
      { icon: VideocamIcon, label: 'Camera Smart' },
    ],
  },
];

export default function FeaturedProjectsSection() {
  return (
    <Box sx={{ bgcolor: '#0a0f1a', py: { xs: 8, md: 10 } }}>
      <Container maxWidth="lg">
        <Stack
          direction="row"
          sx={{ justifyContent: 'space-between', alignItems: 'flex-start', mb: 5 }}
        >
          <Box>
            <Typography variant="h4" sx={{ fontSize: { xs: '1.6rem', md: '1.9rem' }, color: 'common.white' }}>
              Dự án tiêu biểu
            </Typography>
            <Typography sx={{ color: 'text.secondary', mt: 0.5 }}>
              Những minh chứng cho sự kết hợp giữa công nghệ và đời sống
            </Typography>
          </Box>
          <Stack
            direction="row"
            spacing={1}
            sx={{ alignItems: 'center', cursor: 'pointer', color: 'text.primary', flexShrink: 0, ml: 2 }}
          >
            <Typography sx={{ fontWeight: 600 }}>Xem tất cả</Typography>
            <ArrowForwardIosIcon sx={{ fontSize: 14 }} />
          </Stack>
        </Stack>

        <Grid container spacing={3}>
          {projects.map((p) => (
            <Grid key={p.title} size={{ xs: 12, md: 4 }}>
              <Card sx={{ bgcolor: '#121a2a', border: '1px solid', borderColor: 'divider', overflow: 'hidden' }}>
                <Box
                  sx={{
                    position: 'relative',
                    height: 180,
                    bgcolor: '#1a2436',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <p.icon sx={{ fontSize: 72, color: 'rgba(255,255,255,0.25)' }} />
                  <Chip
                    label={p.category}
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: 12,
                      left: 12,
                      bgcolor: p.categoryColor,
                      color: '#06141f',
                      fontWeight: 700,
                      fontSize: '0.65rem',
                    }}
                  />
                </Box>

                <Box sx={{ p: 2.5 }}>
                  <Typography sx={{ fontWeight: 800, letterSpacing: 0.3 }}>{p.title}</Typography>

                  <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center', mt: 0.75, mb: 1.5 }}>
                    <StarIcon sx={{ fontSize: 16, color: 'secondary.main' }} />
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>
                      {p.rating}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      ({p.views})
                    </Typography>
                  </Stack>

                  <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7, mb: 2 }}>
                    {p.desc}
                  </Typography>

                  <Divider sx={{ mb: 1.5 }} />

                  <Typography
                    sx={{ color: 'text.secondary', fontSize: '0.7rem', fontWeight: 700, letterSpacing: 0.5, mb: 1 }}
                  >
                    SẢN PHẨM SỬ DỤNG
                  </Typography>

                  <Stack direction="row" spacing={1}>
                    {p.products.map((prod) => (
                      <Chip
                        key={prod.label}
                        icon={<prod.icon sx={{ fontSize: 15 }} />}
                        label={prod.label}
                        size="small"
                        variant="outlined"
                        sx={{ borderColor: 'divider', color: 'text.secondary' }}
                      />
                    ))}
                  </Stack>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
