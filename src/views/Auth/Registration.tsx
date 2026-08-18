import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Add, Email, Lock, Person, Phone, Visibility, VisibilityOff } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Alert, Avatar, Box, Button, Checkbox, Container, FormControlLabel, IconButton, InputAdornment, Stack, Typography } from '@mui/material';
import ControllerTextField from '@/components/ControllerField/ControllerTextField';
import Page from '@/components/Page';

import { ROUTE_PATH } from '@/constants/routes';
import useBoolean from '@/hooks/useBoolean';
import useNotification from '@/hooks/useNotification';
import { registrationSchema } from '@/schemas/auth-schema';
import { signUp } from '@/services/auth-service';
import register from "@/assets/images/users/register.png";
import Grid from "@mui/material/Grid2"
import { COLORS } from '@/constants/colors';

const numberPeople = [ 1, 2]
function ArtPanel() {
  return (
    <Box
      sx={{
        position: 'relative',
        height: { xs: 320, md: '100%' },
        minHeight: { md: 640},
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
            url(${register})
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

      <Box sx={{ position: 'absolute', left: 0, right: 0, bottom: 0, p: { xs: 3, md: 4 }, background: 'linear-gradient(180deg, transparent 0%, rgba(6,10,18,0.85) 55%, #060a12 100%)', }}>
        <Typography
          variant="h2"
          sx={{ fontSize: { xs: '1.3rem', md: '1.8rem' }, lineHeight: 1.15, mb: 2, color: '#fff' }}
        >
          Khai phá tiềm năng công nghệ 
          <br />
          đỉnh cao
        </Typography>
        <Typography sx={{ color: 'text.secondary', maxWidth: 380, lineHeight: 1.8 }}>
          Tham gia cùng hàng nghìn chuyên gia công nghệ để trải nghiệm những thiết bị phần cứng tối tân nhất tại FPT SMART HOME
        </Typography>
        <Box display='flex' justifyContent='space-between' mt={2}>
          <Stack direction="row" flexWrap="wrap" gap={1.5} sx={{ position: 'relative', zIndex: 1 }}>
            {numberPeople.map((label, idx) => (
              <Avatar 
                key={idx}
                sx={{ 
                  width: { xs: 34, md: 50}, 
                  height: { xs: 34, md: 50 }, 
                  bgcolor: '#2a3446', color: '#0a0a0d', 
                  cursor: 'pointer', 
                  border: '1px solid #121a2a', ml: idx !== 0 ? -2.5 : 0
                }}
              >
                <Person sx={{ color: '#fff', fontSize: { xs: 20, md: 30 }}} />
              </Avatar> 
            ))}
              <Avatar 
                sx={{ 
                  width: { xs: 34, md: 50}, 
                  height: { xs: 34, md: 50 }, 
                  bgcolor: '#2a3446', color: '#0a0a0d', 
                  cursor: 'pointer', 
                  border: '1px solid #121a2a',
                  ml: -2.5
                }}
              >
                <Add sx={{ color: '#fff', fontSize: { xs: 20, md: 30 }}} />
              </Avatar> 
          </Stack>     
          <Typography sx={{ color: '#fff'}}>
            +500 người vừa tham gia mua 
            <br/>
            sắm tại FPT SMART HOME
          </Typography>   
        </Box>        
      </Box>
      


    </Box>
  );
}

interface RegistrationFormInputs {
  fullName: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Registration() {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    getValues,
    setFocus,
    trigger,
  } = useForm<RegistrationFormInputs>({
    resolver: yupResolver(registrationSchema),
  });
  const password = watch('password');
  const [_loading, setLoading] = useBoolean();
  const navigate = useNavigate();
  const notify = useNotification();
  const { t } = useTranslation('auth');
  const [_error, setError] = useState('');
  const [showPassword, setShowPassword] = useBoolean(false);
  const [showConfirmPassword, setShowConfirmPassword] = useBoolean(false);
  const [agree, setAgree] = useState(false);

  useEffect(() => {
    setFocus('fullName');
  }, [setFocus]);

  useEffect(() => {
    if (password && password?.length === getValues('confirmPassword')?.length) {
      trigger('confirmPassword');
    }
  }, [password, trigger]);

  const onSubmit = async (values: RegistrationFormInputs) => {
    setLoading.on();
    try {
      await signUp(values);
      notify({
        message: t('registration_success'),
        severity: 'success',
      });
      navigate(ROUTE_PATH.TO_LOGIN);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading.off();
    }
  };

  return (
    <Page title='FPT Smart Home - Đăng ký'>
      <Box sx={{ minHeight: '100%', bgcolor: 'background.default', flexGrow: 1, py: { xs: 4, md: 8 } }}>
        <Container maxWidth='lg' sx={{ py: { xs: 4, md: 6 }}}>
          <Grid container>
            <Grid size={{ xs: 12, md: 6 }}>
              <ArtPanel/>
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
                    Tạo tài khoản
                  </Typography>
                  <Typography sx={{ color: 'text.secondary', mb: 4 }}>
                    Bắt đầu hành trình công nghệ của bạn ngay hôm nay
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
                    <Typography variant="body2" color='text.secondary'>Họ và tên</Typography>
                    <ControllerTextField<RegistrationFormInputs>
                      controllerProps={{
                        name: 'fullName',
                        defaultValue: '',
                        control: control,
                      }}
                      textFieldProps={{
                        label: '',
                        error: !!errors.fullName,
                        helperText: errors.fullName?.message,
                        margin: 'none'
                      }}
                      prefixIcon={Person}
                    />
                  </Box>
                  <Box>
                    <Typography variant="body2" color='text.secondary'>Số điện thoại</Typography>
                    <ControllerTextField<RegistrationFormInputs>
                      controllerProps={{
                        name: 'phone',
                        defaultValue: '',
                        control: control,
                      }}
                      textFieldProps={{
                        label: '',
                        error: !!errors.phone,
                        helperText: errors.phone?.message,
                        margin: 'none'
                      }}
                      prefixIcon={Phone}
                    />
                  </Box>
                  <Box>
                    <Typography variant="body2" color='text.secondary'>Email</Typography>
                    <ControllerTextField<RegistrationFormInputs>
                      controllerProps={{
                        name: 'email',
                        defaultValue: '',
                        control: control,
                      }}
                      textFieldProps={{
                        label: '',
                        error: !!errors.email,
                        helperText: errors.email?.message,
                        margin: 'none'
                      }}
                      prefixIcon={Email}
                    />
                  </Box>
                  <Box>
                    <Typography variant="body2" color='text.secondary'>Mật khẩu</Typography>
                    <ControllerTextField<RegistrationFormInputs>
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
                                  aria-label="toggle password visibility"
                                  onClick={() => setShowPassword.toggle()}
                                  edge='end'
                                >
                                  {showPassword ? <VisibilityOff/> : <Visibility/> }
                                </IconButton>
                              </InputAdornment>
                            )
                          }
                        }
                      }}
                      prefixIcon={Lock}
                    />
                  </Box>
                  <Box>
                    <Typography variant="body2" color='text.secondary'>Mật khẩu nhập lại</Typography>
                    <ControllerTextField<RegistrationFormInputs>
                      controllerProps={{
                        name: 'confirmPassword',
                        defaultValue: '',
                        control: control,
                      }}
                      textFieldProps={{
                        label: '',
                        type: showConfirmPassword ? 'text' : 'password',
                        error: !!errors.confirmPassword,
                        helperText: errors.confirmPassword?.message,
                        margin: 'none',
                        slotProps: {
                          input: {
                            endAdornment: (
                              <InputAdornment position='end'>
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={() => setShowConfirmPassword.toggle()}
                                  edge='end'
                                >
                                  {showConfirmPassword ? <VisibilityOff/> : <Visibility/> }
                                </IconButton>
                              </InputAdornment>
                            )
                          }
                        }
                      }}
                      prefixIcon={Lock}
                    />
                  </Box>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={agree}
                                onChange={(e) => setAgree(e.target.checked)}
                            />
                        }
                        label={
                            <>
                            {<span style={{ color: '#fff'}}>Tôi đồng ý với</span>}{" "} 
                            {<span style={{ color: '#33E9FD' }}>Điều khoản dịch vụ</span>}{" "} {<span style={{ color: '#fff'}}>và</span>}{" "} 
                            {<span style={{ color: '#33E9FD' }}>Chính sách bảo mật</span>}
                            </>
                        }
                    />
                  <LoadingButton
                    loading={_loading}
                    type='submit'
                    variant='contained'
                    fullWidth
                    sx={{ mt: 2 }}
                  >
                    Tạo tài khoản
                  </LoadingButton>
                  {/* <Button
                    onClick={() => navigate(`/${ROUTE_PATH.LOGIN}`)}
                    variant='outlined'
                    fullWidth
                    sx={{ mt: 2 }}
                  >
                    Back to login
                  </Button> */}
                </Box>            
              </Box>             
            </Grid>
          </Grid>
        </Container>
      </Box>

    </Page>
  );
}
