import {
  Box,
  Container,
  Stack,
  Typography,
  Card,
  Chip,
  CardMedia,
} from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import StarIcon from '@mui/icons-material/Star';
import Grid from "@mui/material/Grid2"
import IconButton from '@/components/IconButton/IconButton';
import switch_athena from "@/assets/images/users/cong-tac-athena.png";
import switch_rectangle from "@/assets/images/users/cong-tac-hcn.png";
import switch_leto from "@/assets/images/users/cong-tac-leto.png";
import switch_square from "@/assets/images/users/cong-tac-hv.png";
import { COLORS } from '@/constants/colors';

const products = [
  {
    url: switch_athena,
    tags: ['LTE', 'OLED'],
    name: 'Công tắc ATHENA 4 nút',
    rating: 4.9,
    views: '120',
    price: '978,000 VNĐ',
    oldPrice: '1,200,000 VNĐ',
  },
  {
    url: switch_rectangle,
    tags: ['NHỰA ABS', 'MESH 5.0'],
    name: 'Công tắc rèm chữ nhật',
    rating: 4.9,
    views: '240',
    price: '1,529,000 VNĐ',
    oldPrice: '1,600,000 VNĐ',
  },
  {
    url: switch_leto,
    tags: ['M3 CHIP', '2TB SSD'],
    name: 'Công tắc LETO 4 nút',
    rating: 4.9,
    views: '2.000',
    price: '979,000 VNĐ',
    oldPrice: '990,000 VNĐ',
  },
  {
    url: switch_square,
    tags: ['NHỰA ABS', 'MESH 5.0'],
    name: 'Công tắc rèm vuông',
    rating: 4.9,
    views: '8.000',
    price: '1,639,000 VNĐ',
    oldPrice: '1,750,000 VNĐ',
  },
];

export default function BestSellers() {
  return (
    <Box sx={{ bgcolor: 'background.default', py: { xs: 6, md: 8 } }}>
      <Container maxWidth="lg">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 4 }}
        >
          <Typography variant="h4" sx={{ fontSize: { xs: '1.6rem', md: '2.5rem' }, color: '#fff' }}>
            Sản phẩm bán chạy
          </Typography>
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{ cursor: 'pointer', color: 'text.primary' }}
          >
            <Typography sx={{ fontWeight: 600, fontSize: { xs: 15, md: 18 } }}>Xem tất cả</Typography>
            <IconButton
              borderRadius='50%'
              border='1px solid #fff'
              width={20}
              height={20}
              icon={<ArrowForwardIosIcon sx={{ fontSize: 14 }} />}
            />
            
          </Stack>
        </Stack>

        <Grid container spacing={3}>
          {products.map((p) => (
            <Grid key={p.name} size={{ xs: 12, sm: 6, md: 3 }}>
              <Card
                sx={{
                  bgcolor: '#121218',
                  border: '1px solid',
                  borderColor: 'divider',
                  p: 1,
                }}
                
              >
                <CardMedia
                  sx={{ 
                    height: { xs: '100%', md: 272 },
                    width: '100%',
                    borderTopRightRadius: 10,
                    borderTopLeftRadius: 10
                  }}
                  component='img'
                  image={p.url}
                />

                <Box display='flex' flexDirection='column' justifyContent={{ xs: 'center', md: 'flex-start'}} alignItems={{ xs: 'center', md: 'flex-start'}}>
                  <Stack direction="row" spacing={1} sx={{ my: 1.5 }}>
                    {p.tags.map((tag) => (
                      <Chip
                        key={tag}
                        label={tag}
                        size="small"
                        variant="outlined"
                        sx={{ borderColor: COLORS.COLOR_DETAIL, color: COLORS.COLOR_DETAIL, fontSize: { xs: '0.7rem', md: '0.8rem'}, p: 1 }}
                      />
                    ))}
                  </Stack>

                  <Typography sx={{ fontWeight: 700, mb: 0.5, fontSize: { xs: 16, md: 20 } }}>{p.name}</Typography>

                  <Stack direction="row" spacing={0.5} alignItems="center" sx={{ mb: 1 }}>
                    <StarIcon sx={{ fontSize: 16, color: 'secondary.main' }} />
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {p.rating}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      ({p.views} VIEWS)
                    </Typography>
                  </Stack>

                  <Typography sx={{ color: 'secondary.main', fontWeight: 800, fontSize: '1.2rem' }}>
                    {p.price}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: 'text.secondary', textDecoration: 'line-through' }}
                  >
                    {p.oldPrice}
                  </Typography>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
