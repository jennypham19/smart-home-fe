import { yupResolver } from '@hookform/resolvers/yup';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';

import { Email, Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  Alert,
  Box,
  Checkbox,
  Chip,
  Container,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Stack,
  Typography,
} from '@mui/material';
import ControllerTextField from '@/components/ControllerField/ControllerTextField';
import Page from '@/components/Page';

import { ROUTE_PATH } from '@/constants/routes';
import useBoolean from '@/hooks/useBoolean';
import useNotification from '@/hooks/useNotification';
import { loginSchema } from '@/schemas/auth-schema';
import { signIn } from '@/services/auth-service';
import { getCurrentUser } from '@/services/user-service';
import { setIsAuth } from '@/slices/auth';
import { setProfile } from '@/slices/user';
import { useAppDispatch } from '@/store';
import { setAccessToken } from '@/utils/AuthHelper';
import Logger from '@/utils/Logger';
import Grid from "@mui/material/Grid2"
import { COLORS } from '@/constants/colors';
import logo from "@/assets/images/users/logo.png"

const heroChips = ['Technology', 'Smart home', 'Modern technology for future'];


interface LoginFormInputs {
  username: string;
  password: string;
}

export default function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(loginSchema),
  });
  const { t } = useTranslation('auth');
  const [_loading, setLoading] = useBoolean();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const notify = useNotification();
  const [_error, setError] = useState('');
  const [showPassword, setShowPassword] = useBoolean(false);
  const [remember, setRemember] = useState(false);

  useEffect(() => {
    setFocus('username');
  }, [setFocus]);

  const onSubmit = async (values: LoginFormInputs) => {
    setLoading.on();
    try {
      const respAuth = await signIn({
        username: values.username,
        password: values.password,
      });
      const accessToken = respAuth.data?.accessToken;
      const userProfile = respAuth.data?.user; 
      if (accessToken && userProfile) {
        setAccessToken(accessToken);
        // Cập nhật state của Redux/Context
        // Thông tin user đã có sẵn từ response login, không cần gọi /me nữa
        dispatch(setProfile(userProfile));
        dispatch(setIsAuth(true));
        // Thông báo & chuyển hướng
        notify({
          message: t('login_success'),
          severity: 'success',
        });
        navigate(ROUTE_PATH.MANAGE, { replace: true});
      } else {
        notify({
          message: respAuth.message || 'Login failed, no access token returned.',
          severity: 'error'
        });
      }
    } catch (error: any) {
      Logger.log(error);
    } finally {
      setLoading.off();
    }
  };

function ArtPanel() {
  return (
    <Box
      sx={{
        position: 'relative',
        height: '100%',
        minHeight: { xs: 420, md: 640 },
        p: { xs: 4, md: 6 },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(
              rgba(11, 18, 32, 0.65),
              rgba(11, 18, 32, 0.65)
            ),
            url(${logo})
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.7,
          zIndex: 0,
        },       
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          opacity: 0.25,
          backgroundImage:
            'linear-gradient(rgba(34,211,238,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.15) 1px, transparent 1px)',
          backgroundSize: '34px 34px',
          maskImage: 'radial-gradient(circle at 30% 40%, black, transparent 70%)',
        }}
      />

      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Typography
          variant="h2"
          sx={{ fontSize: { xs: '2.4rem', md: '2.9rem' }, lineHeight: 1.15, mb: 2, color: '#fff' }}
        >
          Tương lai
          <br />
          công nghệ
        </Typography>
        <Typography sx={{ color: 'text.secondary', maxWidth: 380, lineHeight: 1.8 }}>
          Khám phá hệ sinh thái điện tử cao cấp dành cho chuyên gia và người đam mê
          công nghệ
        </Typography>
      </Box>

      <Stack direction="row" flexWrap="wrap" gap={1.5} sx={{ position: 'relative', zIndex: 1 }}>
        {heroChips.map((label) => (
          <Chip
            key={label}
            label={label}
            variant="outlined"
            sx={{
              color: 'text.primary',
              borderColor: 'rgba(255,255,255,0.25)',
              px: 1,
              fontSize: { xs: '0.8rem', md: '1.2rem'}
            }}
          />
        ))}
      </Stack>
    </Box>
  );
}

  return (
    <Page title='FPT Smart Home - Đăng nhập'>
    <Box sx={{ minHeight: '100%', bgcolor: 'background.default', display: 'flex', flexDirection: 'column' }}>
      <Container maxWidth='lg' sx={{ py: { xs: 4, md: 6 } }}>
        <Grid container>
          <Grid size={{ xs: 12, md: 6 }}>
            <ArtPanel />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ p: { xs: 3, sm: 5, md: 6 }, maxWidth: 460, mx: 'auto' }}>
              <Box>
                <Typography
                  component='h1'
                  variant='h4'
                  fontWeight={500}
                  sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)', color: COLORS.COLOR_DETAIL, mb: 1 }}
                >
                  Chào mừng trở lại
                </Typography>
                <Typography sx={{ color: 'text.secondary', mb: 4 }}>
                  Đăng nhập để truy cập vào kho công nghệ của bạn
                </Typography>
              </Box>
              {_error && (
                <Alert variant='filled' severity='warning'>
                  {_error}
                </Alert>
              )}
              <Box
                component='form'
                onSubmit={handleSubmit(onSubmit)}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  gap: 2,
                }}
              >
                <Box>
                  <Typography variant="body2" color='text.secondary'>Email / Số điện thoại</Typography>
                  <ControllerTextField<LoginFormInputs>
                    controllerProps={{
                      name: 'username',
                      defaultValue: '',
                      control: control,
                    }}
                    textFieldProps={{
                      label: '',
                      error: !!errors.username,
                      helperText: errors.username?.message,
                      sx: { ariaLabel: 'username' },
                      margin: 'none'
                    }}
                    prefixIcon={Email}
                  />                  
                </Box>
                
                <Box>
                  <Typography variant="body2" color='text.secondary'>Mật khẩu</Typography>
                  <ControllerTextField<LoginFormInputs>
                    controllerProps={{
                      name: 'password',
                      defaultValue: '',
                      control: control,
                    }}
                    textFieldProps={{
                      label: '',
                      type: showPassword ? 'text' : 'password',
                      error: !!errors.password,
                      helperText: errors.password?.message,
                      margin: 'none',
                      slotProps: {
                        input: {
                          endAdornment: (
                            <InputAdornment position='end'>
                              <IconButton
                                aria-label='toggle password visibility'
                                onClick={() => setShowPassword.toggle()}
                                edge='end'
                              >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        },
                      },
                    }}
                    prefixIcon={Lock}
                  />                  
                </Box>

                  <Box>
                    <Typography
                      color='primary'
                      component={RouterLink}
                      to={`/${ROUTE_PATH.AUTH}/${ROUTE_PATH.FORGOT_PASSWORD}`}
                      sx={{ textAlign: 'end', display: 'block' }}
                    >
                      Quên mật khẩu
                    </Typography>
                  </Box>
                <LoadingButton loading={_loading} type='submit' variant='contained' fullWidth>
                  Đăng nhập
                </LoadingButton>
                <Box display='flex' justifyContent='center' alignItems='center' flexWrap='wrap' gap={2}>
                  <Typography sx={{ color: 'text.secondary' }}>Bạn đã có tài khoản ?{' '}</Typography>
                  <Typography
                    to={`/${ROUTE_PATH.REGISTRATION}`}
                    component={RouterLink}
                    color='primary'
                  >
                    Tạo tài khoản mới
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
    </Page>
  );
}
