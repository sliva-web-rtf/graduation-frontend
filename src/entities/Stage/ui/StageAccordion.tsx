import { CommentCard } from '@/entities/Comment';
import { getColorByResultStatus } from '@/shared/lib/helpers/getColorByStatus';
import { ResultStatus, ResultStatusRus } from '@/shared/lib/types/statuses';
import { BaseChip } from '@/shared/ui';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Stack, styled, Typography } from '@mui/material';
import dayjs from 'dayjs';

type Comment = {
    text: string;
};

type StageAccordionProps = {
    stage: string;
    end: Date;
    description: string;

    result?: ResultStatus;
    mark?: number;
    defaultExpanded?: boolean;
    comments?: Comment[];
};

const StyledAccordion = styled(Accordion)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,

    '&.MuiAccordion-gutters': {
        borderRadius: theme.spacing(1),
    },
    '&.MuiAccordion-gutters::before': {
        backgroundColor: 'transparent',
    },
}));

export const StageAccordion = (props: StageAccordionProps) => {
    const { stage, result, mark, description, end, comments, ...otherProps } = props;
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
                        <Typography color="secondary">до {dayjs(end).locale('ru').format('DD MMMM YYYY')}</Typography>
                        <Typography fontWeight={700}>{stage}</Typography>
                    </Stack>
                    <BaseChip label={resultLabel} color={resultColor} />
                </Stack>
            </AccordionSummary>
            <AccordionDetails>
                <Stack spacing={2}>
                    <Stack spacing={1}>
                        {comments?.map((comment, index) => <CommentCard key={`comment-${index}`} {...comment} />)}
                    </Stack>
                    <Typography>{description}</Typography>
                </Stack>
            </AccordionDetails>
        </StyledAccordion>
    );
};
