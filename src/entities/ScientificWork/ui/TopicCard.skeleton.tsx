import { Divider, Paper, Skeleton, Stack } from '@mui/material';
import { memo } from 'react';

export const TopicCardSkeleton = memo(() => (
    <Paper sx={(theme) => ({ padding: theme.spacing(3), borderRadius: theme.spacing(2) })}>
        <Stack spacing={3}>
            <Stack>
                <Skeleton width="20%" />
                <Skeleton width="80%" />
                <Skeleton width="50%" />
            </Stack>
            <Divider />
            <Stack spacing={1}>
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Divider />
                <Skeleton />
                <Divider />
                <Skeleton />
            </Stack>
        </Stack>
    </Paper>
));
