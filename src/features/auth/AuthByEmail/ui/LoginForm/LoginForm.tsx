import { zodResolver } from '@hookform/resolvers/zod';
import { Box, InputLabel, Stack, Typography } from '@mui/material';
import classNames from 'classnames';
import { ChangeEvent, memo, useCallback, useEffect } from 'react';
import { Path, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { BaseButton, BaseField } from 'shared/ui';
import { STATUS } from 'shared/api/status';
import { Login } from 'entities/User';
import { EntityValidationErrors } from 'shared/lib/types/appError';
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

    const {
        formState: { errors },
        handleSubmit,
        register,
        setError,
    } = useForm<LoginFormSchema>({
        mode: 'onBlur',
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
                <Stack justifyContent="center" alignItems="center" spacing={2}>
                    <Box>
                        <InputLabel>Почта</InputLabel>
                        <BaseField
                            autoComplete="false"
                            {...register('email')}
                            onChange={onChangeEmail}
                            error={Boolean(errors.email)}
                            helperText={errors.email ? errors.email?.message : ' '}
                            FormHelperTextProps={{ style: { backgroundColor: 'transparent' } }}
                        />
                    </Box>
                    <Box>
                        <InputLabel>Пароль</InputLabel>
                        <BaseField
                            autoComplete="false"
                            {...register('password')}
                            onChange={onChangePassword}
                            error={Boolean(errors.password)}
                            helperText={errors.password ? errors.password?.message : ' '}
                            FormHelperTextProps={{ style: { backgroundColor: 'transparent' } }}
                        />
                    </Box>
                    <BaseButton type="submit" disabled={status === STATUS.request}>
                        Зайти
                    </BaseButton>
                    {true && (
                        <Typography
                            sx={(theme) => ({
                                color: theme.palette.error.main,
                            })}
                        >
                            {errors.root?.message}
                        </Typography>
                    )}
                </Stack>
            </form>
        </DynamicModuleLoader>
    );
});

export default LoginForm;
