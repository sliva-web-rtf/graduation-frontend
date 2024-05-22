import { Paper, Skeleton, Stack, Typography } from '@mui/material';
import { memo } from 'react';

interface InfoCardSkeletonProps {
    width?: string;
}

export const InfoCardSkeleton = memo((props: InfoCardSkeletonProps) => {
    const { width } = props;

    return (
        <Paper
            sx={(theme) => ({
                width: width || '100%',
                padding: theme.spacing(3),
                borderRadius: theme.spacing(3),
            })}
        >
            <Stack spacing={2} width="100%">
                <Typography variant="h3">
                    <Skeleton height={32} width="70%" />
                </Typography>
                <Typography variant="body1">
                    <Skeleton width="80%" />
                    <Skeleton width="90%" />
                    <Skeleton width="40%" />
                </Typography>
            </Stack>
        </Paper>
    );
});
