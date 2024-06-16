import { Stack } from '@mui/material';
import { useSelector } from 'react-redux';
import { ChangeEvent, memo } from 'react';
import { BasePagination } from '@/shared/ui/Pagination/Pagination';
import { Search } from '@/features/catalog/Search';
import { ToggleList } from '@/features/catalog/ToggleList';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { catalogActions, catalogReducer } from '@/widgets/Catalog/model/slice/catalogSlice';
import { CatalogList } from '@/entities/CatalogList';
import { FavoritesFilterCheckbox } from '@/features/catalog/Favorites';
import { CreateScientificWorkModal } from '@/features/scientificWork/CreateScientificWork';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { CatalogOption } from '../model/types/catalogOption';
import { getCatalogPage } from '../model/selectors/getCatalogPage/getCatalogPage';
import { getCatalogPagesCount } from '../model/selectors/getCatalogPagesCount/getCatalogPagesCount';
import { getCatalogOption } from '../model/selectors/getCatalogOption/getCatalogOption';

const initialReducers: ReducersList = {
    catalog: catalogReducer,
};

const Catalog = memo(() => {
    const dispatch = useAppDispatch();
    const option = useSelector(getCatalogOption);
    const page = useSelector(getCatalogPage);
    const pagesCount = useSelector(getCatalogPagesCount);

    const handlePageChange = (_: ChangeEvent<unknown>, value: number) => {
        dispatch(catalogActions.setPage(value));
    };

    return (
        <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
            <Stack spacing={4} justifyContent="space-between" height="100%">
                <Stack spacing={4}>
                    <Search />
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <ToggleList />
                        <Stack direction="row" spacing={2}>
                            <FavoritesFilterCheckbox />
                            {option === CatalogOption.Themes && <CreateScientificWorkModal />}
                        </Stack>
                    </Stack>
                    <CatalogList />
                </Stack>
                <BasePagination page={page} count={pagesCount[option]} onChange={handlePageChange} />
            </Stack>
        </DynamicModuleLoader>
    );
});

export default Catalog;
