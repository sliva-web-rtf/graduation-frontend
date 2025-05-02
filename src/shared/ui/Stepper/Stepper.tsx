import { CommissionFormStep } from '@/features/comission/create-comission/model';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import {
    Stack,
    Step,
    StepConnector,
    StepContent,
    StepLabel,
    Stepper,
    StepperProps,
    StepProps,
    styled,
    Typography,
} from '@mui/material';
import { stepConnectorClasses } from '@mui/material/StepConnector';
import { memo } from 'react';
import { BaseButton } from '../Button/Button';

interface BaseStepProps extends StepProps {
    step: number;
    label: string;
    onStepClick: (step: CommissionFormStep) => void;
    onNextClick: () => void;
    onBackClick: () => void;
    isLast: boolean;

    error?: boolean;
    content?: string;
}

const Connector = styled(StepConnector)(({ theme }) => ({
    [`& .${stepConnectorClasses.line}`]: {
        borderWidth: 3,
        ...theme.applyStyles('dark', {
            borderColor: theme.palette.grey[800],
        }),
    },
}));
const BaseStepContent = styled(StepContent)(({ theme }) => ({
    borderWidth: 3,
    color: theme.palette.secondary.main,
}));

export const BaseStepper = (props: StepperProps) => (
    <Stepper {...props} connector={<Connector />} orientation="vertical" />
);

export const BaseStep = memo((props: BaseStepProps) => {
    const { step, label, content, onStepClick, onNextClick, onBackClick, isLast, error, ...rest } = props;
    const isFirst = step === 0;

    const handleLabelClick = () => {
        onStepClick(step);
    };

    return (
        <Step {...rest}>
            <StepLabel error={error} onClick={handleLabelClick} sx={{ cursor: 'pointer !important' }}>
                <Typography fontWeight={600}>{label}</Typography>
            </StepLabel>
            <BaseStepContent>
                <Stack spacing={2}>
                    <Typography>{content}</Typography>
                    <Stack direction="row" spacing={1}>
                        {!isLast && (
                            <BaseButton variant="contained" onClick={onNextClick} startIcon={<ArrowDownwardIcon />}>
                                Далее
                            </BaseButton>
                        )}
                        {!isFirst && (
                            <BaseButton onClick={onBackClick} startIcon={<ArrowUpwardIcon />}>
                                Назад
                            </BaseButton>
                        )}
                    </Stack>
                </Stack>
            </BaseStepContent>
        </Step>
    );
});
