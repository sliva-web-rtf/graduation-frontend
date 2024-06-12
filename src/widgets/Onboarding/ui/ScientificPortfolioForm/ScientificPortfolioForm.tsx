import { zodResolver } from '@hookform/resolvers/zod';
import { Stack, Typography } from '@mui/material';
import { isEqual } from 'lodash';
import { memo, useCallback, useEffect } from 'react';
import { Controller, Path, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { AppError, EntityValidationErrors } from '@/shared/lib/types/appError';
import { BaseField, BaseSelect } from '@/shared/ui';
import { updateStudentScientificInfo } from '../../api/onboardingApi';
import { onboardingActions } from '@/widgets/Onboarding/model/slice/onboardingSlice';
import { ScientificFormSchema, scientificFormSchema } from '../../model/types/scientificFormSchema';
import { getStudentScientificInfo } from '../../model/selectors/getStudentScientificInfo';
import { EducationLevelSelect } from '@/entities/EducationLevel';
import { ScientificAreasAutocomplete } from '@/entities/ScientificAreas';
import { ScientificInterestsAutocomplete } from '@/entities/ScietificInterests';

interface StudentScientitificPorfolioFormProps {
    id: string;
    onSuccess?: () => void;
    onRequestStart?: () => void;
    onError?: () => void;
    isDisabled?: boolean;
    initialValues?: ScientificFormSchema;
}

export const StudentScientificPorfolioForm = memo(
    ({ onError, onSuccess, onRequestStart, initialValues, isDisabled, id }: StudentScientitificPorfolioFormProps) => {
        const studentScientificPortfolio = useSelector(getStudentScientificInfo);
        const [updatedProfileInfo, { error }] = updateStudentScientificInfo();
        const dispatch = useAppDispatch();
        const {
            formState: { errors },
            control,
            handleSubmit,
            setError,
        } = useForm<ScientificFormSchema>({
            defaultValues: initialValues,
            mode: 'onBlur',
            resolver: zodResolver(scientificFormSchema),
        });

        const onSubmitHandler = useCallback(
            async (values: ScientificFormSchema) => {
                onRequestStart?.();
                if (isEqual(values, studentScientificPortfolio)) {
                    onSuccess?.();
                } else {
                    await updatedProfileInfo(values).then((response) => {
                        if ('error' in response) {
                            onError?.();
                        } else {
                            dispatch(onboardingActions.setStudentScientificInfo(values));
                            onSuccess?.();
                        }
                    });
                }
            },
            // eslint-disable-next-line react-hooks/exhaustive-deps
            [studentScientificPortfolio, updatedProfileInfo],
        );

        useEffect(() => {
            if (Object.keys(errors).length > 0) {
                onError?.();
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [errors]);

        const setValidationErrors = useCallback(
            (validationErrors: EntityValidationErrors<ScientificFormSchema>) => {
                Object.entries(validationErrors).forEach(([field, messageOrError]) => {
                    if (messageOrError !== undefined) {
                        setError(field as Path<ScientificFormSchema>, {
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
                setValidationErrors(error.validationData as EntityValidationErrors<ScientificFormSchema>);
            }
        }, [error, setValidationErrors]);
        return (
            <form id={id} onSubmit={handleSubmit(onSubmitHandler)} style={{ width: '100%' }}>
                <Typography variant="h2" mb={3}>
                    Научное портфолио
                </Typography>
                <Stack spacing={2}>
                    <Stack direction="row" justifyContent="space-between" spacing={1}>
                        <EducationLevelSelect
                            name="educationLevel"
                            control={control}
                            label="Фамилия *"
                            disabled={isDisabled}
                            error={Boolean(errors.educationLevel)}
                            helperText={errors.educationLevel ? errors.educationLevel?.message : ' '}
                        />
                        <BaseSelect
                            name="course"
                            control={control}
                            label="Курс *"
                            options={[1, 2, 3, 4, 5]}
                            disabled={isDisabled}
                            error={Boolean(errors.educationLevel)}
                            helperText={errors.educationLevel ? errors.educationLevel?.message : ' '}
                        />
                    </Stack>
                    <Controller
                        control={control}
                        name="scienceArea"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <ScientificAreasAutocomplete
                                onChange={(_, targetValue) => onChange(targetValue)}
                                onBlur={onBlur}
                                value={value}
                                limitTags={1}
                                placeholder="Области науки и технологий"
                                name="scienceArea"
                                error={Boolean(errors.scienceArea)}
                                helperText={errors.scienceArea ? errors.scienceArea?.message : ' '}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="scienceInterests"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <ScientificInterestsAutocomplete
                                multiple
                                onChange={(_, targetValue) => onChange(targetValue)}
                                onBlur={onBlur}
                                value={value ?? []}
                                limitTags={1}
                                placeholder="Сферы научных интересов *"
                                error={Boolean(errors.scienceInterests)}
                                helperText={errors.scienceInterests ? errors.scienceInterests?.message : ' '}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="about"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <BaseField
                                multiline
                                fullWidth
                                onChange={onChange}
                                onBlur={onBlur}
                                value={value}
                                label="О себе"
                                disabled={isDisabled}
                                autoComplete="false"
                                error={Boolean(errors.about)}
                                helperText={errors.about ? errors.about?.message : ' '}
                                FormHelperTextProps={{ style: { backgroundColor: 'transparent' } }}
                            />
                        )}
                    />
                </Stack>
            </form>
        );
    },
);
