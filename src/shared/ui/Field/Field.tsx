import { styled, TextField, TextFieldProps } from '@mui/material';

const BaseField1 = styled(TextField)<TextFieldProps>(({ theme }) => ({
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

export const BaseField = styled(TextField)(({ theme }) => ({
    '& .MuiFilledInput-root': {
        overflow: 'hidden',
        borderRadius: theme.spacing(1),
        border: '1px solid',
        backgroundColor: theme.palette.background.paper,
        borderColor: theme.palette.grey[300],
        '&:hover': {
            borderColor: '#1e88e5',
            backgroundColor: theme.palette.background.paper,
        },

        '&.Mui-error': {
            borderColor: theme.palette.error.main,
        },

        '&.Mui-focused': {
            backgroundColor: theme.palette.background.paper,
        },

        '&.Mui-disabled': {
            backgroundColor: theme.palette.secondary.light,
        },
    },
}));
