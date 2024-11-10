import { zodResolver } from '@hookform/resolvers/zod';
import { IconButton, InputAdornment, Link, Stack, Typography } from '@mui/material';
import classNames from 'classnames';
import { ChangeEvent, memo, useCallback, useEffect, useState } from 'react';
import { Path, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { BaseField, BaseLoadingButton } from '@/shared/ui';
import { STATUS } from '@/shared/api/status';
import { Login } from '@/entities/User';
import { EntityValidationErrors } from '@/shared/lib/types/appError';
import { LoginFormSchema, loginFormSchema } from '../../model/types/loginFormSchema';
import { loginActions, loginReducer } from '../../model/slice/loginSlice';
import { loginByEmail } from '../../model/services/loginByEmail';
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError';
import { getLoginStatus } from '../../model/selectors/getLoginStatus/getLoginStatus';

export interface LoginFormProps {
    className?: string;
    onSuccess?: () => void;
}

const initialReducers: ReducersList = {
    loginForm: loginReducer,
};

const LoginForm = memo((props: LoginFormProps) => {
    const { className, onSuccess } = props;
    const [showPassword, setShowPassword] = useState(false);

    const dispatch = useAppDispatch();
    const status = useSelector(getLoginStatus);
    const apiError = useSelector(getLoginError);

    const onChangeEmail = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            dispatch(loginActions.setEmail(event.target.value));
        },
        [dispatch],
    );

    const onChangePassword = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            dispatch(loginActions.setPassword(event.target.value));
        },
        [dispatch],
    );

    const handleClickShowPassword = useCallback(() => setShowPassword(!showPassword), [showPassword]);

    const {
        formState: { errors },
        handleSubmit,
        register,
        setError,
    } = useForm<LoginFormSchema>({
        resolver: zodResolver(loginFormSchema),
    });

    const onSubmitHandler = useCallback(async () => {
        const result = await dispatch(loginByEmail());
        if (result.meta.requestStatus === 'fulfilled') {
            onSuccess?.();
        }
    }, [dispatch, onSuccess]);

    const setValidationErrors = useCallback(
        (validationErrors: EntityValidationErrors<Login>) => {
            Object.entries(validationErrors).forEach(([field, messageOrError]) => {
                if (field === 'non_field_errors') {
                    setError('root', { type: 'server', message: messageOrError });
                } else {
                    setError(field as Path<Login>, {
                        type: 'server',
                        message: messageOrError,
                    });
                }
            });
        },
        [setError],
    );

    useEffect(() => {
        if (apiError != null && apiError.validationData != null) {
            setValidationErrors(apiError.validationData);
            setError('root', { type: 'server', message: apiError.message });
        }
    }, [apiError, setError, setValidationErrors]);

    return (
        <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
            <form onSubmit={handleSubmit(onSubmitHandler)} className={classNames(className)}>
                <Stack spacing={3} justifyContent="center" alignItems="center">
                    <Stack spacing={2} width="100%">
                        <BaseField
                            autoFocus
                            label="Почта"
                            fullWidth
                            autoComplete="false"
                            {...register('email')}
                            onChange={onChangeEmail}
                            error={Boolean(errors.email)}
                            helperText={errors.email?.message}
                        />
                        <BaseField
                            label="Пароль"
                            fullWidth
                            autoComplete="false"
                            {...register('password')}
                            type={showPassword ? 'text' : 'password'}
                            onChange={onChangePassword}
                            error={Boolean(errors.password)}
                            helperText={errors.password?.message}
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
                    </Stack>
                    {Boolean(errors.root?.message) && <Typography color="error">{errors.root!.message}</Typography>}
                    <Stack spacing={2} width="100%">
                        <BaseLoadingButton
                            fullWidth
                            type="submit"
                            variant="contained"
                            loading={status === STATUS.request}
                            sx={(theme) => ({ padding: theme.spacing(1.5) })}
                        >
                            Войти
                        </BaseLoadingButton>
                        <Stack flexDirection="row" justifyContent="space-between">
                            <Typography variant="body1" color="primary">
                                Забыли пароль?
                            </Typography>
                            <Link
                                component={RouterLink}
                                to="/signup"
                                underline="none"
                                sx={{ '&:hover': { textDecoration: 'none' } }}
                            >
                                Создать аккаунт
                            </Link>
                        </Stack>
                    </Stack>
                </Stack>
            </form>
        </DynamicModuleLoader>
    );
});

export default LoginForm;
