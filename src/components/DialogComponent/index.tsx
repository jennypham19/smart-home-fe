import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { Box, DialogProps } from '@mui/material';
import ActionButton from '@/components/ProButton/ActionButton';
import DialogContainer from '@/components/ProDialog/DialogContainer';
import DialogContent from '@/components/ProDialog/DialogContent';
import DialogFooter from '@/components/ProDialog/DialogFooter';
import DialogHeader from '@/components/ProDialog/DialogHeader';
import { SxProps, Theme, useTheme } from '@mui/material/styles';

interface Props extends Omit<DialogProps, 'open' | 'fullScreen'> {
  dialogKey: string | null | boolean;
  handleClose: () => void;
  children: ReactNode;
  dialogTitle?: string;
  dialogContentHeight?: string | number;
  showSaveButton?: boolean;
  customButtons?: ReactNode;
  sx?: SxProps<Theme>;
  hasError?: boolean,
  isActiveFooter?:boolean,
  isCenter?:boolean,
  isActiveHeader?:boolean,
  maxWidth?: any,
  toolTip?: string,
  labelBtn?: string,
  isIcon?: boolean
}

const DialogComponent = ({
  dialogKey,
  handleClose,
  children,
  dialogTitle,
  dialogContentHeight = 500,
  showSaveButton = false,
  customButtons,
  sx,
  hasError,
  isActiveFooter = true,
  isCenter=true,
  isActiveHeader=true,
  maxWidth,
  toolTip = dialogTitle,
  labelBtn = 'Hủy',
  isIcon,
  ...rest
}: Props) => {
  const { t } = useTranslation('common', { keyPrefix: 'actions' });
  return (
    <DialogContainer sx={sx} {...rest} open={!!dialogKey} onClose={handleClose}>
      {isActiveHeader && <DialogHeader toolTip={toolTip} onClose={handleClose} title={dialogTitle || ''} marginTop={2} />}
      <DialogContent sx={{ textAlign: isCenter ? "" : "center", maxHeight: 'fit-content'}}>
        <Box sx={{ height: dialogContentHeight, padding: 2 }}>{children}</Box>
      </DialogContent>
      {isActiveFooter && (
        <DialogFooter>
          {customButtons}
          <ActionButton isIcon={isIcon} actionType='cancel' onClick={handleClose}>
            {labelBtn}
          </ActionButton>
        </DialogFooter>        
      )}
    </DialogContainer>
  );
};

export default DialogComponent;
