import { Stack } from '@mui/material';
import { BasePagination } from 'shared/ui/Pagination/Pagination';
import { Search } from 'features/catalog/Search';
import { ToggleList } from 'features/catalog/ToggleList';
import { useSelector } from 'react-redux';
import React, { ChangeEvent, memo, useCallback } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { catalogActions } from 'widgets/Catalog/model/slice/catalogSlice';
import { CatalogList, CatalogOptions } from 'entities/CatalogList';
import { FavoritesFilterCheckbox } from 'shared/ui';
import { NewScientificWorkModal } from 'features/catalog/NewScientificWork';
import { getCatalogPage } from '../model/selectors/getCatalogPage/getCatalogPage';
import { getCatalogPagesCount } from '../model/selectors/getCatalogPagesCount/getCatalogPagesCount';
import { getCatalogOption } from '../model/selectors/getCatalogOption/getCatalogOption';

export const Catalog = memo(() => {
    const dispatch = useAppDispatch();
    const option = useSelector(getCatalogOption);
    const page = useSelector(getCatalogPage);
    const pagesCount = useSelector(getCatalogPagesCount);

    const handlePageChange = useCallback(
        (_: ChangeEvent<unknown>, value: number) => {
            dispatch(catalogActions.setPage(value));
        },
        [dispatch],
    );

    return (
        <Stack spacing={4} justifyContent="space-between" height="100%">
            <Stack spacing={4}>
                <Search />
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <ToggleList />
                    <Stack direction="row" spacing={2}>
                        <FavoritesFilterCheckbox />
                        {option === CatalogOptions.Themes && <NewScientificWorkModal />}
                    </Stack>
                </Stack>
                <CatalogList />
            </Stack>
            <BasePagination page={page} count={pagesCount} onChange={handlePageChange} />
        </Stack>
    );
});
