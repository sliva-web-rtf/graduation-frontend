import { useUserQuery } from '@/entities/User';
import { BaseField, BaseLoadingButton } from '@/shared/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { LinearProgress, Stack } from '@mui/material';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { updateProfileInfoPD } from '../../api/personalDataApi';
import { personalInfoFormSchema, PersonalInfoFormSchema } from '../../model/types/personalInfoFormSchema';

export const PersonalInfoForm = () => {
    const { data, isFetching: isUserFetching } = useUserQuery();
    // const { data, isFetching: isInfoFetching } = getProfileInfo();
    const [updatingProfileInfo, { isLoading }] = updateProfileInfoPD();

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

    if (isUserFetching) {
        return <LinearProgress />;
    }

    return (
        <Stack spacing={4} component="form" onSubmit={handleSubmit(onSubmitHandler)}>
            <Stack spacing={2}>
                <BaseField
                    label="Фамилия"
                    {...register('lastName')}
                    defaultValue={data?.lastName}
                    error={Boolean(errors.lastName)}
                    helperText={errors.lastName?.message}
                />
                <BaseField
                    label="Имя"
                    {...register('firstName')}
                    defaultValue={data?.firstName}
                    error={Boolean(errors.firstName)}
                    helperText={errors.firstName?.message}
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
                <BaseField label="Направление" />
                <BaseField label="Группа" />
                <BaseField
                    label="О себе"
                    {...register('phone')}
                    multiline
                    rows={5}
                    defaultValue={data?.phone}
                    error={Boolean(errors.phone)}
                    helperText={errors.phone?.message}
                />
                <BaseField
                    label="Контакты"
                    {...register('contacts')}
                    multiline
                    rows={3}
                    defaultValue={data?.contacts}
                    error={Boolean(errors.contacts)}
                    helperText={errors.contacts?.message}
                />
            </Stack>
            <BaseLoadingButton
                disabled
                loading={isLoading}
                type="submit"
                variant="contained"
                sx={() => ({ alignSelf: 'flex-start' })}
            >
                Изменить данные
            </BaseLoadingButton>
        </Stack>
    );
};
