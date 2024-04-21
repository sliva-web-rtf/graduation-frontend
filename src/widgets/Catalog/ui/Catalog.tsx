import { Stack } from '@mui/material';
import { BasePagination } from 'shared/ui/Pagination/Pagination';
import { Search } from 'features/catalog/Search';
import { ToggleList } from 'features/catalog/ToggleList';
import { ThemesActions } from 'features/catalog/ThemesActions';
import { useSelector } from 'react-redux';
import { ChangeEvent, memo, useCallback, useMemo, useState } from 'react';
import { CatalogOptions } from 'shared/lib/types/catalogOptions';
import { calculatePagesCount } from 'shared/lib/helpers/calculatePagesCount';
import { CatalogListSkeleton } from 'widgets/CatalogList/ui/CatalogList.skeleton';
import { CatalogList } from 'widgets/CatalogList';
import { useGetCatalogQuery } from '../api/catalogApi';
import { getCatalogOption } from '../model/selectors/getCatalogOption/getCatalogOption';
import { getCatalogPageSize } from '../model/selectors/getCatalogPageSize/getCatalogPageSize';

export const Catalog = memo(() => {
    const option = useSelector(getCatalogOption);
    const pageSize = useSelector(getCatalogPageSize);
    const [page, setPage] = useState<number>(1);

    const { isFetching, data } = useGetCatalogQuery({ option, params: { page, pageSize } });
    const handlePageChange = useCallback((_: ChangeEvent<unknown>, value: number) => {
        setPage(value);
    }, []);

    const pagesCount = useMemo(() => calculatePagesCount(data?.length || 0, pageSize), [data?.length, pageSize]);

    return (
        <Stack spacing={4} justifyContent="space-between" height="100%">
            <Stack spacing={4}>
                <Search />
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <ToggleList value={option} />
                    {option === CatalogOptions.Themes && <ThemesActions />}
                </Stack>
                <Stack>
                    {isFetching || !data || !data.data?.length ? (
                        <CatalogListSkeleton count={3} />
                    ) : (
                        <CatalogList items={data?.data || []} />
                    )}
                </Stack>
            </Stack>
            <BasePagination page={page} count={pagesCount} onChange={handlePageChange} />
        </Stack>
    );
});
