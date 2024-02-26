import { createTheme } from '@mui/material';
import { blue, red } from '@mui/material/colors';

import { shadows } from './shadows';
import { typography } from './typography';
import { components } from './components';

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
