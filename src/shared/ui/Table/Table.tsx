/* eslint-disable max-len */
import { styled } from '@mui/material';
import { grey } from '@mui/material/colors';
import { DataGrid, DataGridProps } from '@mui/x-data-grid';

const stickyHeaders = {
    check: '.MuiDataGrid-columnHeader[data-field="__check__"]',
    movementStatus: '.MuiDataGrid-columnHeader[data-field="movementStatus"]',
    number: '.MuiDataGrid-columnHeader[data-field="number"]',
    student: '.MuiDataGrid-columnHeader[data-field="student"]',
};

const stickyCells = {
    check: '.MuiDataGrid-cell[data-field="__check__"]',
    number: '.MuiDataGrid-cell[data-field="number"]',
    movementStatus: '.MuiDataGrid-cell[data-field="movementStatus"]',
    student: '.MuiDataGrid-cell[data-field="student"]',
};

export const BaseTable = styled(DataGrid)<DataGridProps>(({ theme }) => ({
    fontFamily: ['Manrope', 'sans-serif'].join(','),
    fontSize: 16,
    fontWeight: 500,

    '.MuiDataGrid-row': {
        backgroundColor: theme.palette.background.paper,
    },
    '.MuiDataGrid-row.Mui-selected': {
        backgroundColor: '#DEECFD',

        [Object.values(stickyCells).join(',')]: {
            backgroundColor: '#DEECFD',
        },
    },
    '& .MuiDataGrid-row:hover': {
        backgroundColor: `${theme.palette.secondary.light} !important`,

        [Object.values(stickyCells).join(',')]: {
            backgroundColor: theme.palette.secondary.light,
        },
    },
    '& .MuiDataGrid-columnHeaderTitle': {
        fontSize: 14,
        fontWeight: 600,
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
    [[stickyHeaders.check, stickyCells.check].join(',')]: {
        position: 'sticky',
        left: 0,
        zIndex: 100,
        backgroundColor: theme.palette.background.paper,
    },
    [[stickyHeaders.number, stickyCells.number].join(',')]: {
        position: 'sticky',
        left: 50,
        zIndex: 100,
        backgroundColor: theme.palette.background.paper,
    },
    [[stickyHeaders.student, stickyCells.student].join(',')]: {
        position: 'sticky',
        left: 100,
        zIndex: 100,
        backgroundColor: theme.palette.background.paper,
    },
    [[stickyHeaders.movementStatus, stickyCells.movementStatus].join(',')]: {
        position: 'sticky',
        left: 400,
        zIndex: 100,
        backgroundColor: theme.palette.background.paper,
    },
    '.MuiDataGrid-cell a': {
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
    },
    '.MuiDataGrid-cell--editing input': {
        fontSize: 16,
    },
}));
