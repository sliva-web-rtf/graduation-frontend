import { zodResolver } from '@hookform/resolvers/zod';
import { LinearProgress, Stack } from '@mui/material';
import { memo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ProfessorEducationLevelAutoComplete } from '@/entities/EducationLevel';
import { ScientificAreasAutocomplete } from '@/entities/ScientificAreas';
import { ScientificInterestsAutocomplete } from '@/entities/ScietificInterests';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { BaseField } from '@/shared/ui';
import { useGetProfessorScientificPortfolioQuery } from '../../api/scientificPortfolioApi';
import { scientificPortfolioReducer } from '../../model/slice/scientificPortfolioSlice';
import {
    professorScientificFormSchema,
    ProfessorScientificFormSchema,
} from '../../model/types/professorScientificFormSchema';

const initialReducers: ReducersList = {
    scientificPortfolio: scientificPortfolioReducer,
};

export const ProfessorScientificPortfolioForm = memo(() => {
    const { data: portfolio, isFetching } = useGetProfessorScientificPortfolioQuery();

    const {
        formState: { errors },
        control,
        handleSubmit,
        register,
        setError,
    } = useForm<ProfessorScientificFormSchema>({
        resolver: zodResolver(professorScientificFormSchema),
    });

    const onSubmitHandler = () => {};

    if (isFetching || !portfolio) {
        return <LinearProgress />;
    }

    return (
        <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
            <Stack component="form" spacing={2} onSubmit={handleSubmit(onSubmitHandler)}>
                <Controller
                    control={control}
                    name="degree"
                    render={({ field }) => (
                        <ProfessorEducationLevelAutoComplete
                            {...field}
                            label="Ученая степень, ученое звание, должность"
                            onChange={(_, targetValue) => field.onChange(targetValue)}
                            defaultValue={portfolio?.degree}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="scientificArea"
                    render={({ field }) => (
                        <ScientificAreasAutocomplete
                            {...field}
                            multiple
                            label="Области науки и технологий"
                            placeholder="Области науки и технологий"
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
                <BaseField
                    label="Профиль UrFU Research Portal"
                    {...register('urfuResearchPortal')}
                    defaultValue={portfolio?.urfuResearchPortal}
                />
                <BaseField label="Профиль Scopus" {...register('scopusUri')} defaultValue={portfolio?.riscUri} />
                <BaseField label="Профиль РИНЦ" {...register('riscUri')} defaultValue={portfolio?.riscUri} />
                <BaseField label="О себе" multiline rows={4} {...register('about')} defaultValue={portfolio?.about} />
            </Stack>
        </DynamicModuleLoader>
    );
});
