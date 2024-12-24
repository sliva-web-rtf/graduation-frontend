import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useEffect } from 'react';
import { Stack, Typography } from '@mui/material';
import { getStudentProfile, updateStudentProfileInfo } from '../../api/personalDataApi';
import { personalInfoFormSchema, PersonalInfoFormSchema } from '../../model/types/personalInfoFormSchema';
import { BaseButton, BaseField } from '@/shared/ui';

export const PersonalInfoForm = () => {
    const { data } = getStudentProfile();
    const [updatedProfileInfo, { error }] = updateStudentProfileInfo();

    const {
        formState: { errors },
        control,
        handleSubmit,
        reset,
    } = useForm<PersonalInfoFormSchema>({
        resolver: zodResolver(personalInfoFormSchema),
    });

    const onSubmitHandler = useCallback(
        async (values: PersonalInfoFormSchema) => {
            await updatedProfileInfo(values);
        },
        [updatedProfileInfo],
    );

    useEffect(() => {
        if (data) {
            reset({
                firstName: data.firstName,
                lastName: data.lastName,
                patronymic: data.patronymic,
                email: data.email,
                phone: data.phone,
                contacts: data.contacts,
                lastPasswordChangedDate: data.lastPasswordChangedDate ?? '',
            });
        }
    }, [data, reset]);

    return (
        <form
            onSubmit={handleSubmit(onSubmitHandler)}
            style={{ width: '100%', display: 'flex', flexDirection: 'column' }}
        >
            <Typography variant="h2" mb={3}>
                Личные данные
            </Typography>
            <Stack spacing={2}>
                <Stack spacing={1}>
                    <Typography variant="bodyXS" color="#00000099">
                        Имя
                    </Typography>
                    <Controller
                        control={control}
                        name="firstName"
                        render={({ field: { onChange, value } }) => (
                            <BaseField
                                fullWidth
                                variant="standard"
                                onChange={onChange}
                                value={value}
                                autoComplete="false"
                                sx={(theme) => ({
                                    '& .MuiInputBase-root': {
                                        padding: [theme.spacing(1.4), theme.spacing(1)].join(' '),
                                    },
                                })}
                            />
                        )}
                    />
                </Stack>
                <Stack spacing={1}>
                    <Typography variant="bodyXS" color="#00000099">
                        Фамилия
                    </Typography>
                    <Controller
                        control={control}
                        name="lastName"
                        render={({ field: { onChange, value } }) => (
                            <BaseField
                                fullWidth
                                variant="standard"
                                onChange={onChange}
                                value={value}
                                autoComplete="false"
                                sx={(theme) => ({
                                    '& .MuiInputBase-root': {
                                        padding: [theme.spacing(1.4), theme.spacing(1)].join(' '),
                                    },
                                })}
                            />
                        )}
                    />
                </Stack>
                <Stack spacing={1}>
                    <Typography variant="bodyXS" color="#00000099">
                        Отчество
                    </Typography>
                    <Controller
                        control={control}
                        name="patronymic"
                        render={({ field: { onChange, value } }) => (
                            <BaseField
                                fullWidth
                                variant="standard"
                                onChange={onChange}
                                value={value}
                                autoComplete="false"
                                sx={(theme) => ({
                                    '& .MuiInputBase-root': {
                                        padding: [theme.spacing(1.4), theme.spacing(1)].join(' '),
                                    },
                                })}
                            />
                        )}
                    />
                </Stack>
                <Stack spacing={1}>
                    <Typography variant="bodyXS" color="#00000099">
                        Адрес электронной почты
                    </Typography>
                    <Controller
                        control={control}
                        name="email"
                        render={({ field: { onChange, value } }) => (
                            <BaseField
                                fullWidth
                                variant="standard"
                                onChange={onChange}
                                value={value}
                                autoComplete="false"
                                sx={(theme) => ({
                                    '& .MuiInputBase-root': {
                                        padding: [theme.spacing(1.4), theme.spacing(1)].join(' '),
                                    },
                                })}
                            />
                        )}
                    />
                </Stack>
                <Stack spacing={1}>
                    <Typography variant="bodyXS" color="#00000099">
                        Номер телефона
                    </Typography>
                    <Controller
                        control={control}
                        name="phone"
                        render={({ field: { onChange, value } }) => (
                            <BaseField
                                fullWidth
                                variant="standard"
                                onChange={onChange}
                                value={value}
                                autoComplete="false"
                                sx={(theme) => ({
                                    '& .MuiInputBase-root': {
                                        padding: [theme.spacing(1.4), theme.spacing(1)].join(' '),
                                    },
                                })}
                            />
                        )}
                    />
                </Stack>
                <Stack spacing={1}>
                    <Typography variant="bodyXS" color="#00000099">
                        Telegram
                    </Typography>
                    <Controller
                        control={control}
                        name="contacts"
                        render={({ field: { onChange, value } }) => (
                            <BaseField
                                fullWidth
                                variant="standard"
                                onChange={onChange}
                                value={value}
                                autoComplete="false"
                                sx={(theme) => ({
                                    '& .MuiInputBase-root': {
                                        padding: [theme.spacing(1.4), theme.spacing(1)].join(' '),
                                    },
                                })}
                            />
                        )}
                    />
                </Stack>
                {data?.lastPasswordChangedDate && (
                    <Stack spacing={1}>
                        <Typography variant="bodyXS" color="#00000099">
                            Последнее изменение пароля
                        </Typography>
                        <Controller
                            control={control}
                            name="lastPasswordChangedDate"
                            render={({ field: { value, onChange } }) => (
                                <BaseField
                                    disabled
                                    fullWidth
                                    variant="standard"
                                    value={value}
                                    onChange={onChange}
                                    autoComplete="false"
                                    sx={(theme) => ({
                                        '& .MuiInputBase-root': {
                                            padding: [theme.spacing(1.4), theme.spacing(1)].join(' '),
                                        },
                                    })}
                                />
                            )}
                        />
                    </Stack>
                )}
            </Stack>
            <BaseButton type="submit" variant="contained" sx={() => ({ alignSelf: 'center', marginTop: 2 })}>
                Изменить
            </BaseButton>
        </form>
    );
};
