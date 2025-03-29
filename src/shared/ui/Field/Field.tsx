import { styled, TextField, TextFieldProps } from '@mui/material';

export const BaseField = styled(TextField)<TextFieldProps>(({ theme }) => ({
    '& .MuiInputBase-root': {
        borderRadius: theme.spacing(2),
        backgroundColor: theme.palette.background.paper,
        fontWeight: 500,
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: '#1e88e5 !important',
    },
    '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
        border: `2px solid ${theme.palette.primary.main} !important`,
    },
    '& .MuiInputBase-root.Mui-error': {
        borderColor: theme.palette.error.main,
    },
}));
