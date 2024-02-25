import { Button, ButtonProps, styled } from '@mui/material';
import { grey } from '@mui/material/colors';

export const BaseButton = styled(Button)<ButtonProps>((blab) => ({
  '&.MuiButton-outlined': {
    borderColor: grey['500'],
    color: grey['900'],
  },
  '&.MuiButton-contained,Mui-disabled': {
    color: grey['100'],
  },
}));
