import {
    Checkbox,
    FormControl,
    FormHelperText,
    InputLabel,
    ListItemText,
    MenuItem,
    Select,
    SelectProps,
    styled,
} from '@mui/material';
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
    options: Array<string | number | { label: string; value: string }>;

    control?: any;
    name?: string;
    helperText?: string;
    useController?: boolean;
    clearable?: boolean;
    clearText?: string;
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
        size,
        onChange,
        clearText = 'Сбросить выбор',
        ...otherProps
    } = props;

    const renderSelect = (fieldProps?: { value: any; onChange: (event: any) => void }) => (
        <StyledSelect
            // @ts-expect-error
            renderValue={(selected) => (otherProps.multiple ? selected.join(', ') : selected)}
            {...otherProps}
            label={label}
            value={fieldProps?.value ?? value ?? ''}
            onChange={fieldProps?.onChange ?? onChange}
        >
            {!otherProps.multiple && clearable && (
                <MenuItem value="">
                    <b>{clearText}</b>
                </MenuItem>
            )}
            {options.map((option) => (
                // @ts-expect-error
                <MenuItem key={option?.value ?? option} value={option?.value ?? option}>
                    {otherProps.multiple && (
                        <Checkbox
                            sx={{ width: 32, height: 32 }}
                            checked={
                                // @ts-expect-error
                                value?.includes(option?.value ?? option) ??
                                // @ts-expect-error
                                fieldProps?.value?.includes(option?.value ?? option)
                            }
                        />
                    )}
                    {/* @ts-expect-error */}
                    <ListItemText primary={option?.label ?? option} />
                </MenuItem>
            ))}
        </StyledSelect>
    );

    return (
        <FormControl fullWidth size={size}>
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
