import { Box, Container, Stack, Typography, Card, Chip, Button, Divider } from '@mui/material';
import Grid from '@mui/material/Grid2';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { COLORS } from '@/constants/colors';

import camera from '@/assets/images/users/camera.png';
import switch_athena from '@/assets/images/users/cong-tac-athena.png';
import switch_leto from '@/assets/images/users/cong-tac-leto.png';
import switch_rectangle from '@/assets/images/users/cong-tac-hcn.png';
import switch_square from '@/assets/images/users/cong-tac-hv.png';
import cam_bien from '@/assets/images/users/cam-bien.png';

/* Two cards next to the TOP RATE feature */
const highlightCards = [
  { url: switch_square, name: 'Công tắc ATHENA hình chữ nhật', price: '1.969.000 VNĐ' },
  { url: switch_athena, name: 'Công tắc LETO 3 nút', price: '979.000 VNĐ' },
];

/* 2x2 grid of scene-switch products */
const gridProducts = [
  { url: switch_square, name: 'Công tắc ngữ cảnh 6 nút Athena', price: '970,000 VNĐ', tags: ['ANC', 'LDAC'] },
  { url: switch_athena, name: 'Công tắc ngữ cảnh 2 và 3 nút Athena', price: '979,000 VNĐ', tags: ['ANC', 'LDAC'] },
  { url: switch_leto, name: 'Công tắc ngữ cảnh 3 nút LETO', price: '979,000 VNĐ', tags: ['ANC', 'LDAC'] },
  { url: switch_rectangle, name: 'Công tắc 3 nút cửa cuốn thông minh', price: '900,000 VNĐ', tags: ['ANC', 'LDAC'] },
];

/* "500+ dự án đã sử dụng" side list */
const usedProducts = [
  { url: switch_athena, name: 'CÔNG TẮC ATHENA', price: '2.079.000 VNĐ' },
  { url: switch_leto, name: 'CÔNG TẮC LETO', price: '1.190.000 VNĐ' },
  { url: camera, name: 'FPT CAMERA SE3', price: '1.100.000 VNĐ' },
  { url: cam_bien, name: 'FPT CAMERA SE2S', price: '1.300.000 VNĐ' },
];

const priceSx = { color: COLORS.COLOR_DETAIL, fontWeight: 800 };

