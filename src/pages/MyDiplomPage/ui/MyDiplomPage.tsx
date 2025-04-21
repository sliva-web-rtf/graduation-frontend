import { SITENAME } from '@/shared/lib/const';
import { MyDiplom } from '@/widgets/MyDiplom';
import { Stack, Typography } from '@mui/material';
import { Helmet } from 'react-helmet';

const MyDiplomPage = () => (
    <>
        <Helmet>
            <title>Мой диплом | {SITENAME}</title>
        </Helmet>
        <Stack spacing={4} height="100%">
            <Typography variant="h1">Мой диплом</Typography>
            <MyDiplom />
        </Stack>
    </>
);

export default MyDiplomPage;
