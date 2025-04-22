import { BaseAlert, BaseLoadingButton, HelperText, PasswordField } from '@/shared/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { Stack } from '@mui/material';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { updatePassword } from '../../api/personalDataApi';
import { changePasswordFormSchema, ChangePasswordFormSchema } from '../../model/types/changePasswordFormSchema';

export const ChangePasswordForm = () => {
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
            </Stack>
            <BaseAlert severity="info"> Последнее изменение пароля: Не изменялся</BaseAlert>
            <BaseLoadingButton
                disabled
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