/* -------- Small product card (used in the 2x2 grid) -------- */
const ProductCard = ({
  url,
  name,
  price,
  tags,
}: {
  url: string;
  name: string;
  price: string;
  tags: string[];
}) => (
  <Card
    sx={{
      bgcolor: '#121a2a',
      border: '1px solid',
      borderColor: 'divider',
      overflow: 'hidden',
      height: '100%',
    }}
  >
    <Box
      sx={{
        height: 160,
        bgcolor: '#1a2436',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box component="img" src={url} alt={name} sx={{ maxHeight: '85%', maxWidth: '85%', objectFit: 'contain' }} />
    </Box>
    <Box sx={{ p: 2 }}>
      <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
        {tags.map((t) => (
          <Chip
            key={t}
            label={t}
            size="small"
            variant="outlined"
            sx={{ borderColor: 'divider', color: 'text.secondary', fontSize: '0.65rem', height: 22 }}
          />
        ))}
      </Stack>
      <Typography sx={{ fontWeight: 700, fontSize: '1rem', mb: 0.75, minHeight: 48 }}>{name}</Typography>
      <Typography sx={{ ...priceSx, fontSize: '1.1rem' }}>{price}</Typography>
    </Box>
  </Card>
);

/* -------- Compact card (highlight pair) -------- */
const HighlightCard = ({ url, name, price }: { url: string; name: string; price: string }) => (
  <Card
    sx={{
      bgcolor: '#121a2a',
      border: '1px solid',
      borderColor: 'divider',
      overflow: 'hidden',
      height: '100%',
    }}
  >
    <Box
      sx={{
        height: { xs: 160, md: 200 },
        bgcolor: '#f2f4f8',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box component="img" src={url} alt={name} sx={{ maxHeight: '80%', maxWidth: '80%', objectFit: 'contain' }} />
    </Box>
    <Box sx={{ p: 2 }}>
      <Typography sx={{ fontWeight: 700, fontSize: '1rem', mb: 0.75, minHeight: 48 }}>{name}</Typography>
      <Typography sx={{ ...priceSx, fontSize: '1.05rem' }}>{price}</Typography>
    </Box>
  </Card>
);

/* -------- Row in the "500+ dự án đã sử dụng" list -------- */
const UsedProductRow = ({ url, name, price }: { url: string; name: string; price: string }) => (
  <Stack direction="row" alignItems="center" spacing={2} sx={{ py: 2 }}>
    <Box
      sx={{
        width: 64,
        height: 56,
        borderRadius: 1.5,
        bgcolor: '#1a2436',
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box component="img" src={url} alt={name} sx={{ maxHeight: '80%', maxWidth: '80%', objectFit: 'contain' }} />
    </Box>
    <Box sx={{ flexGrow: 1, minWidth: 0 }}>
      <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', mb: 0.25 }} noWrap>
        {name}
      </Typography>
      <Typography sx={{ ...priceSx, fontSize: '1rem' }}>{price}</Typography>
    </Box>
    <Stack direction="row">
      <ShoppingCartOutlinedIcon sx={{ fontSize: 20, color: 'text.secondary', cursor: 'pointer' }} />
      <Divider orientation="vertical" flexItem sx={{ mx: 1.5 }} />
      <FavoriteBorderOutlinedIcon sx={{ fontSize: 20, color: 'text.secondary', cursor: 'pointer' }} />
    </Stack>
  </Stack>
);

interface TopProjectProductsSectionProps{
  id: string
}

export default function TopProjectProductsSection(props: TopProjectProductsSectionProps) {
  const { id } = props;
  return (
    <Box id={id} sx={{ bgcolor: '#060a12', py: { xs: 8, md: 10 } }}>
      <Container maxWidth="lg">
        {/* Heading */}
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography
            variant="h3"
            sx={{ fontSize: { xs: '1.8rem', md: '2.4rem' }, color: 'common.white', mb: 1.5 }}
          >
            TOP SẢN PHẨM HOT DỰ ÁN
          </Typography>
          <Typography sx={{ color: 'text.secondary', maxWidth: 640, mx: 'auto', lineHeight: 1.8 }}>
            Hơn 500+ dự án của chúng tôi sử dụng các sản phẩm công nghệ thông minh để cải thiện không gian
            sống cho khách hàng
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {/* ---- TOP RATE featured card ---- */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Card
              sx={{
                bgcolor: '#0d1420',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2,
                p: { xs: 2.5, md: 3 },
                height: '100%',
              }}
            >
              <Grid container spacing={2} alignItems="center">
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Chip
                    icon={<VerifiedOutlinedIcon sx={{ fontSize: 16, color: COLORS.COLOR_DETAIL + ' !important' }} />}
                    label="TOP RATE"
                    size="small"
                    sx={{
                      bgcolor: 'rgba(34,211,238,0.12)',
                      color: COLORS.COLOR_DETAIL,
                      fontWeight: 700,
                      letterSpacing: 0.5,
                      mb: 1.5,
                    }}
                  />
                  <Typography sx={{ fontWeight: 800, fontSize: '1.35rem', mb: 1 }}>Camera FPT SE3</Typography>
                  <Typography sx={{ color: 'text.secondary', fontSize: '0.85rem', lineHeight: 1.7, mb: 2 }}>
                    Camera an ninh thông minh dành cho gia đình với độ phân giải 3MP sắc nét, tích hợp AI nhận
                    diện người, đàm thoại hai chiều và khả năng xoay quan sát linh hoạt.
                  </Typography>
                  <Typography sx={{ ...priceSx, fontSize: '1.3rem', mb: 2 }}>1.100.000 VNĐ</Typography>
                  <Button
                    variant="contained"
                    sx={{ bgcolor: COLORS.COLOR_DETAIL, color: '#000', '&:hover': { bgcolor: COLORS.COLOR_DETAIL } }}
                  >
                    Sở hữu ngay
                  </Button>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box
                    sx={{
                      height: { xs: 200, sm: '100%' },
                      minHeight: 220,
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Box component="img" src={camera} alt="Camera FPT SE3" sx={{ maxWidth: '100%', maxHeight: 240, objectFit: 'contain' }} />
                  </Box>
                </Grid>
              </Grid>
            </Card>
          </Grid>

          {/* ---- Two highlight cards ---- */}
          {highlightCards.map((c) => (
            <Grid size={{ xs: 6, md: 3 }} key={c.name}>
              <HighlightCard {...c} />
            </Grid>
          ))}

          {/* ---- 2x2 product grid ---- */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Grid container spacing={3}>
              {gridProducts.map((p) => (
                <Grid size={{ xs: 6 }} key={p.name}>
                  <ProductCard {...p} />
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* ---- 500+ dự án đã sử dụng list ---- */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Card
              sx={{
                bgcolor: '#0d1420',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2,
                p: { xs: 2, md: 2.5 },
                height: '100%',
              }}
            >
              <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                <GroupsOutlinedIcon sx={{ color: COLORS.COLOR_DETAIL }} />
                <Typography sx={{ fontWeight: 800, letterSpacing: 0.5 }}>500+ DỰ ÁN ĐÃ SỬ DỤNG</Typography>
              </Stack>
              <Stack divider={<Divider sx={{ borderColor: 'divider' }} />}>
                {usedProducts.map((p) => (
                  <UsedProductRow key={p.name} {...p} />
                ))}
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
