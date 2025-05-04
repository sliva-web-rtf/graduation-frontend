import { useGetStagesOptionsQuery } from '@/entities/Stage/api';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Box, Stack } from '@mui/material';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useEditCommissionContext } from '../../edit-commision';
import { CommissionStorageService } from '../lib';
import { commissionFormActions, getCommissionForm } from '../model';
import { CommissionFormStep } from '../model/types';
import { ComissionFormSkeleton } from './ComissionForm.skeleton';
import { CreateComissionStepper } from './ComissionFormStepper';
import {
    CommissionExpertsForm,
    CommissionGroupsForm,
    CommissionInfoForm,
    CommissionStudentsForm,
    SubmitCommissionForm,
} from './Forms';

export const ComissionForm = () => {
    const dispatch = useAppDispatch();
    const { step } = useSelector(getCommissionForm);
    const editContext = useEditCommissionContext();
    const { data, isFetching } = useGetStagesOptionsQuery();

    useEffect(() => {
        if (editContext?.editData) {
            dispatch(commissionFormActions.setForms(editContext.editData));
            return;
        }

        const formData = CommissionStorageService.get();
        dispatch(commissionFormActions.setForms(formData));
    }, [dispatch, editContext?.editData]);

    if (isFetching) {
        return <ComissionFormSkeleton />;
    }

    return (
        <Stack direction="row" spacing={4} height="100%">
            <Stack position="sticky" width="30%" minWidth={320} maxWidth={400} alignSelf="flex-start" top={32}>
                <CreateComissionStepper />
            </Stack>
            <Box width="100%">
                {step === CommissionFormStep.Info && <CommissionInfoForm />}
                {step === CommissionFormStep.Experts && <CommissionExpertsForm stages={data} />}
                {step === CommissionFormStep.Groups && <CommissionGroupsForm />}
                {step === CommissionFormStep.Students && <CommissionStudentsForm stages={data} />}
                {step === CommissionFormStep.Submit && <SubmitCommissionForm />}
            </Box>
        </Stack>
    );
};
