import DialogComponent from "@/components/DialogComponent";
import { C } from "@/constants/colors";
import Grid from "@mui/material/Grid2"
interface PendingPackagingProps{
    open: boolean,
    orderId?: string | null,
    onClose: () =>  void;
}

const PendingPackaging = (props: PendingPackagingProps) => {
    const { open, orderId, onClose } = props;

    const handleClose = () => {
        onClose()
    }
    return(
        <DialogComponent
            dialogKey={open}
            handleClose={handleClose}
            isActiveHeader={false}
            isActiveFooter={false}
            sx={{ bgcolor: C.card }}
        >
            <Grid>
                {/* orderId nhận được từ đơn vừa bấm, dùng để gọi API lấy chi tiết đơn */}
                <div style={{ color: C.text }}>Chi tiết đơn: {orderId}</div>
            </Grid>
        </DialogComponent>
    )
}

export default PendingPackaging;