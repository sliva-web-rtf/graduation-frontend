import { ComissionCardSkeleton } from '@/entities/Comission';
import { Stack } from '@mui/material';

type ComissionsProps = {
    count: number;
};

export const ComissionsListSkeleton = (props: ComissionsProps) => {
    const { count } = props;
    const items = Array.from({ length: count }, (_, index) => index);

    return (
        <Stack spacing={2}>
            {items.map((item) => (
                <ComissionCardSkeleton key={item} />
            ))}
        </Stack>
    );
};
