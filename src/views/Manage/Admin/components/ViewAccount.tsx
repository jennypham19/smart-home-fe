import DialogComponent from "@/components/DialogComponent";
import InputSelect from "@/components/InputSelect";
import InputText from "@/components/InputText";
import { C } from "@/constants/colors";
import useNotification from "@/hooks/useNotification";
import { uploadImage } from "@/services/upload-service";
import { createAccount } from "@/services/user-service";
import { IUser, UserPayload } from "@/types/user";
import { checkPhoneRegext, resizeImage } from "@/utils/common";
import { Add, NewReleases, PhotoCamera, SettingsBackupRestore } from "@mui/icons-material";
import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2"
import avatar1 from '@/assets/images/users/avatar-1.png';
import { getRoleLabel } from "@/utils/labelEntoVni";
import DateTime from "@/utils/DateTime";

interface ViewAccountProps{
    open: boolean,
    onClose: () => void;
    account: IUser
}

const ViewAccount = (props: ViewAccountProps) => {
    const { open, onClose, account } = props;

    return(
        <DialogComponent
            dialogKey={open}
            handleClose={onClose}
            sx={{ bgcolor: C.card }}
            isActiveHeader={false}
            isActiveFooter={false}
            dialogContentHeight={550}
            // Khi nội dung tràn height và xuất hiện scroll: nền paper theo C.card + thu nhỏ thanh cuộn
            PaperProps={{
                sx: {
                    bgcolor: C.card,
                    // Firefox
                    scrollbarWidth: 'thin',
                    scrollbarColor: `rgba(255,255,255,0.25) ${C.card}`,
                    '&, & *': {
                        scrollbarWidth: 'thin',
                        scrollbarColor: `rgba(255,255,255,0.25) ${C.card}`,
                    },
                    // Chrome / Edge / Safari
                    '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
                        width: '6px',
                        height: '6px',
                    },
                    '&::-webkit-scrollbar-track, & *::-webkit-scrollbar-track': {
                        backgroundColor: C.card,
                    },
                    '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
                        backgroundColor: 'rgba(255,255,255,0.25)',
                        borderRadius: '8px',
                    },
                    '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover': {
                        backgroundColor: 'rgba(255,255,255,0.4)',
                    },
                },
            }}
        >
            <Grid container spacing={2}> 
                <Grid size={{ xs: 12 }} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2.5 }}>
                    <Avatar
                        src={account.avatarUrl ?? avatar1}
                        sx={{ width: 150, height: 150, mb: 2, bgcolor: 'grey.600', borderRadius: '50%' }}
                    />
                </Grid>
                <Grid size={{ xs: 12 }}>
                    <Stack direction='row' px={{ xs: 0, md: 10 }} alignItems='center' spacing={1}>
                        <NewReleases sx={{ color: C.text }}/>
                        <Typography variant="h6" sx={{ color: C.text }}>Thông tin tài khoản</Typography>
                    </Stack>
                </Grid>  
                <Grid size={{ xs: 12 }}>
                    <Box display='flex' px={{ xs: 0, md: 10 }} justifyContent='space-between' flexDirection='row'>
                        <Typography sx={{ color: C.textMuted }}>Họ và tên:</Typography>
                        <Typography sx={{ color: C.text }}>{account.fullName}</Typography>
                    </Box>
                </Grid>
                {account.phone !== null && (
                    <Grid size={{ xs: 12 }}>
                        <Box display='flex' px={{ xs: 0, md: 10 }} justifyContent='space-between' flexDirection='row'>
                            <Typography sx={{ color: C.textMuted }}>Số điện thoại:</Typography>
                            <Typography sx={{ color: C.text }}>{account.phone}</Typography>
                        </Box>
                    </Grid>                    
                )}

                {account.email !== null && (
                    <Grid size={{ xs: 12 }}>
                        <Box display='flex' px={{ xs: 0, md: 10 }} justifyContent='space-between' flexDirection='row'>
                            <Typography sx={{ color: C.textMuted }}>Email:</Typography>
                            <Typography sx={{ color: C.text }}>{account.email}</Typography>
                        </Box>
                    </Grid>                    
                )}

                <Grid size={{ xs: 12 }}>
                    <Box display='flex' px={{ xs: 0, md: 10 }} justifyContent='space-between' flexDirection='row'>
                        <Typography sx={{ color: C.textMuted }}>Ngày nhận việc:</Typography>
                        <Typography sx={{ color: C.text }}>{DateTime.FormatDate(account.receivedJobDate)}</Typography>
                    </Box>
                </Grid>
                <Grid size={{ xs: 12 }}>
                    <Box display='flex' px={{ xs: 0, md: 10 }} justifyContent='space-between' flexDirection='row'>
                        <Typography sx={{ color: C.textMuted }}>Chức vụ:</Typography>
                        <Typography sx={{ color: C.text }}>{getRoleLabel(account.role)}</Typography>
                    </Box>
                </Grid>
                {account.address !== null && (
                    <Grid size={{ xs: 12 }}>
                        <Box display='flex' px={{ xs: 0, md: 10 }} justifyContent='space-between' flexDirection='row'>
                            <Typography sx={{ color: C.textMuted }}>Địa chỉ:</Typography>
                            <Typography sx={{ color: C.text }}>{account.address}</Typography>
                        </Box>
                    </Grid>
                )}
                <Grid sx={{ display: 'flex', justifyContent: 'center' }} size={{ xs: 12 }}>
                    <Button sx={{ width: 80 }} onClick={onClose}>
                        Quay lại
                    </Button>
                </Grid>
            </Grid>
        </DialogComponent>
    )
}

export default ViewAccount;