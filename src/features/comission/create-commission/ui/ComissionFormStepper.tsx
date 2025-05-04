import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { BaseStep, BaseStepper } from '@/shared/ui';
import { Paper } from '@mui/material';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { getStepCompletedStatus, getStepErrorStatus } from '../lib';
import {
    commissionFormActions,
    CommissionFormStepDescription,
    CommissionFormStepRus,
    getCommissionForm,
} from '../model';
import { CommissionFormStep } from '../model/types';

export const CreateComissionStepper = () => {
    const dispatch = useAppDispatch();
    const { step, steps, forms } = useSelector(getCommissionForm);

    const handleChangeStep = useCallback(
        (newStep: CommissionFormStep) => {
            dispatch(commissionFormActions.setStep(newStep));
        },
        [dispatch],
    );

    const handleBackClick = useCallback(() => {
        handleChangeStep(step - 1);
    }, [handleChangeStep, step]);

    const handleNextClick = useCallback(() => {
        handleChangeStep(step + 1);
    }, [handleChangeStep, step]);

    const handleStepClick = useCallback(
        (step: CommissionFormStep) => {
            handleChangeStep(step);
        },
        [handleChangeStep],
    );

    return (
        <Paper sx={(theme) => ({ padding: 2, borderRadius: theme.spacing(2) })}>
            <BaseStepper activeStep={step}>
                {steps.map((step) => (
                    <BaseStep
                        completed={getStepCompletedStatus(step, forms)}
                        error={getStepErrorStatus(step, forms)}
                        key={step}
                        step={step}
                        label={CommissionFormStepRus[step]}
                        content={CommissionFormStepDescription[step]}
                        isLast={step === CommissionFormStep.Submit}
                        onStepClick={handleStepClick}
                        onBackClick={handleBackClick}
                        onNextClick={handleNextClick}
                    />
                ))}
            </BaseStepper>
        </Paper>
    );
};
