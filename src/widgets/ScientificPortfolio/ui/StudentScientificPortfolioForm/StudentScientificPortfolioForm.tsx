import { Stack, Typography } from '@mui/material';
import { memo, SyntheticEvent, useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { zodResolver } from '@hookform/resolvers/zod';
import { EducationLevelSelect } from '@/entities/EducationLevel';
import { BaseField, BaseSelect } from '@/shared/ui';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { scientificPortfolioActions, scientificPortfolioReducer } from '../../model/slice/scientificPortfolioSlice';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { ScientificAreasAutocomplete } from '@/entities/ScientificAreas';
import { ScientificInterestsAutocomplete } from '@/entities/ScietificInterests';
import {
    studentScientificFormSchema,
    StudentScientificFormSchema,
} from '../../model/types/studentScientificFormSchema';

const initialReducers: ReducersList = {
    scientificPortfolio: scientificPortfolioReducer,
};

export const StudentScientificPortfolioForm = memo(() => {
    const {
        formState: { errors },
        control,
        handleSubmit,
        setError,
    } = useForm<StudentScientificFormSchema>({
        resolver: zodResolver(studentScientificFormSchema),
    });
    const onSubmitHandler = () => {};
    return (
        <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
            <form onSubmit={handleSubmit(onSubmitHandler)}>
                <Stack spacing={2}>
                    <Stack spacing={1}>
                        <Typography variant="bodyXS" color="#00000099">
                            Уровень образования
                        </Typography>
                        <EducationLevelSelect name="educationLevel" control={control} />
                    </Stack>
                    <Stack spacing={1}>
                        <Typography variant="bodyXS" color="#00000099">
                            Курс
                        </Typography>
                        <BaseSelect name="course" control={control} options={[1, 2, 3, 4, 5, 6]} />
                    </Stack>
                    <Stack spacing={1}>
                        <Typography variant="bodyXS" color="#00000099">
                            Области науки и технологии
                        </Typography>
                        <Controller
                            control={control}
                            name="scienceArea"
                            render={({ field: { onChange, value } }) => (
                                <ScientificAreasAutocomplete
                                    multiple
                                    limitTags={1}
                                    onChange={(_, targetValue) => onChange(targetValue)}
                                    value={value}
                                    placeholder="Область науки и технологий"
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
