import { C } from "@/constants/colors";
import { useFetchData } from "@/hooks/useFetchData";
import { approvedExchangeOrderByManager, getListExchangeOrderWithPendingApproval } from "@/services/order-service";
import { IExchangeOrder } from "@/types/order";
import { Backdrop, Box, Button, Stack, Typography } from "@mui/material";
import SectionHeader from "../../components/SectionHeader";
import Grid from "@mui/material/Grid2"
import CardExchangeOrder from "./components/CardExchangeOrder";
import IconButton from "@/components/IconButton/IconButton";
import { Visibility } from "@mui/icons-material";
import useAuth from "@/hooks/useAuth";
import useNotification from "@/hooks/useNotification";

const ExchangeApproval = () => {
    const { profile } = useAuth();
    const notify = useNotification()
    const {
        listData: listExchangeOrdersWithPendingApproval,
        total: totalExchangeOrdersWithPendingApproval,
        loading,
        setLoading,
        fetchData: fetchExchangeOrdersWithPendingApproval,
        rowsPerPage,
        page
    } = useFetchData<IExchangeOrder>((params) => getListExchangeOrderWithPendingApproval(params), 3)
    
    const handleButton = (type: string, exchangeOrderId: string) => {
        if(!exchangeOrderId) return;
        switch (type) {
            case 'gui-duyet':
                handleApprovedByManager(exchangeOrderId)
                break;
        
            default:
                break;
        }
    }

    const handleApprovedByManager = async(orderId: string) => {
        setLoading(true);
        try {
            const status = 'manager_approved'
            const userId = profile && profile.id
            if(!userId) return;
            const payload: { status: string, approvedBy: string} = {
                status: status,
                approvedBy: userId
            }
            const res = await approvedExchangeOrderByManager(orderId, payload)
            notify({
                message: res.message,
                severity: 'success'
            })
            fetchExchangeOrdersWithPendingApproval(page, rowsPerPage)
        } catch (error: any) {
            notify({
                message: error.message,
                severity: 'error'
            }) 
        } finally {
            setLoading(false)
        }
    }
    return(
        <Box
            sx={{
                bgcolor: C.bg,
                minHeight: '100%',
                p: { xs: 2, sm: 3, md: 4 },
            }}
        >
            {loading && <Backdrop open={loading} />}
            <Stack
                direction='column'
                alignItems='stretch'
                mb={3}               
            >
                <Typography sx={{ color: C.text, fontSize: { xs: 18, md: 20 }, fontWeight: 700, mb: 2 }}>Duyệt đơn giao nhận</Typography>
                <Stack direction='row'>
                    <Typography variant="subtitle2" sx={{ color: C.textMuted }}>{totalExchangeOrdersWithPendingApproval} đơn chờ duyệt •</Typography>
                    <Typography variant="subtitle2" sx={{ color: C.textMuted }}>{totalExchangeOrdersWithPendingApproval} đơn đã xử lý</Typography>
                </Stack>
            </Stack>
            {/* Đơn hàng chờ duyệt */}
            <SectionHeader title="Đơn hàng chờ duyệt" onClick={() => {}}/>
            <Grid container spacing={{ xs: 2, md: 3 }} sx={{ mb: 4 }}>
                {listExchangeOrdersWithPendingApproval.slice(0,3).map((order) => (
                    <Grid key={order.deliveryOrderCode} size={{ xs: 12, sm: 6, md: 4 }}>
                        <CardExchangeOrder 
                            exchangeOrder={order}
                        >
                            <Stack direction='row' spacing={1} sx={{ width: '100%' }}>
                                <IconButton
                                    tooltip='Xem chi tiết'
                                    handleFunt={() => {}}
                                    icon={<Visibility sx={{ color: C.text }}/>}
                                    border={`1px solid ${C.border}`}
                                    width={40}
                                    height={40}
                                />
                                <Button
                                    onClick={() => handleButton('gui-duyet', order.id)}
                                    fullWidth
                                    variant="contained"
                                    sx={{
                                        textTransform: 'none',
                                        fontWeight: 600,
                                        borderRadius: 2,
                                        py: 1,
                                        bgcolor: C.cyan,
                                        color: '#fff',
                                        '&:hover': { bgcolor: '#1FA3E0' },
                                        '&.Mui-disabled': { bgcolor: 'rgba(255,255,255,0.12)', color: C.textMuted },
                                    }}
                                >
                                    Duyệt
                                </Button>
                                <Button
                                    onClick={() => handleButton('tư-choi', order.id)}
                                    fullWidth
                                    variant="outlined"
                                    sx={{
                                        textTransform: 'none',
                                        fontWeight: 600,
                                        borderRadius: 2,
                                        py: 1,
                                        color: C.text,
                                        borderColor: C.border,
                                        '&:hover': { borderColor: C.textMuted, bgcolor: 'rgba(255,255,255,0.04)' },
                                    }}
                                >
                                    Từ chối
                                </Button>
                            </Stack>
                        </CardExchangeOrder>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}

export default ExchangeApproval;