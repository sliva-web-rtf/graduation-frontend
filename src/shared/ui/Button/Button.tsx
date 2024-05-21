import { Button, ButtonProps, styled } from '@mui/material';
import { grey } from '@mui/material/colors';
import LoadingButton, { LoadingButtonProps } from '@mui/lab/LoadingButton';

export const BaseButton = styled(Button)<ButtonProps>(() => ({
    '&': {
        borderRadius: 'var(--border-radius)',
        textTransform: 'none',
        minWidth: 0,
        fontFamily: 'Manrope',
        fontWeight: '600',
    },
    '&.MuiButton-outlined': {
        borderColor: grey['500'],
        color: grey['900'],
    },
    '&.MuiButton-contained,Mui-disabled': {
        color: grey['100'],
    },
    '&.MuiButton-root:hover': {},
}));

export const BaseLoadingButton = styled(LoadingButton)<LoadingButtonProps>(() => ({
    '&': {
        borderRadius: 'var(--border-radius)',
        textTransform: 'none',
        minWidth: 0,
        fontFamily: 'Manrope',
        fontWeight: '600',
    },
    '&.MuiButton-outlined': {
        borderColor: grey['500'],
        color: grey['900'],
    },
    '&.MuiButton-contained,Mui-disabled': {
        color: grey['100'],
    },
    '&.MuiButton-root:hover': {},
}));
