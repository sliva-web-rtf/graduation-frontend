import { CommissionCard, useGetCommissionsForEditingQuery } from '@/entities/Comission';
import { EmptyMessage, ErrorPageMessage } from '@/shared/ui';
import { Stack } from '@mui/material';
import { ComissionsListSkeleton } from './ComissionsList.skeleton';

export const ComissionsList = () => {
    const { data, isFetching, error } = useGetCommissionsForEditingQuery();

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
            {data.map(({ id, number, name, secretaryName, academicGroups, chairpersonName }) => (
                <CommissionCard
                    key={id}
                    id={id}
                    number={number}
                    name={name}
                    secretaryName={secretaryName}
                    chairpersonName={chairpersonName}
                    academicGroups={academicGroups}
                />
            ))}
        </Stack>
    );
};
