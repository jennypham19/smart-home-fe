import DialogComponent from "@/components/DialogComponent";
import InputSelect from "@/components/InputSelect";
import InputText from "@/components/InputText";
import { C } from "@/constants/colors";
import useNotification from "@/hooks/useNotification";
import { uploadImage } from "@/services/upload-service";
import { createAccount } from "@/services/user-service";
import { UserPayload } from "@/types/user";
import { checkPhoneRegext, resizeImage } from "@/utils/common";
import { Add, PhotoCamera, SettingsBackupRestore } from "@mui/icons-material";
import { Avatar, Box, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2"
import dayjs, { Dayjs } from "dayjs";
import { ChangeEvent, useRef, useState } from "react";

interface AddAccountProps{
    open: boolean,
    onClose: () => void;
    fetchData: () =>  void;
}

export interface FormDataUser{
    fullName: string,
    account: string,
    password: string,
    phone: string,
    email: string,
    receivedJobDate: Dayjs | null,
    role: string,
    address: string
}

type FormErrors = {
    [K in keyof FormDataUser]?: string
}

const AddAccount = (props: AddAccountProps) => {
    const { open, onClose, fetchData } = props;
    const notify = useNotification();
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const [errorImage, setErrorImage] = useState<string | null>(null);
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState<FormDataUser>({
        fullName: '', account: '', password: '', phone: '', email: '', receivedJobDate: null, role: '', address: ''
    })

    const reset = () => {
        setImageFile(null);
        setAvatarPreview(null);
        setErrorImage(null);
        setErrors({});
        setFormData({ fullName: '', account: '', password: '', phone: '', email: '', receivedJobDate: null, role: '', address: '' });
    }

    const handleClose = () => {
        onClose();
        reset()
    }

    const handleChangeAvatar = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if(file && file.type.startsWith('image/')) {
            const { blob, previewUrl } = await resizeImage(file, 800);
            const newFile = new File([blob], file.name, { type: "image/jpeg" });
            setImageFile(newFile);
            setAvatarPreview(previewUrl);
            setErrorImage(null)
        }else{
            setAvatarPreview(null);
            event.target.value = "";
        }
        //Reset lại input để onChange được gọi nếu chọn lại cùng 1 ảnh
        if(fileInputRef.current){
            fileInputRef.current.value = "";
        }
    }

    let finalDisplayAvatarSrc: string | undefined = undefined;
    if(avatarPreview) finalDisplayAvatarSrc = avatarPreview; 

    const handleInputChange = (name: string, value: any) => {
        const validName = name as keyof FormDataUser; 
        setFormData(prev => ({ ...prev, [name]: value}));

        if(validName === 'email' && typeof value === 'string'){
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // chuẩn email đơn giản
            if(!emailRegex.test(value)){
                setErrors(prev => ({...prev, email: 'Email không hợp lệ'}));
                return
            }
        }

        if(validName === 'phone' && typeof value === 'string'){
            const phoneError = checkPhoneRegext(value);
            setErrors(prev => ({...prev, phone: phoneError }));
        }

        if(errors[name as keyof typeof errors]){
            setErrors(prev => ({ ...prev, [name]: undefined}))
        }
    }

    const validateForm = () : boolean => {
        const newErrors: FormErrors = {};
        if(!formData.fullName) newErrors.fullName = 'Vui lòng nhập họ tên';
        if(!formData.account) newErrors.account = 'Vui lòng nhập tài khoản';
        if(!formData.role) newErrors.role = 'Vui lòng chọn chức vụ';
        if(!formData.password) newErrors.password = 'Vui lòng nhập mật khẩu';
        if(!formData.receivedJobDate) newErrors.receivedJobDate = 'Vui lòng chọn ngày nhận việc';
        // if(!imageFile){
        //     setErrorImage("Vui lòng tải lên hình ảnh")
        // };
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async() => {
        if(!validateForm()){
            return;
        }

        setIsSubmitting(true);
        try {
            let uploadResponse: any;
            if(imageFile != null){
                uploadResponse = await uploadImage(imageFile!, 'users');
                if(!uploadResponse.success || !uploadResponse.data?.file){
                    throw new Error('Upload ảnh thất bại hoặc không nhận được URL ảnh');
                }                
            }
            const payload: UserPayload = {
                avatarUrl: uploadResponse ? uploadResponse.data.file.imageUrl : null,
                fullName: formData.fullName,
                phone: formData.phone ? formData.phone : null,
                account: formData.account,
                password: formData.password,
                email: formData.email ? formData.email : null,
                receivedJobDate: formData.receivedJobDate ? formData.receivedJobDate : null,
                role: formData.role,
                address: formData.address ? formData.address : null
            }
            const res = await createAccount(payload);
            notify({
                message: res.message,
                severity: 'success'
            })
            fetchData();
            handleClose()
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
            sx={{ bgcolor: C.card }}
            isActiveHeader={false}
            isActiveFooter={false}
            dialogContentHeight={720}
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
                    <Grid size={{ xs: 12}} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2.5 }}>
                        <Box sx={{ position: 'relative', width: 120, height: 120}}>
                            <Avatar
                                src={finalDisplayAvatarSrc}
                                sx={{ width: '100%', height: '100%', mb: 2, bgcolor: 'grey.600', borderRadius: '50%' }}
                            />
                            <Button
                                variant="contained"
                                sx={{
                                    bgcolor: 'grey.300',
                                    borderRadius: '50%',
                                    minWidth: '30px',
                                    width: '30px',
                                    height: '30px',
                                    position: 'absolute',
                                    bottom: 0,
                                    right: 5
                                }}
                                component='label'
                                startIcon={<PhotoCamera sx={{ width: '25px', height: '25px', ml: 1.2, color: '#1C1A1B'}}/>}
                            >
                                <input ref={fileInputRef} type="file" hidden accept="image/*" onChange={handleChangeAvatar}/>
                            </Button>
                        </Box> 
                        {errorImage && (
                            <Typography mt={1} fontSize='13px' color="error">{errorImage}</Typography>
                        )}
                    </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography sx={{ fontSize: '15px', color: '#fff'}}>Họ và tên</Typography>
                    <InputText
                        label=""
                        name="fullName"
                        value={formData.fullName}
                        type="text"
                        onChange={handleInputChange}
                        margin="dense"
                        placeholder="Nội dung...."
                        error={!!errors.fullName}
                        helperText={errors.fullName}

                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography sx={{ fontSize: '15px', color: '#fff'}}>Số điện thoại</Typography>
                    <InputText
                        label=""
                        name="phone"
                        value={formData.phone}
                        type="text"
                        onChange={handleInputChange}
                        margin="dense"
                        placeholder="Nội dung...."
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography sx={{ fontSize: '15px', color: '#fff'}}>Tên tài khoản</Typography>
                    <InputText
                        label=""
                        name="account"
                        value={formData.account}
                        type="text"
                        onChange={handleInputChange}
                        margin="dense"
                        placeholder="Nội dung...."
                        error={!!errors.account}
                        helperText={errors.account}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography sx={{ fontSize: '15px', color: '#fff'}}>Mật khẩu</Typography>
                    <InputText
                        label=""
                        name="password"
                        value={formData.password}
                        type="text"
                        onChange={handleInputChange}
                        margin="dense"
                        placeholder="Nội dung...."
                        error={!!errors.password}
                        helperText={errors.password}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography sx={{ fontSize: '15px', color: '#fff'}}>Email</Typography>
                    <InputText
                        label=""
                        name="email"
                        value={formData.email}
                        type="text"
                        onChange={handleInputChange}
                        margin="dense"
                        placeholder="Nội dung...."
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography sx={{ fontSize: '15px', color: '#fff'}}>Ngày nhận việc</Typography>
                    <InputText
                        label=""
                        name="receivedJobDate"
                        value={formData.receivedJobDate}
                        type="date"
                        onChange={handleInputChange}
                        margin="dense"
                        placeholder="Nội dung...."
                        error={!!errors.receivedJobDate}
                        helperText={errors.receivedJobDate}
                    />
                </Grid>
                <Grid size={{ xs: 12 }}>
                    <Typography sx={{ fontSize: '15px', color: '#fff'}}>Chức vụ</Typography>
                    <InputSelect
                        label=""
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                        options={[
                            { id: 1, value: 'manager', label: "Quản lý", },
                            { id: 2, value: 'application-employee', label: "Nhân viên nhập đơn" },
                            { id: 3, value: 'production-employee', label: "Nhân viên sản xuất" },
                            { id: 4, value: 'exchange-employee', label: "Nhân viên giao nhận" }
                        ]}
                        transformOptions={(data) =>
                            data.map((item) => ({
                                label: item.label,
                                value: item.value
                            }))
                        }
                        placeholder="Chọn chức vụ"
                        margin='dense'
                        error={!!errors.role}
                        helperText={errors.role}
                    />
                </Grid>
                <Grid size={{ xs: 12 }}>
                    <Typography sx={{ fontSize: '15px', color: '#fff'}}>Địa chỉ</Typography>
                    <InputText
                        label=""
                        name="address"
                        value={formData.address}
                        type="text"
                        onChange={handleInputChange}
                        margin="dense"
                        placeholder="Nội dung...."
                        multiline
                        rows={3}
                    />
                </Grid>
                <Grid size={{ xs: 12 }} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1}}>
                    <Button
                        sx={{
                            bgcolor: C.cyan
                        }}
                        startIcon={<Add/>}
                        onClick={handleSubmit}
                    >
                        Tạo tài khoản
                    </Button>
                    <Button
                        variant="outlined"
                        sx={{ border: `1px solid ${C.border}`, color: C.textMuted }}
                        startIcon={<SettingsBackupRestore/>}
                        onClick={handleClose}
                    >
                        Quay lại
                    </Button>
                </Grid>
            </Grid>
        </DialogComponent>
    )
}

export default AddAccount;