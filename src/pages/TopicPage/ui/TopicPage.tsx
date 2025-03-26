import { Helmet } from 'react-helmet';
import { Stack, Typography } from '@mui/material';
import { BackButton } from '@/widgets/BackButton';
import { TopicInfo } from '@/widgets/TopicInfo';

const TopicPage = () => (
    <>
        <Helmet>
            <title>Исследование | SCI Join</title>
        </Helmet>
        <Stack spacing={6}>
            <Stack spacing={4}>
                <BackButton />
                <Typography variant="h1">Исследование</Typography>
            </Stack>
            <TopicInfo />
        </Stack>
    </>
);

export default TopicPage;
