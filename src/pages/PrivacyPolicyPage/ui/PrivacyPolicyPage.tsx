import { SITENAME } from '@/shared/lib/const';
import { PrivacyPolicy } from '@/widgets/PrivacyPolicy';
import { Stack, Typography } from '@mui/material';
import { Helmet } from 'react-helmet';

const PrivacyPolicyPage = () => (
    <>
        <Helmet>
            <title>Политика конфиденциальности | {SITENAME}</title>
        </Helmet>
        <Stack spacing={4} height="100%">
            <Typography variant="h1">Политика в отношении обработки персональных данных</Typography>
            <PrivacyPolicy />
        </Stack>
    </>
);

export default PrivacyPolicyPage;
