import { Box, Container, Typography } from '@mui/material';
import AppleIcon from '@mui/icons-material/Apple';
import Grid from "@mui/material/Grid2"

const partners = [
  {
    label: 'Tập đoàn FPT',
    logo: (
      <Typography sx={{ fontWeight: 800, fontSize: '1.6rem', letterSpacing: 1 }}>
        <Box component="span" sx={{ color: '#f47920' }}>F</Box>
        <Box component="span" sx={{ color: '#00a651' }}>P</Box>
        <Box component="span" sx={{ color: '#0071bc' }}>T</Box>
      </Typography>
    ),
  },
  {
    label: 'Apple',
    logo: <AppleIcon sx={{ fontSize: '2.2rem', color: '#e9e9ec' }} />,
  },
  {
    label: 'Viettel',
    logo: (
      <Typography
        sx={{
          fontWeight: 800,
          fontSize: '1.5rem',
          fontStyle: 'italic',
          color: '#ee0033',
        }}
      >
        viettel
      </Typography>
    ),
  },
  {
    label: 'Tập đoàn VNG',
    logo: (
      <Typography sx={{ fontWeight: 800, fontSize: '1.6rem', color: '#e9e9ec' }}>
        VNG
      </Typography>
    ),
  },
];

export default function PartnersSection() {
  return (
    <Box sx={{ bgcolor: 'background.default', py: 5 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" sx={{ textAlign: 'center', mb: 5, fontSize: { xs: '1.6rem', md: '2rem' }, color: '#fff' }}>
          Đối tác chiến lược
        </Typography>

        <Grid container spacing={3}>
          {partners.map((p) => (
            <Grid key={p.label} size={{ xs: 6, md: 3 }}>
              <Box
                sx={{
                  bgcolor: '#121218',
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 2,
                  py: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 1.5,
                }}
              >
                {p.logo}
                <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                  {p.label}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
