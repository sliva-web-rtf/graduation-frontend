import { useAuthMutation } from '@/entities/User';
import { BaseAlert, BaseField, BaseLoadingButton, PasswordField } from '@/shared/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import EastIcon from '@mui/icons-material/East';
import { Stack } from '@mui/material';
import { memo, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { LoginFormSchema, loginFormSchema } from '../../model/types/loginFormSchema';
import { Agreement } from './Agreement';

const LoginForm = memo(() => {
    const [auth, { isLoading, error }] = useAuthMutation();
    const {
        formState: { errors, isValid },
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
        <Stack spacing={3} justifyContent="center" alignItems="center" width="100%">
            <Stack spacing={2} width="100%">
                <BaseField
                    autoFocus
                    fullWidth
                    label="Логин"
                    placeholder="ИвановИванИвановичРИ410940"
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
                variant="contained"
                onClick={handleSubmit(onSubmitHandler)}
                disabled={!isValid}
                loading={isLoading}
                sx={(theme) => ({
                    alignSelf: 'flex-end',
                    padding: theme.spacing(1.5),
                })}
            >
                <EastIcon />
            </BaseLoadingButton>
            {error && 'message' in error && <BaseAlert severity="error">{error.message}</BaseAlert>}
            <Agreement />
        </Stack>
    );
});

export default LoginForm;
