import { Attach, BaseAlert, BaseLoadingButton, BaseSelect } from '@/shared/ui';
import UploadIcon from '@mui/icons-material/Upload';
import { Stack, Typography } from '@mui/material';
import { memo } from 'react';

export const ImportStudentsForm = memo(() => {
    const a = 1;

    return (
        <Stack spacing={4} width="100%">
            <Typography variant="h2">Импорт студентов</Typography>
            <Stack spacing={2} width="100%">
                <BaseAlert severity="info">
                    Снизу указывается год для которого будет выполнен импорт студентов
                </BaseAlert>
                <BaseSelect
                    useController={false}
                    label="Учебный год для импорта"
                    options={['2024/2025', '2024/2023', '2023/2022']}
                />
                <Attach
                    placeholder="Прикрепите файл .xlsx, .xls"
                    inputProps={{ accept: '.xlsx, .xls' }}
                    value={null}
                    helperText="Максимальный размер файла не должен превышать 20МБ"
                />
                <BaseLoadingButton variant="contained" sx={{ alignSelf: 'flex-start' }} startIcon={<UploadIcon />}>
                    Загрузить
                </BaseLoadingButton>
            </Stack>
        </Stack>
    );
});
