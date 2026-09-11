import InputText from "@/components/InputText";
import { COLORS } from "@/constants/colors";
import { ArrowForward, Lock } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Divider, InputAdornment, Stack, Typography } from "@mui/material";

interface LoginWithNoPasswordProps {
    handleSubmit: any;
    onSubmit: any;
    _loading: boolean;
    onChangeTab: (value: any) => void
}

const LoginWithNoPassword = (props: LoginWithNoPasswordProps) => {
    const { handleSubmit, onSubmit, _loading, onChangeTab } = props;
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
                <Typography variant="body2" color='text.secondary'>{`Số điện thoại đăng ký`.toUpperCase()}</Typography>
                <InputText
                    name=''
                    type='text'
                    onChange={() => {}}
                    value=''
                    startAdornment={
                        <InputAdornment position='start'>
                            <Typography sx={{ borderRight: '1px solid #818080', pr: 1 }} color='text.secondary'>VN +84</Typography>
                        </InputAdornment>
                    }
                    margin='dense'
                    fromNoPassword={true}
                />
            </Box>
            <Stack direction='row' gap={1}>
                <Lock fontSize="small" sx={{ color: COLORS.COLOR_PRIMARY }}/>
                <Typography variant="body2" color='text.secondary' sx={{ cursor: 'pointer' }}>
                    Mã xác thực OTP gồm 6 chữ số sẽ được gửi qua tin nhắn SMS hoặc Zalo đến số điện thoại này.
                </Typography>
            </Stack>
            <LoadingButton endIcon={<ArrowForward/>} loading={_loading} type='submit' variant='contained' fullWidth>
                Tiêp tục & Nhận mã OTP
            </LoadingButton>
                <Box display='flex' alignItems='center' justifyContent='space-between' my={2} gap={1}>
                    <Divider sx={{ flex: 1, border: '1px solid #a19f9f' }}/>
                    <Typography color='textSecondary' sx={{ whiteSpace: 'nowrap', cursor: 'pointer' }} onClick={onChangeTab} >
                      Quay lại đăng nhập bằng mật khẩu
                    </Typography>
                    <Divider sx={{ flex: 1, border: '1px solid #a19f9f'}}/>
                </Box>
        </Box>
    )
}
export default LoginWithNoPassword;