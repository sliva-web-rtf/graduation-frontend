import { SITENAME } from '@/shared/lib/const';
import { Administration } from '@/widgets/Administration';
import { Stack, Typography } from '@mui/material';
import { Helmet } from 'react-helmet';

const CreateTopicPage = () => (
    <>
        <Helmet>
            <title>Администрирование | {SITENAME}</title>
        </Helmet>
        <Stack spacing={4} height="100%">
            <Typography variant="h1">Администрирование</Typography>
            <Administration />
        </Stack>
    </>
);

export default CreateTopicPage;
