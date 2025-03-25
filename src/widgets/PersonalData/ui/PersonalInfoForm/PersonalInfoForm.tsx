import { zodResolver } from '@hookform/resolvers/zod';
import { LinearProgress, Stack, Typography } from '@mui/material';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { BaseButton, BaseField } from '@/shared/ui';
import { getProfileInfo, updateProfileInfoPD } from '../../api/personalDataApi';
import { personalInfoFormSchema, PersonalInfoFormSchema } from '../../model/types/personalInfoFormSchema';

export const PersonalInfoForm = () => {
    const { data, isFetching: isInfoFetching } = getProfileInfo();
    const [updatingProfileInfo, { isLoading, error }] = updateProfileInfoPD();
    const lastPasswordChangedDate = data?.lastPasswordChangedDate
        ? new Date(data?.lastPasswordChangedDate).toLocaleString()
        : 'Не изменялся';

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<PersonalInfoFormSchema>({
        resolver: zodResolver(personalInfoFormSchema),
    });

    const onSubmitHandler = useCallback(
        async (values: PersonalInfoFormSchema) => {
            await updatingProfileInfo(values);
        },
        [updatingProfileInfo],
    );

    if (isInfoFetching || !data) {
        return <LinearProgress />;
    }

    return (
        <Stack component="form" onSubmit={handleSubmit(onSubmitHandler)} spacing={3}>
            <Typography variant="h2">Личные данные</Typography>
            <Stack spacing={2}>
                <BaseField
                    label="Имя"
                    {...register('firstName')}
                    defaultValue={data?.firstName}
                    error={Boolean(errors.firstName)}
                    helperText={errors.firstName?.message}
                />
                <BaseField
                    label="Фамилия"
                    {...register('lastName')}
                    defaultValue={data?.lastName}
                    error={Boolean(errors.lastName)}
                    helperText={errors.lastName?.message}
                />
                <BaseField
                    label="Отчество"
                    {...register('patronymic')}
                    defaultValue={data?.patronymic}
                    error={Boolean(errors.patronymic)}
                    helperText={errors.patronymic?.message}
                />
                <BaseField
                    label="Электронная почта"
                    {...register('email')}
                    defaultValue={data?.email}
                    error={Boolean(errors.email)}
                    helperText={errors.email?.message}
                />
                <BaseField
                    label="Номер телефона"
                    {...register('phone')}
                    defaultValue={data?.phone}
                    error={Boolean(errors.phone)}
                    helperText={errors.phone?.message}
                />
                <BaseField
                    label="Telegram"
                    {...register('contacts')}
                    defaultValue={data?.contacts}
                    error={Boolean(errors.contacts)}
                    helperText={errors.contacts?.message}
                />
                <Stack>
                    <Typography variant="bodyXS" color="#00000099">
                        Последнее изменение пароля
                    </Typography>
                    <Typography color="primary">{lastPasswordChangedDate}</Typography>
                </Stack>
            </Stack>
            <BaseButton disabled={isLoading} type="submit" variant="contained" sx={() => ({ alignSelf: 'center' })}>
                Изменить данные
            </BaseButton>
        </Stack>
    );
};
