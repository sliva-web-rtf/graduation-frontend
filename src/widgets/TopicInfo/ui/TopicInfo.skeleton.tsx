import { Grid, Stack } from '@mui/material';
import { memo } from 'react';
import { TopicCardSkeleton } from '@/entities/Topic';
import { InfoCardSkeleton } from '@/shared/ui/InfoCard/InfoCard.skeleton';

export const TopicInfoSkeleton = memo(() => (
    <Grid container gap={3}>
        <Grid item xs={5}>
            <TopicCardSkeleton />
        </Grid>
        <Grid item xs>
            <Stack spacing={3}>
                <InfoCardSkeleton />
                <InfoCardSkeleton />
            </Stack>
        </Grid>
    </Grid>
));
