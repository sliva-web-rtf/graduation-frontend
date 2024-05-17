import { zodResolver } from '@hookform/resolvers/zod';
import { Box, InputLabel, Stack } from '@mui/material';
import { memo } from 'react';
import { useForm } from 'react-hook-form';

import { BaseField } from 'shared/ui';
import { PersonalInfoFormSchema, personalInfoFormSchema } from 'widgets/Onboarding/model/types/personalInfoFormSchema';
import styles from './PersonalInfoForm.module.scss';

const RequiredMark = () => <span className={styles.requiredMark}>*</span>;

export const PersonalInfoForm = memo(() => {
    const {
        formState: { errors },
        handleSubmit,
        register,
        setError,
    } = useForm<PersonalInfoFormSchema>({
        mode: 'onBlur',
        resolver: zodResolver(personalInfoFormSchema),
    });
    return (
        <form className={styles.form}>
            <Stack spacing={2}>
                <Stack direction="row" justifyContent="space-between" spacing={1}>
                    <Box sx={{ width: '100%' }}>
                        <InputLabel>
                            Имя <RequiredMark />
                        </InputLabel>
                        <BaseField
                            fullWidth
                            autoComplete="false"
                            {...register('lastName')}
                            // onChange={onChangeEmail}
                            error={Boolean(errors.lastName)}
                            helperText={errors.lastName ? errors.lastName?.message : ' '}
                            FormHelperTextProps={{ style: { backgroundColor: 'transparent' } }}
                        />
                    </Box>
                    <Box sx={{ width: '100%' }}>
                        <InputLabel>
                            Фамилия <RequiredMark />
                        </InputLabel>
                        <BaseField
                            fullWidth
                            autoComplete="false"
                            {...register('firstName')}
                            // onChange={onChangeEmail}
                            error={Boolean(errors.firstName)}
                            helperText={errors.firstName ? errors.firstName?.message : ' '}
                            FormHelperTextProps={{ style: { backgroundColor: 'transparent' } }}
                        />
                    </Box>
                    <Box sx={{ width: '100%' }}>
                        <InputLabel>
                            Отчество <RequiredMark />
                        </InputLabel>
                        <BaseField
                            fullWidth
                            autoComplete="false"
                            {...register('middleName')}
                            // onChange={onChangeEmail}
                            error={Boolean(errors.middleName)}
                            helperText={errors.middleName ? errors.middleName?.message : ' '}
                            FormHelperTextProps={{ style: { backgroundColor: 'transparent' } }}
                        />
                    </Box>
                </Stack>
                <Box sx={{ width: '100%' }}>
                    <InputLabel>
                        Адрес электронной почты <RequiredMark />
                    </InputLabel>
                    <BaseField
                        fullWidth
                        autoComplete="false"
                        {...register('email')}
                        // onChange={onChangeEmail}
                        error={Boolean(errors.email)}
                        helperText={errors.email ? errors.email?.message : ' '}
                        FormHelperTextProps={{ style: { backgroundColor: 'transparent' } }}
                    />
                </Box>
                <Box sx={{ width: '100%' }}>
                    <InputLabel>Номер телефона</InputLabel>
                    <BaseField
                        fullWidth
                        autoComplete="false"
                        {...register('phone')}
                        // onChange={onChangeEmail}
                        error={Boolean(errors.phone)}
                        helperText={errors.phone ? errors.phone?.message : ' '}
                        FormHelperTextProps={{ style: { backgroundColor: 'transparent' } }}
                    />
                </Box>
                <Box sx={{ width: '100%' }}>
                    <InputLabel>Telegram</InputLabel>
                    <BaseField
                        fullWidth
                        autoComplete="false"
                        {...register('contacts')}
                        // onChange={onChangeEmail}
                        error={Boolean(errors.contacts)}
                        helperText={errors.contacts ? errors.contacts?.message : ' '}
                        FormHelperTextProps={{ style: { backgroundColor: 'transparent' } }}
                    />
                </Box>
            </Stack>
        </form>
    );
});
