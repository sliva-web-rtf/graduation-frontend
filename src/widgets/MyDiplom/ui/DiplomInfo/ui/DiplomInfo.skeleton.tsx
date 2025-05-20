import { StageAccordionSkeleton } from '@/entities/Stage';
import { TopicInfoSkeleton } from '@/widgets/TopicInfo/ui/TopicInfo.skeleton';
import { Stack } from '@mui/material';

export const DiplomInfoSkeleton = () => {
    return (
        <Stack spacing={3}>
            <StageAccordionSkeleton />
            <TopicInfoSkeleton />
        </Stack>
    );
};
