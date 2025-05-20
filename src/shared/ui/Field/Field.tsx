import { styled, TextField } from '@mui/material';

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
