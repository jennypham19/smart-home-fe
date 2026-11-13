import { useState } from 'react';
import type { ReactNode } from 'react';

import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Chip,
  Divider,
  IconButton,
  InputAdornment,
  InputBase,
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
  DeleteOutline,
  EditOutlined,
  FilterList,
  KeyboardArrowDown,
  NorthEast,
  NotificationsNoneOutlined,
  SettingsOutlined,
  Search,
  VisibilityOffOutlined,
  VisibilityOutlined,
  ChevronLeft,
  ChevronRight,
  ArrowForward,
} from '@mui/icons-material';

import avatar1 from '@/assets/images/users/avatar-1.png';
import { COLORS } from '@/constants/colors';
import ListAccounts from './ListAccounts';

/* ------------------------------------------------------------------ */
/* Palette (khớp với giao diện tối trong ảnh)                          */
/* ------------------------------------------------------------------ */
const C = {
  bg: '#0B1220',
  surface: '#111A2E',
  surfaceAlt: '#0E1726',
  border: 'rgba(255,255,255,0.08)',
  cyan: '#33E9FD',
  text: '#FFFFFF',
  textMuted: '#9AA4B2',
  green: '#22C55E',
  red: '#EF4444',
};

/* ------------------------------------------------------------------ */
/* Dữ liệu mẫu                                                         */
/* ------------------------------------------------------------------ */
const recentAccounts = [
  { name: 'Kevil Đặng', role: 'Quản lý cao cấp', email: 'Kevildang@gmail.com' },
  { name: 'Hương Bùi', role: 'Nhân viên nhập đơn', email: 'Huongbui@gmail.com' },
  { name: 'Huy Hoàng', role: 'Nhân viên giao nhận', email: 'Huyhoang@gmail.com' },
];

type Row = {
  name: string;
  position: string;
  active: boolean;
};

const rows: Row[] = [
  { name: 'Kevil Đặng', position: 'Quản lý cao cấp', active: true },
  { name: 'Bùi Hương', position: 'Nhân viên nhập đơn', active: true },
  { name: 'Huy Hoàng', position: 'Nhân viên giao nhận', active: true },
  { name: 'Bắc Hà', position: 'Nhân viên sản xuất', active: false },
  { name: 'Linh Nguyễn', position: 'Nhân viên sản xuất', active: true },
];

