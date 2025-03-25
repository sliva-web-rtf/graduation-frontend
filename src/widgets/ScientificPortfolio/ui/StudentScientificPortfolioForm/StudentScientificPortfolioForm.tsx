import { zodResolver } from '@hookform/resolvers/zod';
import { LinearProgress, Stack, Typography } from '@mui/material';
import { memo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { EducationLevelSelect } from '@/entities/EducationLevel';
import { ScientificInterestsAutocomplete } from '@/entities/ScietificInterests';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { BaseField, BaseSelect } from '@/shared/ui';
import { useGetStudentScientificPortfolioQuery } from '../../api/scientificPortfolioApi';
import { scientificPortfolioReducer } from '../../model/slice/scientificPortfolioSlice';
import {
    studentScientificFormSchema,
    StudentScientificFormSchema,
} from '../../model/types/studentScientificFormSchema';

const initialReducers: ReducersList = {
    scientificPortfolio: scientificPortfolioReducer,
};

export const StudentScientificPortfolioForm = memo(() => {
    const { data: portfolio, isFetching } = useGetStudentScientificPortfolioQuery();
    const {
        register,
        formState: { errors },
        control,
        handleSubmit,
        setError,
    } = useForm<StudentScientificFormSchema>({
        resolver: zodResolver(studentScientificFormSchema),
    });

    const onSubmitHandler = () => {};

    if (isFetching) {
        return <LinearProgress />;
    }

    return (
        <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
            <Stack component="form" spacing={2} onSubmit={handleSubmit(onSubmitHandler)}>
                <Stack spacing={1}>
                    <Typography variant="bodyXS" color="#00000099">
                        Уровень образования
                    </Typography>
                    <EducationLevelSelect name="degree" control={control} defaultValue={portfolio?.degree} />
                </Stack>
                <Stack spacing={1}>
                    <Typography variant="bodyXS" color="#00000099">
                        Курс
                    </Typography>
                    <BaseSelect
                        name="year"
                        control={control}
                        options={[1, 2, 3, 4, 5, 6]}
                        defaultValue={portfolio?.year}
                    />
                </Stack>
                <Controller
                    control={control}
                    name="scientificArea"
                    render={({ field }) => (
                        <ScientificInterestsAutocomplete
                            {...field}
                            multiple
                            label="Области науки и технологии"
                            placeholder="Области науки и технологии"
                            onChange={(_, targetValue) => field.onChange(targetValue)}
                            defaultValue={portfolio?.scientificArea}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="scientificInterests"
                    render={({ field }) => (
                        <ScientificInterestsAutocomplete
                            {...field}
                            multiple
                            label="Сферы научных интересов"
                            placeholder="Поиск по научным интересам или ключевым словам"
                            onChange={(_, targetValue) => field.onChange(targetValue)}
                            defaultValue={portfolio?.scientificInterests}
                        />
                    )}
                />
                <BaseField label="О себе" multiline rows={4} {...register('about')} defaultValue={portfolio?.about} />
            </Stack>
        </DynamicModuleLoader>
    );
});
