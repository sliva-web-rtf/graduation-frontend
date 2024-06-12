import { zodResolver } from '@hookform/resolvers/zod';
import { Stack } from '@mui/material';
import { isEqual } from 'lodash';
import { memo, useCallback, useEffect } from 'react';
import { Controller, Path, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { AppError, EntityValidationErrors } from '@/shared/lib/types/appError';
import { BaseField } from '@/shared/ui';
import { updateProfile } from '@/widgets/Onboarding/api/onboardingApi';
import { getProfileInfo } from '@/widgets/Onboarding/model/selectors/getProfileInfo';
import { onboardingActions } from '@/widgets/Onboarding/model/slice/onboardingSlice';
import {
    PersonalInfoFormSchema,
    personalInfoFormSchema,
} from '@/widgets/Onboarding/model/types/personalInfoFormSchema';
import styles from './PersonalInfoForm.module.scss';

interface PersonalInfoFormProps {
    id: string;
    onSuccess?: () => void;
    onRequestStart?: () => void;
    onError?: () => void;
    isDisabled?: boolean;
    initialValues?: PersonalInfoFormSchema;
}

export const PersonalInfoForm = memo(
    ({ onError, onSuccess, onRequestStart, initialValues, isDisabled, id }: PersonalInfoFormProps) => {
        const profileInfo = useSelector(getProfileInfo);
        const [updatedProfileInfo, { error }] = updateProfile();
        const dispatch = useAppDispatch();
        const {
            formState: { errors },
            control,
            handleSubmit,
            setError,
        } = useForm<PersonalInfoFormSchema>({
            defaultValues: initialValues,
            mode: 'onBlur',
            resolver: zodResolver(personalInfoFormSchema),
        });

        const onSubmitHandler = useCallback(
            async (values: PersonalInfoFormSchema) => {
                onRequestStart?.();
                if (isEqual(values, profileInfo)) {
                    onSuccess?.();
                } else {
                    await updatedProfileInfo(values).then((response) => {
                        if ('error' in response) {
                            onError?.();
                        } else {
                            dispatch(onboardingActions.setUpdatedProfileInfo(values));
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
            <form id={id} onSubmit={handleSubmit(onSubmitHandler)} className={styles.form}>
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
                    <Controller
                        control={control}
                        name="contacts"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <BaseField
                                fullWidth
                                onChange={onChange}
                                onBlur={onBlur}
                                value={value}
                                label="Telegram"
                                disabled={isDisabled}
                                autoComplete="false"
                                error={Boolean(errors.contacts)}
                                helperText={errors.contacts ? errors.contacts?.message : ' '}
                                FormHelperTextProps={{ style: { backgroundColor: 'transparent' } }}
                            />
                        )}
                    />
                </Stack>
            </form>
        );
    },
);
