import { Box, Container, createTheme, Stack, ThemeProvider, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';
import theme from '@/theme/theme';
import Header from '../LandingPage/Header';
import { Link as RouterLink} from "react-router-dom"

const bottomLinks = ['Privacy policy', 'Terms of service', 'Tech specs', 'Warranty'];

function Logo({ size = 'md' }: { size?: 'md' | 'sm' }) {
  const big = size === 'md';
  return (
    <Stack spacing={0} sx={{ lineHeight: 1 }}>
      <Typography
        sx={{
          fontFamily: '"Arial Black", Arial, sans-serif',
          fontStyle: 'italic',
          fontWeight: 900,
          fontSize: big ? '1.7rem' : '2rem',
          letterSpacing: 1,
          color: 'text.primary',
        }}
      >
        FPT
      </Typography>
      <Typography
        sx={{
          fontSize: big ? '0.7rem' : '1rem',
          letterSpacing: 1,
          color: 'text.secondary',
          mt: '-4px',
        }}
      >
        Smart Home
      </Typography>
    </Stack>
  );
}

function AuthFooter() {
  return (
    <Box sx={{ bgcolor: 'background.default', py: 4 }}>
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          spacing={2}
        >
          <Box component={RouterLink} to="/" sx={{ display: 'flex', textDecoration: 'none' }}>
            <Logo size="sm" />
          </Box>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            @2026 Ztech. Technology and Future for you.
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

export default function AuthLayout() {
  return (
    <ThemeProvider theme={theme}>
        <Box 
          sx={{ 
              bgcolor: 'background.default',
              minHeight: '100svh',
              paddingTop: '64px',
            }}
          >
            <Header/>
            <Box flexGrow={1}>
              <Outlet/>
            </Box>
            <AuthFooter/>
      </Box>
    </ThemeProvider>
  );
}
