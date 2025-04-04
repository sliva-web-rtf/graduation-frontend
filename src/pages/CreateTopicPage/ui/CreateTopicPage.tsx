import { Stack, Typography } from '@mui/material';
import { Helmet } from 'react-helmet';
import { CreateTopicForm } from '@/features/topic/create-topic';
import { SITENAME } from '@/shared/lib/const';

const CreateTopicPage = () => (
    <>
        <Helmet>
            <title>Создание темы ВКР | {SITENAME}</title>
        </Helmet>
        <Stack spacing={10} height="100%">
            <Stack spacing={2}>
                <Typography variant="h1">
                    Создайте свою тему и начните работать над выпускной квалификационной работой
                </Typography>
            </Stack>
            <CreateTopicForm />
        </Stack>
    </>
);

export default CreateTopicPage;
