import { BaseLoadingButton, BaseSelect } from '@/shared/ui';
import SaveIcon from '@mui/icons-material/Save';
import { Stack } from '@mui/material';
import { memo } from 'react';

export const DefaultYearForm = memo(() => {
    // const {} = props;

    return (
        <Stack spacing={2}>
            <BaseSelect
                useController={false}
                label="Учебный год по умолчанию"
                options={['2024/2025', '2024/2023', '2023/2022']}
            />
            <BaseLoadingButton variant="contained" sx={{ alignSelf: 'flex-start' }} startIcon={<SaveIcon />}>
                Сохранить
            </BaseLoadingButton>
        </Stack>
    );
});
