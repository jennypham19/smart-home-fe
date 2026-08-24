import { Box, Container, Chip, Typography, Button, Stack, Avatar } from '@mui/material';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import InsightsIcon from '@mui/icons-material/Insights';
import SearchIcon from '@mui/icons-material/Search';
import HeadsetMicOutlinedIcon from '@mui/icons-material/HeadsetMicOutlined';
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';
import BoltOutlinedIcon from '@mui/icons-material/BoltOutlined';
import Grid from '@mui/material/Grid2';
import contact_hero from "@/assets/images/users/contact_hero.png"

const avatarColors = ['#2f6fed', '#f5b400', '#22b573'];

const features = [
  {
    icon: HeadsetMicOutlinedIcon,
    title: 'Tư vấn nhiệt tình',
    desc: 'Đội ngũ chuyên viên lắng nghe và phân tích nhu cầu để đề xuất sản phẩm phù hợp, giúp khách hàng lựa chọn chính xác và tiết kiệm chi phí.',
  },
  {
    icon: QuizOutlinedIcon,
    title: 'Giải đáp nhanh chóng',
    desc: 'Hỗ trợ tư vấn trực tuyến và trực tiếp với phản hồi nhanh, giúp khách hàng xử lý mọi thắc mắc về sản phẩm, tính năng và chính sách.',
  },
  {
    icon: BoltOutlinedIcon,
    title: 'Hỗ trợ kỹ thuật tận tâm',
    desc: 'Hướng dẫn cài đặt, kết nối và sử dụng thiết bị chi tiết, đồng hành cùng khách hàng trong suốt quá trình sử dụng sản phẩm.',
  },
];

function ConsultingGraphic() {
  return (
    <Box
      sx={{
        position: 'relative',
        height: { xs: 280, md: 380 },
        borderRadius: 3,
        overflow: 'hidden',
        background: 'radial-gradient(circle at 30% 20%, rgba(47,111,237,0.35), transparent 55%), linear-gradient(135deg, #10192c 0%, #0a1220 100%)',
        border: '1px solid',
        borderColor: 'divider',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <img src={contact_hero} alt="Contact Hero" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    </Box>
  );
}

function FeatureCard({ f }: { f: (typeof features)[number] }) {
  return (
    <Box
      sx={{
        bgcolor: '#121a2a',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        p: 3,
        height: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        gap: 2,
      }}
    >
      <f.icon sx={{ fontSize: 30, color: 'secondary.main', mb: 1.5, margin: 'auto 0' }} />
      <Stack>
        <Typography sx={{ fontWeight: 700, mb: 1, color: 'common.white' }}>
          {f.title}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
          {f.desc}
        </Typography>
      </Stack>
    </Box>
  );
}

export default function ContactHero() {
  return (
    <Box sx={{ bgcolor: 'background.default', py: { xs: 6, md: 10 } }}>
      <Container maxWidth="lg">
        <Grid container spacing={6} sx={{ alignItems: 'center', mb: { xs: 6, md: 8 } }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Chip
              label="TIÊN PHONG CÔNG NGHỆ SỐ"
              size="small"
              sx={{
                bgcolor: 'rgba(255,255,255,0.06)',
                color: 'secondary.main',
                border: '1px solid',
                borderColor: 'divider',
                fontWeight: 700,
                letterSpacing: 0.5,
                mb: 3,
              }}
            />

            <Typography
              variant="h2"
              sx={{ fontSize: { xs: '2.2rem', md: '3rem' }, lineHeight: 1.2, mb: 3, color: 'common.white' }}
            >
              Kiến tạo <Box component="span" sx={{ color: 'secondary.main' }}>tương lai</Box>
              <br />
              từ công nghệ
              <br />
              hiện đại
            </Typography>

            <Typography sx={{ color: 'text.secondary', mb: 4, lineHeight: 1.8, maxWidth: 520 }}>
              Chúng tôi kiến tạo tương lai công nghệ số. Với hơn một thập kỉ kinh nghiệm, tự
              hào là đơn vị tiên phong trong việc cung cấp các giải pháp công nghệ hiện đại.
            </Typography>

            <Button variant="contained" color="primary" size="large" sx={{ mb: 4 }}>
              Bắt đầu tư vấn
            </Button>

            <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
              <Stack direction="row">
                {avatarColors.map((c, i) => (
                  <Avatar
                    key={c}
                    sx={{
                      width: 40,
                      height: 40,
                      bgcolor: c,
                      border: '3px solid',
                      borderColor: 'background.default',
                      ml: i === 0 ? 0 : -1.25,
                    }}
                  />
                ))}
                <Avatar
                  sx={{
                    width: 40,
                    height: 40,
                    bgcolor: '#1a1a20',
                    color: 'text.primary',
                    border: '3px solid',
                    borderColor: 'background.default',
                    ml: -1.25,
                    fontSize: '0.75rem',
                    fontWeight: 700,
                  }}
                >
                  +200
                </Avatar>
              </Stack>
              <Typography sx={{ color: 'text.secondary' }}>
                Tham gia tư vấn cùng các chuyên gia hàng đầu
              </Typography>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <ConsultingGraphic />
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          {features.map((f) => (
            <Grid key={f.title} size={{ xs: 12, md: 4 }}>
              <FeatureCard f={f} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
