import { memo } from 'react';
import { Grid, Stack } from '@mui/material';
import { ToggleButtons } from 'shared/ui';
import { ProfessorCardSkeleton } from 'entities/Professor';
import { ScientificWorkGeneralSkeleton } from './ScientificWorkGeneral.skeleton';
import { ToggleOptions } from '../model/types/toggleOptions';

export const ScientificWorkInfoSkeleton = memo(() => (
    <Grid container gap={3}>
        <Grid item xs={2.8}>
            <ProfessorCardSkeleton />
        </Grid>
        <Grid item xs>
            <Stack spacing={4} alignItems="flex-start">
                <ToggleButtons value={ToggleOptions.General} options={Object.values(ToggleOptions)} />
                <ScientificWorkGeneralSkeleton />
            </Stack>
        </Grid>
    </Grid>
));
