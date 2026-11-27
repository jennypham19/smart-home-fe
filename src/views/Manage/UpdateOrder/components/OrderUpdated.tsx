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
  CancelOutlined,
  CheckCircle,
  CheckCircleOutline,
  HighlightOff,
  PlayArrow,
} from "@mui/icons-material";

import DialogComponent from "@/components/DialogComponent";
import { IExchangeOrder } from "@/types/order";
import { updateDeliveryStatusByStep } from "@/services/order-service";
import useNotification from "@/hooks/useNotification";
import avatar1 from "@/assets/images/users/avatar-1.png";

/* ------------------------------------------------------------------ */
/* Palette cục bộ                                                      */
/* ------------------------------------------------------------------ */
const P = {
  card: "#0A0E17",
  pill: "rgba(255,255,255,0.03)",
  border: "rgba(255,255,255,0.10)",
  text: "#FFFFFF",
  textMuted: "#9AA4B2",
  green: "#22C55E",
  red: "#DC2626",
  dot: "rgba(255,255,255,0.22)",
  radio: "rgba(255,255,255,0.28)",
  blue: "#2563EB",
};

/* ------------------------------------------------------------------ */
/* Các bước giao hàng                                                  */
/* ------------------------------------------------------------------ */
const STEPS = [
  "Tạo đơn giao hàng",
  "Tài xế đến lấy hàng",
  "Tài xế trên đường giao hàng",
  "Tài xế giao hoàn thành",
];

/**
 * Suy ra tiến độ từ delivery_status:
 *  - done: số bước đã hoàn thành (xanh)
 *  - failed: bước cuối là thất bại
 *  - final: đơn đã kết thúc (không cho cập nhật tiếp)
 */
const deriveProgress = (
  status?: string
): { done: number; failed: boolean; final: boolean } => {
  switch (status) {
    case "pending_approval":
    case "manager_approved":
    case "awaiting_pickup":
      return { done: 1, failed: false, final: false };
    case "picked_up":
      return { done: 2, failed: false, final: false };
    case "out_for_delivery":
      return { done: 3, failed: false, final: false };
    case "delivered":
      return { done: 4, failed: false, final: true };
    case "delivery_failed":
      return { done: 3, failed: true, final: true };
    default:
      // cancelled / rejected / manager_rejected -> coi như đã kết thúc
      return { done: 1, failed: false, final: true };
  }
};

/* ------------------------------------------------------------------ */
/* Connector mũi tên nét đứt                                           */
/* ------------------------------------------------------------------ */
const Connector = ({ color }: { color: string }) => (
  <Box sx={{ display: "flex", alignItems: "center", flexShrink: 0, color }}>
    <Box sx={{ width: 18, borderBottom: "1.5px dashed currentColor" }} />
    <PlayArrow sx={{ fontSize: 13, ml: "-5px" }} />
  </Box>
);

/* ------------------------------------------------------------------ */
interface OrderUpdatedProps {
  open: boolean;
  onClose: () => void;
  exchangeOrder: IExchangeOrder;
  /** Gọi sau khi cập nhật thành công (để cha refresh danh sách) */
  onUpdated?: (deliveryStatus: string) => void;
}

