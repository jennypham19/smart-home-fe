import { Box, Container, Typography } from '@mui/material';
import Grid from "@mui/material/Grid2"

const stats = [
  { value: '35%', label: 'NĂNG LƯỢNG TIẾT KIỆM' },
  { value: '500+', label: 'DỰ ÁN THÔNG MINH' },
  { value: '98%', label: 'KHÁCH HÀNG HÀI LÒNG' },
];

export default function ProjectsStatsSection() {
  return (
    <Box sx={{ bgcolor: '#060a12', py: { xs: 8, md: 10 } }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {stats.map((s) => (
            <Grid key={s.label} size={{ xs: 12, sm: 4 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography
                  sx={{
                    color: 'primary.main',
                    fontWeight: 800,
                    fontSize: { xs: '2.2rem', md: '2.6rem' },
                    lineHeight: 1.1,
                  }}
                >
                  {s.value}
                </Typography>
                <Typography
                  sx={{ color: 'text.secondary', mt: 1, letterSpacing: 1, fontSize: '0.8rem', fontWeight: 600 }}
                >
                  {s.label}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
