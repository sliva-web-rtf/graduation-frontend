import { AppBar, AppBarProps, styled } from '@mui/material';

export const BaseAppBar = styled(AppBar)<AppBarProps>(({ theme }) => ({
    '&': {
        borderRadius: theme.spacing(2),
        background: theme.palette.background.default,
    },
    '& .MuiToolbar-root': {
        justifyContent: 'space-between',
        padding: [theme.spacing(1), theme.spacing(2)].join(' '),
    },
}));
