import { BaseTable, StyledPagination } from '@/shared/ui';
import { Box, Stack } from '@mui/material';
import {
    GridCellEditStopParams,
    GridCellEditStopReasons,
    GridColDef,
    gridPageCountSelector,
    gridPageSelector,
    GridPaginationModel,
    GridRowSelectionModel,
    GridValidRowModel,
    MuiBaseEvent,
    MuiEvent,
    useGridApiContext,
    useGridSelector,
} from '@mui/x-data-grid';
import { useCallback, useMemo } from 'react';
import { mapStudentRowToDto } from '../lib';
import { StudentRowModel } from '../model';
import { SetDefenceDateButton } from './SetDefenceDateButton';

type StudentsTableProps = {
    stage: string;
    columns: GridColDef[];
    rows: GridValidRowModel[];
    rowCount: number;
    loading: boolean;
    paginationModel: GridPaginationModel;
    setPaginationModel: (_: GridPaginationModel) => void;
    rowSelectionModel: GridRowSelectionModel;
    onRowSelectionModelChange: (_: GridRowSelectionModel) => void;
};

function isKeyboardEvent(event: any): event is KeyboardEvent {
    return !!event.key;
}

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
        stage,
        columns,
        rows,
        rowCount,
        loading,
        paginationModel,
        setPaginationModel,
        rowSelectionModel,
        onRowSelectionModelChange,
    } = props;
    const handleCellEditStop = useCallback((params: GridCellEditStopParams, event: MuiEvent<MuiBaseEvent>) => {
        if (params.reason !== GridCellEditStopReasons.enterKeyDown) {
            return;
        }

        if (isKeyboardEvent(event) && !event.ctrlKey && !event.metaKey) {
            event.defaultMuiPrevented = true;
        }
    }, []);

    const handleRowUpdate = useCallback(
        (updatedRow: GridValidRowModel, originalRow: GridValidRowModel) => {
            const mappedRow = mapStudentRowToDto(updatedRow as StudentRowModel, stage);
            console.log(mappedRow);
            // Возвращаем обновлённую строку (или можно сделать API-запрос)
            return updatedRow;
        },
        [stage],
    );

    return (
        <Box sx={{ flex: 1, position: 'relative' }}>
            <Box sx={{ position: 'absolute', inset: 0 }}>
                <BaseTable
                    loading={loading}
                    rowCount={rowCount}
                    rows={rows}
                    columns={columns}
                    paginationModel={paginationModel}
                    onPaginationModelChange={setPaginationModel}
                    rowSelectionModel={rowSelectionModel}
                    onRowSelectionModelChange={onRowSelectionModelChange}
                    processRowUpdate={handleRowUpdate}
                    onCellEditStop={handleCellEditStop}
                    slots={{
                        pagination: CustomPagination,
                        footer: () =>
                            CustomFooter({
                                selected: Boolean(rowSelectionModel.length),
                            }),
                    }}
                />
            </Box>
        </Box>
    );
};
