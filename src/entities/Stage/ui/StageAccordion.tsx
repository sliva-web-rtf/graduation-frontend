import { CommentCard } from '@/entities/Comment';
import { getColorByResultStatus } from '@/shared/lib/helpers/getColorByStatus';
import { ResultStatus, ResultStatusRus } from '@/shared/lib/types/statuses';
import { BaseChip } from '@/shared/ui';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Stack, styled, Typography } from '@mui/material';
import dayjs from 'dayjs';

type StageAccordionProps = {
    stage: string;

    end?: string;
    description?: string;
    result?: ResultStatus;
    mark?: number;
    defaultExpanded?: boolean;

    comments?: { text: string; label?: string }[];
};

const StyledAccordion = styled(Accordion)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,

    '&.MuiAccordion-gutters': {
        borderRadius: theme.spacing(1.5),
    },
    '&.MuiAccordion-gutters::before': {
        backgroundColor: 'transparent',
    },
}));

export const StageAccordion = (props: StageAccordionProps) => {
    const { stage, result, mark, description, end, comments, ...otherProps } = props;
    const endDate = dayjs(end).locale('ru').format('DD MMMM YYYY');
    const resultColor = getColorByResultStatus(result);
    const resultLabel = [(result && ResultStatusRus[result]) ?? ResultStatusRus.getUnknown, mark && `${mark} баллов`]
        .filter(Boolean)
        .join(', ');

    return (
        <StyledAccordion {...otherProps}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ height: 64 }}>
                <Stack
                    direction="row"
                    alignItems="center"
                    spacing={2}
                    pr={2}
                    width="100%"
                    justifyContent="space-between"
                >
                    <Stack direction="row" spacing={2}>
                        <Typography color="secondary">до {endDate}</Typography>
                        <Typography fontWeight={700}>
                            {stage}. {description}
                        </Typography>
                    </Stack>
                    <BaseChip label={resultLabel} color={resultColor} />
                </Stack>
            </AccordionSummary>
            <AccordionDetails>
                <Stack spacing={2}>
                    {comments?.map((comment) => <CommentCard text={comment.text} label={comment.label} />)}
                </Stack>
            </AccordionDetails>
        </StyledAccordion>
    );
};
