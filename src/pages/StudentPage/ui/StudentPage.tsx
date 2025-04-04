import { SITENAME } from '@/shared/lib/const';
import { BackButton } from '@/widgets/BackButton';
import { PersonInfo } from '@/widgets/PersonInfo';
import { Stack, Typography } from '@mui/material';
import { Helmet } from 'react-helmet';

const StudentPage = () => (
    <>
        <Helmet>
            <title>Студент | {SITENAME}</title>
        </Helmet>
        <Stack spacing={6} height="100%">
            <Stack spacing={4}>
                <BackButton />
                <Typography variant="h1">Студент</Typography>
            </Stack>
            <PersonInfo isStudent />
        </Stack>
    </>
);

export default StudentPage;
