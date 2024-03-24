import { BaseField } from 'shared/ui/Field/Field';
import { InputAdornment, TextFieldProps } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';

export const BaseSearch = (props: TextFieldProps) => (
  <BaseField
    InputProps={{
      startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
      endAdornment: <InputAdornment position="end"><ExpandMoreRoundedIcon /></InputAdornment>,
    }}
    {...props}
  />
);
