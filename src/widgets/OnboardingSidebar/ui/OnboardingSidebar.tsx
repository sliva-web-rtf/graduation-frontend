import { memo } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import classNames from './OnboardingSidebar.module.scss';

export const OnboardingSidebar = memo(() => (
    <Stack spacing={3} className={classNames.container}>
        <Stack direction="row">
            <Typography variant="h2">SCI</Typography>
            <Typography variant="h2" fontWeight={700} className={classNames.lightText}>
                Join
            </Typography>
        </Stack>
        <Typography variant="h2" className={classNames.lightText}>
            Наука доступна каждому
        </Typography>
    </Stack>
));
