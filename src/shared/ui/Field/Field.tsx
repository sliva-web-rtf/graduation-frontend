import { TextField, styled, TextFieldProps } from '@mui/material';

export const BaseField = styled(TextField)<TextFieldProps>(({ theme }) => ({
  '&': {
    borderRadius: '16px',
    boxShadow: theme.shadows['1'],
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
    borderRadius: '16px',
  },
  '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
    border: `2px solid ${theme.palette.primary.main}`,
  },
  '& .Mui-error .MuiOutlinedInput-notchedOutline': {
    border: `2px solid ${theme.palette.error.main}`,
  },
}));
