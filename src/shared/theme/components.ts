/* eslint-disable no-unused-vars */
import { Components, Theme } from '@mui/material';
import { grey } from '@mui/material/colors';
import { ruRU } from '@mui/x-data-grid/locales';
import type {} from '@mui/x-data-grid/themeAugmentation';
import type {} from '@mui/x-date-pickers/themeAugmentation';
import { NoResultsOverlay } from '../ui/Table/NoResultsOverlay';

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
        defaultProps: {
            variant: 'filled',
            autoComplete: 'off',
            fullWidth: true,
            InputProps: {
                disableUnderline: true,
            },
        },
    },
    MuiPaper: {
        defaultProps: { variant: 'outlined', sx: { borderRadius: 3 } },
    },
    MuiChip: {
        defaultProps: {
            sx: { alignSelf: 'flex-start' },
        },
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
            colorSecondary: {
                backgroundColor: '#E5E4E2', // Пастельный белый
                color: '#21272A',
            },
            colorInfo: {
                backgroundColor: '#E6D6F3', // Пастельный фиолетовый
                color: '#6C3483',
            },
        },
    },
    MuiDataGrid: {
        defaultProps: {
            sortingMode: 'server',
            paginationMode: 'server',
            filterMode: 'server',
            disableVirtualization: true,
            keepNonExistentRowsSelected: true,
            hideFooterSelectedRowCount: true,
            checkboxSelection: true,
            disableRowSelectionOnClick: true,
            autoPageSize: true,
            localeText: ruRU.components.MuiDataGrid.defaultProps.localeText,
            slots: {
                noResultsOverlay: NoResultsOverlay,
                noRowsOverlay: NoResultsOverlay,
            },
            slotProps: {
                loadingOverlay: {
                    variant: 'skeleton',
                    noRowsVariant: 'skeleton',
                },
            },
        },
    },
    MuiAlert: {
        defaultProps: {
            variant: 'filled',
        },
    },
    MuiTooltip: {
        defaultProps: {
            arrow: true,
        },
        styleOverrides: {
            tooltip: {
                maxWidth: 480,
                fontSize: 14,
                lineHeight: 1.5,
            },
        },
    },
    MuiDatePicker: {
        defaultProps: {
            label: 'Выберите дату',
        },
    },
    MuiLinearProgress: {
        defaultProps: {
            sx: { borderRadius: 16, height: 8 },
        },
    },
    MuiSelect: {
        defaultProps: { variant: 'filled', disableUnderline: true },
    },
    MuiFormControl: {
        defaultProps: {
            variant: 'filled',
        },
    },
};
