import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Stack, Typography } from '@mui/material';
import { BaseField } from '@/shared/ui';
import {
    professorPersonalInfoFormSchema,
    ProfessorPersonalInfoFormSchema,
} from '../../model/types/professorPersonalInfoFormSchema';

export const ProfessorPersonalInfoForm = () => {
    const { control, handleSubmit } = useForm<ProfessorPersonalInfoFormSchema>({
        resolver: zodResolver(professorPersonalInfoFormSchema),
    });
    return (
        <form style={{ width: '100%' }}>
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
