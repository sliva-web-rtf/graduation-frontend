import { SITENAME } from '@/shared/lib/const';
import { Requests } from '@/widgets/Requests';
import { Stack, Typography } from '@mui/material';
import { Helmet } from 'react-helmet';

const RequestsPage = () => (
    <>
        <Helmet>
            <title>Заявки | {SITENAME}</title>
        </Helmet>
        <Stack spacing={4} height="100%">
            <Typography variant="h1">Заявки</Typography>
            <Requests />
        </Stack>
    </>
);

export default RequestsPage;
