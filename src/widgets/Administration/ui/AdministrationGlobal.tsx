import { DefaultYearForm } from '@/features/year/set-year';
import { BaseAlert } from '@/shared/ui';
import { Stack, Typography } from '@mui/material';
import { memo } from 'react';

export const AdministrationGlobal = memo(() => {
    return (
        <Stack spacing={4} width="50%">
            <Typography variant="h2">Установка учебного года по умолчанию</Typography>
            <Stack spacing={2}>
                <BaseAlert severity="info">
                    Выбранный учебный год будет использоваться по умолчанию во всех запросах, секретари смогут изменить
                    его локально только для себя
                </BaseAlert>
                <DefaultYearForm />
            </Stack>
        </Stack>
    );
});
