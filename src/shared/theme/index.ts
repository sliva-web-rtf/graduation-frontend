import { createTheme } from '@mui/material';
import { blue, blueGrey, green, grey, red } from '@mui/material/colors';

import { components } from './components';
import { shadows } from './shadows';
import { typography } from './typography';

export const theme = createTheme({
    palette: {
        background: {
            default: '#F4F9FD',
        },
        primary: {
            main: '#408DFF',
            light: blue['200'],
        },
        secondary: {
            main: grey['500'],
            light: blueGrey['50'],
        },
        error: {
            main: red['500'],
        },
        success: {
            main: green['500'],
            light: green.A100,
        },
    },
    shadows,
    typography,
    components,
});
