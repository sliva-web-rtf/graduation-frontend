import { styled, AppBar, AppBarProps } from '@mui/material';

export const BaseAppBar = styled(AppBar)<AppBarProps>(({ theme }) => ({
  '&': {
    borderRadius: theme.spacing(2),
    background: theme.palette.secondary.light,
    boxShadow: 'none',
  },
  '& .MuiToolbar-root': {
    justifyContent: 'space-between',
    padding: [theme.spacing(1), theme.spacing(2)].join(' '),
  },
}));
