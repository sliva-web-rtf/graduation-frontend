import { Role } from '@/entities/User';
import { formatDate } from '@/shared/lib/helpers/formatDate';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

interface CommentProps {
    role: Role.Expert | Role.Secretary;
    text: string;
    date: Date;
}

const StyledAccordion = styled(Accordion)<{ expert: boolean }>(({ expert, theme }) => ({
    backgroundColor: expert ? theme.palette.warning.light : theme.palette.error.light,

    '&.MuiAccordion-gutters': {
        borderRadius: theme.spacing(2),
    },
    '&.MuiAccordion-gutters::before': {
        backgroundColor: 'transparent',
    },
}));

const StyledAccordionSummary = styled(AccordionSummary)<{ expert: boolean }>(({ expert, theme }) => ({
    color: expert ? theme.palette.warning.main : theme.palette.error.main,
    backgroundColor: expert ? theme.palette.warning.light : theme.palette.error.light,
    borderRadius: theme.spacing(2),
    height: theme.spacing(8),
}));

export const CommentCard = ({ role, text, date }: CommentProps) => {
    const isExpert = role === Role.Expert;
    const roleLabel = isExpert ? 'эксперта' : 'секретаря ГЭК';

    return (
        <StyledAccordion expert={isExpert}>
            <StyledAccordionSummary expandIcon={<ExpandMoreIcon />} expert={isExpert}>
                <Stack direction="row" spacing={1} alignItems="center">
                    <Typography>
                        Комметарий <b>{roleLabel}</b>
                    </Typography>
                    <Typography color="secondary">–</Typography>
                    <Typography color="secondary">{formatDate(date)}</Typography>
                </Stack>
            </StyledAccordionSummary>
            <AccordionDetails>
                <Typography>{text}</Typography>
            </AccordionDetails>
        </StyledAccordion>
    );
};
