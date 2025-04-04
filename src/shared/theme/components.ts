/* eslint-disable no-unused-vars */
import { Components, Theme } from '@mui/material';
import { grey } from '@mui/material/colors';
import { ruRU } from '@mui/x-data-grid/locales';
import type {} from '@mui/x-data-grid/themeAugmentation';

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
        defaultProps: { variant: 'outlined', autoComplete: 'off', fullWidth: true },
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
    MuiChip: {
        styleOverrides: {
            colorError: {
                backgroundColor: '#FFDDDD', // Пастельный красный
                color: '#B00020',
            },
            colorWarning: {
                backgroundColor: '#FFF4D1', // Пастельный жёлтый
                color: '#997404',
            },
            colorSuccess: {
                backgroundColor: '#DFF4DD', // Пастельный зелёный
                color: '#1B5E20',
            },
        },
    },
    MuiDataGrid: {
        defaultProps: {
            disableRowSelectionOnClick: true,
            autoPageSize: true,
            localeText: ruRU.components.MuiDataGrid.defaultProps.localeText,
        },
    },
    MuiAlert: {
        defaultProps: {
            variant: 'filled',
        },
    },
};
