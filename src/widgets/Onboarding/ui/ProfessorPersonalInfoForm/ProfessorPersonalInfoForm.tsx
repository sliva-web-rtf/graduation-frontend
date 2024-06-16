import { zodResolver } from '@hookform/resolvers/zod';
import { Stack, Typography } from '@mui/material';
import { isEqual } from 'lodash';
import { memo, useCallback, useEffect } from 'react';
import { Controller, Path, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { AppError, EntityValidationErrors } from '@/shared/lib/types/appError';
import { BaseField } from '@/shared/ui';
import { updateProfessorProfile } from '@/widgets/Onboarding/api/onboardingApi';
import { getProfileInfo } from '@/widgets/Onboarding/model/selectors/getProfileInfo';
import { onboardingActions } from '@/widgets/Onboarding/model/slice/onboardingSlice';
import {
    ProfessorPersonalInfoFormSchema,
    professorPersonalInfoFormSchema,
} from '../../model/types/professorInfoFormSchema';

interface ProfessorPersonalInfoFormProps {
    id: string;
    onSuccess?: () => void;
    onRequestStart?: () => void;
    onError?: () => void;
    isDisabled?: boolean;
    initialValues?: ProfessorPersonalInfoFormSchema;
}

export const ProfessorPersonalInfoForm = memo(
    ({ onError, onSuccess, onRequestStart, initialValues, isDisabled, id }: ProfessorPersonalInfoFormProps) => {
        const profileInfo = useSelector(getProfileInfo);
        const [updatedProfileInfo, { error }] = updateProfessorProfile();
        const dispatch = useAppDispatch();
        const {
            formState: { errors },
            control,
            handleSubmit,
            setError,
        } = useForm<ProfessorPersonalInfoFormSchema>({
            defaultValues: initialValues,
            mode: 'onBlur',
            resolver: zodResolver(professorPersonalInfoFormSchema),
        });

        const onSubmitHandler = useCallback(
            async (values: ProfessorPersonalInfoFormSchema) => {
                onRequestStart?.();
                if (isEqual(values, profileInfo)) {
                    onSuccess?.();
                } else {
                    await updatedProfileInfo(values).then((response) => {
                        if ('error' in response) {
                            onError?.();
                        } else {
                            dispatch(onboardingActions.setProfessorUpdatedProfileInfo(values));
                            onSuccess?.();
                        }
                    });
                }
            },
            // eslint-disable-next-line react-hooks/exhaustive-deps
            [profileInfo, updatedProfileInfo],
        );

        useEffect(() => {
            if (Object.keys(errors).length > 0) {
                onError?.();
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [errors]);

        const setValidationErrors = useCallback(
            (validationErrors: EntityValidationErrors<ProfessorPersonalInfoFormSchema>) => {
                Object.entries(validationErrors).forEach(([field, messageOrError]) => {
                    if (messageOrError !== undefined) {
                        setError(field as Path<ProfessorPersonalInfoFormSchema>, {
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
                setValidationErrors(error.validationData as EntityValidationErrors<ProfessorPersonalInfoFormSchema>);
            }
        }, [error, setValidationErrors]);

        return (
            <form id={id} onSubmit={handleSubmit(onSubmitHandler)} style={{ width: '100%' }}>
                <Typography variant="h2" mb={3}>
                    Личные данные
                </Typography>
                <Stack spacing={2}>
                    <Stack direction="row" justifyContent="space-between" spacing={1}>
                        <Controller
                            control={control}
                            name="firstName"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <BaseField
                                    fullWidth
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                    label="Имя *"
                                    disabled={isDisabled}
                                    autoComplete="false"
                                    error={Boolean(errors.firstName)}
                                    helperText={errors.firstName ? errors.firstName?.message : ' '}
                                    FormHelperTextProps={{ style: { backgroundColor: 'transparent' } }}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="lastName"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <BaseField
                                    fullWidth
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                    label="Фамилия *"
                                    disabled={isDisabled}
                                    autoComplete="false"
                                    error={Boolean(errors.lastName)}
                                    helperText={errors.lastName ? errors.lastName?.message : ' '}
                                    FormHelperTextProps={{ style: { backgroundColor: 'transparent' } }}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="middleName"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <BaseField
                                    fullWidth
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                    label="Отчество *"
                                    disabled={isDisabled}
                                    autoComplete="false"
                                    error={Boolean(errors.middleName)}
                                    helperText={errors.middleName ? errors.middleName?.message : ' '}
                                    FormHelperTextProps={{ style: { backgroundColor: 'transparent' } }}
                                />
                            )}
                        />
                    </Stack>
                    <Controller
                        control={control}
                        name="email"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <BaseField
                                fullWidth
                                onChange={onChange}
                                onBlur={onBlur}
                                value={value}
                                label="Адрес электронной почты *"
                                disabled={isDisabled}
                                autoComplete="false"
                                error={Boolean(errors.email)}
                                helperText={errors.email ? errors.email?.message : ' '}
                                FormHelperTextProps={{ style: { backgroundColor: 'transparent' } }}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="phone"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <BaseField
                                fullWidth
                                onChange={onChange}
                                onBlur={onBlur}
                                value={value}
                                label="Телефон"
                                disabled={isDisabled}
                                autoComplete="false"
                                error={Boolean(errors.phone)}
                                helperText={errors.phone ? errors.phone?.message : ' '}
                                FormHelperTextProps={{ style: { backgroundColor: 'transparent' } }}
                            />
                        )}
                    />
                </Stack>
            </form>
        );
    },
);
