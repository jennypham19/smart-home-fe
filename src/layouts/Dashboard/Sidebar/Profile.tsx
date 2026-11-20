import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { LogoutOutlined } from '@mui/icons-material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import {
  ButtonBase,
  Card,
  ClickAwayListener,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Popper,
  Stack,
} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import avatar1 from '@/assets/images/users/avatar-1.png';
import { ROUTE_PATH } from '@/constants/routes';
import { signOut } from '@/services/auth-service';
import { setIsAuth, setProfile } from '@/slices/auth';
import { useAppDispatch, useAppSelector } from '@/store';
import { removeAccessToken } from '@/utils/AuthHelper';
import { getRoleLabel } from '@/utils/labelEntoVni';
import { COLORS } from '@/constants/colors';
import ChangePassword from '@/views/Manage/Admin/components/ChangePassword';

// ==============================|| PROFILE COMPONENT ||============================== //

const Profile = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const profile = useAppSelector((state) => state.auth.profile);
  const [openChangePassword, setOpenChangePassword] = useState(false);
  
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: any) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleLogout = async () => {
    await signOut();
    dispatch(setIsAuth(false));
    dispatch(setProfile(null));
    removeAccessToken();
  };

  const handleOpenChangePassword = () => {
    setOpenChangePassword(true)
    setAnchorEl(null)
  }

  const handleCloseChangePassword = () => {
    setOpenChangePassword(false)
  }
  
  const open = Boolean(anchorEl);

  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <ButtonBase
        sx={{
          p: 0.25,
          borderRadius: 1,
          '&:hover': { bgcolor: 'secondary.lighter' },
          '&:focus-visible': {
            outline: `2px solid ${theme.palette.secondary.dark}`,
            outlineOffset: 2,
          },
        }}
        aria-label='open profile'
        aria-controls={open ? 'profile-grow' : undefined}
        aria-haspopup='true'
        onClick={handleClick}
      >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    p: 2,
                    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                  }}
                >
                  <Avatar
                    src={avatar1}
                    alt={profile?.fullName}
                    sx={{ borderRadius: '50%' }}
                  />
                  <Box sx={{ minWidth: 0 }}>
                    <Typography
                      noWrap
                      sx={{ color: COLORS.COLOR_DETAIL, fontWeight: 700, fontSize: 16, lineHeight: 1.3 }}
                    >
                      {profile?.fullName}
                    </Typography>
                    <Typography
                      noWrap
                      variant='body2'
                      sx={{ color: '#9aa4b2', textTransform: 'capitalize' }}
                    >
                      {getRoleLabel(profile?.role)}
                    </Typography>
                  </Box>
                </Box>
      </ButtonBase>
      <Popper
        open={open}
        anchorEl={anchorEl}
        sx={{
          zIndex: 999,
          marginTop: '10px !important',
        }}
        placement='bottom-start'
      >
        <Paper sx={{ width: 290, minWidth: 240, maxWidth: { xs: 250, md: 250 } }}>
          <ClickAwayListener onClickAway={handleClick}>
            <Card>
              <List component='nav' sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 24 } }}>
                <ListItemButton>
                  <ListItemIcon>
                    <EditOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText
                    onClick={handleOpenChangePassword}
                    primary='Thay đổi mật khẩu'
                    sx={{
                      '& .MuiTypography-root': {
                        fontSize: '14px',
                      },
                    }}
                  />
                </ListItemButton>
                <Divider />
                <ListItemButton>
                  <ListItemIcon>
                    <LogoutOutlined />
                  </ListItemIcon>
                  <ListItemText
                    onClick={handleLogout}
                    primary='Logout'
                    sx={{
                      '& .MuiTypography-root': {
                        fontSize: '14px',
                      },
                    }}
                  />
                </ListItemButton>
              </List>
            </Card>
          </ClickAwayListener>
        </Paper>
      </Popper>
      {openChangePassword && profile && (
        <ChangePassword
          open={openChangePassword}
          onClose={handleCloseChangePassword}
          user={profile}
        />
      )}
    </Box>
  );
};

export default Profile;
