import { useEffect, useState } from "react";

import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import {
  Check,
  CheckCircle,
  CheckCircleOutline,
  PlayArrow,
  ReplyOutlined,
} from "@mui/icons-material";

import DialogComponent from "@/components/DialogComponent";
import { C } from "@/constants/colors";
import { completedOrder, getDetailOrdersWithProducts, sendApprovalOrder, updateProductChecked } from "@/services/order-service";
import { IOrder } from "@/types/order";
import avatar1 from "@/assets/images/users/avatar-1.png";
import useNotification from "@/hooks/useNotification";

/* ------------------------------------------------------------------ */
/* Palette cục bộ                                                      */
/* ------------------------------------------------------------------ */
const P = {
  card: "#0A0E17",
  pill: "rgba(255,255,255,0.04)",
  border: "rgba(255,255,255,0.10)",
  text: "#FFFFFF",
  textMuted: "#9AA4B2",
  green: "#22C55E",
  dot: "rgba(255,255,255,0.22)",
  btnGradient: "linear-gradient(180deg, #4AB4F5 0%, #2F80ED 100%)",
};

interface CompletedOrderProps {
  open: boolean;
  orderId?: string | null;
  /** Nếu truyền sẵn chi tiết đơn thì dùng luôn, không gọi API */
  order?: IOrder | null;
  onClose: () => void;
}

/* ------------------------------------------------------------------ */
/* Vòng tròn trạng thái của sản phẩm                                   */
/* ------------------------------------------------------------------ */
const StatusDot = ({ checked }: { checked: boolean }) => (
  <Box
    sx={{
      width: 24,
      height: 24,
      borderRadius: "50%",
      flexShrink: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      border: `2px solid ${checked ? P.green : P.textMuted}`,
      bgcolor: checked ? P.green : "transparent",
    }}
  >
    {checked && <Check sx={{ fontSize: 15, color: "#fff" }} />}
  </Box>
);

/* ------------------------------------------------------------------ */
/* Connector dạng mũi tên nét đứt                                      */
/* ------------------------------------------------------------------ */
const Connector = () => (
  <Box sx={{ display: "flex", alignItems: "center", color: P.textMuted, flexShrink: 0 }}>
    <Box sx={{ width: 18, borderBottom: "1px dashed currentColor" }} />
    <PlayArrow sx={{ fontSize: 12, ml: "-5px" }} />
  </Box>
);

