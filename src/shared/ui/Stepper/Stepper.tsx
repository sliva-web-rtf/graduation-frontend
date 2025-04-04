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
import { BaseButton } from '../Button/Button';

interface BaseStepProps extends StepProps {
    step: number;
    label: string;
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

export const BaseStep = (props: BaseStepProps) => {
    const { step, label, content, onNextClick, onBackClick, isLast, error, ...rest } = props;
    const isFirst = step === 1;

    return (
        <Step {...rest}>
            <StepLabel error={error}>
                <Typography fontWeight={600}>{label}</Typography>
            </StepLabel>
            <BaseStepContent>
                <Stack spacing={2}>
                    <Typography fontSize={14}>{content}</Typography>
                    <Stack direction="row" spacing={1}>
                        {!isLast && (
                            <BaseButton size="small" onClick={onNextClick} variant="contained">
                                Далее
                            </BaseButton>
                        )}
                        {!isFirst && (
                            <BaseButton size="small" onClick={onBackClick}>
                                Назад
                            </BaseButton>
                        )}
                    </Stack>
                </Stack>
            </BaseStepContent>
        </Step>
    );
};
