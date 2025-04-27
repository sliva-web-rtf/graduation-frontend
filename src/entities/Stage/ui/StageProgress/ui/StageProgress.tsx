import { LinearProgress, Paper, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { memo } from 'react';
import { useGetCurrentStageQuery } from '../../../api';
import { StageProgressSkeleton } from './StageProgress.skeleton';

export const StageProgress = memo(() => {
    const { data, isFetching } = useGetCurrentStageQuery();

    const percent = ((data?.number ?? 1) / (data?.amount ?? 1)) * 100;
    const endDate = dayjs(data?.endsAt).locale('ru').format('DD MMMM YYYY');

    if (isFetching) {
        return <StageProgressSkeleton />;
    }

    return (
        <Stack spacing={2} component={Paper} p={3}>
            <Typography variant="h1">{data?.name}</Typography>
            <Stack spacing={1}>
                <LinearProgress variant="determinate" value={percent} />
                <Stack direction="row" spacing={1}>
                    <Typography color="secondary">Окончание этапа:</Typography>
                    <Typography fontWeight={600}>{endDate}</Typography>
                </Stack>
            </Stack>
        </Stack>
    );
});
