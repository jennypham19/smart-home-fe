import { ReactNode, useCallback, useEffect, useState } from 'react';

import {
  Avatar,
  Box,
  Button,
  LinearProgress,
  Stack,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import {
  ArrowForward,
  CheckCircle,
  CheckCircleOutline,
  HighlightOff,
  NearMeOutlined,
  QrCodeScannerOutlined,
} from '@mui/icons-material';

import avatar1 from '@/assets/images/users/avatar-1.png';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '@/constants/routes';
import useNotification from '@/hooks/useNotification';
import { getAllProductionOrderWithStatus, sendApprovalOrderToManager } from '@/services/order-service';
import { IOrder } from '@/types/order';
import Backdrop from '@/components/Backdrop';

/* ------------------------------------------------------------------ */
/* Constant button type                          */
/* ------------------------------------------------------------------ */
const TYPE_BUTTON = {
  GUI_DUYET: 'gui-duyet',
  BAO_LOI: 'bao-loi',
  GUI_DI: 'gui-di',
  KIEM_TRA: 'kiem-tra'
}



/* ------------------------------------------------------------------ */
/* Palette (khớp với giao diện tối trong ảnh)                          */
/* ------------------------------------------------------------------ */
const C = {
  bg: '#0B1220',
  surface: '#111A2E',
  border: 'rgba(255,255,255,0.08)',
  cyan: '#2FB7F6',
  text: '#FFFFFF',
  textMuted: '#9AA4B2',
  green: '#22C55E',
  track: 'rgba(255,255,255,0.12)',
};


type DeliveryStep = { name: string; done: boolean };
type DeliveryOrder = {
  id: string
  code: string;
  title: string;
  steps: DeliveryStep[];
};

const deliverySteps = (doneCount: number): DeliveryStep[] =>
  [
    'Tạo đơn giao hàng',
    'Tài xế đến lấy hàng',
    'Tài xế trên đường giao hàng',
    'Tài xế giao thành công',
  ].map((name, i) => ({ name, done: i < doneCount }));

const deliveryOrders: DeliveryOrder[] = [
  // { id: 'dfsdfdsfdsf', code: 'DH_0001', title: 'Đơn hàng 01', steps: deliverySteps(1) },
  // { id: 'dfsdfsdfdsfdsgfgfg', code: 'DH_0002', title: 'Đơn hàng 02', steps: deliverySteps(1) },
  // { id: 'dfsdrerewerfdsfdsf', code: 'DH_0003', title: 'Đơn hàng 03', steps: deliverySteps(1) },
];

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
      primaryLabel="Gửi duyệt"
      secondaryLabel="Báo lỗi"
      primaryIcon={<NearMeOutlined sx={{ fontSize: 18 }} />}
      secondaryIcon={<HighlightOff sx={{ fontSize: 18 }} />}
      onHandle={onHandle}
    />
  </CardShell>
);

const DeliveryStepper = ({ steps }: { steps: DeliveryStep[] }) => (
  <Stack direction="row" alignItems="center" sx={{ mb: 2 }}>
    {steps.map((step, i) => (
      <Stack key={i} direction="row" alignItems="center" sx={{ flex: i === steps.length - 1 ? 0 : 1 }}>
        <Box
          sx={{
            width: 24,
            height: 24,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: step.done ? C.green : C.track,
            flexShrink: 0,
          }}
        >
          <CheckCircle sx={{ color: '#fff', fontSize: 16 }} />
        </Box>
        {i !== steps.length - 1 && (
          <Box
            sx={{
              flex: 1,
              mx: 0.5,
              borderTop: `2px dashed ${C.border}`,
            }}
          />
        )}
      </Stack>
    ))}
  </Stack>
);

