import { Skeleton, Stack } from '@mui/material';

export const StageProgressSkeleton = () => {
    return (
        <Stack spacing={2}>
            <Skeleton width="40%" />
            <Stack>
                <Skeleton width="100%" />
                <Stack direction="row" spacing={1} width="100%">
                    <Skeleton width="20%" />
                    <Skeleton width="30%" />
                </Stack>
            </Stack>
        </Stack>
    );
};
