import { Stack, Typography } from '@mui/material';
import { Helmet } from 'react-helmet';
import { SITENAME } from '@/shared/lib/const';
import { BackButton } from '@/widgets/BackButton';
import { PersonInfo } from '@/widgets/PersonInfo';

const StudentPage = () => (
    <>
        <Helmet>
            <title>Студент | {SITENAME}</title>
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
