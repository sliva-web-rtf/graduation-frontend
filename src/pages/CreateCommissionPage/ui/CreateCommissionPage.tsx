import { SITENAME } from '@/shared/lib/const';
import { BackButton } from '@/widgets/BackButton';
import { Stack, Typography } from '@mui/material';
import { Helmet } from 'react-helmet';

const CreateCommissionPage = () => (
    <>
        <Helmet>
            <title>Создание комиссии | {SITENAME}</title>
        </Helmet>
        <Stack spacing={6} height="100%">
            <Stack spacing={4}>
                <BackButton>Вернуться к списку комиссий</BackButton>
                <Typography variant="h1">Создание комиссии</Typography>
            </Stack>
        </Stack>
    </>
);

export default CreateCommissionPage;
