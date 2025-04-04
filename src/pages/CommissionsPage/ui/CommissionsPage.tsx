import { SITENAME } from '@/shared/lib/const';
import { Comissions } from '@/widgets/Comissions';
import { Stack, Typography } from '@mui/material';
import { Helmet } from 'react-helmet';

const CommissionsPage = () => (
    <>
        <Helmet>
            <title>Комиссии | {SITENAME}</title>
        </Helmet>
        <Stack spacing={4} height="100%">
            <Typography variant="h1">Список комиссий</Typography>
            <Comissions />
        </Stack>
    </>
);

export default CommissionsPage;
