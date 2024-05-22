import { Skeleton, Stack } from '@mui/material';
import { memo } from 'react';

interface InfoInterestsSkeletonProps {
    count: number;
}

export const InfoInterestsSkeleton = memo((props: InfoInterestsSkeletonProps) => {
    const { count } = props;
    const chips = Array.from({ length: count - 1 }, (_, index) => index);

    return (
        <Stack direction="row" flexWrap="wrap" gap={1}>
            <Skeleton width="70%" height={32} sx={{ borderRadius: 2 }} />
            {chips.map((chip) => (
                <Skeleton key={chip} width="45%" height={32} sx={{ borderRadius: 2 }} />
            ))}
        </Stack>
    );
});
