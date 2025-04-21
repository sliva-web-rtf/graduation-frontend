import { BackButton } from '@/widgets/BackButton';
import { PersonInfo } from '@/widgets/PersonInfo';
import { Stack, Typography } from '@mui/material';

const SupervisorPage = () => (
    <Stack spacing={6} height="100%">
        <Stack spacing={4}>
            <BackButton />
            <Typography variant="h1">Руководитель ВКР</Typography>
        </Stack>
        <PersonInfo />
    </Stack>
);

export default SupervisorPage;
