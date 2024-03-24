import { zodResolver } from '@hookform/resolvers/zod';
import { Box, InputLabel, Stack, Typography } from '@mui/material';
import classNames from 'classnames';
import { ChangeEvent, memo, useCallback } from 'react';
import { useForm } from 'react-hook-form';

import { useSelector } from 'react-redux';
import { getLoginError } from 'features/AuthByEmail/model/selectors/getLoginError/getLoginError';
import { getLoginLoading } from 'features/AuthByEmail/model/selectors/getLoginLoading/getLoginLoading';
import { loginByEmail } from 'features/AuthByEmail/model/services/loginByEmail';
import { loginActions, loginReducer } from 'features/AuthByEmail/model/slice/loginSlice';
import { LoginFormSchema, loginFormSchema } from 'features/AuthByEmail/model/types/loginFormSchema';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { BaseButton, BaseField } from 'shared/ui';

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
    const isLoading = useSelector(getLoginLoading);
    const error = useSelector(getLoginError);

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
                    <BaseButton type="submit" disabled={isLoading}>
                        Зайти
                    </BaseButton>
                    {true && (
                        <Typography
                            sx={(theme) => ({
                                color: theme.palette.error.main,
                            })}
                        >
                            {error}
                        </Typography>
                    )}
                </Stack>
            </form>
        </DynamicModuleLoader>
    );
});

export default LoginForm;
