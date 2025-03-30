import { Stack, Tooltip } from '@mui/material';
import { ChangeEvent, memo } from 'react';
import { useSelector } from 'react-redux';
import { isUserStudent } from '@/entities/User';
import { Search } from '@/features/catalog/Search';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { BasePagination, BaseSwitch } from '@/shared/ui';
import { catalogActions, CatalogOption, catalogReducer, getCatalog } from '../model';
import { CatalogList } from './CatalogList';
import { ToggleList } from './ToggleList';

const initialReducers: ReducersList = {
    catalog: catalogReducer,
};

const Catalog = memo(() => {
    const dispatch = useAppDispatch();
    const { order, option, page, pagesCount, includeOwnedTopics } = useSelector(getCatalog);
    const isStudent = useSelector(isUserStudent);

    const handlePageChange = (_: ChangeEvent<unknown>, value: number) => {
        dispatch(catalogActions.setPage(value));
    };

    const handleIncludeOwnedTopicsChange = (_: ChangeEvent<unknown>, value: boolean) => {
        dispatch(catalogActions.setIncludeOwnedTopics(value));
    };

    return (
        <DynamicModuleLoader reducers={initialReducers}>
            <Stack spacing={4} justifyContent="space-between" height="100%">
                <Stack spacing={4}>
                    <Search />
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <ToggleList />
                        {option === CatalogOption.Topics && (
                            <Tooltip title="Показывать мои темы в начале списка">
                                <BaseSwitch
                                    label="Мои темы"
                                    value={includeOwnedTopics}
                                    onChange={handleIncludeOwnedTopicsChange}
                                />
                            </Tooltip>
                        )}
                    </Stack>
                    <CatalogList />
                </Stack>
                <BasePagination page={page} count={pagesCount[option]} onChange={handlePageChange} />
            </Stack>
        </DynamicModuleLoader>
    );
});

export default Catalog;
