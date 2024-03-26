import { styled, ToggleButton, ToggleButtonGroup, ToggleButtonGroupProps, ToggleButtonProps } from '@mui/material';
import { CatalogOptions } from 'shared/lib/types/options';

interface ToggleButtonsProps extends ToggleButtonGroupProps {
    options: CatalogOptions[];
}

const StyledToggleButtonGroup = styled(ToggleButtonGroup)<ToggleButtonGroupProps>(({ theme }) => ({
    '&': {
        columnGap: theme.spacing(1),
        borderRadius: theme.spacing(4),
        background: theme.palette.secondary.light,
        padding: parseInt(theme.spacing(1), 10) / 2,
    },
}));

const StyledToggleButton = styled(ToggleButton)<ToggleButtonProps>(({ theme }) => ({
    '&': {
        fontWeight: 600,
        border: 0,
        textTransform: 'unset',
    },
    '&.Mui-selected': {
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.main,
    },
    '&.Mui-selected:hover': {
        backgroundColor: theme.palette.primary.main,
    },
    '&.MuiToggleButton-root': {
        borderRadius: theme.spacing(4),
    },
}));

export const ToggleButtons = (props: ToggleButtonsProps) => {
    const { options, ...otherProps } = props;

    return (
        <StyledToggleButtonGroup color="primary" exclusive {...otherProps}>
            {options.map((option) => (
                <StyledToggleButton key={option} value={option}>
                    {option}
                </StyledToggleButton>
            ))}
        </StyledToggleButtonGroup>
    );
};
