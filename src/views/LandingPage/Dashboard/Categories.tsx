import { Box, Container, Stack, Typography, Card, CardActionArea, CardMedia } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import CameraOutdoorIcon from '@mui/icons-material/CameraOutdoor';
import WatchIcon from '@mui/icons-material/Watch';
import Grid from "@mui/material/Grid2"
import IconButton from '@/components/IconButton/IconButton';
import smart_phone from "@/assets/images/users/smart_phone.png";
import laptops from "@/assets/images/users/laptops.png";
import camera from "@/assets/images/users/camera.png";
import smart_watch from "@/assets/images/users/smart_watch.png";

const categories = [
  { label: 'Smart phone', icon: PhoneIphoneIcon, url: smart_phone },
  { label: 'Laptops', icon: LaptopMacIcon, url: laptops },
  { label: 'Camera', icon: CameraOutdoorIcon, url: camera },
  { label: 'Smart watch', icon: WatchIcon, url: smart_watch },
];

export default function Categories() {
  return (
    <Box sx={{ bgcolor: '#0d1522', py: { xs: 6, md: 8 } }}>
      <Container maxWidth="lg">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 4 }}
        >
          <Typography variant="h4" sx={{ fontSize: { xs: '1.6rem', md: '2.5rem' }, color: '#fff' }}>
            Danh mục sản phẩm
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
          {categories.map(({ label, icon: Icon, url }) => (
            <Grid key={label} size={{ xs: 6, md: 3 }}>
              <Card
                sx={{
                  bgcolor: '#121a2a',
                  border: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <CardMedia
                  sx={{
                    height: '100%',
                    width: '100%',
                  }}
                  component='img'
                  image={url}
                />
                <CardActionArea sx={{ py: 2 }}>
                  <Stack alignItems="center" spacing={2}>
                    {/* <Icon sx={{ fontSize: 56, color: '#e9e9ec' }} /> */}
                    <Typography variant='h5' sx={{ fontWeight: 600 }}>{label}</Typography>
                  </Stack>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
