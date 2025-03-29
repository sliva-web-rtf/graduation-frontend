import { Stack } from '@mui/material';
import { ChangeEvent, memo } from 'react';
import { useSelector } from 'react-redux';
import { CatalogList } from '@/entities/CatalogList';
import { isUserStudent } from '@/entities/User';
import { Search } from '@/features/catalog/Search';
import { ToggleList } from '@/features/catalog/ToggleList';
import { CreateTopicButton } from '@/features/topic/create-topic';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { SortDirection } from '@/shared/lib/const';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { SortButton } from '@/shared/ui';
import { BasePagination } from '@/shared/ui/Pagination/Pagination';
import { catalogActions, catalogReducer } from '@/widgets/Catalog/model/slice/catalogSlice';
import { getCatalog } from '../model';
import { CatalogOption } from '../model/types/catalogOption';

const initialReducers: ReducersList = {
    catalog: catalogReducer,
};

const Catalog = memo(() => {
    const dispatch = useAppDispatch();
    const { order, option, page, pagesCount } = useSelector(getCatalog);
    const isStudent = useSelector(isUserStudent);

    const handleOrderChange = (value: SortDirection) => {
        dispatch(catalogActions.setOrder(value));
    };

    const handlePageChange = (_: ChangeEvent<unknown>, value: number) => {
        dispatch(catalogActions.setPage(value));
    };

    return (
        <DynamicModuleLoader reducers={initialReducers}>
            <Stack spacing={4} justifyContent="space-between" height="100%">
                <Stack spacing={4}>
                    <Search />
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <ToggleList />
                        <Stack direction="row" spacing={2}>
                            <SortButton order={order} onChange={handleOrderChange} />
                            {option === CatalogOption.Topics && <CreateTopicButton />}
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
