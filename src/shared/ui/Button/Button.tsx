import { Button, ButtonProps, styled } from '@mui/material';
import { grey } from '@mui/material/colors';

export const BaseButton = styled(Button)<ButtonProps>(() => ({
  '&': {
    borderRadius: 'var(--border-radius)',
    textTransform: 'none',
    minWidth: 0,
  },
  '&.MuiButton-outlined': {
    borderColor: grey['500'],
    color: grey['900'],
  },
  '&.MuiButton-contained,Mui-disabled': {
    color: grey['100'],
  },
  '&.MuiButton-root:hover': {},
}));
