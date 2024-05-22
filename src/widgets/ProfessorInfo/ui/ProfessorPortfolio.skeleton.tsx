import { memo } from 'react';
import { Grid, Stack } from '@mui/material';
import { InfoCardSkeleton } from 'shared/ui/InfoCard/InfoCard.skeleton';
import { InfoInterestsSkeleton } from 'shared/ui/InfoInterests/InfoInterests.skeleton';

export const ProfessorPortfolioSkeleton = memo(() => (
    <Grid container gap={3}>
        <Grid item xs={7}>
            <Stack spacing={3} alignItems="flex-start">
                <InfoCardSkeleton />
                <InfoCardSkeleton />
                <InfoCardSkeleton width="70%" />
            </Stack>
        </Grid>
        <Grid item xs>
            <InfoInterestsSkeleton count={4} />
        </Grid>
    </Grid>
));
