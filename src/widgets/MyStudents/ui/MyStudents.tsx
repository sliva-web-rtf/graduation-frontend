import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Stack } from '@mui/material';
import { GridRowSelectionModel } from '@mui/x-data-grid';
import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetStudentsTableQuery } from '../api';
import { generateColumns } from '../lib';
import { myStudentsReducer } from '../model';
import { getMyStudentsState } from '../model/selectors';
import { MyStudentsFilter } from './MyStudentsFilter';
import { MyStudentsTable } from './MyStudentsTable';

const initialReducers: ReducersList = {
    myStudents: myStudentsReducer,
};

export const MyStudents = () => {
    const { stage, query } = useSelector(getMyStudentsState);
    const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>([]);
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 1 });
    const { data, isFetching } = useGetStudentsTableQuery({
        page: paginationModel.page,
        size: paginationModel.pageSize,
        stage,
        query,
    });

    const columns = useMemo(() => generateColumns(data?.dataType), [data]);
    const rowCount = useMemo(
        () => (data?.pagesCount ?? 1) * paginationModel.pageSize,
        [data?.pagesCount, paginationModel.pageSize],
    );

    return (
        <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
            <Stack spacing={4} height="100%" width="100%">
                <MyStudentsFilter />
                <MyStudentsTable
                    columns={columns}
                    rows={data?.students ?? []}
                    rowCount={rowCount}
                    loading={isFetching}
                    paginationModel={paginationModel}
                    setPaginationModel={setPaginationModel}
                    rowSelectionModel={rowSelectionModel}
                    onRowSelectionModelChange={(newRowSelectionModel: GridRowSelectionModel) => {
                        setRowSelectionModel(newRowSelectionModel);
                    }}
                />
            </Stack>
        </DynamicModuleLoader>
    );
};
