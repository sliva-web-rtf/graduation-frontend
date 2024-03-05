import {
  styled, ToggleButton, ToggleButtonGroup, ToggleButtonGroupProps, ToggleButtonProps,
} from '@mui/material';
import { useState, MouseEvent, FC } from 'react';

interface BaseToggleButtonGroupProps {
  options: string[],
}

const StyledToggleButtonGroup = styled(ToggleButtonGroup)<ToggleButtonGroupProps>(({ theme }) => ({
  '&': {
    borderRadius: '30px',
    background: theme.palette.secondary.light,
    padding: '4px',
  },
}));

const StyledToggleButton = styled(ToggleButton)<ToggleButtonProps>(({ theme }) => ({
  '&': {
    border: 0,
    borderRadius: '30px',
    textTransform: 'unset',
  },
  '&.Mui-selected': {
    color: theme.palette.primary.contrastText,
    background: theme.palette.primary.main,
  },
  '&.MuiToggleButtonGroup-firstButton': {
    borderTopRightRadius: '30px',
    borderBottomRightRadius: '30px',
    marginRight: theme.spacing(1),
  },
  '&.MuiToggleButtonGroup-middleButton': {
    borderTopRightRadius: '30px',
    borderBottomRightRadius: '30px',
    borderTopLeftRadius: '30px',
    borderBottomLeftRadius: '30px',
  },
  '&.MuiToggleButtonGroup-lastButton': {
    borderTopLeftRadius: '30px',
    borderBottomLeftRadius: '30px',
    marginLeft: theme.spacing(1),
  },
}));

const BaseToggleButtonGroup: FC<BaseToggleButtonGroupProps> = ({ options }) => {
  const [alignment, setAlignment] = useState<string>(options[0]);
  const handleChange = (event: MouseEvent<HTMLElement>, newAlignment: string) => setAlignment(newAlignment);

  return (
    <StyledToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
    >
      {options.map((option) => <StyledToggleButton key={option} value={option}>{option}</StyledToggleButton>)}
    </StyledToggleButtonGroup>
  );
};

export default BaseToggleButtonGroup;
