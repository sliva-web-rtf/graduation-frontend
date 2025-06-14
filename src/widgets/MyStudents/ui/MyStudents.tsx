import { useGetCurrentStageQuery } from '@/entities/Stage';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useContextMenu } from '@/shared/lib/hooks/useContextMenu';
import { ErrorPageMessage } from '@/shared/ui';
import { Stack } from '@mui/material';
import { GridFilterModel, GridRowSelectionModel, GridSortModel } from '@mui/x-data-grid';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetStudentsTableQuery } from '../api';
import { buildDateRange, buildFilterQuery, generateColumns } from '../lib';
import { myStudentsActions, myStudentsReducer } from '../model';
import { getMyStudentsState } from '../model/selectors';
import { ContextMenu } from './ContextMenu';
import { MyStudentsFilter } from './MyStudentsFilter';
import { MyStudentsTable } from './MyStudentsTable';

type MyStudentsProps = {
    editable?: boolean;
};

const initialReducers: ReducersList = {
    myStudents: myStudentsReducer,
};

export const MyStudents = (props: MyStudentsProps) => {
    const { editable } = props;
    const dispatch = useAppDispatch();
    const { handleContextMenu, handleClose, menuProps } = useContextMenu();
    const { stage, query, commissions, selectedStudents, fromDate, toDate } = useSelector(getMyStudentsState);
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 1 });
    const [sortModel, setSortModel] = useState<GridSortModel>([{ field: 'student', sort: 'asc' }]);
    const [filterModel, setFilterModel] = useState<GridFilterModel>({
        items: [],
    });
    const studentStatusFilter = buildFilterQuery(filterModel).status as string[];
    const dateRange = buildDateRange(fromDate, toDate);

    const { isLoading: isCurrentStageLoading } = useGetCurrentStageQuery(undefined, { skip: Boolean(stage) });
    const { data, isLoading, error } = useGetStudentsTableQuery(
        {
            page: paginationModel.page,
            size: paginationModel.pageSize,
            stage,
            query,
            commissions,
            sort: sortModel,
            studentStatuses: studentStatusFilter,
            ...dateRange,
        },
        { skip: paginationModel.pageSize === 1 || !stage },
    );

    const columns = useMemo(() => generateColumns(data?.dataType), [data]);
    const rowCount = useMemo(
        () => (data?.pagesCount ?? 1) * paginationModel.pageSize,
        [data?.pagesCount, paginationModel.pageSize],
    );

    const handleRowSelectionModelChange = useCallback(
        (newRowSelectionModel: GridRowSelectionModel) => {
            dispatch(myStudentsActions.setSelectedStudents(newRowSelectionModel as string[]));
        },
        [dispatch],
    );

    const handleSortModelChange = useCallback((newSortModel: GridSortModel) => {
        setSortModel(newSortModel);
    }, []);

    const handleFilterModelChange = useCallback((newFilterModel: GridFilterModel) => {
        setFilterModel(newFilterModel);
    }, []);

    useEffect(() => {
        setPaginationModel((prev) => ({ ...prev, page: 0 }));
    }, [query, commissions]);

    return (
        <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
            <Stack spacing={4} height="100%" width="100%">
                <MyStudentsFilter />
                {error ? (
                    <ErrorPageMessage
                        severity={!stage ? 'info' : 'error'}
                        // @ts-expect-error
                        message={!stage ? 'Выберите этап в фильтре выше' : error.message}
                    />
                ) : (
                    <MyStudentsTable
                        editable={editable}
                        loading={isLoading || isCurrentStageLoading}
                        stage={stage}
                        columns={columns}
                        rows={data?.students ?? []}
                        rowCount={rowCount}
                        // Pagination
                        paginationModel={paginationModel}
                        onPaginationModelChange={setPaginationModel}
                        // Row selection
                        rowSelectionModel={selectedStudents}
                        onRowSelectionModelChange={handleRowSelectionModelChange}
                        // Sorting
                        sortModel={sortModel}
                        onSortModelChange={handleSortModelChange}
                        // Filtering
                        filterModel={filterModel}
                        onFilterModelChange={handleFilterModelChange}
                        // Context menu
                        onContextMenu={handleContextMenu}
                    />
                )}
                {Boolean(selectedStudents.length) && <ContextMenu handleClose={handleClose} menuProps={menuProps} />}
            </Stack>
        </DynamicModuleLoader>
    );
};
