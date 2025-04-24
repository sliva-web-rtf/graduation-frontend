import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useContextMenu } from '@/shared/lib/hooks/useContextMenu';
import { ErrorPageMessage } from '@/shared/ui';
import { Stack } from '@mui/material';
import { GridRowSelectionModel, GridSortModel } from '@mui/x-data-grid';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetStudentsTableQuery } from '../api';
import { generateColumns } from '../lib';
import { myStudentsActions, myStudentsReducer } from '../model';
import { getMyStudentsState } from '../model/selectors';
import { ContextMenu } from './ContextMenu';
import { MyStudentsFilter } from './MyStudentsFilter';
import { MyStudentsTable } from './MyStudentsTable';

const initialReducers: ReducersList = {
    myStudents: myStudentsReducer,
};

export const MyStudents = () => {
    const dispatch = useAppDispatch();
    const { handleContextMenu, handleClose, menuProps } = useContextMenu();
    const { stage, query, commissions, selectedStudents } = useSelector(getMyStudentsState);
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 1 });
    const [sortModel, setSortModel] = useState<GridSortModel>([{ field: 'student', sort: 'asc' }]);

    const { data, isLoading, error } = useGetStudentsTableQuery({
        page: paginationModel.page,
        size: paginationModel.pageSize,
        stage,
        query,
        commissions,
        sort: sortModel,
    });

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

    useEffect(() => {
        setPaginationModel((prev) => ({ ...prev, page: 0 }));
    }, [query, commissions]);

    return (
        <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
            <Stack spacing={4} height="100%" width="100%">
                <MyStudentsFilter />
                {error ? (
                    // @ts-expect-error
                    <ErrorPageMessage message={error.message} />
                ) : (
                    <MyStudentsTable
                        loading={isLoading}
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
                        // Context menu
                        onContextMenu={handleContextMenu}
                    />
                )}
                {Boolean(selectedStudents.length) && <ContextMenu handleClose={handleClose} menuProps={menuProps} />}
            </Stack>
        </DynamicModuleLoader>
    );
};
