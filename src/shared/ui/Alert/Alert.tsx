import { Alert, AlertProps, styled } from '@mui/material';

export const BaseAlert = styled(Alert)<AlertProps>(({ theme }) => ({
    '&': {
        width: '100%',
        borderRadius: theme.spacing(1),
        fontSize: '0.85rem',
        fontWeight: 600,
        alignItems: 'center',
    },
    '&.MuiAlert-filledError': {
        backgroundColor: theme.palette.error.light,
        color: theme.palette.error.main,
    },
    '&.MuiAlert-filledWarning': {
        backgroundColor: theme.palette.warning.light,
        color: theme.palette.warning.main,
    },
    '&.MuiAlert-filledSuccess': {
        backgroundColor: theme.palette.success.light,
        color: theme.palette.success.main,
    },
    '&.MuiAlert-filledInfo': {
        backgroundColor: '#DEEEFE',
        color: theme.palette.info.main,
    },
}));
