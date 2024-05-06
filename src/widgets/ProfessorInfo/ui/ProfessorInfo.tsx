import { memo } from 'react';
import { Grid, Stack, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { ProfessorCard, useGetProfessorQuery } from 'entities/Professor';
import { ToggleProfessorInfo } from 'features/professor/ToggleInfo';
import { useSelector } from 'react-redux';
import { AddProfessorButton, AddToFavoritesButton } from 'features/entity/AddRequests';
import { ToggleOptions } from '../model/types/toggleOptions';
import { ProfessorInfoSkeleton } from './ProfessorInfo.skeleton';
import { getProfessorInfoOption } from '../model/selectors/getProfessorInfoOption/getProfessorInfoOption';
import { ProfessorPortfolio } from './ProfessorPortfolio';
import { ProfessorThemes } from './ProfessorThemes';

export const ProfessorInfo = memo(() => {
    const { id } = useParams();
    const option = useSelector(getProfessorInfoOption);

    const { isFetching, data } = useGetProfessorQuery({ id: id! });

    if (isFetching) {
        return <ProfessorInfoSkeleton />;
    }

    if (!data) {
        return <Typography variant="body2">Информации отсутствует</Typography>;
    }

    return (
        <Grid container gap={3}>
            <Grid item xs={2.8}>
                <Stack spacing={3}>
                    <ProfessorCard {...data} />
                    <Stack spacing={1} alignItems="center">
                        <AddProfessorButton />
                        <AddToFavoritesButton />
                    </Stack>
                </Stack>
            </Grid>
            <Grid item xs>
                <Stack spacing={4} alignItems="flex-start">
                    <ToggleProfessorInfo />
                    {option === ToggleOptions.Portfolio ? (
                        <ProfessorPortfolio {...data} />
                    ) : (
                        <ProfessorThemes id={id!} />
                    )}
                </Stack>
            </Grid>
        </Grid>
    );
});
