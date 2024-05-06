import { memo } from 'react';
import { Grid, Stack } from '@mui/material';
import { ToggleButtons } from 'shared/ui';
import { AddStudentButton, AddToFavoritesButton } from 'features/entity/AddRequests';
import { StudentCardSkeleton } from 'entities/Student';
import { StudentPortfolioSkeleton } from './StudentPortfolio.skeleton';
import { ToggleOptions } from '../model/types/toggleOptions';

export const StudentInfoSkeleton = memo(() => (
    <Grid container gap={3}>
        <Grid item xs={2.8}>
            <Stack spacing={3}>
                <StudentCardSkeleton />
                <Stack spacing={1} alignItems="center">
                    <AddStudentButton disabled />
                    <AddToFavoritesButton disabled />
                </Stack>
            </Stack>
        </Grid>
        <Grid item xs>
            <Stack spacing={4} alignItems="flex-start">
                <ToggleButtons value={ToggleOptions.Portfolio} options={Object.values(ToggleOptions)} />
                <StudentPortfolioSkeleton />
            </Stack>
        </Grid>
    </Grid>
));
