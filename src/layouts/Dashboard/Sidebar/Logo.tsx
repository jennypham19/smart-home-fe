import { useContext } from 'react';

import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { CollapseContext } from '.';

const Logo = () => {
  const collapsed = useContext(CollapseContext);

  if (collapsed) {
    return (
      <Box sx={{ paddingX: '17px', paddingY: '20px' }}>
        <Typography variant='h6' sx={{ whiteSpace: 'nowrap', color: '#fff' }}>FPT</Typography>
      </Box>
    );
  }

  return (
    <Toolbar sx={{ whiteSpace: 'nowrap', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <Typography sx={{ color: '#fff'}} variant='h6'>FPT SMART HOME</Typography>
      <Typography sx={{ color: '#adaaaa'}} variant='caption'>Quản lý nội bộ FPT</Typography>
    </Toolbar>
  );
};

export default Logo;
