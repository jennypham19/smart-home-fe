import { Box, Container, Stack, Typography, Button, Divider } from '@mui/material';
import HeadsetMicOutlinedIcon from '@mui/icons-material/HeadsetMicOutlined';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Grid from '@mui/material/Grid2';

const shippingOptions = [
  { label: 'Giao hỏa tốc', value: '2-4 giờ' },
  { label: 'Giao nhanh', value: '1-2 ngày' },
  { label: 'Giao tiết kiệm', value: '3-4 ngày' },
];

const returnOptions = [
  { label: 'Thủ tục nhanh', value: '15 phút' },
  { label: 'Trả hàng gọn', value: 'Online' },
  { label: 'Bảo hành uy tín', value: '2-4 năm' },
];

function IconBadge({ icon: Icon }: { icon: typeof HeadsetMicOutlinedIcon }) {
  return (
    <Box
      sx={{
        width: 44,
        height: 44,
        borderRadius: 1.5,
        bgcolor: 'rgba(34,211,238,0.12)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mb: 2,
      }}
    >
      <Icon sx={{ fontSize: 22, color: 'secondary.main' }} />
    </Box>
  );
}

function Card({ children, sx }: { children: React.ReactNode; sx?: object }) {
  return (
    <Box
      sx={{
        bgcolor: '#121a2a',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        p: 3,
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}

export default function SupportCenterSection() {
  return (
    <Box sx={{ bgcolor: '#0a0f1a', py: 6 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} sx={{ mb: 6, alignItems: 'flex-end' }}>
          <Grid size={{ xs: 12, md: 5 }}>
            <Typography sx={{ color: 'text.secondary', fontWeight: 700, letterSpacing: 1, fontSize: '0.8rem', mb: 1.5 }}>
              TRUNG TÂM HỖ TRỢ
            </Typography>
            <Typography variant="h4" sx={{ fontSize: { xs: '1.7rem', md: '2rem' }, color: 'common.white' }}>
              Liên hệ hỗ trợ
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 7 }}>
            <Typography sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
              Chúng tôi mang đến hệ sinh thái dịch vụ hỗ trợ toàn diện cho khách hàng
              mua đồ điện tử, từ tư vấn chọn sản phẩm, lắp đặt tận nơi, hướng dẫn sử
              dụng, bảo hành chính hãng đến hỗ trợ kỹ thuật nhanh chóng. Nhờ đó, khách
              hàng luôn yên tâm trải nghiệm, sử dụng thiết bị thuận tiện và bền lâu hơn.
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid size={{ xs: 12, md: 3 }}>
            <Card>
              <IconBadge icon={HeadsetMicOutlinedIcon} />
              <Typography sx={{ fontWeight: 700, mb: 1, color: 'text.secondary' }}>24/7 HOTLINE</Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1, lineHeight: 1.7 }}>
                Chúng tôi luôn túc trực để phục vụ nhu cầu, thắc mắc của quý khách.
              </Typography>
              <Divider sx={{ borderColor: 'divider', mb: 1 }} />
              <Typography sx={{ color: 'secondary.main', fontWeight: 800, fontSize: '1.2rem' }}>
                0328016662
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Số hotline tổng đài
              </Typography>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 2.5 }}>
                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#22c55e' }} />
                <Typography sx={{ color: 'common.white', fontWeight: 700, fontSize: '0.75rem', letterSpacing: 0.5 }}>
                  TƯ VẤN 24/7 TRỰC TIẾP
                </Typography>
              </Stack>
              <Typography sx={{ fontWeight: 700, mb: 1, fontSize: '1.05rem', color: 'text.secondary' }}>
                Nhận tư vấn từ nhân viên
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3, lineHeight: 1.7, maxWidth: '70%' }}>
                Khách hàng có thắc mắc hoặc nhu cầu tư vấn sản phẩm xin vui lòng liên
                hệ với chúng tôi trực tiếp qua hotline. Hoặc nhắn vào tham gia tư vấn
                dưới đây !
              </Typography>
              <Button variant="contained" color="primary">
                Tham gia tư vấn
              </Button>
              <ForumOutlinedIcon
                sx={{
                  position: 'absolute',
                  right: 20,
                  bottom: 16,
                  fontSize: 64,
                  color: 'rgba(255,255,255,0.08)',
                }}
              />
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <Card sx={{ display: 'flex', flexDirection: 'column' }}>
              <IconBadge icon={ShieldOutlinedIcon} />
              <Typography sx={{ fontWeight: 700, mb: 1, color: 'text.secondary' }}>Bảo mật khách hàng</Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2.5, lineHeight: 1.7, flexGrow: 1 }}>
                Mọi thông tin liên hệ từ khách hàng sẽ được ZTECH bảo vệ cho tới khi
                kết thúc hợp đồng.
              </Typography>
              <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center', color: 'secondary.main', cursor: 'pointer' }}>
                <Typography variant="body2" sx={{ textDecoration: 'underline' }}>
                  Đọc &amp; tìm hiểu kĩ các điều khoản
                </Typography>
                <OpenInNewIcon sx={{ fontSize: 14 }} />
              </Stack>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 3, alignItems: 'flex-start' }}>
              <Box sx={{ flexShrink: 0, maxWidth: { sm: '55%' } }}>
                <IconBadge icon={LocalShippingOutlinedIcon} />
                <Typography sx={{ fontWeight: 700, mb: 1, color: 'text.secondary' }}>Vận chuyển toàn quốc</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                  Đơn vị vận chuyển toàn quốc. Các phương thức vận chuyển bao gồm dưới
                  đây !
                </Typography>
              </Box>
              <Stack spacing={1.25} sx={{ flexGrow: 1, width: '100%' }}>
                {shippingOptions.map((o) => (
                  <Stack
                    key={o.label}
                    direction="row"
                    sx={{
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      bgcolor: '#5F5F5F',
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: 5,
                      px: 2,
                      py: 1,
                    }}
                  >
                    <Typography variant="body2" sx={{ color: 'common.white' }}>{o.label}</Typography>
                    <Typography variant="body2" sx={{ color: 'secondary.main', fontWeight: 700 }}>{o.value}</Typography>
                  </Stack>
                ))}
              </Stack>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Card sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 3, alignItems: 'flex-start' }}>
              <Box sx={{ flexShrink: 0, maxWidth: { sm: '55%' } }}>
                <IconBadge icon={AutorenewOutlinedIcon} />
                <Typography sx={{ fontWeight: 700, mb: 1, color: 'text.secondary' }}>Đổi trả nhanh chóng</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                  Sản phẩm sau khi xuất kho sẽ được đổi trả trong vòng 15 ngày. Thủ tục
                  nhanh chóng.
                </Typography>
              </Box>
              <Stack spacing={1.25} sx={{ flexGrow: 1, width: '100%' }}>
                {returnOptions.map((o) => (
                  <Stack key={o.label} direction="row" spacing={2} py={1} sx={{ alignItems: 'center' }}>
                    <CheckCircleIcon sx={{ color: '#22c55e', fontSize: 18 }} />
                    <Typography variant="body2" sx={{ color: 'text.secondary', flexGrow: 1 }}>{o.label}</Typography>
                    <Typography variant="body2" sx={{ color: 'secondary.main', fontWeight: 700 }}>{o.value}</Typography>
                  </Stack>
                ))}
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
