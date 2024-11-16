import { memo, useCallback, useState } from 'react';
import { Box, IconButton, InputAdornment, Link, MenuItem, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import classNames from 'classnames';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import CancelIcon from '@mui/icons-material/Cancel';
import { BaseAccordion, BaseField, BaseLoadingButton, BaseSelect, HelperText } from '@/shared/ui';
import { signupFormSchema, SignupFormSchema } from '../../model/types/signupFormSchema';

export interface SignupProps {
    className?: string;
}
const SignupForm = memo((props: SignupProps) => {
    const { className } = props;
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = useCallback(() => setShowPassword(!showPassword), [showPassword]);

    const {
        formState: { errors },
        control,
        handleSubmit,
        register,
    } = useForm<SignupFormSchema>({
        resolver: zodResolver(signupFormSchema),
    });
    const onSubmitHandler = () => {};
    return (
        <form onSubmit={handleSubmit(onSubmitHandler)} className={classNames(className)}>
            <Stack spacing={3}>
                <Stack spacing={2} width="100%">
                    <BaseField
                        autoFocus
                        label="Почта"
                        fullWidth
                        autoComplete="false"
                        {...register('email')}
                        error={Boolean(errors.email)}
                        helperText={<HelperText error={errors.email} />}
                    />
                    <BaseField
                        label="Пароль"
                        fullWidth
                        autoComplete="false"
                        {...register('password')}
                        type={showPassword ? 'text' : 'password'}
                        error={Boolean(errors.password)}
                        helperText={<HelperText error={errors.password} />}
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
                    <Link
                        component={RouterLink}
                        to="/login"
                        underline="none"
                        sx={{ '&:hover': { textDecoration: 'none' } }}
                    >
                        Я уже зарегистрирован
                    </Link>
                </Stack>
            </Stack>
        </form>
    );
});

export default SignupForm;
