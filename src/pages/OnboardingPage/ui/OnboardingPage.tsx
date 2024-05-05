import { Box, Stack, Typography } from '@mui/material';
import { Helmet } from 'react-helmet';
import { memo } from 'react';

import { OnboardingSidebar } from 'widgets/OnboardingSidebar';
import { Onboarding } from 'widgets/Onboarding';
import classNames from './OnboardingPage.module.scss';

const OnboardingPage = memo(() => (
    <>
        <Helmet>
            <title>Onboarding | SCI Join</title>
        </Helmet>
        <Box className={classNames.container}>
            <OnboardingSidebar />
            <Stack spacing={3} className={classNames.mainContainer}>
                <Typography variant="h2" fontWeight={700}>
                    Заполните данные профиля
                </Typography>
                <Typography variant="body2" className={classNames.description}>
                    Вводимые данные обеспечат более эффективную коммуникацию, а также обеспечат персональную выдачу,
                    которая будет максимально соответствовать Вашим запросам.
                </Typography>
                <Onboarding />
            </Stack>
        </Box>
    </>
));

export default OnboardingPage;
