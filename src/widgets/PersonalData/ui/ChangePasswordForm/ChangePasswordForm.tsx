import { zodResolver } from '@hookform/resolvers/zod';
import { Stack, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BaseLoadingButton, HelperText, PasswordField } from '@/shared/ui';
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

    const [updateSmbdyPassword, { isLoading }] = updatePassword();
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
        <Stack component="form" spacing={4} onSubmit={handleSubmit(onSubmitHandler)}>
            <Stack spacing={2}>
                <PasswordField
                    label="Текущий пароль"
                    {...register('currentPassword')}
                    error={Boolean(errors.currentPassword)}
                    helperText={<HelperText error={errors.currentPassword} />}
                />
                <PasswordField
                    label="Новый пароль"
                    {...register('newPassword')}
                    error={Boolean(errors.newPassword)}
                    helperText={<HelperText error={errors.newPassword} />}
                />
                <PasswordField
                    label="Повторите пароль"
                    {...register('newPassword')}
                    {...register('repeatNewPassword')}
                    error={Boolean(errors.repeatNewPassword)}
                    helperText={<HelperText error={errors.repeatNewPassword} />}
                />
                <Stack>
                    <Typography variant="bodyXS" color="#00000099">
                        Последнее изменение пароля
                    </Typography>
                    <Typography color="primary">Не изменялся</Typography>
                </Stack>
            </Stack>
            <BaseLoadingButton
                loading={isLoading}
                type="submit"
                variant="contained"
                sx={() => ({ alignSelf: 'flex-start' })}
            >
                Изменить пароль
            </BaseLoadingButton>
        </Stack>
    );
};
