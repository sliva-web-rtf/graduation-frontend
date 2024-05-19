import { memo } from 'react';
import { Stack } from '@mui/material';
import { ManualBlock } from 'widgets/Manual/ui/ManualBlock';
import { MANUAL } from '../model/const';

export const Manual = memo(() => (
    <Stack spacing={6}>
        {MANUAL.map((item) => (
            <ManualBlock key={item.title} {...item} />
        ))}
    </Stack>
));
