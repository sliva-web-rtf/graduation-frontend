import { zodResolver } from '@hookform/resolvers/zod';
import { Box, InputLabel, Stack } from '@mui/material';
import { forwardRef, memo, useCallback, useEffect } from 'react';
import { Path, useForm } from 'react-hook-form';

import { BaseField } from 'shared/ui';
import { PersonalInfoFormSchema, personalInfoFormSchema } from 'widgets/Onboarding/model/types/personalInfoFormSchema';
import { AppError, EntityValidationErrors } from 'shared/lib/types/appError';
import { updateProfile } from 'widgets/Onboarding/api/onboardingApi';
import styles from './PersonalInfoForm.module.scss';

const RequiredMark = () => <span className={styles.requiredMark}>*</span>;

export const PersonalInfoForm = memo(
    forwardRef<HTMLFormElement>((_, ref) => {
        const [updatedProfileInfo, { isLoading, error }] = updateProfile();
        const {
            formState: { errors },
            handleSubmit,
            register,
            setError,
        } = useForm<PersonalInfoFormSchema>({
            mode: 'onBlur',
            resolver: zodResolver(personalInfoFormSchema),
        });

        const onSubmitHandler = useCallback(
            async (values: PersonalInfoFormSchema) => {
                await updatedProfileInfo(values)
                    .then((response) => {
                        console.log(response);
                    })
                    .catch(() => {
                        console.log(1234);
                    });
            },
            [updatedProfileInfo],
        );

        const setValidationErrors = useCallback(
            (validationErrors: EntityValidationErrors<PersonalInfoFormSchema>) => {
                Object.entries(validationErrors).forEach(([field, messageOrError]) => {
                    if (messageOrError !== undefined) {
                        setError(field as Path<PersonalInfoFormSchema>, {
                            type: 'server',
                            message: messageOrError,
                        });
                    }
                });
            },
            [setError],
        );

        useEffect(() => {
            if (error instanceof AppError && error.validationData) {
                setValidationErrors(error.validationData as EntityValidationErrors<PersonalInfoFormSchema>);
            }
        }, [error, setValidationErrors]);

        return (
            <form ref={ref} onSubmit={handleSubmit(onSubmitHandler)} className={styles.form}>
                <Stack spacing={2}>
                    <Stack direction="row" justifyContent="space-between" spacing={1}>
                        <Box sx={{ width: '100%' }}>
                            <InputLabel>
                                Имя <RequiredMark />
                            </InputLabel>
                            <BaseField
                                fullWidth
                                autoComplete="false"
                                {...register('firstName')}
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
                                {...register('lastName')}
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
                            error={Boolean(errors.contacts)}
                            helperText={errors.contacts ? errors.contacts?.message : ' '}
                            FormHelperTextProps={{ style: { backgroundColor: 'transparent' } }}
                        />
                    </Box>
                </Stack>
            </form>
        );
    }),
);
