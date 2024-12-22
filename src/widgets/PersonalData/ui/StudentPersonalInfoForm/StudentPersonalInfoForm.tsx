import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Stack, Typography } from '@mui/material';
import { SyntheticEvent, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { isEqual } from 'lodash';
import { personalInfoFormSchema, PersonalInfoFormSchema } from '../../model/types/personalInfoFormSchema';
import { BaseField } from '@/shared/ui';
import { getProfileInfo } from '../../model/selectors/getProfileInfo';
import { updateStudentProfileInfo } from '../../api/personalDataApi';
import { personalDataActions } from '../../model/slice/personalDataSlice';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

export const StudentPersonalInfoForm = () => {
    const profileInfo = useSelector(getProfileInfo);
    const [updatedProfileInfo, { error }] = updateStudentProfileInfo();
    const dispatch = useAppDispatch();

    const {
        formState: { errors },
        control,
        handleSubmit,
    } = useForm<PersonalInfoFormSchema>({
        mode: 'onBlur',
        resolver: zodResolver(personalInfoFormSchema),
    });

    const onSubmitHandler = useCallback(
        async (values: PersonalInfoFormSchema) => {
            await updatedProfileInfo(values).then(() => {
                console.log('dsadas');
                dispatch(personalDataActions.setStudentUpdatedProfileInfo(values));
            });
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [profileInfo, updatedProfileInfo],
    );

    return (
        <form onBlur={handleSubmit(onSubmitHandler)} style={{ width: '100%' }}>
            <Typography variant="h2" mb={3}>
                Личные данные
            </Typography>
            <Stack spacing={2}>
                <Stack spacing={1}>
                    <Typography variant="bodyXS" color="#00000099">
                        Фамилия Имя Отчество
                    </Typography>
                    <Controller
                        control={control}
                        name="fullName"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <BaseField
                                fullWidth
                                variant="standard"
                                onChange={onChange}
                                onBlur={onBlur}
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
                        render={({ field: { onChange, onBlur, value = '79221750963' } }) => (
                            <BaseField
                                fullWidth
                                variant="standard"
                                onChange={onChange}
                                value={value}
                                onBlur={onBlur}
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
                <Stack spacing={1}>
                    <Typography variant="bodyXS" color="#00000099">
                        Пароль
                    </Typography>
                    <Controller
                        control={control}
                        name="password"
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
            </Stack>
        </form>
    );
};
