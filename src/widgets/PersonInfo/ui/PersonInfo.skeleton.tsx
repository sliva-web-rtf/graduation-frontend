import { Grid, Stack } from '@mui/material';
import { ToggleButtons } from '@/shared/ui';
import { PersonPortfolioSkeleton } from './PersonPortfolio/ui/PersonPortfolio.skeleton';
import { PersonCardSkeleton } from '@/entities/Person';
import { ToggleOptions } from '../model/types/toggleOptions';

export const PersonInfoSkeleton = () => (
    <Grid container gap={3}>
        <Grid item xs={2.8}>
            <PersonCardSkeleton />
        </Grid>
        <Grid item xs>
            <Stack spacing={4} alignItems="flex-start">
                <ToggleButtons value={ToggleOptions.Portfolio} options={Object.values(ToggleOptions)} />
                <PersonPortfolioSkeleton />
            </Stack>
        </Grid>
    </Grid>
);
