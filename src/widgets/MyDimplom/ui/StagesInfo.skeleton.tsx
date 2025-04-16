import { StageAccordionSkeleton, StageProgressSkeleton } from '@/entities/Stage';
import { Paper, Stack } from '@mui/material';

export const StagesInfoSkeleton = (props: { count?: number }) => {
    const { count = 5 } = props;

    const items = Array.from({ length: count }, (_, index) => index);

    return (
        <Paper component={Stack} spacing={3} p={3}>
            <StageProgressSkeleton />
            <Stack spacing={1}>{items?.map((stage) => <StageAccordionSkeleton key={stage} />)}</Stack>
        </Paper>
    );
};
