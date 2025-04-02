import { PersonMainInfo } from '@/entities/Person';
import { CheckExpertsButton } from '@/features/comission/check-experts';
import { СheckGroupsButton } from '@/features/comission/check-groups';
import { CheckStudentsButton } from '@/features/comission/check-students';
import { BaseButton } from '@/shared/ui';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Stack, styled, Typography } from '@mui/material';

type ComissionCardProps = {
    comissionId: string;
    comissionName: string;
    clerk: Pick<PersonMainInfo, 'id' | 'name'>;
};

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

export const ComissionCard = (props: ComissionCardProps) => {
    const { comissionId, comissionName, clerk } = props;
    const { name: clerkName } = clerk;

    return (
        <StyledAccordion>
            <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Stack>
                    <Typography variant="body2" fontWeight={600}>
                        {comissionName}
                    </Typography>
                    <Stack direction="row" spacing={1}>
                        <Typography color="secondary">Ответственный секретарь:</Typography>
                        <Typography>{clerkName}</Typography>
                    </Stack>
                </Stack>
            </StyledAccordionSummary>
            <AccordionDetails>
                <Stack direction="row" spacing={2} justifyContent="space-between">
                    <Stack direction="row" spacing={2}>
                        <CheckExpertsButton comissionId={comissionId} comissionName={comissionName} />
                        <CheckStudentsButton comissionId={comissionId} comissionName={comissionName} />
                        <СheckGroupsButton comissionId={comissionId} comissionName={comissionName} />
                    </Stack>
                    <BaseButton variant="contained">Редактировать</BaseButton>
                </Stack>
            </AccordionDetails>
        </StyledAccordion>
    );
};
