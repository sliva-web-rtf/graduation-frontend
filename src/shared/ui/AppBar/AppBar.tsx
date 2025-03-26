import { styled, AppBar, AppBarProps } from '@mui/material';

export const BaseAppBar = styled(AppBar)<AppBarProps>(({ theme }) => ({
    '&': {
        borderRadius: theme.spacing(1),
        background: theme.palette.background.default,
        boxShadow: 'none',
    },
    '& .MuiToolbar-root': {
        justifyContent: 'space-between',
        padding: [theme.spacing(1), theme.spacing(2)].join(' '),
    },
}));
