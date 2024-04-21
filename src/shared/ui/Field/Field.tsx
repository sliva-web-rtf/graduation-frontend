import { styled, TextField, TextFieldProps } from '@mui/material';

export const BaseField = styled(TextField)<TextFieldProps>(({ theme }) => ({
    '& .MuiInputBase-root': {
        borderRadius: '16px',
        boxShadow: theme.shadows['1'],
        background: theme.palette.background.default,
    },
    '& .MuiOutlinedInput-notchedOutline': {
        border: 'none',
        borderRadius: '16px',
    },
    '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
        border: `2px solid ${theme.palette.primary.main}`,
    },
    '& .MuiInputBase-root.Mui-error': {
        boxShadow: theme.shadows['0'],
        border: `2px solid ${theme.palette.error.main}`,
    },
    '& .Mui-error.Mui-focused .MuiOutlinedInput-notchedOutline': {
        border: 'none',
    },
    '& .MuiChip-filled': {
        backgroundColor: theme.palette.secondary.light,
    },

    '& .MuiChip-label': {
        maxWidth: '300px',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
}));
