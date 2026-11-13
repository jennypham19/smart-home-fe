import { useState } from 'react';

import { Avatar, Box, Button, IconButton, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import {
  Add,
  ArrowBack,
  BorderColorOutlined,
  LanguageOutlined,
  VisibilityOffOutlined,
  VisibilityOutlined,
} from '@mui/icons-material';

import avatar1 from '@/assets/images/users/avatar-1.png';
import { COLORS } from '@/constants/colors';
import AddAccount from './components/AddAccount';

/* ------------------------------------------------------------------ */
/* Palette (khớp giao diện tối trong ảnh)                              */
/* ------------------------------------------------------------------ */
const C = {
  bg: '#0B1220',
  card: '#0A0E17',
  border: 'rgba(255,255,255,0.08)',
  cyan: '#33E9FD',
  blue: '#2E8BF6',
  text: '#FFFFFF',
  textMuted: '#9AA4B2',
  disabled: '#2A3140',
};

/* ------------------------------------------------------------------ */
/* Dữ liệu mẫu                                                         */
/* ------------------------------------------------------------------ */
interface Account {
  id: number;
  name: string;
  role: string;
  email: string;
  canAssign: boolean;
}

const accounts: Account[] = [
  { id: 1, name: 'Kevil Đặng', role: 'Quản lý cao cấp', email: 'Kevildang@gmail.com', canAssign: true },
  { id: 2, name: 'Hương Bùi', role: 'Nhân viên nhập đơn', email: 'Huongbui@gmail.com', canAssign: true },
  { id: 3, name: 'Huy Hoàng', role: 'Nhân viên giao nhận', email: 'Huyhoang@gmail.com', canAssign: false },
  { id: 4, name: 'Kevil Đặng', role: 'Quản lý cao cấp', email: 'Kevildang@gmail.com', canAssign: true },
  { id: 5, name: 'Hương Bùi', role: 'Nhân viên nhập đơn', email: 'Huongbui@gmail.com', canAssign: false },
  { id: 6, name: 'Huy Hoàng', role: 'Nhân viên giao nhận', email: 'Huyhoang@gmail.com', canAssign: false },
];

/* ================================================================== */
interface AddAccountProps {
  onBack: () => void;
}

const ListAccounts = (props: AddAccountProps) => {
  const { onBack } = props;
  const [typeAccount, setTypeAccount] = useState<{type: string | null, open: boolean}>({ type: null, open: false });
  const handleOpenTypeAccount = (type: string | null) => {
    if(type === null) return;
    switch (type) {
      case 'add':
        setTypeAccount({ open: true, type: 'add' })
        break;
      case 'edit':
        setTypeAccount({ open: true, type: 'edit' })
        break;
      case 'view':
        setTypeAccount({ open: true, type: 'view' })
        break; 
    }
  } 

  const handleCloseTypeAccount = (type: string | null) => {
    if(type === null) return;
    switch (type) {
      case 'add':
        setTypeAccount({ open: false, type: 'add' })
        break;
      case 'edit':
        setTypeAccount({ open: false, type: 'edit' })
        break;
      case 'view':
        setTypeAccount({ open: false, type: 'view' })
        break; 
    }
  } 

  return (
    <Box
      sx={{
        bgcolor: COLORS.PRIMARY ,
        height: '100%',
        color: C.text,
        px: { xs: 2, sm: 3, md: 4 },
        py: { xs: 2, md: 3 },
      }}
    >
      {/* Header */}
      <Stack
        direction='row'
        alignItems='center'
        justifyContent='space-between'
        spacing={2}
        sx={{ mb: { xs: 3, md: 4 }, height: '100%' }}
      >
        <Stack onClick={onBack} direction='row' alignItems='center' spacing={1.5} sx={{ minWidth: 0 }}>
          <IconButton onClick={onBack} sx={{ color: C.text }} aria-label='Quay lại'>
            <ArrowBack />
          </IconButton>
          <Typography noWrap sx={{ fontSize: { xs: 20, md: 26 }, fontWeight: 700 }}>
            Tài khoản gần đây
          </Typography>
        </Stack>

        <Button
          onClick={() => handleOpenTypeAccount('add')}
          startIcon={<Add />}
          sx={{
            flexShrink: 0,
            bgcolor: C.blue,
            color: '#fff',
            textTransform: 'none',
            fontWeight: 600,
            borderRadius: 2,
            px: { xs: 2, md: 3 },
            py: 1.1,
            whiteSpace: 'nowrap',
            '&:hover': { bgcolor: '#1E7AE0' },
          }}
        >
          Tạo tài khoản
        </Button>
      </Stack>

      {/* Lưới tài khoản */}
      <Grid container spacing={{ xs: 2, md: 3 }}>
        {accounts.map((acc) => (
          <Grid key={acc.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <AccountCard account={acc} />
          </Grid>
        ))}
      </Grid>
      {typeAccount.open && typeAccount.type === 'add' && (
        <AddAccount
          open={typeAccount.open}
          onClose={() => handleCloseTypeAccount('add')}
        />
      )}
    </Box>
  );
};

/* ================================================================== */
/* Card tài khoản                                                     */
/* ================================================================== */
const AccountCard = ({ account }: { account: Account }) => {
  const [show, setShow] = useState(false);

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        p: { xs: 2, md: 2.5 },
        border: `1px solid ${C.border}`,
        borderRadius: 3,
        bgcolor: C.card,
        transition: 'border-color .2s',
        '&:hover': { borderColor: 'rgba(255,255,255,0.18)' },
      }}
    >
      {/* Phần thông tin */}
      <Stack direction='row' spacing={2} sx={{ mb: 2 }}>
        <Avatar
          src={avatar1}
          alt={account.name}
          sx={{ width: { xs: 72, md: 75 }, height: { xs: 72, md: 75 }, flexShrink: 0 }}
        />
        <Box sx={{ minWidth: 0, flexGrow: 1 }}>
          <Typography noWrap sx={{ fontWeight: 700, fontSize: { xs: 18, md: 20 } }}>
            {account.name}
          </Typography>
          <Typography noWrap sx={{ color: C.textMuted, fontSize: 14, mt: 0.25 }}>
            {account.role}
          </Typography>
          <Typography noWrap sx={{ color: C.textMuted, fontSize: 14 }}>
            {account.email}
          </Typography>
        </Box>
      </Stack>

      {/* Hành động */}
      <Stack direction='row' spacing={1.5} sx={{ mt: 'auto' }}>
        <Button
          fullWidth
          startIcon={<BorderColorOutlined />}
          sx={{
            textTransform: 'none',
            fontWeight: 600,
            borderRadius: 2,
            py: 1,
            color: '#fff',
            border: `1px solid ${C.border}`,
            '&:hover': { borderColor: C.cyan, bgcolor: 'rgba(51,233,253,0.06)' },
          }}
        >
          Chỉnh sửa
        </Button>
      </Stack>
    </Box>
  );
};

export default ListAccounts;
