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
    readonly name: string;
    readonly control: any;
    readonly options: Array<string | number>;
    readonly helperText?: string;
};

export const BaseSelect = (props: BaseSelectProps) => {
    const { name, control, options, label, helperText, defaultValue, ...otherProps } = props;

    return (
        <FormControl fullWidth>
            <InputLabel id={`${name}-label`} error={otherProps.error}>
                {label}
            </InputLabel>
            <Controller
                name={name}
                control={control}
                defaultValue={defaultValue}
                render={({ field }) => (
                    <StyledSelect {...otherProps} label={label} labelId={`${name}-label`} {...field}>
                        {options.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </StyledSelect>
                )}
            />
            {helperText && (
                <FormHelperText sx={(theme) => ({ color: theme.palette.error.main })}>{helperText}</FormHelperText>
            )}
        </FormControl>
    );
};
