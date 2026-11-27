import { C } from "@/constants/colors";
import { IExchangeOrder } from "@/types/order";
import { Avatar, Box, Chip, Divider, Stack, Typography } from "@mui/material";
import { ReactNode } from "react";
import avatar1 from '@/assets/images/users/avatar-1.png';
import DateTime from "@/utils/DateTime";
import { getExchangeOrderStatusColor, getExchangeOrderStatusLabel } from "@/utils/labelEntoVni";

interface CardExchangeOrderProps{
    exchangeOrder: IExchangeOrder;
    children: ReactNode
}

const ItemStack = ({ label, title } : { label: string, title: string | null }) => (
    <Stack direction='row' alignItems='center' spacing={1.25}>
        <Typography sx={{ color: C.textMuted, fontSize: 14, flex: 1, minWidth: 0 }} noWrap>
            {label}
        </Typography>
        <Typography textAlign='end' sx={{ color: C.text, fontSize: 14, flex: 1, minWidth: 0 }} noWrap>
            {title}
        </Typography>
    </Stack>   
)

const CardExchangeOrder = (props: CardExchangeOrderProps) => {
    const { exchangeOrder, children } = props;
    return(
        <Box
            sx={{
            bgcolor: C.surface,
            border: `1px solid ${C.border}`,
            borderRadius: 3,
            p: { xs: 2, md: 2.5 },
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            }}
        >
            <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
                <Avatar src={avatar1} sx={{ width: 48, height: 48 }} />
                <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography noWrap sx={{ color: C.text, fontWeight: 700, fontSize: 16 }}>
                        {exchangeOrder.deliveryOrderCode}
                    </Typography>
                    <Typography noWrap sx={{ color: C.text, fontSize: 15 }}>
                        {exchangeOrder.recipient.fullName}
                    </Typography>
                </Box> 
                <Chip
                    label={getExchangeOrderStatusLabel(exchangeOrder.deliveryStatus)}
                    color={getExchangeOrderStatusColor(exchangeOrder.deliveryStatus).color}
                />              
            </Stack>
            <Divider sx={{ border: `1px solid ${C.border}`}}/>
            <Stack my={2} direction='column' spacing={1.25}>
                <ItemStack label="Từ đơn sản xuất" title={exchangeOrder.order.name}/>
                <ItemStack label="Số sản phẩm" title={`${exchangeOrder.order.productQuantity} loại, ${exchangeOrder.order.products.length} sản phẩm`}/>
                <ItemStack label="Đơn vị vận chuyển" title={exchangeOrder.shippingCarrier ?? 'Không có'}/>
                <ItemStack label="Ngày giao dự kiến" title={DateTime.FormatDate(exchangeOrder.deliveryDate)}/>
                <ItemStack label="Gửi lúc" title={DateTime.Format(exchangeOrder.createdAt)}/>
            </Stack>
            <Divider sx={{ border: `1px solid ${C.border}`}}/>
            <Stack direction="row" spacing={1.5} sx={{ mt: 'auto', pt: 2 }}>
                {children}
            </Stack>
        </Box>
    )
}

export default CardExchangeOrder;