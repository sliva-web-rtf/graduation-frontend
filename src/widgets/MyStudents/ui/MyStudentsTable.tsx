import { BasePagination, BaseTable } from '@/shared/ui';
import { Stack } from '@mui/material';
import {
    GridColDef,
    gridPageCountSelector,
    gridPageSelector,
    GridPaginationModel,
    GridValidRowModel,
    useGridApiContext,
    useGridSelector,
} from '@mui/x-data-grid';

type StudentsTableProps = {
    columns: GridColDef[];
    rows: GridValidRowModel[];
    rowCount: number;
    loading: boolean;
    paginationModel: GridPaginationModel;
    setPaginationModel: (_: GridPaginationModel) => void;
};

const CustomPagination = () => {
    const apiRef = useGridApiContext();
    const page = useGridSelector(apiRef, gridPageSelector);
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);

    return (
        <BasePagination
            size="small"
            page={page + 1} // +1 для MUI Pagination (начинает с 1)
            count={pageCount}
            onChange={(_, value) => apiRef.current.setPage(value - 1)}
        />
    );
};

export const MyStudentsTable = (props: StudentsTableProps) => {
    const { columns, rows, rowCount, loading, paginationModel, setPaginationModel } = props;

    return (
        <Stack height="100%" maxWidth="calc(var(--page-width) - var(--sidebar-width) - var(--space-xl))">
            <BaseTable
                paginationMode="server"
                loading={loading}
                paginationModel={paginationModel}
                rows={rows}
                columns={columns}
                rowCount={rowCount}
                onPaginationModelChange={setPaginationModel}
                slots={{ pagination: CustomPagination }}
            />
        </Stack>
    );
};
