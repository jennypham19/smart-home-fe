import { ReactNode, useState } from 'react';

import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Chip,
  InputBase,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import {
  ArrowForward,
  CheckCircle,
  CheckCircleOutline,
  Edit,
  EditOutlined,
  FilterList,
  HighlightOff,
  NearMeOutlined,
  QrCodeScannerOutlined,
  Search,
  TaskAltOutlined,
  Visibility,
  VisibilityOutlined,
} from '@mui/icons-material';

import avatar1 from '@/assets/images/users/avatar-1.png';
import CustomPagination from '@/components/Pagination/CustomPagination';
import SectionHeader from '../components/SectionHeader';
import { useFetchData } from '@/hooks/useFetchData';
import { IExchangeOrder } from '@/types/order';
import { getListExchangeOrders, getListExchangeOrderWithPendingApproval } from '@/services/order-service';
import ExchangeOrderCard from './components/ExchangeOrderCard';
import { getExchangeOrderStatusColor, getExchangeOrderStatusLabel } from '@/utils/labelEntoVni';
import IconButton from '@/components/IconButton/IconButton';
import SearchTextBox from '../components/SearchTextBox';
import { useDataList } from '@/hooks/useDataList';
import TableActionButton from '../components/TableActionButton';
import { ExchangeOrderStatus } from '@/constants/status';

/* ------------------------------------------------------------------ */
/* Palette                                                             */
/* ------------------------------------------------------------------ */
const C = {
  bg: '#0B1220',
  surface: '#111A2E',
  border: 'rgba(255,255,255,0.08)',
  cyan: '#2FB7F6',
  text: '#FFFFFF',
  textMuted: '#9AA4B2',
  green: '#22C55E',
  red: '#EF4444',
  track: 'rgba(255,255,255,0.12)',
};

/* ------------------------------------------------------------------ */
/* Dữ liệu mẫu                                                         */
/* ------------------------------------------------------------------ */
type DeliveryStep = { name: string; done: boolean };
type DeliveryOrder = { code: string; title: string; steps: DeliveryStep[] };

const deliverySteps = (doneCount: number): DeliveryStep[] =>
  [
    'Tạo đơn giao hàng',
    'Tài xế đến lấy hàng',
    'Tài xế trên đường giao hàng',
    'Tài xế giao thành công',
  ].map((name, i) => ({ name, done: i < doneCount }));

const deliveryOrders: DeliveryOrder[] = [
  // { code: 'DH_0001', title: 'Đơn hàng 01', steps: deliverySteps(1) },
  // { code: 'DH_0002', title: 'Đơn hàng 02', steps: deliverySteps(1) },
  // { code: 'DH_0003', title: 'Đơn hàng 03', steps: deliverySteps(1) },
];

type CompletedOrder = {
  code: string;
  name: string;
  qty: number;
  completion: number;
  success: boolean;
};

const completedOrders: CompletedOrder[] = [
  // { code: 'DH_0004', name: 'Đơn hàng 0004', qty: 2, completion: 100, success: false },
  // { code: 'DH_0005', name: 'Đơn hàng 0005', qty: 1, completion: 100, success: false },
  // { code: 'DH_0008', name: 'Đơn hàng 0008', qty: 2, completion: 100, success: true },
  // { code: 'DH_0003', name: 'Đơn hàng 0003', qty: 1, completion: 100, success: true },
];

const TOTAL_COMPLETED = 12;
const ROWS_PER_PAGE = 5;

/* ------------------------------------------------------------------ */
/* Nút lọc dạng chip                                                   */
/* ------------------------------------------------------------------ */
const FilterChip = ({
  icon,
  label,
  active = false,
  onClick,
}: {
  icon: ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}) => (
  <Button
    onClick={onClick}
    startIcon={icon}
    sx={{
      textTransform: 'none',
      fontWeight: 600,
      fontSize: 14,
      borderRadius: 2,
      px: 2,
      py: 1,
      whiteSpace: 'nowrap',
      color: active ? '#fff' : C.text,
      bgcolor: active ? C.cyan : 'transparent',
      border: `1px solid ${active ? C.cyan : C.border}`,
      '&:hover': {
        bgcolor: active ? '#1FA3E0' : 'rgba(255,255,255,0.04)',
        borderColor: active ? '#1FA3E0' : C.textMuted,
      },
    }}
  >
    {label}
  </Button>
);

