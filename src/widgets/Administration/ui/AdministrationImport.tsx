import { ImportStudentsForm } from '@/features/import/students';
import { ImportSupervisorsForm } from '@/features/import/supervisors';
import { Stack } from '@mui/material';
import { memo } from 'react';

export const AdministrationImport = memo(() => {
    return (
        <Stack direction="row" spacing={4} justifyContent="space-between">
            <ImportSupervisorsForm />
            <ImportStudentsForm />
        </Stack>
    );
});
