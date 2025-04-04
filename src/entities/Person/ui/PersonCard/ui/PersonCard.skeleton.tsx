import { Divider, Paper, Skeleton, Stack } from '@mui/material';

export const PersonCardSkeleton = () => (
    <Paper
        sx={(theme) => ({
            padding: theme.spacing(2),
            borderRadius: theme.spacing(2),
        })}
    >
        <Stack spacing={3}>
            <Stack>
                <Skeleton />
                <Skeleton width="60%" />
            </Stack>
            <Divider />
            <Stack>
                <Skeleton width="67%" />
                <Skeleton width="90%" />
                <Skeleton />
            </Stack>
            <Divider />
            <Stack>
                <Skeleton />
                <Skeleton width="80%" />
            </Stack>
        </Stack>
    </Paper>
);
