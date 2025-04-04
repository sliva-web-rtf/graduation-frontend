import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment, TextFieldProps } from '@mui/material';
import { forwardRef, Ref, useState } from 'react';
import { BaseField } from '../Field/Field';

type PasswordFieldProps = TextFieldProps & {};

export const PasswordField = forwardRef((props: PasswordFieldProps, ref: Ref<any>) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <BaseField
            ref={ref}
            type={showPassword ? 'text' : 'password'}
            InputProps={{
                disableUnderline: true,
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton onClick={handleClickShowPassword}>
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                ),
            }}
            {...props}
        />
    );
});
