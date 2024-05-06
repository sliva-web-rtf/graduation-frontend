import { memo } from 'react';
import { Grid, Stack, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AddToFavoritesButton } from 'features/entity/AddRequests';
import { ScientificWorkCard } from 'entities/ScientificWork/ui/ScientificWorkCard';
import { useGeScientificWorkQuery } from 'entities/ScientificWork';
import { ToggleScientificWorkInfo } from 'features/scientificWork/ToggleInfo';
// eslint-disable-next-line max-len
import { getScientificWorkInfoOption } from '../model/selectors/getScientificWorkInfoOption/getScientificWorkInfoOption';
import { ToggleOptions } from '../model/types/toggleOptions';
import { ScientificWorkInfoSkeleton } from './ScientificWorkInfo.skeleton';
import { ScientificWorkGeneral } from './ScientificWorkGeneral';
import { ScientificWorkSlots } from './ScientificWorkSlots';

export const ScientificWorkInfo = memo(() => {
    const { id } = useParams();
    const option = useSelector(getScientificWorkInfoOption);

    const { isFetching, data } = useGeScientificWorkQuery({ id: id! });

    if (isFetching) {
        return <ScientificWorkInfoSkeleton />;
    }

    if (!data) {
        return <Typography variant="body2">Информации отсутствует</Typography>;
    }

    return (
        <Grid container gap={3}>
            <Grid item xs={2.8}>
                <Stack spacing={3}>
                    <ScientificWorkCard {...data} />
                    <Stack spacing={1} alignItems="center">
                        <AddToFavoritesButton />
                    </Stack>
                </Stack>
            </Grid>
            <Grid item xs>
                <Stack spacing={4} alignItems="flex-start">
                    <ToggleScientificWorkInfo />
                    {option === ToggleOptions.General ? (
                        <ScientificWorkGeneral {...data} />
                    ) : (
                        <ScientificWorkSlots id={id!} />
                    )}
                </Stack>
            </Grid>
        </Grid>
    );
});
