import { Helmet } from 'react-helmet';
import { Stack, Typography } from '@mui/material';
import { ManualSearch } from '@/features/manual/search';
import { Manual } from '@/widgets/Manual';

const ManualPage = () => (
    <>
        <Helmet>
            <title>Справочник исследователя | SCI Join</title>
        </Helmet>
        <Stack spacing={6}>
            <Stack direction="row" spacing={6} alignItems="center" justifyContent="space-between">
                <Typography variant="h1">Справочник исследователя</Typography>
                <ManualSearch />
            </Stack>
            <Manual />
        </Stack>
    </>
);

export default ManualPage;
