import { Box, Container, Typography, Stack, IconButton, Button } from '@mui/material';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import LanguageIcon from '@mui/icons-material/Language';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import Grid from '@mui/material/Grid2';

const contactItems = [
  {
    icon: LocationOnOutlinedIcon,
    label: 'Địa chỉ văn phòng',
    value: 'Số 7 Thanh Nhàn - Thanh Xuân - Sóc Sơn - Hà Nội',
  },
  {
    icon: EmailOutlinedIcon,
    label: 'Email hỗ trợ',
    value: 'HRztech@gmail.com',
  },
  {
    icon: LocalPhoneOutlinedIcon,
    label: 'Hotline 24/7',
    value: '0328016662',
  },
];

const socials = [LanguageIcon, LinkedInIcon, FacebookIcon, ChatBubbleIcon];

const officeAddress = contactItems[0].value;
const mapEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(officeAddress)}&output=embed`;
const mapLinkSrc = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(officeAddress)}`;

export default function ContactSection() {
  return (
    <Box sx={{ bgcolor: '#0d1522', py: { xs: 8, md: 10 } }}>
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
              <Typography variant="h4" sx={{ fontSize: { xs: '1.5rem', md: '1.7rem' }, mb: 2, color: 'common.white', fontWeight: 700 }}>
                Kết nối với chúng tôi
              </Typography>
              <Typography sx={{ color: 'text.secondary', mb: 4, lineHeight: 1.8 }}>
                Sẵn sàng trải nghiệm tương lai ? Hãy ghé thăm trụ sở hoặc liên hệ với đội
                ngũ chuyên gia của chúng tôi để được tư vấn các giải pháp công nghệ tối ưu.
              </Typography>

              <Stack spacing={3} sx={{ mb: 4 }}>
                {contactItems.map((item) => (
                  <Stack key={item.label} direction="row" spacing={2} sx={{ alignItems: 'flex-start' }}>
                    <item.icon sx={{ color: 'secondary.main', fontSize: 22, mt: 0.3 }} />
                    <Box>
                      <Typography sx={{ fontWeight: 700, color: 'common.white' }}>{item.label}</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>{item.value}</Typography>
                    </Box>
                  </Stack>
                ))}
              </Stack>

              <Stack direction="row" spacing={1.5}>
                {socials.map((Icon, i) => (
                  <IconButton
                    key={i}
                    sx={{
                      bgcolor: 'rgba(255,255,255,0.06)',
                      color: 'text.primary',
                      width: 40,
                      height: 40,
                      '&:hover': { bgcolor: 'rgba(255,255,255,0.12)' },
                    }}
                  >
                    <Icon fontSize="small" />
                  </IconButton>
                ))}
              </Stack>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                position: 'relative',
                height: { xs: 320, md: '100%' },
                minHeight: { md: 420 },
                bgcolor: '#0a0f1a',
                overflow: 'hidden',
              }}
            >
              <Box
                component="iframe"
                src={mapEmbedSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                sx={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  border: 0,
                  filter: 'invert(92%) hue-rotate(180deg) contrast(88%) brightness(96%)',
                }}
              />

              <Box
                sx={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%,-50%)',
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  component="a"
                  href={mapLinkSrc}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ px: 3, py: 1.2, fontWeight: 700, boxShadow: 3, whiteSpace: 'nowrap' }}
                >
                  Mở trong Google Map
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
