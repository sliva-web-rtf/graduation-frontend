import { SITENAME } from '@/shared/lib/const';
import { BackButton } from '@/widgets/BackButton';
import { TopicInfo } from '@/widgets/TopicInfo';
import { Stack, Typography } from '@mui/material';
import { Helmet } from 'react-helmet';

type TopicPageProps = {
    extended?: boolean;
    editable?: boolean;
};

const TopicPage = (props: TopicPageProps) => {
    const { extended, editable } = props;

    return (
        <>
            <Helmet>
                <title>Тема ВКР | {SITENAME}</title>
            </Helmet>
            <Stack spacing={6} height="100%">
                <Stack spacing={4}>
                    <BackButton />
                    <Typography variant="h1">Тема ВКР</Typography>
                </Stack>
                <TopicInfo extended={extended} editable={editable} />
            </Stack>
        </>
    );
};

export default TopicPage;
