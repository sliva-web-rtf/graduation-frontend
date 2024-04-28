import { Autocomplete, AutocompleteProps, CircularProgress, TextFieldProps } from '@mui/material';
import { forwardRef, memo } from 'react';
import { BaseField } from 'shared/ui';
// import SearchIcon from '@mui/icons-material/Search';

type BaseAutocompleteProps = Omit<AutocompleteProps<any, any, any, any>, 'renderInput'> &
    Omit<TextFieldProps, 'onChange'>;

export const BaseAutocomplete = memo(
    forwardRef<HTMLInputElement, BaseAutocompleteProps>((props: BaseAutocompleteProps, ref) => {
        const { error, helperText, label, placeholder, loading, ...autocompleteProps } = props;

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
                renderInput={(params) => (
                    <BaseField
                        {...params}
                        placeholder={placeholder}
                        label={label}
                        error={error}
                        helperText={helperText}
                        InputProps={{
                            ...params.InputProps,
                            // startAdornment: (
                            //     <>
                            //         <InputAdornment position="start"><SearchIcon /></InputAdornment>
                            //         {params.InputProps.startAdornment}
                            //     </>
                            // ),
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
