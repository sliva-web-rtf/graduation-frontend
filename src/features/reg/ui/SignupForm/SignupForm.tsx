import { memo, useCallback, useState } from 'react';
import { IconButton, InputAdornment, Link, MenuItem, Stack } from '@mui/material';
import classNames from 'classnames';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { BaseAccordion, BaseField, BaseLoadingButton, BaseSelect } from '@/shared/ui';

export interface SignupProps {
    className?: string;
}
const SignupForm = memo((props: SignupProps) => {
    const { control } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = useCallback(() => setShowPassword(!showPassword), [showPassword]);
    const { className } = props;
    return (
        <form className={classNames(className)}>
            <Stack spacing={3}>
                <Stack spacing={2} width="100%">
                    <BaseField autoFocus label="Почта" fullWidth autoComplete="false" />
                    <BaseField
                        autoFocus
                        label="Пароль"
                        fullWidth
                        autoComplete="false"
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
                    />
                    <BaseSelect
                        options={['Студент', 'Научный руководитель']}
                        name="Выбрать роль"
                        helperText=""
                        control={control}
                        defaultValue="Студент"
                    />
                </Stack>
                <Stack spacing={1} justifyContent="center" alignItems="center">
                    <BaseLoadingButton
                        fullWidth
                        type="submit"
                        variant="contained"
                        sx={(theme) => ({ padding: theme.spacing(1.5) })}
                    >
                        Зарегистрироваться
                    </BaseLoadingButton>
                    <Link href="/login" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'none' } }}>
                        Я уже зарегистрирован
                    </Link>
                </Stack>
            </Stack>
        </form>
    );
});

export default SignupForm;
