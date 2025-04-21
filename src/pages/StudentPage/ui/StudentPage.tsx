import { BackButton } from '@/widgets/BackButton';
import { PersonInfo } from '@/widgets/PersonInfo';
import { Stack, Typography } from '@mui/material';

const StudentPage = () => (
    <Stack spacing={6} height="100%">
        <Stack spacing={4}>
            <BackButton />
            <Typography variant="h1">Студент</Typography>
        </Stack>
        <PersonInfo isStudent />
    </Stack>
);

export default StudentPage;
