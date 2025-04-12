import { FC } from 'react';
import { Paper, Skeleton, Stack, Divider } from '@mui/material';

export const TopicCommissionSkeleton: FC = () => {
    return (
        <Paper
            elevation={0}
            sx={{
                p: 3,
                borderRadius: 3,
                backgroundColor: '#FFFFFF',
                width: '100%',
            }}
        >
            <Stack spacing={1}>
                <Skeleton variant="text" width="30%" height={32} />
                <Stack divider={<Divider />} spacing={1}>
                    {Array.from({ length: 8 }).map(() => (
                        <Stack key={Math.random()} direction="row" justifyContent="space-between" alignItems="center">
                            <Skeleton variant="text" width="25%" height={24} />
                            <Stack spacing={0.5} alignItems="flex-end">
                                <Skeleton variant="text" width={120} height={24} />
                                <Skeleton variant="text" width={100} height={20} />
                            </Stack>
                        </Stack>
                    ))}
                </Stack>
            </Stack>
        </Paper>
    );
};
