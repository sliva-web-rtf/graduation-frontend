import { createTheme } from '@mui/material';
import { blue, grey } from '@mui/material/colors';

import { typography } from './typography';
import { components } from './components';

export const theme = createTheme({
  palette: {
    primary: {
      main: blue['600'],
    },
  },
  typography,
  components,
});

theme.shadows.push(`1px 2px 14px 0px ${grey['900']}`);
