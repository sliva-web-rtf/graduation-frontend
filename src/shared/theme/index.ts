import { createTheme } from '@mui/material';
import { blue, red } from '@mui/material/colors';

import { components } from './components';
import { shadows } from './shadows';
import { typography } from './typography';

export const theme = createTheme({
  palette: {
    primary: {
      main: blue['600'],
    },
    error: {
      main: red['500'],
    },
  },
  shadows,
  typography,
  components,
});
