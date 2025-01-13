import { Stack, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BaseButton, BaseField, BaseLoadingButton, HelperText } from '@/shared/ui';
import { oneTimeCodeFormSchema, OneTimeCodeFormSchema } from '../model/types/oneTimeCodeFormSchema';

// @todo
// Как бэк будет готов, нужно сделать нормальный onSubmitHandler

export const OneTimeCodeForm = () => {
    const onSubmitHandler = () => {};

    const {
        formState: { errors },
        setError,
        register,
        handleSubmit,
    } = useForm<OneTimeCodeFormSchema>({
        resolver: zodResolver(oneTimeCodeFormSchema),
    });

    return (
        <Stack spacing={3}>
            <Stack spacing={1}>
                <Typography variant="h3" textAlign="center">
                    Введите код подтверждения
                </Typography>
                <Typography textAlign="center">Отправили на почту </Typography>
            </Stack>
            <form onSubmit={handleSubmit(onSubmitHandler)}>
                <Stack spacing={3}>
                    <Stack>
                        <BaseField
                            label="Код"
                            {...register('code')}
                            error={Boolean(errors.code)}
                            helperText={<HelperText error={errors.code} />}
                            inputProps={{
                                maxLength: 6,
                                onInput: (e: React.ChangeEvent<HTMLInputElement>) => {
                                    e.target.value = e.target.value.replace(/[^0-9]/g, '');
                                },
                            }}
                        />
                    </Stack>
                    <Stack justifyContent="space-between">
                        <BaseLoadingButton type="submit" variant="contained">
                            Продолжить
                        </BaseLoadingButton>
                        <BaseButton>Отправить код повторно</BaseButton>
                    </Stack>
                </Stack>
            </form>
        </Stack>
    );
};
