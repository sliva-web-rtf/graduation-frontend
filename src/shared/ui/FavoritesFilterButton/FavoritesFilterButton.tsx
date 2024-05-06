import React, { memo } from 'react';
import { Checkbox, CheckboxProps, styled } from '@mui/material';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import StarOutlineRoundedIcon from '@mui/icons-material/StarOutlineRounded';

export const StyledFilterCheckbox = styled(Checkbox)<CheckboxProps>(({ theme }) => ({
    '&.MuiCheckbox-root': {
        width: theme.spacing(6),
        height: theme.spacing(6),
        backgroundColor: theme.palette.background.paper,
        border: 'none',
        borderRadius: 'var(--border-radius)',
        boxShadow: theme.shadows['1'],
    },
}));

export const FavoritesFilterCheckbox = memo((props: CheckboxProps) => (
    <StyledFilterCheckbox
        icon={<StarOutlineRoundedIcon />}
        checkedIcon={<StarRoundedIcon color="primary" />}
        {...props}
    />
));
