import { Box, Stack, Typography } from '@mui/material';
import { memo } from 'react';

import { OnboardingSidebar } from 'widgets/OnboardingSidebar';
import classNames from './OnboardingPage.module.scss';

const OnboardingPage = memo(() => (
    <Box className={classNames.container}>
        <OnboardingSidebar />
        <Stack spacing={3} className={classNames.mainContainer}>
            <Typography variant="h2" fontWeight={700}>
                Заполните данные профиля
            </Typography>
            <Typography variant="body2" className={classNames.description}>
                Вводимые данные обеспечат более эффективную коммуникацию, а также обеспечат персональную выдачу, которая
                будет максимально соответствовать Вашим запросам.
            </Typography>
        </Stack>
    </Box>
));

export default OnboardingPage;