/* ================================================================== */
const CompletedOrder = (props: CompletedOrderProps) => {
  const { open, orderId, order: orderProp, onClose } = props;
  const notify = useNotification();
  const [order, setOrder] = useState<IOrder | null>(orderProp ?? null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (orderProp) {
      setOrder(orderProp);
      return;
    }
    if (open && orderId) {
      const getDetailOrder = async () => {
        setLoading(true);
        try {
          const res = await getDetailOrdersWithProducts(orderId);
          setOrder(res.data as any as IOrder);
        } finally {
          setLoading(false);
        }
      };
      getDetailOrder();
    } else {
      setOrder(null);
    }
  }, [open, orderId, orderProp]);

  const handleClose = () => onClose();

  const handleSendApproval = async(orderId: string) => {
    setLoading(true);
    try {
      const status = 'pending_approval'
      const res = await sendApprovalOrder(orderId, status);
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
      setLoading(false);
    }
  }

  const products = order?.products ?? [];
  const total = products.length;
  const checked = products.filter((p) => p.isChecked).length;
  const percent =
    typeof order?.process === "number"
      ? order.process
      : total
      ? Math.round((checked / total) * 100)
      : 0;

  return (
    <DialogComponent
      dialogKey={open}
      handleClose={handleClose}
      isActiveHeader={false}
      isActiveFooter={false}
      maxWidth="xs"
      dialogContentHeight="auto"
      sx={{ bgcolor: P.card }}
    >
      {loading || !order ? (
        <Stack alignItems="center" justifyContent="center" sx={{ py: 8 }}>
          <CircularProgress sx={{ color: P.green }} />
        </Stack>
      ) : (
        <Box sx={{ color: P.text }}>
          {/* Header */}
          <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
            <Avatar src={avatar1} sx={{ width: 56, height: 56, flexShrink: 0 }} />
            <Box sx={{ minWidth: 0 }}>
              <Typography noWrap sx={{ fontWeight: 700, fontSize: { xs: 16, sm: 18 } }}>
                {order.code}
              </Typography>
              <Typography noWrap sx={{ fontWeight: 700, fontSize: { xs: 16, sm: 18 } }}>
                {order.name}
              </Typography>
            </Box>
          </Stack>

          {/* Thanh tiến độ */}
          <Stack
            direction="row"
            alignItems="center"
            spacing={1.5}
            sx={{
              bgcolor: P.pill,
              border: `1px solid ${P.border}`,
              borderRadius: 999,
              px: 2,
              py: 1,
              mb: 2,
            }}
          >
            <CheckCircle sx={{ fontSize: 20, color: P.green, flexShrink: 0 }} />
            <Typography sx={{ fontWeight: 600, fontSize: 14, whiteSpace: "nowrap" }}>
              {checked}/{total} SP
            </Typography>

            {/* Chấm trạng thái từng sản phẩm */}
            <Stack
              direction="row"
              spacing={1}
              sx={{ flex: 1, minWidth: 0, overflow: "hidden" }}
              alignItems="center"
            >
              {products.map((p) => (
                <Box
                  key={p.id}
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    flexShrink: 0,
                    bgcolor: p.isChecked ? P.green : P.dot,
                  }}
                />
              ))}
            </Stack>

            <Typography sx={{ fontWeight: 700, fontSize: 14, whiteSpace: "nowrap" }}>
              {Number.isInteger(percent) ? percent : percent.toFixed(1)}%
            </Typography>
          </Stack>

          {/* Danh sách sản phẩm */}
          <Stack direction='column' spacing={1.25} sx={{ maxHeight: 320, overflowY: "auto", pr: 0.5 }}>
            {products.map((p, idx) => (
              <Stack key={p.id} direction="row" alignItems="center" spacing={1.5}>
                <Connector />
                <Box
                  sx={{
                    flexShrink: 0,
                    display: "flex",
                    opacity: 1,
                  }}
                >
                  <StatusDot checked={p.isChecked} />
                </Box>
                <Typography
                  noWrap
                  sx={{
                    flex: 1,
                    minWidth: 0,
                    fontWeight: 600,
                    fontSize: { xs: 14, sm: 15 },
                    color: p.isChecked ? P.text : P.textMuted,
                  }}
                >
                  {idx + 1}. {p.name}
                </Typography>
                <Box
                  sx={{
                    flexShrink: 0,
                    minWidth: 34,
                    textAlign: "center",
                    px: 1,
                    py: 0.5,
                    borderRadius: 1.5,
                    border: `1px solid ${P.border}`,
                    fontWeight: 700,
                    fontSize: 14,
                  }}
                >
                  {p.quantity}
                </Box>
              </Stack>
            ))}
          </Stack>

          {/* Hành động */}
          <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
            {/* <Button
              fullWidth
              startIcon={<CheckCircleOutline />}
              onClick={() => orderId && handleSendApproval(orderId)}
              sx={{
                textTransform: "none",
                fontWeight: 700,
                borderRadius: 2,
                py: 1.1,
                color: "#fff",
                background: P.btnGradient,
                "&:hover": { background: P.btnGradient, filter: "brightness(1.08)" },
              }}
            >
              Gửi duyệt
            </Button> */}
            <Button
              fullWidth
              startIcon={<ReplyOutlined />}
              onClick={handleClose}
              sx={{
                textTransform: "none",
                fontWeight: 700,
                borderRadius: 2,
                py: 1.1,
                color: P.text,
                border: `1px solid ${P.border}`,
                "&:hover": { borderColor: P.textMuted, bgcolor: "rgba(255,255,255,0.04)" },
              }}
            >
              Quay lại
            </Button>
          </Stack>
        </Box>
      )}
    </DialogComponent>
  );
};

export default CompletedOrder;
