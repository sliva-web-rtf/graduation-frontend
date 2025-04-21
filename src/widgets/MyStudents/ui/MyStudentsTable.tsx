import { useSnackbar } from '@/shared/lib/hooks/useSnackbar';
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
import { useCallback } from 'react';
import { useEditStudentRowMutation } from '../api';
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

const CustomFooter = () => {
    return (
        <Stack direction="row" justifyContent="space-between" alignItems="center" px={1} py={2} width="100%">
            <SetDefenceDateButton />
            <CustomPagination />
        </Stack>
    );
};

export const MyStudentsTable = (props: StudentsTableProps) => {
    const { showSnackbar, Snackbar } = useSnackbar();
    const [editSudentRow] = useEditStudentRowMutation();
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
        async (updatedRow: GridValidRowModel, originalRow: GridValidRowModel) => {
            if (JSON.stringify(updatedRow) === JSON.stringify(originalRow)) {
                return originalRow;
            }

            const mappedRow = mapStudentRowToDto(updatedRow as StudentRowModel, stage);

            const row = await editSudentRow(mappedRow)
                .unwrap()
                .then(() => {
                    showSnackbar('success', 'Ячейка изменена');
                    return updatedRow;
                })
                .catch(() => {
                    showSnackbar('error', 'Произошла ошибка при редактировании ячейки');
                    return originalRow;
                });

            return row;
        },
        [stage, editSudentRow, showSnackbar],
    );

    const handleRowUpdateError = useCallback(() => {
        showSnackbar('error', 'Произошла ошибка при редактировании ячейки');
    }, [showSnackbar]);

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
                    onProcessRowUpdateError={handleRowUpdateError}
                    onCellEditStop={handleCellEditStop}
                    isCellEditable={(params) => {
                        const { field, value, colDef } = params;
                        if (field === 'topic' && !value) {
                            return false;
                        }

                        return Boolean(colDef.editable);
                    }}
                    slots={{
                        pagination: CustomPagination,
                        footer: CustomFooter,
                    }}
                />
            </Box>
            {Snackbar}
        </Box>
    );
};
