import { Autocomplete, AutocompleteProps, CircularProgress, TextFieldProps } from '@mui/material';
import { forwardRef, memo } from 'react';
import { BaseField } from '../Field/Field';

// TODO: типизировать
export type BaseAutocompleteProps = Omit<AutocompleteProps<any, any, any, any>, 'renderInput'> &
    Omit<TextFieldProps, 'onChange'>;

export const BaseAutocomplete = memo(
    forwardRef<HTMLInputElement, BaseAutocompleteProps>((props: BaseAutocompleteProps, ref) => {
        const { error, helperText, label, placeholder, loading, inputRef, ...autocompleteProps } = props;

        return (
            <Autocomplete
                ref={ref}
                forcePopupIcon
                loading={loading}
                freeSolo
                fullWidth
                noOptionsText="Ничего не найдено"
                loadingText="Загрузка..."
                {...autocompleteProps}
                renderInput={(params) => (
                    <BaseField
                        inputRef={inputRef}
                        {...params}
                        label={label}
                        placeholder={placeholder}
                        error={error}
                        helperText={helperText}
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <>
                                    {loading && <CircularProgress size={24} />}
                                    {params.InputProps.endAdornment}
                                </>
                            ),
                        }}
                    />
                )}
            />
        );
    }),
);
