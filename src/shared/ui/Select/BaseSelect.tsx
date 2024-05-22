import { FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectProps, styled } from '@mui/material';
import { Controller } from 'react-hook-form';
import { memo } from 'react';

const StyledSelect = styled(Select)<SelectProps>(({ theme }) => ({
    '&': {
        borderRadius: theme.spacing(2),
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[1],
    },
    '& .MuiOutlinedInput-notchedOutline': {
        border: 'none',
    },
    '&.Mui-focused': {
        border: `2px solid ${theme.palette.primary.main}`,
    },
    '&.Mui-error': {
        boxShadow: theme.shadows['0'],
        border: `2px solid ${theme.palette.error.main}`,
    },
    '&.Mui-error.Mui-focused .MuiOutlinedInput-notchedOutline': {
        border: 'none',
    },
}));

type BaseSelectProps = SelectProps & {
    readonly name: string;
    readonly control: any;
    readonly options: Array<string | number>;
    readonly helperText: string | undefined;
};

export const BaseSelect = memo((props: BaseSelectProps) => {
    const { name, control, options, label, helperText, defaultValue } = props;
    return (
        <FormControl fullWidth>
            <InputLabel id={`${name}-label`}>{label}</InputLabel>
            <Controller
                name={name}
                control={control}
                defaultValue={defaultValue}
                render={({ field }) => (
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    <StyledSelect label={label} labelId={`${name}-label`} {...field}>
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
});
