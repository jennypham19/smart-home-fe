import { COLORS } from '@/constants/colors';
import { CategoryType } from '@/constants/tab';
import { Box, IconButton, Typography } from '@mui/material';
import React from 'react';

export interface TabItem{
    label: string,
    value: CategoryType
    icon?: React.ReactNode,
}

interface Props {
    viewMode: CategoryType;
    onChange: (mode: CategoryType) => void;
    DataViewMode: TabItem[]
}

const Tabs: React.FC<Props> = ({ viewMode, onChange, DataViewMode }) => {
    const handleChange = (value: CategoryType) => {
        onChange(value);
    }
    return (
        <Box
            display='flex'
            flexDirection={"row"}
            alignItems='center'
            gap={5}
        >
            {DataViewMode.map((item) => {
                const isActive = viewMode === item.value;
                return (
                    <Box
                        key={item.value}
                        width="100%"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        sx={{
                            cursor: 'pointer',
                            bgcolor: isActive ? COLORS.COLOR_PRIMARY : 'transparent',
                            p: 1,
                            borderRadius: 0.5,
                        }}
                        onClick={() => handleChange(item.value)}
                    >
                        {item.icon}
                        <Typography sx={{ color: isActive ? '#fff' : 'text.secondary' }} fontWeight={600} fontSize='14px'>
                            {item.label}
                        </Typography>
                    </Box>
                );
            })}
        </Box>
    );
};

export default Tabs;