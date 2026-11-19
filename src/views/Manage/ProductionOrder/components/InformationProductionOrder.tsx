import DialogComponent from "@/components/DialogComponent";
import InputText from "@/components/InputText";
import { C } from "@/constants/colors";
import useAuth from "@/hooks/useAuth";
import useNotification from "@/hooks/useNotification";
import { createOrderShipping } from "@/services/order-service";
import { BodyPayload, DeliveryOrderPayload, IOrder } from "@/types/order";
import { checkPhoneRegext } from "@/utils/common";
import { Add, CheckCircle, CheckCircleOutline, LocalShipping, NewReleases, Person, SettingsBackupRestore, ShoppingBasket } from "@mui/icons-material";
import { Box, Button, InputAdornment, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2"
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";

// Nhập thông tin tài xế và người nhận
interface InformationProductionOrderProps{
    open: boolean,
    onClose: () => void;
    order: IOrder
}

interface FormDataDeliveryOrder{
    deliveryOrderCode: string,
    deliveryDate: Dayjs | null,
    shippingCarrier: string | null,
    shippingFee: any,
}

interface FormDataDeliveryPerson{
    nameDeliveryPerson: string,
    phoneDeliveryPerson: string,
    licensePlate: string,
    addressGetDelivery: string,
}

interface FormDataRecipient{
    nameRecipient: string,
    phoneRecipient: string,
    addressReceivedDelivery: string,
}

type FormErrorsDeliveryOrder = {
    [K in keyof FormDataDeliveryOrder]?: string
}

type FormErrorsDeliveryPerson = {
    [K in keyof FormDataDeliveryPerson]?: string
}

type FormErrorsRecipient= {
    [K in keyof FormDataRecipient]?: string
}

const InformationProductionOrder = (props: InformationProductionOrderProps) => {
    const { open, onClose, order } = props;
    const notify = useNotification();
    const { profile } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);

    // form dữ liệu
    const [formDataDeliveryOrder, setFormDataDeliveryOrder] = useState<FormDataDeliveryOrder>({ deliveryOrderCode: '', deliveryDate: dayjs(), shippingCarrier: null, shippingFee: null })
    const [formDataDeliveryPerson, setFormDataDeliveryPerson] = useState<FormDataDeliveryPerson>({ nameDeliveryPerson: '', phoneDeliveryPerson: '', licensePlate: '', addressGetDelivery: '' })
    const [formDataRecipient, setFormDataRecipient] = useState<FormDataRecipient>({ nameRecipient: '', phoneRecipient: '', addressReceivedDelivery: '' })

    // lỗi
    const [errorsDeliveryOrder, setErrorsDeliveryOrder] = useState<FormErrorsDeliveryOrder>({})
    const [errorsDeliveryPerson, setErrorsDeliveryPerson] = useState<FormErrorsDeliveryPerson>({})
    const [errorsRecipient, setErrorsRecipient] = useState<FormErrorsRecipient>({})

    const reset = () => {
        setFormDataDeliveryOrder({ deliveryOrderCode: '', deliveryDate: dayjs(), shippingCarrier: null, shippingFee: null });
        setFormDataDeliveryPerson({ nameDeliveryPerson: '', phoneDeliveryPerson: '', licensePlate: '', addressGetDelivery: '' });
        setFormDataRecipient({ nameRecipient: '', phoneRecipient: '', addressReceivedDelivery: '' });
        setErrorsDeliveryOrder({});
        setErrorsDeliveryPerson({});
        setErrorsRecipient({})
    }

    const handleClose = () => {
        onClose();
        reset();
    }

    const handleInputChangeDeliveryOrder = (name: string, value: any) => {
        const validName = name as keyof FormDataDeliveryOrder;
        if(validName === 'shippingFee'){
            // Chỉ cho phép nhập số
            const raw = String(value).replace(/[^0-9,.]/g, '');
            setFormDataDeliveryOrder(prev => ({
                ...prev,
                shippingFee: raw
            }))
        }else{
            setFormDataDeliveryOrder(prev => ({
                ...prev,
                [validName]: value
            }))
        }

        if(errorsDeliveryOrder[name as keyof typeof errorsDeliveryOrder]){
            setErrorsDeliveryOrder(prev => ({ ...prev, [name]: undefined}))
        }
    }  

    const handleInputChangeDeliveryPerson = (name: string, value: any) => {
        const validName = name as keyof FormDataDeliveryPerson;
        if(validName === 'phoneDeliveryPerson' && typeof value === 'string'){
            const phoneError = checkPhoneRegext(value);
            setErrorsDeliveryPerson(prev => ({...prev, phoneDeliveryPerson: phoneError }));
            setFormDataDeliveryPerson(prev => ({
                ...prev,
                phoneDeliveryPerson: value
            }))
        }else{
            setFormDataDeliveryPerson(prev => ({
                ...prev,
                [validName]: value
            }))
        }

        if(errorsDeliveryPerson[name as keyof typeof errorsDeliveryPerson]){
            setErrorsDeliveryPerson(prev => ({ ...prev, [name]: undefined}))
        }
    }  

    const handleInputChangeRecipient = (name: string, value: any) => {
        const validName = name as keyof FormDataRecipient;
        if(validName === 'phoneRecipient' && typeof value === 'string'){
            const phoneError = checkPhoneRegext(value);
            setErrorsRecipient(prev => ({...prev, phoneRecipient: phoneError }));
            setFormDataRecipient(prev => ({
                ...prev,
                phoneRecipient: value
            }))
        }else{
            setFormDataRecipient(prev => ({
                ...prev,
                [validName]: value
            }))
        }

        if(errorsDeliveryPerson[name as keyof typeof errorsDeliveryPerson]){
             setErrorsRecipient(prev => ({ ...prev, [name]: undefined}))
        }
         
    }

    const validate = (): boolean => {
        const newErrorsDeliveryOrder: FormErrorsDeliveryOrder = {};
        const newErrorsDeliveryPerson: FormErrorsDeliveryPerson = {};
        const newErrorsRecipient: FormErrorsRecipient = {};

        // bắt lỗi phần thông tin đơn giao
        if(!formDataDeliveryOrder.deliveryOrderCode) newErrorsDeliveryOrder.deliveryOrderCode = "Vui lòng nhập mã đơn giao nhận";
        if(!formDataDeliveryOrder.deliveryDate) newErrorsDeliveryOrder.deliveryDate = "Vui lòng chọn ngày giao dự kiến";
        if(!formDataDeliveryOrder.shippingFee) newErrorsDeliveryOrder.shippingFee = "Vui lòng nhập tiền cước";
        setErrorsDeliveryOrder(newErrorsDeliveryOrder)

        // bắt lỗi phần thông tin người giao
        if(!formDataDeliveryPerson.nameDeliveryPerson) newErrorsDeliveryPerson.nameDeliveryPerson = "Vui lòng nhập tên tài xế";
        if(!formDataDeliveryPerson.phoneDeliveryPerson) newErrorsDeliveryPerson.phoneDeliveryPerson = "Vui lòng nhập số điện thoại";
        if(!formDataDeliveryPerson.licensePlate) newErrorsDeliveryPerson.licensePlate = "Vui lòng nhập biển số xe";
        if(!formDataDeliveryPerson.addressGetDelivery) newErrorsDeliveryPerson.addressGetDelivery = "Vui lòng nhập địa chỉ lấy hàng";
        setErrorsDeliveryPerson(newErrorsDeliveryPerson)

        // bắt lỗi phần thông tin người nhận
        if(!formDataRecipient.nameRecipient) newErrorsRecipient.nameRecipient = "Vui lòng nhập tên người nhận";
        if(!formDataRecipient.phoneRecipient) newErrorsRecipient.phoneRecipient = "Vui lòng nhập số điện thoại người nhận";
        if(!formDataRecipient.addressReceivedDelivery) newErrorsRecipient.addressReceivedDelivery = "Vui lòng nhập địa chỉ nhận hàng";
        setErrorsRecipient(newErrorsRecipient);

        return Object.keys(newErrorsDeliveryOrder).length === 0 && Object.keys(newErrorsDeliveryPerson).length === 0 && Object.keys(newErrorsRecipient).length === 0
    }

    const handleSave = async() => {
        if(!validate()){
            return
        }
        setIsSubmitting(true)
        try {
            const DeliveryOrderData: DeliveryOrderPayload = {
                deliveryOrderCode: formDataDeliveryOrder.deliveryOrderCode,
                deliveryDate: formDataDeliveryOrder.deliveryDate,
                shippingCarrier: formDataDeliveryOrder.shippingCarrier ? formDataDeliveryOrder.shippingCarrier : null,
                shippingFee: formDataDeliveryOrder.shippingFee,
                createdBy: profile ? profile?.id : null,
                orderId: order.id
            }
            const payload: BodyPayload = {
                deliveryOrder: DeliveryOrderData,
                deliveryPerson: formDataDeliveryPerson,
                recipient: formDataRecipient
            }
            const res = await createOrderShipping(payload);
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
            dialogContentHeight={730}
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
                    <Typography variant="h6" sx={{ color: C.text }}>Tạo đơn giao nhận</Typography>
                </Grid>  

                {/* ------------------- Thông tin đơn hàng ---------------- */}
                <Grid size={{ xs: 12 }}>
                    <Stack direction='row' alignItems='center' spacing={1}>
                        <NewReleases sx={{ color: C.text }}/>
                        <Typography  sx={{ color: C.text }}>Thông tin đơn hàng</Typography>
                    </Stack>   
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography sx={{ fontSize: '15px', color: '#fff'}}>Mã đơn hàng</Typography>
                    <InputText
                        label=""
                        name="code"
                        value={order.code}
                        type="text"
                        onChange={() => {}}
                        margin="dense"
                        placeholder="Nội dung...."
                        disabled

                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography sx={{ fontSize: '15px', color: '#fff'}}>Tên đơn hàng</Typography>
                    <InputText
                        label=""
                        name="name"
                        value={order.name}
                        type="text"
                        onChange={() => {}}
                        margin="dense"
                        placeholder="Nội dung...."
                        disabled
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography sx={{ fontSize: '15px', color: '#fff'}}>Mã đơn giao nhận<span style={{ color: C.red }}> *</span></Typography>
                    <InputText
                        label=""
                        name="deliveryOrderCode"
                        value={formDataDeliveryOrder.deliveryOrderCode}
                        type="text"
                        onChange={handleInputChangeDeliveryOrder}
                        margin="dense"
                        placeholder="Nội dung...."
                        error={!!errorsDeliveryOrder.deliveryOrderCode}
                        helperText={errorsDeliveryOrder.deliveryOrderCode}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography sx={{ fontSize: '15px', color: '#fff'}}>Ngày giao dự kiến<span style={{ color: C.red }}> *</span></Typography>
                    <InputText
                        label=""
                        name="deliveryDate"
                        value={formDataDeliveryOrder.deliveryDate}
                        type="date"
                        onChange={handleInputChangeDeliveryOrder}
                        margin="dense"
                        placeholder="Nội dung...."
                        error={!!errorsDeliveryOrder.deliveryDate}
                        helperText={errorsDeliveryOrder.deliveryDate}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography sx={{ fontSize: '15px', color: '#fff'}}>Đơn vị vận chuyển</Typography>
                    <InputText
                        label=""
                        name="shippingCarrier"
                        value={formDataDeliveryOrder.shippingCarrier}
                        type="text"
                        onChange={handleInputChangeDeliveryOrder}
                        margin="dense"
                        placeholder="Nội dung...."
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography sx={{ fontSize: '15px', color: '#fff'}}>Tiền cước<span style={{ color: C.red }}> *</span></Typography>
                    <InputText
                        label=""
                        name="shippingFee"
                        value={formDataDeliveryOrder.shippingFee}
                        type="text"
                        onChange={handleInputChangeDeliveryOrder}
                        margin="dense"
                        placeholder="Nội dung...."
                        endAdornment={<InputAdornment position="end">VNĐ</InputAdornment>}
                        error={!!errorsDeliveryOrder.shippingFee}
                        helperText={errorsDeliveryOrder.shippingFee}
                    />
                </Grid>

                {/* ------------------- Thông tin người giao + Thông tin người nhận ---------------- */}
                {/* ------------------- Thông tin người giao ---------------- */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12 }}>
                            <Stack direction='row' alignItems='center' spacing={1}>
                                <LocalShipping sx={{ color: C.text }}/>
                                <Typography  sx={{ color: C.text }}>Thông tin người giao </Typography>
                            </Stack> 
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <Typography sx={{ fontSize: '15px', color: '#fff'}}>Tên tài xế<span style={{ color: C.red }}> *</span></Typography>
                            <InputText
                                label=""
                                name="nameDeliveryPerson"
                                value={formDataDeliveryPerson.nameDeliveryPerson}
                                type="text"
                                onChange={handleInputChangeDeliveryPerson}
                                margin="dense"
                                placeholder="Nội dung...."
                                error={!!errorsDeliveryPerson.nameDeliveryPerson}
                                helperText={errorsDeliveryPerson.nameDeliveryPerson}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Typography sx={{ fontSize: '15px', color: '#fff'}}>Số điện thoại<span style={{ color: C.red }}> *</span></Typography>
                            <InputText
                                label=""
                                name="phoneDeliveryPerson"
                                value={formDataDeliveryPerson.phoneDeliveryPerson}
                                type="text"
                                onChange={handleInputChangeDeliveryPerson}
                                margin="dense"
                                placeholder="Nội dung...."
                                error={!!errorsDeliveryPerson.phoneDeliveryPerson}
                                helperText={errorsDeliveryPerson.phoneDeliveryPerson}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Typography sx={{ fontSize: '15px', color: '#fff'}}>Biển số xe<span style={{ color: C.red }}> *</span></Typography>
                            <InputText
                                label=""
                                name="licensePlate"
                                value={formDataDeliveryPerson.licensePlate}
                                type="text"
                                onChange={handleInputChangeDeliveryPerson}
                                margin="dense"
                                placeholder="Nội dung...."
                                error={!!errorsDeliveryPerson.licensePlate}
                                helperText={errorsDeliveryPerson.licensePlate}
                            />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <Typography sx={{ fontSize: '15px', color: '#fff'}}>Địa chỉ lấy hàng<span style={{ color: C.red }}> *</span></Typography>
                            <InputText
                                multiline
                                rows={3}
                                label=""
                                name="addressGetDelivery"
                                value={formDataDeliveryPerson.addressGetDelivery}
                                type="text"
                                onChange={handleInputChangeDeliveryPerson}
                                margin="dense"
                                placeholder="Nội dung...."
                                error={!!errorsDeliveryPerson.addressGetDelivery}
                                helperText={errorsDeliveryPerson.addressGetDelivery}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                {/* ------------------- Thông tin người nhận ---------------- */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12 }}>
                            <Stack direction='row' alignItems='center' spacing={1}>
                                <Person sx={{ color: C.text }}/>
                                <Typography  sx={{ color: C.text }}>Thông tin người nhận</Typography>
                            </Stack> 
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Typography sx={{ fontSize: '15px', color: '#fff'}}>Tên người nhận<span style={{ color: C.red }}> *</span></Typography>
                            <InputText
                                label=""
                                name="nameRecipient"
                                value={formDataRecipient.nameRecipient}
                                type="text"
                                onChange={handleInputChangeRecipient}
                                margin="dense"
                                placeholder="Nội dung...."
                                error={!!errorsRecipient.nameRecipient}
                                helperText={errorsRecipient.nameRecipient}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Typography sx={{ fontSize: '15px', color: '#fff'}}>Số điện thoại<span style={{ color: C.red }}> *</span></Typography>
                            <InputText
                                label=""
                                name="phoneRecipient"
                                value={formDataRecipient.phoneRecipient}
                                type="text"
                                onChange={handleInputChangeRecipient}
                                margin="dense"
                                placeholder="Nội dung...."
                                error={!!errorsRecipient.phoneRecipient}
                                helperText={errorsRecipient.phoneRecipient}
                            />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <Typography sx={{ fontSize: '15px', color: '#fff'}}>Địa chỉ nhận hàng<span style={{ color: C.red }}> *</span></Typography>
                            <InputText
                                multiline
                                rows={3}
                                label=""
                                name="addressReceivedDelivery"
                                value={formDataRecipient.addressReceivedDelivery}
                                type="text"
                                onChange={handleInputChangeRecipient}
                                margin="dense"
                                placeholder="Nội dung...."
                                error={!!errorsRecipient.addressReceivedDelivery}
                                helperText={errorsRecipient.addressReceivedDelivery}
                            />
                        </Grid>
                    </Grid>
                </Grid>

                {/* ------------------- Sản phẩm giao hàng ---------------- */}
                <Grid size={{ xs: 12 }}>
                    <Stack direction='row' alignItems='center' spacing={1}>
                        <ShoppingBasket sx={{ color: C.text }}/>
                        <Typography  sx={{ color: C.text }}>Sản phẩm giao hàng</Typography>
                    </Stack>                    
                </Grid>
                <Grid size={{ xs: 12 }}>
                    {/* Items */}
                    <Stack direction='column' spacing={1.25}>
                    {order.products.map((item, i) => (
                        <Stack key={i} direction="row" alignItems="center" spacing={1.25}>
                            <CheckCircle sx={{ color: C.green, fontSize: 20 }} />
                            <Typography sx={{ color: C.text, fontSize: 14, flex: 1, minWidth: 0 }} noWrap>
                                {i + 1}. {item.name}
                            </Typography>
                            <Box
                                sx={{
                                minWidth: 28,
                                textAlign: 'center',
                                border: `1px solid ${C.border}`,
                                borderRadius: 1,
                                px: 0.75,
                                py: 0.25,
                                fontSize: 13,
                                // Số lượng 0 tô đỏ cảnh báo
                                color: item.quantity === 0 ? C.red : C.text,
                                }}
                            >
                                {item.quantity}
                            </Box>
                        </Stack>
                    ))}
                    </Stack>
                </Grid>
                {/* ------------------- Button -------------------- */}
                <Grid size={{ xs: 12 }} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, my: 1.5}}>
                    <Button
                        sx={{
                            bgcolor: C.cyan
                        }}
                        startIcon={<Add/>}
                        onClick={handleSave}
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

export default InformationProductionOrder