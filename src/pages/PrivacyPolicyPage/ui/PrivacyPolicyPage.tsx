import { SITENAME } from '@/shared/lib/const';
import { BackButton } from '@/widgets/BackButton';
import { PrivacyPolicy } from '@/widgets/PrivacyPolicy';
import { Stack, Typography } from '@mui/material';
import { Helmet } from 'react-helmet';

const PrivacyPolicyPage = () => (
    <>
        <Helmet>
            <title>Политика конфиденциальности | {SITENAME}</title>
        </Helmet>
        <Stack spacing={4} height="100%" padding={4} maxWidth={1200} margin="0 auto">
            <BackButton />
            <Typography variant="h1">Политика в отношении обработки персональных данных</Typography>
            <PrivacyPolicy />
        </Stack>
    </>
);

export default PrivacyPolicyPage;
