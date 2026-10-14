import logo from "@/assets/images/users/logo.png"
import Page from "@/components/Page";
import { COLORS } from "@/constants/colors";
import { Alert, Box, Checkbox, Chip, Container, FormControlLabel, IconButton, InputAdornment, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useForm } from "react-hook-form";
import { LoginFormInputs } from "../Auth/Login";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/schemas/auth-schema";
import { useTranslation } from "react-i18next";
import useBoolean from "@/hooks/useBoolean";
import { useAppDispatch } from "@/store";
import { useEffect, useState } from "react";
import useNotification from "@/hooks/useNotification";
import { AdminPanelSettings, Email, Google, Groups, Lock, Login, Visibility, VisibilityOff } from "@mui/icons-material";
import ControllerTextField from "@/components/ControllerField/ControllerTextField";
import { ROUTE_PATH } from "@/constants/routes";
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { LoadingButton } from "@mui/lab";


const heroChips = ['Technology', 'Smart home', 'Modern technology for future'];

export default function LoginAdministration() {
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

  const onSubmit = async (values: LoginFormInputs) => {}
  
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
          <Chip
            label={
              <Box display="flex" alignItems="center" gap={1}>
                <Groups fontSize="small" sx={{ color: COLORS.COLOR_DETAIL }} />
                <Typography sx={{ color: COLORS.COLOR_DETAIL}} variant="body2">
                  HỆ THỐNG NỘI BỘ TẬP TRUNG
                </Typography>
              </Box>
            }
            sx={{ mb: 2 }}
          />
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
      <Page title="FPT Smart Home - Đăng nhập nội bộ">
          <Box sx={{ minHeight: '100%', bgcolor: 'background.default', display: 'flex', flexDirection: 'column' }}>
              <Container maxWidth='lg' sx={{ py: { xs: 4, md: 6 } }}> 
                  <Grid container>
                      <Grid size={{ xs: 12, md: 5 }}>
                          <ArtPanel />
                      </Grid>
                      <Grid size={{ xs: 12, md: 7 }}>
                        <Box sx={{ p: { xs: 3, sm: 5, md: 6 }, maxWidth: 600, mx: 'auto' }}>
                          <Box>
                            <Typography
                              component='h1'
                              variant='h4'
                              fontWeight={500}
                              sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)', color: COLORS.COLOR_DETAIL, mb: 1 }}
                            >
                              Đăng nhập hệ thống nội bộ
                            </Typography>
                            <Typography sx={{ color: 'text.secondary', mb: 2 }}>
                              Dành cho nhân viên, quản trị viên & kỹ thuật viên hệ sinh thái FPT Smart Home. Vui lòng sử dụng tài khoản nội bộ để đăng nhập.
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
                            {/* Email công ty / Tài khoản nhân sự */}
                            <Box>
                              <Typography variant="body2" color='text.secondary'>Email công ty / Tài khoản nhân sự</Typography>
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

                            {/* Mật khẩu */}
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
                            <FormControlLabel
                              label={
                                <Typography variant="body2" color='text.secondary'>
                                  Ghi nhớ đăng nhập trên thiết bị này
                                </Typography>
                              }
                              control={
                                <Checkbox checked={remember} onChange={(e) => setRemember(e.target.checked)} />
                              }
                            />
                            <LoadingButton 
                              loading={_loading} 
                              type='submit' 
                              variant='contained' 
                              fullWidth
                              startIcon={<Login />}
                            >
                              Đăng nhập nội bộ
                            </LoadingButton>
                            <Box display='flex' justifyContent='space-between' bgcolor="#132d44" borderRadius={1} p={2} gap={1}>
                              <AdminPanelSettings sx={{ color: COLORS.COLOR_DETAIL }}/>
                              <Typography sx={{ color: '#fff' }} variant="body2">
                                <strong>Yêu cầu xác thực đa yếu tố (MFA)</strong>: Theo chính sách bảo mật nội bộ của công ty, phiên đăng nhập
                                sẽ yêu cầu xác thực OTP qua mã xác thực được gửi đến email. 
                              </Typography>
                            </Box>
                          </Box>
                        </Box>

                      </Grid>
                  </Grid>
              </Container>
          </Box>  
      </Page>
  )
}