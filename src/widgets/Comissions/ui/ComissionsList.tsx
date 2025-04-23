import { ComissionCard, useGetCommissionsQuery } from '@/entities/Comission';
import { EmptyMessage, ErrorPageMessage } from '@/shared/ui';
import { Stack } from '@mui/material';
import { ComissionsListSkeleton } from './ComissionsList.skeleton';

export const ComissionsList = () => {
    const { data, isFetching, error } = useGetCommissionsQuery();

    if (isFetching) {
        return <ComissionsListSkeleton count={8} />;
    }

    if (error) {
        return <ErrorPageMessage />;
    }

    if (!data?.length) {
        return <EmptyMessage />;
    }

    return (
        <Stack spacing={2}>
            {data.map(({ id, number, name, secretaryName }) => (
                <ComissionCard key={id} id={id} number={number} name={name} secretaryName={secretaryName} />
            ))}
        </Stack>
    );
};
