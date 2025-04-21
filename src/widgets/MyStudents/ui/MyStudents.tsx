import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useContextMenu } from '@/shared/lib/hooks/useContextMenu';
import { Stack } from '@mui/material';
import { GridRowSelectionModel } from '@mui/x-data-grid';
import { useCallback, useMemo, useState } from 'react';
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
    const { stage, query, commission, selectedStudents } = useSelector(getMyStudentsState);
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 1 });
    const { data, isFetching } = useGetStudentsTableQuery({
        page: paginationModel.page,
        size: paginationModel.pageSize,
        stage,
        query,
        commission,
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

    return (
        <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
            <Stack spacing={4} height="100%" width="100%">
                <MyStudentsFilter />
                <MyStudentsTable
                    onContextMenu={handleContextMenu}
                    stage={stage}
                    columns={columns}
                    rows={data?.students ?? []}
                    rowCount={rowCount}
                    loading={isFetching}
                    paginationModel={paginationModel}
                    setPaginationModel={setPaginationModel}
                    rowSelectionModel={selectedStudents}
                    onRowSelectionModelChange={handleRowSelectionModelChange}
                />
                {Boolean(selectedStudents.length) && <ContextMenu handleClose={handleClose} menuProps={menuProps} />}
            </Stack>
        </DynamicModuleLoader>
    );
};
