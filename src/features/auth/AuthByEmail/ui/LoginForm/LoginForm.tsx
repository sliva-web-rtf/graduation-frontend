import { useAuthMutation } from '@/entities/User';
import { BaseField, BaseLoadingButton, PasswordField } from '@/shared/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { Stack, Typography } from '@mui/material';
import classNames from 'classnames';
import { memo, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { LoginFormSchema, loginFormSchema } from '../../model/types/loginFormSchema';

export interface LoginFormProps {
    className?: string;
}

const LoginForm = memo((props: LoginFormProps) => {
    const { className } = props;
    const [auth, { isLoading }] = useAuthMutation();

    const {
        formState: { errors },
        handleSubmit,
        register,
        setError,
    } = useForm<LoginFormSchema>({
        resolver: zodResolver(loginFormSchema),
    });

    const onSubmitHandler = useCallback(
        async (data: LoginFormSchema) => {
            try {
                await auth(data);
                window.location.href = '/';
            } catch (err) {
                setError('root', {
                    type: 'server',
                    message: 'Неправильный логин или пароль',
                });
            }
        },
        [auth, setError],
    );

    return (
        <form onSubmit={handleSubmit(onSubmitHandler)} className={classNames(className)}>
            <Stack spacing={3} justifyContent="center" alignItems="center">
                <Stack spacing={2} width="100%">
                    <BaseField
                        autoFocus
                        label="Логин"
                        fullWidth
                        {...register('email')}
                        error={Boolean(errors.email)}
                        helperText={errors.email?.message}
                    />
                    <PasswordField
                        label="Пароль"
                        fullWidth
                        {...register('password')}
                        error={Boolean(errors.password)}
                        helperText={errors.password?.message}
                    />
                </Stack>
                <BaseLoadingButton
                    fullWidth
                    type="submit"
                    variant="contained"
                    loading={isLoading}
                    sx={(theme) => ({ padding: theme.spacing(1.5) })}
                >
                    Войти
                </BaseLoadingButton>
                {Boolean(errors.root?.message) && <Typography color="error">{errors.root!.message}</Typography>}
            </Stack>
        </form>
    );
});

export default LoginForm;
