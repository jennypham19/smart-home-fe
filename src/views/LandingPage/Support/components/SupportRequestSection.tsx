import { Box, Container, Stack, Typography, TextField, Button, Avatar } from '@mui/material';
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
import PersonIcon from '@mui/icons-material/Person';
import SendIcon from '@mui/icons-material/Send';
import Grid from '@mui/material/Grid2';
import InputText from '@/components/InputText';
import support_chat from "@/assets/images/users/support_chat.png";

const fieldSx = {
  '& .MuiOutlinedInput-root': {
    bgcolor: '#0a0f1a',
    '& fieldset': { borderColor: 'divider' },
    '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
    '&.Mui-focused fieldset': { borderColor: 'secondary.main' },
  },
  '& .MuiOutlinedInput-input': { color: 'text.primary', py: 1.6 },
};

function ChatBubble({
  align,
  name,
  message,
  avatarColor,
  icon: Icon,
}: {
  align: 'left' | 'right';
  name: string;
  message: string;
  avatarColor: string;
  icon: typeof SmartToyOutlinedIcon;
}) {
  return (
    <Stack
      direction={align === 'right' ? 'row-reverse' : 'row'}
      spacing={1.5}
      sx={{ alignItems: 'flex-start', maxWidth: '85%', ml: align === 'right' ? 'auto' : 0 }}
    >
      <Avatar sx={{ width: 36, height: 36, bgcolor: avatarColor, border: '2px solid', borderColor: 'secondary.main' }}>
        <Icon fontSize="small" />
      </Avatar>
      <Box>
        <Typography
          variant="body2"
          sx={{ fontWeight: 700, mb: 0.5, textAlign: align === 'right' ? 'right' : 'left', color: 'common.white' }}
        >
          {name}
        </Typography>
        <Box
          sx={{
            bgcolor: '#504c4cb2',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2,
            px: 2,
            py: 1.5,
          }}
        >
          <Typography variant="body2" sx={{ color: 'text.primary', lineHeight: 1.6 }}>
            {message}
          </Typography>
        </Box>
      </Box>
    </Stack>
  );
}

export default function SupportRequestSection() {
  return (
    <Box sx={{ bgcolor: '#0a0f1a', py: 6 }}>
      <Container maxWidth="lg">
        <Grid
          container
          spacing={0}
          sx={{
            bgcolor: '#121a2a',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 3,
            overflow: 'hidden',
          }}
        >
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ p: { xs: 3, md: 5 } }}>
              <Typography variant="h4" sx={{ fontSize: { xs: '1.5rem', md: '1.7rem' }, mb: 1.5, color: 'common.white' }}>
                Gửi yêu cầu tư vấn/ hỗ trợ
              </Typography>
              <Typography sx={{ color: 'text.secondary', mb: 4, lineHeight: 1.8 }}>
                Mọi thắc mắc quý khách vui lòng điền thông tin vào form mẫu và gửi về
                tổng đài của chúng tôi
              </Typography>

              <Grid container spacing={2.5}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography sx={{ mb: 1, fontWeight: 600, color: 'common.white' }}>Họ và tên</Typography>
                  <InputText
                    type="text"
                    label=""
                    name=''
                    onChange={() => {}}
                    value=""
                    sx={fieldSx}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography sx={{ mb: 1, fontWeight: 600, color: 'common.white' }}>Số điện thoại</Typography>
                  <InputText
                    type="text"
                    label=""
                    name=''
                    onChange={() => {}}
                    value=""
                    sx={fieldSx}
                  />
                </Grid>
                <Grid size={12}>
                  <Typography sx={{ mb: 1, fontWeight: 600, color: 'common.white' }}>Sản phẩm tư vấn/ hỗ trợ</Typography>
                  <InputText
                    type="text"
                    label=""
                    name=''
                    onChange={() => {}}
                    value=""
                    sx={fieldSx}
                  />
                </Grid>
                <Grid size={12}>
                  <Typography sx={{ mb: 1, fontWeight: 600, color: 'common.white' }}>Mô tả chi tiết</Typography>
                  <InputText
                    type="text"
                    label=""
                    name=''
                    onChange={() => {}}
                    value=""
                    sx={fieldSx}
                    multiline
                    rows={4}
                  />
                </Grid>
                <Grid size={12}>
                  <Button fullWidth variant="contained" color="primary" size="large" sx={{ px: 4, py: 1 }}>
                    Nộp đơn yêu cầu
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                position: 'relative',
                height: { xs: 460, md: '100%' },
                minHeight: { md: 520 },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: `
                    linear-gradient(
                      rgba(11, 18, 32, 0.65),
                      rgba(11, 18, 32, 0.65)
                    ),
                    url(${support_chat})
                  `,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  opacity: 0.7,
                  zIndex: 0,
                }, 
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                p: { xs: 2.5, md: 3 },
                gap: 2,
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
              <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: 2, zIndex: 1 }}>
                <ChatBubble
                  align="right"
                  name="ALEX CHATBOT"
                  message="Tôi đã sẵn sàng để giải đáp các thắc mắc của bạn"
                  avatarColor="#2f6fed"
                  icon={SmartToyOutlinedIcon}
                />
                <ChatBubble
                  align="left"
                  name="BẠN"
                  message="Tôi cần sửa lỗi cập nhật windows 11 tại laptop ASUS ZENBOOK PRO 32"
                  avatarColor="#f5b400"
                  icon={PersonIcon}
                />
              </Box>

              <Stack
                direction="row"
                spacing={1}
                sx={{
                  alignItems: 'center',
                  bgcolor: 'rgba(10,15,26,0.85)',
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 5,
                  px: 2,
                  py: 1,
                  zIndex: 1,
                }}
              >
                <Typography sx={{ color: 'text.secondary', flexGrow: 1 }}>Bạn muốn hỏi gì ?</Typography>
                <SendIcon sx={{ color: 'secondary.main', fontSize: 20 }} />
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