/* ------------------------------------------------------------------ */
/* Stepper ngang                                                       */
/* ------------------------------------------------------------------ */
const DeliveryStepper = ({ steps }: { steps: DeliveryStep[] }) => (
  <Stack direction="row" alignItems="center" sx={{ mb: 2 }}>
    {steps.map((step, i) => (
      <Stack
        key={i}
        direction="row"
        alignItems="center"
        sx={{ flex: i === steps.length - 1 ? 0 : 1 }}
      >
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
              borderTop: `2px dashed ${step.done ? C.green : C.border}`,
            }}
          />
        )}
      </Stack>
    ))}
  </Stack>
);

/* ------------------------------------------------------------------ */
/* Thẻ đơn giao nhận                                                   */
/* ------------------------------------------------------------------ */
const DeliveryCard = ({ order }: { order: DeliveryOrder }) => (
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
    {/* Header */}
    <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
      <Avatar src={avatar1} sx={{ width: 48, height: 48 }} />
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography noWrap sx={{ color: C.text, fontWeight: 700, fontSize: 16 }}>
          {order.code}
        </Typography>
        <Typography noWrap sx={{ color: C.text, fontSize: 15 }}>
          {order.title}
        </Typography>
      </Box>
    </Stack>

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

    {/* Buttons */}
    <Stack direction="row" spacing={1.5} sx={{ mt: 'auto', pt: 2 }}>
      <Button
        fullWidth
        variant="contained"
        startIcon={<NearMeOutlined sx={{ fontSize: 18 }} />}
        sx={{
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 2,
          py: 1,
          bgcolor: C.cyan,
          color: '#fff',
          '&:hover': { bgcolor: '#1FA3E0' },
        }}
      >
        Gửi đi
      </Button>
      <Button
        fullWidth
        variant="outlined"
        startIcon={<QrCodeScannerOutlined sx={{ fontSize: 18 }} />}
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
        Kiểm tra
      </Button>
    </Stack>
  </Box>
);


