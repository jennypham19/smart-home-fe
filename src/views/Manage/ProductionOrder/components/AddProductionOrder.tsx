import DialogComponent from "@/components/DialogComponent";
import InputSelect from "@/components/InputSelect";
import InputText from "@/components/InputText";
import { C, COLORS } from "@/constants/colors";
import useNotification from "@/hooks/useNotification";
import { uploadImage } from "@/services/upload-service";
import { createAccount } from "@/services/user-service";
import { UserPayload } from "@/types/user";
import { checkPhoneRegext, resizeImage } from "@/utils/common";
import { Add, NewReleases, PhotoCamera, SettingsBackupRestore } from "@mui/icons-material";
import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2"
import dayjs, { Dayjs } from "dayjs";
import { ChangeEvent, useRef, useState } from "react";

interface AddProductionOrderProps{
    open: boolean,
    onClose: () => void;
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

export interface ProductRow {
    name: string,
    quantity: string,
    description: string
}

const AddProductionOrder = (props: AddProductionOrderProps) => {
    const { open, onClose } = props;
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

    // Số lượng sản phẩm nhập vào + danh sách dòng sản phẩm render động
    const [productCount, setProductCount] = useState<string>('');
    const [products, setProducts] = useState<ProductRow[]>([]);

    const reset = () => {
        setImageFile(null);
        setAvatarPreview(null);
        setErrorImage(null);
        setErrors({});
        setFormData({ fullName: '', account: '', password: '', phone: '', email: '', receivedJobDate: null, role: '', address: '' });
        setProductCount('');
        setProducts([]);
    }

    // Nhập số lượng -> tạo/bớt số dòng sản phẩm tương ứng (giữ lại dữ liệu đã nhập)
    const handleProductCountChange = (_name: string, value: any) => {
        const raw = String(value).replace(/\D/g, ''); // chỉ cho nhập chữ số
        setProductCount(raw);
        const n = Math.min(Number(raw) || 0, 50); // giới hạn an toàn
        setProducts(prev => {
            const next = [...prev];
            if (n > prev.length) {
                for (let i = prev.length; i < n; i++) next.push({ name: '', quantity: '', description: '' });
            } else {
                next.length = n;
            }
            return next;
        });
    }

    // Cập nhật 1 ô của 1 dòng sản phẩm. name có dạng: prod_{index}_{field}
    const handleProductFieldChange = (name: string, value: any) => {
        const [, idxStr, field] = name.split('_');
        const index = Number(idxStr);
        setProducts(prev => prev.map((p, i) => (i === index ? { ...p, [field]: value } : p)));
    }

    const handleClose = () => {
        onClose();
        reset()
    }


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
            dialogContentHeight={700}
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
                {/* ------------------- Phần tiêu đề dialog ---------------- */}
                <Grid size={{ xs: 12 }}>
                    <Stack direction='row' alignItems='center' spacing={1}>
                        <NewReleases sx={{ color: C.text }}/>
                        <Typography variant="h6" sx={{ color: C.text }}>Thông tin đơn hàng</Typography>
                    </Stack>
                </Grid>

                {/* ------------------- Phần thông tin ---------------- */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography sx={{ fontSize: '15px', color: '#fff'}}>Mã đơn hàng</Typography>
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
                    <Typography sx={{ fontSize: '15px', color: '#fff'}}>Tên đơn hàng</Typography>
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
                <Grid size={{ xs: 12 }}>
                    <Typography sx={{ fontSize: '15px', color: '#fff'}}>Số lượng sản phẩm</Typography>
                    <InputText
                        label=""
                        name="productCount"
                        value={productCount}
                        type="text"
                        onChange={handleProductCountChange}
                        margin="dense"
                        placeholder="Nhập số lượng sản phẩm...."
                    />
                </Grid>
                {/* ---------------- Danh sách sản phẩm (render động theo số lượng nhập) ---------------- */}
                {products.map((product, index) => (
                    <Grid key={index} size={{ xs: 12 }}>
                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12, md: 4 }}>
                                <Typography sx={{ fontSize: '15px', color: '#fff'}}>Sản phẩm {index + 1}</Typography>
                                <InputText
                                    label=""
                                    name={`prod_${index}_name`}
                                    value={product.name}
                                    type="text"
                                    onChange={handleProductFieldChange}
                                    margin="dense"
                                    placeholder="Sản phẩm..."
                                />
                            </Grid>
                            <Grid size={{ xs: 12, md: 4 }}>
                                <Typography sx={{ fontSize: '15px', color: '#fff'}}>Số lượng</Typography>
                                <InputText
                                    label=""
                                    name={`prod_${index}_quantity`}
                                    value={product.quantity}
                                    type="text"
                                    onChange={handleProductFieldChange}
                                    margin="dense"
                                    placeholder="Số lượng..."
                                />
                            </Grid>
                            <Grid size={{ xs: 12, md: 4 }}>
                                <Typography sx={{ fontSize: '15px', color: '#fff'}}>Mô tả</Typography>
                                <InputText
                                    label=""
                                    name={`prod_${index}_description`}
                                    value={product.description}
                                    type="text"
                                    onChange={handleProductFieldChange}
                                    margin="dense"
                                    placeholder="Mô tả..."
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                ))}
                {/* ------------------- Button -------------------- */}
                <Grid size={{ xs: 12 }} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, my: 1.5}}>
                    <Button
                        sx={{
                            bgcolor: C.cyan
                        }}
                        startIcon={<Add/>}
                        onClick={handleSubmit}
                    >
                        Tạo đơn
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

export default AddProductionOrder;