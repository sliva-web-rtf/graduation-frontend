import { Stack, Typography } from '@mui/material';
import { Helmet } from 'react-helmet';
import { CreateTopicForm } from '@/features/topic/create-topic';
import { SITENAME } from '@/shared/lib/const';

const MyDimpomPage = () => (
    <>
        <Helmet>
            <title>Мой диплом | {SITENAME}</title>
        </Helmet>
        <Stack spacing={10} height="100%">
            <Stack spacing={2}>
                <Typography variant="h1">Тема ВКР не выбрана</Typography>
                <Typography color="secondary">
                    Создайте свою тему и начните работать над выпускной квалификационной работой
                </Typography>
            </Stack>
            <CreateTopicForm />
        </Stack>
    </>
);

export default MyDimpomPage;
