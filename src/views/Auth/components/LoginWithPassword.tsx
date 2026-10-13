import ControllerTextField from "@/components/ControllerField/ControllerTextField";
import { Box, Button, Divider, IconButton, InputAdornment, Typography } from "@mui/material";
import { LoginFormInputs } from "../Login";
import { Email, Google, Lock, PhoneIphone, Visibility, VisibilityOff } from '@mui/icons-material';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from "@/constants/routes";
import { LoadingButton } from "@mui/lab";
import Grid from "@mui/material/Grid2";

interface LoginWithPasswordProps {
    handleSubmit: any;
    onSubmit: any;
    control: any;
    errors: any;
    showPassword: boolean;
    setShowPassword: any;
    _loading: boolean;
    onChangeTab: (value: any) => void
}

const LoginWithPassword: React.FC<LoginWithPasswordProps> = (props) => {
    const { handleSubmit, onSubmit, control, errors, showPassword, setShowPassword, _loading,onChangeTab } = props;
    return(
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
                <Box display='flex' alignItems='center' justifyContent='space-between' my={2} gap={1}>
                    <Divider sx={{ flex: 1, border: '1px solid #a19f9f' }}/>
                    <Typography color='textSecondary' sx={{ whiteSpace: 'nowrap', cursor: 'pointer' }}>
                      Hoặc tiếp tục với
                    </Typography>
                    <Divider sx={{ flex: 1, border: '1px solid #a19f9f'}}/>
                </Box>
                <Grid container spacing={2}>
                  <Grid size={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #a19f9f', borderRadius: 1, flexDirection: 'column', gap: 1, py: 1, cursor: 'pointer' }}> 
                      <Google sx={{ color: '#a19f9f', mr: 1 }} />
                      <Typography color="text.secondary">Google</Typography>
                    </Box>
                  </Grid>
                  <Grid size={6}>
                    <Box onClick={onChangeTab} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #a19f9f', borderRadius: 1, flexDirection: 'column', gap: 1, py: 1, cursor: 'pointer' }}> 
                      <PhoneIphone sx={{ color: '#a19f9f', mr: 1 }} />
                      <Typography color="text.secondary">OTP</Typography>
                    </Box>
                  </Grid>
                </Grid>
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
    )
}

export default LoginWithPassword;