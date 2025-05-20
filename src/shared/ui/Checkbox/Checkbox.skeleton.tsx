import { Paper, Skeleton, Stack } from '@mui/material';

export const BaseCheckboxSkeleton = () => {
    return (
        <Paper
            sx={(theme) => ({ padding: [theme.spacing(0.3), theme.spacing(2)].join(' '), borderRadius: 3 })}
            component={Stack}
            direction="row"
            spacing={2}
            height={48}
            alignItems="center"
        >
            <Skeleton height={42} width={24} />
            <Skeleton width="30%" />
        </Paper>
    );
};

export const BaseCheckboxSkeletonList = (props: { count: number; spacing?: number }) => {
    const { count, spacing = 1 } = props;

    const items = Array.from({ length: count }, (_, index) => index);

    return (
        <Stack spacing={spacing}>
            {items.map((_, index) => (
                <BaseCheckboxSkeleton key={`checkbox-${index}`} />
            ))}
        </Stack>
    );
};