// Thẻ đơn hàng giao nhận
const DeliveryCard = ({ order, onHandle }: { order: DeliveryOrder, onHandle: (type: string, orderId: string) => void; }) => (
  <CardShell>
    <CardHeader code={order.code} title={order.title} />

    <DeliveryStepper steps={order.steps} />

    <Stack direction='column' spacing={1.25}>
      {order.steps.map((step, i) => (
        <Stack key={i} direction="row" alignItems="center" spacing={1.25}>
          {step.done ? (
            <CheckCircle sx={{ color: C.green, fontSize: 20 }} />
          ) : (
            <CheckCircleOutline sx={{ color: C.textMuted, fontSize: 20 }} />
          )}
          <Typography sx={{ color: C.text, fontSize: 14 }}>
            {i + 1}. {step.name}
          </Typography>
        </Stack>
      ))}
    </Stack>

    <ActionButtons
      orderId={order.id}
      typePrimary='gui-di'
      typeSecondary='kiem-tra'
      primaryLabel="Gửi đi"
      secondaryLabel="Kiểm tra"
      primaryIcon={<NearMeOutlined sx={{ fontSize: 18 }} />}
      secondaryIcon={<QrCodeScannerOutlined sx={{ fontSize: 18 }} />}
      onHandle={onHandle}
    />
  </CardShell>
);

/* ================================================================== */
const DashboardApplicationEmployee = () => {
  const navigate = useNavigate()
  const notify = useNotification();
  const [productionOrders, setProductionOrders] = useState<IOrder[]>([])
  const [orderId, setOrderId] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = useCallback(async () => {
    setLoading(true)
    try {
      const [
        productionOrderResponse,
        // exchangeOrderResponse
      ] = await Promise.all([
        getAllProductionOrderWithStatus(),
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
    console.log("type: ", type);
    if(!orderId) return;
    setOrderId(orderId);
    console.log("orderId: ", orderId);
    switch (type) {
      case TYPE_BUTTON.GUI_DUYET:
        
        break;
      case TYPE_BUTTON.BAO_LOI:
        // Xử lý báo lỗi
        break;

      case TYPE_BUTTON.GUI_DI:
        // Xử lý gửi đi
        break;

      case TYPE_BUTTON.KIEM_TRA:
        // Xử lý kiểm tra
        break;
    }
  }


  // Phần xử lý và gọi api của các button
  const sendProductionOrderAprrovalToManager = async() => {
    setLoading(true);
    try {
      const status = 'production_completed'
      const res = await sendApprovalOrderToManager(orderId, status);
      notify({
        message: res.message,
        severity: 'success'
      })
      // handleClose()
    } catch (error: any) {
      notify({
        message: error.message,
        severity: 'error'
      })
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box
      sx={{
        bgcolor: C.bg,
        minHeight: '100%',
        p: { xs: 2, sm: 3, md: 4 },
      }}
    >
      {loading && <Backdrop open={loading} />}
      {/* Đơn hàng sản xuất gần đây */}
      <SectionHeader title="Đơn hàng sản xuất gần đây" onNavigate={() => navigate(`${ROUTE_PATH.MANAGE}/${ROUTE_PATH.MANAGE_PRODUCTION_ORDER}`)} />
      <Grid container spacing={{ xs: 2, md: 3 }} sx={{ mb: 4 }}>
        {productionOrders.slice(0,3).map((order) => (
          <Grid key={order.code} size={{ xs: 12, sm: 6, md: 4 }}>
            <ProductionCard order={order} onHandle={onHandlePrimaryButton} />
          </Grid>
        ))}
      </Grid>

      {/* Đơn hàng giao nhận gần đây */}
      <SectionHeader title="Đơn hàng giao nhận gần đây" onNavigate={() => navigate(`${ROUTE_PATH.MANAGE}/${ROUTE_PATH.MANAGE_EXCHANGE_ORDER}`)} />
      <Grid container spacing={{ xs: 2, md: 3 }}>
        {deliveryOrders.map((order) => (
          <Grid key={order.code} size={{ xs: 12, sm: 6, md: 4 }}>
            <DeliveryCard order={order} onHandle={onHandlePrimaryButton}/>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DashboardApplicationEmployee;
