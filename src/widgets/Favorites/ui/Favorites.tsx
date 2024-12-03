import { ChangeEvent, memo, useEffect } from 'react';
import { Stack } from '@mui/material';
import { useSelector } from 'react-redux';
import { ToggleList } from '@/features/favorites';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { catalogActions, catalogReducer } from '@/widgets/Catalog/model/slice/catalogSlice';
import { CatalogList } from '@/entities/CatalogList';
import {
    getCatalogAreas,
    getCatalogInterests,
    getCatalogIsFavoritesFilter,
    getCatalogOption,
    getCatalogPage,
    getCatalogPagesCount,
    getCatalogPageSize,
} from '@/widgets/Catalog';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useGetCatalogQuery } from '@/entities/CatalogList/api/catalogApi';
import { BasePagination } from '@/shared/ui';

const initialReducers: ReducersList = {
    catalog: catalogReducer,
};

export const Favorites = memo(() => {
    const dispatch = useAppDispatch();
    const option = useSelector(getCatalogOption);
    const page = useSelector(getCatalogPage);
    const pagesCount = useSelector(getCatalogPagesCount);

    const handlePageChange = (_: ChangeEvent<unknown>, value: number) => {
        dispatch(catalogActions.setPage(value));
    };

    useEffect(() => {
        dispatch(catalogActions.setIsFavoriteFilter(true));
    }, [dispatch]);

    return (
        <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
            <Stack justifyContent="space-between" height="100%">
                <Stack spacing={4}>
                    <ToggleList />
                    <CatalogList />
                </Stack>
                <BasePagination page={page} count={pagesCount[option]} onChange={handlePageChange} />
            </Stack>
        </DynamicModuleLoader>
    );
});
