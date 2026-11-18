import { C } from "@/constants/colors";
import useNotification from "@/hooks/useNotification";
import { approvedByManager, getOrdersWithStatusPendingManagerApproval } from "@/services/order-service";
import { IOrder } from "@/types/order";
import { ArrowForward, CheckCircle, CheckCircleOutline, HighlightOff, NearMeOutlined } from "@mui/icons-material";
import { Avatar, Box, Button, LinearProgress, Stack, Typography } from "@mui/material"
import { ReactNode, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import avatar1 from '@/assets/images/users/avatar-1.png';
import Backdrop from "@/components/Backdrop";
import Grid from "@mui/material/Grid2"
import { ROUTE_PATH } from "@/constants/routes";

/* ------------------------------------------------------------------ */
/* Sub-components                                                      */
/* ------------------------------------------------------------------ */
const SectionHeader = ({ title, onNavigate }: { title: string, onNavigate: () => void }) => {
    return (
        <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ mb: 2 }}
        >
            <Typography sx={{ color: C.text, fontSize: { xs: 18, md: 20 }, fontWeight: 700 }}>
            {title}
            </Typography>
            <Stack direction='row' sx={{ cursor: 'pointer' }} onClick={onNavigate}>
                <Typography sx={{ color: '#fff '}}>Xem tất cả</Typography>
                <ArrowForward sx={{ color: '#fff'}}/>
            </Stack>
        </Stack>
    )
};

const CardShell = ({ children }: { children: ReactNode }) => (
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
    {children}
  </Box>
);

const CardHeader = ({
  code,
  title,
  right,
}: {
  code: string;
  title: string;
  right?: ReactNode;
}) => (
  <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
    <Avatar src={avatar1} sx={{ width: 48, height: 48 }} />
    <Box sx={{ flex: 1, minWidth: 0 }}>
      <Typography noWrap sx={{ color: C.text, fontWeight: 700, fontSize: 16 }}>
        {code}
      </Typography>
      <Typography noWrap sx={{ color: C.text, fontSize: 15 }}>
        {title}
      </Typography>
    </Box>
    {right}
  </Stack>
);

const ActionButtons = ({
  primaryLabel,
  secondaryLabel,
  primaryIcon,
  secondaryIcon,
  primaryDisabled = false,
  typePrimary,
  typeSecondary,
  onHandle,
  orderId
}: {
  primaryLabel: string;
  secondaryLabel: string;
  primaryIcon: ReactNode;
  secondaryIcon: ReactNode;
  primaryDisabled?: boolean;
  typePrimary: string;
  typeSecondary: string;
  orderId: string;
  onHandle: (type: string, orderId: string) => void;
}) => (
  <Stack direction="row" spacing={1.5} sx={{ mt: 'auto', pt: 2 }}>
    <Button
      key={typePrimary}
      onClick={() => onHandle(typePrimary, orderId)}
      fullWidth
      variant="contained"
      startIcon={primaryIcon}
      disabled={primaryDisabled}
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
      {primaryLabel}
    </Button>
    <Button
      key={typeSecondary}
      onClick={() => onHandle(typeSecondary, orderId)}
      fullWidth
      variant="outlined"
      startIcon={secondaryIcon}
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
      {secondaryLabel}
    </Button>
  </Stack>
);

// Thẻ đơn hàng sản xuất
const ProductionCard = ({ order, onHandle }: { order: IOrder, onHandle: (type: string, orderId: string) => void; }) => (
  <CardShell>
    <CardHeader
      code={order.code}
      title={order.name}
      right={
        <Typography sx={{ color: C.green, fontWeight: 700, fontSize: 18 }}>
          {order.process}%
        </Typography>
      }
    />

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
              color: C.text,
              fontSize: 13,
            }}
          >
            {item.quantity}
          </Box>
        </Stack>
      ))}
    </Stack>

    <ActionButtons
      orderId={order.id}
      typePrimary='gui-duyet'
      typeSecondary='bao-loi'
      primaryLabel="Duyệt"
      secondaryLabel="Báo lỗi"
      primaryIcon={<CheckCircleOutline sx={{ fontSize: 18 }} />}
      secondaryIcon={<HighlightOff sx={{ fontSize: 18 }} />}
      onHandle={onHandle}
    />
  </CardShell>
);

const DashboardManager= () => {
    const navigate = useNavigate()
    const notify = useNotification();
    const [productionOrders, setProductionOrders] = useState<IOrder[]>([]);
    const [loading, setLoading] = useState(false);
    const [orderId, setOrderId] = useState<string>('')

    const fetchDashboardData = useCallback(async () => {
        setLoading(true)
        try {
        const [
            productionOrderResponse,
            // exchangeOrderResponse
        ] = await Promise.all([
            getOrdersWithStatusPendingManagerApproval(),
            // getAllExchangeOrderWithStatus()
        ]);

        setProductionOrders(productionOrderResponse?.data || []);
        // setExchangeOrders(exchangeOrderResponse?.data || []);

        } catch (error) {
        console.error("Failed to fetch dashboard data:", error);

        notify({
            severity: 'error',
            message: 'Tải dữ liệu dashboard thất bại'
        });
        } finally {
        setLoading(false)
        }
    }, [notify]);

    useEffect(() => {
        fetchDashboardData();
    }, [fetchDashboardData]);

    const onHandlePrimaryButton = (type: string, orderId: string) => {
        console.log("orderId: ", orderId);
        if(!orderId) return;
        switch (type) {
            case 'gui-duyet':
                handleApprovedByManager(orderId)
                break;
        
            default:
                break;
        }
    }

  const handleApprovedByManager = async(orderId: string) => {
        setLoading(true);
        try {
        const status = 'pending_production'
        const res = await approvedByManager(orderId, status)
        notify({
            message: res.message,
            severity: 'success'
        })
        fetchDashboardData()
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
            {/* Đơn hàng sản xuất gần đây */}
            <SectionHeader title="Đơn hàng sản xuất gần đây" onNavigate={() => navigate(`${ROUTE_PATH.MANAGE}/${ROUTE_PATH.MANAGE_PRODUCT_APPROVAL}`)} />
            <Grid container spacing={{ xs: 2, md: 3 }} sx={{ mb: 4 }}>
                {productionOrders.slice(0,3).map((order) => (
                <Grid key={order.code} size={{ xs: 12, sm: 6, md: 4 }}>
                    <ProductionCard order={order} onHandle={onHandlePrimaryButton} />
                </Grid>
                ))}
            </Grid>
        </Box>
    )
}

export default DashboardManager;