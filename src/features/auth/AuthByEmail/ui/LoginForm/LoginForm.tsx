import { zodResolver } from '@hookform/resolvers/zod';
import { Stack, Typography } from '@mui/material';
import classNames from 'classnames';
import { memo, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { BaseField, BaseLoadingButton, PasswordField } from '@/shared/ui';
import { useAuthMutation } from '@/entities/User/api/userApi';
import { LoginFormSchema, loginFormSchema } from '../../model/types/loginFormSchema';

export interface LoginFormProps {
    className?: string;
}

const LoginForm = memo((props: LoginFormProps) => {
    const { className } = props;
    const navigate = useNavigate();
    const [auth, { isLoading }] = useAuthMutation();

    const {
        formState: { errors },
        handleSubmit,
        register,
        // setError,
    } = useForm<LoginFormSchema>({
        resolver: zodResolver(loginFormSchema),
    });

    const onSubmitHandler = useCallback(
        async (data: LoginFormSchema) => {
            try {
                await auth(data);
                navigate('/', { replace: true });
            } catch (err) {
                /* empty */
            }
        },
        [auth, navigate],
    );

    return (
        <form onSubmit={handleSubmit(onSubmitHandler)} className={classNames(className)}>
            <Stack spacing={3} justifyContent="center" alignItems="center">
                <Stack spacing={2} width="100%">
                    <BaseField
                        autoFocus
                        label="Эл. почта"
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
