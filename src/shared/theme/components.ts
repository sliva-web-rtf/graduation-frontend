/* eslint-disable no-unused-vars */
import { Components, Theme } from '@mui/material';
import { shadows } from './shadows';

declare module '@mui/material/Button' {
    interface ButtonPropsVariantOverrides {
        shadowed: true;
    }
}

export const components: Components<Omit<Theme, 'components'>> | undefined = {
    MuiButton: {
        variants: [
            {
                props: { variant: 'shadowed' },
                style: {
                    backgroundColor: 'white',
                    boxShadow: shadows['1'],
                },
            },
        ],
    },
    MuiTextField: {
        defaultProps: {
            variant: 'filled',
            InputProps: {
                disableUnderline: true,
            },
        },
    },
    MuiAvatar: {
        styleOverrides: {
            root: {
                color: '#AECBF5',
                backgroundColor: '#E7F0FF',
                '.MuiSvgIcon-root': {
                    width: '45%',
                    height: '45%',
                },
            },
        },
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
};
