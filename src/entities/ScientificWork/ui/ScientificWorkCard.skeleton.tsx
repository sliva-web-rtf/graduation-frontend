import { memo } from 'react';
import { Divider, Paper, Skeleton, Stack } from '@mui/material';

export const ScientificWorkCardSkeleton = memo(() => (
    <Paper
        sx={(theme) => ({
            padding: [theme.spacing(3), theme.spacing(2)].join(' '),
            borderRadius: theme.spacing(4),
        })}
    >
        <Stack spacing={3}>
            <Stack spacing={3} alignItems="center">
                <Skeleton variant="rounded" width={144} height={144} sx={{ borderRadius: 3 }} />
                <Stack alignItems="center" width="100%">
                    <Skeleton width="100%" height={32} />
                    <Skeleton width="70%" />
                </Stack>
            </Stack>
            <Divider />
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Skeleton width="50%" />
                <Skeleton width="30%" />
            </Stack>
            <Divider />
            <Stack>
                <Skeleton width="70%" />
                <Skeleton width="90%" />
                <Skeleton width="50%" />
            </Stack>
        </Stack>
    </Paper>
));
