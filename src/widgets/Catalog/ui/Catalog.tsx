import { Search } from '@/features/catalog/Search';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { BasePagination } from '@/shared/ui';
import { Stack } from '@mui/material';
import { ChangeEvent, memo } from 'react';
import { useSelector } from 'react-redux';
import { catalogActions, getCatalog } from '../model';
import { CatalogList } from './CatalogList';
import { ToggleList } from './ToggleList';

const Catalog = memo(() => {
    const dispatch = useAppDispatch();
    const { option, page, pagesCount } = useSelector(getCatalog);
    const pagesCountForOption = pagesCount[option];

    const handlePageChange = (_: ChangeEvent<unknown>, value: number) => {
        dispatch(catalogActions.setPage(value - 1));
    };

    return (
        <Stack spacing={4} justifyContent="space-between" height="100%">
            <Stack spacing={4} height="100%">
                <Search />
                <ToggleList />
                <CatalogList />
            </Stack>
            {pagesCountForOption > 0 && (
                <BasePagination page={page + 1} count={pagesCountForOption} onChange={handlePageChange} />
            )}
        </Stack>
    );
});

export default Catalog;
