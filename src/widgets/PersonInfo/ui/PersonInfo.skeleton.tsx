import { Grid, Stack } from '@mui/material';
import { PersonCardSkeleton } from '@/entities/Person';
import { ToggleButtons } from '@/shared/ui';
import { ToggleOptions } from '../model/types/toggleOptions';
import { PersonPortfolioSkeleton } from './PersonPortfolio/ui/PersonPortfolio.skeleton';

export const PersonInfoSkeleton = () => (
    <Grid container gap={3}>
        <Grid item xs={3.5}>
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
