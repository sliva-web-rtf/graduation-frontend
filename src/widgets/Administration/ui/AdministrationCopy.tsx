import { StageCopy } from '@/features/stage/copy';
import { Stack, Typography } from '@mui/material';
import { memo } from 'react';

export const AdministrationCopy = memo(() => {
    return (
        <Stack spacing={4} width="50%">
            <Typography variant="h2">Копирование данных этапа</Typography>
            <StageCopy />
        </Stack>
    );
});
