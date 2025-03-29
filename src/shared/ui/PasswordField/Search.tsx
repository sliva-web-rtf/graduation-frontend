import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, TextFieldProps } from '@mui/material';
import { BaseField } from '../Field/Field';

export const BaseSearch = (props: TextFieldProps) => (
    <BaseField
        fullWidth
        InputProps={{
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
