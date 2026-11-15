import { ReactNode, useState } from 'react';

import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Chip,
  InputBase,
  LinearProgress,
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
  Add,
  CheckCircle,
  CheckCircleOutline,
  DeleteOutline,
  EditOutlined,
  FilterList,
  HighlightOff,
  NearMeOutlined,
  NoteAddOutlined,
  Search,
  ShoppingBasketOutlined,
  TaskAltOutlined,
  VisibilityOutlined,
} from '@mui/icons-material';

import avatar1 from '@/assets/images/users/avatar-1.png';
import CustomPagination from '@/components/Pagination/CustomPagination';
import AddProductionOrder from './components/AddProductionOrder';

/* ------------------------------------------------------------------ */
/* Palette                                                             */
/* ------------------------------------------------------------------ */
const C = {
  bg: '#0B1220',
  surface: '#111A2E',
  surfaceAlt: '#0E1726',
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
type BtnKind = 'submit' | 'edit';
type BtnStyle = 'primary' | 'outlined' | 'disabled';
type CardButton = { kind: BtnKind; style: BtnStyle };

type ProductionItem = { name: string; qty: number; done: boolean };
type ProductionOrder = {
  code: string;
  title: string;
  percent: number;
  items: ProductionItem[];
  buttons: CardButton[];
};

const productionOrders: ProductionOrder[] = [
  {
    code: 'DH_0001',
    title: 'Đơn hàng 01',
    percent: 100,
    items: [
      { name: 'Camera SE 3', qty: 2, done: true },
      { name: 'Công tắc ATHENA 3', qty: 4, done: true },
      { name: 'Công tắc LETO 1 nút bấm', qty: 1, done: true },
      { name: 'Cảm biến khói', qty: 1, done: true },
      { name: 'Quà tặng: bọc chống xước', qty: 2, done: true },
    ],
    buttons: [
      { kind: 'submit', style: 'primary' },
      { kind: 'edit', style: 'disabled' },
    ],
  },
  {
    code: 'DH_0002',
    title: 'Đơn hàng 02',
    percent: 90,
    items: [
      { name: 'Camera SE 3', qty: 1, done: true },
      { name: 'Công tắc ATHENA 3', qty: 2, done: true },
      { name: 'Công tắc LETO 1 nút bấm', qty: 1, done: false },
    ],
    buttons: [
      { kind: 'submit', style: 'disabled' },
      { kind: 'edit', style: 'outlined' },
    ],
  },
  {
    code: 'DH_0004',
    title: 'Đơn hàng 04',
    percent: 30,
    items: [
      { name: 'Camera SE 3', qty: 2, done: true },
      { name: 'Công tắc ATHENA 3', qty: 0, done: true },
      { name: 'Công tắc LETO 1 nút bấm', qty: 1, done: false },
      { name: 'Cảm biến khói', qty: 1, done: false },
      { name: 'Quà tặng: bọc chống xước', qty: 2, done: false },
    ],
    buttons: [
      { kind: 'edit', style: 'primary' },
      { kind: 'submit', style: 'outlined' },
    ],
  },
];

type CompletedOrder = {
  code: string;
  name: string;
  qty: number;
  completion: number;
  approved: boolean;
};

const completedOrders: CompletedOrder[] = [
  { code: 'DH_0001', name: 'Đơn hàng 0001', qty: 5, completion: 100, approved: true },
  { code: 'DH_0002', name: 'Đơn hàng 0002', qty: 3, completion: 100, approved: false },
  { code: 'DH_0003', name: 'Đơn hàng 0003', qty: 1, completion: 100, approved: true },
  { code: 'DH_0004', name: 'Đơn hàng 0004', qty: 2, completion: 100, approved: false },
  { code: 'DH_0005', name: 'Đơn hàng 0005', qty: 1, completion: 100, approved: true },
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
/* Thẻ đơn sản xuất                                                    */
/* ------------------------------------------------------------------ */
const cardButtonLabel: Record<BtnKind, string> = {
  submit: 'Gửi duyệt',
  edit: 'Chỉnh sửa',
};

const CardActionButton = ({ btn }: { btn: CardButton }) => {
  const icon =
    btn.kind === 'submit' ? (
      <NearMeOutlined sx={{ fontSize: 18 }} />
    ) : (
      <EditOutlined sx={{ fontSize: 18 }} />
    );

  const base = {
    fullWidth: true as const,
    startIcon: icon,
    children: cardButtonLabel[btn.kind],
    sx: {
      textTransform: 'none',
      fontWeight: 600,
      borderRadius: 2,
      py: 1,
    },
  };

  if (btn.style === 'primary') {
    return (
      <Button
        {...base}
        variant="contained"
        sx={{ ...base.sx, bgcolor: C.cyan, color: '#fff', '&:hover': { bgcolor: '#1FA3E0' } }}
      />
    );
  }
  if (btn.style === 'disabled') {
    return (
      <Button
        {...base}
        variant="contained"
        disabled
        sx={{
          ...base.sx,
          '&.Mui-disabled': { bgcolor: 'rgba(255,255,255,0.12)', color: C.textMuted },
        }}
      />
    );
  }
  return (
    <Button
      {...base}
      variant="outlined"
      sx={{
        ...base.sx,
        color: C.text,
        borderColor: C.border,
        '&:hover': { borderColor: C.textMuted, bgcolor: 'rgba(255,255,255,0.04)' },
      }}
    />
  );
};

const ProductionCard = ({ order }: { order: ProductionOrder }) => (
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
      <Typography sx={{ color: C.green, fontWeight: 700, fontSize: 18 }}>
        {order.percent}%
      </Typography>
    </Stack>

    {/* Progress */}
    <LinearProgress
      variant="determinate"
      value={order.percent}
      sx={{
        height: 8,
        borderRadius: 999,
        bgcolor: C.track,
        mb: 2,
        '& .MuiLinearProgress-bar': { bgcolor: C.green, borderRadius: 999 },
      }}
    />

    {/* Items */}
    <Stack direction='column' spacing={1.25}>
      {order.items.map((item, i) => (
        <Stack key={i} direction="row" alignItems="center" spacing={1.25}>
          {item.done ? (
            <CheckCircle sx={{ color: C.green, fontSize: 20 }} />
          ) : (
            <CheckCircleOutline sx={{ color: C.textMuted, fontSize: 20 }} />
          )}
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
              fontSize: 13,
              // Số lượng 0 tô đỏ cảnh báo
              color: item.qty === 0 ? C.red : C.text,
            }}
          >
            {item.qty}
          </Box>
        </Stack>
      ))}
    </Stack>

    {/* Buttons */}
    <Stack direction="row" spacing={1.5} sx={{ mt: 'auto', pt: 2 }}>
      {order.buttons.map((btn, i) => (
        <CardActionButton key={i} btn={btn} />
      ))}
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
const ProductionOrder = () => {
  const [activeCardFilter, setActiveCardFilter] = useState('filter');
  const [activeTableFilter, setActiveTableFilter] = useState('filter');
  const [page, setPage] = useState(1);
  const [typeProductionOrder, setTypeProductionOrder] = useState<{ open: boolean, type: string | null }>({ open: false, type: null })

  const start = (page - 1) * ROWS_PER_PAGE + 1;
  const end = Math.min(page * ROWS_PER_PAGE, TOTAL_COMPLETED);

    const handleOpenTypeProductionOrder = (type: string | null) => {
    if(type === null) return;
    switch (type) {
      case 'add':
        setTypeProductionOrder({ open: true, type: 'add' })
        break;
      case 'edit':
        setTypeProductionOrder({ open: true, type: 'edit' })
        break;
      case 'view':
        setTypeProductionOrder({ open: true, type: 'view' })
        break; 
    }
  } 

  const handleCloseTypeProductionOrder = (type: string | null) => {
    if(type === null) return;
    switch (type) {
      case 'add':
        setTypeProductionOrder({ open: false, type: 'add' })
        break;
      case 'edit':
        setTypeProductionOrder({ open: false, type: 'edit' })
        break;
      case 'view':
        setTypeProductionOrder({ open: false, type: 'view' })
        break; 
    }
  } 

  return (
    <Box sx={{ bgcolor: C.bg, minHeight: '100%', p: { xs: 2, sm: 3, md: 4 } }}>
      {/* Toolbar trên cùng */}
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        alignItems={{ xs: 'stretch', md: 'center' }}
        justifyContent="space-between"
        spacing={2}
        sx={{ mb: 3 }}
      >
        <Stack
          direction="row"
          spacing={1.5}
          sx={{ overflowX: 'auto', pb: { xs: 1, md: 0 } }}
        >
          <FilterChip
            icon={<FilterList sx={{ fontSize: 18 }} />}
            label="Bộ lọc"
            active={activeCardFilter === 'filter'}
            onClick={() => setActiveCardFilter('filter')}
          />
          <FilterChip
            icon={<NoteAddOutlined sx={{ fontSize: 18 }} />}
            label="Đơn hàng mới tạo"
            active={activeCardFilter === 'new'}
            onClick={() => setActiveCardFilter('new')}
          />
          <FilterChip
            icon={<ShoppingBasketOutlined sx={{ fontSize: 18 }} />}
            label="Đơn hàng thành công"
            active={activeCardFilter === 'success'}
            onClick={() => setActiveCardFilter('success')}
          />
          <FilterChip
            icon={<ShoppingBasketOutlined sx={{ fontSize: 18 }} />}
            label="Đơn hàng lỗi"
            active={activeCardFilter === 'error'}
            onClick={() => setActiveCardFilter('error')}
          />
        </Stack>

        <Button
          variant="contained"
          startIcon={<Add />}
          sx={{
            textTransform: 'none',
            fontWeight: 600,
            borderRadius: 2,
            px: 2.5,
            py: 1,
            whiteSpace: 'nowrap',
            bgcolor: C.cyan,
            color: '#fff',
            '&:hover': { bgcolor: '#1FA3E0' },
          }}
          onClick={() => handleOpenTypeProductionOrder('add')}
        >
          Tạo đơn hàng mới
        </Button>
      </Stack>

      {/* Đơn hàng sản xuất gần đây */}
      <Typography sx={{ color: C.text, fontSize: { xs: 18, md: 20 }, fontWeight: 700, mb: 2 }}>
        Đơn hàng sản xuất gần đây
      </Typography>
      <Grid container spacing={{ xs: 2, md: 3 }} sx={{ mb: 4 }}>
        {productionOrders.map((order) => (
          <Grid key={order.code} size={{ xs: 12, sm: 6, md: 4 }}>
            <ProductionCard order={order} />
          </Grid>
        ))}
      </Grid>

      {/* Đơn hàng sản xuất hoàn thành */}
      <Typography sx={{ color: C.text, fontSize: { xs: 18, md: 20 }, fontWeight: 700, mb: 2 }}>
        Đơn hàng sản xuất hoàn thành
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
              active={activeTableFilter === 'filter'}
              onClick={() => setActiveTableFilter('filter')}
            />
            <FilterChip
              icon={<HighlightOff sx={{ fontSize: 18 }} />}
              label="Đơn chưa duyệt"
              active={activeTableFilter === 'pending'}
              onClick={() => setActiveTableFilter('pending')}
            />
            <FilterChip
              icon={<TaskAltOutlined sx={{ fontSize: 18 }} />}
              label="Đơn đã duyệt"
              active={activeTableFilter === 'approved'}
              onClick={() => setActiveTableFilter('approved')}
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
                    <Checkbox
                      sx={{
                        color: C.textMuted,
                        '&.Mui-checked': { color: C.cyan },
                      }}
                    />
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
                      label={row.approved ? 'Đã duyệt' : 'Chưa duyệt'}
                      size="small"
                      sx={{
                        bgcolor: row.approved ? C.green : C.red,
                        color: '#fff',
                        fontWeight: 600,
                        borderRadius: 999,
                      }}
                    />
                  </TableCell>
                  <TableCell align="center" sx={{ borderColor: C.border }}>
                    <Stack direction="row" spacing={1} justifyContent="center">
                      <TableActionButton icon={<VisibilityOutlined fontSize="small" />} />
                      <TableActionButton icon={<EditOutlined fontSize="small" />} />
                      <TableActionButton icon={<DeleteOutline fontSize="small" />} />
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
      {typeProductionOrder.open && typeProductionOrder.type === 'add' && (
        <AddProductionOrder
          open={typeProductionOrder.open}
          onClose={() => handleCloseTypeProductionOrder('add')}
        />
      )}
    </Box>
  );
};

export default ProductionOrder;
