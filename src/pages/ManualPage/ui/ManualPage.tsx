import { Helmet } from 'react-helmet';
import { Stack, Typography } from '@mui/material';
import { ManualSearch } from '@/features/manual/search';
import { Manual } from '@/widgets/Manual';

const ManualPage = () => (
    <>
        <Helmet>
            <title>Справочник исследователя | SCI Join</title>
        </Helmet>
        <Manual />
    </>
);

export default ManualPage;
