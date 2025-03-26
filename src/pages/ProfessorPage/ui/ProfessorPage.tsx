import { Helmet } from 'react-helmet';
import { Stack, Typography } from '@mui/material';
import { BackButton } from '@/widgets/BackButton';
import { PersonInfo } from '@/widgets/PersonInfo';

const ProfessorPage = () => (
    <>
        <Helmet>
            <title>Руководитель ВКР | SCI Join</title>
        </Helmet>
        <Stack spacing={6}>
            <Stack spacing={4}>
                <BackButton />
                <Typography variant="h1">Руководитель ВКР</Typography>
            </Stack>
            <PersonInfo />
        </Stack>
    </>
);

export default ProfessorPage;
