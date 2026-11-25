import Page from "@/components/Page";
import { C } from "@/constants/colors";
import { useFetchData } from "@/hooks/useFetchData";
import { getReceivedOrders, receivedOrderByProEmployee } from "@/services/order-service";
import { IOrder } from "@/types/order";
import { Alert, Box, Button, Stack, Typography } from "@mui/material";
import SearchTextBox from "../components/SearchTextBox";
import Backdrop from "@/components/Backdrop";
import Grid from "@mui/material/Grid2";
import ProductCardReceivedOrder from "./components/ProductCardReceivedOrder";
import CustomPagination from "@/components/Pagination/CustomPagination";
import useNotification from "@/hooks/useNotification";
import useAuth from "@/hooks/useAuth";

// ReceivedOrders - Đơn tiếp nhận
const ReceivedOrders = () => {
    const notify = useNotification();
    const { profile } = useAuth();
    const {
        listData,
        loading,
        error,
        page,
        rowsPerPage,
        fetchData,
        total,
        handlePageChange,
        handleSearch,
        setListData,
        setLoading,
        searchTerm
    } = useFetchData<IOrder>((params) => getReceivedOrders(params), 6);

    const handleReceivedOrder = async(orderId: string) => {
        setLoading(true)
        try {
            const userId = profile && profile.id
            if(!userId) return;
            const res = await receivedOrderByProEmployee(orderId, userId);
            notify({
                message: res.message,
                severity: 'success'
            })
            fetchData(page, rowsPerPage)
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
        <Page title="Đơn tiếp nhận">
            <Box sx={{ bgcolor: C.bg, minHeight: '100%', p: { xs: 2, sm: 3, md: 4 } }}>
                <Box mb={2} display='flex' flexDirection={{ xs: 'column', md: 'row' }} justifyContent={{ xs: 'flex-start', md: 'space-between'}}>
                    <Stack direction='column' mb={{ xs: 2, md: 0 }}>
                        <Typography sx={{ color: C.text, fontSize: { xs: 18, md: 20 }, fontWeight: 700, mb: 2 }}>
                            Đơn hàng tiếp nhận
                        </Typography>
                        <Typography variant="subtitle2" sx={{ color: C.textMuted }}>{total} đơn hàng đang chờ sản xuất</Typography>
                    </Stack>
                    <SearchTextBox
                        initialValue={searchTerm}
                        onSearch={handleSearch}
                    />
                </Box>
                {loading && (
                    <Backdrop open={loading} />
                )}
                {!loading && error && (
                    <Alert severity="error" sx={{ my: 2 }}>{error}</Alert>
                )}
                {!loading && !error && (
                    <>
                        <Grid container spacing={{ xs: 2, md: 3 }}>
                            {listData.map((order) => (
                                <Grid key={order.id} size={{ xs: 12, sm: 6, md: 4 }}>
                                    <ProductCardReceivedOrder
                                        order={order}
                                    >
                                        {!order.assignedTo && (
                                            <Button
                                                onClick={() => handleReceivedOrder(order.id)}
                                                fullWidth
                                                sx={{
                                                    textTransform: 'none',
                                                    fontWeight: 600,
                                                    borderRadius: 2,
                                                    py: 1,                                               
                                                }}
                                            >
                                                Tiếp nhận
                                            </Button>                                            
                                        )}

                                    </ProductCardReceivedOrder>
                                </Grid>
                            ))}
                        </Grid>
                        <Box mt={2} display='flex' justifyContent='center'>
                            <CustomPagination
                                page={page}
                                count={total}
                                rowsPerPage={rowsPerPage}
                                onPageChange={handlePageChange}
                            />
                        </Box>
                    </>
                )}
            </Box>
        </Page>
    )
}

export default ReceivedOrders;