import { BaseButton, BaseChip } from '@/shared/ui';
import DrawIcon from '@mui/icons-material/Draw';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Stack, styled, Typography } from '@mui/material';
import { CommissionModel } from '../model';

type Props = Omit<CommissionModel, 'expertsNames'>;

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
    height: theme.spacing(12),
}));

export const ComissionCard = (props: Props) => {
    const { id, name, secretaryName, chairpersonName = 'Нет данных', academicGroups } = props;

    return (
        <StyledAccordion>
            <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Stack spacing={1}>
                    <Typography variant="body2" fontWeight={600}>
                        {name}
                    </Typography>
                    <Stack direction="row" spacing={2}>
                        <BaseChip label={`Секретарь: ${secretaryName}`} color="success" />
                        <BaseChip label={`Председатель: ${chairpersonName}`} />
                    </Stack>
                </Stack>
            </StyledAccordionSummary>
            <AccordionDetails>
                <Stack direction="row" spacing={2} justifyContent="space-between">
                    <Stack direction="row" spacing={1}>
                        {academicGroups?.map((group) => <BaseChip key={group} label={group} color="info" />)}
                        {/* <CheckExpertsButton comissionId={id} comissionName={name} />
                        <CheckStudentsButton comissionId={id} comissionName={name} />
                        <СheckGroupsButton comissionId={id} comissionName={name} /> */}
                    </Stack>
                    <BaseButton startIcon={<DrawIcon />}>Редактировать комиссию</BaseButton>
                </Stack>
            </AccordionDetails>
        </StyledAccordion>
    );
};
