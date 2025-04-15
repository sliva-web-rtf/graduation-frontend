import { BaseTable, StyledPagination } from '@/shared/ui';
import { Stack } from '@mui/material';
import {
    GridColDef,
    gridPageCountSelector,
    gridPageSelector,
    GridPaginationModel,
    GridRowSelectionModel,
    GridValidRowModel,
    useGridApiContext,
    useGridSelector,
} from '@mui/x-data-grid';
import { useMemo } from 'react';
import { SetDefenceDateButton } from './SetDefenceDateButton';

type StudentsTableProps = {
    columns: GridColDef[];
    rows: GridValidRowModel[];
    rowCount: number;
    loading: boolean;
    paginationModel: GridPaginationModel;
    setPaginationModel: (_: GridPaginationModel) => void;
    rowSelectionModel: GridRowSelectionModel;
    onRowSelectionModelChange: (_: GridRowSelectionModel) => void;
};

const CustomPagination = () => {
    const apiRef = useGridApiContext();
    const page = useGridSelector(apiRef, gridPageSelector);
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);

    return (
        <StyledPagination
            size="small"
            page={page + 1} // +1 для MUI Pagination (начинает с 1)
            count={pageCount}
            onChange={(_, value) => apiRef.current.setPage(value - 1)}
        />
    );
};

const CustomFooter = (props: { selected: boolean }) => {
    const { selected } = props;
    const apiRef = useGridApiContext();
    const selectedRows = useMemo(() => [...apiRef.current.getSelectedRows()], [apiRef]);

    return (
        <Stack direction="row" justifyContent="space-between" alignItems="center" px={1} py={2} width="100%">
            <SetDefenceDateButton items={selectedRows} disabled={!selected} />
            <CustomPagination />
        </Stack>
    );
};

export const MyStudentsTable = (props: StudentsTableProps) => {
    const {
        columns,
        rows,
        rowCount,
        loading,
        paginationModel,
        setPaginationModel,
        rowSelectionModel,
        onRowSelectionModelChange,
    } = props;

    return (
        <Stack height="100%" maxWidth="calc(var(--page-width) - var(--sidebar-width) - var(--space-xl))">
            <BaseTable
                disableVirtualization
                paginationMode="server"
                loading={loading}
                rowCount={rowCount}
                rows={rows}
                columns={columns}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                rowSelectionModel={rowSelectionModel}
                onRowSelectionModelChange={onRowSelectionModelChange}
                slots={{
                    pagination: CustomPagination,
                    footer: () =>
                        CustomFooter({
                            selected: Boolean(rowSelectionModel.length),
                        }),
                }}
            />
        </Stack>
    );
};
