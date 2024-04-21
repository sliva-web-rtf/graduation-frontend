import { Autocomplete, AutocompleteProps, CircularProgress, InputAdornment, TextFieldProps } from '@mui/material';
import { memo } from 'react';
import { BaseField } from 'shared/ui';
import SearchIcon from '@mui/icons-material/Search';

export const BaseAutocomplete = memo(
    (props: AutocompleteProps<any, any, any, any> & Omit<TextFieldProps, 'onChange'>) => {
        const { error, helperText, label, placeholder, loading, ...autocompleteProps } = props;

        return (
            <Autocomplete
                {...autocompleteProps}
                multiple
                fullWidth
                renderInput={(params) => (
                    <BaseField
                        {...params}
                        placeholder={placeholder}
                        label={label}
                        error={error}
                        helperText={helperText}
                        InputProps={{
                            ...params.InputProps,
                            startAdornment: (
                                <>
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                    {params.InputProps.startAdornment}
                                </>
                            ),
                            endAdornment: loading ? <CircularProgress size={24} /> : params.InputProps.endAdornment,
                        }}
                    />
                )}
            />
        );
    },
);
