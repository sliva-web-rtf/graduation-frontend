import { Stack } from '@mui/material';
import { memo, useEffect, useState } from 'react';
import { useGetLogsQuery } from '../api';
import { rows } from '../model';
import { AdministrationLogsFilter } from './AdministrationLogsFilter';
import { AdministrationLogsTable } from './AdministrationLogsTable';

export const AdministrationLogs = memo(() => {
    const [query, setQuery] = useState('');
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 1 });

    const { data, isLoading, error } = useGetLogsQuery(
        {
            page: paginationModel.page,
            size: paginationModel.pageSize,
            query,
        },
        { skip: paginationModel.pageSize === 1 },
    );

    const rowCount = data?.pagesCount ? data.pagesCount * paginationModel.pageSize : 0;

    useEffect(() => {
        setPaginationModel((prev) => ({ ...prev, page: 0 }));
    }, [query]);

    return (
        <Stack spacing={2} height="100%">
            <AdministrationLogsFilter query={query} setQuery={setQuery} />
            <AdministrationLogsTable
                loading={isLoading}
                error={error}
                // Data
                rows={data?.logs ?? rows}
                rowCount={rowCount}
                // Pagination
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
            />
        </Stack>
    );
});
