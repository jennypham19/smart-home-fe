import {
  AppBar,
  Toolbar,
  Box,
  Stack,
  Button,
  IconButton,
  Avatar,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PersonIcon from '@mui/icons-material/Person';
import FPT_logo from "@/assets/images/users/fpt-smart-home.png"
import { ROUTE_PATH } from '@/constants/routes';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';


const navLinks = [
  { label: 'Trang chủ', url: ROUTE_PATH.DASHBOARD_LANDING },
  { label: 'Sản phẩm', url: ROUTE_PATH.PRODUCT_LANDING },
  { label: 'Dự án', url: ROUTE_PATH.PROJECT_LANDING },
  { label: 'Giới thiệu', url: ROUTE_PATH.INTRO_LANDING },
  { label: 'Liên hệ', url: ROUTE_PATH.CONTACT_LANDING },
  { label: 'Hỗ trợ', url: ROUTE_PATH.SUPPORT_LANDING },
];

export default function Header() {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
  const location = useLocation();
  const navigate = useNavigate();
  
  return (
    <AppBar
      position='fixed' elevation={0}
      sx={{
        bgcolor: 'background.default',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}

    >
      <Toolbar sx={{ px: { xs: 2, md: 6 }, py: 1.5, gap: 2 }}>
        <Box
          sx={{
            width: 190,
            height: 65,
            // bgcolor: '#e9e9ec',
            borderRadius: 1,
          }}
          component='img'
          src={FPT_logo}
        />

        {isMdUp && (
          <Stack
            direction="row"
            spacing={1}
            sx={{ flexGrow: 1, justifyContent: 'center' }}
          >
            {navLinks.map((link) =>
              link.url === location.pathname ? (
                <Button
                  key={link.label}
                  variant="contained"
                  color="primary"
                  sx={{ px: 2.5, py: 1, fontSize: '16px' }}
                  onClick={() => navigate(`${link.url}`)}
                >
                  {link.label}
                </Button>
              ) : (
                <Button
                  key={link.label}
                  sx={{
                    color: 'text.primary',
                    px: 2,
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.06)' },
                    fontSize: '16px'
                  }}
                  onClick={() => navigate(`${link.url}`)}
                >
                  {link.label}
                </Button>
              )
            )}
          </Stack>
        )}
        {location.pathname === `/${ROUTE_PATH.LOGIN}` ? (
          <Button variant="contained" color="primary" sx={{ ml: 'auto' }} onClick={() => navigate(`/${ROUTE_PATH.REGISTRATION}`)}>
            Đăng kí
          </Button>
        ) : location.pathname === `/${ROUTE_PATH.REGISTRATION}` ? (
          <Button variant="contained" color="primary" sx={{ ml: 'auto' }} onClick={() => navigate(`/${ROUTE_PATH.LOGIN}`)}>
            Đăng nhập
          </Button>
        ) : (
        <Stack direction="row" spacing={1} alignItems="center" sx={{ ml: 'auto' }}>
          <IconButton sx={{ color: 'text.primary' }}>
            <ShoppingCartOutlinedIcon />
          </IconButton>
          <IconButton sx={{ color: 'text.primary' }}>
            <FavoriteBorderOutlinedIcon />
          </IconButton>
          <IconButton sx={{ color: 'text.primary' }}>
            <KeyboardArrowDownIcon />
          </IconButton>
          <Avatar 
            sx={{ width: 34, height: 34, bgcolor: '#e9e9ec', color: '#0a0a0d', cursor: 'pointer' }}
            component={RouterLink}
            to={`/${ROUTE_PATH.LOGIN}`}
          >
            <PersonIcon fontSize="small" />
          </Avatar>
        </Stack>          
        )}

      </Toolbar>
    </AppBar>
  );
}
