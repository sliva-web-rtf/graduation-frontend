import { ImportStudentsForm } from '@/features/import/students';
import { ImportSupervisorsForm } from '@/features/import/supervisors';
import { BaseAlert } from '@/shared/ui';
import { Stack } from '@mui/material';
import { memo } from 'react';

export const AdministrationImport = memo(() => {
    return (
        <Stack spacing={2}>
            <BaseAlert severity="warning">Раздел находится в разработке, импорт недоступен</BaseAlert>
            <Stack direction="row" spacing={4} justifyContent="space-between">
                <ImportSupervisorsForm />
                <ImportStudentsForm />
            </Stack>
        </Stack>
    );
});
