import { ComissionCard, useGetComissionsQuery } from '@/entities/Comission';
import { Stack } from '@mui/material';
import { ComissionsListSkeleton } from './ComissionsList.skeleton';

export const ComissionsList = () => {
    const { data, isFetching, error } = useGetComissionsQuery();

    if (isFetching) {
        return <ComissionsListSkeleton count={8} />;
    }

    // if (error) {
    //     return <ErrorPageMessage />;
    // }

    // if (!data?.length) {
    //     return <EmptyMessage />;
    // }

    if (!data?.length) {
        return (
            <Stack spacing={2}>
                <ComissionCard
                    comissionId="1"
                    comissionName="Комиссия 1"
                    clerk={{ id: '1', name: 'Миронова Елена Михайловна' }}
                />

                <ComissionCard
                    comissionId="2"
                    comissionName="Комиссия 2"
                    clerk={{ id: '2', name: 'Баринов Виктор Петрович' }}
                />
            </Stack>
        );
    }

    return (
        <Stack spacing={2}>
            {data.map((item: any) => (
                <ComissionCard key={item} {...item} />
            ))}
        </Stack>
    );
};
