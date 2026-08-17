import { Box, Container, Stack, Typography, Divider } from '@mui/material';
import Grid from "@mui/material/Grid2"

const shopLinks = ['Smart phone', 'Laptops', 'Smart watch', 'Camera'];
const companyLinks = ['About us', 'Supports & help', 'Contact us', 'Careers'];
const legalLinks = ['Privacy policy', 'Terms of service'];
const bottomLinks = ['Privacy policy', 'Terms of service', 'Tech specs', 'Warranty'];

export default function Footer() {
  return (
    <Box sx={{ bgcolor: 'background.default', pt: { xs: 6, md: 8 }, pb: 3 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography variant="h5" sx={{ mb: 1.5, color: '#fff' }}>
              FPT SMART HOME
            </Typography>
            <Typography sx={{ color: 'text.secondary', maxWidth: 280, lineHeight: 1.8 }}>
              Giải pháp công nghệ tân tiến dành cho bạn. FPT SAMRT HOME công nghệ hiện đại hàng đầu Việt Nam
            </Typography>
          </Grid>

          <Grid size={{ xs: 6, sm: 6, md: 2.5 }}>
            <Typography sx={{ fontWeight: 700, mb: 1.5, color: '#fff', fontSize: 25 }}>Shop</Typography>
            <Stack spacing={1}>
              {shopLinks.map((l) => (
                <Typography key={l} sx={{ color: 'text.secondary', cursor: 'pointer' }}>
                  {l}
                </Typography>
              ))}
            </Stack>
          </Grid>

          <Grid size={{ xs: 6, sm: 6, md: 2.5 }}>
            <Typography sx={{ fontWeight: 700, mb: 1.5, color: '#fff', fontSize: 25 }}>Company</Typography>
            <Stack spacing={1}>
              {companyLinks.map((l) => (
                <Typography key={l} sx={{ color: 'text.secondary', cursor: 'pointer' }}>
                  {l}
                </Typography>
              ))}
            </Stack>
          </Grid>

          <Grid size={{ xs: 6, sm: 6, md: 3 }}>
            <Typography sx={{ fontWeight: 700, mb: 1.5, color: '#fff', fontSize: 25 }}>Legal</Typography>
            <Stack spacing={1}>
              {legalLinks.map((l) => (
                <Typography key={l} sx={{ color: 'text.secondary', cursor: 'pointer' }}>
                  {l}
                </Typography>
              ))}
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          spacing={2}
        >
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            @2026 FPT SMART HOME. Technology and Future for you.
          </Typography>
          <Stack direction="row" spacing={3}>
            {bottomLinks.map((l) => (
              <Typography
                key={l}
                variant="body2"
                sx={{ color: 'text.secondary', cursor: 'pointer' }}
              >
                {l}
              </Typography>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
