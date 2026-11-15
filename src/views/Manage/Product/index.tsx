import { ReactNode, useState } from 'react';

import Page from '@/components/Page';
import {
  Alert,
  Box,
  Button,
  Chip,
  MenuItem,
  Select,
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
  ArrowDownward,
  ArrowUpward,
  DeleteOutline,
  EditOutlined,
  FilterList,
  InsightsOutlined,
  Inventory2Outlined,
  KeyboardArrowDown,
  ShoppingBasketOutlined,
  VisibilityOutlined,
} from '@mui/icons-material';

import CustomPagination from '@/components/Pagination/CustomPagination';
import { C } from '@/constants/colors';
import AddProduct from './components/AddProduct';
import { useFetchData } from '@/hooks/useFetchData';
import { IProduct } from '@/types/product';
import { getProducts } from '@/services/product-service';
import Backdrop from '@/components/Backdrop';
import { getCategoryProductLabel, getOrderStatusLabel, getProductStatusLabel, getStatusProductColor } from '@/utils/labelEntoVni';
import useAuth from '@/hooks/useAuth';
import { ROLE } from '@/constants/roles';

/* ------------------------------------------------------------------ */
/* Dữ liệu mẫu                                                         */
/* ------------------------------------------------------------------ */
type Stat = {
  label: string;
  value: string;
  delta: string;
  up: boolean;
  icon: ReactNode;
};

const stats: Stat[] = [
  { label: 'Tổng sản phẩm', value: '1200', delta: '+10%', up: true, icon: <ShoppingBasketOutlined /> },
  { label: 'Sản phẩm còn lại', value: '1000', delta: '-10%', up: false, icon: <ShoppingBasketOutlined /> },
  { label: 'Sản phẩm hết hàng', value: '200', delta: '+30%', up: true, icon: <Inventory2Outlined /> },
  { label: 'Tương tác tổng', value: '2.110.000', delta: '-10%', up: false, icon: <InsightsOutlined /> },
];

type ProductStatus = 'in_stock' | 'out_of_stock' | 'importing';
type ProductRow = {
  name: string;
  category: string;
  sku: string;
  status: ProductStatus;
  quantity: number;
  interactions: string;
};

const products: ProductRow[] = [
  { name: 'Camera FPT SE3S', category: 'Đồ điện tử', sku: '120849', status: 'in_stock', quantity: 1500, interactions: '12.266' },
  { name: 'Camera FPT SE2S', category: 'Đồ điện tử', sku: '045284', status: 'out_of_stock', quantity: 1000, interactions: '24.326' },
  { name: 'Công tắc 4 nút bấm', category: 'Phụ kiện', sku: '015737', status: 'out_of_stock', quantity: 200, interactions: '12.357' },
  { name: 'Công tắc ATHENA 3 nút', category: 'Phụ kiện', sku: '088462', status: 'importing', quantity: 400, interactions: '53.041' },
  { name: 'Công tắc ATHENA 6 nút', category: 'Phụ kiện', sku: '023568', status: 'in_stock', quantity: 500, interactions: '74.034' },
];

const statusConfig: Record<ProductStatus, { label: string; bg: string; color: string }> = {
  in_stock: { label: 'Còn hàng', bg: C.green, color: '#fff' },
  out_of_stock: { label: 'Hết hàng', bg: C.red, color: '#fff' },
  importing: { label: 'Đang nhập', bg: C.yellow, color: '#1A1A1A' },
};

const TOTAL = 12;
const ROWS_PER_PAGE = 5;

