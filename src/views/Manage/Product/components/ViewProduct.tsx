import DialogComponent from "@/components/DialogComponent";
import IconButton from "@/components/IconButton/IconButton";
import { C } from "@/constants/colors";
import useNotification from "@/hooks/useNotification";
import { IProduct } from "@/types/product";
import { getCategoryProductLabel, getProductStatusLabel, getStatusProductColor } from "@/utils/labelEntoVni";
import {
    Close,
    ContentCopy,
    DeleteOutline,
    EditOutlined,
    ImageOutlined,
} from "@mui/icons-material";
import { Box, Button, Chip, Divider, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import dayjs from "dayjs";

interface ViewProductProps {
    open: boolean;
    onClose: () => void;
    product: IProduct;
    onEdit?: (product: IProduct) => void;
    onDelete?: (product: IProduct) => void;
}


// Hiển thị 1 cặp nhãn - giá trị trong lưới thông tin
const InfoItem = ({ label, value }: { label: string; value: React.ReactNode }) => (
    <Box>
        <Typography sx={{ color: C.textMuted, fontSize: 14, mb: 0.5 }}>{label}</Typography>
        <Typography sx={{ color: C.text, fontSize: 17 }}>{value}</Typography>
    </Box>
);

const ViewProduct = (props: ViewProductProps) => {
    const { open, onClose, product, onEdit, onDelete } = props;
    const notify = useNotification();

    const formatDate = (value?: string) => (value ? dayjs(value).format("DD/MM/YYYY HH:mm") : "--");

    const handleCopyId = async () => {
        try {
            await navigator.clipboard.writeText(product.id);
            notify({ message: "Đã sao chép ID", severity: "success" });
        } catch {
            notify({ message: "Không thể sao chép ID", severity: "error" });
        }
    };

    return (
        <DialogComponent
            dialogKey={open}
            handleClose={onClose}
            isActiveHeader={false}
            isActiveFooter={false}
            dialogContentHeight="auto"
            maxWidth="sm"
            sx={{ bgcolor: C.card }}
            PaperProps={{
                sx: {
                    width: "100%",
                },
            }}
        >
            {/* ------------------- Tiêu đề ------------------- */}
            <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                <Box>
                    <Typography sx={{ color: C.textMuted, fontSize: 15 }}>Chi tiết vật tư</Typography>
                    <Typography sx={{ color: C.text, fontSize: { xs: 22, md: 26 }, fontWeight: 700 }}>
                        {product.name}
                    </Typography>
                </Box>
                <IconButton handleFunt={onClose} icon={<Close sx={{ color: C.textMuted }} />} />
            </Box>

            <Divider sx={{ borderColor: C.border, my: 2 }} />

            {/* ------------------- Ảnh + Tồn kho ------------------- */}
            <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 2, sm: 4 }}
                alignItems={{ xs: "flex-start", sm: "center" }}
            >
                <Box
                    sx={{
                        width: { xs: "100%", sm: 190 },
                        height: 190,
                        flexShrink: 0,
                        borderRadius: 3,
                        bgcolor: C.text,
                        border: `1px dashed ${C.border}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <ImageOutlined sx={{ color: "#9CA3AF", fontSize: 40 }} />
                </Box>

                <Box>
                    <Stack direction="row" spacing={1.5} alignItems="center" flexWrap="wrap" useFlexGap>
                        <Chip
                            label={getProductStatusLabel(product.status as any)}
                            color={getStatusProductColor(product.status).color}
                            sx={{
                                fontWeight: 600,
                                fontSize: 15,
                                height: 32,
                                borderRadius: 999,
                            }}
                        />
                        <Chip
                            label={getCategoryProductLabel(product.category as any)}
                            sx={{
                                bgcolor: C.textMuted,
                                color: C.text,
                                fontSize: 15,
                                height: 32,
                                borderRadius: 999,
                            }}
                        />
                    </Stack>
                    <Typography sx={{ color: C.textMuted, fontSize: 15, mt: 2 }}>Tồn kho</Typography>
                    <Typography sx={{ color: C.text, fontSize: 36, fontWeight: 700, lineHeight: 1.1 }}>
                        {product.amount}
                    </Typography>
                </Box>
            </Stack>

            <Divider sx={{ borderColor: C.border, my: 2.5 }} />

            {/* ------------------- Thông tin chi tiết ------------------- */}
            <Grid container rowSpacing={3} columnSpacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <InfoItem label="Mã SKU" value={product.skuCode} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <InfoItem label="Thương hiệu" value={product.brand} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <InfoItem label="Danh mục" value={getCategoryProductLabel(product.category as any)} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <InfoItem label="Trạng thái" value={getProductStatusLabel(product.status as any)} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <InfoItem label="Ngày tạo" value={formatDate(product.createdAt)} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <InfoItem label="Cập nhật lần cuối" value={formatDate(product.updatedAt)} />
                </Grid>
            </Grid>

            <Divider sx={{ borderColor: C.border, my: 2.5 }} />

            {/* ------------------- Hành động ------------------- */}
            <Stack
                direction={{ xs: "column", sm: "row" }}
                justifyContent="flex-end"
                spacing={1.5}
            >
                    <Button
                        variant="outlined"
                        onClick={onClose}
                        sx={{
                            textTransform: "none",
                            color: C.text,
                            borderColor: C.border,
                            borderRadius: 2,
                            px: 3,
                        }}
                    >
                        Đóng
                    </Button>
            </Stack>
        </DialogComponent>
    );
};

export default ViewProduct;
