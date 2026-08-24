import { Box, Container, Stack, Typography, TextField, Button, Avatar } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PersonIcon from '@mui/icons-material/Person';
import Grid from '@mui/material/Grid2';
import { COLORS } from '@/constants/colors';
import InputText from '@/components/InputText';

const checklist = [
  'Phân tích hạ tầng hiện tại miễn phí',
  'Báo giá linh kiện theo giá',
  'Hỗ trợ kĩ thuật 24/7 sau triển khai',
];

const fieldSx = {
  '& .MuiOutlinedInput-root': {
    bgcolor: '#0a0f1a',
    '& fieldset': { borderColor: 'divider' },
    '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
    '&.Mui-focused fieldset': { borderColor: 'secondary.main' },
  },
  '& .MuiOutlinedInput-input': { color: 'text.primary', py: 1.6 },
};

export default function ContactCTASection() {
  return (
    <Box sx={{ bgcolor: '#000000', py: 6 }}>
      <Container maxWidth="lg">
        <Grid container spacing={6} sx={{ alignItems: 'flex-start' }}>
          <Grid size={{ xs: 12, md: 5 }}>
            <Typography sx={{ fontSize: '1.5rem', mb: 2.5, color: COLORS.COLOR_DETAIL }}>
              Sẵn sàng để nâng tầm công nghệ ?
            </Typography>
            <Typography sx={{ color: 'text.secondary', mb: 4, lineHeight: 1.8 }}>
              Điền thông tin vào biểu mẫu bên cạnh, chuyên viên kỹ thuật ZTECH sẽ liên hệ để
              thảo luận về dự án của bạn và đưa ra lộ trình giải pháp phần cứng tối ưu nhất
            </Typography>

            <Stack spacing={2} sx={{ mb: 4 }}>
              {checklist.map((item) => (
                <Stack key={item} direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
                  <CheckCircleIcon sx={{ color: 'secondary.main', fontSize: 22 }} />
                  <Typography sx={{ color: 'text.primary' }}>{item}</Typography>
                </Stack>
              ))}
            </Stack>

            <Box
              sx={{
                bgcolor: '#0d1522',
                border: '1px solid',
                borderColor: 'divider',
                borderLeft: '10px solid',
                borderLeftColor: 'secondary.main',
                borderRadius: 2,
                p: 3,
              }}
            >
              <Typography sx={{ fontStyle: 'italic', color: 'text.primary', mb: 2.5, lineHeight: 1.8 }}>
                " ZTECH không chỉ bán phần cứng, họ cung cấp sự yên tâm cho hệ thống cốt lõi
                của chúng tôi. "
              </Typography>
              <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
                <Avatar sx={{ width: 34, height: 34, bgcolor: '#f5b400' }}>
                  <PersonIcon fontSize="small" />
                </Avatar>
                <Typography sx={{ fontWeight: 700, color: 'common.white' }}>Giám đốc công nghệ VinTech</Typography>
              </Stack>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 7 }}>
            <Box
              sx={{
                bgcolor: '#0d1522',
                border: '1px solid',
                borderColor: 'rgba(34,211,238,0.25)',
                borderRadius: 3,
                p: { xs: 3, md: 4 },
                boxShadow: '0 0 40px rgba(34,211,238,0.08)',
              }}
            >
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography sx={{ mb: 1, fontWeight: 600, color: 'common.white' }}>Họ tên</Typography>
                  <InputText
                    label=""
                    value=""
                    name=""
                    type="text"
                    onChange={() => {}}
                    bgcolor='0a0f1a'
                    sx={fieldSx}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography sx={{ mb: 1, fontWeight: 600, color: 'common.white' }}>Số điện thoại</Typography>
                  <InputText
                    label=""
                    value=""
                    name=""
                    type="text"
                    onChange={() => {}}
                    bgcolor='0a0f1a'
                    sx={fieldSx}
                  />
                </Grid>
                <Grid size={12}>
                  <Typography sx={{ mb: 1, fontWeight: 600, color: 'common.white' }}>Email</Typography>
                  <InputText
                    label=""
                    value=""
                    name=""
                    type="text"
                    onChange={() => {}}
                    bgcolor='0a0f1a'
                    sx={fieldSx}
                  />
                </Grid>
                <Grid size={12}>
                  <Typography sx={{ mb: 1, fontWeight: 600, color: 'common.white' }}>Yêu cầu tư vấn</Typography>
                  <InputText
                    label=""
                    value=""
                    name=""
                    type="text"
                    onChange={() => {}}
                    bgcolor='0a0f1a'
                    sx={fieldSx}
                  />
                </Grid>
                <Grid size={12}>
                  <Button variant="contained" color="primary" size="large" fullWidth sx={{ py: 1.2 }}>
                    Nộp đơn yêu cầu
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