/* ================================================================== */
const ExchangeOrder = () => {
  const {
    listData: exchangeOrderWithPendingApproval
  } = useFetchData<IExchangeOrder>((params) => getListExchangeOrderWithPendingApproval(params), 3)

  const {
    listData: exchangeOrders,
    page,
    loading,
    rowsPerPage,
    setLoading,
    searchTerm,
    handlePageChange,
    handleSearch,
    total
  } = useDataList<IExchangeOrder>((params) => getListExchangeOrders(params), 5)

  return (
    <Box sx={{ bgcolor: C.bg, minHeight: '100%', p: { xs: 2, sm: 3, md: 4 } }}>
      {/* Đơn hàng giao nhận mới tạo */}
      <SectionHeader
        title='Đơn hàng giao nhận mới tạo'
        onClick={() => {}}
      />

      <Grid container spacing={{ xs: 2, md: 3 }} sx={{ mb: 4 }}>
        {exchangeOrderWithPendingApproval.map((order) => (
          <Grid key={order.deliveryOrderCode} size={{ xs: 12, sm: 6, md: 4 }}>
            <ExchangeOrderCard
              exchangeOrder={order}
            >
              <Box display='flex' justifyContent='space-between' alignItems='center' sx={{ width: '100%' }}>
                <Chip
                  label={getExchangeOrderStatusLabel(order.deliveryStatus)}
                  color={getExchangeOrderStatusColor(order.deliveryStatus).color}
                />
                <Stack direction='row' spacing={1}>
                  <IconButton
                    tooltip='Xem chi tiết'
                    handleFunt={() => {}}
                    icon={<Visibility sx={{ color: C.text }}/>}
                    border={`1px solid ${C.border}`}
                    width={32}
                    height={32}
                  />
                  <IconButton
                    tooltip='Chỉnh sửa'
                    handleFunt={() => {}}
                    icon={<Edit sx={{ color: C.text }}/>}
                    border={`1px solid ${C.border}`}
                    width={32}
                    height={32}
                  />
                </Stack>
              </Box>
            </ExchangeOrderCard>
          </Grid>
        ))}
      </Grid>

      {/* Đơn hàng giao nhận hoàn thành */}
      <SectionHeader
        title='Danh sách đơn hàng giao nhận'
        onClick={() => {}}
      />
      <Box
        sx={{
          bgcolor: C.surface,
          border: `1px solid ${C.border}`,
          borderRadius: 3,
          p: { xs: 2, md: 3 },
        }}
      >
        <SearchTextBox
          initialValue={searchTerm}
          onSearch={handleSearch}
          placeholder='Tìm kiếm theo mã đơn giao nhận'
        />

        {/* Bảng (cuộn ngang trên màn nhỏ) */}
        <Box mt={2} sx={{ overflowX: 'auto' }}>
          <Table sx={{ minWidth: 820 }}>
            <TableHead>
              <TableRow>
                {['Mã đơn', 'Tên đơn hàng', 'Số lượng SP', 'Độ hoàn thiện', 'Trạng thái', 'Thao tác'].map(
                  (h) => (
                    <TableCell
                      key={h}
                      align={h === 'Thao tác' ? 'center' : 'left'}
                      sx={{
                        color: C.textMuted,
                        fontWeight: 700,
                        borderColor: C.border,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {h}
                    </TableCell>
                  ),
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {exchangeOrders.map((row) => (
                <TableRow key={row.deliveryOrderCode} hover sx={{ '&:hover': { bgcolor: 'rgba(255,255,255,0.03)' } }}>
                  {/* <TableCell sx={{ borderColor: C.border }}>
                    <Checkbox sx={{ color: C.textMuted, '&.Mui-checked': { color: C.cyan } }} />
                  </TableCell> */}
                  <TableCell sx={{ color: C.text, borderColor: C.border, whiteSpace: 'nowrap' }}>
                    {row.deliveryOrderCode}
                  </TableCell>
                  <TableCell sx={{ color: C.text, borderColor: C.border, whiteSpace: 'nowrap' }}>
                    Đơn giao {row.deliveryOrderName}
                  </TableCell>
                  <TableCell sx={{ color: C.text, borderColor: C.border }}>{row.order.productQuantity}</TableCell>
                  <TableCell sx={{ color: C.text, borderColor: C.border }}>{row.order.process}%</TableCell>
                  <TableCell sx={{ borderColor: C.border }}>
                    <Chip
                      label={getExchangeOrderStatusLabel(row.deliveryStatus)}
                      color={getExchangeOrderStatusColor(row.deliveryStatus).color}
                    />
                  </TableCell>
                  <TableCell align="center" sx={{ borderColor: C.border }}>
                    <Stack direction="row" spacing={1} justifyContent="center">
                      <TableActionButton toolTip='Xem chi tiết' onHandleOpenButton={() => {}} icon={<VisibilityOutlined fontSize="small" />} />
                      {row.deliveryStatus === ExchangeOrderStatus.PENDING_APPROVAL && (<TableActionButton toolTip='Chỉnh sửa' onHandleOpenButton={() => {}} icon={<EditOutlined fontSize="small" />} />)}
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>

        {/* Footer phân trang */}
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
          sx={{ pt: 3 }}
        >
          <Typography sx={{ color: C.textMuted, fontSize: 14 }}>
            {total === 0
              ? 'Hiển thị 0 của  0 đơn hàng'
              : `Hiển thị ${(page - 1) * rowsPerPage + 1} - ${Math.min(page * rowsPerPage, total)} của ${total} đơn hàng`
            }
          </Typography>
          <CustomPagination
            page={page}
            count={total}
            rowsPerPage={rowsPerPage}
            onPageChange={handlePageChange}
          />
        </Stack>
      </Box>
    </Box>
  );
};

export default ExchangeOrder;
