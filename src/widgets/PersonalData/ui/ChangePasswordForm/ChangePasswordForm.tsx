import { zodResolver } from '@hookform/resolvers/zod';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment, Stack, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BaseButton, BaseField, HelperText } from '@/shared/ui';
import { updatePassword } from '../../api/personalDataApi';
import { changePasswordFormSchema, ChangePasswordFormSchema } from '../../model/types/changePasswordFormSchema';

export const ChangePasswordForm = () => {
    const [showPassword, setShowPassword] = useState({
        currentPassword: false,
        newPassword: false,
        repeatNewPassword: false,
    });

    const handleClickShowPassword = (field: 'currentPassword' | 'repeatNewPassword' | 'newPassword') => {
        setShowPassword((prevState) => ({ ...prevState, [field]: !prevState[field] }));
    };

    const [updateSmbdyPassword, { error, isLoading }] = updatePassword();
    const {
        formState: { errors, isSubmitSuccessful },
        handleSubmit,
        register,
        reset,
        setError,
    } = useForm<ChangePasswordFormSchema>({
        resolver: zodResolver(changePasswordFormSchema),
    });

    const onSubmitHandler = useCallback(
        async (values: ChangePasswordFormSchema) => {
            const response = await updateSmbdyPassword(values);
            if ('error' in response && response.error) {
                setError('currentPassword', {
                    type: 'server',
                    message: 'Неправильный пароль',
                });
            }
        },
        [setError, updateSmbdyPassword],
    );

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
        }
    }, [isSubmitSuccessful, reset]);

    return (
        <Stack component="form" spacing={3} onSubmit={handleSubmit(onSubmitHandler)}>
            <Typography variant="h2">Изменить пароль</Typography>
            <Stack spacing={2}>
                <BaseField
                    label="Текущий пароль"
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
                <BaseField
                    label="Новый пароль"
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
                <BaseField
                    label="Повторите пароль"
                    type={showPassword.repeatNewPassword ? 'text' : 'password'}
                    {...register('repeatNewPassword')}
                    error={Boolean(errors.repeatNewPassword)}
                    helperText={<HelperText error={errors.repeatNewPassword} />}
                    InputProps={{
                        disableUnderline: true,
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => handleClickShowPassword('repeatNewPassword')}>
                                    {showPassword.repeatNewPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </Stack>
            <BaseButton disabled={isLoading} type="submit" variant="contained" sx={() => ({ alignSelf: 'center' })}>
                Изменить пароль
            </BaseButton>
        </Stack>
    );
};
