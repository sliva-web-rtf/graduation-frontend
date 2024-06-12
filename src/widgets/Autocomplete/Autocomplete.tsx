import { Autocomplete, AutocompleteProps, CircularProgress, TextFieldProps } from '@mui/material';
import { forwardRef, memo } from 'react';
import { BaseField } from '@/shared/ui';

type BaseAutocompleteProps = Omit<AutocompleteProps<any, any, any, any>, 'renderInput'> &
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
                multiple
                fullWidth
                noOptionsText="Пусто"
                loadingText="Загрузка..."
                sx={(theme) => ({
                    '& .MuiFilledInput-root': {
                        padding: theme.spacing(1),
                    },
                })}
                renderInput={(params) => (
                    <BaseField
                        {...params}
                        placeholder={placeholder}
                        error={error}
                        helperText={helperText}
                        InputProps={{
                            ...params.InputProps,
                            disableUnderline: true,
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
