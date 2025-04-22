import { SITENAME } from '@/shared/lib/const';
import { MyTopics } from '@/widgets/MyTopics';
import { Stack, Typography } from '@mui/material';
import { Helmet } from 'react-helmet';

const MyTopicsPage = () => (
    <>
        <Helmet>
            <title>Мой диплом | {SITENAME}</title>
        </Helmet>
        <Stack spacing={4} height="100%">
            <Typography variant="h1">Мои темы</Typography>
            <MyTopics />
        </Stack>
    </>
);

export default MyTopicsPage;
