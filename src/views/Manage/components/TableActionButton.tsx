import { C } from "@/constants/colors";
import { Button, Tooltip } from "@mui/material";
import { ReactNode } from "react";

interface TableActionButtonProps{
    icon: ReactNode,
    toolTip: string,
    onHandleOpenButton: () => void;
}

const TableActionButton = (props: TableActionButtonProps) => {
    const { icon, toolTip, onHandleOpenButton } = props;
    return(
        <Tooltip title={toolTip}>
            <Button
                onClick={onHandleOpenButton}
                component="button"
                sx={{
                    width: 34,
                    height: 34,
                    minWidth: 34,
                    p: 0,
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
            </Button>
        </Tooltip>
    )
}

export default TableActionButton;