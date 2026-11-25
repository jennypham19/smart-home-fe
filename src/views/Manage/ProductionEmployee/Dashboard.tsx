import { ReactNode, useEffect, useState } from "react";

import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {
  CheckCircleOutline,
  LockOutlined,
  NearMeOutlined,
  ShoppingBagOutlined,
  Visibility,
} from "@mui/icons-material";

import avatar1 from "@/assets/images/users/avatar-1.png";
import { getListOrdersForProductionEmployee } from "@/services/order-service";
import useNotification from "@/hooks/useNotification";
import useWebSocket from "@/hooks/useWebSocket";
import PendingPackaging from "./components/PendingPackaging";
import CompletedOrder from "./components/CompletedOrder";

/* ------------------------------------------------------------------ */
/* Palette                                                             */
/* ------------------------------------------------------------------ */
const C = {
  bg: "#0B1220",
  card: "#0E1726",
  border: "rgba(255,255,255,0.08)",
  text: "#FFFFFF",
  textMuted: "#9AA4B2",
  green: "#22C55E",
  red: "#EF4444",
  blue: "#2F80ED",
  yellow: "#F5C518",
  track: "rgba(255,255,255,0.12)",
  btnGradient: "linear-gradient(180deg, #3BA7F0 0%, #2F80ED 100%)",
};

/* ------------------------------------------------------------------ */
/* Kiểu dữ liệu                                                        */
/* ------------------------------------------------------------------ */
interface OrderItem {
  id: string;
  code: string;
  name: string;
  productQuantity: number;
  process: number;
  status: string;
  products?: any[];
}

type StatusKey = "pending_production" | "in_production" | "production_completed";

interface OrdersData {
  data: Record<StatusKey, OrderItem[]>;
  statusCounts: Record<StatusKey, number>;
}

/* ------------------------------------------------------------------ */
/* Cấu hình 3 cột theo trạng thái                                      */
/* ------------------------------------------------------------------ */
type ColumnConfig = {
  key: StatusKey;
  title: string;
  iconColor: string;
  buttonLabel: string;
  buttonIcon: ReactNode;
};

const columns: ColumnConfig[] = [
  {
    key: "pending_production",
    title: "Đơn đóng hàng",
    iconColor: C.blue,
    buttonLabel: "Đóng đơn",
    buttonIcon: <LockOutlined sx={{ fontSize: 18 }} />,
  },
  {
    key: "in_production",
    title: "Đang đóng hàng",
    iconColor: C.yellow,
    buttonLabel: "Tiếp tục đóng đơn",
    buttonIcon: <CheckCircleOutline sx={{ fontSize: 18 }} />,
  },
  {
    key: "production_completed",
    title: "Đơn hoàn thành",
    iconColor: C.green,
    buttonLabel: "Xem chi tiết",
    buttonIcon: <Visibility sx={{ fontSize: 18 }} />,
  },
];

const pad2 = (n: number) => String(n).padStart(2, "0");

/* ------------------------------------------------------------------ */
/* Thẻ đơn                                                             */
/* ------------------------------------------------------------------ */
const OrderCard = ({ order, column, onHandleOpen }: { order: OrderItem; column: ColumnConfig, onHandleOpen: (key: string, orderId: string) => void }) => (
  <Box
    sx={{
      bgcolor: C.card,
      border: `1px solid ${C.border}`,
      borderRadius: 3,
      p: 2,
      width: '100%'
    }}
  >
    <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 1.5 }}>
      <Avatar src={avatar1} sx={{ width: 44, height: 44 }} />
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography noWrap sx={{ color: C.text, fontWeight: 700, fontSize: 15 }}>
          {order.code}
        </Typography>
        <Typography noWrap sx={{ color: C.text, fontSize: 14 }}>
          {order.name}
        </Typography>
      </Box>
      <Typography sx={{ color: C.green, fontWeight: 700, fontSize: 16 }}>
        {order.process}%
      </Typography>
    </Stack>

    <LinearProgress
      variant="determinate"
      value={Math.min(Math.max(order.process, 0), 100)}
      sx={{
        height: 7,
        borderRadius: 999,
        bgcolor: C.track,
        mb: 2,
        "& .MuiLinearProgress-bar": { bgcolor: C.green, borderRadius: 999 },
      }}
    />

    <Button
      onClick={() => onHandleOpen(column.key, order.id)}
      fullWidth
      startIcon={column.buttonIcon}
      sx={{
        textTransform: "none",
        fontWeight: 600,
        borderRadius: 2,
        py: 1,
        color: "#fff",
        background: C.btnGradient,
        "&:hover": { background: C.btnGradient, filter: "brightness(1.08)" },
      }}
    >
      {column.buttonLabel}
    </Button>
  </Box>
);

/* ------------------------------------------------------------------ */
/* Cột theo trạng thái                                                 */
/* ------------------------------------------------------------------ */
const StatusColumn = ({
  column,
  orders,
  count,
  onHandleOpen
}: {
  column: ColumnConfig;
  orders: OrderItem[];
  count: number;
  onHandleOpen: (key: string, orderId: string) => void;
}) => (
  <Box>
    {/* Header cột */}
    <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
      <Box
        sx={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: column.iconColor,
          color: "#fff",
        }}
      >
        <ShoppingBagOutlined sx={{ fontSize: 22 }} />
        
      </Box>
      <Typography sx={{ color: C.text, fontWeight: 700, fontSize: 18 }}>
        {column.title}
      </Typography>
      <Box
        sx={{
          minWidth: 28,
          height: 28,
          px: 1,
          borderRadius: "50%",
          bgcolor: C.red,
          color: "#fff",
          fontWeight: 700,
          fontSize: 13,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {pad2(count)}
      </Box>
    </Stack>

    {/* Danh sách thẻ */}
    <Stack spacing={2} direction='column'>
      {orders.length === 0 ? (
        <Typography sx={{ color: C.textMuted, fontSize: 14, textAlign: "center", py: 3 }}>
          Không có đơn hàng
        </Typography>
      ) : (
        orders.map((order) => (
          <OrderCard key={order.id} order={order} column={column} onHandleOpen={onHandleOpen} />
        ))
      )}
    </Stack>
  </Box>
);

/* ================================================================== */
const DashboardProductionEmployee = () => {
  const notify = useNotification();
  const [orders, setOrders] = useState<OrdersData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [typeOrder, setTypeOrder] = useState<{ open: boolean, type: string | null, orderId: string | null }>({ open: false, type: null, orderId: null })

  return (
    <Box sx={{ bgcolor: C.bg, minHeight: "100%", p: { xs: 2, sm: 3, md: 4 } }}>
      {loading ? (
        <Stack alignItems="center" justifyContent="center" sx={{ py: 10 }}>
          <CircularProgress sx={{ color: C.blue }} />
        </Stack>
      ) : (
        <Grid container spacing={{ xs: 2, md: 8 }}>
          {columns.map((column) => (
            <Grid key={column.key} size={{ xs: 12, md: 4 }}>
              {/* <StatusColumn
                column={column}
                orders={groups?.[column.key] ?? []}
                count={counts?.[column.key] ?? 0}
                onHandleOpen={handleOpenButton}
              /> */}
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default DashboardProductionEmployee;
