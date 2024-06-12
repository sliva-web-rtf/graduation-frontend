import { Helmet } from 'react-helmet';
import { Stack, Typography } from '@mui/material';
import { BackButton } from '@/widgets/BackButton';
import { StudentInfo } from '@/widgets/StudentInfo';

const StudentPage = () => (
    <>
        <Helmet>
            <title>Исследователь | SCI Join</title>
        </Helmet>
        <Stack spacing={6}>
            <Stack spacing={4}>
                <BackButton />
                <Typography variant="h1">Исследователь</Typography>
            </Stack>
            <StudentInfo />
        </Stack>
    </>
);

export default StudentPage;
