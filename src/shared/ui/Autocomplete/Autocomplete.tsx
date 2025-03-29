import { Autocomplete, AutocompleteProps, CircularProgress, TextFieldProps } from '@mui/material';
import { forwardRef, memo } from 'react';
import { BaseField } from '@/shared/ui';

// TODO: типизировать
export type BaseAutocompleteProps = Omit<AutocompleteProps<any, any, any, any>, 'renderInput'> &
    Omit<TextFieldProps, 'onChange'>;

export const BaseAutocomplete = memo(
    forwardRef<HTMLInputElement, BaseAutocompleteProps>((props: BaseAutocompleteProps, ref) => {
        const { error, helperText, placeholder, loading, ...autocompleteProps } = props;

        return (
            <Autocomplete
                ref={ref}
                {...autocompleteProps}
                loading={loading}
                freeSolo
                forcePopupIcon
                fullWidth
                noOptionsText="Пусто"
                loadingText="Загрузка..."
                renderInput={(params) => (
                    <BaseField
                        {...params}
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
