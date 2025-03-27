import { InputAdornment, TextFieldProps } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { BaseField } from '../Field/Field';

export const BaseSearch = (props: TextFieldProps) => (
    <BaseField
        sx={{ width: '100%' }}
        variant="outlined"
        InputProps={{
            disableUnderline: true,
            startAdornment: (
                <InputAdornment position="start">
                    <SearchIcon />
                </InputAdornment>
            ),
        }}
        placeholder="Поиск"
        {...props}
    />
);
