import { Stack } from '@mui/material';
import { Helmet } from 'react-helmet';
import { SITENAME } from '@/shared/lib/const';
import { Requests } from '@/widgets/Requests';

const RequestsPage = () => (
    <>
        <Helmet>
            <title>Заявки | {SITENAME}</title>
        </Helmet>
        <Stack spacing={4} height="100%">
            <Requests />
        </Stack>
    </>
);

export default RequestsPage;
