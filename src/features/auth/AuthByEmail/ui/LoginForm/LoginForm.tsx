import { useAuthMutation } from '@/entities/User';
import { BaseAlert, BaseField, BaseLoadingButton, PasswordField } from '@/shared/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { Stack } from '@mui/material';
import classNames from 'classnames';
import { memo, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { LoginFormSchema, loginFormSchema } from '../../model/types/loginFormSchema';

export interface LoginFormProps {
    className?: string;
}

const LoginForm = memo((props: LoginFormProps) => {
    const { className } = props;
    const [auth, { isLoading, error }] = useAuthMutation();
    const {
        formState: { errors },
        handleSubmit,
        register,
    } = useForm<LoginFormSchema>({
        resolver: zodResolver(loginFormSchema),
    });

    const onSubmitHandler = useCallback(
        (data: LoginFormSchema) => {
            auth(data)
                .unwrap()
                .then(() => {
                    window.location.href = '/';
                });
        },
        [auth],
    );

    return (
        <form onSubmit={handleSubmit(onSubmitHandler)} className={classNames(className)}>
            <Stack spacing={3} justifyContent="center" alignItems="center">
                <Stack spacing={2} width="100%">
                    <BaseField
                        autoFocus
                        label="Логин"
                        fullWidth
                        {...register('userName')}
                        error={Boolean(errors.userName)}
                        helperText={errors.userName?.message}
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
                {error && 'message' in error && <BaseAlert severity="error">{error.message}</BaseAlert>}
            </Stack>
        </form>
    );
});

export default LoginForm;
