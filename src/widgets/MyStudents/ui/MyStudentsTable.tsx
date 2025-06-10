import { useSnackbar } from '@/shared/lib/hooks/useSnackbar';
import { BaseChip, BaseTable, StyledPagination } from '@/shared/ui';
import { Box, Stack } from '@mui/material';
import {
    DataGridProps,
    GridCellEditStopParams,
    GridCellEditStopReasons,
    gridFilterModelSelector,
    gridPageCountSelector,
    gridPageSelector,
    GridValidRowModel,
    MuiBaseEvent,
    MuiEvent,
    useGridApiContext,
    useGridSelector,
} from '@mui/x-data-grid';
import React, { useCallback } from 'react';
import { useEditStudentRowMutation } from '../api';
import { mapStudentRowToDto } from '../lib';
import { StudentRowModel } from '../model';
import { SetDefenceDateButton } from './SetDefenceDateButton';

type StudentsTableProps = DataGridProps & {
    stage: string;
    onContextMenu: (event: React.MouseEvent) => void;

    editable?: boolean;
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

const ActiveFiltersChip = ({ count }: { count: number }) => {
    const label = `${count} активный${count === 1 ? '' : 'х'} фильтр${count === 1 ? '' : 'а'}`;

    return <BaseChip label={label} color="warning" sx={{ height: 33 }} />;
};

const CustomFooter = () => {
    const apiRef = useGridApiContext();
    const filterModel = useGridSelector(apiRef, gridFilterModelSelector);
    const activeFiltersCount = filterModel?.items.filter((item) => Boolean(item.value?.length)).length || 0;

    return (
        <Stack direction="row" justifyContent="space-between" alignItems="center" px={1} py={2} width="100%">
            <Stack direction="row" alignItems="center" spacing={2}>
                <SetDefenceDateButton />
                {Boolean(activeFiltersCount) && <ActiveFiltersChip count={activeFiltersCount} />}
            </Stack>
            <CustomPagination />
        </Stack>
    );
};

export const MyStudentsTable = (props: StudentsTableProps) => {
    const { stage, onContextMenu, editable = false, ...dataGridProps } = props;
    const { showSnackbar, Snackbar } = useSnackbar();
    const [editStudentRow] = useEditStudentRowMutation();

    const handleCellEditStop = useCallback((params: GridCellEditStopParams, event: MuiEvent<MuiBaseEvent>) => {
        if (params.reason !== GridCellEditStopReasons.enterKeyDown) {
            return;
        }

        if (isKeyboardEvent(event) && event.shiftKey) {
            event.defaultMuiPrevented = true;
        }
    }, []);

    const handleRowUpdate = useCallback(
        async (updatedRow: GridValidRowModel, originalRow: GridValidRowModel) => {
            if (JSON.stringify(updatedRow) === JSON.stringify(originalRow)) {
                return originalRow;
            }

            const mappedRow = mapStudentRowToDto(updatedRow as StudentRowModel, stage);

            const row = await editStudentRow(mappedRow)
                .unwrap()
                .then(() => {
                    showSnackbar('success', 'Ячейка изменена');
                    return updatedRow;
                })
                .catch((error) => {
                    showSnackbar('error', error.message);
                    return originalRow;
                });

            return row;
        },
        [stage, editStudentRow, showSnackbar],
    );

    const handleRowUpdateError = useCallback(() => {
        showSnackbar('error', 'Произошла ошибка при редактировании ячейки');
    }, [showSnackbar]);

    return (
        <Box sx={{ flex: 1, position: 'relative' }}>
            <Box sx={{ position: 'absolute', inset: 0 }} onContextMenu={onContextMenu}>
                <BaseTable
                    {...dataGridProps}
                    processRowUpdate={handleRowUpdate}
                    onProcessRowUpdateError={handleRowUpdateError}
                    onCellEditStop={handleCellEditStop}
                    isCellEditable={(params) => {
                        if (!editable) {
                            return false;
                        }

                        const { field, value, colDef } = params;
                        if (field === 'topic' && (value === null || value === undefined)) {
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
