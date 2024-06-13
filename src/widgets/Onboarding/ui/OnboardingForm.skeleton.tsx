import { Skeleton, Stack } from '@mui/material';
import { memo } from 'react';

export const OnboardingFormSkeleton = memo(() => (
    <Stack direction="row" spacing={4} flex={1}>
        <Skeleton width="60%" height={24} />
        <Stack flex={1} spacing={2}>
            <Stack direction="row" justifyContent="space-between" spacing={1}>
                <Skeleton width="100%" height={56} />
                <Skeleton width="100%" height={56} />
                <Skeleton width="100%" height={56} />
            </Stack>
            <Skeleton width="100%" height={56} />
            <Skeleton width="100%" height={56} />
            <Skeleton width="100%" height={56} />
        </Stack>
    </Stack>
));
