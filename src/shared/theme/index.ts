import { createTheme } from '@mui/material';
import {
  blueGrey, blue, grey, red,
} from '@mui/material/colors';

import { shadows } from './shadows';
import { typography } from './typography';
import { components } from './components';

export const theme = createTheme({
  palette: {
    background: {
      default: 'white',
    },
    primary: {
      main: blue['600'],
      light: blue['200'],
    },
    secondary: {
      main: grey['500'],
      light: blueGrey['50'],
    },
    error: {
      main: red['500'],
    },
  },
  shadows,
  typography,
  components,
});
