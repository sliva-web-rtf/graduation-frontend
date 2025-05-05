import { useGetStagesOptionsQuery } from '@/entities/Stage/api';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Box, Stack } from '@mui/material';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useEditCommissionContext } from '../../edit-commision';
import { useUnsavedChangesWarning } from '../lib';
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

type ComissionFormProps = {
    editMode?: boolean;
};

export const ComissionForm = (props: ComissionFormProps) => {
    const { editMode = false } = props;
    const dispatch = useAppDispatch();
    const { step, forms } = useSelector(getCommissionForm);

    const editContext = useEditCommissionContext();

    const { data, isFetching } = useGetStagesOptionsQuery();

    const checkUnsavedChanges = useCallback(() => {
        return Object.values(forms).some((form) => form.isTouched);
    }, [forms]);

    useUnsavedChangesWarning(checkUnsavedChanges);

    useEffect(() => {
        dispatch(commissionFormActions.initEditMode(editMode));
    }, [dispatch, editMode]);

    useEffect(() => {
        if (editContext?.editData) {
            dispatch(commissionFormActions.setForms(editContext.editData));
            return;
        }

        dispatch(commissionFormActions.setForms());
    }, [dispatch, editContext?.editData, editMode]);

    useEffect(() => {
        return () => {
            dispatch(commissionFormActions.resetEditMode());
        };
    }, [dispatch]);

    if (isFetching) {
        return <ComissionFormSkeleton />;
    }

    return (
        <Stack direction="row" spacing={4} height="100%">
            <Box position="sticky" width="30%" minWidth={320} maxWidth={400} alignSelf="flex-start" top={32}>
                <CreateComissionStepper />
            </Box>
            <Box width="100%">
                {step === CommissionFormStep.Info && <CommissionInfoForm />}
                {step === CommissionFormStep.Experts && <CommissionExpertsForm stages={data} />}
                {step === CommissionFormStep.Groups && <CommissionGroupsForm />}
                {step === CommissionFormStep.Students && <CommissionStudentsForm stages={data} />}
                {step === CommissionFormStep.Submit && <SubmitCommissionForm editMode={editMode} />}
            </Box>
        </Stack>
    );
};
