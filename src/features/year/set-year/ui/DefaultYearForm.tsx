import { YearSelect } from '@/entities/Year';
import { BaseLoadingButton } from '@/shared/ui';
import SaveIcon from '@mui/icons-material/Save';
import { Stack } from '@mui/material';
import { memo } from 'react';

export const DefaultYearForm = memo(() => {
    return (
        <Stack spacing={2}>
            <YearSelect label="Учебный год по умолчанию" />
            <BaseLoadingButton variant="contained" sx={{ alignSelf: 'flex-start' }} startIcon={<SaveIcon />}>
                Сохранить
            </BaseLoadingButton>
        </Stack>
    );
});
