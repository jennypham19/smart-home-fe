import DialogComponent from "@/components/DialogComponent";
import { C } from "@/constants/colors";
import { IUser } from "@/types/user";
import { Key, SettingsBackupRestore } from "@mui/icons-material";
import { Box, Button, Stack, Typography } from "@mui/material";

interface ConfirmResetPasswordProps {
    open: boolean;
    onClose: () => void;
    user: IUser;
    onConfirm: (user: IUser) => void;
    loading?: boolean;
}

const ConfirmResetPassword = (props: ConfirmResetPasswordProps) => {
    const { open, onClose, user, onConfirm, loading = false } = props;

    return (
        <DialogComponent
            dialogKey={open}
            handleClose={onClose}
            isActiveHeader={false}
            isActiveFooter={false}
            dialogContentHeight="auto"
            maxWidth="xs"
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
            <Stack direction='column' spacing={2}>
                {/* ------------------- Icon ------------------- */}
                <Stack direction='row' alignItems='center' spacing={1}>
                    <Box
                        sx={{
                            width: 44,
                            height: 44,
                            borderRadius: 2,
                            bgcolor: "rgba(245,197,24,0.15)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Key sx={{ color: C.yellow }} />
                    </Box>
                    <Typography sx={{ color: C.text, fontSize: { xs: 18, sm: 20 }, fontWeight: 700, mb: 1 }}>
                        Reset mật khẩu?
                    </Typography>
                </Stack>

                {/* ------------------- Nội dung ------------------- */}
                <Box>

                    <Typography sx={{ color: C.textMuted, fontSize: 15, lineHeight: 1.6 }}>
                        Hệ thống sẽ tạo mật khẩu mới cho tài khoản{" "}
                        <Box component="span" sx={{ color: C.text, fontWeight: 600 }}>
                            {user.account}
                        </Box>
                        . Mật khẩu hiện tại sẽ không dùng được nữa.
                    </Typography>
                </Box>

                {/* ------------------- Hành động ------------------- */}
                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    justifyContent="flex-end"
                    spacing={1.5}
                    sx={{ mt: 1 }}
                >
                    <Button
                        disableElevation
                        variant="contained"
                        onClick={() => onConfirm?.(user)}
                        disabled={loading}
                        sx={{
                            textTransform: "none",
                            fontWeight: 600,
                            borderRadius: 2,
                            px: 3,
                            bgcolor: C.cyan,
                            color: C.text,
                            "&:hover": { bgcolor: "#353d4e" },
                            "&.Mui-disabled": { bgcolor: C.disabled, color: C.textMuted },
                        }}
                    >
                        {loading ? "Đang xử lý..." : "Reset mật khẩu"}
                    </Button>
                    <Button
                        variant="outlined"
                        sx={{ border: `1px solid ${C.border}`, color: C.textMuted }}
                        startIcon={<SettingsBackupRestore/>}
                        onClick={onClose}
                    >
                        Quay lại
                    </Button>
                </Stack>
            </Stack>
        </DialogComponent>
    );
};

export default ConfirmResetPassword;
