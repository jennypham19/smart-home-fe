import DialogComponent from "@/components/DialogComponent";
import InputText from "@/components/InputText";
import { C } from "@/constants/colors";
import useNotification from "@/hooks/useNotification";
import { uploadImage } from "@/services/upload-service";
import { checkPhoneRegext, resizeImage } from "@/utils/common";
import { Add, PhotoCamera, SettingsBackupRestore } from "@mui/icons-material";
import { Avatar, Box, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2"
import dayjs, { Dayjs } from "dayjs";
import { ChangeEvent, useRef, useState } from "react";

interface AddAccountProps{
    open: boolean,
    onClose: () => void;
}

export interface FormDataUser{
    fullName: string,
    account: string,
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
    const { open, onClose } = props;
    const notify = useNotification();
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const [errorImage, setErrorImage] = useState<string | null>(null);
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState<FormDataUser>({
        fullName: '', account: '', phone: '', email: '', receivedJobDate: null, role: '', address: ''
    })

    const reset = () => {
        setImageFile(null);
        setAvatarPreview(null);
        setErrorImage(null);
        setErrors({});
        setFormData({ fullName: '', account: '', phone: '', email: '', receivedJobDate: null, role: '', address: '' });
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
        if(!formData.account) newErrors.account = 'Vui lòng nhập ngày sinh';
        if(!formData.role) newErrors.role = 'Vui lòng chọn chức vụ';
        // if(!formData.password) newErrors.password = 'Vui lòng nhập mật khẩu';
        if(!imageFile){
            setErrorImage("Vui lòng tải lên hình ảnh")
        };
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0 && !!imageFile
    }

    const handleSubmit = async() => {
        if(!validateForm()){
            return;
        }

        setIsSubmitting(true);
        try {
            let uploadResponse: any;
            uploadResponse = await uploadImage(imageFile!, 'users');
            if(!uploadResponse.success || !uploadResponse.data?.file){
                throw new Error('Upload ảnh thất bại hoặc không nhận được URL ảnh');
            }

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
            handleClose={onClose}
            sx={{ bgcolor: C.card }}
            isActiveHeader={false}
            isActiveFooter={false}
            dialogContentHeight={720}
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
                <Grid size={{ xs: 12 }}>
                    <Typography sx={{ fontSize: '15px', color: '#fff'}}>Họ và tên</Typography>
                    <InputText
                        label=""
                        name=""
                        value={'gfdfdgf'}
                        type="text"
                        onChange={() => {}}
                        margin="dense"
                        placeholder="Nội dung...."
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography sx={{ fontSize: '15px', color: '#fff'}}>Tên tài khoản</Typography>
                    <InputText
                        label=""
                        name=""
                        value={'gfdfdgf'}
                        type="text"
                        onChange={() => {}}
                        margin="dense"
                        placeholder="Nội dung...."
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography sx={{ fontSize: '15px', color: '#fff'}}>Số điện thoại</Typography>
                    <InputText
                        label=""
                        name=""
                        value={''}
                        type="text"
                        onChange={() => {}}
                        margin="dense"
                        placeholder="Nội dung...."
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography sx={{ fontSize: '15px', color: '#fff'}}>Email</Typography>
                    <InputText
                        label=""
                        name=""
                        value={''}
                        type="text"
                        onChange={() => {}}
                        margin="dense"
                        placeholder="Nội dung...."
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography sx={{ fontSize: '15px', color: '#fff'}}>Ngày nhận việc</Typography>
                    <InputText
                        label=""
                        name=""
                        value={dayjs()}
                        type="date"
                        onChange={() => {}}
                        margin="dense"
                        placeholder="Nội dung...."
                    />
                </Grid>
                <Grid size={{ xs: 12 }}>
                    <Typography sx={{ fontSize: '15px', color: '#fff'}}>Chức vụ</Typography>
                    <InputText
                        label=""
                        name=""
                        value={''}
                        type="text"
                        onChange={() => {}}
                        margin="dense"
                        placeholder="Nội dung...."
                    />
                </Grid>
                <Grid size={{ xs: 12 }}>
                    <Typography sx={{ fontSize: '15px', color: '#fff'}}>Địa chỉ</Typography>
                    <InputText
                        label=""
                        name=""
                        value={''}
                        type="text"
                        onChange={() => {}}
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
                    >
                        Tạo tài khoản
                    </Button>
                    <Button
                        variant="outlined"
                        sx={{ border: `1px solid ${C.border}`, color: C.textMuted }}
                        startIcon={<SettingsBackupRestore/>}
                    >
                        Quay lại
                    </Button>
                </Grid>
            </Grid>
        </DialogComponent>
    )
}

export default AddAccount;