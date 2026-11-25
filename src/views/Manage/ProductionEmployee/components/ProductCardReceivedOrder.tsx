import { IOrder } from "@/types/order";
import { Avatar, Box, Chip, Stack, Typography } from "@mui/material";
import { ReactNode } from "react";
import avatar1 from '@/assets/images/users/avatar-1.png';
import { C } from "@/constants/colors";
import { getOrderStatusColor, getOrderStatusLabel } from "@/utils/labelEntoVni";

interface ProductCardReceivedOrderProps{
    order: IOrder,
    children: ReactNode
}

const ProductCardReceivedOrder = (props: ProductCardReceivedOrderProps) => {
    const { order, children } = props;
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
                        {order.code}
                    </Typography>
                    <Typography noWrap sx={{ color: C.text, fontSize: 15 }}>
                        {order.name}
                    </Typography>
                </Box>
                <Chip
                    label={getOrderStatusLabel(order.status)}
                    color={getOrderStatusColor(order.status).color}
                />
            </Stack>
            {/* Items */}
            <Stack direction='column' spacing={1.25}>
                {order.products.map((item, i) => (
                    <Stack key={i} direction='row' alignItems='center' spacing={1.25}>
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
            <Stack direction="row" spacing={1.5} sx={{ mt: 'auto', pt: 2 }}>
                {children}
            </Stack>
        </Box>
    )
}

export default ProductCardReceivedOrder;