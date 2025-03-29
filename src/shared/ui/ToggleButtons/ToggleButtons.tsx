import { styled, ToggleButton, ToggleButtonGroup, ToggleButtonGroupProps, ToggleButtonProps } from '@mui/material';
import { grey } from '@mui/material/colors';

interface ToggleButtonsProps extends ToggleButtonGroupProps {
    options: any[];
    variant?: 'default' | 'underline';
}

interface CustomToggleButtonProps extends ToggleButtonProps {
    variant?: 'default' | 'underline';
}

const StyledToggleButtonGroup = styled(ToggleButtonGroup)<
    ToggleButtonGroupProps & { variant?: 'default' | 'underline' }
>(({ theme, variant }) => ({
    '&': {
        columnGap: variant === 'default' ? theme.spacing(1) : '0px',
        borderRadius: theme.spacing(4),
        border: variant === 'default' ? `1px solid ${grey[300]}` : 'none',
        background: variant === 'default' ? theme.palette.secondary.light : 'inherit',
        padding: theme.spacing(0.5),
    },
}));

const StyledToggleButton = styled(ToggleButton)<CustomToggleButtonProps>(({ theme, variant }) => ({
    '&': {
        fontWeight: 600,
        border: 0,
        textTransform: 'unset',
        padding: [theme.spacing(1.5), theme.spacing(3)].join(' '),
        color: variant === 'underline' ? theme.palette.text.secondary : '#0000008A',
        borderBottom: variant === 'underline' ? `2px solid ${theme.palette.grey[400]}` : theme.spacing(4),
        alignSelf: 'auto',
    },
    '&.Mui-selected': {
        ...(variant === 'underline'
            ? {
                  color: theme.palette.primary.main,
                  backgroundColor: 'transparent',
                  borderBottom: `2px solid ${theme.palette.primary.main}`,
              }
            : {
                  color: theme.palette.primary.contrastText,
                  backgroundColor: theme.palette.primary.main,
              }),
    },
    '&.Mui-selected:hover': {
        ...(variant === 'underline'
            ? { backgroundColor: 'transparent' }
            : { backgroundColor: theme.palette.primary.main }),
    },
    '&.MuiToggleButton-root': {
        borderRadius: variant === 'underline' ? 0 : `${theme.spacing(4)} !important`,
    },
}));

export const ToggleButtons = (props: ToggleButtonsProps) => {
    const { options, variant = 'default', ...otherProps } = props;

    return (
        <StyledToggleButtonGroup color="primary" exclusive {...otherProps} variant={variant}>
            {options.map((option) => (
                <StyledToggleButton key={option} value={option} variant={variant}>
                    {option}
                </StyledToggleButton>
            ))}
        </StyledToggleButtonGroup>
    );
};
