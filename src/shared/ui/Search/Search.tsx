import { BaseField } from 'shared/ui/Field/Field';
import { InputAdornment, TextFieldProps } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export const BaseSearch = (props: TextFieldProps) => (
    <BaseField
        InputProps={{
            startAdornment: (
                <InputAdornment position="start">
                    <SearchIcon />
                </InputAdornment>
            ),
        }}
        {...props}
    />
);
