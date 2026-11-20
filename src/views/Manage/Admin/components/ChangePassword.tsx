import DialogComponent from "@/components/DialogComponent";
import InputText from "@/components/InputText";
import { C } from "@/constants/colors";
import useBoolean from "@/hooks/useBoolean";
import useNotification from "@/hooks/useNotification";
import { changePassword } from "@/services/user-service";
import { IUser } from "@/types/user";
import { Add, Close, SettingsBackupRestore, Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, IconButton, InputAdornment, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useState } from "react";
interface ChangePasswordProps{
    open: boolean,
    onClose: () => void;
    user: IUser;
}

interface FormDataChangePassword{
    currentPassword: string,
    password: string;
    confirmPassword: string
}

type FormErrorsChangePassword = {
    [K in keyof FormDataChangePassword]?: string
}

const ChangePassword = (props: ChangePasswordProps) => {
    const { open, onClose, user } = props;
    const notify = useNotification();
    const [showCurrentPassword, setShowCurrentPassword] = useBoolean(false);
    const [showPassword, setShowPassword] = useBoolean(false);
    const [showConfirmPassword, setShowConfirmPassword] = useBoolean(false);

    const [formData, setFormData] = useState<FormDataChangePassword>({
        currentPassword: '', password: '', confirmPassword: ''
    })

    const [errors, setErrors] = useState<FormErrorsChangePassword>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const reset = () => {
        setFormData({ currentPassword: '', password: '', confirmPassword: '' });
        setErrors({});
    }

    const handleClose = () => {
        onClose();
        reset();
    }

    const handleInputChange = (name: string, value: any) => {
        const updatedFormData = {
            ...formData,
            [name]: value
        };
        setFormData(updatedFormData);

        setErrors(prev => {
            const updatedErrors = { ...prev };

            // Xóa lỗi của chính field đang nhập
            updatedErrors[name as keyof FormErrorsChangePassword] = undefined;

            // Live-validate: mật khẩu mới & nhập lại phải khớp.
            // Chạy mỗi khi đổi 'password' hoặc 'confirmPassword', không phụ thuộc có lỗi trước đó.
            if(name === 'password' || name === 'confirmPassword'){
                const { password, confirmPassword } = updatedFormData;
                if(confirmPassword){
                    updatedErrors.confirmPassword = confirmPassword !== password
                        ? 'Mật khẩu nhập lại không khớp'
                        : undefined;
                }
            }

            return updatedErrors;
        })
    }
    
    const validate = () : boolean => {
        const newErrors: FormErrorsChangePassword = {};
        if(!formData.currentPassword) newErrors.currentPassword = 'Mật khẩu hiện tại không được để trống';
        if(!formData.password) newErrors.password = 'Mật khẩu mới không được để trống';
        if(!formData.confirmPassword) newErrors.confirmPassword = 'Mật khẩu mới nhập lại không được để trống';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0
    }
    const handleSave = async() => {
        if(!validate()) {
            return
        }
        setIsSubmitting(true)
        try {
            const res = await changePassword(user.id, formData.password);
            notify({
                message: res.message,
                severity: 'success'
            })
            handleClose();
        } catch (error: any) {
            notify({
                message: error.message,
                severity: 'error'
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    return(
        <DialogComponent
            dialogKey={open}
            handleClose={handleClose}
            dialogContentHeight="auto"
            isActiveFooter={false}
            dialogTitle="Đổi mật khẩu"
            sx={{ bgcolor: C.card }}
            PaperProps={{
                sx: {
                    bgcolor: C.card,
                    borderRadius: 3,
                    border: `1px solid ${C.border}`,
                    width: "100%",
                },
            }}
        >
            <Grid container spacing={2}>
                <Grid size={{ xs: 12 }}>
                    <Typography sx={{ fontSize: '15px', color: '#fff'}}>Mật khẩu hiện tại</Typography>
                    <InputText
                        label=""
                        name="currentPassword"
                        value={formData.currentPassword}
                        type={showCurrentPassword ? 'text' : 'password'}
                        onChange={handleInputChange}
                        margin="dense"
                        placeholder="Nhập mật khẩu hiện tại"
                        endAdornment={
                            <InputAdornment position='end'>
                                <IconButton
                                    aria-label='toggle password visibility'
                                    onClick={() => setShowCurrentPassword.toggle()}
                                    edge='end'
                                >
                                    {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        error={!!errors.currentPassword}
                        helperText={errors.currentPassword}
                        isPassword={true}
                    />
                </Grid>
                <Grid size={{ xs: 12 }}>
                    <Typography sx={{ fontSize: '15px', color: '#fff'}}>Mật khẩu mới</Typography>
                    <InputText
                        label=""
                        name="password"
                        value={formData.password}
                        type={showPassword ? 'text' : 'password'}
                        onChange={handleInputChange}
                        margin="dense"
                        placeholder="Nhập mật khẩu mới"
                        endAdornment={
                            <InputAdornment position='end'>
                                <IconButton
                                    aria-label='toggle password visibility'
                                    onClick={() => setShowPassword.toggle()}
                                    edge='end'
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        error={!!errors.password}
                        helperText={errors.password}
                        isPassword={true}
                    />
                </Grid>
                <Grid size={{ xs: 12 }}>
                    <Typography sx={{ fontSize: '15px', color: '#fff'}}>Nhập lại mật khẩu mới</Typography>
                    <InputText
                        label=""
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        type={showConfirmPassword ? 'text' : 'password'}
                        onChange={handleInputChange}
                        margin="dense"
                        placeholder="Nhập lại mật khẩu mới"
                        endAdornment={
                            <InputAdornment position='end'>
                                <IconButton
                                    aria-label='toggle password visibility'
                                    onClick={() => setShowConfirmPassword.toggle()}
                                    edge='end'
                                >
                                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword}
                        isPassword={true}
                    />
                </Grid>
                <Grid size={{ xs: 12 }} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1}}>
                    <Button
                        sx={{
                            bgcolor: C.cyan
                        }}
                        startIcon={<Add/>}
                        onClick={handleSave}
                    >
                        Lưu mật khẩu
                    </Button>
                    <Button
                        variant="outlined"
                        sx={{ border: `1px solid ${C.border}`, color: C.textMuted }}
                        startIcon={<Close/>}
                        onClick={handleClose}
                    >
                        Hủy
                    </Button>
                </Grid>
            </Grid>
        </DialogComponent>
    )

}

export default ChangePassword;