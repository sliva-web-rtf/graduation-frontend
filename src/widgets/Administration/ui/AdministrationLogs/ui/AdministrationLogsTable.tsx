import { BaseTable, ErrorPageMessage } from '@/shared/ui';
import { Box } from '@mui/material';
import { DataGridProps } from '@mui/x-data-grid';
import { columns } from '../model/index';

type AdministrationLogsTableProps = Omit<DataGridProps, 'columns'> & {
    error?: unknown;
};

export const AdministrationLogsTable = (props: AdministrationLogsTableProps) => {
    const { error, ...dataGridProps } = props;

    if (error && false) {
        return <ErrorPageMessage severity="error" message="Произошла ошибка при получении логов" />;
    }

    return (
        <Box sx={{ flex: 1, position: 'relative' }}>
            <Box sx={{ position: 'absolute', inset: 0 }}>
                <BaseTable columns={columns} checkboxSelection={false} {...dataGridProps} />
            </Box>
        </Box>
    );
};
