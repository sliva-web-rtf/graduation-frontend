import { BaseTable } from '@/shared/ui';
import { Stack } from '@mui/material';
import { columns, rows } from '../model';

type MyStudentsProps = {};

export const MyStudents = (props: MyStudentsProps) => {
    return (
        <Stack height="100%" maxWidth="calc(var(--page-width) - var(--sidebar-width) - var(--space-xl))">
            <BaseTable rows={rows} columns={columns} />
        </Stack>
    );
};
