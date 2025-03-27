import { memo } from 'react';
import { Grid, Stack, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { AddScientificWorkButton } from '@/features/entity/AddRequests';
import { useGetScientificWorkQuery, TopicCard } from '@/entities/ScientificWork';
import { TopicInfoSkeleton } from './TopicInfo.skeleton';
import { InfoCard } from '@/shared/ui';

export const TopicInfo = memo(() => {
    const { id } = useParams();

    const { isFetching, data } = useGetScientificWorkQuery({ id: id! });

    if (isFetching) {
        return <TopicInfoSkeleton />;
    }

    if (!data) {
        return <Typography variant="body2">Информации отсутствует</Typography>;
    }

    return (
        <Grid container gap={3}>
            <Grid item xs={5}>
                <Stack spacing={3}>
                    <TopicCard {...data} />
                    <Stack spacing={1} alignItems="center">
                        <AddScientificWorkButton id={id!} canJoin={data.canJoin} />
                    </Stack>
                </Stack>
            </Grid>
            <Grid item xs>
                <Stack spacing={3}>
                    <InfoCard title="Описание темы" text={data.description} />
                    <InfoCard title="Ожидаемый эффект" text={data.result} />
                </Stack>
            </Grid>
        </Grid>
    );
});
