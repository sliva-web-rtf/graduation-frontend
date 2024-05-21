import { Helmet } from 'react-helmet';
import { Stack, Typography } from '@mui/material';
import { BackButton } from 'widgets/BackButton';
import { ProfessorInfo } from 'widgets/ProfessorInfo';

const ProfessorPage = () => (
    <>
        <Helmet>
            <title>Научный руководитель | SCI Join</title>
        </Helmet>
        <Stack spacing={6}>
            <Stack spacing={4}>
                <BackButton />
                <Typography variant="h1">Научный руководитель</Typography>
            </Stack>
            <ProfessorInfo />
        </Stack>
    </>
);

export default ProfessorPage;
