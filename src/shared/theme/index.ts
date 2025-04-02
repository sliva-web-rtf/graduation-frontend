import { createTheme } from '@mui/material';
import { blue, blueGrey, grey } from '@mui/material/colors';

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
            main: '#b00020',
            light: '#ffdddd',
        },
        warning: {
            main: '#997404',
            light: '#fff4d1',
        },
        success: {
            main: '#1b5e20',
            light: '#dff4dd',
        },
    },
    shadows,
    typography,
    components,
    mixins: {
        MuiDataGrid: {
            containerBackground: '#ffffff',
        },
    },
});
