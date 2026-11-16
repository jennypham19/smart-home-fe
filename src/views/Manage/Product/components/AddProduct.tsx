import DialogComponent from "@/components/DialogComponent";
import InputSelect from "@/components/InputSelect";
import InputText from "@/components/InputText";
import { C } from "@/constants/colors";
import useNotification from "@/hooks/useNotification";
import { createProduct } from "@/services/product-service";
import { ProductPayload } from "@/types/product";
import { getOrderStatusLabel } from "@/utils/labelEntoVni";
import { Add, NewReleases, SettingsBackupRestore } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import {useState } from "react";

interface AddProductProps{
    open: boolean,
    onClose: () => void;
}

export interface FormDataProduct{
    skuCode: string,
    name: string,
    brand: string,
    amount: number | null | string,
    category: string,
    status: string
}

type FormErrors = {
    [K in keyof FormDataProduct]?: string
}

const AddProduct = (props: AddProductProps) => {
    const { open, onClose } = props;
    const notify = useNotification();
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState<FormDataProduct>({
        skuCode: '', name: '', brand: '', amount: null, category: '', status: 'in_stock'
    })

    const handleClose = () => {
        onClose()
        setFormData({ skuCode: '', name: '', brand: '', amount: null, category: '', status: 'in_stock' })
        setErrors({})
    }

    const handleInputChange = (name: string, value: any) => {
        const validName = name as keyof FormDataProduct; 
        if (validName === 'amount') {
            // Chỉ cho phép nhập số
            const raw = String(value).replace(/[^0-9]/g, '');

            setFormData(prev => ({
                ...prev,
                amount: raw,
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [validName]: value,
            }));
        }
            if(errors[name as keyof typeof errors]){
                setErrors(prev => ({ ...prev, [name]: undefined}))
            }
        }

    const validateForm = () : boolean => {
        const newErrors: FormErrors = {};
        if(!formData.skuCode) newErrors.skuCode = 'Vui lòng nhập mã SKU';
        if(!formData.name) newErrors.name = 'Vui lòng nhập tên sản phẩm';
        if(!formData.brand) newErrors.brand = 'Vui lòng nhập thương hiệu';
        if(!formData.amount) newErrors.amount = 'Vui lòng nhập số lượng';
        if(!formData.category) newErrors.category = 'Vui lòng chọn danh mục'

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async() => {
        if(!validateForm()){
            return
        }
        setIsSubmitting(true);
        const payload: ProductPayload = {
            skuCode: formData.skuCode,
            name: formData.name,
            brand: formData.brand,
            amount: Number(formData.amount),
            category: formData.category,
            status: formData.status
        }
        try {
            const res = await createProduct(payload);
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
            isActiveHeader={false}
            isActiveFooter={false}
            sx={{ bgcolor: C.card }}
            dialogContentHeight={Object.keys(errors).length === 0 ? 420 : 480}
        >
            <Grid container spacing={2}>
                {/* ------------------- Phần tiêu đề dialog ---------------- */}
                <Grid size={{ xs: 12 }}>
                    <Stack direction='row' alignItems='center' spacing={1}>
                        <NewReleases sx={{ color: C.text }}/>
                        <Typography variant="h6" sx={{ color: C.text }}>Thông tin sản phẩm</Typography>
                    </Stack>
                </Grid>
                {/* ------------------- Phần form thông tin ---------------- */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography sx={{ fontSize: '15px', color: '#fff'}}>Mã SKU <span style={{ color: C.red }}>*</span></Typography>
                    <InputText
                        label=""
                        name="skuCode"
                        type="text"
                        onChange={handleInputChange}
                        value={formData.skuCode}
                        margin="dense"
                        error={!!errors.skuCode}
                        helperText={errors.skuCode}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography sx={{ fontSize: '15px', color: '#fff'}}>Tên sản phẩm <span style={{ color: C.red }}>*</span></Typography>
                    <InputText
                        label=""
                        name="name"
                        type="text"
                        onChange={handleInputChange}
                        value={formData.name}
                        margin="dense"
                        error={!!errors.name}
                        helperText={errors.name}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography sx={{ fontSize: '15px', color: '#fff'}}>Thương hiệu <span style={{ color: C.red }}>*</span></Typography>
                    <InputText
                        label=""
                        name="brand"
                        type="text"
                        onChange={handleInputChange}
                        value={formData.brand}
                        margin="dense"
                        error={!!errors.brand}
                        helperText={errors.brand}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography sx={{ fontSize: '15px', color: '#fff'}}>Số lượng <span style={{ color: C.red }}>*</span></Typography>
                    <InputText
                        label=""
                        name="amount"
                        type="text"
                        onChange={handleInputChange}
                        value={formData.amount}
                        margin="dense"
                        error={!!errors.amount}
                        helperText={errors.amount}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography sx={{ fontSize: '15px', color: '#fff'}}>Danh mục <span style={{ color: C.red }}>*</span></Typography>
                    <InputSelect
                        label=""
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        options={[
                            { id: 1, value: 'smart_device', label: 'Thiết bị điện tử' },
                            { id: 2, value: 'accessory', label: 'Phụ kiện' }
                        ]}
                        transformOptions={(data) =>
                            data.map((item) => ({
                                label: item.label,
                                value: item.value
                            }))
                        }
                        margin='dense'
                        placeholder="Chọn danh mục"
                        error={!!errors.category}
                        helperText={errors.category}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography sx={{ fontSize: '15px', color: '#fff'}}>Trạng thái</Typography>
                    <InputText
                        label=""
                        name="status"
                        value={getOrderStatusLabel(formData.status)}
                        onChange={handleInputChange}
                        disabled
                        type="text"
                        margin="dense"
                    />
                </Grid>
                {/* ------------------- Button -------------------- */}
                <Grid size={{ xs: 12 }} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, my: 1.5}}>
                    <Button
                        sx={{
                            bgcolor: C.base
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

export default AddProduct;