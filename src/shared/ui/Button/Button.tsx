import LoadingButton, { LoadingButtonProps } from '@mui/lab/LoadingButton';
import { Button, ButtonProps, styled } from '@mui/material';
import { grey } from '@mui/material/colors';

export const BaseButton = styled(Button)<ButtonProps>(({ theme }) => ({
    '&': {
        borderRadius: theme.spacing(2),
        textTransform: 'none',
        minWidth: 0,
        fontWeight: '600',
        padding: '10px 28px',
    },
    '&.MuiButton-outlined': {
        color: grey['900'],
        '&:hover': {
            backgroundColor: 'white',
        },
    },
    '&.MuiButton-contained': {
        color: grey['100'],
    },
    '&.MuiButton-root:hover': {
        boxShadow: 'none',
    },
    '&.MuiButton-sizeSmall': {
        padding: '6px 16px',
        fontSize: 12,
    },
}));

export const BaseLoadingButton = styled(LoadingButton)<LoadingButtonProps>(({ theme }) => ({
    '&': {
        borderRadius: theme.spacing(2),
        textTransform: 'none',
        minWidth: 0,
        fontWeight: '600',
        padding: '10px 28px',
    },
    '&.MuiButton-outlined': {
        color: grey['900'],
    },
    '&.MuiButton-contained': {
        color: grey['100'],
    },
}));
