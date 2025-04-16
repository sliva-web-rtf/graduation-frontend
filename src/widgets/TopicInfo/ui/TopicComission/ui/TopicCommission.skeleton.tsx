import { Divider, Paper, Skeleton, Stack } from '@mui/material';

export const TopicCommissionSkeleton = (props: { count?: number }) => {
    const { count = 8 } = props;

    const items = Array.from({ length: count }, (_, index) => index);

    return (
        <Paper
            elevation={0}
            sx={{
                p: 3,
                borderRadius: 3,
                width: '100%',
            }}
            component={Stack}
            spacing={1}
        >
            <Skeleton variant="text" width="30%" height={32} />
            <Stack divider={<Divider />} spacing={1}>
                {items.map((item) => (
                    <Stack key={item} direction="row" justifyContent="space-between" alignItems="center">
                        <Skeleton variant="text" width="25%" height={24} />
                        <Stack spacing={0.5} alignItems="flex-end">
                            <Skeleton variant="text" width={120} height={24} />
                            <Skeleton variant="text" width={100} height={20} />
                        </Stack>
                    </Stack>
                ))}
            </Stack>
        </Paper>
    );
};
