/* eslint-disable no-unused-vars */
import { Components, Theme } from '@mui/material';
import { grey } from '@mui/material/colors';

export const components: Components<Omit<Theme, 'components'>> | undefined = {
    MuiButton: {
        defaultProps: { variant: 'outlined' },
        variants: [
            {
                props: { variant: 'outlined' },
                style: {
                    backgroundColor: 'white',
                    borderColor: grey['300'],
                },
            },
            {
                props: { variant: 'contained' },
                style: {
                    boxShadow: 'none',
                },
            },
        ],
    },
    MuiTextField: {
        defaultProps: { variant: 'outlined', autoComplete: 'off' },
    },
    MuiModal: {
        styleOverrides: {
            root: {
                '.MuiBackdrop-root': {
                    backgroundColor: 'rgba(197, 218, 244, 0.75)',
                },
            },
        },
    },
    MuiPaper: {
        defaultProps: { variant: 'outlined' },
    },
};
