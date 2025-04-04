import { SITENAME } from '@/shared/lib/const';
import { MyDimplom } from '@/widgets/MyDimplom';
import { Stack, Typography } from '@mui/material';
import { Helmet } from 'react-helmet';

const MyDimpomPage = () => (
    <>
        <Helmet>
            <title>Мой диплом | {SITENAME}</title>
        </Helmet>
        <Stack spacing={4} height="100%">
            <Typography variant="h1">Мой диплом</Typography>
            <MyDimplom />
        </Stack>
    </>
);

export default MyDimpomPage;
