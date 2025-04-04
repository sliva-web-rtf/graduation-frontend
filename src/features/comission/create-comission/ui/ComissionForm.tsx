import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Box, Stack } from '@mui/material';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { CommissionStorageService } from '../lib';
import { commissionFormActions, commissionFormReducer, getCommissionForm } from '../model';
import { CommissionFormStep } from '../model/types';
import { CreateComissionStepper } from './ComissionFormStepper';
import {
    CommissionExpertsForm,
    CommissionGroupsForm,
    CommissionInfoForm,
    CommissionStudentsForm,
    SubmitCommissionForm,
} from './Forms';

type ComissionFormProps = {};

const initialReducers: ReducersList = {
    commissionForm: commissionFormReducer,
};

export const ComissionForm = (props: ComissionFormProps) => {
    // const {} = props;
    const [searchParams] = useSearchParams();
    const dispatch = useAppDispatch();
    const { step } = useSelector(getCommissionForm);

    useEffect(() => {
        dispatch(commissionFormActions.initStep(searchParams));
    }, [dispatch, searchParams]);

    useEffect(() => {
        const formData = CommissionStorageService.get();

        dispatch(commissionFormActions.setForms(formData));
    }, [dispatch]);

    return (
        <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
            <Stack direction="row" spacing={4}>
                <Stack width={300} position="sticky" alignSelf="flex-start" top={32} spacing={4}>
                    <CreateComissionStepper />
                </Stack>
                <Box width="100%">
                    {step === CommissionFormStep.Info && <CommissionInfoForm />}
                    {step === CommissionFormStep.Experts && <CommissionExpertsForm />}
                    {step === CommissionFormStep.Groups && <CommissionGroupsForm />}
                    {step === CommissionFormStep.Students && <CommissionStudentsForm />}
                    {step === CommissionFormStep.Submit && <SubmitCommissionForm />}
                </Box>
            </Stack>
        </DynamicModuleLoader>
    );
};
