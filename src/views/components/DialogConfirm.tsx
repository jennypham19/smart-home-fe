import React from "react";
import { Box, Button, Typography } from "@mui/material";
import DialogComponent from "@/components/DialogComponent";
import { C, COLORS } from "@/constants/colors";

interface DialogConfirmProps {
  open: boolean;
  onClose: () => void;
  title: string;
  onAgree: () => void;
  dialogTitle?: string;
}

const DialogConfirm: React.FC<DialogConfirmProps> = (props) => {
    const { open, onClose, title, onAgree, dialogTitle } = props;
    return(
        <DialogComponent
            dialogTitle={dialogTitle}
            dialogKey={open}
            handleClose={onClose}
            isActiveFooter={false}
            isActiveHeader={false}
            isCenter={false}
            maxWidth='xs'
            dialogContentHeight={'auto'}
            sx={{ bgcolor: C.card }}
            PaperProps={{
                sx: {
                    bgcolor: C.card,
                    borderRadius: 3,
                    border: `1px solid ${C.border}`,
                    width: "100%",
                },
            }}
        >
            <Typography fontWeight={700} sx={{ color: C.text }}>{title}</Typography>
            <Box mt={1} display='flex' justifyContent='center' gap={2}>
                <Button
                    sx={{ bgcolor: C.cyan, width: 100 }}
                    onClick={onAgree}
                >
                    Đồng ý
                </Button>
                <Button
                    variant="outlined"
                    sx={{ border: `1px solid ${C.border}`, color: C.textMuted, mr: 1.5, width: 100 }}
                    onClick={onClose}
                >
                    Hủy
                </Button>
            </Box>
        </DialogComponent>
    )
}

export default DialogConfirm;