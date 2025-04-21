import { BaseChip } from '@/shared/ui';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AccordionSummary, Paper, Skeleton, Stack } from '@mui/material';

export const StageAccordionSkeleton = () => {
    return (
        <Paper>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ height: 64 }}>
                <Stack
                    direction="row"
                    alignItems="center"
                    spacing={2}
                    pr={2}
                    width="100%"
                    justifyContent="space-between"
                >
                    <Stack direction="row" spacing={2} width="100%">
                        <Skeleton width="20%" />
                        <Skeleton width="50%" />
                    </Stack>
                    <BaseChip label="Загрузка" color="secondary" />
                </Stack>
            </AccordionSummary>
        </Paper>
    );
};
