import { createTheme } from '@mui/material';
import { blueGrey, blue, grey, red } from '@mui/material/colors';

import { components } from './components';
import { shadows } from './shadows';
import { typography } from './typography';

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
