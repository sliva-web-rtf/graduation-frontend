import { IconButton, InputAdornment, Stack, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useEffect, useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { changePasswordFormSchema, ChangePasswordFormSchema } from '../../model/types/changePasswordFormSchema';
import { BaseButton, BaseField, HelperText } from '@/shared/ui';
import { updatePassword } from '../../api/personalDataApi';

export const ChangePasswordForm = () => {
    const [showPassword, setShowPassword] = useState({
        currentPassword: false,
        repeatCurrentPassword: false,
        newPassword: false,
    });
    const handleClickShowPassword = (field: 'currentPassword' | 'repeatCurrentPassword' | 'newPassword') => {
        setShowPassword((prevState) => ({ ...prevState, [field]: !prevState[field] }));
    };

    const [updateSmbdyPassword, { error }] = updatePassword();
    const {
        formState: { errors, isSubmitSuccessful },
        handleSubmit,
        register,
        reset,
        setError,
    } = useForm<ChangePasswordFormSchema>({
        defaultValues: {
            currentPassword: '',
            repeatCurrentPassword: '',
            newPassword: '',
        },
        resolver: zodResolver(changePasswordFormSchema),
    });

    const onSubmitHandler = useCallback(
        async (values: ChangePasswordFormSchema) => {
            await updateSmbdyPassword(values)
                .then((response) => {
                    if (!response.error?.data) {
                        return Promise.reject();
                    }
                    return response.error.data;
                })
                .then((data) => {
                    if (data.status === 400) {
                        setError('currentPassword', {
                            type: 'server',
                            message: 'Неправильный пароль',
                        });
                    }
                });
        },
        [setError, updateSmbdyPassword],
    );

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
        }
    }, [isSubmitSuccessful, reset]);

    return (
        <form
            onSubmit={handleSubmit(onSubmitHandler)}
            style={{ width: '100%', display: 'flex', flexDirection: 'column' }}
        >
            <Typography variant="h2" mb={3}>
                Изменить пароль
            </Typography>
            <Stack spacing={2}>
                <Stack spacing={1}>
                    <BaseField
                        label="Текущий пароль"
                        fullWidth
                        autoComplete="false"
                        {...register('currentPassword')}
                        type={showPassword.currentPassword ? 'text' : 'password'}
                        error={Boolean(errors.currentPassword)}
                        helperText={<HelperText error={errors.currentPassword} />}
                        InputProps={{
                            disableUnderline: true,
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => handleClickShowPassword('currentPassword')}>
                                        {showPassword.currentPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Stack>
                <Stack spacing={1}>
                    <BaseField
                        label="Повторите пароль"
                        fullWidth
                        autoComplete="false"
                        type={showPassword.repeatCurrentPassword ? 'text' : 'password'}
                        {...register('repeatCurrentPassword')}
                        error={Boolean(errors.repeatCurrentPassword)}
                        helperText={<HelperText error={errors.repeatCurrentPassword} />}
                        InputProps={{
                            disableUnderline: true,
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => handleClickShowPassword('repeatCurrentPassword')}>
                                        {showPassword.repeatCurrentPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Stack>
                <Stack spacing={1}>
                    <BaseField
                        label="Новый пароль"
                        fullWidth
                        autoComplete="false"
                        {...register('newPassword')}
                        type={showPassword.newPassword ? 'text' : 'password'}
                        error={Boolean(errors.newPassword)}
                        helperText={<HelperText error={errors.newPassword} />}
                        InputProps={{
                            disableUnderline: true,
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => handleClickShowPassword('newPassword')}>
                                        {showPassword.newPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Stack>
            </Stack>
            <BaseButton type="submit" variant="contained" sx={() => ({ alignSelf: 'center', marginTop: 2 })}>
                Изменить
            </BaseButton>
        </form>
    );
};
