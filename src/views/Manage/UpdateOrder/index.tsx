import { useMemo, useState } from "react";

import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import { Check, CheckCircle, RadioButtonUnchecked, SyncOutlined } from "@mui/icons-material";

import avatar1 from "@/assets/images/users/avatar-1.png";
import { C } from "@/constants/colors";
import { useFetchData } from "@/hooks/useFetchData";
import { IExchangeOrder } from "@/types/order";
import { getListExchangeOrdersWithAwaitingPickup } from "@/services/order-service";
import OrderUpdated from "./components/OrderUpdated";

/* ------------------------------------------------------------------ */
/* Palette cục bộ                                                      */
/* ------------------------------------------------------------------ */
const P = {
  card: "#0A0E17",
  border: "rgba(255,255,255,0.10)",
  text: "#FFFFFF",
  textMuted: "#9AA4B2",
  green: "#22C55E",
  dot: "rgba(255,255,255,0.18)",
  dotBorder: "rgba(255,255,255,0.28)",
  track: "rgba(255,255,255,0.14)",
  btnGradient: "linear-gradient(180deg, #4AB4F5 0%, #2F80ED 100%)",
};

/* ------------------------------------------------------------------ */
/* Các bước giao hàng                                                  */
/* ------------------------------------------------------------------ */
const STEPS = [
  "Chờ lấy hàng",
  "Tài xế đến lấy hàng",
  "Tài xế trên đường giao hàng",
  "Tài xế giao hoàn thành",
];

/**
 * Map deliveryStatus (enum của DeliveryOrders) -> số bước đã hoàn thành (0..4).
 * Dễ chỉnh khi nghiệp vụ thay đổi.
 */
const statusToCompletedSteps = (deliveryStatus: string): number => {
  switch (deliveryStatus) {
    case "pending_approval":
    case "manager_approved":
    case "awaiting_pickup":
      return 1;
    case "picked_up":
      return 2;
    case "out_for_delivery":
      return 3;
    case "delivered":
      return 4;
    default:
      // rejected / manager_rejected / delivery_failed / cancelled ...
      return 1;
  }
};

/* ------------------------------------------------------------------ */
/* Stepper ngang (các chấm tròn nối nhau bằng nét đứt)                 */
/* ------------------------------------------------------------------ */
const TopStepper = ({ completed }: { completed: number }) => (
  <Stack direction="row" alignItems="center" sx={{ my: 2 }}>
    {STEPS.map((_, idx) => {
      const isDone = idx < completed;
      return (
        <Stack key={idx} direction="row" alignItems="center" sx={{ flex: idx === STEPS.length - 1 ? "0 0 auto" : 1 }}>
          <Box
            sx={{
              width: 26,
              height: 26,
              borderRadius: "50%",
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: isDone ? P.green : P.dot,
              border: `2px solid ${isDone ? P.green : P.dotBorder}`,
            }}
          >
            {isDone ? (
              <Check sx={{ fontSize: 16, color: "#fff" }} />
            ) : (
              <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: P.dotBorder }} />
            )}
          </Box>
          {idx < STEPS.length - 1 && (
            <Box
              sx={{
                flex: 1,
                mx: 0.5,
                borderBottom: `2px dashed ${idx < completed - 1 ? P.green : P.track}`,
              }}
            />
          )}
        </Stack>
      );
    })}
  </Stack>
);

/* ------------------------------------------------------------------ */
/* Danh sách các bước (checklist)                                      */
/* ------------------------------------------------------------------ */
const StepList = ({ completed }: { completed: number }) => (
  <Stack direction="column" spacing={1.25} sx={{ mb: 2.5 }}>
    {STEPS.map((label, idx) => {
      const isDone = idx < completed;
      return (
        <Stack key={idx} direction="row" alignItems="center" spacing={1.25}>
          {isDone ? (
            <CheckCircle sx={{ fontSize: 20, color: P.green, flexShrink: 0 }} />
          ) : (
            <RadioButtonUnchecked sx={{ fontSize: 20, color: P.textMuted, flexShrink: 0 }} />
          )}
          <Typography
            sx={{
              fontSize: { xs: 13.5, sm: 14 },
              fontWeight: isDone ? 600 : 500,
              color: isDone ? P.text : P.textMuted,
            }}
          >
            {idx + 1}. {label}
          </Typography>
        </Stack>
      );
    })}
  </Stack>
);

/* ------------------------------------------------------------------ */
/* Thẻ 1 đơn giao hàng                                                 */
/* ------------------------------------------------------------------ */
const OrderCard = ({ data, onUpdate }: { data: IExchangeOrder; onUpdate: (data: IExchangeOrder) => void }) => {
  const completed = statusToCompletedSteps(data.deliveryStatus);

  return (
    <Box
      sx={{
        bgcolor: P.card,
        border: `1px solid ${P.border}`,
        borderRadius: 3,
        p: { xs: 2, sm: 2.5 },
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      {/* Header */}
      <Stack direction="row" alignItems="center" spacing={1.5}>
        <Avatar src={avatar1} sx={{ width: 48, height: 48, flexShrink: 0 }} />
        <Box sx={{ minWidth: 0 }}>
          <Typography noWrap sx={{ color: P.text, fontWeight: 700, fontSize: 15 }}>
            {data.deliveryOrderCode}
          </Typography>
          <Typography noWrap sx={{ color: P.text, fontWeight: 700, fontSize: 15 }}>
            {data.order.name}
          </Typography>
        </Box>
      </Stack>

      {/* Stepper ngang */}
      <TopStepper completed={completed} />

      {/* Checklist */}
      <StepList completed={completed} />

      {/* Nút cập nhật — đẩy xuống đáy để các thẻ cao bằng nhau */}
      <Button
        fullWidth
        startIcon={<SyncOutlined />}
        onClick={() => onUpdate(data)}
        sx={{
          mt: "auto",
          textTransform: "none",
          fontWeight: 700,
          borderRadius: 2,
          py: 1.1,
          color: "#fff",
          background: P.btnGradient,
          "&:hover": { background: P.btnGradient, filter: "brightness(1.08)" },
        }}
      >
        Cập nhật đơn hàng
      </Button>
    </Box>
  );
};

/* ================================================================== */
const UpdateOrder = () => {
  const {
    listData,
    fetchData,
    rowsPerPage,
    page
  } = useFetchData<IExchangeOrder>((params) => getListExchangeOrdersWithAwaitingPickup(params), 6)
  const [openUpdateOrder, setOpenUpdateOrder] = useState(false);
  const [exchangeOrder, setExchangeOrder] = useState<IExchangeOrder | null>(null);

  const handleUpdate = (data: IExchangeOrder) => {
    setOpenUpdateOrder(true)
    setExchangeOrder(data);
  };

  return (
    <Box
      sx={{
        bgcolor: C.bg,
        minHeight: '100%',
        p: { xs: 2, sm: 3, md: 4 },
      }}
    >
      <Box
        sx={{
          display: "grid",
          gap: { xs: 2, sm: 2.5 },
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          },
        }}
        >
        {listData.map((order) => (
          <OrderCard key={order.id} data={order} onUpdate={handleUpdate} />
        ))}
      </Box>
      {openUpdateOrder && exchangeOrder && (
        <OrderUpdated
          open={openUpdateOrder}
          exchangeOrder={exchangeOrder}
          onClose={() => { setOpenUpdateOrder(false), fetchData(page, rowsPerPage) }}
        />
      )}
    </Box>

  );
};

export default UpdateOrder;
