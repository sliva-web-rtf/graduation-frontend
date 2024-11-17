import { FormControl, InputLabel, Stack, TextField, Typography } from '@mui/material';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { BaseField, EditingField } from '@/shared/ui';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { ScientificInterestsAutocomplete } from '@/entities/ScietificInterests';
import { getScientificInterests } from '../model/selectors/getScientificInterests/getScientificInterests';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { scientificPortfolioActions, scientificPortfolioReducer } from '../model/slice/scientificPortfolioSlice';
import { isUserProfessor } from '@/entities/User/model/selectors/getUserRoles/getUserRoles';
import { createOrderedInputs, PROFESSORSPECIFICINPUTS, STUDENTSPECIFICINPUTS } from '../lib/const';

const initialReducers: ReducersList = {
    scientificPortfolio: scientificPortfolioReducer,
};

export const ScientificPortfolio = memo(() => {
    const dispatch = useAppDispatch();
    const isProfessor = useSelector(isUserProfessor);
    const inputFields = createOrderedInputs(isProfessor ? PROFESSORSPECIFICINPUTS : STUDENTSPECIFICINPUTS);
    const interests = useSelector(getScientificInterests);

    return (
        <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
            <Stack width={650} spacing={3}>
                <Typography variant="h2">Научное портфолио</Typography>
                <Stack spacing={1}>
                    {inputFields?.map((field) => (
                        <EditingField
                            key={field.id}
                            label={field.label}
                            defaultValue={field.defaultValue}
                            multiline={field.multiline}
                        />
                    ))}
                    <Stack spacing={1}>
                        <Typography variant="bodyXS" color="#00000099">
                            Сферы научных интересов
                        </Typography>
                        <ScientificInterestsAutocomplete
                            multiple
                            value={interests}
                            placeholder="Поиск по научным интересам или ключевым словам"
                            limitTags={1}
                            onChange={(_, value) => dispatch(scientificPortfolioActions.setScientificInterests(value))}
                        />
                    </Stack>
                </Stack>
            </Stack>
        </DynamicModuleLoader>
    );
});
