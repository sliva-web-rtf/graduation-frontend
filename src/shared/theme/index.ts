import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#408DFF',
    },
    error: {
      main: '#FF0000',
    },
    warning: {
      main: '#FFC000',
    },
  },
  typography: {
    fontFamily: [
      'Manrope',
      'Geologica',
      'sans-serif',
    ].join(','),
  },
});
