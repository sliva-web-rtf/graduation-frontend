import React, { memo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Stack, Typography } from '@mui/material';
import {
    professorScientificFormSchema,
    ProfessorScientificFormSchema,
} from '../../model/types/professorScientificFormSchema';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { scientificPortfolioReducer } from '../../model/slice/scientificPortfolioSlice';
import { ProfessorEducationLevelAutoComplete } from '@/entities/EducationLevel';
import { ScientificAreasAutocomplete } from '@/entities/ScientificAreas';
import { ScientificInterestsAutocomplete } from '@/entities/ScietificInterests';
import { BaseField } from '@/shared/ui';

const initialReducers: ReducersList = {
    scientificPortfolio: scientificPortfolioReducer,
};

export const ProfessorScientificPortfolioForm = memo(() => {
    const {
        formState: { errors },
        control,
        handleSubmit,
        setError,
    } = useForm<ProfessorScientificFormSchema>({
        resolver: zodResolver(professorScientificFormSchema),
    });
    const onSubmitHandler = () => {};
    return (
        <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
            <form onSubmit={handleSubmit(onSubmitHandler)}>
                <Stack spacing={2}>
                    <Stack spacing={1}>
                        <Typography variant="bodyXS" color="#00000099">
                            Ученая степень, ученое звание, должность
                        </Typography>
                        <Controller
                            control={control}
                            name="educationLevel"
                            render={({ field: { onChange, value } }) => (
                                <ProfessorEducationLevelAutoComplete
                                    onChange={(_, targetValue) => onChange(targetValue)}
                                    value={value ?? []}
                                />
                            )}
                        />
                    </Stack>
                    <Stack spacing={1}>
                        <Typography variant="bodyXS" color="#00000099">
                            Области науки и технологий
                        </Typography>
                        <Controller
                            control={control}
                            name="scienceArea"
                            render={({ field: { onChange, value } }) => (
                                <ScientificAreasAutocomplete
                                    multiple
                                    onChange={(_, targetValue) => onChange(targetValue)}
                                    value={value}
                                    limitTags={1}
                                    placeholder="Области науки и технологий"
                                    name="scienceArea"
                                />
                            )}
                        />
                    </Stack>
                    <Stack spacing={1}>
                        <Typography variant="bodyXS" color="#00000099">
                            Сферы научных интересов
                        </Typography>
                        <Controller
                            control={control}
                            name="scienceInterests"
                            render={({ field: { onChange, value } }) => (
                                <ScientificInterestsAutocomplete
                                    multiple
                                    placeholder="Поиск по научным интересам или ключевым словам"
                                    limitTags={1}
                                    onChange={(_, targetValue) => onChange(targetValue)}
                                    value={value}
                                />
                            )}
                        />
                    </Stack>
                    <Stack spacing={1}>
                        <Typography variant="bodyXS" color="#00000099">
                            Профиль UrFU Research Portal
                        </Typography>
                        <Controller
                            control={control}
                            name="urfuResearchPortal"
                            render={({ field: { onChange, value } }) => (
                                <BaseField
                                    multiline
                                    fullWidth
                                    onChange={onChange}
                                    value={value}
                                    autoComplete="false"
                                    sx={{
                                        '& .MuiFilledInput-root': {
                                            padding: '15px 12px',
                                        },
                                    }}
                                />
                            )}
                        />
                    </Stack>
                    <Stack spacing={1}>
                        <Typography variant="bodyXS" color="#00000099">
                            Профиль Scopus
                        </Typography>
                        <Controller
                            control={control}
                            name="scopus"
                            render={({ field: { onChange, value } }) => (
                                <BaseField
                                    multiline
                                    fullWidth
                                    onChange={onChange}
                                    value={value}
                                    autoComplete="false"
                                    sx={{
                                        '& .MuiFilledInput-root': {
                                            padding: '15px 12px',
                                        },
                                    }}
                                />
                            )}
                        />
                    </Stack>
                    <Stack spacing={1}>
                        <Typography variant="bodyXS" color="#00000099">
                            Профиль РИНЦ
                        </Typography>
                        <Controller
                            control={control}
                            name="rinc"
                            render={({ field: { onChange, value } }) => (
                                <BaseField
                                    multiline
                                    fullWidth
                                    onChange={onChange}
                                    value={value}
                                    autoComplete="false"
                                    sx={{
                                        '& .MuiFilledInput-root': {
                                            padding: '15px 12px',
                                        },
                                    }}
                                />
                            )}
                        />
                    </Stack>
                    <Stack spacing={1}>
                        <Typography variant="bodyXS" color="#00000099">
                            О себе
                        </Typography>
                        <Controller
                            control={control}
                            name="about"
                            render={({ field: { onChange, value } }) => (
                                <BaseField
                                    variant="standard"
                                    defaultValue="Моя область научных исследований..."
                                    onChange={onChange}
                                    value={value}
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
        </DynamicModuleLoader>
    );
});
