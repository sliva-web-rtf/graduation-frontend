import { memo } from 'react';
import { Grid, Stack, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { AddToFavoritesButton } from 'features/entity/AddRequests';
import { ScientificWorkCard } from 'entities/ScientificWork/ui/ScientificWorkCard';
import { useGetScientificWorkQuery } from 'entities/ScientificWork';
import { CatalogOptions } from 'entities/CatalogList';
import { ScientificWorkInfoSkeleton } from './ScientificWorkInfo.skeleton';
import { ScientificWorkGeneral } from './ScientificWorkGeneral';

export const ScientificWorkInfo = memo(() => {
    const { id } = useParams();

    const { isFetching, data } = useGetScientificWorkQuery({ id: id! });

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
                        <AddToFavoritesButton id={id!} isFavorite={data.isFavorite} option={CatalogOptions.Themes} />
                    </Stack>
                </Stack>
            </Grid>
            <Grid item xs>
                <ScientificWorkGeneral {...data} />
            </Grid>
        </Grid>
    );
});
