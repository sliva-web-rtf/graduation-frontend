import { zodResolver } from '@hookform/resolvers/zod';
import { Stack, Typography } from '@mui/material';
import { isEqual } from 'lodash';
import { memo, useCallback, useEffect } from 'react';
import { Controller, Path, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { AppError, EntityValidationErrors } from '@/shared/lib/types/appError';
import { BaseField, BaseSelect } from '@/shared/ui';
import { updateProfessorScientificInfo } from '../../api/onboardingApi';
import { onboardingActions } from '@/widgets/Onboarding/model/slice/onboardingSlice';
import { getStudentScientificInfo } from '../../model/selectors/getStudentScientificInfo';
import { ScientificAreasAutocomplete } from '@/entities/ScientificAreas';
import { ScientificInterestsAutocomplete } from '@/entities/ScietificInterests';
import {
    ProfessorScientificFormSchema,
    professorScientificFormSchema,
} from '../../model/types/professorScientificFormSchema';
import { ProfessorEducationLevelAutoComplete } from '@/entities/EducationLevel';

interface ProfessorScientitificPorfolioFormProps {
    id: string;
    onSuccess?: () => void;
    onRequestStart?: () => void;
    onError?: () => void;
    isDisabled?: boolean;
    initialValues?: ProfessorScientificFormSchema;
}

export const ProfessorScientificPorfolioForm = memo(
    ({ onError, onSuccess, onRequestStart, initialValues, isDisabled, id }: ProfessorScientitificPorfolioFormProps) => {
        const studentScientificPortfolio = useSelector(getStudentScientificInfo);
        const [updatedProfileInfo, { error }] = updateProfessorScientificInfo();
        const dispatch = useAppDispatch();
        const {
            formState: { errors },
            control,
            handleSubmit,
            setError,
        } = useForm<ProfessorScientificFormSchema>({
            defaultValues: initialValues,
            mode: 'onBlur',
            resolver: zodResolver(professorScientificFormSchema),
        });

        const onSubmitHandler = useCallback(
            async (values: ProfessorScientificFormSchema) => {
                onRequestStart?.();
                if (isEqual(values, studentScientificPortfolio)) {
                    onSuccess?.();
                } else {
                    await updatedProfileInfo(values).then((response) => {
                        if ('error' in response) {
                            onError?.();
                        } else {
                            dispatch(onboardingActions.setProfessorScientificPortfolio(values));
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
            (validationErrors: EntityValidationErrors<ProfessorScientificFormSchema>) => {
                Object.entries(validationErrors).forEach(([field, messageOrError]) => {
                    if (messageOrError !== undefined) {
                        setError(field as Path<ProfessorScientificFormSchema>, {
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
                setValidationErrors(error.validationData as EntityValidationErrors<ProfessorScientificFormSchema>);
            }
        }, [error, setValidationErrors]);
        return (
            <form id={id} onSubmit={handleSubmit(onSubmitHandler)} style={{ width: '100%' }}>
                <Typography variant="h2" mb={3}>
                    Научное портфолио
                </Typography>
                <Stack spacing={2}>
                    <Stack direction="row" justifyContent="space-between" spacing={1}>
                        <Controller
                            control={control}
                            name="educationLevel"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <ProfessorEducationLevelAutoComplete
                                    onChange={(_, targetValue) => onChange(targetValue)}
                                    onBlur={onBlur}
                                    value={value ?? []}
                                    placeholder="Ученая степень, ученое звание, должность *"
                                    error={Boolean(errors.educationLevel)}
                                    helperText={errors.educationLevel ? errors.educationLevel?.message : ' '}
                                />
                            )}
                        />
                        <BaseSelect
                            name="workExperienceYears"
                            control={control}
                            label="Стаж *"
                            options={Array.from(Array(51).keys()).slice(1)}
                            disabled={isDisabled}
                            error={Boolean(errors.workExperienceYears)}
                            helperText={errors.workExperienceYears ? errors.workExperienceYears?.message : ' '}
                        />
                    </Stack>
                    <Controller
                        control={control}
                        name="scienceArea"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <ScientificAreasAutocomplete
                                multiple
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
                        name="urfuResearchPortal"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <BaseField
                                multiline
                                fullWidth
                                onChange={onChange}
                                onBlur={onBlur}
                                value={value}
                                label="Профиль UrFU Research Portal *"
                                disabled={isDisabled}
                                autoComplete="false"
                                error={Boolean(errors.urfuResearchPortal)}
                                helperText={errors.urfuResearchPortal ? errors.urfuResearchPortal?.message : ' '}
                                FormHelperTextProps={{ style: { backgroundColor: 'transparent' } }}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="scopus"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <BaseField
                                multiline
                                fullWidth
                                onChange={onChange}
                                onBlur={onBlur}
                                value={value}
                                label="Профиль Scopus *"
                                disabled={isDisabled}
                                autoComplete="false"
                                error={Boolean(errors.scopus)}
                                helperText={errors.scopus ? errors.scopus?.message : ' '}
                                FormHelperTextProps={{ style: { backgroundColor: 'transparent' } }}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="rinc"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <BaseField
                                multiline
                                fullWidth
                                onChange={onChange}
                                onBlur={onBlur}
                                value={value}
                                label="Профиль РИНЦ *"
                                disabled={isDisabled}
                                autoComplete="false"
                                error={Boolean(errors.rinc)}
                                helperText={errors.rinc ? errors.rinc?.message : ' '}
                                FormHelperTextProps={{ style: { backgroundColor: 'transparent' } }}
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
