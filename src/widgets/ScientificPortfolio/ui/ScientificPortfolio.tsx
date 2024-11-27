import { Stack, Typography } from '@mui/material';
import { memo, SyntheticEvent, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { BaseSelect, EditingField } from '@/shared/ui';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { ScientificInterestsAutocomplete } from '@/entities/ScietificInterests';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { scientificPortfolioActions, scientificPortfolioReducer } from '../model/slice/scientificPortfolioSlice';
import { createOrderedInputs, professorSpecificInputs, studentSpecificInputs } from '../lib/const';
import { isUserProfessor } from '@/entities/User';
import { ScientificAreasAutocomplete } from '@/entities/ScientificAreas';
import { EducationLevelSelect } from '@/entities/EducationLevel';
import { StudentScientificPortfolioForm } from './StudentScientificPortfolioForm/StudentScientificPortfolioForm';
import { ProfessorScientificPortfolioForm } from '..';

const initialReducers: ReducersList = {
    scientificPortfolio: scientificPortfolioReducer,
};

export const ScientificPortfolio = memo(() => {
    const isProfessor = useSelector(isUserProfessor);

    return (
        <Stack width={650} spacing={3}>
            <Typography variant="h2">Научное портфолио</Typography>
            {isProfessor ? <ProfessorScientificPortfolioForm /> : <StudentScientificPortfolioForm />}
        </Stack>
    );
});
