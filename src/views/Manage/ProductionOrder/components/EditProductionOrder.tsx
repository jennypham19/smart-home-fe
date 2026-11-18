import DialogComponent from "@/components/DialogComponent";
import { C } from "@/constants/colors";
import useAuth from "@/hooks/useAuth";
import useNotification from "@/hooks/useNotification";
import { IOrder, OrderPayload } from "@/types/order";
import { Add, NewReleases, SettingsBackupRestore } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useEffect, useState } from "react";
import { FormDataOrder, FormErrors, ProductRow } from "./AddProductionOrder";
import InputText from "@/components/InputText";
import { IProduct } from "@/types/product";
import { getAllProduct } from "@/services/product-service";
import InputSelect from "@/components/InputSelect";
import { updateOrderWithProduct } from "@/services/order-service";

interface EditProductionOrderProps{
    open: boolean,
    onClose: () => void;
    order: IOrder;
}

const EditProductionOrder = (props: EditProductionOrderProps) => {
    const { open, onClose, order } = props;
    const { profile } = useAuth();
    const notify = useNotification();
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState<FormDataOrder>({
        code: order.code, name: order.name, productQuantity: order.productQuantity
    })
    const [allProducts, setAllProducts] = useState<IProduct[]>([])
    // Số lượng sản phẩm nhập vào + danh sách dòng sản phẩm render động
    const [products, setProducts] = useState<ProductRow[]>([]);

    useEffect(() => {
        if(order && open){
            const response = order.products
            setProducts(
                response.map((item) => ({
                    skuCode: item.skuCode,
                    name: item.name,
                    quantity: String(item.quantity),
                    description: item.description ?? ''
                }))
            )
            const handleGetAllProducts = async() => {
                const res = await getAllProduct();
                const data = res.data as IProduct[];
                setAllProducts(data);
            }
            handleGetAllProducts();
        }
    }, [order, open])
    const reset = () => {
        setImageFile(null);
        setErrors({});
        setFormData({ code: '', name: '', productQuantity: null });
        setProducts([]);
    }

    const handleClose = () => {
        onClose()
        reset()
    }

    const handleInputChange = (name: string, value: any) => {
        const validName = name as keyof FormDataOrder; 
        if(validName === 'productQuantity'){
            // Chỉ cho phép nhập số
            const raw = String(value).replace(/[^0-9]/g, '');
            setFormData(prev => ({
                ...prev,
                productQuantity: raw
            }))
            const n = Math.min(Number(raw) || 0, 50); // giới hạn an toàn
            setProducts(prev => {
                const next = [...prev];
                if (n > prev.length) {
                    for (let i = prev.length; i < n; i++) next.push({ skuCode: '', name: '', quantity: '', description: '' });
                } else {
                    next.length = n;
                }
                return next;
            });
        } else {
            setFormData(prev => ({
                ...prev,
                [validName]: value
            }))
        }

        if(errors[name as keyof typeof errors]){
            setErrors(prev => ({ ...prev, [name]: undefined}))
        }
    }

    // Cập nhật 1 ô của 1 dòng sản phẩm. name có dạng: prod_{index}_{field}
    const handleProductFieldChange = (name: string, value: any) => {
        const [, idxStr, field] = name.split('_');
        const index = Number(idxStr);
        setProducts(prev => prev.map((p, i) => (i === index ? { ...p, [field]: value } : p)));
    }

    // Chọn sản phẩm từ InputSelect: value chính là skuCode (duy nhất),
    // tra ngược allProducts để lấy đầy đủ cả name + skuCode. name có dạng: prod_{index}
    const handleProductSelect = (name: string, value: any) => {
        const [, idxStr] = name.split('_');
        const index = Number(idxStr);
        const selected = allProducts.find(p => p.skuCode === value);
        setProducts(prev => prev.map((p, i) => (
            i === index
                ? { ...p, skuCode: value ?? '', name: selected?.name ?? '' }
                : p
        )));
    }

    const validateForm = () : boolean => {
        const newErrors: FormErrors = {};
        if(!formData.code) newErrors.code = 'Vui lòng nhập mã đơn hàng';
        if(!formData.name) newErrors.name = 'Vui lòng nhập tên đơn hàng';
        if(!formData.productQuantity) newErrors.productQuantity = 'Vui lòng nhập số lượng sản phẩm';
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
            const payload: OrderPayload = {
                code: formData.code,
                name: formData.name,
                productQuantity: Number(formData.productQuantity),
                productsOrder: products.map((product) => ({
                    skuCode: product.skuCode,
                    name: product.name,
                    quantity: Number(product.quantity),
                    description: product.description ? product.description : null
                })),
                createdBy: profile ? profile?.id : null
            } 
            const res = await updateOrderWithProduct(order.id, payload);
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
                        name="code"
                        value={formData.code}
                        type="text"
                        onChange={handleInputChange}
                        margin="dense"
                        placeholder="Nội dung...."

                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography sx={{ fontSize: '15px', color: '#fff'}}>Tên đơn hàng</Typography>
                    <InputText
                        label=""
                        name="name"
                        value={formData.name}
                        type="text"
                        onChange={handleInputChange}
                        margin="dense"
                        placeholder="Nội dung...."
                        error={!!errors.name}
                        helperText={errors.name}
                    />
                </Grid>
                <Grid size={{ xs: 12 }}>
                    <Typography sx={{ fontSize: '15px', color: '#fff'}}>Số lượng sản phẩm</Typography>
                    <InputText
                        label=""
                        name="productQuantity"
                        value={formData.productQuantity}
                        type="text"
                        onChange={handleInputChange}
                        margin="dense"
                        placeholder="Nhập số lượng sản phẩm...."
                        error={!!errors.productQuantity}
                        helperText={errors.productQuantity}
                    />
                </Grid>
                {/* ---------------- Danh sách sản phẩm (render động theo số lượng nhập) ---------------- */}
                {products.map((product, index) => (
                    <Grid key={index} size={{ xs: 12 }}>
                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12, md: 4 }}>
                                <Typography sx={{ fontSize: '15px', color: '#fff'}}>Sản phẩm {index + 1}</Typography>
                                <InputSelect
                                    label=""
                                    name={`prod_${index}`}
                                    value={product.skuCode}
                                    onChange={handleProductSelect}
                                    margin='dense'
                                    placeholder="Chọn sản phẩm..."
                                    options={allProducts}
                                    transformOptions={(data) =>
                                        data.map((item) => ({
                                            label: item.name,
                                            value: item.skuCode
                                        }))
                                    }
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
                        Cập nhật
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

export default EditProductionOrder;