import { Box, Container, Typography } from "@mui/material";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import map from "@/assets/images/users/map.png"

const stats = [
  { value: '300++', label: 'Đại lý và nhà phân phối' },
  { value: '400++', label: 'Văn phòng giao dịch' },
  { value: '120++', label: 'Shop nhượng quyền' },
  { value: '63', label: 'Tỉnh/thành phố ở Việt Nam' },
];

function StatItem({ value, label, align = 'left' }: { value: string; label: string; align?: 'left' | 'right' }) {
  return (
    <Box sx={{ textAlign: align, maxWidth: 220 }}>
        <Box sx={{ width: 40, height: 3, bgcolor: '#4fd1ff', mb: 1.5, ml: align === 'right' ? 'auto' : 0 }} />
        <Typography sx={{ color: '#4fd1ff', fontWeight: 800, fontSize: { xs: '1.5rem', md: '2.1rem' }, lineHeight: 1.1 }}>
            {value}
        </Typography>
        <Typography sx={{ color: 'rgba(255,255,255,0.85)', mt: 0.75, fontSize: { xs: '0.85rem', md: '0.95rem' } }}>
            {label}
        </Typography>
    </Box>
  );
}

function IslandMarker({ label, top, left }: { label: string; top: string; left: string }) {
  return (
    <Box sx={{ position: 'absolute', top, left, transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
      <StarRoundedIcon sx={{ color: '#8fd6f0', fontSize: { xs: 32, md: 44 } }} />
      <Typography sx={{ color: '#8fd6f0', fontSize: { xs: '0.6rem', md: '0.7rem' }, mt: -0.5 }}>
        {label}
      </Typography>
    </Box>
  );
}

export default function Market() {
    return(
        <Box sx={{ bgcolor: '#0d1522', py: 5 }}>
            <Container maxWidth="lg">
                <Typography
                    variant="h5"
                    sx={{ textAlign: 'center', letterSpacing: 1, mb: { xs: 5, md: 7 }, color: 'common.white', fontWeight: 700 }}
                >
                    THỊ TRƯỜNG FPT SMART HOME
                </Typography>
                <Box
                    sx={{
                        position: 'relative',
                        minHeight: { xs: 480, md: 640 },
                        backgroundImage: `url(${map})`,
                        backgroundSize: 'contain',
                        backgroundPosition: 'top center',
                        backgroundRepeat: 'no-repeat',
                    }}
                >
                    <Box sx={{ position: 'absolute', top: { xs: '25%', md: '18%' }, left: { xs: 0, md: '2%' } }}>
                        <StatItem {...stats[0]} />
                    </Box>

                    <Box sx={{ position: 'absolute', top: { xs: '10%', md: '18%' }, right: { xs: 0, md: '12%' } }}>
                        <StatItem {...stats[1]} />
                    </Box>

                    <Box sx={{ position: 'absolute', top: { xs: '55%', md: '46%' }, left: { xs: '6%', md: '10%' } }}>
                        <StatItem {...stats[2]} />
                    </Box>

                    <Box sx={{ position: 'absolute', top: { xs: '55%', md: '52%' }, right: { xs: 0, md: '0%' } }}>
                        <StatItem {...stats[3]} align="right" />
                    </Box>

                    {/* <IslandMarker label="Hoàng Sa" top="42%" left="68%" />
                    <IslandMarker label="Trường Sa" top="68%" left="76%" /> */}
                </Box>
            </Container>
        </Box>
    )
}
