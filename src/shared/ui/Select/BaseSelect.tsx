import { FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectProps, styled } from '@mui/material';
import { Controller } from 'react-hook-form';

export const StyledSelect = styled(Select)<SelectProps>(({ theme }) => ({
    '&': {
        borderRadius: theme.spacing(2),
        backgroundColor: theme.palette.background.paper,
        fontWeight: 500,
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: '#1e88e5 !important',
    },
    '&:hover.Mui-error .MuiOutlinedInput-notchedOutline': {
        borderColor: `${theme.palette.error.main} !important`,
    },
}));

export type BaseSelectProps = SelectProps & {
    options: Array<string | number>;

    control?: any;
    name?: string;
    helperText?: string;
    useController?: boolean;
    clearable?: boolean;
};

export const BaseSelect = (props: BaseSelectProps) => {
    const {
        name,
        clearable = true,
        control,
        options,
        label,
        helperText,
        defaultValue,
        useController = true,
        value,
        onChange,
        ...otherProps
    } = props;

    const renderSelect = (fieldProps?: { value: any; onChange: (event: any) => void }) => (
        <StyledSelect
            {...otherProps}
            label={label}
            value={fieldProps?.value ?? value ?? ''}
            onChange={fieldProps?.onChange ?? onChange}
        >
            {!otherProps.multiple && clearable && (
                <MenuItem value="">
                    <b>Сбросить выбор</b>
                </MenuItem>
            )}
            {options.map((option) => (
                <MenuItem key={option} value={option}>
                    {option}
                </MenuItem>
            ))}
        </StyledSelect>
    );

    return (
        <FormControl fullWidth>
            <InputLabel error={otherProps.error}>{label}</InputLabel>
            {useController && control && name ? (
                <Controller
                    name={name}
                    control={control}
                    defaultValue={defaultValue}
                    render={({ field }) => renderSelect(field)}
                />
            ) : (
                renderSelect()
            )}
            {helperText && (
                <FormHelperText sx={(theme) => ({ color: theme.palette.error.main })}>{helperText}</FormHelperText>
            )}
        </FormControl>
    );
};
