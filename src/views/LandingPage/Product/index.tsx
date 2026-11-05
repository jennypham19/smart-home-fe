import { useState } from 'react';
import {
  Box,
  Container,
  Stack,
  Typography,
  Card,
  Chip,
  Button,
  Checkbox,
  FormControlLabel,
  InputBase,
  IconButton as MuiIconButton,
  Divider,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import GridViewIcon from '@mui/icons-material/GridView';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import BoltIcon from '@mui/icons-material/Bolt';
import StarIcon from '@mui/icons-material/Star';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import SmartDisplayOutlinedIcon from '@mui/icons-material/SmartDisplayOutlined';
import SpeakerOutlinedIcon from '@mui/icons-material/SpeakerOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PowerOutlinedIcon from '@mui/icons-material/PowerOutlined';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import SettingsRemoteOutlinedIcon from '@mui/icons-material/SettingsRemoteOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import SensorsOutlinedIcon from '@mui/icons-material/SensorsOutlined';
import ToggleOnOutlinedIcon from '@mui/icons-material/ToggleOnOutlined';
import BlindsOutlinedIcon from '@mui/icons-material/BlindsOutlined';
import ExtensionOutlinedIcon from '@mui/icons-material/ExtensionOutlined';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import SwapHorizOutlinedIcon from '@mui/icons-material/SwapHorizOutlined';
import type { SvgIconComponent } from '@mui/icons-material';

import Page from '@/components/Page';
import { COLORS } from '@/constants/colors';
import FPT_logo from '@/assets/images/users/fpt-smart-home.png';
import camera from '@/assets/images/users/camera.png';
import cam_bien from '@/assets/images/users/cam-bien.png';
import switch_athena from '@/assets/images/users/cong-tac-athena.png';
import switch_leto from '@/assets/images/users/cong-tac-leto.png';
import switch_rectangle from '@/assets/images/users/cong-tac-hcn.png';
import switch_square from '@/assets/images/users/cong-tac-hv.png';

/* ---------------------------------- DATA ---------------------------------- */

const categories: { label: string; icon: SvgIconComponent }[] = [
  { label: 'Play BoxS', icon: SmartDisplayOutlinedIcon },
  { label: 'Speaker', icon: SpeakerOutlinedIcon },
  { label: 'Khóa cửa', icon: LockOutlinedIcon },
  { label: 'Ổ cắm', icon: PowerOutlinedIcon },
  { label: 'Đèn thông minh', icon: LightbulbOutlinedIcon },
  { label: 'Camera', icon: VideocamOutlinedIcon },
  { label: 'Remote/ Điều khiển', icon: SettingsRemoteOutlinedIcon },
  { label: 'Chuông cửa', icon: NotificationsNoneOutlinedIcon },
  { label: 'Cảm biến', icon: SensorsOutlinedIcon },
  { label: 'Công tắc', icon: ToggleOnOutlinedIcon },
  { label: 'Rèm cửa', icon: BlindsOutlinedIcon },
  { label: 'Phụ kiện', icon: ExtensionOutlinedIcon },
];

const promos = [
  { icon: LocalOfferOutlinedIcon, title: 'Giảm 25%', sub: 'đơn đầu tiên', color: COLORS.COLOR_PRIMARY },
  { icon: LocalShippingOutlinedIcon, title: 'FREESHIP', sub: 'toàn quốc', color: COLORS.COLOR_DETAIL },
  { icon: CreditCardOutlinedIcon, title: 'Trả góp 0%', sub: 'thủ tục 15p', color: '#fff' },
];

const priceRanges = ['Dưới 3 triệu', 'Dưới 5 triệu', 'Từ 5 -10 triệu', 'Trên 10 triệu'];
const usageNeeds = ['Giải trí', 'Làm việc', 'Trang trí', 'Giám sát', 'Thông minh', 'Đa năng', 'Tiện ích'];
const brands = ['HIKVISION', 'SAM SUNG', 'YALE', 'LG', 'DAIKIN', 'FPT', 'VINFAST', 'XIAO MI'];

const flashSale = [
  { url: camera, name: 'Camera FPT SE3', price: '1.100.000 VNĐ', oldPrice: '1.500.000 VNĐ' },
  { url: switch_athena, name: 'Công tắc ATHENA 3', price: '2.079.000 VNĐ', oldPrice: '2.300.000 VNĐ' },
  { url: switch_square, name: 'Công tắc ATHENA 1', price: '2.079.000 VNĐ', oldPrice: '2.300.000 VNĐ' },
];

const bestSellers = [
  { url: switch_square, name: 'CÔNG TẮC ATHENA', price: '2.079.000 VNĐ' },
  { url: switch_leto, name: 'CÔNG TẮC LETO', price: '2.079.000 VNĐ' },
  { url: switch_rectangle, name: 'Công tắc rèm cửa', price: '1.529.000 VNĐ' },
  { url: cam_bien, name: 'Ổ cắm âm tường', price: '605.000 VNĐ' },
];

const reviews = Array.from({ length: 5 }).map(() => ({
  text:
    '“ Dịch vụ tuyệt vời !! Giao hàng siêu nhanh và đóng gói kĩ. Laptop mình mua dùng cực mượt, chắc chắn sẽ ủng hộ FPT lâu dài ”',
  author: 'N.H.M',
  role: 'Hoàng Mai - freelancer',
}));

/* ------------------------------ SUB SECTIONS ------------------------------ */

const SectionCard = ({ children, sx }: { children: React.ReactNode; sx?: object }) => (
  <Card
    sx={{
      bgcolor: 'background.paper',
      border: '1px solid',
      borderColor: 'divider',
      borderRadius: 2,
      p: { xs: 2, md: 2.5 },
      ...sx,
    }}
  >
    {children}
  </Card>
);

/* -------- Left rail: DANH MỤC -------- */
const CategorySidebar = () => (
  <Stack spacing={2.5}>
    <Box sx={{ textAlign: 'center' }}>
      <Box component="img" src={FPT_logo} alt="FPT Smart Home" sx={{ width: 150, mx: 'auto' }} />
      <Typography sx={{ color: 'text.secondary', fontSize: 13, mt: 1 }}>
        Công nghệ hiện đại cho cuộc sống thông minh
      </Typography>
    </Box>

    <Box>
      <Typography sx={{ fontWeight: 700, letterSpacing: 1, mb: 1.5, fontSize: 15, color: COLORS.COLOR_TEXT }}>
        DANH MỤC
      </Typography>
      <Stack spacing={0.25}>
        {categories.map(({ label, icon: Icon }) => (
          <Stack
            key={label}
            direction="row"
            alignItems="center"
            spacing={1.5}
            sx={{
              py: 0.75,
              px: 0.5,
              borderRadius: 1.5,
              cursor: 'pointer',
              transition: 'background .2s',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' },
            }}
          >
            <Checkbox
              size="small"
              sx={{ p: 0.25, color: 'rgba(255,255,255,0.3)' }}
            />
            <Icon sx={{ fontSize: 20, color: COLORS.COLOR_DETAIL }} />
            <Typography sx={{ fontSize: 15, color: COLORS.COLOR_TEXT }}>{label}</Typography>
          </Stack>
        ))}
      </Stack>
    </Box>

    <Divider sx={{ borderColor: 'divider' }} />

    <Stack spacing={1.5}>
      <Stack direction="row" alignItems="center" spacing={1}>
        <PhoneInTalkIcon sx={{ color: COLORS.COLOR_DETAIL }} />
        <Typography sx={{ color: COLORS.COLOR_DETAIL, fontWeight: 700, fontSize: 18 }}>
          0328016662
        </Typography>
      </Stack>
      <Stack direction="row" alignItems="center" spacing={1} sx={{ cursor: 'pointer' }}>
        <VerifiedUserOutlinedIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
        <Typography sx={{ fontSize: 14, color: COLORS.COLOR_TEXT }}>Chính sách bảo hành</Typography>
      </Stack>
      <Stack direction="row" alignItems="center" spacing={1} sx={{ cursor: 'pointer' }}>
        <SwapHorizOutlinedIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
        <Typography sx={{ fontSize: 14, color: COLORS.COLOR_TEXT }}>Chính sách đổi trả</Typography>
      </Stack>
    </Stack>
  </Stack>
);

/* -------- Filter card -------- */
const FilterPanel = () => {
  const [selectedNeeds, setSelectedNeeds] = useState<string[]>([]);

  const toggleNeed = (need: string) =>
    setSelectedNeeds((prev) =>
      prev.includes(need) ? prev.filter((n) => n !== need) : [...prev, need],
    );

  return (
    <SectionCard>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2.5 }}>
        <Button
          startIcon={<TuneIcon />}
          variant="contained"
          sx={{ bgcolor: COLORS.COLOR_PRIMARY, borderRadius: 2, fontWeight: 700 }}
        >
          Lọc sản phẩm
        </Button>
        <MuiIconButton
          sx={{
            bgcolor: COLORS.COLOR_DETAIL,
            color: '#0a0a0d',
            borderRadius: 2,
            '&:hover': { bgcolor: COLORS.COLOR_DETAIL },
          }}
        >
          <GridViewIcon />
        </MuiIconButton>
      </Stack>

      {/* KHOẢNG GIÁ */}
      <Typography sx={{ fontWeight: 700, letterSpacing: 1, mb: 1 }}>KHOẢNG GIÁ</Typography>
      <Stack sx={{ mb: 3 }}>
        {priceRanges.map((range) => (
          <FormControlLabel
            key={range}
            control={<Checkbox size="small" sx={{ color: 'rgba(255,255,255,0.3)' }} />}
            label={<Typography sx={{ fontSize: 15 }}>{range}</Typography>}
          />
        ))}
      </Stack>

      {/* NHU CẦU SỬ DỤNG */}
      <Typography sx={{ fontWeight: 700, letterSpacing: 1, mb: 1.5 }}>NHU CẦU SỬ DỤNG</Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.25, mb: 3 }}>
        {usageNeeds.map((need) => {
          const active = selectedNeeds.includes(need);
          return (
            <Chip
              key={need}
              label={need}
              onClick={() => toggleNeed(need)}
              variant="outlined"
              sx={{
                borderRadius: 2,
                px: 0.5,
                fontSize: 14,
                cursor: 'pointer',
                borderColor: active ? COLORS.COLOR_DETAIL : 'rgba(255,255,255,0.25)',
                color: active ? COLORS.COLOR_DETAIL : 'text.primary',
                bgcolor: active ? 'rgba(51,233,253,0.08)' : 'transparent',
              }}
            />
          );
        })}
      </Box>

      {/* THƯƠNG HIỆU */}
      <Typography sx={{ fontWeight: 700, letterSpacing: 1, mb: 1.5 }}>THƯƠNG HIỆU</Typography>
      <Grid container rowSpacing={1.5} columnSpacing={2}>
        {brands.map((brand) => (
          <Grid size={6} key={brand}>
            <Typography
              sx={{
                fontSize: 15,
                color: 'text.secondary',
                cursor: 'pointer',
                '&:hover': { color: COLORS.COLOR_DETAIL },
              }}
            >
              {brand}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </SectionCard>
  );
};

/* -------- Reviews list -------- */
const ReviewsColumn = () => (
  <Box>
    <Typography sx={{ fontWeight: 700, fontSize: 20, mb: 2, color: COLORS.COLOR_TEXT }}>
      Đánh giá về FPT SMART HOME ?
    </Typography>
    <Stack spacing={2}>
      {reviews.map((r, i) => (
        <SectionCard key={i} sx={{ p: 2 }}>
          <Stack direction="row" spacing={0.25} sx={{ mb: 1 }}>
            {Array.from({ length: 5 }).map((_, s) => (
              <StarIcon key={s} sx={{ fontSize: 18, color: '#FFC700' }} />
            ))}
          </Stack>
          <Typography sx={{ color: 'text.secondary', fontSize: 14, lineHeight: 1.7, mb: 1.5 }}>
            {r.text}
          </Typography>
          <Typography sx={{ fontSize: 14 }}>
            <Box component="span" sx={{ fontWeight: 700 }}>
              {r.author}
            </Box>{' '}
            {r.role}
          </Typography>
        </SectionCard>
      ))}
    </Stack>
  </Box>
);

/* -------- Promo strip -------- */
const PromoStrip = () => (
  <Grid container spacing={2}>
    {promos.map(({ icon: Icon, title, sub, color }) => (
      <Grid size={{ xs: 12, sm: 4 }} key={title}>
        <SectionCard sx={{ p: 2 }}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Icon sx={{ fontSize: 30, color }} />
            <Box>
              <Typography sx={{ fontWeight: 800, fontSize: 18, color }}>{title}</Typography>
              <Typography sx={{ color: 'text.secondary', fontSize: 13 }}>{sub}</Typography>
            </Box>
          </Stack>
        </SectionCard>
      </Grid>
    ))}
  </Grid>
);

/* -------- Hero banner -------- */
const HeroBanner = () => (
  <Box
    sx={{
      position: 'relative',
      borderRadius: 3,
      overflow: 'hidden',
      minHeight: { xs: 260, md: 300 },
      p: { xs: 3, md: 4 },
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      background: `linear-gradient(90deg, rgba(10,10,13,0.95) 0%, rgba(10,10,13,0.75) 45%, rgba(10,10,13,0.2) 100%), url(${camera})`,
      backgroundSize: 'cover',
      backgroundPosition: 'right center',
      border: '1px solid',
      borderColor: 'divider',
    }}
  >
    <Chip
      label="Hàng mới về"
      size="small"
      sx={{
        bgcolor: 'rgba(51,233,253,0.15)',
        color: COLORS.COLOR_DETAIL,
        width: 'fit-content',
        mb: 2,
        fontWeight: 600,
      }}
    />
    <Typography sx={{ fontWeight: 800, fontSize: { xs: 26, md: 36 }, lineHeight: 1.1, maxWidth: 420, color: COLORS.COLOR_TEXT }}>
      Công tắc thông minh ATHENA
    </Typography>
    <Typography sx={{ color: 'text.secondary', fontSize: 14, mt: 1.5, maxWidth: 440, lineHeight: 1.7 }}>
      Sản phẩm cho phép điều khiển đèn, quạt, thiết bị điện từ xa, hẹn giờ, tạo ngữ cảnh tự động và nâng
      tầm không gian sống hiện đại.
    </Typography>
    <Button
      variant="contained"
      sx={{ bgcolor: COLORS.COLOR_PRIMARY, width: 'fit-content', mt: 3, borderRadius: 2, fontWeight: 700 }}
    >
      Khám phá ngay
    </Button>
  </Box>
);

/* -------- Flash sale -------- */
const CountdownBox = ({ value }: { value: string }) => (
  <Box
    sx={{
      bgcolor: '#E63946',
      color: '#fff',
      borderRadius: 1,
      px: 1.25,
      py: 0.5,
      fontWeight: 800,
      fontSize: 16,
      minWidth: 36,
      textAlign: 'center',
    }}
  >
    {value}
  </Box>
);

const FlashSale = () => (
  <SectionCard>
    <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
      <Stack direction="row" alignItems="center" spacing={1}>
        <BoltIcon sx={{ color: '#FFC700' }} />
        <Typography sx={{ fontWeight: 800, letterSpacing: 1 }}>FLASH SALE</Typography>
      </Stack>
      <Stack direction="row" alignItems="center" spacing={0.75}>
        <CountdownBox value="02" />
        <Typography sx={{ fontWeight: 800 }}>:</Typography>
        <CountdownBox value="45" />
        <Typography sx={{ fontWeight: 800 }}>:</Typography>
        <CountdownBox value="06" />
      </Stack>
    </Stack>

    <Stack divider={<Divider sx={{ borderColor: 'divider' }} />}>
      {flashSale.map((p) => (
        <Stack key={p.name} direction="row" alignItems="center" spacing={2} sx={{ py: 2 }}>
          <Box
            component="img"
            src={p.url}
            alt={p.name}
            sx={{ width: 90, height: 72, objectFit: 'contain', borderRadius: 1.5, flexShrink: 0 }}
          />
          <Box sx={{ flexGrow: 1, minWidth: 0 }}>
            <Typography sx={{ fontWeight: 700, fontSize: 17, mb: 0.5 }} noWrap>
              {p.name}
            </Typography>
            <Typography sx={{ color: COLORS.COLOR_DETAIL, fontWeight: 800, fontSize: 18 }}>
              {p.price}
            </Typography>
            <Typography
              sx={{ color: 'text.secondary', textDecoration: 'line-through', fontSize: 13 }}
            >
              {p.oldPrice}
            </Typography>
          </Box>
          <Stack direction="row" spacing={0.5}>
            <MuiIconButton sx={{ color: 'text.primary' }}>
              <ShoppingCartOutlinedIcon />
            </MuiIconButton>
            <MuiIconButton sx={{ color: 'text.primary' }}>
              <FavoriteBorderOutlinedIcon />
            </MuiIconButton>
          </Stack>
        </Stack>
      ))}
    </Stack>
  </SectionCard>
);

/* -------- Best seller -------- */
const BestSellerList = () => (
  <SectionCard>
    <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
      <EmojiEventsOutlinedIcon sx={{ color: '#FFC700' }} />
      <Typography sx={{ fontWeight: 800, letterSpacing: 1 }}>BEST SELLER</Typography>
    </Stack>

    <Stack divider={<Divider sx={{ borderColor: 'divider' }} />}>
      {bestSellers.map((p) => (
        <Stack key={p.name} direction="row" alignItems="center" spacing={2} sx={{ py: 2 }}>
          <Box
            component="img"
            src={p.url}
            alt={p.name}
            sx={{ width: 90, height: 72, objectFit: 'contain', borderRadius: 1.5, flexShrink: 0 }}
          />
          <Box sx={{ flexGrow: 1, minWidth: 0 }}>
            <Typography sx={{ fontWeight: 700, fontSize: 17, mb: 0.5 }} noWrap>
              {p.name}
            </Typography>
            <Typography sx={{ color: COLORS.COLOR_DETAIL, fontWeight: 800, fontSize: 18 }}>
              {p.price}
            </Typography>
          </Box>
          <Stack direction="row" spacing={0.5}>
            <MuiIconButton sx={{ color: 'text.primary' }}>
              <ShoppingCartOutlinedIcon />
            </MuiIconButton>
            <MuiIconButton sx={{ color: 'text.primary' }}>
              <FavoriteBorderOutlinedIcon />
            </MuiIconButton>
          </Stack>
        </Stack>
      ))}
    </Stack>
  </SectionCard>
);

/* --------------------------------- PAGE ----------------------------------- */

const ProductLandingPage = () => {
  return (
    <Page title="Sản phẩm">
      <Box sx={{ bgcolor: 'background.default', py: { xs: 3, md: 5 } }}>
        <Container maxWidth="xl">
          <Grid container spacing={{ xs: 3, md: 4 }}>
            {/* LEFT RAIL — categories */}
            <Grid size={{ xs: 12, md: 3, lg: 2.5 }}>
              <CategorySidebar />
            </Grid>

            {/* MAIN AREA */}
            <Grid size={{ xs: 12, md: 9, lg: 9.5 }}>
              {/* Search bar */}
              <Stack direction="row" spacing={1.5} sx={{ mb: 3 }}>
                <Box
                  sx={{
                    flexGrow: 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    bgcolor: 'background.paper',
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 2,
                    px: 2,
                  }}
                >
                  <SearchIcon sx={{ color: 'text.secondary' }} />
                  <InputBase
                    placeholder="Tìm kiếm sản phẩm"
                    sx={{ flexGrow: 1, color: 'text.primary', py: 1.25 }}
                  />
                </Box>
                <MuiIconButton
                  sx={{
                    bgcolor: COLORS.COLOR_DETAIL,
                    color: '#0a0a0d',
                    borderRadius: 2,
                    px: 2,
                    '&:hover': { bgcolor: COLORS.COLOR_DETAIL },
                  }}
                >
                  <SearchIcon />
                </MuiIconButton>
              </Stack>

              <Grid container spacing={{ xs: 3, md: 4 }}>
                {/* Filters + reviews */}
                <Grid size={{ xs: 12, md: 5, lg: 4 }}>
                  <Stack spacing={3}>
                    <FilterPanel />
                    <ReviewsColumn />
                  </Stack>
                </Grid>

                {/* Banners + flash sale + best seller */}
                <Grid size={{ xs: 12, md: 7, lg: 8 }}>
                  <Stack spacing={3}>
                    <PromoStrip />
                    <HeroBanner />
                    <FlashSale />
                    <BestSellerList />
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Page>
  );
};

export default ProductLandingPage;