/* ------------------------------------------------------------------ */
/* Sub-components                                                      */
/* ------------------------------------------------------------------ */
const StatCard = ({ stat }: { stat: Stat }) => (
  <Box
    sx={{
      bgcolor: C.card,
      border: `1px solid ${C.border}`,
      borderRadius: 3,
      p: { xs: 2, md: 2.5 },
      height: '100%',
    }}
  >
    <Stack direction="row" alignItems="flex-start" justifyContent="space-between" sx={{ mb: 2 }}>
      <Box
        sx={{
          width: 44,
          height: 44,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: C.text,
          color: C.cyan,
        }}
      >
        {stat.icon}
      </Box>
      <Chip
        size="small"
        icon={
          stat.up ? (
            <ArrowUpward sx={{ fontSize: 14, color: '#fff !important' }} />
          ) : (
            <ArrowDownward sx={{ fontSize: 14, color: '#fff !important' }} />
          )
        }
        label={stat.delta}
        sx={{
          bgcolor: stat.up ? C.green : C.red,
          color: '#fff',
          fontWeight: 700,
          borderRadius: 1.5,
          '& .MuiChip-label': { px: 0.75 },
        }}
      />
    </Stack>
    <Typography sx={{ color: C.textMuted, fontSize: 14, mb: 0.5 }}>{stat.label}</Typography>
    <Typography sx={{ color: C.text, fontSize: { xs: 26, md: 32 }, fontWeight: 700 }}>
      {stat.value}
    </Typography>
  </Box>
);

