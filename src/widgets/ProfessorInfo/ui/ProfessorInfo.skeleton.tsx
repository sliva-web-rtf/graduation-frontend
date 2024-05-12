import { memo } from 'react';
import { Grid, Stack } from '@mui/material';
import { ToggleButtons } from 'shared/ui';
import { ProfessorCardSkeleton } from 'entities/Professor';
import { ProfessorPortfolioSkeleton } from './ProfessorPortfolio.skeleton';
import { ToggleOptions } from '../model/types/toggleOptions';

export const ProfessorInfoSkeleton = memo(() => (
    <Grid container gap={3}>
        <Grid item xs={2.8}>
            <ProfessorCardSkeleton />
        </Grid>
        <Grid item xs>
            <Stack spacing={4} alignItems="flex-start">
                <ToggleButtons value={ToggleOptions.Portfolio} options={Object.values(ToggleOptions)} />
                <ProfessorPortfolioSkeleton />
            </Stack>
        </Grid>
    </Grid>
));
