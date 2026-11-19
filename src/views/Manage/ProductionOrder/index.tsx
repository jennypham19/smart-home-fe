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
  Tooltip,
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
import { approvedByAppEmployee, getOrders, handleGenerateOrderCode } from '@/services/order-service';
import { useFetchData } from '@/hooks/useFetchData';
import { IOrder } from '@/types/order';
import { getOrderStatusColor, getOrderStatusLabel } from '@/utils/labelEntoVni';
import useWebSocket from '@/hooks/useWebSocket';
import useNotification from '@/hooks/useNotification';
import Backdrop from '@/components/Backdrop';
import { OrderStatus } from '@/constants/status';
import ViewProductionOrder from './components/ViewProductionOrder';
import EditProductionOrder from './components/EditProductionOrder';
import InformationProductionOrder from './components/InformationProductionOrder';

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


const CardActionButton = ({ order, onHandleButton }: { order: IOrder, onHandleButton: (type: string, order: IOrder) => void }) => {
  const base = {
    fullWidth: true as const,
    sx: {
      textTransform: 'none',
      fontWeight: 600,
      borderRadius: 2,
      py: 1,
    },
  };

  if (order.process === 100) {
    return (
      <Button
        onClick={() => onHandleButton('nhap-thong-tin', order)}
        {...base}
        variant="contained"
        sx={{ ...base.sx, color: '#fff' }}
        startIcon={<NearMeOutlined sx={{ fontSize: 18 }} />}
      >
        Nhập thông tin
      </Button>
    );
  }
  if (order.process === 0) {
    return (
      <Button
        onClick={() => onHandleButton('edit', order)}
        {...base}
        variant="contained"
        sx={{
          ...base.sx,
        }}
        startIcon={<EditOutlined sx={{ fontSize: 18 }} />}
      >
        Chỉnh sửa
      </Button>
    );
  }
};

const ProductionCard = ({ order, onHandleButton }: { order: IOrder, onHandleButton: (type: string, order: IOrder) => void }) => (
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
          {order.name}
        </Typography>
      </Box>
      <Typography sx={{ color: C.green, fontWeight: 700, fontSize: 18 }}>
        {order.process}%
      </Typography>
    </Stack>

    {/* Progress */}
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

    {/* Items */}
    <Stack direction='column' spacing={1.25}>
      {order.products.map((item, i) => (
        <Stack key={i} direction="row" alignItems="center" spacing={1.25}>
          {!!item.isChecked ? (
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
              color: item.quantity === 0 ? C.red : C.text,
            }}
          >
            {item.quantity}
          </Box>
        </Stack>
      ))}
    </Stack>

    {/* Buttons */}
    <Stack direction="row" spacing={1.5} sx={{ mt: 'auto', pt: 2 }}>
      <CardActionButton order={order} onHandleButton={onHandleButton}/>
    </Stack>
  </Box>
);

/* ------------------------------------------------------------------ */
/* Nút thao tác trong bảng                                             */
/* ------------------------------------------------------------------ */
const TableActionButton = ({ icon, onHandleOpenButton, toolTip }: { icon: ReactNode, onHandleOpenButton: () => void, toolTip: string }) => (
  <Tooltip title={toolTip}>
    <Box
      onClick={onHandleOpenButton}
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
  </Tooltip>
);

