import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton, InputAdornment, TextFieldProps } from '@mui/material';
import { ChangeEvent, useCallback } from 'react';
import { BaseField } from '../Field/Field';

export const BaseSearch = (props: TextFieldProps) => {
    const { onChange, value, InputProps } = props;

    const handleClear = useCallback(() => {
        if (onChange) {
            onChange({ target: { value: '' } } as ChangeEvent<HTMLInputElement>);
        }
    }, [onChange]);

    return (
        <BaseField
            fullWidth
            label="Поиск"
            {...props}
            InputProps={{
                disableUnderline: true,
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                ),
                endAdornment: value ? (
                    <InputAdornment position="end">
                        <IconButton size="small" onClick={handleClear}>
                            <HighlightOffIcon />
                        </IconButton>
                    </InputAdornment>
                ) : null,
                ...InputProps,
            }}
        />
    );
};
