import { ImportStudentsForm } from '@/features/import/students';
import { ImportSupervisorsForm } from '@/features/import/supervisors';
import { CreatePersonForm } from '@/features/person/create-person';
import { BaseAlert } from '@/shared/ui';
import { Divider, Stack, Typography } from '@mui/material';
import { memo } from 'react';

export const AdministrationUsers = memo(() => {
    return (
        <Stack spacing={4} divider={<Divider />}>
            <Stack spacing={4}>
                <Typography variant="h2">Создание пользователя</Typography>
                <Stack spacing={2}>
                    <CreatePersonForm />
                </Stack>
            </Stack>
            <Stack spacing={2}>
                <BaseAlert severity="warning">Раздел находится в разработке, импорт недоступен</BaseAlert>
                <Stack direction="row" spacing={4}>
                    <ImportSupervisorsForm />
                    <ImportStudentsForm />
                </Stack>
            </Stack>
        </Stack>
    );
});
