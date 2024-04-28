import { Box, Typography } from '@mui/material';
import { memo } from 'react';

const OnboardingPage = memo(() => (
    <Box display="flex" sx={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <Typography variant="h2">Onboarding</Typography>
    </Box>
));

export default OnboardingPage;