/* ================================================================== */
const OrderUpdated = (props: OrderUpdatedProps) => {
  const { open, onClose, exchangeOrder, onUpdated } = props;
  const notify = useNotification();

  const [status, setStatus] = useState<string>(exchangeOrder?.deliveryStatus);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setStatus(exchangeOrder?.deliveryStatus);
  }, [exchangeOrder]);

  const handleClose = () => onClose();

  const { done, failed, final } = deriveProgress(status);
  const total = STEPS.length;
  const percent = Math.round((done / total) * 100);

  // Gọi API cập nhật trạng thái; result chỉ truyền ở bước cuối
  const callUpdate = async (result?: "success" | "failed") => {
    if (loading || final) return;
    setLoading(true);
    try {
      const res = await updateDeliveryStatusByStep(exchangeOrder.id, result);
      // BE trả về DeliveryOrder (snake_case: delivery_status)
      const newStatus =
        (res?.data as any)?.delivery_status ??
        (res?.data as any)?.deliveryStatus ??
        status;
      setStatus(newStatus);
      notify({ message: res.message, severity: "success" });
      onUpdated?.(newStatus);
    } catch (error: any) {
      notify({ message: error?.message || "Cập nhật thất bại", severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  // Bước kế tiếp đang chờ tick (bước 2, 3) -> index = done (0-based)
  const nextStepIndex = done; // step tiếp theo
  const canTickNext = !final && !loading && (done === 1 || done === 2);
  const canFinalize = !final && !loading && done === 3;

  return (
    <DialogComponent
      dialogKey={open}
      handleClose={handleClose}
      isActiveFooter={false}
      isActiveHeader={false}
      maxWidth="xs"
      dialogContentHeight="auto"
      sx={{ bgcolor: P.card }}
      PaperProps={{
        sx: {
          bgcolor: P.card,
          borderRadius: 3,
          border: `1px solid ${P.border}`,
          width: "100%",
        },
      }}
    >
      <Box sx={{ color: P.text }}>
        {/* Header */}
        <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
          <Avatar src={avatar1} sx={{ width: 56, height: 56, flexShrink: 0 }} />
          <Box sx={{ minWidth: 0 }}>
            <Typography noWrap sx={{ fontWeight: 700, fontSize: { xs: 15, sm: 16 } }}>
              {exchangeOrder?.deliveryOrderCode}
            </Typography>
            <Typography noWrap sx={{ fontWeight: 700, fontSize: { xs: 17, sm: 19 } }}>
              {exchangeOrder?.order?.name}
            </Typography>
          </Box>
        </Stack>

        {/* Thanh tiến độ */}
        <Stack
          direction="row"
          alignItems="center"
          spacing={1.25}
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
            {done}/{total} bước
          </Typography>

          {/* Chấm trạng thái từng bước */}
          <Stack direction="row" spacing={1} sx={{ flex: 1, minWidth: 0 }} alignItems="center">
            {STEPS.map((_, idx) => {
              const isFailDot = failed && idx === total - 1;
              return (
                <Box
                  key={idx}
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    flexShrink: 0,
                    bgcolor: isFailDot ? P.red : idx < done ? P.green : P.dot,
                  }}
                />
              );
            })}
          </Stack>

          <Typography sx={{ fontWeight: 700, fontSize: 14, whiteSpace: "nowrap" }}>
            {percent}%
          </Typography>
        </Stack>

        {/* Danh sách các bước */}
        <Stack direction="column" spacing={1.25} sx={{ mb: 3 }}>
          {STEPS.map((label, idx) => {
            const isDone = idx < done;
            const isNext = idx === nextStepIndex && canTickNext;
            const isFailStep = failed && idx === total - 1;

            // Nhãn bước cuối thay đổi theo kết quả
            let text = label;
            if (idx === total - 1) {
              if (failed) text = "Tài xế giao thất bại";
              else text = "Tài xế giao hoàn thành";
            }

            const connectorColor = isFailStep
              ? P.red
              : isDone || isNext
              ? P.green
              : P.textMuted;

            return (
              <Stack key={idx} direction="row" alignItems="center" spacing={1.25}>
                <Connector color={connectorColor} />

                {/* Vòng tròn tick */}
                <Box
                  onClick={isNext ? () => callUpdate() : undefined}
                  sx={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: isNext ? "pointer" : "default",
                    border: `2px solid ${
                      isFailStep ? P.red : isDone || isNext ? P.text : P.radio
                    }`,
                    bgcolor:
                      isDone || isNext || isFailStep ? "transparent" : "rgba(255,255,255,0.10)",
                    "&:hover": isNext ? { borderColor: P.green } : undefined,
                  }}
                >
                  {loading && isNext ? (
                    <CircularProgress size={14} sx={{ color: P.text }} />
                  ) : isFailStep ? (
                    <HighlightOff sx={{ fontSize: 16, color: P.red }} />
                  ) : isDone ? (
                    <Box sx={{ width: 9, height: 9, borderRadius: "50%", bgcolor: P.text }} />
                  ) : isNext ? (
                    <Box sx={{ width: 9, height: 9, borderRadius: "50%", bgcolor: P.text }} />
                  ) : null}
                </Box>

                <Typography
                  sx={{
                    flex: 1,
                    minWidth: 0,
                    fontWeight: isDone || isFailStep ? 600 : 500,
                    fontSize: { xs: 14, sm: 15 },
                    color: isFailStep ? P.red : isDone ? P.text : P.textMuted,
                  }}
                >
                  {idx + 1}. {text}
                </Typography>
              </Stack>
            );
          })}
        </Stack>

        {/* Hành động (bước cuối) */}
        <Stack direction="row" spacing={1.5}>
          <Button
            fullWidth
            disabled={!canFinalize}
            startIcon={<CheckCircleOutline />}
            onClick={() => callUpdate("success")}
            sx={{
              textTransform: "none",
              fontWeight: 700,
              borderRadius: 2,
              py: 1.1,
              color: "#fff",
              bgcolor: P.blue,
              "&:hover": { bgcolor: P.blue, filter: "brightness(1.1)" },
              "&.Mui-disabled": { bgcolor: "rgba(37,99,235,0.35)", color: "rgba(255,255,255,0.6)" },
            }}
          >
            Thành công
          </Button>
          <Button
            fullWidth
            disabled={!canFinalize}
            startIcon={<CancelOutlined />}
            onClick={() => callUpdate("failed")}
            sx={{
              textTransform: "none",
              fontWeight: 700,
              borderRadius: 2,
              py: 1.1,
              color: "#fff",
              bgcolor: P.red,
              "&:hover": { bgcolor: P.red, filter: "brightness(1.1)" },
              "&.Mui-disabled": { bgcolor: "rgba(220,38,38,0.35)", color: "rgba(255,255,255,0.6)" },
            }}
          >
            Thất bại
          </Button>
        </Stack>
      </Box>
    </DialogComponent>
  );
};

export default OrderUpdated;
