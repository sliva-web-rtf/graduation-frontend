import { Helmet } from 'react-helmet';
import { Stack, Typography } from '@mui/material';
import { BackButton } from '@/widgets/BackButton';
import { PersonInfo } from '@/widgets/PersonInfo';

const StudentPage = () => (
    <>
        <Helmet>
            <title>Студент | SCI Join</title>
        </Helmet>
        <Stack spacing={6}>
            <Stack spacing={4}>
                <BackButton />
                <Typography variant="h1">Студент</Typography>
            </Stack>
            <PersonInfo isStudent />
        </Stack>
    </>
);

export default StudentPage;