/* ================================================================== */
const DashboardAdmin = () => {
  const [accountType, setAccountType] = useState('account');
  const [page, setPage] = useState(1);
  const [openAccount, setOpenAccount] = useState(false);

  const handleOpenAccount = () => {
    setOpenAccount(true)
  }

  const handleCloseAccount = () => {
    setOpenAccount(false)
  }

  return (
    <Box>
      {!openAccount && (
      <Box
        sx={{
          bgcolor: COLORS.PRIMARY,
          color: C.text,
          px: { xs: 2, sm: 3, md: 4 },
          py: { xs: 2, md: 3 },
        }}
      >

        {/* Tài khoản gần đây */}
        <Stack
          direction='row'
          alignItems='center'
          justifyContent='space-between'
          sx={{ mb: 2 }}
        >
          <Typography sx={{ fontSize: { xs: 20, md: 24 }, fontWeight: 700 }}>
            Tài khoản gần đây
          </Typography>
          <Stack direction='row' sx={{ cursor: 'pointer' }} onClick={handleOpenAccount}>
            <Typography sx={{ color: '#fff '}}>Xem tất cả</Typography>
            <ArrowForward/>
          </Stack>
        </Stack>

        <Grid container spacing={{ xs: 2, md: 3 }}>
          {recentAccounts.map((acc) => (
            <Grid key={acc.email} size={{ xs: 12, sm: 6, md: 4 }}>
              <RecentAccountCard {...acc} />
            </Grid>
          ))}
        </Grid>

        {/* -------------------------------------------------------- */}
        {/* Gán quyền cho tài khoản                                  */}
        {/* -------------------------------------------------------- */}
        <Typography sx={{ fontSize: { xs: 20, md: 24 }, fontWeight: 700, mt: { xs: 4, md: 5 }, mb: 2 }}>
          Gán quyền cho tài khoản
        </Typography>

        <Box
          sx={{
            border: `1px solid ${C.border}`,
            borderRadius: 3,
            bgcolor: C.bg,
            overflow: 'hidden',
          }}
        >
          {/* Toolbar */}
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            alignItems={{ xs: 'stretch', md: 'center' }}
            justifyContent='space-between'
            spacing={2}
            sx={{ p: { xs: 2, md: 3 } }}
          >
            <Stack direction='row' spacing={2} alignItems='center' useFlexGap>
              <Button
                startIcon={<FilterList />}
                sx={{
                  width: 150,
                  color: C.text,
                  textTransform: 'none',
                  fontWeight: 600,
                  border: `1px solid ${C.border}`,
                  borderRadius: 2,
                  px: 2,
                  py: 1,
                  '&:hover': { borderColor: C.cyan, bgcolor: 'rgba(51,233,253,0.06)' },
                }}
              >
                Bộ lọc
              </Button>

              <Select
                value={accountType}
                onChange={(e) => setAccountType(e.target.value)}
                IconComponent={KeyboardArrowDown}
                sx={{
                  minWidth: 180,
                  color: C.text,
                  borderRadius: 2,
                  bgcolor: 'transparent',
                  '.MuiOutlinedInput-notchedOutline': { borderColor: C.border },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: C.cyan },
                  '.MuiSvgIcon-root': { color: C.text },
                  '.MuiSelect-select': { py: 1.25 },
                }}
                MenuProps={{
                  PaperProps: { sx: { bgcolor: C.surface, color: C.text } },
                }}
              >
                <MenuItem value='account'>Tài khoản</MenuItem>
                <MenuItem value='role'>Chức vụ</MenuItem>
                <MenuItem value='status'>Trạng thái</MenuItem>
              </Select>
            </Stack>

            <InputBase
              placeholder='Tìm kiếm nội dung...'
              startAdornment={
                <InputAdornment position='start'>
                  <Search sx={{ color: C.textMuted }} />
                </InputAdornment>
              }
              sx={{
                color: C.text,
                border: `1px solid ${C.border}`,
                borderRadius: 2,
                px: 2,
                py: 1,
                width: { xs: '100%', md: 320 },
                '&:hover': { borderColor: C.cyan },
                '& input::placeholder': { color: C.textMuted, opacity: 1 },
              }}
            />
          </Stack>

          {/* Bảng có thể cuộn ngang trên màn hình nhỏ */}
          <Box sx={{ overflowX: 'auto' }}>
            <Table sx={{ minWidth: 820 }}>
              <TableHead>
                <TableRow sx={{ bgcolor: 'rgba(255,255,255,0.04)' }}>
                  {['Chọn', 'Ảnh', 'Tài khoản', 'Chức vụ', 'Trạng thái', 'Thao tác'].map(
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
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    hover
                    sx={{ '&:hover': { bgcolor: 'rgba(255,255,255,0.03)' } }}
                  >
                    <TableCell sx={{ borderColor: C.border }}>
                      <Checkbox
                        sx={{
                          color: C.textMuted,
                          '&.Mui-checked': { color: C.cyan },
                          p: 0.5,
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ borderColor: C.border }}>
                      <Avatar src={avatar1} alt={row.name} sx={{ width: 40, height: 40, borderRadius: '50%' }} />
                    </TableCell>
                    <TableCell sx={{ color: C.text, borderColor: C.border, whiteSpace: 'nowrap' }}>
                      {row.name}
                    </TableCell>
                    <TableCell sx={{ color: C.text, borderColor: C.border, whiteSpace: 'nowrap' }}>
                      {row.position}
                    </TableCell>
                    <TableCell sx={{ borderColor: C.border }}>
                      <Chip
                        label={row.active ? 'Hoạt động' : 'Vô hiệu hóa'}
                        size='small'
                        sx={{
                          bgcolor: row.active ? C.green : C.red,
                          color: '#fff',
                          fontWeight: 600,
                          borderRadius: 999,
                        }}
                      />
                    </TableCell>
                    <TableCell align='center' sx={{ borderColor: C.border }}>
                      <Stack direction='row' spacing={1} justifyContent='center'>
                        <ActionButton>
                          <VisibilityOutlined fontSize='small' />
                        </ActionButton>
                        <ActionButton>
                          <EditOutlined fontSize='small' />
                        </ActionButton>
                        <ActionButton>
                          <DeleteOutline fontSize='small' />
                        </ActionButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>

          <Divider sx={{ borderColor: C.border }} />

          {/* Footer: phân trang */}
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            alignItems='center'
            justifyContent='space-between'
            spacing={2}
            sx={{ p: { xs: 2, md: 3 } }}
          >
            <Typography sx={{ color: C.textMuted, fontSize: 14 }}>
              Hiển thị 1 - 5 của 12 dự án
            </Typography>

            <Stack direction='row' spacing={1} alignItems='center'>
              <PagerButton onClick={() => setPage((p) => Math.max(1, p - 1))}>
                <ChevronLeft fontSize='small' />
              </PagerButton>
              {[1, 2, 3].map((n) => (
                <PagerButton key={n} active={page === n} onClick={() => setPage(n)}>
                  {String(n).padStart(2, '0')}
                </PagerButton>
              ))}
              <PagerButton onClick={() => setPage((p) => Math.min(3, p + 1))}>
                <ChevronRight fontSize='small' />
              </PagerButton>
            </Stack>
          </Stack>
        </Box>
      </Box>     
      )}
      {openAccount && (
        <ListAccounts
          onBack={handleCloseAccount}
        />
      )}
    </Box>

  );
};


/* ================================================================== */
/* Card tài khoản gần đây                                             */
/* ================================================================== */
const RecentAccountCard = ({
  name,
  role,
  email,
}: {
  name: string;
  role: string;
  email: string;
}) => {
  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        p: { xs: 2, md: 2.5 },
        border: `1px solid ${C.border}`,
        borderRadius: 3,
        bgcolor: C.bg,
        transition: 'border-color .2s',
        '&:hover': { borderColor: C.cyan },
      }}
    >
      <Avatar src={avatar1} alt={name} sx={{ width: 76, height: 76, flexShrink: 0, borderRadius: '50%' }} />
      <Box sx={{ minWidth: 0 }}>
        <Typography noWrap sx={{ fontWeight: 700, fontSize: 18 }}>
          {name}
        </Typography>
        <Typography noWrap sx={{ color: C.textMuted, fontSize: 14 }}>
          {role}
        </Typography>
        <Typography noWrap sx={{ color: C.textMuted, fontSize: 14 }}>
          {email}
        </Typography>
      </Box>
    </Box>
  );
};

/* ================================================================== */
/* Nút hành động trong bảng                                           */
/* ================================================================== */
const ActionButton = ({ children }: { children: ReactNode }) => (
  <IconButton
    size='small'
    sx={{
      color: C.text,
      border: `1px solid ${C.border}`,
      borderRadius: 1.5,
      '&:hover': { borderColor: C.cyan, bgcolor: 'rgba(51,233,253,0.08)' },
    }}
  >
    {children}
  </IconButton>
);

/* ================================================================== */
/* Nút phân trang                                                     */
/* ================================================================== */
const PagerButton = ({
  children,
  active,
  onClick,
}: {
  children: ReactNode;
  active?: boolean;
  onClick?: () => void;
}) => (
  <IconButton
    onClick={onClick}
    sx={{
      minWidth: 40,
      height: 40,
      borderRadius: 1.5,
      border: `1px solid ${active ? C.cyan : C.border}`,
      color: active ? C.bg : C.text,
      bgcolor: active ? C.cyan : 'transparent',
      fontSize: 15,
      fontWeight: 700,
      '&:hover': { bgcolor: active ? C.cyan : 'rgba(255,255,255,0.06)' },
    }}
  >
    {children}
  </IconButton>
);

export default DashboardAdmin;