const FilterSelect = ({
  placeholder,
  value,
  options,
  onChange,
}: {
  placeholder: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) => (
  <Select
    value={value}
    displayEmpty
    onChange={(e) => onChange(e.target.value)}
    IconComponent={KeyboardArrowDown}
    renderValue={(v) => (v ? v : placeholder)}
    sx={{
      minWidth: { xs: '100%', sm: 180 },
      color: value ? C.text : C.textMuted,
      bgcolor: 'transparent',
      borderRadius: 2,
      '& .MuiOutlinedInput-notchedOutline': { borderColor: C.border },
      '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: C.textMuted },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: C.cyan },
      '& .MuiSelect-icon': { color: C.textMuted },
      '& .MuiSelect-select': { py: 1.25 },
    }}
    MenuProps={{
      PaperProps: { sx: { bgcolor: C.surface, color: C.text, border: `1px solid ${C.border}` } },
    }}
  >
    <MenuItem value="">{placeholder}</MenuItem>
    {options.map((opt) => (
      <MenuItem key={opt} value={opt}>
        {opt}
      </MenuItem>
    ))}
  </Select>
);

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
const Product = () => {
  const { profile } = useAuth();
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');
  const [typeProduct, setTypeProduct] = useState<{ open: boolean, type: string | null }>({ open: false, type: null })
  const {
    listData,
    loading,
    error,
    page,
    rowsPerPage,
    fetchData,
    total,
    handlePageChange,
    handleSearch
  } = useFetchData<IProduct>((params) => getProducts(params),5);

  const handleOpenTypeProduct = (type: string | null) => {
    if(type === null) return;
    switch (type) {
      case 'add':
        setTypeProduct({ open: true, type: 'add' })
        break;
      case 'edit':
        setTypeProduct({ open: true, type: 'edit' })
        break;
      case 'view':
        setTypeProduct({ open: true, type: 'view' })
        break; 
    }
  } 

  const handleCloseTypeProduct = (type: string | null) => {
    if(type === null) return;
    switch (type) {
      case 'add':
        setTypeProduct({ open: false, type: 'add' })
        break;
      case 'edit':
        setTypeProduct({ open: false, type: 'edit' })
        break;
      case 'view':
        setTypeProduct({ open: false, type: 'view' })
        break; 
    }
    fetchData(page, rowsPerPage);
  }

  const start = (page - 1) * ROWS_PER_PAGE + 1;
  const end = Math.min(page * ROWS_PER_PAGE, TOTAL);

  return (
    <Page title="Sản phẩm">
      <Box sx={{ bgcolor: C.bg, p: { xs: 2, sm: 3, md: 4 } }}>
        {/* Header */}
        {profile?.role === ROLE.ADMIN && (
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            alignItems={{ xs: 'flex-start', sm: 'center' }}
            justifyContent="space-between"
            spacing={2}
            sx={{ mb: 3 }}
          >
            <Box>
              <Typography sx={{ color: C.text, fontSize: { xs: 22, md: 28 }, fontWeight: 700 }}>
                Quản lý sản phẩm
              </Typography>
              <Typography sx={{ color: C.textMuted, fontSize: 14 }}>
                Quản trị kho hàng và thông số kĩ thuật của hệ thống
              </Typography>
            </Box>
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
                color: C.text,
                '&:hover': { bgcolor: '#1FA3E0' },
              }}
              onClick={() => handleOpenTypeProduct('add')}
            >
              Thêm sản phẩm mới
            </Button>
          </Stack>          
        )}

        {loading && <Backdrop open={loading} />}
        {error && !loading && (
          <Alert severity='error' sx={{ my: 2 }}>{error}</Alert>
        )}
        {!loading && !error && (
          <>
            {/* Thẻ thống kê */}
            {profile?.role === ROLE.ADMIN && (
              <Grid container spacing={{ xs: 2, md: 3 }} sx={{ mb: 3 }}>
                {stats.map((stat) => (
                  <Grid key={stat.label} size={{ xs: 12, sm: 6, md: 3 }}>
                    <StatCard stat={stat} />
                  </Grid>
                ))}
              </Grid>          
            )}

            {/* Bảng */}
            <Box
              sx={{
                bgcolor: C.card,
                border: `1px solid ${C.border}`,
                borderRadius: 3,
                p: { xs: 2, md: 3 },
              }}
            >
              {/* Thanh lọc */}
              <Stack
                direction="row"
                spacing={1.5}
                useFlexGap
                sx={{ mb: 2 }}
              >
                <FilterSelect
                  placeholder="Tất cả danh mục"
                  value={category}
                  onChange={setCategory}
                  options={['Đồ điện tử', 'Phụ kiện']}
                />
                <FilterSelect
                  placeholder="Trạng thái"
                  value={status}
                  onChange={setStatus}
                  options={['Còn hàng', 'Hết hàng', 'Đang nhập']}
                />
              </Stack>

              {/* Bảng (cuộn ngang trên màn nhỏ) */}
              <Box sx={{ overflowX: 'auto' }}>
                <Table sx={{ minWidth: 900 }}>
                  <TableHead>
                    <TableRow sx={{ bgcolor: 'rgba(255,255,255,0.04)' }}>
                      {['Tên sản phẩm', 'Danh mục', 'Thương hiệu', 'Mã SKU', 'Trạng thái', 'Số lượng', 'Thao tác'].map(
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
                    {listData.map((product) => {
                      return (
                        <TableRow key={product.id} hover sx={{ '&:hover': { bgcolor: 'rgba(255,255,255,0.03)' } }}>
                          <TableCell sx={{ color: C.text, borderColor: C.border, whiteSpace: 'nowrap' }}>
                            {product.name}
                          </TableCell>
                          <TableCell sx={{ color: C.text, borderColor: C.border, whiteSpace: 'nowrap' }}>
                            {getCategoryProductLabel(product.category)}
                          </TableCell>
                          <TableCell sx={{ color: C.text, borderColor: C.border, whiteSpace: 'nowrap' }}>
                            {product.brand}
                          </TableCell>
                          <TableCell sx={{ color: C.text, borderColor: C.border }}>{product.skuCode}</TableCell>
                          <TableCell sx={{ borderColor: C.border }}>
                            <Chip
                              label={getProductStatusLabel(product.status)}
                              color={getStatusProductColor(product.status).color}
                              sx={{ fontWeight: 600, borderRadius: 999 }}
                            />
                          </TableCell>
                          <TableCell sx={{ color: C.text, borderColor: C.border }}>{product.amount}</TableCell>
                          <TableCell align="center" sx={{ borderColor: C.border }}>
                            <Stack direction="row" spacing={1} justifyContent="center">
                              <TableActionButton icon={<VisibilityOutlined fontSize="small" />} />
                              <TableActionButton icon={<EditOutlined fontSize="small" />} />
                              <TableActionButton icon={<DeleteOutline fontSize="small" />} />
                            </Stack>
                          </TableCell>
                        </TableRow>
                      );
                    })}
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
                    ? 'Hiển thị 0 của 0 nhân sự'
                    : `Hiển thị ${(page - 1) * rowsPerPage + 1} - ${Math.min(page * rowsPerPage, total)} của ${total} sản phẩm`
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
          </>
        )}



      </Box>
      {typeProduct.open && typeProduct.type === 'add' && (
        <AddProduct
            open={typeProduct.open}
            onClose={() => handleCloseTypeProduct('add')}
        />
      )}
    </Page>
  );
};

export default Product;
