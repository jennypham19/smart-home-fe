import DialogComponent from "@/components/DialogComponent";
import { C } from "@/constants/colors";
import { IOrder } from "@/types/order";
import { NewReleases } from "@mui/icons-material";
import { Avatar, Box, Button, LinearProgress, Stack, Typography } from "@mui/material";
import avatar1 from '@/assets/images/users/avatar-1.png';


interface ViewProductionOrderProps{
    open: boolean,
    onClose: () => void;
    order: IOrder;
}

const ViewProductionOrder = (props: ViewProductionOrderProps) => {
    const { open, onClose, order } = props;
    return(
        <DialogComponent
            handleClose={onClose}
            dialogKey={open}
            isActiveFooter={false}
            sx={{ bgcolor: C.card }}
            isActiveHeader={false}
            dialogContentHeight={320}
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
            <Box display='flex' flexDirection='column'>
                <Stack direction='row' alignItems='center' spacing={1} mb={2}>
                    <NewReleases sx={{ color: C.text }}/>
                    <Typography variant="h6" sx={{ color: C.text }}>Thông tin chi tiết đơn hàng</Typography>
                </Stack>
                {/* Header */}
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
                    <Typography sx={{ color: C.green, fontWeight: 700, fontSize: 18 }}>
                        {order.process}%
                    </Typography>
                </Stack>

                {/* Progress */}
                <LinearProgress
                variant="determinate"
                value={order.process}
                sx={{
                    height: 8,
                    borderRadius: 999,
                    bgcolor: C.track,
                    mb: 2,
                    '& .MuiLinearProgress-bar': { bgcolor: C.green, borderRadius: 999 },
                }}
                />

                {/* Items */}
                <Stack direction='column' spacing={1.25}>
                {order.products.map((item, i) => (
                    <Stack key={i} direction="row" alignItems="center" spacing={1.25}>
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
                <Box mt={2} display='flex' justifyContent='center'>
                    <Button sx={{ width: 100 }} onClick={onClose}>
                        Quay lại
                    </Button>
                </Box>
            </Box>
        </DialogComponent>
    )
}

export default ViewProductionOrder