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
  FilterList,
  HighlightOff,
  NearMeOutlined,
  QrCodeScannerOutlined,
  Search,
  TaskAltOutlined,
  VisibilityOutlined,
} from '@mui/icons-material';

import avatar1 from '@/assets/images/users/avatar-1.png';
import CustomPagination from '@/components/Pagination/CustomPagination';

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
  { code: 'DH_0001', title: 'Đơn hàng 01', steps: deliverySteps(1) },
  { code: 'DH_0002', title: 'Đơn hàng 02', steps: deliverySteps(1) },
  { code: 'DH_0003', title: 'Đơn hàng 03', steps: deliverySteps(1) },
];

type CompletedOrder = {
  code: string;
  name: string;
  qty: number;
  completion: number;
  success: boolean;
};

const completedOrders: CompletedOrder[] = [
  { code: 'DH_0004', name: 'Đơn hàng 0004', qty: 2, completion: 100, success: false },
  { code: 'DH_0005', name: 'Đơn hàng 0005', qty: 1, completion: 100, success: false },
  { code: 'DH_0008', name: 'Đơn hàng 0008', qty: 2, completion: 100, success: true },
  { code: 'DH_0003', name: 'Đơn hàng 0003', qty: 1, completion: 100, success: true },
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

/* ------------------------------------------------------------------ */
/* Nút thao tác trong bảng                                             */
/* ------------------------------------------------------------------ */
const TableActionButton = ({ icon }: { icon: ReactNode }) => (
  <Box
    component="button"
    sx={{
      width: 34,
      height: 34,
      borderRadius: 2,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: `1px solid ${C.border}`,
      bgcolor: 'transparent',
      color: C.text,
      cursor: 'pointer',
      '&:hover': { bgcolor: 'rgba(255,255,255,0.06)', borderColor: C.textMuted },
    }}
  >
    {icon}
  </Box>
);

/* ================================================================== */
const ExchangeOrder = () => {
  const [activeFilter, setActiveFilter] = useState('filter');
  const [page, setPage] = useState(1);

  const start = (page - 1) * ROWS_PER_PAGE + 1;
  const end = Math.min(page * ROWS_PER_PAGE, TOTAL_COMPLETED);

  return (
    <Box sx={{ bgcolor: C.bg, minHeight: '100%', p: { xs: 2, sm: 3, md: 4 } }}>
      {/* Đơn hàng giao nhận mới tạo */}
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
        <Typography sx={{ color: C.text, fontSize: { xs: 18, md: 20 }, fontWeight: 700 }}>
          Đơn hàng giao nhận mới tạo
        </Typography>
        <Stack direction='row' sx={{ cursor: 'pointer' }} onClick={() => {}}>
            <Typography sx={{ color: '#fff '}}>Xem tất cả</Typography>
            <ArrowForward sx={{ color: '#fff'}}/>
        </Stack>
      </Stack>

      <Grid container spacing={{ xs: 2, md: 3 }} sx={{ mb: 4 }}>
        {deliveryOrders.map((order) => (
          <Grid key={order.code} size={{ xs: 12, sm: 6, md: 4 }}>
            <DeliveryCard order={order} />
          </Grid>
        ))}
      </Grid>

      {/* Đơn hàng giao nhận hoàn thành */}
      <Typography sx={{ color: C.text, fontSize: { xs: 18, md: 20 }, fontWeight: 700, mb: 2 }}>
        Đơn hàng giao nhận hoàn thành
      </Typography>

      <Box
        sx={{
          bgcolor: C.surface,
          border: `1px solid ${C.border}`,
          borderRadius: 3,
          p: { xs: 2, md: 3 },
        }}
      >
        {/* Toolbar bảng */}
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          alignItems={{ xs: 'stretch', md: 'center' }}
          justifyContent="space-between"
          spacing={2}
          sx={{ mb: 2 }}
        >
          <Stack direction="row" spacing={1.5} sx={{ overflowX: 'auto', pb: { xs: 1, md: 0 } }}>
            <FilterChip
              icon={<FilterList sx={{ fontSize: 18 }} />}
              label="Bộ lọc"
              active={activeFilter === 'filter'}
              onClick={() => setActiveFilter('filter')}
            />
            <FilterChip
              icon={<HighlightOff sx={{ fontSize: 18 }} />}
              label="Đơn giao thất bại"
              active={activeFilter === 'failed'}
              onClick={() => setActiveFilter('failed')}
            />
            <FilterChip
              icon={<TaskAltOutlined sx={{ fontSize: 18 }} />}
              label="Đơn giao thành công"
              active={activeFilter === 'success'}
              onClick={() => setActiveFilter('success')}
            />
          </Stack>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              border: `1px solid ${C.border}`,
              borderRadius: 2,
              px: 1.5,
              py: 0.75,
              width: { xs: '100%', md: 280 },
            }}
          >
            <Search sx={{ color: C.textMuted, fontSize: 20 }} />
            <InputBase
              placeholder="Tìm kiếm nội dung..."
              sx={{
                color: C.text,
                fontSize: 14,
                flex: 1,
                '& input::placeholder': { color: C.textMuted, opacity: 1 },
              }}
            />
          </Box>
        </Stack>

        {/* Bảng (cuộn ngang trên màn nhỏ) */}
        <Box sx={{ overflowX: 'auto' }}>
          <Table sx={{ minWidth: 820 }}>
            <TableHead>
              <TableRow>
                {['Chọn', 'Mã đơn', 'Tên đơn hàng', 'Số lượng SP', 'Độ hoàn thiện', 'Trạng thái', 'Thao tác'].map(
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
              {completedOrders.map((row) => (
                <TableRow key={row.code} hover sx={{ '&:hover': { bgcolor: 'rgba(255,255,255,0.03)' } }}>
                  <TableCell sx={{ borderColor: C.border }}>
                    <Checkbox sx={{ color: C.textMuted, '&.Mui-checked': { color: C.cyan } }} />
                  </TableCell>
                  <TableCell sx={{ color: C.text, borderColor: C.border, whiteSpace: 'nowrap' }}>
                    {row.code}
                  </TableCell>
                  <TableCell sx={{ color: C.text, borderColor: C.border, whiteSpace: 'nowrap' }}>
                    {row.name}
                  </TableCell>
                  <TableCell sx={{ color: C.text, borderColor: C.border }}>{row.qty}</TableCell>
                  <TableCell sx={{ color: C.text, borderColor: C.border }}>{row.completion}%</TableCell>
                  <TableCell sx={{ borderColor: C.border }}>
                    <Chip
                      label={row.success ? 'Thành công' : 'Thất bại'}
                      size="small"
                      sx={{
                        bgcolor: row.success ? C.green : C.red,
                        color: '#fff',
                        fontWeight: 600,
                        borderRadius: 999,
                      }}
                    />
                  </TableCell>
                  <TableCell align="center" sx={{ borderColor: C.border }}>
                    <TableActionButton icon={<VisibilityOutlined fontSize="small" />} />
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
            Hiển thị {start} - {end} của {TOTAL_COMPLETED} đơn hàng
          </Typography>
          <CustomPagination
            page={page}
            count={TOTAL_COMPLETED}
            rowsPerPage={ROWS_PER_PAGE}
            onPageChange={(newPage) => setPage(newPage)}
          />
        </Stack>
      </Box>
    </Box>
  );
};

export default ExchangeOrder;
