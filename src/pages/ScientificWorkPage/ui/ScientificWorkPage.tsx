import { Helmet } from 'react-helmet';
import { Stack, Typography } from '@mui/material';
import { BackButton } from 'widgets/BackButton';
import { ScientificWorkInfo } from 'widgets/ScientificWorkInfo';

const ScientificWorkPage = () => (
    <>
        <Helmet>
            <title>Исследование | SCI Join</title>
        </Helmet>
        <Stack spacing={6}>
            <Stack spacing={4}>
                <BackButton />
                <Typography variant="h1">Исследование</Typography>
            </Stack>
            <ScientificWorkInfo />
        </Stack>
    </>
);

export default ScientificWorkPage;
