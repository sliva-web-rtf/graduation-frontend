import { styled } from '@mui/material';
import { grey } from '@mui/material/colors';
import { DataGrid, DataGridProps } from '@mui/x-data-grid';

export const BaseTable = styled(DataGrid)<DataGridProps>(({ theme }) => ({
    fontFamily: ['Manrope', 'sans-serif'].join(','),
    fontSize: 16,
    fontWeight: 500,
    '& .MuiDataGrid-row:nth-of-type(odd)': {
        backgroundColor: 'transparent',
    },
    '& .MuiDataGrid-row:nth-of-type(even)': {
        backgroundColor: theme.palette.background.paper,
    },
    '& .MuiDataGrid-row:hover': {
        backgroundColor: theme.palette.secondary.light,
    },
    '& .MuiDataGrid-columnHeaderTitle': {
        fontSize: 14,
        color: theme.palette.secondary.main,
    },
    '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
        borderRight: '1px solid #303030',
        ...theme.applyStyles('light', {
            borderRightColor: grey[300],
        }),
    },
    '& .MuiDataGrid-overlay': {
        color: theme.palette.secondary.main,
    },
}));
