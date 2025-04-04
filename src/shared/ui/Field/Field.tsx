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
    '&:hover .Mui-error .MuiOutlinedInput-notchedOutline': {
        borderColor: `${theme.palette.error.main} !important`,
    },
    '&:hover .Mui-error.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: `${theme.palette.error.main} !important`,
    },
}));
