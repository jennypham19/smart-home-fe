import InputSearch from "@/components/SearchBar";
import { C } from "@/constants/colors";
import { Box } from "@mui/material";
import { ReactNode } from "react";

interface SearchBoxProps{
    children?: ReactNode,
    onSearch: (data: string) => void;
    initialValue: string;
    placeholder?: string;
}
const SearchTextBox = ({
    children,
    onSearch,
    initialValue,
    placeholder = 'Tìm kiếm',
} : SearchBoxProps) => {
    return (
        <Box display='flex' flexDirection='row' sx={{ width: { xs: '100%', md: '50%' } }}>
            <Box width='100%'>
                <InputSearch
                    onSearch={onSearch}
                    initialValue={initialValue}
                    placeholder={placeholder}
                    colorIcon="#fff"
                    color="#fff"
                    borderColor={C.border}
                />
            </Box>
        </Box>
    )
}

export default SearchTextBox;