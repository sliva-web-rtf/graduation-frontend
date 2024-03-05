import { createTheme } from '@mui/material';
import { blue, grey, red } from '@mui/material/colors';

import { shadows } from './shadows';
import { typography } from './typography';
import { components } from './components';

export const theme = createTheme({
  palette: {
    background: {
      default: '#fff',
    },
    primary: {
      main: blue['600'],
      light: '#A6C8FF',
    },
    secondary: {
      main: grey[500],
      light: '#E6EDF5',
    },
    error: {
      main: red['500'],
    },
  },
  shadows,
  typography,
  components,
});
