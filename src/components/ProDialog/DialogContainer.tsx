import { Box } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import type { DialogProps } from '@mui/material/Dialog';

const DialogContainer = (props: DialogProps) => {
  const { children, open, onClose, sx, ...rest } = props;

  return (
    <Dialog open={open} onClose={onClose} scroll='paper' fullWidth {...rest}>
      <Box sx={sx}>
         {children}
      </Box>
     
    </Dialog>
  );
};

export default DialogContainer;