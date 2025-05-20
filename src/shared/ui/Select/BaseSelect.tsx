import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
    Checkbox,
    FormControl,
    FormHelperText,
    InputLabel,
    ListItemText,
    MenuItem,
    Select,
    SelectProps,
    Skeleton,
    styled,
} from '@mui/material';
import { Controller } from 'react-hook-form';

export interface OptionType<T = string | number> {
    label: string;
    value: T;
    disabled?: boolean;
}

export type BaseSelectProps<T = string | number> = Omit<SelectProps, 'options'> & {
    options: Array<OptionType<T> | T>;
    loading?: boolean;
    control?: any;
    name?: string;
    helperText?: string;
    useController?: boolean;
    clearable?: boolean;
    clearText?: string;
    clearValue?: string;
};

const StyledSelect = styled(Select)<SelectProps>(({ theme }) => ({
    '&': {
        borderRadius: theme.spacing(1),
    },
    '& .MuiInputBase-input': {
        overflow: 'hidden',
        border: '1px solid',
        borderRadius: theme.spacing(1),
        backgroundColor: `${theme.palette.background.paper} !important`,
        borderColor: theme.palette.grey[300],
        '&:hover': {
            borderColor: '#1e88e5',
            backgroundColor: theme.palette.background.paper,
        },

        '&.Mui-error': {
            borderColor: theme.palette.error.main,
        },

        '&.Mui-focused': {
            borderColor: '#1e88e5',
            backgroundColor: `${theme.palette.background.paper} !important`,
        },
    },
}));

const loadingMenuItems = Array.from({ length: 5 }, (_, index) => (
    <MenuItem key={index} disabled>
        <Skeleton variant="text" width="100%" />
    </MenuItem>
));

const loadingMenuItemsForMultiple = Array.from({ length: 8 }, (_, index) => (
    <MenuItem key={index} disabled>
        <Skeleton variant="text" width="100%" height={32} />
    </MenuItem>
));

function getOptionObject<T>(option: OptionType<T> | T): OptionType<T> {
    if (option && typeof option === 'object' && 'label' in option && 'value' in option) {
        return option as OptionType<T>;
    }

    return { label: String(option), value: option as T };
}

export function BaseSelect<T = string | number>(props: BaseSelectProps<T>) {
    const {
        loading,
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
        clearValue = '',
        ...otherProps
    } = props;

    const renderSelect = (fieldProps?: { value: any; onChange: (event: any) => void }) => (
        <StyledSelect
            {...otherProps}
            label={label}
            value={fieldProps?.value ?? value ?? (otherProps.multiple ? [] : '')}
            onChange={fieldProps?.onChange ?? onChange}
            IconComponent={KeyboardArrowDownIcon}
        >
            {loading && otherProps.multiple && loadingMenuItemsForMultiple}
            {loading && !otherProps.multiple && loadingMenuItems}
            {!loading && !otherProps.multiple && clearable && (
                <MenuItem value={clearValue}>
                    <b>{clearText}</b>
                </MenuItem>
            )}
            {options.map((option) => {
                const opt = getOptionObject(option);

                if (otherProps.multiple) {
                    return (
                        <MenuItem
                            key={opt.value as string}
                            value={opt.value as string}
                            disabled={Boolean(opt.disabled)}
                        >
                            <Checkbox
                                sx={{ width: 32, height: 32 }}
                                checked={(fieldProps?.value ?? value ?? []).includes(opt.value)}
                            />
                            <ListItemText primary={opt.label} />
                        </MenuItem>
                    );
                }

                return (
                    <MenuItem key={opt.value as string} value={opt.value as string} disabled={Boolean(opt.disabled)}>
                        {opt.label}
                    </MenuItem>
                );
            })}
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
                <FormHelperText
                    sx={(theme) => ({
                        color: otherProps.error ? theme.palette.error.main : theme.palette.text.secondary,
                    })}
                >
                    {helperText}
                </FormHelperText>
            )}
        </FormControl>
    );
}