/* ================================================================== */
const ProductionOrder = () => {
  const [activeCardFilter, setActiveCardFilter] = useState('filter');
  const [activeTableFilter, setActiveTableFilter] = useState('filter');
  const [typeProductionOrder, setTypeProductionOrder] = useState<{ open: boolean, type: string | null }>({ open: false, type: null });
  const [orderCode, setOrderCode] = useState<{order_code: string}>({order_code: ''});
  const [orderId, setOrderId] = useState<string>('')
  const notify = useNotification();
  const [order, setOrder] = useState<IOrder | null>(null);

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
    setLoading
  } = useFetchData<IOrder>((params) => getOrders(params), 5);
  
  // Realtime: BE broadcast { event, data } qua ws://<host>/ws (không cần token)
  useWebSocket({
    path: "/ws",
    withToken: false,
    onMessage: (msg) => {
      // BE gửi event 'production_orders:updated' kèm snapshot { data, statusCounts } ở msg.data
      if (msg?.event === "orders:updated" && msg.data) {
        setListData(msg.data.data as IOrder[])
      }
      // event 'connected' và các event khác: bỏ qua
    },
  });

  const handleCreateNewProductionOrder = async () => {
      try {
          const response = await handleGenerateOrderCode();
          const newOrderCode = response.data as any;
          if (!newOrderCode) {
              throw new Error('Không lấy được mã đơn hàng');
          }

          setOrderCode(newOrderCode);

          // Mở form tạo đơn hàng
          setTypeProductionOrder({ open: true, type: 'add' })
      } catch (error) {
          console.error(error);
      }
  };

  const handleOpenTypeProductionOrder = (type: string | null, order: IOrder) => {
    if(type === null) return;
    setOrder(order)
    switch (type) {
      case 'edit':
        setTypeProductionOrder({ open: true, type: 'edit' })
        break;
      case 'view':
        setTypeProductionOrder({ open: true, type: 'view' })
        break; 
      case 'nhap-thong-tin':
        setTypeProductionOrder({ open: true, type: 'nhap-thong-tin'})
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
      case 'nhap-thong-tin':
        setTypeProductionOrder({ open: false, type: 'nhap-thong-tin'})
        break;
    }
  } 

  const handleButton = (type: string, order: IOrder) => {
    setOrder(order);
    switch (type) {
      case 'nhap-thong-tin':
        setTypeProductionOrder({ open: true, type: 'nhap-thong-tin'})
        break;
      case 'edit':
        setTypeProductionOrder({ open: true, type: 'edit' })
        break;
    }
  }

  return (
    <Box sx={{ bgcolor: C.bg, minHeight: '100%', p: { xs: 2, sm: 3, md: 4 } }}>
      {/* Toolbar trên cùng */}
      {loading && <Backdrop open={loading} />}
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
          onClick={handleCreateNewProductionOrder}
        >
          Tạo đơn hàng mới
        </Button>
      </Stack>

      {/* Đơn hàng sản xuất gần đây */}
      <Typography sx={{ color: C.text, fontSize: { xs: 18, md: 20 }, fontWeight: 700, mb: 2 }}>
        Đơn hàng sản xuất gần đây
      </Typography>
      <Grid container spacing={{ xs: 2, md: 3 }} sx={{ mb: 4 }}>
        {listData.slice(0,3).map((order) => (
          <Grid key={order.code} size={{ xs: 12, sm: 6, md: 4 }}>
            <ProductionCard order={order} onHandleButton={handleButton}/>
          </Grid>
        ))}
      </Grid>

      {/* Đơn hàng sản xuất hoàn thành */}
      <Typography sx={{ color: C.text, fontSize: { xs: 18, md: 20 }, fontWeight: 700, mb: 2 }}>
        Đơn hàng sản xuất
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
          {/* <Stack direction="row" spacing={1.5} sx={{ overflowX: 'auto', pb: { xs: 1, md: 0 } }}>
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
          </Stack> */}

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
              {listData.map((row) => (
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
                  <TableCell sx={{ color: C.text, borderColor: C.border }}>{row.productQuantity}</TableCell>
                  <TableCell sx={{ color: C.text, borderColor: C.border }}>{row.process}%</TableCell>
                  <TableCell sx={{ borderColor: C.border }}>
                    <Chip
                      label={getOrderStatusLabel(row.status)}
                      color={getOrderStatusColor(row.status).color}
                      size="small"
                      sx={{
                        fontWeight: 600,
                        borderRadius: 999,
                      }}
                    />
                  </TableCell>
                  <TableCell align="center" sx={{ borderColor: C.border }}>
                    <Stack direction="row" spacing={1} justifyContent="center">
                      <TableActionButton toolTip='Xem chi tiết' onHandleOpenButton={() => handleOpenTypeProductionOrder('view', row)} icon={<VisibilityOutlined fontSize="small" />} />
                      {row.status !== OrderStatus.PRODUCTION_COMPLETED && (
                      <TableActionButton toolTip='Chỉnh sửa' onHandleOpenButton={() => handleOpenTypeProductionOrder('edit', row)} icon={<EditOutlined fontSize="small" />} />
                      )}
                      {row.status !== OrderStatus.PRODUCTION_COMPLETED && (
                        <TableActionButton toolTip='Xóa' onHandleOpenButton={() => handleOpenTypeProductionOrder('delete', row)} icon={<DeleteOutline fontSize="small" />} />
                      )}
                      {(row.status === OrderStatus.PRODUCTION_COMPLETED && !row.isOrderShippingCreated) && (
                        <TableActionButton toolTip='Nhập thông tin' onHandleOpenButton={() => handleOpenTypeProductionOrder('nhap-thong-tin', row)} icon={<NearMeOutlined fontSize='small'/>} />
                      )}
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
                    ? 'Hiển thị 0 của 0 đơn hàng'
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
      {typeProductionOrder.open && typeProductionOrder.type === 'add' && (
        <AddProductionOrder
          open={typeProductionOrder.open}
          onClose={() => {
            handleCloseTypeProductionOrder('add')
            fetchData(page, rowsPerPage)
          }}
          orderCode={orderCode.order_code}
        />
      )}
      {typeProductionOrder.open && typeProductionOrder.type === 'view' && order && (
        <ViewProductionOrder
          open={typeProductionOrder.open}
          onClose={() => handleCloseTypeProductionOrder('view')}
          order={order}
        />
      )}
      {typeProductionOrder.open && typeProductionOrder.type === 'edit' && order && (
        <EditProductionOrder
          open={typeProductionOrder.open}
          onClose={() => handleCloseTypeProductionOrder('edit')}
          order={order}
        />
      )}
      {typeProductionOrder.open && typeProductionOrder.type === 'nhap-thong-tin' && order && (
        <InformationProductionOrder
          open={typeProductionOrder.open}
          onClose={() => handleCloseTypeProductionOrder('nhap-thong-tin')}
          order={order}
        />
      )}
    </Box>
  );
};

export default ProductionOrder;
