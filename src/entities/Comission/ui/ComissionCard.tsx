import { CheckExpertsButton } from '@/features/comission/check-experts';
import { СheckGroupsButton } from '@/features/comission/check-groups';
import { CheckStudentsButton } from '@/features/comission/check-students';
import { BaseButton } from '@/shared/ui';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Stack, styled, Typography } from '@mui/material';
import { CommissionModel } from '../model';

const StyledAccordion = styled(Accordion)(({ theme }) => ({
    '&.MuiAccordion-gutters': {
        borderRadius: theme.spacing(2),
    },
    '&.MuiAccordion-gutters::before': {
        backgroundColor: 'transparent',
    },
}));

const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
    borderRadius: theme.spacing(2),
    height: theme.spacing(10),
}));

export const ComissionCard = (props: CommissionModel) => {
    const { id, name, secretaryName } = props;

    return (
        <StyledAccordion>
            <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Stack>
                    <Typography variant="body2" fontWeight={600}>
                        {name}
                    </Typography>
                    <Stack direction="row" spacing={1}>
                        <Typography color="secondary">Ответственный секретарь:</Typography>
                        <Typography fontWeight={600}>{secretaryName}</Typography>
                    </Stack>
                </Stack>
            </StyledAccordionSummary>
            <AccordionDetails>
                <Stack direction="row" spacing={2} justifyContent="space-between">
                    <Stack direction="row" spacing={2}>
                        <CheckExpertsButton comissionId={id} comissionName={name} />
                        <CheckStudentsButton comissionId={id} comissionName={name} />
                        <СheckGroupsButton comissionId={id} comissionName={name} />
                    </Stack>
                    <BaseButton variant="contained">Редактировать</BaseButton>
                </Stack>
            </AccordionDetails>
        </StyledAccordion>
    );
};
