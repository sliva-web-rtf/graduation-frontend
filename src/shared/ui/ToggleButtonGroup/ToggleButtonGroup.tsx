import {
  styled, ToggleButton, ToggleButtonGroup, ToggleButtonGroupProps, ToggleButtonProps,
} from '@mui/material';
import { useState, MouseEvent, FC } from 'react';

interface BaseToggleButtonGroupProps extends ToggleButtonGroupProps {
  options: string[],
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

export const BaseToggleButtonGroup: FC<BaseToggleButtonGroupProps> = ({ options, ...props }) => {
  const [alignment, setAlignment] = useState<string>(options[0]);
  const handleChange = (event: MouseEvent<HTMLElement>, newAlignment: string) => {
    if (newAlignment) {
      setAlignment(newAlignment);
    }
  };

  return (
    <StyledToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      {...props}
    >
      {options.map((option) => <StyledToggleButton key={option} value={option}>{option}</StyledToggleButton>)}
    </StyledToggleButtonGroup>
  );
};
