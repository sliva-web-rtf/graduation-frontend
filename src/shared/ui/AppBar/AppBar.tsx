import { styled, AppBar, AppBarProps } from '@mui/material';

export const BaseAppBar = styled(AppBar)<AppBarProps>(({ theme }) => ({
  '&': {
    borderRadius: theme.spacing(2),
    background: theme.palette.secondary.light,
    boxShadow: 'none',
    marginTop: theme.spacing(4),
  },
  '& .MuiToolbar-root': {},
}));
